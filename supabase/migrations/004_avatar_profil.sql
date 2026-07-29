-- Œno — Chantier 4 : photo de profil visible par les amis
-- À appliquer sur le projet Supabase (SQL Editor ou supabase db push).
--
-- L'app fonctionne SANS cette migration : la photo vit alors uniquement sur
-- l'appareil de son propriétaire, et les amis voient l'initiale du pseudo.
-- L'appliquer ajoute deux choses, sans rien casser :
--   1. la photo suit l'utilisateur d'un appareil à l'autre ;
--   2. ses amis la voient dans la liste et dans les conversations.

-- La photo est déjà recadrée en carré et réduite à 256 px par le navigateur
-- avant d'arriver ici (voir lib/avatar.js) : quelques dizaines de Ko en
-- « data URL ». Pas de bucket de stockage à administrer, pas de fichier
-- orphelin à nettoyer quand un compte disparaît — la ligne s'en va avec le
-- profil auquel elle appartient.
alter table public.profiles
  add column if not exists avatar_url text;

-- « Cette personne est-elle mon amie ? », en une fonction.
--
-- SECURITY DEFINER à dessein : appelée depuis une politique RLS, elle doit
-- pouvoir consulter `amities` sans être elle-même filtrée par la RLS de cette
-- table — sans quoi la réponse serait toujours « non ». Elle ne révèle rien :
-- elle ne répond que sur l'utilisateur courant (auth.uid()) et ne renvoie
-- qu'un booléen. search_path figé pour ne pas dépendre du contexte d'appel.
create or replace function public.est_mon_ami(autre uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.amities a
    where a.statut = 'accepte'
      and (
        (a.demandeur_id    = auth.uid() and a.destinataire_id = autre) or
        (a.destinataire_id = auth.uid() and a.demandeur_id    = autre)
      )
  );
$$;

revoke all on function public.est_mon_ami(uuid) from public, anon;
grant execute on function public.est_mon_ami(uuid) to authenticated;

-- Jusqu'ici un profil n'était lisible que par son propriétaire
-- (« profiles_select_own »), ce qui suffisait tant que les pseudos passaient
-- par la fonction mes_amis(). Une photo se lit directement : on ouvre donc la
-- lecture aux seules personnes avec qui l'amitié est effectivement établie —
-- ni les demandes en attente, ni les inconnus. Cette politique s'ajoute à
-- l'ancienne (elles se cumulent), le propriétaire garde donc son accès.
drop policy if exists "profiles_select_amis" on public.profiles;

create policy "profiles_select_amis" on public.profiles
  for select to authenticated
  using (public.est_mon_ami(profiles.id));
