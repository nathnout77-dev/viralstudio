import { useState } from 'react'
import { UtensilsCrossed, Wine } from 'lucide-react'
import { WINE_DB } from '../data/wineDatabase'
import { FicheVin } from './BibliothequeView'
import Icone from './Icone'

function findWine(appellation) {
  if (!appellation) return null
  const q = appellation.toLowerCase()
  return (
    WINE_DB.find(w => w.appellation.toLowerCase() === q) ||
    WINE_DB.find(w => q.includes(w.appellation.toLowerCase()) || w.appellation.toLowerCase().includes(q)) ||
    null
  )
}

const PLATS = [
  { id: 'viande_rouge',   label: 'Viande rouge',    types: ['red'],          desc: 'Bœuf, agneau, gibier, canard' },
  { id: 'viande_blanche', label: 'Viande blanche',  types: ['red','white'],   desc: 'Poulet, veau, porc, lapin' },
  { id: 'poisson',        label: 'Poisson',          types: ['white','rosé'],  desc: 'Sole, bar, saumon, thon' },
  { id: 'fruits_mer',     label: 'Fruits de mer',   types: ['white'], desc: 'Huîtres, langoustines, crevettes' },
  { id: 'fromage',        label: 'Fromage',          types: ['red','white','sweet'], desc: 'Plateau de fromages variés' },
  { id: 'dessert',        label: 'Dessert',          types: ['sweet'], desc: 'Chocolat, fruits, pâtisseries' },
  { id: 'vegetarien',     label: 'Végétarien',       types: ['white','rosé'],  desc: 'Légumes, pâtes, risotto, quiche' },
  { id: 'charcuterie',    label: 'Charcuterie',      types: ['red','rosé'],    desc: 'Jambon, saucisson, pâté' },
  { id: 'champignons',    label: 'Champignons',      types: ['red','white'],   desc: 'Risotto, velouté, poêlée' },
  { id: 'foie_gras',      label: 'Foie gras',        types: ['sweet','white'], desc: 'Terrine, poêlé, en conserve' },
]

