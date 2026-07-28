// ═══════════════════════════════════════════════════════════════════════════
// Couche données du social — amis, demandes, discussions.
//
// Règle de survie : aucune de ces fonctions ne jette. Sans compte, sans
// Supabase configuré ou sans réseau, elles renvoient une forme vide mais
// valide, et l'onglet Social affiche un état d'attente au lieu de casser.
// Le reste de l'app (cave, scan, recherche) est 100 % local et ne dépend
// jamais d'elles.
// ═══════════════════════════════════════════════════════════════════════════
import { supabase, cloudDisponible } from './supabase'

const VIDE = { ok: false, horsLigne: true }

// Enveloppe commune : capte les pannes réseau et les absences de compte.
async function sur(fn, repli = null) {
  if (!supabase) return { ...VIDE, data: repli }
  try {
    const { data, error } = await fn()
    if (error) return { ok: false, erreur: error.message, data: repli }
    return { ok: true, data }
  } catch (e) {
    return { ok: false, erreur: e?.message || 'réseau', horsLigne: true, data: repli }
  }
}

export async function utilisateurCourant() {
  if (!supabase) return null
  try {
    const { data } = await supabase.auth.getUser()
    return data?.user || null
  } catch { return null }
}

// ── Identité ───────────────────────────────────────────────────────────────

/** Mon code d'ami permanent (créé à la volée si le profil manquait). */
export async function monCode() {
  const r = await sur(() => supabase.rpc('mon_code_ami'))
  return r.ok ? r.data : null
}

export async function definirPseudo(pseudo) {
  return sur(() => supabase.rpc('definir_pseudo', { nouveau: pseudo }))
}

export async function monPseudo(userId) {
  if (!supabase || !userId) return null
  const r = await sur(() => supabase.from('profiles').select('pseudo').eq('id', userId).maybeSingle())
  return r.ok ? (r.data?.pseudo || null) : null
}

// ── Amis ───────────────────────────────────────────────────────────────────

/**
 * Mes liens, déjà triés (demandes en attente d'abord) et enrichis du nombre
 * de messages non lus. Un seul aller-retour réseau.
 */
export async function mesAmis() {
  const r = await sur(() => supabase.rpc('mes_amis'), [])
  const liste = Array.isArray(r.data) ? r.data : []
  return {
    ok: r.ok,
    horsLigne: r.horsLigne,
    // Ce que l'autre m'a envoyé et que je n'ai pas encore accepté
    demandes: liste.filter(a => a.statut === 'en_attente' && !a.je_suis_demandeur),
    // Ce que j'ai envoyé et qui attend sa réponse
    envoyees: liste.filter(a => a.statut === 'en_attente' && a.je_suis_demandeur),
    amis: liste.filter(a => a.statut === 'accepte'),
  }
}

/** Traduction des refus du serveur en phrases lisibles. */
const RAISONS = {
  code_inconnu: "Ce code d'ami n'existe pas. Vérifiez les 7 caractères.",
  soi_meme: 'C\'est votre propre code ! Envoyez-le plutôt à un ami.',
  deja_amis: 'Vous êtes déjà amis.',
  deja_demande: 'Votre invitation est déjà partie — il ne reste qu\'à attendre.',
  non_connecte: 'Connectez-vous pour ajouter des amis.',
}

export async function demanderAmi(code) {
  const propre = (code || '').trim().toUpperCase()
  if (propre.length < 4) return { ok: false, message: 'Code trop court.' }

  const r = await sur(() => supabase.rpc('demander_ami', { code: propre }))
  if (!r.ok) {
    return { ok: false, message: r.horsLigne ? 'Pas de réseau — réessayez dans un instant.' : 'Envoi impossible.' }
  }
  const d = r.data || {}
  if (!d.ok) return { ok: false, message: RAISONS[d.raison] || 'Invitation impossible.' }
  return {
    ok: true,
    message: d.etat === 'accepte'
      ? `🎉 ${d.pseudo} vous avait déjà invité — vous êtes amis !`
      : `📨 Invitation envoyée à ${d.pseudo}.`,
  }
}

export async function accepterAmi(amiId) {
  return sur(() => supabase.from('amities').update({ statut: 'accepte' })
    .eq('demandeur_id', amiId).eq('statut', 'en_attente'))
}

/** Refuser une demande, ou retirer un ami : la ligne disparaît des deux côtés. */
export async function retirerAmi(amiId) {
  return sur(() => supabase.from('amities').delete()
    .or(`demandeur_id.eq.${amiId},destinataire_id.eq.${amiId}`))
}

// ── Discussion ─────────────────────────────────────────────────────────────

export async function lireFil(amiId, max = 100) {
  const r = await sur(() => supabase.from('messages')
    .select('id, expediteur_id, destinataire_id, contenu, vin, lu, created_at')
    .or(`expediteur_id.eq.${amiId},destinataire_id.eq.${amiId}`)
    .order('created_at', { ascending: true })
    .limit(max), [])
  return Array.isArray(r.data) ? r.data : []
}

export async function envoyerMessage(amiId, contenu, vin = null) {
  const texte = (contenu || '').trim()
  if (!texte && !vin) return { ok: false }
  const moi = await utilisateurCourant()
  if (!moi) return { ok: false, message: 'Connectez-vous pour écrire.' }

  return sur(() => supabase.from('messages').insert({
    expediteur_id: moi.id,
    destinataire_id: amiId,
    contenu: texte || '🍷 Regarde cette bouteille',
    vin,
  }))
}

export async function marquerLus(amiId) {
  return sur(() => supabase.from('messages').update({ lu: true })
    .eq('expediteur_id', amiId).eq('lu', false))
}

/**
 * Écoute les messages entrants en direct. Renvoie une fonction de
 * désabonnement, y compris quand le temps réel n'est pas disponible.
 */
export function ecouterMessages(onMessage) {
  if (!supabase) return () => {}
  try {
    const canal = supabase
      .channel('messages-entrants')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' },
        payload => onMessage?.(payload.new))
      .subscribe()
    return () => { try { supabase.removeChannel(canal) } catch { /* déjà fermé */ } }
  } catch {
    return () => {}
  }
}

// ── Cave d'un ami ──────────────────────────────────────────────────────────

/** La cave partagée d'un ami (nulle s'il n'a pas activé le partage). */
export async function caveDeLAmi(amiId) {
  const r = await sur(() => supabase.from('partages')
    .select('pseudo_owner, cave, envies, updated_at')
    .eq('owner_id', amiId).maybeSingle())
  return r.ok ? r.data : null
}

/** Cave ouverte par lien public « ?cave=CODE » (fonctionne sans compte). */
export async function caveParCode(code) {
  const r = await sur(() => supabase.rpc('cave_par_code', { code_recherche: (code || '').trim().toUpperCase() }))
  const ligne = Array.isArray(r.data) ? r.data[0] : r.data
  return ligne || null
}

export { cloudDisponible }
