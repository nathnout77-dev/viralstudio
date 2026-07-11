-- Œno — Chantier 2 : cave entre amis (partage par snapshot + code court)

create table if not exists public.partages (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  code text not null unique,
  pseudo_owner text,
  cave jsonb,
  envies jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists partages_owner_idx on public.partages (owner_id);

alter table public.partages enable row level security;

-- Lecture publique par code (le code court fait office de capacité)
create policy "partages_select_public" on public.partages
  for select to anon, authenticated using (true);

-- Écriture uniquement par le propriétaire
create policy "partages_insert_own" on public.partages
  for insert to authenticated with check (auth.uid() = owner_id);
create policy "partages_update_own" on public.partages
  for update to authenticated using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "partages_delete_own" on public.partages
  for delete to authenticated using (auth.uid() = owner_id);
