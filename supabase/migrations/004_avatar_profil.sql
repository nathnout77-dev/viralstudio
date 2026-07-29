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
-- « data URL ». Pas de bucket de stockage à gérer, pas de fichier orphelin
-- à nettoyer quand un compte disparaît — la ligne s'en va avec le profil.
alter table public.profiles
  add column if not exists avatar_url text;

-- Jusqu'ici un profil n'était lisible que par son propriétaire
-- (« profiles_select_own »), ce qui suffisait tant que les pseudos passaient
-- par la fonction mes_amis(). Une photo se lit directement : on ouvre donc
-- la lecture aux seules personnes avec qui l'amitié est effectivement
-- établie — ni les demandes en attente, ni les inconnus.
drop policy if exists "profiles_select_amis" on public.profiles;

create policy "profiles_select_amis" on public.profiles
  for select to authenticated
  using (
    exists (
      select 1 from public.amities a
      where a.statut = 'accepte'
        and (
          (a.demandeur_id    = auth.uid() and a.destinataire_id = profiles.id) or
          (a.destinataire_id = auth.uid() and a.demandeur_id    = profiles.id)
        )
    )
  );
