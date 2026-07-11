import { useState, useEffect, useCallback, useRef } from 'react'
import { X, CloudOff, Cloud, Mail, LogOut, Check, RefreshCw, Smartphone, CloudDownload, UserCircle2 } from 'lucide-react'
import { supabase, cloudDisponible } from '../lib/supabase'
import CaveAmisSection, { pushPartageSnapshot } from './CaveAmis'

// ═══════════════════════════════════════════════════════════════════════════
// Compte & synchronisation cloud — local-first.
// - Connexion par lien magique (email, sans mot de passe).
// - Au login : merge intelligent (cloud vide → push ; local vide → pull ;
//   sinon choix explicite de l'utilisateur).
// - Ensuite : auto-push débouncé dès qu'une clé localStorage synchronisée change.
// - Sans env vars Supabase : message d'indisponibilité élégant, app 100 % locale.
// ═══════════════════════════════════════════════════════════════════════════

export const SYNC_KEYS = {
  cave:    'oenotheque-v2',
  journal: 'oeno-journal',
  envies:  'oeno-envies',
  profil:  'oeno-profil',
  ecole:   'oeno-ecole',
}

export function snapshotLocal() {
  const snap = {}
  for (const [col, key] of Object.entries(SYNC_KEYS)) {
    try {
      const raw = localStorage.getItem(key)
      snap[col] = raw ? JSON.parse(raw) : null
    } catch {
      snap[col] = null
    }
  }
  return snap
}

function applyCloudToLocal(row) {
  for (const [col, key] of Object.entries(SYNC_KEYS)) {
    if (row[col] !== null && row[col] !== undefined) {
      localStorage.setItem(key, JSON.stringify(row[col]))
    }
  }
}

const isEmptyVal = v =>
  v === null || v === undefined ||
  (Array.isArray(v) && v.length === 0) ||
  (typeof v === 'object' && !Array.isArray(v) && Object.keys(v).length === 0)

const allEmpty = snap => Object.values(snap).every(isEmptyVal)

async function pushToCloud(userId) {
  const snap = snapshotLocal()
  const { error } = await supabase.from('user_data').upsert({
    user_id: userId,
    ...snap,
    updated_at: new Date().toISOString(),
  })
  if (error) throw error
  // Si la cave est partagée entre amis, on rafraîchit aussi le snapshot public
  await pushPartageSnapshot(userId).catch(() => {})
  return snap
}

// Hook réutilisé : session Supabase réactive (null si cloud indisponible)
export function useSession() {
  const [session, setSession] = useState(null)
  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(({ data }) => setSession(data.session ?? null))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])
  return session
}

