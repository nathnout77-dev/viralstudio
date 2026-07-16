import { Quote, Sparkles } from 'lucide-react'
import { DIFFICULTE_CONFIG } from '../data/wineDatabase'
import WineVisuel from './WineVisuel'
import { tintStyle, pastilleStyle, regionMonogram, collectionNumero } from '../lib/wineStyle'
import { MiniVerre, fillLevelFromJauges } from './WineGlassAnim'
import { EnvieButton } from './Envies'
import JaugesGout from './JaugesGout'
import useTilt from '../lib/useTilt'
import { buildRaison } from '../lib/suggestions'

// ═══════════════════════════════════════════════════════════════════════════
// WineTile — carte de vin unique et réutilisable.
//
// Factorise les ~6 implémentations ad-hoc de « carte de vin cliquable » qui
// avaient chacune leur propre bug (onClick manquant). Toute nouvelle carte de
// vin doit passer par ce composant plutôt que réinventer sa propre étiquette.
//
// variant :
//  - 'collection' : étiquette complète type Bibliothèque (numéro, monogramme,
//                    mini-verre, tilt 3D, pastille) — le style le plus abouti.
//  - 'compact'    : carte simplifiée pour résultats de quiz/recommandations
//                    (Goût-o-mètre, Budget caviste, Ce soir ?, Envies,
//                    Assistant) — garde pastille + font-wine-name + hover lift.
//  - 'cave'       : usage dans Ma Cave (délégué en pratique à WineCard, qui
//                    reste le wrapper fin pour favori/quantité/édition).
//  - 'readonly'   : cave partagée entre amis — pas d'actions d'édition.
// ═══════════════════════════════════════════════════════════════════════════

const noop = () => {}

