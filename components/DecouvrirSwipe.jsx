import { useState, useRef, useCallback, useMemo, useEffect } from 'react'
import { Heart, X, RotateCcw, Info, Plus, MapPin } from 'lucide-react'
import { WINE_DB_TERROIR, DIFFICULTE_CONFIG, rapportQualitePrix } from '../data/wineDatabase'
import { diversifyByRegion } from '../lib/suggestions'
import { toggleEnvie, loadEnvies } from './Envies'
import WineVisuel from './WineVisuel'
import Icone from './Icone'

// ═══════════════════════════════════════════════════════════════════════════
// DecouvrirSwipe — la découverte du vin au geste, sans lecture.
// Une carte = un vin. On glisse à droite pour le garder (envies), à gauche
// pour passer, on touche la carte pour la fiche complète. Trois mots par
// carte, pas un paragraphe : l'essentiel se lit en une seconde.
//
// Le geste est natif (pointer events, aucune dépendance), avec repli boutons
// et raccourcis clavier ← / → / ↵ pour le desktop et l'accessibilité.
// ═══════════════════════════════════════════════════════════════════════════

const SEUIL = 110        // px de glissement au-delà duquel la carte part
const ROTATION_MAX = 14  // degrés d'inclinaison à bout de course

// Un vin en trois repères, jamais plus : ce qu'on retient en une seconde.
function reperes(w) {
  const out = []
  if (w.jauges?.puissance >= 4) out.push({ ic: 'puissant', label: 'Puissant' })
  else if (w.jauges?.puissance <= 2) out.push({ ic: 'leger', label: 'Léger' })
  else out.push({ ic: 'equilibre', label: 'Équilibré' })
  if (w.jauges?.douceur >= 4) out.push({ ic: 'doux', label: 'Doux' })
  else out.push({ ic: 'sec', label: 'Sec' })
  if (w.difficulte === 'facile') out.push({ ic: 'amateur', label: 'Facile' })
  else if (w.difficulte === 'pointu') out.push({ ic: 'expert', label: 'Pointu' })
  else out.push({ ic: 'decouverte', label: 'À explorer' })
  return out
}