export default function CompteSync({ onClose, extraSection = null }) {
  const session = useSession()
  const user = session?.user || null

  const [email, setEmail]       = useState('')
  const [sent, setSent]         = useState(false)
  const [busy, setBusy]         = useState(false)
  const [error, setError]       = useState(null)
  const [conflict, setConflict] = useState(null)  // { cloudRow } → choix utilisateur
  const [syncState, setSyncState] = useState('idle') // idle | syncing | synced
  const lastPushed = useRef(null)

  // ── Merge au login ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!user || !supabase) return
    let cancelled = false
    ;(async () => {
      setSyncState('syncing')
      try {
        // Profil minimal (pseudo par défaut : partie locale de l'email)
        await supabase.from('profiles').upsert({ id: user.id, pseudo: user.email?.split('@')[0] || 'Amateur' }, { ignoreDuplicates: true })

        const { data: row } = await supabase.from('user_data').select('*').eq('user_id', user.id).maybeSingle()
        if (cancelled) return
        const local = snapshotLocal()
        const cloudSnap = row ? Object.fromEntries(Object.keys(SYNC_KEYS).map(k => [k, row[k]])) : null

        if (!row || allEmpty(cloudSnap)) {
          // Cloud vide → on pousse le local
          lastPushed.current = JSON.stringify(await pushToCloud(user.id))
          setSyncState('synced')
        } else if (allEmpty(local)) {
          // Local vide → on récupère le cloud
          applyCloudToLocal(row)
          lastPushed.current = JSON.stringify(cloudSnap)
          setSyncState('synced')
          window.location.reload()
        } else if (JSON.stringify(local) === JSON.stringify(cloudSnap)) {
          lastPushed.current = JSON.stringify(local)
          setSyncState('synced')
        } else {
          setConflict({ cloudRow: row })
          setSyncState('idle')
        }
      } catch (e) {
        if (!cancelled) { setError('Synchronisation impossible pour le moment.'); setSyncState('idle') }
      }
    })()
    return () => { cancelled = true }
  }, [user?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Auto-push débouncé : surveille les clés localStorage toutes les 4 s ────
  useEffect(() => {
    if (!user || !supabase || conflict) return
    const tick = async () => {
      if (lastPushed.current === null) return
      const now = JSON.stringify(snapshotLocal())
      if (now !== lastPushed.current) {
        try {
          setSyncState('syncing')
          lastPushed.current = JSON.stringify(await pushToCloud(user.id))
          setSyncState('synced')
        } catch { setSyncState('idle') }
      }
    }
    const id = setInterval(tick, 4000)
    return () => clearInterval(id)
  }, [user?.id, conflict]) // eslint-disable-line react-hooks/exhaustive-deps

  const sendLink = useCallback(async e => {
    e.preventDefault()
    if (!email.trim()) return
    setBusy(true); setError(null)
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: { emailRedirectTo: window.location.origin },
      })
      if (error) throw error
      setSent(true)
    } catch {
      setError('Envoi du lien impossible. Vérifiez l\'adresse et réessayez.')
    } finally { setBusy(false) }
  }, [email])

  const keepLocal = useCallback(async () => {
    setConflict(null); setSyncState('syncing')
    try {
      lastPushed.current = JSON.stringify(await pushToCloud(user.id))
      setSyncState('synced')
    } catch { setSyncState('idle'); setError('Synchronisation impossible pour le moment.') }
  }, [user])

  const keepCloud = useCallback(() => {
    applyCloudToLocal(conflict.cloudRow)
    setConflict(null)
    window.location.reload()
  }, [conflict])

  const logout = useCallback(async () => {
    await supabase.auth.signOut()
    lastPushed.current = null
    setSyncState('idle')
  }, [])

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center scrim animate-fade-in" onClick={onClose}>
      <div className="modal-panel max-w-md sm:mx-4 max-h-[90dvh]" onClick={e => e.stopPropagation()}>
        {/* En-tête */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-anthracite-900/[0.07]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-wine-800 flex items-center justify-center shadow-wine">
              {cloudDisponible ? <Cloud size={17} className="text-gold-400" /> : <CloudOff size={17} className="text-gold-400" />}
            </div>
            <div>
              <span className="eyebrow">Mon compte</span>
              <h2 className="font-serif text-lg font-bold text-anthracite-900 leading-tight">Sauvegarde & synchronisation</h2>
            </div>
          </div>
          <button onClick={onClose} aria-label="Fermer"
                  className="w-11 h-11 flex items-center justify-center rounded-full text-anthracite-400 hover:text-anthracite-800 hover:bg-anthracite-900/5 transition-all cursor-pointer">
            <X size={17} />
          </button>
        </div>

        <div className="px-6 py-6 overflow-y-auto">
          {/* Cloud indisponible (env vars absentes) */}
          {!cloudDisponible && (
            <div className="text-center py-6">
              <CloudOff size={36} className="text-anthracite-200 mx-auto mb-4" />
              <p className="font-serif text-base text-anthracite-600 mb-2">La sauvegarde cloud arrive bientôt</p>
              <p className="text-xs text-anthracite-400 leading-relaxed max-w-xs mx-auto">
                Pas d'inquiétude : votre cave, vos mémoires de vin et vos envies sont
                soigneusement conservées sur cet appareil. Rien ne se perd.
              </p>
            </div>
          )}

          {/* Non connecté */}
          {cloudDisponible && !user && !sent && (
            <form onSubmit={sendLink}>
              <p className="text-sm text-anthracite-600 leading-relaxed mb-5">
                Créez un compte (ou reconnectez-vous) pour retrouver votre cave sur tous
                vos appareils. Pas de mot de passe : un simple lien envoyé par email.
              </p>
              <label className="label" htmlFor="sync-email">Votre adresse email</label>
              <input
                id="sync-email" type="email" required value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="vous@exemple.fr" className="input-field mb-4" autoComplete="email"
              />
              {error && <p className="text-xs text-red-700 mb-3">{error}</p>}
              <button type="submit" disabled={busy} className="btn-gold w-full justify-center disabled:opacity-60">
                <Mail size={14} />
                {busy ? 'Envoi…' : 'Recevoir mon lien de connexion'}
              </button>
            </form>
          )}

          {/* Lien envoyé */}
          {cloudDisponible && !user && sent && (
            <div className="text-center py-6 animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-gold-500/15 flex items-center justify-center mx-auto mb-4">
                <Mail size={20} className="text-gold-600" />
              </div>
              <p className="font-serif text-base text-anthracite-800 mb-2">Le lien est en route</p>
              <p className="text-xs text-anthracite-400 leading-relaxed max-w-xs mx-auto">
                Ouvrez l'email envoyé à <span className="font-semibold text-anthracite-600">{email}</span> et
                cliquez sur le lien : vous serez connecté ici même.
              </p>
              <button onClick={() => setSent(false)} className="btn-ghost text-xs px-4 py-2 mt-5">Changer d'adresse</button>
            </div>
          )}

          {/* Conflit de merge : choix utilisateur */}
          {cloudDisponible && user && conflict && (
            <div className="animate-fade-in">
              <p className="text-sm text-anthracite-700 leading-relaxed mb-5">
                Des données existent <strong>sur cet appareil</strong> et <strong>dans le cloud</strong>,
                et elles diffèrent. Lesquelles souhaitez-vous garder ?
              </p>
              <div className="space-y-3">
                <button onClick={keepLocal} className="choice-btn w-full p-4 flex items-start gap-3">
                  <Smartphone size={18} className="text-wine-800 flex-shrink-0 mt-0.5" />
                  <span>
                    <span className="block text-sm font-bold text-anthracite-900">Garder les données de cet appareil</span>
                    <span className="block text-xs text-anthracite-500 mt-1">Elles remplaceront la sauvegarde cloud.</span>
                  </span>
                </button>
                <button onClick={keepCloud} className="choice-btn w-full p-4 flex items-start gap-3">
                  <CloudDownload size={18} className="text-wine-800 flex-shrink-0 mt-0.5" />
                  <span>
                    <span className="block text-sm font-bold text-anthracite-900">Récupérer celles du cloud</span>
                    <span className="block text-xs text-anthracite-500 mt-1">Cet appareil sera mis à jour avec votre sauvegarde.</span>
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Connecté */}
          {cloudDisponible && user && !conflict && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-anthracite-900/10 mb-4">
                <UserCircle2 size={28} className="text-wine-800 flex-shrink-0" strokeWidth={1.5} />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-anthracite-900 truncate">{user.email}</div>
                  <div className="flex items-center gap-1.5 text-[11px] mt-0.5">
                    {syncState === 'syncing' && <><RefreshCw size={10} className="text-gold-600 animate-spin" /><span className="text-gold-700">Synchronisation…</span></>}
                    {syncState === 'synced'  && <><Check size={10} className="text-emerald-600" /><span className="text-emerald-700">Cave synchronisée</span></>}
                    {syncState === 'idle'    && <span className="text-anthracite-400">Connecté</span>}
                  </div>
                </div>
                <button onClick={logout} className="btn-ghost text-xs px-3.5 py-2 flex-shrink-0">
                  <LogOut size={12} /> Déconnexion
                </button>
              </div>
              <p className="text-[11px] text-anthracite-400 leading-relaxed">
                Votre cave, vos mémoires de vin, vos envies, votre profil de goût et votre
                progression à l'École sont sauvegardés automatiquement, quelques secondes
                après chaque modification.
              </p>
              {error && <p className="text-xs text-red-700 mt-3">{error}</p>}
              <CaveAmisSection user={user} />
              {extraSection}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
