-- ═══════════════════════════════════════════════════════════════════════════
-- Supprimer son compte, depuis l'application.
--
-- Exigé par Google Play pour toute app qui permet de créer un compte : la
-- suppression doit être possible DANS l'app, sans écrire à personne.
--
-- Un client ne peut pas effacer sa ligne de auth.users avec la clé anonyme ;
-- d'où une fonction SECURITY DEFINER, qui ne sait faire qu'une chose :
-- supprimer le compte de celui qui l'appelle (auth.uid()), jamais un autre.
--
-- Pourquoi une seule instruction suffit : toutes les tables qui pointent vers
-- auth.users sont en ON DELETE CASCADE — profiles, user_data, partages,
-- amities (dans les deux sens), messages (envoyés et reçus), abonnements_push.
-- Vérifié sur le schéma de production le 1er octobre 2026. Une table ajoutée
-- plus tard sans cascade ferait échouer la suppression (clé étrangère) au
-- lieu de laisser des données orphelines : l'échec est voulu, il se voit.
--
-- scan_cache n'est pas concerné : c'est un cache d'étiquettes partagé, sans
-- lien avec un compte.
-- ═══════════════════════════════════════════════════════════════════════════

create or replace function public.supprimer_mon_compte()
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  moi uuid := auth.uid();
begin
  if moi is null then
    raise exception 'non connecté' using errcode = '28000';
  end if;
  delete from auth.users where id = moi;
end;
$$;

revoke all on function public.supprimer_mon_compte() from public, anon;
grant execute on function public.supprimer_mon_compte() to authenticated;