function Carte({ wine, style, dragging, onPointerDown, refCarte, decision }) {
  const qp = rapportQualitePrix(wine)
  const diff = DIFFICULTE_CONFIG[wine.difficulte]
  return (
    <div
      ref={refCarte}
      onPointerDown={onPointerDown}
      style={style}
      className={`absolute inset-0 rounded-3xl overflow-hidden shadow-card-hover select-none touch-none ${
        dragging ? '' : 'transition-transform duration-300 ease-out'
      }`}
    >
      {/* Robe du vin en fond : la couleur EST l'information */}
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(160deg, ${wine.color} 0%, ${wine.color}dd 45%, #17130f 130%)` }}
      />
      {/* Le vin lui-même occupe la carte : robe, verre, et son emoji-repère */}
      <div className="absolute inset-x-0 top-0 h-[58%] flex items-center justify-center pointer-events-none" aria-hidden="true">
        <WineVisuel type={wine.type} size={128} className="drop-shadow-2xl opacity-95" />
      </div>
      {wine.emoji && (
        <span
          className="absolute top-5 left-1/2 -translate-x-1/2 w-14 h-14 rounded-2xl flex items-center justify-center text-3xl bg-black/25 backdrop-blur-sm border border-white/20 pointer-events-none"
          role="img" aria-hidden="true"
        >
          {wine.emoji}
        </span>
      )}
      <div
        className="absolute inset-x-0 bottom-0 h-[52%] pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(15,12,10,0.82) 22%, rgba(15,12,10,0.25) 62%, transparent 100%)' }}
      />

      {/* Verdicts glisser : apparaissent à mesure du geste */}
      <div
        className="absolute top-6 left-5 px-3 py-1.5 rounded-xl border-2 border-emerald-300 text-emerald-200 font-bold text-sm uppercase tracking-widest rotate-[-12deg]"
        style={{ opacity: decision > 0 ? Math.min(1, decision) : 0 }}
      >
        Envie
      </div>
      <div
        className="absolute top-6 right-5 px-3 py-1.5 rounded-xl border-2 border-rose-300 text-rose-200 font-bold text-sm uppercase tracking-widest rotate-[12deg]"
        style={{ opacity: decision < 0 ? Math.min(1, -decision) : 0 }}
      >
        Passer
      </div>

      <div className="relative h-full flex flex-col justify-end p-6 text-cream">
        <div className="font-wine-name text-5xl leading-[0.95]">{wine.appellation}</div>
        <div className="flex items-center gap-1.5 text-cream/70 text-xs mt-2">
          <MapPin size={11} /> {wine.region} · {wine.typeLabel}
        </div>

        {/* Trois repères, zéro phrase */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {reperes(wine).map(r => (
            <span key={r.label} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm text-[11px] font-semibold">
              <Icone nom={r.ic} size={11} /> {r.label}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-3">
          <span className="px-2.5 py-1 rounded-full bg-black/25 text-[11px] font-bold">~{wine.prixMoyen} €</span>
          {qp && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold"
                  style={{ background: 'rgba(255,255,255,0.15)' }}>
              <span className="w-2 h-2 rounded-full" style={{ background: qp.couleur }} /> {qp.court}
            </span>
          )}
          {diff && (
            <span className="px-2.5 py-1 rounded-full bg-black/25 text-[11px] font-bold">{diff.label}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default function DecouvrirSwipe({ onFiche, onAddWine }) {
  // Pile diversifiée par région : deux Bordeaux d'affilée, jamais.
  const pile = useMemo(() => {
    const base = WINE_DB_TERROIR.filter(w => w.prixMoyen)
    const melange = [...base].sort(() => Math.random() - 0.5)
    return diversifyByRegion(melange, 60)
  }, [])

  const [i, setI] = useState(0)
  const [drag, setDrag] = useState(null)   // { dx, dy } pendant le geste
  const [sortie, setSortie] = useState(0)  // -1 passer, +1 envie : animation de sortie
  const [gardes, setGardes] = useState(0)
  const carteRef = useRef(null)
  const originRef = useRef(null)

  const wine = pile[i]
  const suivant = pile[i + 1]

  const trancher = useCallback((sens) => {
    if (!wine) return
    if (sens > 0) {
      // Glisser à droite = je garde → liste d'envies (si pas déjà dedans)
      const deja = loadEnvies().some(e => e.appellation === wine.appellation)
      if (!deja) toggleEnvie(wine.appellation)
      setGardes(n => n + 1)
    }
    setSortie(sens)
    setTimeout(() => { setSortie(0); setDrag(null); setI(n => n + 1) }, 220)
  }, [wine])

  // ── Geste tactile / souris ────────────────────────────────────────────────
  const onPointerDown = useCallback(e => {
    if (sortie) return
    originRef.current = { x: e.clientX, y: e.clientY, t: Date.now() }
    e.currentTarget.setPointerCapture?.(e.pointerId)
    setDrag({ dx: 0, dy: 0 })
  }, [sortie])

  useEffect(() => {
    if (!drag) return
    const move = e => {
      const o = originRef.current
      if (!o) return
      setDrag({ dx: e.clientX - o.x, dy: e.clientY - o.y })
    }
    const up = e => {
      const o = originRef.current
      originRef.current = null
      if (!o) { setDrag(null); return }
      const dx = e.clientX - o.x
      const dy = e.clientY - o.y
      const rapide = Date.now() - o.t < 300 && Math.abs(dx) > 60
      if (Math.abs(dx) > SEUIL || rapide) { trancher(dx > 0 ? 1 : -1); return }
      // Tap franc (peu de mouvement) → fiche complète : l'info en 1 geste
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8 && Date.now() - o.t < 350) {
        setDrag(null)
        if (wine) onFiche?.(wine)
        return
      }
      setDrag(null)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
    }
  }, [drag, trancher, wine, onFiche])

  // ── Clavier : ← passer, → garder, ↵ ouvrir ───────────────────────────────
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); trancher(-1) }
      else if (e.key === 'ArrowRight') { e.preventDefault(); trancher(1) }
      else if (e.key === 'Enter' && wine) { e.preventDefault(); onFiche?.(wine) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [trancher, wine, onFiche])

  // Position de la carte du dessus
  const dx = sortie ? sortie * 700 : (drag?.dx || 0)
  const dy = sortie ? -60 : (drag?.dy || 0)
  const rot = Math.max(-ROTATION_MAX, Math.min(ROTATION_MAX, dx / 14))
  const decision = Math.max(-1.4, Math.min(1.4, dx / SEUIL))

  if (!wine) {
    return (
      <div className="max-w-md mx-auto text-center py-16 animate-fade-in">
        <WineVisuel type="red" size={44} className="mx-auto mb-5 opacity-60" />
        <div className="font-serif text-2xl text-anthracite-900">C'est tout pour l'instant</div>
        <p className="text-sm text-anthracite-500 mt-2">
          {gardes > 0 ? `${gardes} vin${gardes > 1 ? 's' : ''} mis de côté.` : 'Rien retenu cette fois.'}
        </p>
        <button
          onClick={() => { setI(0); setGardes(0) }}
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-cream cursor-pointer active:scale-[0.98] transition-all"
          style={{ background: 'linear-gradient(135deg, #8c2f39, #5c0d22)' }}
        >
          <RotateCcw size={15} /> Recommencer
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto animate-fade-in">
      {/* Pile de cartes */}
      <div className="relative w-full" style={{ aspectRatio: '3 / 4.15' }}>
        {suivant && (
          <div className="absolute inset-0 rounded-3xl overflow-hidden scale-[0.955] translate-y-2.5 opacity-70 pointer-events-none">
            <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${suivant.color} 0%, ${suivant.color}dd 45%, #17130f 130%)` }} />
          </div>
        )}
        <Carte
          key={wine.id}
          wine={wine}
          refCarte={carteRef}
          dragging={!!drag && !sortie}
          decision={decision}
          onPointerDown={onPointerDown}
          style={{ transform: `translate(${dx}px, ${dy}px) rotate(${rot}deg)`, opacity: sortie ? 0 : 1 }}
        />
      </div>

      {/* Actions — le geste d'abord, les boutons pour ceux qui préfèrent */}
      <div className="flex items-center justify-center gap-5 mt-6">
        <button
          onClick={() => trancher(-1)}
          aria-label="Passer ce vin"
          className="w-14 h-14 rounded-full bg-white border border-anthracite-900/12 flex items-center justify-center text-anthracite-400 hover:text-wine-700 hover:border-wine-300 active:scale-90 transition-all cursor-pointer shadow-card"
        >
          <X size={22} />
        </button>
        <button
          onClick={() => onFiche?.(wine)}
          aria-label="Voir la fiche complète"
          className="w-12 h-12 rounded-full bg-white border border-anthracite-900/12 flex items-center justify-center text-anthracite-400 hover:text-gold-700 hover:border-gold-400 active:scale-90 transition-all cursor-pointer shadow-card"
        >
          <Info size={19} />
        </button>
        {onAddWine && (
          <button
            onClick={() => {
              onAddWine({
                id: `${wine.id}-${Date.now()}`,
                name: wine.appellation, domain: '', appellation: wine.appellation,
                region: wine.region, type: wine.type, cepages: wine.cepages,
                vintage: wine.bonsMilsimes?.[wine.bonsMilsimes.length - 1] || new Date().getFullYear() - 2,
                quantity: 1, drinkFrom: wine.drinkFrom, drinkUntil: wine.drinkUntil,
                serviceTemp: wine.serviceTemp, carafage: wine.carafage,
                estimatedValue: wine.prixMoyen, foodPairings: wine.accords, notes: wine.enUneMot,
              })
              trancher(1)
            }}
            aria-label="Ajouter directement à ma cave"
            className="w-12 h-12 rounded-full bg-white border border-anthracite-900/12 flex items-center justify-center text-anthracite-400 hover:text-emerald-700 hover:border-emerald-300 active:scale-90 transition-all cursor-pointer shadow-card"
          >
            <Plus size={19} />
          </button>
        )}
        <button
          onClick={() => trancher(1)}
          aria-label="Garder ce vin dans mes envies"
          className="w-14 h-14 rounded-full flex items-center justify-center text-cream active:scale-90 transition-all cursor-pointer shadow-wine"
          style={{ background: 'linear-gradient(135deg, #8c2f39, #5c0d22)' }}
        >
          <Heart size={22} className="text-gold-400" />
        </button>
      </div>

      <p className="text-center text-[11px] text-anthracite-400 mt-4">
        Glissez la carte · touchez-la pour tout savoir
      </p>
    </div>
  )
}
