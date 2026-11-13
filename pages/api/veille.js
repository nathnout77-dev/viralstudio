// ═══════════════════════════════════════════════════════════════════════════
// /api/veille — garde la sauvegarde en ligne éveillée.
//
// Sur l'offre gratuite, Supabase met un projet en pause après une semaine
// sans activité. Tant qu'il dort, toute connexion échoue en « Failed to
// fetch » — c'est arrivé, et l'app accusait alors l'adresse email saisie.
//
// Vercel appelle cette route une fois par jour (vercel.json) ; elle pose une
// requête minuscule à la base, ce qui compte comme une visite. Elle ne lit
// ni n'écrit aucune donnée d'utilisateur, et ne rend que « ok » ou non.
//
// Portée honnête : cela repousse la pause, cela ne remplace pas une offre
// payante si Œno a de vrais utilisateurs. Sans Supabase configuré, la route
// répond qu'il n'y a rien à veiller — le reste d'Œno ne dépend pas d'elle.
// ═══════════════════════════════════════════════════════════════════════════

const URL_SUPABASE = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim().replace(/\/$/, '')
const CLE_ANON = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim()

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()
  if (!URL_SUPABASE || !CLE_ANON) return res.status(200).json({ veille: 'sans objet' })
  try {
    // Une ligne d'une table publique : la plus petite requête qui touche la base.
    const r = await fetch(`${URL_SUPABASE}/rest/v1/scan_cache?select=cle&limit=1`, {
      headers: { apikey: CLE_ANON, Authorization: `Bearer ${CLE_ANON}` },
    })
    // Un refus (401, 404 sur la colonne) reste une visite : la base a répondu.
    return res.status(200).json({ veille: r.status < 500 ? 'ok' : 'base indisponible', statut: r.status })
  } catch {
    return res.status(200).json({ veille: 'injoignable' })
  }
}
