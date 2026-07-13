import { useState, useEffect, useCallback, useMemo } from 'react'
import { Heart, Trash2, ShoppingBag, Share2, Wine } from 'lucide-react'
import { WINE_DB } from '../data/wineDatabase'
import { toast } from './Toast'

// ═══════════════════════════════════════════════════════════════════════════
// Liste d'envies — vins repérés, à acheter plus tard.
// localStorage `oeno-envies` : [{ id, appellation, addedAt, note? }]
// Synchronisation entre composants via un événement window custom.
// ═══════════════════════════════════════════════════════════════════════════

const STORAGE_KEY = 'oeno-envies'
const EVENT = 'oeno-envies-changed'

export function loadEnvies() {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveEnvies(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  window.dispatchEvent(new CustomEvent(EVENT))
}

export function toggleEnvie(appellation) {
  const list = loadEnvies()
  const exists = list.find(e => e.appellation === appellation)
  saveEnvies(
    exists
      ? list.filter(e => e.appellation !== appellation)
      : [{ id: `e${Date.now()}`, appellation, addedAt: Date.now() }, ...list]
  )
}

export function removeEnvie(id) {
  saveEnvies(loadEnvies().filter(e => e.id !== id))
}

// Hook : liste d'envies réactive (sync inter-composants + multi-onglets)
export function useEnvies() {
  const [envies, setEnvies] = useState([])
  useEffect(() => {
    const refresh = () => setEnvies(loadEnvies())
    refresh()
    window.addEventListener(EVENT, refresh)
    window.addEventListener('storage', refresh)
    return () => {
      window.removeEventListener(EVENT, refresh)
      window.removeEventListener('storage', refresh)
    }
  }, [])
  return envies
}

// ── Bouton cœur discret ──────────────────────────────────────────────────────
// Rendu en <span role="button"> pour pouvoir vivre dans une carte cliquable.
// 6 particules d'or radiales (cercles et losanges alternés, voir .envie-particle)
const PARTICLES = Array.from({ length: 6 }, (_, i) => {
  const angle = (i / 6) * Math.PI * 2 - Math.PI / 2
  return { dx: `${Math.round(Math.cos(angle) * 16)}px`, dy: `${Math.round(Math.sin(angle) * 16)}px` }
})

export function EnvieButton({ appellation, size = 15, light = false, className = '' }) {
  const envies = useEnvies()
  const active = envies.some(e => e.appellation === appellation)
  const [burst, setBurst] = useState(false)

  // À l'ajout uniquement : pop du cœur + éclosion de particules d'or (500ms)
  useEffect(() => {
    if (!burst) return undefined
    const t = setTimeout(() => setBurst(false), 500)
    return () => clearTimeout(t)
  }, [burst])

  const toggle = e => {
    e.stopPropagation()
    e.preventDefault()
    if (!active) {
      setBurst(true)
      toast('Ajouté à vos envies')
    }
    toggleEnvie(appellation)
  }

  return (
    <span
      role="button"
      tabIndex={0}
      onClick={toggle}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') toggle(e) }}
      aria-label={active ? 'Retirer de ma liste d\'envies' : 'Ajouter à ma liste d\'envies'}
      aria-pressed={active}
      title={active ? 'Dans ma liste d\'envies' : 'Ajouter à ma liste d\'envies'}
      className={`relative inline-flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95 ${
        light
          ? 'bg-white/20 hover:bg-white/35'
          : 'bg-white border border-anthracite-900/10 hover:border-wine-300'
      } ${className}`}
    >
      <Heart
        size={size}
        strokeWidth={1.8}
        fill={burst ? '#c9a84c' : active ? '#8c2f39' : 'none'}
        className={`${burst ? 'envie-pop text-gold-500' : active ? 'text-wine-700' : light ? 'text-cream' : 'text-anthracite-400'}`}
      />
      {burst && PARTICLES.map((p, i) => (
        <span key={i} className="envie-particle" style={{ '--dx': p.dx, '--dy': p.dy }} aria-hidden="true" />
      ))}
    </span>
  )
}

// ── Vue « Envies » (sous-onglet de Ma Cave) ──────────────────────────────────
export default function EnviesView({ onBuy }) {
  const envies = useEnvies()

  const enriched = useMemo(() => envies.map(e => ({
    ...e,
    wine: WINE_DB.find(w => w.appellation === e.appellation) || null,
  })), [envies])

  const share = useCallback(async () => {
    const lines = enriched.map(({ appellation, wine }) =>
      `– ${appellation}${wine ? ` (${wine.region}, ~${wine.prixMoyen} €)` : ''}`
    )
    const text = `Ma liste d'envies vin 🍷\n${lines.join('\n')}\n\n— composée avec Œno, le vin enfin simple`
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Ma liste d\'envies vin', text })
        return
      }
      throw new Error('no-share')
    } catch {
      try {
        await navigator.clipboard.writeText(text)
      } catch {
        // Fallback presse-papier legacy
        const ta = document.createElement('textarea')
        ta.value = text
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
      }
      toast('Liste copiée — prête à partager')
    }
  }, [enriched])

  const buy = useCallback(({ appellation, wine, id }) => {
    const millesime = wine?.bonsMilsimes?.[wine.bonsMilsimes.length - 1] || new Date().getFullYear() - 3
    onBuy?.({
      name: appellation,
      appellation,
      domain: '',
      region: wine?.region || '',
      type: wine?.type || 'red',
      cepages: wine?.cepages || [],
      vintage: millesime,
      quantity: 1,
      drinkFrom: wine?.drinkFrom,
      drinkUntil: wine?.drinkUntil,
      serviceTemp: wine?.serviceTemp,
      carafage: wine?.carafage,
      estimatedValue: wine?.prixMoyen || '',
      foodPairings: wine?.accords || [],
      notes: wine ? `${wine.emoji} ${wine.enUneMot} — Arômes : ${wine.aromes}` : '',
      _envieId: id,
    })
  }, [onBuy])

  if (envies.length === 0) {
    return (
      <div className="card p-12 text-center animate-fade-in">
        <Heart size={36} className="text-anthracite-200 mx-auto mb-4" />
        <p className="font-serif text-base text-anthracite-400 mb-1">Aucune envie pour l'instant</p>
        <p className="text-xs text-anthracite-300 max-w-sm mx-auto">
          Repérez un vin dans la Bibliothèque, sur la Carte ou via le Budget caviste, et touchez le petit cœur : il vous attendra ici.
        </p>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-wine-800 flex items-center justify-center shadow-wine">
            <Heart size={17} className="text-gold-400" />
          </div>
          <div>
            <span className="eyebrow mb-1">À ne pas oublier</span>
            <h2 className="section-title">Ma liste d'envies</h2>
            <p className="section-sub">{envies.length} vin{envies.length > 1 ? 's' : ''} repéré{envies.length > 1 ? 's' : ''} — pour la prochaine visite chez le caviste</p>
          </div>
        </div>
        <button onClick={share} className="btn-ghost text-xs px-4 py-2.5">
          <Share2 size={13} /> Partager ma liste
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {enriched.map(({ id, appellation, addedAt, wine, pour }, i) => (
          <div
            key={id}
            className="card p-4 animate-fade-in-up"
            style={{ animationDelay: `${Math.min(i * 50, 350)}ms`, animationFillMode: 'both' }}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg flex-shrink-0"
                style={{ background: wine ? `${wine.color}18` : '#f0e9dd' }}
              >
                {wine?.emoji || <Wine size={15} className="text-anthracite-400" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-wine-name text-2xl text-anthracite-900 leading-none truncate">{appellation}</div>
                {pour && (
                  <span className="inline-flex items-center px-2 py-0.5 mt-1 rounded-full text-[9px] font-bold uppercase tracking-[0.12em] bg-gold-500/15 text-gold-700 border border-gold-500/30">
                    Pour {pour}
                  </span>
                )}
                <div className="text-[11px] text-anthracite-400 mt-1">
                  {wine ? `${wine.region} · ~${wine.prixMoyen} €` : 'Vin repéré'}
                  {' · '}
                  {new Date(addedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                </div>
              </div>
            </div>
            {wine && <p className="text-xs text-anthracite-500 italic mt-2.5 line-clamp-1">« {wine.enUneMot} »</p>}
            <div className="flex items-center gap-2 mt-3.5">
              <button
                onClick={() => buy({ appellation, wine, id })}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full text-xs font-bold text-cream bg-wine-800 hover:brightness-110 active:scale-[0.98] shadow-wine transition-all cursor-pointer"
              >
                <ShoppingBag size={12} /> J'ai acheté
              </button>
              <button
                onClick={() => removeEnvie(id)}
                aria-label={`Retirer ${appellation} de la liste`}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-anthracite-900/10 text-anthracite-400 hover:border-red-300 hover:text-red-600 transition-all cursor-pointer"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