const ACCORDS = {
  viande_rouge: [
    { appellation:'Pauillac', region:'Bordeaux', type:'red', cepages:'Cabernet Sauvignon', note:'★★★ Accord classique', reason:'Les tanins structurés de Pauillac soutiennent parfaitement les viandes rouges saignantes.' },
    { appellation:'Gevrey-Chambertin', region:'Bourgogne', type:'red', cepages:'Pinot Noir', note:'★★★ Accord élégant', reason:'Le Pinot Noir et ses notes terreuses épousent les saveurs du bœuf et de l\'agneau.' },
    { appellation:'Côte-Rôtie', region:'Rhône Nord', type:'red', cepages:'Syrah', note:'★★ Accord épicé', reason:'La Syrah et son poivre noir complètent magnifiquement le gibier et les viandes grillées.' },
    { appellation:'Cahors', region:'Sud-Ouest', type:'red', cepages:'Malbec', note:'★★ Rapport qualité-prix', reason:'Le Malbec de Cahors, tannique et fruité, s\'accorde bien avec l\'agneau.' },
  ],
  poisson: [
    { appellation:'Meursault', region:'Bourgogne', type:'white', cepages:'Chardonnay', note:'★★★ Accord raffiné', reason:'Le Chardonnay beurré et la texture du poisson à chair blanche créent une harmonie parfaite.' },
    { appellation:'Chablis 1er Cru', region:'Bourgogne', type:'white', cepages:'Chardonnay', note:'★★★ Accord minéral', reason:'La minéralité tranchante du Chablis et son acidité vive subliment les poissons délicats.' },
    { appellation:'Sancerre', region:'Loire', type:'white', cepages:'Sauvignon Blanc', note:'★★ Accord vif', reason:'La fraîcheur herbacée du Sauvignon Blanc s\'accorde bien avec les poissons grillés.' },
  ],
  fruits_mer: [
    { appellation:'Muscadet sur Lie', region:'Loire', type:'white', cepages:'Melon de Bourgogne', note:'★★★ L\'accord iodé', reason:'L\'accord classique absolu : le Muscadet et ses notes iodées et minérales avec les huîtres.' },
    { appellation:'Chablis', region:'Bourgogne', type:'white', cepages:'Chardonnay', note:'★★★ Accord minéral', reason:'Né sur d\'anciens fonds marins, le Chablis retrouve les crustacés comme une évidence : tension, craie et citron.' },
    { appellation:'Picpoul de Pinet', region:'Languedoc', type:'white', cepages:'Picpoul', note:'★★ Accord abordable', reason:'Ce blanc vif et citronné du Languedoc est fait pour les plateaux de fruits de mer.' },
  ],
  fromage: [
    { appellation:'Sauternes', region:'Bordeaux', type:'sweet', cepages:'Sémillon', note:'★★★ Roquefort & Sauternes', reason:'L\'accord opposé : la douceur du Sauternes face à la puissance du fromage bleu.' },
    { appellation:'Gevrey-Chambertin', region:'Bourgogne', type:'red', cepages:'Pinot Noir', note:'★★ Fromages à pâte dure', reason:'Un rouge léger et sans tanins agressifs pour les fromages doux et à pâte pressée.' },
    { appellation:'Condrieu', region:'Rhône Nord', type:'white', cepages:'Viognier', note:'★★ Chèvre frais', reason:'La rondeur florale du Viognier s\'harmonise avec les fromages de chèvre frais.' },
  ],
  dessert: [
    { appellation:'Sauternes', region:'Bordeaux', type:'sweet', cepages:'Sémillon, Sauvignon', note:'★★★ L\'accord intemporel', reason:'Le Sauternes et ses notes d\'abricot confit, de miel et de vanille est l\'accompagnement suprême.' },
    { appellation:'Cabernet d\'Anjou', region:'Loire', type:'rosé', cepages:'Cabernet Franc, Cabernet Sauvignon', note:'★★ Desserts aux fruits', reason:'Sa tendre sucrosité et sa fraîcheur accompagnent les desserts aux fruits rouges sans les écraser.' },
    { appellation:'Banyuls Rimage', region:'Languedoc-Roussillon', type:'sweet', cepages:'Grenache Noir', note:'★★★ Chocolat noir', reason:'L\'accord ultime pour le chocolat noir : le Banyuls avec ses notes de cacao, de figue et de café.' },
  ],
  vegetarien: [
    { appellation:'Saint-Véran', region:'Bourgogne', type:'white', cepages:'Chardonnay', note:'★★ Risotto & pâtes', reason:'Un Chardonnay fruité et non boisé pour ne pas écraser les saveurs végétales.' },
    { appellation:'Chinon', region:'Loire', type:'red', cepages:'Cabernet Franc', note:'★★ Légumes grillés', reason:'Le Cabernet Franc léger et herbacé est idéal avec les plats végétariens typés.' },
    { appellation:'Anjou rosé', region:'Loire', type:'rosé', cepages:'Cabernet Franc', note:'★ Salades composées', reason:'Un rosé léger pour les salades fraîches et les plats végétariens estivaux.' },
  ],
  viande_blanche: [
    { appellation:'Puligny-Montrachet', region:'Bourgogne', type:'white', cepages:'Chardonnay', note:'★★★ Accord raffiné', reason:'La finesse beurrée du Puligny sublime la délicatesse des volailles en sauce.' },
    { appellation:'Saint-Émilion', region:'Bordeaux', type:'red', cepages:'Merlot', note:'★★ Accord souple', reason:'Le Merlot fondant et peu tannique épouse bien les saveurs douces de la viande blanche.' },
  ],
  charcuterie: [
    { appellation:'Côtes du Rhône Villages', region:'Rhône Sud', type:'red', cepages:'Grenache, Syrah', note:'★★ Accord gourmand', reason:'Un rouge souple aux arômes de fruits rouges pour accompagner la charcuterie.' },
    { appellation:'Beaujolais Cru', region:'Beaujolais', type:'red', cepages:'Gamay', note:'★★★ L\'accord traditionnel', reason:'Le Gamay fruité et juteux est le compagnon traditionnel de la charcuterie lyonnaise.' },
  ],
  champignons: [
    { appellation:'Nuits-Saint-Georges', region:'Bourgogne', type:'red', cepages:'Pinot Noir', note:'★★★ Accord terreux', reason:'Les notes sous-bois et champignon naturelles du Pinot Noir font écho aux arômes des champignons.' },
    { appellation:'Hermitage Blanc', region:'Rhône Nord', type:'white', cepages:'Marsanne, Roussanne', note:'★★ Accord onctueux', reason:'La rondeur et les notes de cire de l\'Hermitage blanc complètent les champignons en sauce.' },
  ],
  foie_gras: [
    { appellation:'Sauternes', region:'Bordeaux', type:'sweet', cepages:'Sémillon', note:'★★★ L\'accord royal', reason:'Le Sauternes et le foie gras : un mariage légendaire entre richesse, douceur et fraîcheur.' },
    { appellation:'Jurançon', region:'Sud-Ouest', type:'sweet', cepages:'Petit Manseng', note:'★★ Accord du Sud-Ouest', reason:'Son moelleux exotique tendu d\'acidité contrebalance la richesse du foie gras — l\'accord béarnais historique.' },
    { appellation:'Condrieu', region:'Rhône Nord', type:'white', cepages:'Viognier', note:'★ Accord aromatique', reason:'La rondeur exotique du Condrieu avec un foie gras poêlé aux fruits tropicaux.' },
  ],
}

