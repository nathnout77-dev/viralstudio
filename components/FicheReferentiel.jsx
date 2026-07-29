import { useMemo } from 'react'
import { X, MapPin, Grape, Landmark, Thermometer, Clock, UtensilsCrossed, Award, Layers } from 'lucide-react'
import {
  detailAppellation, cepageInfo, classementsAppellation, classementDe,
  millesimesRegion, appellationInfo,
} from '../lib/referentiel'
import { WINE_DB } from '../data/wineDatabase'
import { normaliser } from '../data/aromes'
import useModalBehavior from '../lib/useModal'
import WineVisuel from './WineVisuel'
import Icone from './Icone'

// ═══════════════════════════════════════════════════════════════════════════
// FicheReferentiel — la fiche d'une entrée de la base viticole nationale :
// appellation, cépage ou domaine. Elle affiche ce que la source dit vraiment
// (sol, garde, hiérarchie, classement, arômes…) sans rien inventer, et pointe
// vers les vins d'Œno correspondants quand il en existe.
// ═══════════════════════════════════════════════════════════════════════════

const COULEUR_TYPE = {
  rouge: 'red', blanc: 'white', 'rosé': 'rosé', rose: 'rosé',
  liquoreux: 'sweet', moelleux: 'sweet', effervescent: 'sparkling',
}
const typeDepuisCouleur = (c) => COULEUR_TYPE[normaliser(c)] || 'red'

function Bloc({ Icon, titre, children }) {
  if (!children) return null
  return (
    <div className="rounded-2xl border border-anthracite-900/[0.07] bg-carte p-4">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] font-bold text-anthracite-400 mb-2">
        <Icon size={11} className="text-gold-600" /> {titre}
      </div>
      {children}
    </div>
  )
}

