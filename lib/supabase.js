// ═══════════════════════════════════════════════════════════════════════════
// Client Supabase — entièrement optionnel.
// Si NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY sont absents
// (build CI, mode local pur), `supabase` vaut null et l'app fonctionne
// exactement comme avant, 100 % en localStorage.
// ═══════════════════════════════════════════════════════════════════════════
import { createClient } from '@supabase/supabase-js'

// Nettoie les artefacts de copier-coller (espaces insécables, caractères
// invisibles, guillemets typographiques…) qui se glissent parfois dans les
// variables d'environnement collées dans Vercel. Un seul caractère hors
// ASCII dans la clé fait échouer TOUS les appels : le navigateur refuse de
// construire l'en-tête HTTP (« non ISO-8859-1 code point »).
const clean = s => (s || '').replace(/[^\x21-\x7E]/g, '')

const url = clean(process.env.NEXT_PUBLIC_SUPABASE_URL)
const anonKey = clean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export const supabase = url && anonKey ? createClient(url, anonKey) : null

export const cloudDisponible = Boolean(supabase)
