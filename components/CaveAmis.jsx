import { useState, useEffect, useCallback } from 'react'
import { X, Users, Link2, Check, Gift, Heart, Wine, Copy, Share2, EyeOff, Loader2 } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { snapshotLocal } from './CompteSync'
import WineCard from './WineCard'
import { loadEnvies } from './Envies'

// ═══════════════════════════════════════════════════════════════════════════
// Cave entre amis — partage par snapshot + code court.
// Le partage n'existe que si l'utilisateur l'active ; le snapshot (cave +
// envies) est re-poussé à chaque synchronisation. Lecture publique par code.
// ═══════════════════════════════════════════════════════════════════════════

const PARTAGE_KEY = 'oeno-partage'
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789' // sans caractères ambigus

export function loadPartage() {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(PARTAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

function genCode() {
  const arr = new Uint8Array(7)
  crypto.getRandomValues(arr)
  return Array.from(arr, b => ALPHABET[b % ALPHABET.length]).join('')
}

// Re-pousse le snapshot partagé (appelé par l'auto-push de CompteSync)
export async function pushPartageSnapshot(userId) {
  const partage = loadPartage()
  if (!partage?.code || !supabase) return
  const snap = snapshotLocal()
  await supabase.from('partages').upsert({
    owner_id: userId,
    code: partage.code,
    pseudo_owner: partage.pseudo || 'Un ami',
    cave: snap.cave,
    envies: snap.envies,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'owner_id' })
}

// ── Section « Cave entre amis » (dans le modal CompteSync, état connecté) ────
export default function CaveAmisSection({ user }) {
  const [partage, setPartage] = useState(null)
  const [pseudo, setPseudo]   = useState('')
  const [codeAmi, setCodeAmi] = useState('')
  const [copied, setCopied]   = useState(false)
  const [busy, setBusy]       = useState(false)

  useEffect(() => {
    const p = loadPartage()
    setPartage(p)
    if (p?.pseudo) setPseudo(p.pseudo)
  }, [])

  const lien = partage?.code
    ? `${typeof window !== 'undefined' ? window.location.origin : ''}/?cave=${partage.code}`
    : null

  const activer = useCallback(async () => {
    setBusy(true)
    try {
      const p = { code: loadPartage()?.code || genCode(), pseudo: pseudo.trim() || 'Un ami' }
      localStorage.setItem(PARTAGE_KEY, JSON.stringify(p))
      setPartage(p)
      await pushPartageSnapshot(user.id)
    } finally { setBusy(false) }
  }, [pseudo, user])

  const arreter = useCallback(async () => {
    setBusy(true)
    try {
      await supabase.from('partages').delete().eq('owner_id', user.id)
      localStorage.removeItem(PARTAGE_KEY)
      setPartage(null)
    } finally { setBusy(false) }
  }, [user])

  const copier = useCallback(async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Ma cave à vin sur Œno', text: `Viens voir ma cave à vin sur Œno !`, url: lien })
        return
      }
      throw new Error('no-share')
    } catch {
      try { await navigator.clipboard.writeText(lien) } catch {}
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [lien])

  const voirAmi = useCallback(e => {
    e.preventDefault()
    const code = codeAmi.trim().toUpperCase()
    if (code) window.location.href = `/?cave=${encodeURIComponent(code)}`
  }, [codeAmi])

  return (
    <div className="mt-5 pt-5 border-t border-anthracite-900/[0.07]">
      <div className="flex items-center gap-2 mb-3">
        <Users size={14} className="text-gold-600" />
        <h3 className="font-serif text-sm font-bold text-anthracite-900">Cave entre amis</h3>
      </div>

      {!partage ? (
        <div>
          <p className="text-xs text-anthracite-500 leading-relaxed mb-3">
            Activez le partage pour offrir à vos proches une vue de votre cave et de
            votre liste d'envies — idéal pour les idées cadeaux. Vous seul décidez, et
            vous pouvez arrêter à tout moment.
          </p>
          <input
            type="text" value={pseudo} onChange={e => setPseudo(e.target.value)}
            placeholder="Votre prénom (visible par vos amis)" maxLength={30}
            className="input-field mb-3" aria-label="Pseudo visible par vos amis"
          />
          <button onClick={activer} disabled={busy} className="btn-primary w-full justify-center text-xs disabled:opacity-60">
            {busy ? <Loader2 size={13} className="animate-spin" /> : <Share2 size={13} />}
            Partager ma cave
          </button>
        </div>
      ) : (
        <div className="animate-fade-in">
          <div className="rounded-2xl bg-white border border-gold-500/40 p-4 mb-3">
            <div className="text-[10px] uppercase tracking-[0.2em] text-gold-700 font-semibold mb-1">Votre code de partage</div>
            <div className="font-serif text-2xl font-bold text-anthracite-900 tracking-[0.25em]">{partage.code}</div>
            <div className="text-[11px] text-anthracite-400 mt-1 break-all">{lien}</div>
          </div>
          <div className="flex gap-2">
            <button onClick={copier} className="btn-gold flex-1 justify-center text-xs !py-2.5">
              {copied ? <><Check size={13} /> Copié !</> : <><Copy size={13} /> Partager le lien</>}
            </button>
            <button onClick={arreter} disabled={busy} className="btn-ghost text-xs px-4 !py-2.5 disabled:opacity-60">
              <EyeOff size={13} /> Arrêter le partage
            </button>
          </div>
        </div>
      )}

      {/* Voir la cave d'un ami */}
      <form onSubmit={voirAmi} className="mt-5">
        <label className="label" htmlFor="code-ami">Voir la cave d'un ami</label>
        <div className="flex gap-2">
          <input
            id="code-ami" type="text" value={codeAmi} onChange={e => setCodeAmi(e.target.value)}
            placeholder="Son code (ex. K7M2XP4)" maxLength={12}
            className="input-field flex-1 uppercase tracking-widest"
          />
          <button type="submit" className="btn-ghost text-xs px-4 flex-shrink-0">
            <Link2 size={13} /> Voir
          </button>
        </div>
      </form>
    </div>
  )
}

// ── Vue lecture seule de la cave d'un ami (param ?cave=CODE) ─────────────────
export function CaveAmieViewer({ code, onClose }) {
  const [state, setState] = useState({ loading: true, partage: null, error: null })
  const [offert, setOffert] = useState(null) // id du dernier vin offert (feedback)

  useEffect(() => {
    if (!supabase) {
      setState({ loading: false, partage: null, error: 'Le partage de cave n\'est pas disponible pour le moment.' })
      return
    }
    supabase.from('partages').select('*').eq('code', code.toUpperCase()).maybeSingle()
      .then(({ data, error }) => {
        if (error || !data) setState({ loading: false, partage: null, error: 'Ce code de partage est introuvable ou a été désactivé.' })
        else setState({ loading: false, partage: data, error: null })
      })
  }, [code])

  const { loading, partage, error } = state
  const cave   = Array.isArray(partage?.cave) ? partage.cave : []
  const envies = Array.isArray(partage?.envies) ? partage.envies : []
  const pseudo = partage?.pseudo_owner || 'Votre ami'

  // « Offrir cette bouteille » → ajout à MA liste d'envies, annotée « Pour X »
  const offrir = useCallback(wine => {
    const appellation = wine.appellation || wine.name
    const list = loadEnvies()
    if (!list.some(e => e.appellation === appellation && e.pour === pseudo)) {
      localStorage.setItem('oeno-envies', JSON.stringify([
        { id: `e${Date.now()}`, appellation, addedAt: Date.now(), pour: pseudo },
        ...list,
      ]))
      window.dispatchEvent(new CustomEvent('oeno-envies-changed'))
    }
    setOffert(wine.id)
    setTimeout(() => setOffert(null), 2000)
  }, [pseudo])

  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto bg-cream animate-fade-in">
      {/* En-tête */}
      <header className="sticky top-0 z-10 backdrop-blur-xl border-b border-anthracite-900/[0.08]"
              style={{ background: 'rgba(250,250,249,0.88)' }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center"
                 style={{ background: 'linear-gradient(135deg, #8c2f39 0%, #5c0d22 100%)', boxShadow: '0 0 0 1px rgba(201,168,76,0.25)' }}>
              <Users size={15} className="text-gold-400" />
            </div>
            <div>
              <div className="font-serif text-base text-anthracite-950 leading-none">
                {loading ? 'Cave partagée' : `La cave de ${pseudo}`}
              </div>
              <div className="text-[9px] text-gold-600 uppercase tracking-[0.2em] mt-1">Lecture seule · partagée avec vous</div>
            </div>
          </div>
          <button onClick={onClose} aria-label="Fermer la cave partagée"
                  className="w-11 h-11 flex items-center justify-center rounded-full text-anthracite-500 border border-anthracite-900/15 hover:text-anthracite-900 hover:border-anthracite-900/40 transition-all cursor-pointer">
            <X size={17} />
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-16">
        {loading && (
          <div className="text-center py-24">
            <Loader2 size={28} className="text-gold-600 mx-auto animate-spin mb-4" />
            <p className="text-sm text-anthracite-400">Ouverture de la cave…</p>
          </div>
        )}

        {!loading && error && (
          <div className="card p-12 text-center max-w-md mx-auto">
            <Wine size={36} className="text-anthracite-200 mx-auto mb-4" />
            <p className="font-serif text-base text-anthracite-500 mb-2">Porte close</p>
            <p className="text-xs text-anthracite-400 leading-relaxed">{error}</p>
            <button onClick={onClose} className="btn-primary mx-auto mt-6">Retour à Œno</button>
          </div>
        )}

        {!loading && partage && (
          <>
            {/* La cave */}
            <div className="mb-4">
              <span className="eyebrow mb-1">Sa cave</span>
              <h2 className="section-title">{cave.reduce((s, w) => s + (w.quantity || 0), 0)} bouteilles, {cave.length} vins</h2>
            </div>
            {cave.length === 0 ? (
              <p className="text-sm text-anthracite-400 mb-10">Sa cave est vide pour l'instant.</p>
            ) : (
              <div className="flex flex-col gap-2 mb-12">
                {cave.map((w, i) => (
                  <div key={w.id || i} className="relative">
                    <WineCard wine={w} compact />
                    <button
                      onClick={() => offrir(w)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[11px] font-bold text-cream bg-wine-800 hover:brightness-110 active:scale-[0.97] shadow-wine transition-all cursor-pointer"
                      title={`Ajouter à ma liste d'envies, pour ${pseudo}`}
                    >
                      {offert === w.id ? <><Check size={12} /> Noté !</> : <><Gift size={12} /> Offrir</>}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Ses envies */}
            <div className="mb-4">
              <span className="eyebrow mb-1">Idées cadeaux</span>
              <h2 className="section-title">Sa liste d'envies</h2>
              <p className="section-sub">Les vins que {pseudo} rêve de goûter — à bon entendeur…</p>
            </div>
            {envies.length === 0 ? (
              <p className="text-sm text-anthracite-400">Aucune envie partagée pour l'instant.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {envies.map((e, i) => (
                  <div key={e.id || i} className="card p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-2xl bg-wine-50 flex items-center justify-center flex-shrink-0">
                      <Heart size={14} className="text-wine-700" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-wine-name text-2xl text-anthracite-900 leading-none truncate">{e.appellation}</div>
                      <div className="text-[10px] text-anthracite-400 mt-1">Repéré le {new Date(e.addedAt).toLocaleDateString('fr-FR')}</div>
                    </div>
                    <button
                      onClick={() => offrir({ id: e.id, appellation: e.appellation, name: e.appellation })}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-full text-[11px] font-bold text-cream bg-wine-800 hover:brightness-110 active:scale-[0.97] shadow-wine transition-all cursor-pointer flex-shrink-0"
                    >
                      {offert === e.id ? <><Check size={12} /> Noté !</> : <><Gift size={12} /> Offrir</>}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