const Puces = ({ items, className = '' }) => (
  <div className="flex flex-wrap gap-1.5">
    {items.map(x => (
      <span key={x} className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-fond border border-anthracite-900/10 text-anthracite-700 ${className}`}>
        {x}
      </span>
    ))}
  </div>
)

export default function FicheReferentiel({ entree, onClose, onOuvrirVin }) {
  useModalBehavior(onClose)
  const { kind, item } = entree

  // Vins d'Œno rattachés à cette entrée : le pont vers les fiches complètes
  const vinsLies = useMemo(() => {
    const n = normaliser(kind === 'domaine' ? item.appellation : item.nom)
    if (!n) return []
    return WINE_DB.filter(w => {
      if (kind === 'cepage') return (w.cepages || []).some(c => normaliser(c) === n)
      const a = normaliser(w.appellation)
      return a === n || a.startsWith(n + ' ') || n.startsWith(a + ' ')
    }).slice(0, 6)
  }, [kind, item])

  const detail   = kind === 'appellation' ? detailAppellation(item.nom) : null
  const crus     = kind === 'appellation' ? classementsAppellation(item.nom) : []
  const rangs    = kind === 'domaine' ? classementDe(item.nom) : []
  const millesimes = useMemo(
    () => (kind === 'domaine' || kind === 'appellation' ? millesimesRegion(item.region).slice(0, 4) : []),
    [kind, item]
  )
  const appDuDomaine = kind === 'domaine' ? appellationInfo(item.appellation) : null

  const couleurs = detail?.couleurs || (kind === 'cepage' ? [item.couleur] : [])
  const typeVisuel = typeDepuisCouleur(couleurs[0] || 'rouge')

  const sousTitre = kind === 'appellation'
    ? [item.region, item.sousRegion].filter(Boolean).join(' · ')
    : kind === 'cepage'
      ? `${item.couleur} · originaire de ${item.origine}`
      : [item.appellation, item.region].filter(Boolean).join(' · ')

  const emojiEnTete = kind === 'cepage' ? 'vigne' : kind === 'domaine' ? 'chateau' : 'decouverte'

  return (
    <div
      className="fixed inset-0 z-[75] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(12,10,9,0.55)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
      onClick={onClose}
      role="dialog" aria-modal="true" aria-label={item.nom}
    >
      <div className="modal-panel sm:max-w-lg max-h-[92vh]" onClick={e => e.stopPropagation()}>
        {/* En-tête */}
        <div
          className="p-6 pb-5 flex-shrink-0 text-cream relative overflow-hidden"
          style={{ background: 'linear-gradient(150deg, #0C0A09 0%, #3a0616 60%, #5c0d22 100%)' }}
        >
          <div className="absolute -top-3 -right-2 opacity-15 select-none pointer-events-none" aria-hidden="true">
            <WineVisuel type={typeVisuel} size={92} />
          </div>
          <div className="relative flex items-start justify-between gap-3">
            <div className="min-w-0">
              <span className="eyebrow-dark mb-2">
                {kind === 'appellation' ? (item.type === 'IGP' ? 'Indication géographique' : 'Appellation')
                  : kind === 'cepage' ? 'Cépage' : 'Domaine'}
              </span>
              <h3 className="font-wine-name text-4xl leading-none">
                <Icone nom={emojiEnTete} size={26} className="mr-2 align-middle" />
                {item.nom}
              </h3>
              <p className="text-cream/70 text-xs mt-2 flex items-center gap-1.5">
                <MapPin size={10} /> {sousTitre}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/35 transition-all cursor-pointer"
              aria-label="Fermer"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Corps */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
          {/* Appellation : couleurs, cépages, sol, garde, hiérarchie */}
          {couleurs.length > 0 && (
            <Bloc Icon={Layers} titre="Couleurs produites"><Puces items={couleurs} /></Bloc>
          )}

          {detail?.cepages?.length > 0 && (
            <Bloc Icon={Grape} titre="Cépages principaux"><Puces items={detail.cepages} /></Bloc>
          )}

          {(detail?.sol || detail?.garde || detail?.hierarchie) && (
            <div className="grid grid-cols-1 gap-3.5">
              {detail.sol && (
                <Bloc Icon={Landmark} titre="Sol">
                  <p className="text-[13px] text-anthracite-700">{detail.sol}</p>
                </Bloc>
              )}
              {detail.garde && (
                <Bloc Icon={Clock} titre="Potentiel de garde">
                  <p className="text-[13px] text-anthracite-700">{detail.garde}</p>
                </Bloc>
              )}
              {detail.hierarchie && (
                <Bloc Icon={Award} titre="Hiérarchie">
                  <p className="text-[13px] text-anthracite-700">{detail.hierarchie}</p>
                </Bloc>
              )}
            </div>
          )}

          {/* Cépage : arômes, structure, service, accords */}
          {kind === 'cepage' && (
            <>
              {item.aromes?.length > 0 && (
                <Bloc Icon={Grape} titre="Arômes typiques"><Puces items={item.aromes} /></Bloc>
              )}
              <Bloc Icon={Layers} titre="Structure">
                <div className="grid grid-cols-3 gap-2 text-center">
                  {[['Tanins', item.tanins], ['Acidité', item.acidite], ['Corps', item.corps]]
                    .filter(([, v]) => v)
                    .map(([k, v]) => (
                      <div key={k} className="rounded-xl bg-fond p-2.5">
                        <div className="text-[9px] uppercase tracking-wider font-bold text-anthracite-400">{k}</div>
                        <div className="text-[13px] font-semibold text-anthracite-800 mt-0.5">{v}</div>
                      </div>
                    ))}
                </div>
              </Bloc>
              {(item.garde || item.tempService) && (
                <Bloc Icon={Thermometer} titre="Garde & service">
                  <p className="text-[13px] text-anthracite-700">
                    {[item.garde && `Garde ${item.garde}`, item.tempService && `service à ${item.tempService}`]
                      .filter(Boolean).join(' · ')}
                  </p>
                </Bloc>
              )}
              {item.accords?.length > 0 && (
                <Bloc Icon={UtensilsCrossed} titre="À table avec"><Puces items={item.accords} /></Bloc>
              )}
              {item.appellations?.length > 0 && (
                <Bloc Icon={MapPin} titre="Appellations clés"><Puces items={item.appellations} /></Bloc>
              )}
              {item.synonymes?.length > 0 && (
                <Bloc Icon={Grape} titre="Aussi appelé"><Puces items={item.synonymes} /></Bloc>
              )}
            </>
          )}

          {/* Domaine : style, statut, cuvées, classement */}
          {kind === 'domaine' && (
            <>
              {item.style && (
                <Bloc Icon={Grape} titre="Style">
                  <p className="text-[13px] text-anthracite-700 leading-relaxed">{item.style}</p>
                </Bloc>
              )}
              {(item.statut || rangs.length > 0) && (
                <Bloc Icon={Award} titre="Statut">
                  {item.statut && <p className="text-[13px] text-anthracite-700">{item.statut}</p>}
                  {rangs.map(r => (
                    <p key={r.id} className="text-[12px] text-anthracite-500 mt-1">
                      {r.rang} — {r.classement}
                    </p>
                  ))}
                </Bloc>
              )}
              {item.cuvees?.length > 0 && (
                <Bloc Icon={Layers} titre="Cuvées phares"><Puces items={item.cuvees} /></Bloc>
              )}
              {item.note && (
                <Bloc Icon={Award} titre="À retenir">
                  <p className="text-[13px] text-anthracite-700">{item.note}</p>
                </Bloc>
              )}
              {appDuDomaine && (
                <p className="text-[11px] text-anthracite-400 px-1">
                  Appellation : {appDuDomaine.nom}
                  {appDuDomaine.sousRegion ? ` — ${appDuDomaine.sousRegion}` : ''}
                </p>
              )}
            </>
          )}

          {/* Crus classés de l'appellation */}
          {crus.length > 0 && (
            <Bloc Icon={Award} titre={`Crus classés (${crus.length})`}>
              <div className="space-y-1 max-h-44 overflow-y-auto">
                {crus.map(c => (
                  <div key={c.id} className="flex items-baseline justify-between gap-2 text-[12px]">
                    <span className="text-anthracite-800 font-medium truncate">{c.chateau}</span>
                    <span className="text-anthracite-400 text-[10px] flex-shrink-0">{c.rang}</span>
                  </div>
                ))}
              </div>
            </Bloc>
          )}

          {/* Millésimes notés de la région */}
          {millesimes.length > 0 && (
            <Bloc Icon={Clock} titre={`Millésimes — ${millesimes[0].region}`}>
              <div className="space-y-1.5">
                {millesimes.map(m => (
                  <div key={m.id} className="flex items-baseline gap-2 text-[12px]">
                    <span className="font-bold text-anthracite-900 w-10 flex-shrink-0">{m.annee}</span>
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-gold-500/15 text-gold-800 flex-shrink-0">
                      {m.note}/20
                    </span>
                    <span className="text-anthracite-500 truncate">{m.style}</span>
                  </div>
                ))}
              </div>
            </Bloc>
          )}

          {/* Pont vers les vins d'Œno */}
          {vinsLies.length > 0 && (
            <Bloc Icon={Grape} titre="Dans la bibliothèque Œno">
              <div className="flex flex-wrap gap-2">
                {vinsLies.map(w => (
                  <button
                    key={w.id}
                    onClick={() => onOuvrirVin?.(w)}
                    className="min-h-[40px] inline-flex items-center gap-2 pl-2.5 pr-3 rounded-full bg-fond border border-anthracite-900/10 hover:border-gold-500/60 active:scale-[0.98] transition-all cursor-pointer"
                  >
                    {w.emoji && <span role="img" aria-hidden="true">{w.emoji}</span>}
                    <span className="text-[12px] font-semibold text-anthracite-800">{w.appellation}</span>
                  </button>
                ))}
              </div>
            </Bloc>
          )}

          <p className="text-[10px] text-anthracite-400 leading-relaxed px-1 pb-1">
            Base viticole nationale Œno — appellations, cépages, domaines, crus classés et millésimes.
          </p>
        </div>
      </div>
    </div>
  )
}
