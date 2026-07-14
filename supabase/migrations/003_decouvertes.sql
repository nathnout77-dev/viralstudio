-- Œno — Chantier 3 : « Mes découvertes » (vins scannés hors bibliothèque)
-- Ajoute la colonne document synchronisée à user_data (approche document,
-- cohérente avec 001). La clé localStorage 'oeno-decouvertes' est déjà mappée
-- sur cette colonne dans SYNC_KEYS (components/CompteSync.jsx).
-- À appliquer sur le projet Supabase (SQL Editor ou supabase db push).

alter table public.user_data
  add column if not exists decouvertes jsonb;
