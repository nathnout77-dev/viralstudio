import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import {
  Users, Wine, Coins, Share2, X, Download, Loader2,
  RefreshCw, Check, GraduationCap, Thermometer, Hourglass, Sparkles,
} from 'lucide-react'
import { CHIPS, buildMenu, caveIdsFromWines, suggestionsPour, millesimeConseille } from './modeDinerLogic'
import { computeProfilAppris } from '../data/goutsAppris'
import { FicheVin } from './BibliothequeView'
import { EnvieButton } from './Envies'
import useModalBehavior from '../lib/useModal'

// ═══════════════════════════════════════════════════════════════════════════
// Mode Dîner — « Composez le menu des vins de votre repas ».
// Entrée / Plat / Dessert → un vin recommandé + une alternative par plat,
// mis en scène comme un menu de restaurant. 100 % local (WINE_DB), hors-ligne.
// ═══════════════════════════════════════════════════════════════════════════

const COURSES = [
  { key: 'entree',  label: 'Entrée',  placeholder: 'Huîtres, foie gras, velouté… (optionnel)' },
  { key: 'plat',    label: 'Plat',    placeholder: 'Bœuf bourguignon, magret, risotto…' },
  { key: 'dessert', label: 'Dessert', placeholder: 'Tarte tatin, chocolat, fromages… (optionnel)' },
]

const ORDINAUX = ['1ᵉʳ', '2ᵉ', '3ᵉ']

