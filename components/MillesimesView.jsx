import { useState, useMemo } from 'react'
import { BookOpen, ChevronDown } from 'lucide-react'

// Subset of the oenological database in a clean format
const OENO_DB = [
  // [year, type, region, appellation, cepages, ageing, quality, rec, note]
  [2022,'Rouge','Bordeaux','Médoc Cru Classé','Cabernet Sauvignon',28,'Excellent, très mûr','Privilégier',null],
  [2022,'Rouge','Bordeaux','Saint-Émilion','Merlot',16,'Bon, volumes faibles','Bon choix',null],
  [2022,'Liquoreux','Bordeaux','Sauternes','Sémillon',38,'Excellent, botrytis idéal','Privilégier',null],
  [2019,'Rouge','Bourgogne','Gevrey-Chambertin','Pinot Noir',20,'Excellent, équilibré','Privilégier',null],
  [2019,'Blanc','Bourgogne','Puligny-Montrachet','Chardonnay',18,'Excellent','Privilégier',null],
  [2022,'Rouge','Bourgogne','Nuits-Saint-Georges 1er Cru','Pinot Noir',18,'Excellent, abondant','Privilégier',null],
  [2018,'Rouge','Bourgogne','Grand Cru','Pinot Noir',25,'Excellent, exceptionnel','Privilégier','Très haut de gamme'],
  [2019,'Effervescent','Champagne','Champagne Brut Millésimé','Pinot Noir, Chardonnay',18,'Vintage exceptionnel','Privilégier','Un des meilleurs récents'],
  [2022,'Effervescent','Champagne','Champagne Brut Millésimé','Chardonnay, Pinot Noir',16,'Excellent, récolte qualitative','Privilégier',null],
  [2022,'Rouge','Rhône Nord','Crozes-Hermitage','Syrah',11,'Excellent, mûr','Privilégier',null],
  [2018,'Rouge','Rhône Nord','Hermitage','Syrah',22,'Excellent, puissant','Privilégier',null],
  [2022,'Rouge','Rhône Sud','Châteauneuf-du-Pape','Grenache, Syrah, Mourvèdre',18,'Excellent, très mûr','Privilégier',null],
  [2019,'Rouge','Rhône Sud','Gigondas','Grenache, Syrah',12,'Excellent','Privilégier',null],
  [2018,'Blanc','Alsace','Riesling Grand Cru','Riesling',15,'Excellent, riche','Privilégier',null],
  [2020,'Blanc','Loire','Vouvray sec','Chenin Blanc',10,'Bon, sec et tendu','Bon choix',null],
  [2018,'Blanc','Bourgogne','Meursault','Chardonnay',15,'Excellent, riche','Privilégier',null],
  [2017,'Blanc','Bourgogne','Chablis 1er Cru','Chardonnay',9,'Bon, tendu','Bon choix','À boire maintenant'],
  [2018,'Rouge','Bordeaux','Médoc Cru Classé','Cabernet Sauvignon dominant',28,'Excellent, mûr et concentré','Privilégier','Un des meilleurs de la décennie'],
  [2022,'Rosé','Provence','Côtes de Provence','Grenache, Cinsault',3,'Excellent','À éviter','Fenêtre dépassée'],
  [2024,'Rosé','Provence','Côtes de Provence','Grenache, Cinsault',2,'Bon','Privilégier','À boire maintenant'],
  [2017,'Blanc','Jura','Vin Jaune','Savagnin',40,'Style oxydatif','Privilégier','Garde quasi illimitée'],
  [2018,'Rouge','Languedoc','Saint-Chinian','Syrah, Grenache',8,'Excellent','Privilégier','À boire maintenant'],
  [2022,'Rouge','Languedoc','Faugères','Syrah, Mourvèdre',9,'Excellent, mûr','Privilégier',null],
  [2019,'Rouge','Beaujolais','Morgon','Gamay',9,'Excellent','Privilégier',null],
  [2022,'Rouge','Beaujolais','Moulin-à-Vent','Gamay',10,'Excellent, mûr','Privilégier',null],
  [2018,'Rouge','Sud-Ouest','Cahors','Malbec',13,'Excellent, mûr','Privilégier',null],
  [2019,'Rouge','Sud-Ouest','Madiran','Tannat',15,'Excellent, structuré','Privilégier',null],
]

const REGIONS = ['Toutes','Bordeaux','Bourgogne','Champagne','Rhône Nord','Rhône Sud','Alsace','Loire','Provence','Languedoc','Beaujolais','Jura','Sud-Ouest']
const TYPES   = ['Tous','Rouge','Blanc','Rosé','Effervescent','Liquoreux']

