-- Œno — Chantier 5 : notifications Web Push (application fermée)
-- À appliquer sur le projet Supabase (SQL Editor ou supabase db push).
--
-- Sans cette migration, l'app fonctionne comme avant : elle prévient tant
-- qu'elle tourne (au premier plan ou en arrière-plan). Avec elle, plus les
-- deux clés VAPID côté Vercel, elle prévient aussi application fermée.
--
-- Rien de sensible n'est stocké ici : un abonnement push est une adresse
-- opaque fournie par le navigateur (Google, Mozilla, Apple selon le cas) et
-- deux clés de chiffrement publiques. Il ne dit rien de l'appareil, et il
-- devient inutilisable dès que l'utilisateur retire l'autorisation.

create table if not exists public.abonnements_push (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade,
  -- L'adresse d'envoi fait office d'identité : un même appareil réabonné
  -- réutilise la même ligne au lieu d'en accumuler.
  endpoint   text not null unique,
  p256dh     text not null,
  auth       text not null,
  created_at timestamptz not null default now()
);

create index if not exists abonnements_push_user_idx on public.abonnements_push (user_id);

alter table public.abonnements_push enable row level security;

-- Chacun ne voit et ne gère que ses propres abonnements.
drop policy if exists "abonnements_push_select_own" on public.abonnements_push;
drop policy if exists "abonnements_push_insert_own" on public.abonnements_push;
drop policy if exists "abonnements_push_update_own" on public.abonnements_push;
drop policy if exists "abonnements_push_delete_own" on public.abonnements_push;

create policy "abonnements_push_select_own" on public.abonnements_push
  for select to authenticated using (auth.uid() = user_id);
create policy "abonnements_push_insert_own" on public.abonnements_push
  for insert to authenticated with check (auth.uid() = user_id);
create policy "abonnements_push_update_own" on public.abonnements_push
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "abonnements_push_delete_own" on public.abonnements_push
  for delete to authenticated using (auth.uid() = user_id);

-- « Cette personne est-elle mon amie ? » — repris de la migration 004 pour que
-- celle-ci puisse s'appliquer seule, dans n'importe quel ordre. Identique.
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

-- Où envoyer la notification d'un ami à qui l'on vient d'écrire.
--
-- C'est le cœur du dispositif : l'expéditeur ne peut obtenir les adresses
-- d'envoi que de personnes avec qui l'amitié est établie, et la vérification
-- se fait ici, en base — pas dans le code appelant, qu'un tiers pourrait
-- contourner. SECURITY DEFINER pour lire une ligne dont on n'est pas
-- propriétaire, mais uniquement à cette condition-là.
create or replace function public.abonnements_push_ami(destinataire uuid)
returns table (endpoint text, p256dh text, auth text)
language sql
stable
security definer
set search_path = public
as $$
  select a.endpoint, a.p256dh, a.auth
  from public.abonnements_push a
  where a.user_id = destinataire
    and public.est_mon_ami(destinataire);
$$;

revoke all on function public.abonnements_push_ami(uuid) from public, anon;
grant execute on function public.abonnements_push_ami(uuid) to authenticated;

-- Une adresse d'envoi finit par expirer (autorisation retirée, app
-- désinstallée) : le service d'envoi répond alors « 410 Gone » et la ligne
-- doit disparaître, sans quoi on réessaie indéfiniment. Seuls le propriétaire
-- et ses amis — les seuls à connaître l'adresse — peuvent la retirer.
create or replace function public.oublier_abonnement_push(endpoint_mort text)
returns void
language sql
volatile
security definer
set search_path = public
as $$
  delete from public.abonnements_push a
  where a.endpoint = endpoint_mort
    and (a.user_id = auth.uid() or public.est_mon_ami(a.user_id));
$$;

revoke all on function public.oublier_abonnement_push(text) from public, anon;
grant execute on function public.oublier_abonnement_push(text) to authenticated;