// ── Champ plat : saisie libre + autocomplete + chips rapides ─────────────────
function DishField({ course, value, onChange }) {
  const [focused, setFocused] = useState(false)
  const suggestions = useMemo(() => suggestionsPour(value), [value])

  return (
    <div>
      <label className="label" htmlFor={`diner-${course.key}`}>
        {course.label}
        {course.key === 'plat'
          ? <span className="text-wine-700 normal-case tracking-normal ml-1">*</span>
          : <span className="text-anthracite-300 normal-case tracking-normal ml-1.5">facultatif</span>}
      </label>
      <div className="relative">
        <input
          id={`diner-${course.key}`}
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder={course.placeholder}
          autoComplete="off"
          className="input-field"
        />
        {focused && suggestions.length > 0 && (
          <div className="absolute z-20 left-0 right-0 mt-1.5 bg-white rounded-xl border border-anthracite-900/10 shadow-card-hover overflow-hidden">
            {suggestions.map(s => (
              <button
                key={s}
                type="button"
                onMouseDown={e => { e.preventDefault(); onChange(s) }}
                className="w-full text-left px-4 py-2.5 text-sm text-anthracite-700 hover:bg-gold-500/10 transition-colors cursor-pointer"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-1.5 mt-2">
        {CHIPS[course.key].map(c => (
          <button
            key={c}
            type="button"
            onClick={() => onChange(c)}
            className={`text-[11px] px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
              value === c
                ? 'bg-anthracite-950 text-cream border-anthracite-950'
                : 'bg-white text-anthracite-500 border-anthracite-200 hover:border-gold-600/50 hover:text-anthracite-800'
            }`}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Partage : carte image « menu de table » format A5 vertical (canvas) ─────
const W = 1240
const H = 1754
const GOLD = '#b8962a'
const BORDEAUX = '#5c0d22'
const ENCRE = '#1C1917'

function filet(ctx, y, half = 150) {
  ctx.strokeStyle = 'rgba(184,150,42,0.55)'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(W / 2 - half, y)
  ctx.lineTo(W / 2 + half, y)
  ctx.stroke()
  // Losange central
  ctx.fillStyle = GOLD
  ctx.save()
  ctx.translate(W / 2, y)
  ctx.rotate(Math.PI / 4)
  ctx.fillRect(-4, -4, 8, 8)
  ctx.restore()
}

async function renderMenuCard(canvas, { services, convives, bouteilles }) {
  try {
    await Promise.all([
      document.fonts.load('700 110px Tangerine'),
      document.fonts.load('600 44px "Playfair Display"'),
      document.fonts.load('600 24px Inter'),
      document.fonts.ready,
    ])
  } catch { /* fallback système */ }

  const ctx = canvas.getContext('2d')
  canvas.width = W
  canvas.height = H

  // Fond crème
  ctx.fillStyle = '#f7f2e9'
  ctx.fillRect(0, 0, W, H)
  const halo = ctx.createRadialGradient(W / 2, 0, 0, W / 2, 0, 900)
  halo.addColorStop(0, 'rgba(201,168,76,0.10)')
  halo.addColorStop(1, 'rgba(201,168,76,0)')
  ctx.fillStyle = halo
  ctx.fillRect(0, 0, W, H)

  // Double cadre or
  ctx.strokeStyle = 'rgba(184,150,42,0.7)'
  ctx.lineWidth = 3
  ctx.strokeRect(44, 44, W - 88, H - 88)
  ctx.strokeStyle = 'rgba(184,150,42,0.4)'
  ctx.lineWidth = 1
  ctx.strokeRect(60, 60, W - 120, H - 120)

  ctx.textAlign = 'center'

  // En-tête
  ctx.fillStyle = GOLD
  ctx.font = '600 26px Inter, sans-serif'
  ctx.fillText('M E N U   D E S   V I N S', W / 2, 158)
  ctx.fillStyle = BORDEAUX
  ctx.font = '700 96px Tangerine, cursive'
  ctx.fillText('Le dîner', W / 2, 262)
  ctx.fillStyle = 'rgba(28,25,23,0.55)'
  ctx.font = '400 27px Inter, sans-serif'
  const dateStr = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
  ctx.fillText(`${dateStr}  ·  ${convives} convives`, W / 2, 315)
  filet(ctx, 366)

  // Services — hauteur allouée selon leur nombre
  const top = 420
  const bottom = H - 250
  const bloc = (bottom - top) / services.length

  services.forEach((s, i) => {
    let y = top + bloc * i + 54
    ctx.fillStyle = GOLD
    ctx.font = '600 24px Inter, sans-serif'
    ctx.fillText(`${(ORDINAUX[i] || `${i + 1}ᵉ`).toUpperCase()}  S E R V I C E   —   ${s.label.toUpperCase()}`, W / 2, y)
    y += 62
    ctx.fillStyle = ENCRE
    ctx.font = '600 44px "Playfair Display", serif'
    let plat = s.dish.charAt(0).toUpperCase() + s.dish.slice(1)
    while (ctx.measureText(plat).width > W - 260 && plat.length > 8) plat = plat.slice(0, -2)
    ctx.fillText(plat, W / 2, y)
    y += 92
    // Vin en Tangerine, taille adaptative
    let size = 104
    ctx.font = `700 ${size}px Tangerine, cursive`
    while (ctx.measureText(s.wine.appellation).width > W - 260 && size > 56) {
      size -= 6
      ctx.font = `700 ${size}px Tangerine, cursive`
    }
    ctx.fillStyle = BORDEAUX
    ctx.fillText(s.wine.appellation, W / 2, y)
    y += 52
    ctx.fillStyle = 'rgba(28,25,23,0.6)'
    ctx.font = '400 27px Inter, sans-serif'
    const infos = [
      `${s.wine.typeLabel} · millésime ${millesimeConseille(s.wine)}`,
      s.wine.temperature ? `service ${s.wine.temperature}` : null,
      s.wine.carafage ? `carafage ${s.wine.carafage}` : null,
    ].filter(Boolean).join('   ·   ')
    ctx.fillText(infos, W / 2, y)
    if (i < services.length - 1) filet(ctx, top + bloc * (i + 1))
  })

  // Pied
  filet(ctx, H - 226, 190)
  ctx.fillStyle = 'rgba(28,25,23,0.6)'
  ctx.font = '400 26px Inter, sans-serif'
  ctx.fillText(`${bouteilles} bouteille${bouteilles > 1 ? 's' : ''} par service · servis du plus léger au plus puissant`, W / 2, H - 172)
  ctx.fillStyle = GOLD
  ctx.font = '700 64px Tangerine, cursive'
  ctx.fillText('Œno', W / 2, H - 100)
}

function ShareMenu({ menu, convives, onClose }) {
  useModalBehavior(onClose)
  const canvasRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [busy, setBusy] = useState(false)
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!mounted || !canvasRef.current) return
    let cancelled = false
    renderMenuCard(canvasRef.current, {
      services: menu.services,
      convives,
      bouteilles: menu.bouteillesParService,
    }).then(() => { if (!cancelled) setReady(true) })
    return () => { cancelled = true }
  }, [mounted, menu, convives])

  const getBlob = () => new Promise(resolve => canvasRef.current.toBlob(resolve, 'image/png'))

  const texteMenu = useCallback(() => {
    const lignes = menu.services.map((s, i) =>
      `${i + 1}. ${s.label} — ${s.dish}\n   🍷 ${s.wine.appellation} ${millesimeConseille(s.wine)} (${s.wine.typeLabel}, ${s.wine.temperature || 'à bonne température'}${s.wine.carafage ? `, carafage ${s.wine.carafage}` : ''})`
    )
    return `Le menu des vins de notre dîner 🍽️\n\n${lignes.join('\n')}\n\n${menu.bouteillesParService} bouteille(s) par service pour ${convives} convives.\n— composé avec Œno, le vin enfin simple`
  }, [menu, convives])

  const download = useCallback(async () => {
    const blob = await getBlob()
    if (!blob) return
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'oeno-menu-des-vins.png'
    document.body.appendChild(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(url), 4000)
  }, [])

  const share = useCallback(async () => {
    setBusy(true)
    try {
      const blob = await getBlob()
      const file = blob && new File([blob], 'oeno-menu-des-vins.png', { type: 'image/png' })
      if (file && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: 'Le menu des vins', text: texteMenu() })
      } else if (navigator.share) {
        await navigator.share({ title: 'Le menu des vins', text: texteMenu() })
      } else {
        // Repli : texte dans le presse-papier
        await navigator.clipboard.writeText(texteMenu())
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch { /* partage annulé */ }
    setBusy(false)
  }, [texteMenu])

  if (!mounted) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[95] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(12,10,9,0.65)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
      role="dialog" aria-modal="true" aria-label="Partager le menu des vins"
    >
      <div className="modal-panel sm:max-w-md max-h-[92vh] shadow-card-hover" onClick={e => e.stopPropagation()}>
        <div className="p-5 pb-4 flex-shrink-0 flex items-center justify-between border-b border-anthracite-900/[0.06]">
          <div>
            <span className="eyebrow mb-1">À poser sur la table</span>
            <h3 className="font-serif text-xl font-bold text-anthracite-900">Partager le menu</h3>
          </div>
          <button onClick={onClose} aria-label="Fermer"
                  className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full bg-anthracite-100 hover:bg-anthracite-200 text-anthracite-600 transition-all cursor-pointer">
            <X size={15} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <div className="relative rounded-2xl overflow-hidden shadow-card-hover mx-auto border border-anthracite-900/10" style={{ maxWidth: 300 }}>
            <canvas ref={canvasRef} className="w-full h-auto block" style={{ aspectRatio: `${W} / ${H}` }}
                    aria-label="Menu des vins du dîner" />
            {!ready && (
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: '#f7f2e9' }}>
                <Loader2 size={22} className="text-gold-600 animate-spin" />
              </div>
            )}
          </div>
          <p className="text-[11px] text-anthracite-400 text-center mt-3">Format A5 vertical — à imprimer ou envoyer aux convives.</p>
        </div>

        <div className="p-5 border-t border-anthracite-100 bg-cream flex-shrink-0 flex items-center gap-3">
          <button onClick={download} disabled={!ready} className="btn-ghost text-xs px-4 py-2.5 flex-1 justify-center">
            <Download size={13} /> Télécharger
          </button>
          <button onClick={share} disabled={!ready || busy} className="btn-gold text-xs px-4 py-2.5 flex-1 justify-center">
            {busy ? <Loader2 size={13} className="animate-spin" />
              : copied ? <Check size={13} /> : <Share2 size={13} />}
            {copied ? 'Copié !' : 'Partager'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

// ── Carte d'un service dans le menu de table ─────────────────────────────────
function ServiceCard({ service, index, bouteilles, onFiche }) {
  const w = service.wine
  return (
    <div className="text-center px-2">
      <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold-700 mb-2">
        {ORDINAUX[index] || `${index + 1}ᵉ`} service — {service.label}
      </div>
      <div className="font-serif text-lg sm:text-xl font-semibold text-anthracite-900 leading-snug">
        {service.dish.charAt(0).toUpperCase() + service.dish.slice(1)}
      </div>
      <button
        onClick={() => onFiche(w)}
        className="font-wine-name text-4xl sm:text-5xl mt-1.5 leading-none cursor-pointer transition-all hover:opacity-75"
        style={{ color: '#5c0d22' }}
        title={`Voir la fiche ${w.appellation}`}
      >
        {w.appellation}
      </button>
      <div className="text-xs text-anthracite-500 mt-1.5">
        {w.region} · {w.typeLabel} · millésime conseillé <span className="font-semibold">{millesimeConseille(w)}</span> · ~{w.prixMoyen} €
      </div>

      <div className="flex items-center justify-center gap-2 flex-wrap mt-2.5">
        {service.inCave && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.12em] bg-gold-500/15 text-gold-700 border border-gold-500/40">
            <Wine size={10} /> Dans votre cave
          </span>
        )}
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold text-anthracite-500 bg-anthracite-50 border border-anthracite-200">
          <Thermometer size={10} /> {w.temperature || `${w.serviceTemp}°C`}
        </span>
        {w.carafage && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold text-anthracite-500 bg-anthracite-50 border border-anthracite-200">
            <Hourglass size={10} /> Carafage {w.carafage}
          </span>
        )}
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold text-anthracite-500 bg-anthracite-50 border border-anthracite-200">
          {bouteilles} btl
        </span>
        {!service.inCave && <EnvieButton appellation={w.appellation} size={12} className="!w-7 !h-7" />}
      </div>

      {service.fallback && (
        <p className="text-[11px] italic text-anthracite-400 mt-2 max-w-sm mx-auto">
          Accord audacieux : ce plat sort de nos sentiers battus — voici une valeur sûre et polyvalente en repli.
        </p>
      )}

      {service.alt && (
        <p className="text-xs text-anthracite-500 mt-2.5">
          Alternative :{' '}
          <button onClick={() => onFiche(service.alt)}
                  className="font-semibold text-anthracite-700 underline decoration-gold-600/50 underline-offset-2 hover:text-wine-800 cursor-pointer">
            {service.alt.appellation}
          </button>
          {' '}(~{service.alt.prixMoyen} €){service.altInCave && ' — dans votre cave'}
          {!service.altInCave && <EnvieButton appellation={service.alt.appellation} size={10} className="!w-6 !h-6 ml-1.5 align-middle" />}
        </p>
      )}
    </div>
  )
}

// ═══ Composant principal ═════════════════════════════════════════════════════
export default function ModeDiner() {
  const [dishes, setDishes]     = useState({ entree: '', plat: '', dessert: '' })
  const [convives, setConvives] = useState(5)
  const [budgetMax, setBudgetMax] = useState('')
  const [caveIds, setCaveIds]   = useState(() => new Set())
  const [useCave, setUseCave]   = useState(false)
  const [menu, setMenu]         = useState(null)
  const [ficheWine, setFicheWine] = useState(null)
  const [showShare, setShowShare] = useState(false)
  const profil = useMemo(() => computeProfilAppris(), [])

  // Cave locale : coche « piocher dans ma cave » par défaut si non vide
  useEffect(() => {
    try {
      const wines = JSON.parse(localStorage.getItem('oenotheque-v2') || '[]')
      const ids = caveIdsFromWines(wines)
      setCaveIds(ids)
      if (ids.size > 0) setUseCave(true)
    } catch { /* cave illisible : saisie libre uniquement */ }
  }, [])

  const composer = () => {
    const courses = COURSES
      .filter(c => dishes[c.key].trim())
      .map(c => ({ key: c.key, label: c.label, dish: dishes[c.key].trim() }))
    setMenu(buildMenu({
      courses,
      convives,
      useCave,
      caveIds,
      budgetMax: Number(budgetMax) || 0,
      profil,
    }))
  }

  // ── Résultat : le menu de table ──
  if (menu) {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div
          className="relative rounded-3xl border-2 p-6 sm:p-10 shadow-card"
          style={{ borderColor: 'rgba(184,150,42,0.5)', background: 'linear-gradient(180deg, #fdfbf6 0%, #f7f2e9 100%)' }}
        >
          {/* Filet intérieur */}
          <div className="absolute inset-2.5 rounded-[1.15rem] border border-gold-600/25 pointer-events-none" aria-hidden="true" />

          <div className="text-center mb-6">
            <span className="eyebrow justify-center">Menu des vins</span>
            <div className="font-wine-name text-5xl sm:text-6xl text-anthracite-900 mt-2">Le dîner</div>
            <div className="text-xs text-anthracite-400 mt-1.5">
              {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} · {convives} convives
            </div>
            {profil && (
              <p className="inline-flex items-center gap-1.5 text-[11px] text-gold-700 font-semibold mt-2">
                <GraduationCap size={12} /> Affiné par vos {profil.nbDegustations} dégustations notées
              </p>
            )}
          </div>

          <div className="space-y-6">
            {menu.services.map((s, i) => (
              <div key={s.key}>
                {i > 0 && <div className="divider-gold !my-5 max-w-[180px] mx-auto" aria-hidden="true" />}
                <ServiceCard service={s} index={i} bouteilles={menu.bouteillesParService} onFiche={setFicheWine} />
              </div>
            ))}
          </div>

          <div className="divider-gold max-w-[240px] mx-auto" aria-hidden="true" />
          <p className="text-[11px] text-anthracite-500 text-center leading-relaxed">
            Servis dans l'ordre du sommelier : du plus léger au plus puissant, le liquoreux en dernier.
            {menu.reordonne && ' (Nous avons réordonné vos plats en ce sens.)'}
            <br />
            Comptez ~1 bouteille pour 3 convives par service, soit <span className="font-semibold">{menu.bouteillesParService} bouteille{menu.bouteillesParService > 1 ? 's' : ''}</span> de chaque vin pour {convives}.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button onClick={() => setMenu(null)} className="btn-ghost flex-1 justify-center text-sm">
            <RefreshCw size={14} /> Recomposer
          </button>
          <button onClick={() => setShowShare(true)} className="btn-gold flex-1 justify-center text-sm">
            <Share2 size={14} /> Partager le menu
          </button>
        </div>

        {ficheWine && <FicheVin wine={ficheWine} onClose={() => setFicheWine(null)} />}
        {showShare && <ShareMenu menu={menu} convives={convives} onClose={() => setShowShare(false)} />}
      </div>
    )
  }

  // ── Formulaire : composer son repas ──
  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="card p-6 sm:p-8 space-y-6">
        {COURSES.map(c => (
          <DishField key={c.key} course={c} value={dishes[c.key]} onChange={v => setDishes(d => ({ ...d, [c.key]: v }))} />
        ))}

        <div className="divider-gold !my-4" aria-hidden="true" />

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="label" htmlFor="diner-convives"><Users size={11} className="inline mr-1 -mt-0.5" />Convives</label>
            <div className="flex items-center gap-3">
              <input
                id="diner-convives" type="range" min="2" max="16" value={convives}
                onChange={e => setConvives(Number(e.target.value))}
                className="flex-1 accent-[#5c0d22] cursor-pointer"
              />
              <span className="w-8 text-center font-serif text-lg font-bold text-anthracite-900">{convives}</span>
            </div>
          </div>
          <div>
            <label className="label" htmlFor="diner-budget"><Coins size={11} className="inline mr-1 -mt-0.5" />Budget max / bouteille</label>
            <div className="relative">
              <input
                id="diner-budget" type="number" min="5" max="500" value={budgetMax}
                onChange={e => setBudgetMax(e.target.value)}
                placeholder="Sans limite"
                className="input-field pr-8"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-anthracite-400">€</span>
            </div>
          </div>
        </div>

        <label className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all ${
          caveIds.size ? 'cursor-pointer border-anthracite-200 hover:border-gold-600/50 bg-white' : 'border-anthracite-100 bg-anthracite-50 opacity-60'
        }`}>
          <input
            type="checkbox" checked={useCave} disabled={!caveIds.size}
            onChange={e => setUseCave(e.target.checked)}
            className="w-4 h-4 accent-[#5c0d22] cursor-pointer"
          />
          <span className="text-sm text-anthracite-700">
            <span className="font-semibold">Piochez d'abord dans ma cave</span>
            <span className="block text-[11px] text-anthracite-400 mt-0.5">
              {caveIds.size
                ? `${caveIds.size} appellation${caveIds.size > 1 ? 's' : ''} de votre cave reconnue${caveIds.size > 1 ? 's' : ''} — elles seront privilégiées.`
                : 'Votre cave est vide (ou ses vins ne sont pas reconnus).'}
            </span>
          </span>
        </label>

        <button
          onClick={composer}
          disabled={!dishes.plat.trim()}
          className="btn-primary w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Sparkles size={15} className="text-gold-400" />
          Composer le menu des vins
        </button>
        {!dishes.plat.trim() && (
          <p className="text-[11px] text-anthracite-400 text-center -mt-3">Indiquez au moins le plat principal.</p>
        )}
      </div>
    </div>
  )
}
