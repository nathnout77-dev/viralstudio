import { useState, useEffect, useCallback, useRef } from 'react'
import {
  Users, UserPlus, Copy, Check, Send, ChevronLeft, Loader2, Wine,
  CloudOff, MessageCircle, Share2, Trash2, Gift, X,
} from 'lucide-react'
import {
  monCode, definirPseudo, mesAmis, demanderAmi, accepterAmi, retirerAmi,
  lireFil, envoyerMessage, marquerLus, ecouterMessages, caveDeLAmi,
  utilisateurCourant, cloudDisponible,
} from '../lib/social'
import { toast } from './Toast'
import WineCard from './WineCard'

// ═══════════════════════════════════════════════════════════════════════════
// Onglet Social — la cave n'a d'intérêt que partagée.
//
// Trois écrans, jamais plus d'un clic entre eux : la liste d'amis, une
// discussion, la cave d'un ami. Tout ce qui touche au réseau échoue en
// silence vers un état lisible : on n'affiche jamais une page cassée.
// ═══════════════════════════════════════════════════════════════════════════

const rafraichirCave = () => {
  try { return JSON.parse(localStorage.getItem('oenotheque-v2')) || [] } catch { return [] }
}

// ── État « il faut un compte » ─────────────────────────────────────────────
function Invitation({ onCompte, indisponible }) {
  return (
    <div className="max-w-md mx-auto text-center py-16 animate-fade-in">
      <div className="w-16 h-16 rounded-3xl mx-auto mb-5 flex items-center justify-center shadow-wine"
           style={{ background: 'linear-gradient(135deg, #0C0A09 0%, #3a0616 60%, #5c0d22 100%)' }}>
        <span className="text-3xl" role="img" aria-hidden="true">🥂</span>
      </div>
      <h2 className="font-serif text-2xl font-bold text-anthracite-900 mb-2">
        {indisponible ? 'Bientôt disponible' : 'Le vin se partage'}
      </h2>
      <p className="text-sm text-anthracite-500 leading-relaxed mb-6">
        {indisponible
          ? "Le partage entre amis n'est pas activé sur cette installation. Votre cave, elle, reste entièrement fonctionnelle."
          : 'Ouvrez votre cave à vos proches, échangez vos trouvailles et donnez-leur des idées cadeaux. Un compte gratuit suffit.'}
      </p>
      {!indisponible && (
        <button onClick={onCompte} className="btn-primary mx-auto">
          <span role="img" aria-hidden="true">✉️</span> Créer mon compte
        </button>
      )}
    </div>
  )
}