const REC_COLORS = {
  'Privilégier':       { bg:'bg-emerald-100', text:'text-emerald-800' },
  'Bon choix':         { bg:'bg-blue-50',     text:'text-blue-700' },
  'Sélection prudente':{ bg:'bg-amber-100',   text:'text-amber-800' },
  'À éviter':          { bg:'bg-red-50',       text:'text-red-600' },
}

export default function MillesimesView() {
  const [region, setRegion] = useState('Toutes')
  const [type, setType]     = useState('Tous')
  const [year, setYear]     = useState('')

  const years = useMemo(() => [...new Set(OENO_DB.map(r => r[0]))].sort((a,b) => b-a), [])

  const filtered = useMemo(() => OENO_DB.filter(r => {
    const matchR = region === 'Toutes' || r[2] === region
    const matchT = type   === 'Tous'   || r[1] === type
    const matchY = !year               || r[0] === Number(year)
    return matchR && matchT && matchY
  }).sort((a,b) => b[0] - a[0]), [region, type, year])

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-wine-800 flex items-center justify-center shadow-wine">
          <BookOpen size={18} className="text-gold-400" />
        </div>
        <div>
          <h2 className="section-title">Guide des Millésimes</h2>
          <p className="section-sub">Base œnologique — qualités et fenêtres de dégustation</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4 mb-5 flex flex-wrap gap-3">
        {[
          { label:'Région', value:region, onChange:setRegion, options:REGIONS },
          { label:'Type',   value:type,   onChange:setType,   options:TYPES },
          { label:'Millésime', value:year, onChange:setYear,  options:['Tous', ...years.map(String)] },
        ].map(({ label, value, onChange, options }) => (
          <div key={label} className="relative">
            <label className="sr-only">{label}</label>
            <select
              value={value}
              onChange={e => onChange(e.target.value)}
              className="pl-3 pr-8 py-2 bg-white border border-anthracite-200 rounded-lg text-xs text-anthracite-700 focus:outline-none focus:ring-2 focus:ring-gold-500/40 cursor-pointer appearance-none"
            >
              {options.map(o => <option key={o}>{o}</option>)}
            </select>
            <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-anthracite-400 pointer-events-none" />
          </div>
        ))}
        <div className="ml-auto text-xs text-anthracite-400 self-center">{filtered.length} entrée{filtered.length > 1 ? 's' : ''}</div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(REC_COLORS).map(([label, { bg, text }]) => (
          <span key={label} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold ${bg} ${text}`}>
            {label}
          </span>
        ))}
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" role="table">
            <thead>
              <tr className="border-b border-anthracite-100">
                {['Millésime','Type','Région','Appellation','Cépages','Garde max','Qualité','Avis'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-anthracite-400 whitespace-nowrap first:pl-5 last:pr-5">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-anthracite-50">
              {filtered.map((r, i) => {
                const rec = r[7]
                const cfg = REC_COLORS[rec] || { bg:'bg-anthracite-50', text:'text-anthracite-500' }
                return (
                  <tr key={i} className="hover:bg-anthracite-50/50 transition-colors group">
                    <td className="px-4 py-3 pl-5 font-semibold text-anthracite-900 font-serif">{r[0]}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        r[1]==='Rouge'?'bg-wine-100 text-wine-800':
                        r[1]==='Blanc'?'bg-amber-50 text-amber-800':
                        r[1]==='Rosé'?'bg-pink-50 text-pink-700':
                        r[1]==='Effervescent'?'bg-blue-50 text-blue-700':
                        'bg-amber-100 text-amber-900'
                      }`}>{r[1]}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-anthracite-600 whitespace-nowrap">{r[2]}</td>
                    <td className="px-4 py-3 text-xs text-anthracite-800 font-medium">{r[3]}</td>
                    <td className="px-4 py-3 text-xs text-anthracite-500">{r[4]}</td>
                    <td className="px-4 py-3 text-xs text-anthracite-600 text-center">{r[5]}a</td>
                    <td className="px-4 py-3 text-xs text-anthracite-600 max-w-[200px]">
                      <span className="line-clamp-2">{r[6]}</span>
                    </td>
                    <td className="px-4 py-3 pr-5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap ${cfg.bg} ${cfg.text}`}>
                        {rec}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-anthracite-400 text-sm">Aucun résultat pour ces critères.</div>
          )}
        </div>
      </div>
    </div>
  )
}
