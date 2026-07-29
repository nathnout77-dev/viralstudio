import { useState, useEffect, useCallback, useRef } from 'react'
import { X, CloudOff, Cloud, Mail, LogOut, Check, RefreshCw, Smartphone, CloudDownload, UserCircle2, Download, Upload, ShieldCheck } from 'lucide-react'
import { supabase, cloudDisponible } from '../lib/supabase'
import CaveAmisSection, { pushPartageSnapshot } from './CaveAmis'
import ReglagesNotifications from './ReglagesNotifications'
import useModalBehavior from '../lib/useModal'
import { toast } from './Toast'

// ═══════════════════════════════════════════════════════════════════════════
// Compte & synchronisation cloud — local-first.
// - Connexion par lien magique (email, sans mot de passe).
// - Au login : merge intelligent (cloud vide → push ; local vide → pull ;
//   sinon choix explicite de l'utilisateur).
// - Ensuite : auto-push débouncé dès qu'une clé localStorage synchronisée change.
// - Sans env vars Supabase : message d'indisponibilité élégant, app 100 % locale.
// ═══════════════════════════════════════════════════════════════════════════

export const SYNC_KEYS = {
  cave:        'oenotheque-v2',
  journal:     'oeno-journal',
  envies:      'oeno-envies',
  profil:      'oeno-profil',
  ecole:       'oeno-ecole',
  decouvertes: 'oeno-decouvertes',
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

// ═══════════════════════════════════════════════════════════════════════════
// Filet de sécurité local — export/import d'un fichier JSON unique regroupant
// toutes les clés localStorage de l'app. Disponible que le cloud soit
// configuré ou non : quand il ne l'est pas, c'est la seule sauvegarde
// possible ; quand il l'est, c'est un complément (jamais un remplacement
// de la synchronisation cloud, qui reste prioritaire et automatique).
// ═══════════════════════════════════════════════════════════════════════════

function exportSauvegardeLocale() {
  const snap = snapshotLocal()
  const payload = { app: 'oeno', version: 1, exportedAt: new Date().toISOString(), data: snap }
  const date = new Date().toISOString().slice(0, 10)
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `oeno-sauvegarde-${date}.json`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
  toast('Sauvegarde exportée')
}

function restaurerSauvegardeLocale(file, onDone) {
  const reader = new FileReader()
  reader.onload = () => {
    let parsed
    try {
      parsed = JSON.parse(reader.result)
    } catch {
      onDone('Fichier illisible : ce n\'est pas une sauvegarde Œno valide.')
      return
    }
    const data = parsed?.data && typeof parsed.data === 'object' ? parsed.data : null
    if (!data) {
      onDone('Fichier illisible : ce n\'est pas une sauvegarde Œno valide.')
      return
    }
    const confirmed = window.confirm(
      'Restaurer ce fichier remplacera votre cave, vos mémoires de vin, vos envies, ' +
      'votre profil et votre progression École actuels sur cet appareil. Continuer ?'
    )
    if (!confirmed) return
    for (const [col, key] of Object.entries(SYNC_KEYS)) {
      if (Object.prototype.hasOwnProperty.call(data, col) && data[col] !== undefined) {
        try {
          if (data[col] === null) localStorage.removeItem(key)
          else localStorage.setItem(key, JSON.stringify(data[col]))
        } catch {}
      }
    }
    toast('Sauvegarde restaurée')
    onDone(null, true)
  }
  reader.onerror = () => onDone('Impossible de lire ce fichier.')
  reader.readAsText(file)
}

function ExportRestoreLocal({ compact = false }) {
  const [err, setErr] = useState(null)
  const inputId = compact ? 'restore-file-compact' : 'restore-file'

  const handleFile = e => {
    const file = e.target.files?.[0]
    e.target.value = '' // permet de re-sélectionner le même fichier plus tard
    if (!file) return
    setErr(null)
    restaurerSauvegardeLocale(file, (error, reload) => {
      if (error) { setErr(error); return }
      if (reload) window.location.reload()
    })
  }

  return (
    <div className={compact ? 'mt-4 pt-4 border-t border-anthracite-900/[0.07]' : ''}>
      {!compact && (
        <div className="flex items-start gap-2 mb-3">
          <ShieldCheck size={14} className="text-wine-800 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-anthracite-500 leading-relaxed">
            En attendant, gardez un filet de sécurité local : exportez un fichier de
            sauvegarde, ou restaurez-en un précédemment téléchargé.
          </p>
        </div>
      )}
      {compact && (
        <p className="text-[11px] text-anthracite-400 leading-relaxed mb-2.5">
          Filet de sécurité local, en complément de la sauvegarde cloud.
        </p>
      )}
      <div className="flex flex-wrap gap-2.5">
        <button type="button" onClick={exportSauvegardeLocale} className="btn-ghost text-xs px-3.5 py-2">
          <Download size={12} /> Exporter mes données
        </button>
        <label htmlFor={inputId} className="btn-ghost text-xs px-3.5 py-2 cursor-pointer">
          <Upload size={12} /> Restaurer depuis un fichier
          <input id={inputId} type="file" accept="application/json" onChange={handleFile} className="hidden" />
        </label>
      </div>
      {err && <p className="text-xs text-red-700 mt-2.5">{err}</p>}
    </div>
  )
}

export default function CompteSync({ onClose, extraSection = null }) {
  useModalBehavior(onClose)
  const session = useSession()
  const user = session?.user || null

  const [email, setEmail]       = useState('')
  const [sent, setSent]         = useState(false)
  const [code, setCode]         = useState('')
  const [busy, setBusy]         = useState(false)
  const [error, setError]       = useState(null)
  const [resendIn, setResendIn] = useState(0)   // secondes avant de pouvoir renvoyer l'email

  useEffect(() => {
    if (resendIn <= 0) return
    const id = setInterval(() => setResendIn(s => (s > 1 ? s - 1 : 0)), 1000)
    return () => clearInterval(id)
  }, [resendIn > 0]) // eslint-disable-line react-hooks/exhaustive-deps
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

  // Envoi (et renvoi) de l'email de connexion. Supabase impose ~60 s entre
  // deux envois vers la même adresse : le compte à rebours l'affiche plutôt
  // que de laisser l'utilisateur prendre un « rate limit » en réessayant.
  const doSend = useCallback(async () => {
    if (!email.trim()) return
    setBusy(true); setError(null)
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: { emailRedirectTo: window.location.origin },
      })
      if (error) throw error
      setSent(true)
      setResendIn(60)
    } catch (err) {
      // On affiche la cause réelle : le message générique masquait tout
      // (limite d'envoi du mailer gratuit Supabase, inscriptions coupées…).
      const msg = String(err?.message || '').replace(/^\{\}$/, '')
      const status = err?.status || err?.code || ''
      if (/rate limit|too many/i.test(msg) || status === 429) {
        setError('Limite d\'envoi d\'emails atteinte. Patientez une minute (ou une heure si ça persiste) puis réessayez.')
      } else if (/signup|not allowed|disabled/i.test(msg)) {
        setError('Les inscriptions par email sont désactivées côté serveur (Supabase → Authentication → Sign In / Up → Email).')
      } else if (/error sending|smtp|mail/i.test(msg) || status >= 500 || (!msg && status === '')) {
        setError('Le serveur n\'a pas réussi à envoyer l\'email : la configuration SMTP (Brevo) côté Supabase semble incorrecte — expéditeur non validé, mauvais port ou mauvaise clé SMTP.')
      } else {
        setError(`Envoi impossible${msg ? ` : ${msg}` : ''}${status ? ` (code ${status})` : ''}. Vérifiez l'adresse et réessayez.`)
      }
    } finally { setBusy(false) }
  }, [email])

  const sendLink = useCallback(e => { e.preventDefault(); doSend() }, [doSend])

  // Connexion par code à 6 chiffres (contenu dans le même email que le lien) :
  // fonctionne même si le lien magique redirige vers une mauvaise adresse.
  const verifyCode = useCallback(async e => {
    e.preventDefault()
    const token = code.trim().replace(/\s/g, '')
    if (!token) return
    setBusy(true); setError(null)
    try {
      const { error } = await supabase.auth.verifyOtp({ email: email.trim(), token, type: 'email' })
      if (error) throw error
      setSent(false); setCode('')
    } catch {
      setError('Code invalide ou expiré. Vérifiez-le, ou renvoyez un email.')
    } finally { setBusy(false) }
  }, [email, code])

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
            <div className="py-2">
              <div className="text-center mb-5">
                <CloudOff size={36} className="text-anthracite-200 mx-auto mb-4" />
                <p className="font-serif text-base text-anthracite-600 mb-2">
                  La synchronisation cloud n'est pas encore activée
                </p>
                <p className="text-xs text-anthracite-400 leading-relaxed max-w-xs mx-auto">
                  Votre cave, vos mémoires de vin, vos envies et votre profil ne vivent
                  aujourd'hui que sur cet appareil, dans ce navigateur. Si vous videz son
                  historique ou en changez, ces données peuvent être perdues.
                </p>
              </div>
              <ExportRestoreLocal />
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
              <ExportRestoreLocal compact />
            </form>
          )}

          {/* Lien envoyé */}
          {cloudDisponible && !user && sent && (
            <div className="text-center py-6 animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-gold-500/15 flex items-center justify-center mx-auto mb-4">
                <Mail size={20} className="text-gold-600" />
              </div>
              <p className="font-serif text-base text-anthracite-800 mb-2">L'email est en route</p>
              <p className="text-xs text-anthracite-400 leading-relaxed max-w-xs mx-auto">
                Ouvrez l'email envoyé à <span className="font-semibold text-anthracite-600">{email}</span> :
                cliquez sur le lien, ou recopiez ici le code à 6 chiffres qu'il contient.
              </p>
              <form onSubmit={verifyCode} className="mt-5 max-w-[240px] mx-auto">
                <input
                  type="text" inputMode="numeric" autoComplete="one-time-code"
                  value={code} onChange={e => setCode(e.target.value)}
                  placeholder="Code à 6 chiffres"
                  className="input-field text-center tracking-[0.3em] font-semibold"
                  maxLength={8}
                />
                {error && <p className="text-xs text-red-700 mt-2">{error}</p>}
                <button type="submit" disabled={busy || !code.trim()} className="btn-gold w-full justify-center mt-3 disabled:opacity-60">
                  {busy ? 'Vérification…' : 'Me connecter avec ce code'}
                </button>
              </form>
              <p className="text-[11px] text-anthracite-400 mt-5">
                Rien reçu ? Vérifiez vos indésirables (spam), puis :
              </p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <button
                  onClick={doSend}
                  disabled={busy || resendIn > 0}
                  className="btn-ghost text-xs px-4 py-2 disabled:opacity-50"
                >
                  <RefreshCw size={12} className={busy ? 'animate-spin' : ''} />
                  {resendIn > 0 ? `Renvoyer l'email (${resendIn}s)` : 'Renvoyer l\'email'}
                </button>
                <button onClick={() => { setSent(false); setCode(''); setError(null) }} className="btn-ghost text-xs px-4 py-2">Changer d'adresse</button>
              </div>
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
              <ReglagesNotifications compact />
              <ExportRestoreLocal compact />
              {extraSection}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
