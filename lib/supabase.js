// ═══════════════════════════════════════════════════════════════════════════
// Client Supabase — entièrement optionnel.
// Si NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY sont absents
// (build CI, mode local pur), `supabase` vaut null et l'app fonctionne
// exactement comme avant, 100 % en localStorage.
// ═══════════════════════════════════════════════════════════════════════════
import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = url && anonKey ? createClient(url, anonKey) : null

export const cloudDisponible = Boolean(supabase)