const TYPE_COLORS = { red:'bg-wine-100 text-wine-800', white:'bg-amber-50 text-amber-800', rosé:'bg-pink-50 text-pink-700', sparkling:'bg-blue-50 text-blue-700', sweet:'bg-amber-100 text-amber-900' }
const TYPE_LABELS = { red:'Rouge', white:'Blanc', rosé:'Rosé', sparkling:'Effervescent', sweet:'Liquoreux' }

export default function AccordsView() {
  const [selected, setSelected] = useState(null)
  const [wineSelected, setWineSelected] = useState(null)
  const accords = selected ? (ACCORDS[selected] || []) : []

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-wine-800 flex items-center justify-center shadow-wine">
          <UtensilsCrossed size={18} className="text-gold-400" />
        </div>
        <div>
          <span className="eyebrow mb-1">L'art de la table</span>
          <h2 className="section-title">Accords Mets-Vins</h2>
          <p className="section-sub">Sélectionnez un plat pour découvrir les meilleurs accords</p>
        </div>
      </div>

      {/* Food grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        {PLATS.map(p => (
          <button
            key={p.id}
            onClick={() => setSelected(selected === p.id ? null : p.id)}
            className={`p-3.5 rounded-xl border-2 text-left transition-all duration-150 cursor-pointer ${
              selected === p.id
                ? 'bg-wine-800 border-wine-700 text-cream shadow-wine'
                : 'bg-white border-anthracite-200 hover:border-wine-200 hover:bg-wine-50/30'
            }`}
            aria-pressed={selected === p.id}
          >
            <Icone nom={p.id} size={22} className={`mb-2 ${selected === p.id ? 'text-gold-400' : 'text-wine-700'}`} />
            <div className={`text-xs font-semibold mb-0.5 ${selected === p.id ? 'text-cream' : 'text-anthracite-800'}`}>{p.label}</div>
            <div className={`text-[10px] leading-tight ${selected === p.id ? 'text-cream/60' : 'text-anthracite-400'}`}>{p.desc}</div>
          </button>
        ))}
      </div>

      {/* Accords list */}
      {!selected && (
        <div className="card p-10 text-center border-dashed">
          <UtensilsCrossed size={32} className="text-anthracite-200 mx-auto mb-3" />
          <p className="font-serif text-base text-anthracite-400">Sélectionnez un plat ci-dessus</p>
          <p className="text-xs text-anthracite-300 mt-1">pour voir les recommandations d'accords</p>
        </div>
      )}

      {selected && accords.length === 0 && (
        <div className="card p-10 text-center">
          <p className="text-anthracite-400 text-sm">Aucun accord disponible pour le moment.</p>
        </div>
      )}

      {selected && accords.length > 0 && (
        <div className="animate-fade-in">
          <h3 className="font-serif text-lg font-semibold text-anthracite-900 mb-4">
            Accords recommandés · {PLATS.find(p => p.id === selected)?.label}
          </h3>
          <div className="space-y-3">
            {accords.map((a, i) => {
              const matchedWine = findWine(a.appellation)
              return (
              <button
                type="button"
                key={i}
                onClick={() => matchedWine && setWineSelected(matchedWine)}
                disabled={!matchedWine}
                className={`card p-4 w-full text-left transition-all animate-slide-up ${matchedWine ? 'hover:border-gold-500/30 cursor-pointer' : 'cursor-default'}`}
                style={{ animationDelay: `${i * 60}ms` }}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-serif text-sm font-semibold text-anthracite-900">{a.appellation}</span>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${TYPE_COLORS[a.type]}`}>
                        {TYPE_LABELS[a.type]}
                      </span>
                      {matchedWine && (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-wine-50 text-wine-700 border border-wine-200">
                          Voir la fiche
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-anthracite-500 mb-1.5">{a.region} · {a.cepages}</div>
                    <p className="text-xs text-anthracite-600 leading-relaxed">{a.reason}</p>
                  </div>
                  <div className={`text-[10px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0 whitespace-nowrap ${
                    a.note.startsWith('★★★') ? 'bg-gold-500/15 text-gold-700' :
                    a.note.startsWith('★★')  ? 'bg-anthracite-100 text-anthracite-600' :
                    'bg-anthracite-50 text-anthracite-500'
                  }`}>
                    {a.note}
                  </div>
                </div>
              </button>
              )
            })}
          </div>
        </div>
      )}

      {wineSelected && (
        <FicheVin
          wine={wineSelected}
          onClose={() => setWineSelected(null)}
        />
      )}
    </div>
  )
}