export default function WineTile({
  wine,
  variant = 'compact',
  onOpen = noop,
  index = 0,
  showRaison = false,
  raisonCriteres = null,
  showEnvie = true,
  showBadgeCoupDeCoeur = false,
  coupDeCoeurLabel = 'Coup de cœur',
  className = '',
  children,
  footer,
  iconClass = 'w-12 h-12 rounded-2xl text-2xl',
  nameClass = 'font-wine-name text-2xl text-anthracite-900 leading-tight',
}) {
  const tiltRef = useTilt()
  if (!wine) return null

  const appellation = wine.appellation || wine.name || 'Vin'
  const region = wine.region || ''
  const type = wine.type || 'red'
  const prixMoyen = wine.prixMoyen ?? wine.estimatedValue
  const typeLabel = wine.typeLabel
  const color = wine.color
  const enUneMot = wine.enUneMot
  const diff = wine.difficulte ? DIFFICULTE_CONFIG[wine.difficulte] : null
  const hasPetitDomaine = Array.isArray(wine.domaines) && wine.domaines.some(d => d.confidentiel)

  const open = () => onOpen(wine)

  // ── Variant collection : étiquette pleine, tilt 3D, numéro de collection ──
  if (variant === 'collection') {
    return (
      <button
        ref={tiltRef}
        onClick={open}
        className={`etiquette p-4 pt-3.5 text-left w-full hover:-translate-y-1 transition-all duration-300 cursor-pointer group animate-fade-in-up ${className}`}
        style={{ animationDelay: `${Math.min(index * 40, 400)}ms`, animationFillMode: 'both', ...tintStyle(type) }}
      >
        <div className="flex items-center justify-between mb-2.5">
          <span className="inline-flex items-center gap-2">
            {wine.jauges && <MiniVerre color={color} fillLevel={fillLevelFromJauges(wine.jauges)} size={13} hoverFill />}
            <span className="etiquette-numero">{collectionNumero(index)}</span>
          </span>
          {region && (
            <span className="medaillon transition-transform group-hover:scale-110" title={region}>
              {regionMonogram(region)}
            </span>
          )}
        </div>

        <div className="text-center mb-2 min-w-0">
          <div className="font-wine-name text-2xl text-anthracite-900 leading-tight line-clamp-2 whitespace-normal">
            {appellation}
          </div>
          <div className="text-[9px] uppercase tracking-[0.22em] text-anthracite-400 mt-1.5">
            {region}{prixMoyen != null ? ` · ~${prixMoyen} €` : ''}
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 mb-2.5">
          <span className="w-3 h-3 rounded-full ring-1 ring-anthracite-900/10 flex-shrink-0" style={pastilleStyle(type)} aria-hidden="true" />
          {typeLabel && <span className="text-[9px] uppercase tracking-[0.18em] font-semibold text-anthracite-500">{typeLabel}</span>}
        </div>

        {enUneMot && <p className="text-xs text-anthracite-500 italic mb-3 line-clamp-1 text-center">« {enUneMot} »</p>}
        {wine.jauges && <JaugesGout jauges={wine.jauges} compact animate={false} />}

        <div className="flex items-center justify-between mt-3 gap-2">
          {diff ? (
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
              style={{ background: diff.bg, color: diff.color }}
            >
              {diff.label}
            </span>
          ) : <span />}
          <div className="flex items-center gap-1.5">
            {showEnvie && <EnvieButton appellation={appellation} size={12} className="!w-6 !h-6" />}
            {hasPetitDomaine && (
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-gold-500/15 text-gold-700" title="Contient un petit domaine">
                <Sparkles size={9} />
              </span>
            )}
          </div>
        </div>
      </button>
    )
  }

  // ── Variant compact : résultats quiz / recommandations ──────────────────
  return (
    <div
      onClick={open}
      role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && open()}
      className={`card p-4 sm:p-5 animate-slide-up cursor-pointer hover:border-gold-500/30 hover:-translate-y-0.5 transition-all ${className}`}
      style={{ animationDelay: `${Math.min(index * 80, 400)}ms`, animationFillMode: 'both' }}
    >
      {showBadgeCoupDeCoeur && index === 0 && (
        <div className="text-[10px] font-bold text-gold-600 uppercase tracking-wider mb-2 flex items-center gap-1">
          <Sparkles size={10} /> {coupDeCoeurLabel}
        </div>
      )}
      <div className="flex items-start gap-3">
        <div
          className={`flex items-center justify-center flex-shrink-0 ${iconClass}`}
          style={{ background: color ? `${color}18` : '#f0e9dd' }}
        >
          <WineVisuel type={type} size={22} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className={nameClass}>{appellation}</div>
              <div className="text-[11px] text-anthracite-400 mt-0.5">
                {[region, typeLabel, prixMoyen != null ? `~${prixMoyen} €` : null].filter(Boolean).join(' · ')}
              </div>
            </div>
            <span className="flex items-center gap-1.5 flex-shrink-0" onClick={e => e.stopPropagation()}>
              {showEnvie && <EnvieButton appellation={appellation} size={12} className="!w-6 !h-6" />}
              {diff && (
                <span className="w-2.5 h-2.5 rounded-full ring-2 ring-white flex-shrink-0" style={{ background: diff.color }} title={diff.label} />
              )}
            </span>
          </div>
          {enUneMot && <p className="text-xs text-anthracite-500 italic mt-1 line-clamp-1">« {enUneMot} »</p>}
          {wine.jauges && (
            <div className="mt-2">
              <JaugesGout jauges={wine.jauges} compact animate={false} />
            </div>
          )}
          {showRaison && raisonCriteres && (
            <p className="text-[11px] text-anthracite-600 italic mt-2 leading-relaxed flex items-start gap-1.5">
              <Quote size={10} className="flex-shrink-0 mt-0.5 text-gold-600" />
              <span>{buildRaison(wine, raisonCriteres)}</span>
            </p>
          )}
          {children}
        </div>
      </div>
      {footer}
    </div>
  )
}
