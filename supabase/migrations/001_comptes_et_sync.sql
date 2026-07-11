-- Œno — Chantier 1 : comptes + synchronisation cloud (approche document)
-- À appliquer sur le projet Supabase (SQL Editor ou supabase db push).

-- Profils utilisateurs
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  pseudo text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles
  for select to authenticated using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles
  for insert to authenticated with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles
  for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

-- Données synchronisées : blobs localStorage tels quels (document store)
create table if not exists public.user_data (
  user_id uuid primary key references auth.users (id) on delete cascade,
  cave jsonb,
  journal jsonb,
  envies jsonb,
  profil jsonb,
  ecole jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_data enable row level security;

create policy "user_data_select_own" on public.user_data
  for select to authenticated using (auth.uid() = user_id);
create policy "user_data_insert_own" on public.user_data
  for insert to authenticated with check (auth.uid() = user_id);
create policy "user_data_update_own" on public.user_data
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "user_data_delete_own" on public.user_data
  for delete to authenticated using (auth.uid() = user_id);