// ── Bulle de message ───────────────────────────────────────────────────────
function Bulle({ message, deMoi, onVoirVin }) {
  const heure = new Date(message.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
  return (
    <div className={`flex ${deMoi ? 'justify-end' : 'justify-start'} mb-2.5`}>
      <div className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 ${
        deMoi
          ? 'bg-wine-800 text-cream rounded-br-sm'
          : 'bg-white border border-anthracite-900/[0.08] text-anthracite-900 rounded-bl-sm'
      }`}>
        {message.vin && (
          <button
            onClick={() => onVoirVin?.(message.vin)}
            className={`w-full text-left mb-2 rounded-xl px-2.5 py-2 flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-80 ${
              deMoi ? 'bg-cream/15' : 'bg-wine-50'
            }`}
          >
            <span className="text-base" role="img" aria-hidden="true">🍷</span>
            <span className="min-w-0 flex-1">
              <span className={`block text-[12px] font-bold truncate ${deMoi ? 'text-cream' : 'text-anthracite-900'}`}>
                {message.vin.appellation || message.vin.name}
              </span>
              {message.vin.region && (
                <span className={`block text-[10px] ${deMoi ? 'text-cream/70' : 'text-anthracite-400'}`}>
                  {message.vin.region}
                </span>
              )}
            </span>
          </button>
        )}
        <p className="text-[13px] leading-relaxed whitespace-pre-wrap break-words">{message.contenu}</p>
        <div className={`text-[9px] mt-1 ${deMoi ? 'text-cream/55' : 'text-anthracite-300'}`}>{heure}</div>
      </div>
    </div>
  )
}

// ── Discussion avec un ami ─────────────────────────────────────────────────
function Discussion({ ami, moi, onRetour, onVoirCave, onVoirVin }) {
  const [messages, setMessages] = useState([])
  const [texte, setTexte]       = useState('')
  const [chargement, setChargement] = useState(true)
  const [envoi, setEnvoi]       = useState(false)
  const [joindre, setJoindre]   = useState(false)
  const basDuFil = useRef(null)

  const filer = useCallback(() => {
    basDuFil.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [])

  useEffect(() => {
    let vivant = true
    ;(async () => {
      const fil = await lireFil(ami.ami_id)
      if (!vivant) return
      setMessages(fil)
      setChargement(false)
      marquerLus(ami.ami_id)
      setTimeout(filer, 60)
    })()
    return () => { vivant = false }
  }, [ami.ami_id, filer])

  // Réception en direct : on n'ajoute que ce qui appartient à ce fil.
  useEffect(() => {
    return ecouterMessages(msg => {
      const duFil = (msg.expediteur_id === ami.ami_id && msg.destinataire_id === moi) ||
                    (msg.expediteur_id === moi && msg.destinataire_id === ami.ami_id)
      if (!duFil) return
      setMessages(prev => prev.some(m => m.id === msg.id) ? prev : [...prev, msg])
      if (msg.expediteur_id === ami.ami_id) marquerLus(ami.ami_id)
      setTimeout(filer, 60)
    })
  }, [ami.ami_id, moi, filer])

  const envoyer = useCallback(async (vin = null) => {
    const contenu = texte.trim()
    if (!contenu && !vin) return
    setEnvoi(true)
    // Affichage optimiste : le message apparaît tout de suite, on corrige après.
    const provisoire = {
      id: `tmp-${Date.now()}`, expediteur_id: moi, destinataire_id: ami.ami_id,
      contenu: contenu || '🍷 Regarde cette bouteille', vin, created_at: new Date().toISOString(),
    }
    setMessages(prev => [...prev, provisoire])
    setTexte('')
    setTimeout(filer, 60)

    const r = await envoyerMessage(ami.ami_id, contenu, vin)
    if (!r.ok) {
      setMessages(prev => prev.filter(m => m.id !== provisoire.id))
      setTexte(contenu)
      toast('📡 Message non parti — vérifiez votre connexion')
    }
    setEnvoi(false)
  }, [texte, ami.ami_id, moi, filer])

  const maCave = joindre ? rafraichirCave() : []

  return (
    <div className="flex flex-col h-[calc(100vh-13rem)] max-w-2xl mx-auto animate-fade-in">
      {/* En-tête du fil */}
      <div className="flex items-center gap-3 pb-3 border-b border-anthracite-900/[0.08]">
        <button onClick={onRetour} aria-label="Retour à mes amis"
                className="w-9 h-9 flex items-center justify-center rounded-full text-anthracite-500 hover:text-anthracite-900 hover:bg-anthracite-900/[0.04] transition-all cursor-pointer">
          <ChevronLeft size={18} />
        </button>
        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-cream font-serif font-bold"
             style={{ background: 'linear-gradient(135deg, #8c2f39 0%, #5c0d22 100%)' }}>
          {ami.pseudo.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-serif text-base font-bold text-anthracite-900 truncate">{ami.pseudo}</div>
          <div className="text-[10px] text-anthracite-400">Ami sur Œno</div>
        </div>
        <button onClick={() => onVoirCave(ami)} className="btn-ghost text-[11px] px-3 !py-2 flex-shrink-0">
          <span role="img" aria-hidden="true">🍾</span> Sa cave
        </button>
      </div>

      {/* Fil */}
      <div className="flex-1 overflow-y-auto py-4">
        {chargement ? (
          <div className="text-center py-12"><Loader2 size={22} className="text-gold-600 mx-auto animate-spin" /></div>
        ) : messages.length === 0 ? (
          <div className="text-center py-12">
            <span className="text-3xl block mb-3" role="img" aria-hidden="true">💬</span>
            <p className="text-sm text-anthracite-400">
              Aucun message. Lancez la conversation — parlez-lui d'une bouteille !
            </p>
          </div>
        ) : (
          messages.map(m => (
            <Bulle key={m.id} message={m} deMoi={m.expediteur_id === moi} onVoirVin={onVoirVin} />
          ))
        )}
        <div ref={basDuFil} />
      </div>

      {/* Joindre une bouteille de ma cave */}
      {joindre && (
        <div className="border border-gold-500/30 rounded-2xl bg-white p-3 mb-2 max-h-52 overflow-y-auto animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-anthracite-700">🍷 Quelle bouteille ?</span>
            <button onClick={() => setJoindre(false)} className="text-anthracite-400 hover:text-anthracite-900 cursor-pointer">
              <X size={14} />
            </button>
          </div>
          {maCave.length === 0 ? (
            <p className="text-[11px] text-anthracite-400 py-2">Votre cave est vide pour l'instant.</p>
          ) : maCave.slice(0, 30).map(v => (
            <button
              key={v.id}
              onClick={() => { setJoindre(false); envoyer({ appellation: v.name || v.appellation, region: v.region, type: v.type }) }}
              className="w-full text-left px-2.5 py-2 rounded-xl hover:bg-wine-50 transition-colors cursor-pointer"
            >
              <span className="block text-[12px] font-semibold text-anthracite-900 truncate">{v.name || v.appellation}</span>
              <span className="block text-[10px] text-anthracite-400">{v.region}{v.vintage ? ` · ${v.vintage}` : ''}</span>
            </button>
          ))}
        </div>
      )}

      {/* Saisie */}
      <form
        onSubmit={e => { e.preventDefault(); envoyer() }}
        className="flex items-center gap-2 pt-3 border-t border-anthracite-900/[0.08]"
      >
        <button type="button" onClick={() => setJoindre(v => !v)} aria-label="Joindre une bouteille"
                className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full border transition-all cursor-pointer ${
                  joindre ? 'border-gold-500 bg-gold-500/10' : 'border-anthracite-900/15 hover:border-gold-500/60'
                }`}>
          <span className="text-base" role="img" aria-hidden="true">🍷</span>
        </button>
        <input
          type="text" value={texte} onChange={e => setTexte(e.target.value)}
          placeholder="Votre message…" maxLength={2000}
          className="input-field flex-1" aria-label="Message"
        />
        <button type="submit" disabled={envoi || (!texte.trim())} aria-label="Envoyer"
                className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full text-cream bg-wine-800 disabled:opacity-40 hover:brightness-110 active:scale-95 transition-all cursor-pointer">
          {envoi ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
        </button>
      </form>
    </div>
  )
}

// ── Cave d'un ami ──────────────────────────────────────────────────────────
function CaveDeLAmi({ ami, onRetour, onVoirVin }) {
  const [etat, setEtat] = useState({ chargement: true, data: null })

  useEffect(() => {
    let vivant = true
    caveDeLAmi(ami.ami_id).then(data => { if (vivant) setEtat({ chargement: false, data }) })
    return () => { vivant = false }
  }, [ami.ami_id])

  const cave   = Array.isArray(etat.data?.cave) ? etat.data.cave : []
  const envies = Array.isArray(etat.data?.envies) ? etat.data.envies : []

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onRetour} aria-label="Retour"
                className="w-9 h-9 flex items-center justify-center rounded-full text-anthracite-500 hover:text-anthracite-900 hover:bg-anthracite-900/[0.04] transition-all cursor-pointer">
          <ChevronLeft size={18} />
        </button>
        <div>
          <h2 className="font-serif text-xl font-bold text-anthracite-900">🍾 La cave de {ami.pseudo}</h2>
          <p className="text-[11px] text-anthracite-400">Lecture seule</p>
        </div>
      </div>

      {etat.chargement ? (
        <div className="text-center py-16"><Loader2 size={24} className="text-gold-600 mx-auto animate-spin" /></div>
      ) : !etat.data ? (
        <div className="card p-10 text-center">
          <span className="text-3xl block mb-3" role="img" aria-hidden="true">🔒</span>
          <p className="font-serif text-base text-anthracite-600 mb-1">Cave non partagée</p>
          <p className="text-xs text-anthracite-400 leading-relaxed">
            {ami.pseudo} n'a pas encore ouvert sa cave. Proposez-lui dans la discussion !
          </p>
        </div>
      ) : (
        <>
          <div className="mb-3">
            <span className="eyebrow mb-1">Sa cave</span>
            <h3 className="section-title">
              {cave.reduce((s, w) => s + (w.quantity || 0), 0)} bouteilles, {cave.length} vins
            </h3>
          </div>
          {cave.length === 0
            ? <p className="text-sm text-anthracite-400 mb-10">Sa cave est vide pour l'instant.</p>
            : <div className="flex flex-col gap-2 mb-10">
                {cave.map((w, i) => <WineCard key={w.id || i} wine={w} compact onSelect={onVoirVin} />)}
              </div>}

          <div className="mb-3">
            <span className="eyebrow mb-1">Idées cadeaux 🎁</span>
            <h3 className="section-title">Sa liste d'envies</h3>
          </div>
          {envies.length === 0 ? (
            <p className="text-sm text-anthracite-400">Aucune envie partagée.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {envies.map((e, i) => (
                <div key={e.id || i} className="card p-4 flex items-center gap-3">
                  <span className="text-lg" role="img" aria-hidden="true">💝</span>
                  <span className="font-wine-name text-xl text-anthracite-900 truncate">{e.appellation}</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

// ── Vue principale ─────────────────────────────────────────────────────────
export default function SocialView({ onCompte, onVoirVin }) {
  const [moi, setMoi]         = useState(null)
  const [code, setCode]       = useState(null)
  const [liens, setLiens]     = useState({ demandes: [], envoyees: [], amis: [] })
  const [chargement, setChargement] = useState(true)
  const [saisie, setSaisie]   = useState('')
  const [copie, setCopie]     = useState(false)
  const [busy, setBusy]       = useState(false)
  const [ecran, setEcran]     = useState({ nom: 'liste', ami: null })

  const recharger = useCallback(async () => {
    const r = await mesAmis()
    setLiens({ demandes: r.demandes, envoyees: r.envoyees, amis: r.amis })
  }, [])

  useEffect(() => {
    let vivant = true
    ;(async () => {
      const u = await utilisateurCourant()
      if (!vivant) return
      setMoi(u)
      if (u) {
        const [c] = await Promise.all([monCode(), recharger()])
        if (!vivant) return
        setCode(c)
      }
      setChargement(false)
    })()
    return () => { vivant = false }
  }, [recharger])

  // Un message reçu pendant qu'on est sur la liste rafraîchit les pastilles.
  useEffect(() => {
    if (!moi || ecran.nom !== 'liste') return
    return ecouterMessages(msg => { if (msg.destinataire_id === moi.id) recharger() })
  }, [moi, ecran.nom, recharger])

  const inviter = useCallback(async e => {
    e.preventDefault()
    setBusy(true)
    const r = await demanderAmi(saisie)
    toast(r.ok ? r.message : `⚠️ ${r.message}`)
    if (r.ok) { setSaisie(''); await recharger() }
    setBusy(false)
  }, [saisie, recharger])

  const partagerCode = useCallback(async () => {
    const texte = `Rejoins-moi sur Œno ! Mon code d'ami : ${code}`
    try {
      if (navigator.share) { await navigator.share({ title: 'Œno', text: texte }); return }
      throw new Error('sans partage natif')
    } catch {
      try { await navigator.clipboard.writeText(code) } catch { /* presse-papier refusé */ }
      setCopie(true)
      setTimeout(() => setCopie(false), 2000)
    }
  }, [code])

  const repondre = useCallback(async (ami, accepte) => {
    setBusy(true)
    if (accepte) { await accepterAmi(ami.ami_id); toast(`🎉 ${ami.pseudo} est votre ami !`) }
    else { await retirerAmi(ami.ami_id); toast('Demande déclinée') }
    await recharger()
    setBusy(false)
  }, [recharger])

  const supprimer = useCallback(async ami => {
    setBusy(true)
    await retirerAmi(ami.ami_id)
    toast(`${ami.pseudo} a été retiré de vos amis`)
    await recharger()
    setBusy(false)
  }, [recharger])

  if (chargement) {
    return <div className="text-center py-24"><Loader2 size={26} className="text-gold-600 mx-auto animate-spin" /></div>
  }
  if (!cloudDisponible) return <Invitation indisponible />
  if (!moi) return <Invitation onCompte={onCompte} />

  if (ecran.nom === 'discussion') {
    return (
      <Discussion
        ami={ecran.ami} moi={moi.id}
        onRetour={() => { setEcran({ nom: 'liste', ami: null }); recharger() }}
        onVoirCave={ami => setEcran({ nom: 'cave', ami })}
        onVoirVin={onVoirVin}
      />
    )
  }
  if (ecran.nom === 'cave') {
    return (
      <CaveDeLAmi
        ami={ecran.ami}
        onRetour={() => setEcran({ nom: 'discussion', ami: ecran.ami })}
        onVoirVin={onVoirVin}
      />
    )
  }

  const aucunAmi = liens.amis.length === 0 && liens.demandes.length === 0 && liens.envoyees.length === 0

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      {/* Mon code d'ami */}
      <div className="rounded-3xl p-5 mb-6 text-cream shadow-wine"
           style={{ background: 'linear-gradient(135deg, #0C0A09 0%, #3a0616 55%, #5c0d22 100%)' }}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-base" role="img" aria-hidden="true">🎫</span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-gold-400 font-semibold">Mon code d'ami</span>
        </div>
        <div className="font-serif text-3xl font-bold tracking-[0.28em] mb-1">{code || '·······'}</div>
        <p className="text-[11px] text-cream/60 leading-relaxed mb-4">
          Donnez-le à un proche : il vous ajoute en 5 secondes, sans chercher votre nom.
        </p>
        <button onClick={partagerCode} disabled={!code}
                className="btn-gold w-full justify-center text-xs !py-2.5 disabled:opacity-50">
          {copie ? <><Check size={13} /> Code copié !</> : <><Share2 size={13} /> Partager mon code</>}
        </button>
      </div>

      {/* Ajouter un ami */}
      <form onSubmit={inviter} className="mb-6">
        <label className="label" htmlFor="code-ami-saisie">➕ Ajouter un ami par son code</label>
        <div className="flex gap-2">
          <input
            id="code-ami-saisie" type="text" value={saisie}
            onChange={e => setSaisie(e.target.value.toUpperCase())}
            placeholder="Ex. K7M2XP4" maxLength={12}
            className="input-field flex-1 uppercase tracking-widest"
          />
          <button type="submit" disabled={busy || saisie.trim().length < 4}
                  className="btn-primary text-xs px-5 flex-shrink-0 disabled:opacity-50">
            {busy ? <Loader2 size={13} className="animate-spin" /> : <UserPlus size={13} />}
            Inviter
          </button>
        </div>
      </form>

      {/* Demandes reçues */}
      {liens.demandes.length > 0 && (
        <div className="mb-6">
          <h3 className="font-serif text-base font-bold text-anthracite-900 mb-3">
            📬 {liens.demandes.length} demande{liens.demandes.length > 1 ? 's' : ''} en attente
          </h3>
          <div className="flex flex-col gap-2">
            {liens.demandes.map(a => (
              <div key={a.ami_id} className="card p-3.5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-cream font-serif font-bold"
                     style={{ background: 'linear-gradient(135deg, #8c2f39 0%, #5c0d22 100%)' }}>
                  {a.pseudo.charAt(0).toUpperCase()}
                </div>
                <span className="flex-1 min-w-0 font-semibold text-sm text-anthracite-900 truncate">{a.pseudo}</span>
                <button onClick={() => repondre(a, true)} disabled={busy}
                        className="btn-gold text-[11px] px-3 !py-2 disabled:opacity-50">
                  <Check size={12} /> Accepter
                </button>
                <button onClick={() => repondre(a, false)} disabled={busy} aria-label="Décliner"
                        className="w-9 h-9 flex items-center justify-center rounded-full text-anthracite-400 border border-anthracite-900/15 hover:text-anthracite-900 transition-all cursor-pointer disabled:opacity-50">
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mes amis */}
      <h3 className="font-serif text-base font-bold text-anthracite-900 mb-3">
        👥 Mes amis {liens.amis.length > 0 && <span className="text-anthracite-400 font-normal">({liens.amis.length})</span>}
      </h3>

      {aucunAmi ? (
        <div className="card p-8 text-center">
          <span className="text-3xl block mb-3" role="img" aria-hidden="true">🍷</span>
          <p className="font-serif text-base text-anthracite-600 mb-1">Personne encore</p>
          <p className="text-xs text-anthracite-400 leading-relaxed">
            Envoyez votre code à un ami amateur de vin : vous verrez sa cave, il verra la vôtre,
            et vous saurez enfin quoi vous offrir.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {liens.amis.map(a => (
            <div key={a.ami_id} className="card p-3.5 flex items-center gap-3 group">
              <button
                onClick={() => setEcran({ nom: 'discussion', ami: a })}
                className="flex items-center gap-3 flex-1 min-w-0 text-left cursor-pointer"
              >
                <div className="relative flex-shrink-0">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-cream font-serif font-bold"
                       style={{ background: 'linear-gradient(135deg, #8c2f39 0%, #5c0d22 100%)' }}>
                    {a.pseudo.charAt(0).toUpperCase()}
                  </div>
                  {a.non_lus > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-gold-500 text-anthracite-950 text-[10px] font-bold flex items-center justify-center">
                      {a.non_lus}
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-sm text-anthracite-900 truncate">{a.pseudo}</div>
                  <div className="text-[11px] text-anthracite-400 truncate">
                    {a.dernier_message || 'Démarrez la conversation'}
                  </div>
                </div>
              </button>
              <button onClick={() => setEcran({ nom: 'cave', ami: a })} aria-label={`Voir la cave de ${a.pseudo}`}
                      className="w-9 h-9 flex items-center justify-center rounded-full text-anthracite-400 hover:text-anthracite-900 hover:bg-anthracite-900/[0.04] transition-all cursor-pointer flex-shrink-0">
                <span className="text-base" role="img" aria-hidden="true">🍾</span>
              </button>
              <button onClick={() => supprimer(a)} disabled={busy} aria-label={`Retirer ${a.pseudo}`}
                      className="w-9 h-9 items-center justify-center rounded-full text-anthracite-300 hover:text-wine-700 transition-all cursor-pointer flex-shrink-0 hidden group-hover:flex disabled:opacity-50">
                <Trash2 size={14} />
              </button>
            </div>
          ))}

          {liens.envoyees.map(a => (
            <div key={a.ami_id} className="card p-3.5 flex items-center gap-3 opacity-60">
              <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-anthracite-100 text-anthracite-400 font-serif font-bold">
                {a.pseudo.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-sm text-anthracite-900 truncate">{a.pseudo}</div>
                <div className="text-[11px] text-anthracite-400">⏳ Invitation envoyée</div>
              </div>
              <button onClick={() => supprimer(a)} disabled={busy} aria-label="Annuler l'invitation"
                      className="w-9 h-9 flex items-center justify-center rounded-full text-anthracite-300 hover:text-wine-700 transition-all cursor-pointer flex-shrink-0 disabled:opacity-50">
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
