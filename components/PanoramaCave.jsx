import { useMemo, useEffect, useState } from 'react'
import { BarChart3, Wine, Hourglass, Coins, CalendarClock, Quote } from 'lucide-react'
import { WINE_DB, gardeForMillesime } from '../data/wineDatabase'

// ═══════════════════════════════════════════════════════════════════════════
// Panorama — tableau de bord statistique de la cave.
// SVG inline pur, palette luxe (or / bordeaux / crème), animations discrètes.
// ═══════════════════════════════════════════════════════════════════════════

const TYPE_META = {
  red:       { label: 'Rouges',       color: '#5c0d22' },
  white:     { label: 'Blancs',       color: '#c9a84c' },
  'rosé':    { label: 'Rosés',        color: '#d4a5a5' },
  sparkling: { label: 'Effervescents', color: '#8c8577' },
  sweet:     { label: 'Liquoreux',    color: '#a16207' },
}

const PRIX_GAMMES = [
  { label: 'Moins de 10 €', test: p => p < 10 },
  { label: '10 – 20 €',     test: p => p >= 10 && p < 20 },
  { label: '20 – 50 €',     test: p => p >= 20 && p < 50 },
  { label: '50 € et plus',  test: p => p >= 50 },
]

const CURRENT_YEAR = new Date().getFullYear()

function findDbWine(w) {
  if (!w.appellation) return null
  return WINE_DB.find(x => x.appellation === w.appellation) || null
}

function bottlePrice(w) {
  if (w.estimatedValue) return Number(w.estimatedValue)
  const db = findDbWine(w)
  return db ? db.prixMoyen : 0
}

// Fenêtre de garde : via gardeForMillesime si le vin est connu de la base,
// sinon retombe sur drinkFrom / drinkUntil du vin de cave.
function isReadyNow(w) {
  if (!w.vintage) return false
  const db = findDbWine(w)
  if (db) {
    const g = gardeForMillesime(db, w.vintage)
    if (g) return CURRENT_YEAR >= g.from && CURRENT_YEAR <= g.until
  }
  const from = w.vintage + (w.drinkFrom ?? 2)
  const to   = w.vintage + (w.drinkUntil ?? 8)
  return CURRENT_YEAR >= from && CURRENT_YEAR <= to
}

// ── Profil de buveur textuel ──────────────────────────────────────────────────
function buildProfil({ byType, byRegion, avgPrice, totalBottles, readyCount }) {
  if (!totalBottles) return ''
  const topType = byType[0]
  const topRegion = byRegion[0]
  const bits = []

  if (topType && topType.count / totalBottles >= 0.6) {
    const noms = { red: 'de rouges', white: 'de blancs', 'rosé': 'de rosés', sparkling: 'de bulles', sweet: 'de liquoreux' }
    bits.push(`Amateur ${noms[topType.type] || 'de vins'}`)
  } else {
    bits.push('Palais éclectique')
  }
  if (topRegion && topRegion.count / totalBottles >= 0.4) {
    bits.push(`fidèle à ${topRegion.region === 'Rhône Sud' || topRegion.region === 'Rhône Nord' ? 'la vallée du Rhône' : topRegion.region}`)
  } else if (byRegion.length >= 5) {
    bits.push('voyageur de terroirs')
  }
  if (avgPrice >= 50) bits.push('avec un net penchant pour les grandes bouteilles')
  else if (avgPrice >= 20) bits.push('qui sait se faire plaisir sans se ruiner')
  else if (avgPrice > 0) bits.push('prudent sur les prix — le flair avant l\'étiquette')
  if (readyCount / totalBottles >= 0.5) bits.push('Et bonne nouvelle : une belle partie de la cave est prête à boire.')
  else if (readyCount === 0 && totalBottles >= 3) bits.push('Une cave de patience : tout dort encore.')

  const [first, ...rest] = bits
  return rest.length ? `${first}, ${rest.join(', ')}` : first
}

// ── Barre SVG animée ──────────────────────────────────────────────────────────
function BarRow({ label, count, max, color, pct, delay = 0, mounted }) {
  const width = max > 0 ? (count / max) * 100 : 0
  return (
    <div className="flex items-center gap-3">
      <div className="w-28 sm:w-32 text-xs text-anthracite-600 truncate flex-shrink-0">{label}</div>
      <svg className="flex-1 h-5" preserveAspectRatio="none" viewBox="0 0 100 10" aria-hidden="true">
        <rect x="0" y="2" width="100" height="6" rx="3" fill="#efe9dd" />
        <rect
          x="0" y="2" height="6" rx="3" fill={color}
          width={mounted ? Math.max(width, count > 0 ? 3 : 0) : 0}
          style={{ transition: `width 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms` }}
        />
      </svg>
      <div className="w-16 text-right text-xs flex-shrink-0">
        <span className="font-semibold text-anthracite-900">{count}</span>
        <span className="text-anthracite-400"> · {pct}%</span>
      </div>
    </div>
  )
}

// ── Vue principale ────────────────────────────────────────────────────────────
export default function PanoramaCave({ wines }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(t)
  }, [])

  const stats = useMemo(() => {
    const totalBottles = wines.reduce((s, w) => s + (w.quantity || 0), 0)

    const typeCounts = {}
    const regionCounts = {}
    const gammeCounts = PRIX_GAMMES.map(() => 0)
    let totalValue = 0
    let readyCount = 0
    let ageSum = 0, ageBottles = 0
    let priceSum = 0, priceBottles = 0

    wines.forEach(w => {
      const q = w.quantity || 0
      if (!q) return
      typeCounts[w.type] = (typeCounts[w.type] || 0) + q
      if (w.region) regionCounts[w.region] = (regionCounts[w.region] || 0) + q
      const price = bottlePrice(w)
      totalValue += price * q
      if (price > 0) { priceSum += price * q; priceBottles += q }
      const gi = PRIX_GAMMES.findIndex(g => g.test(price))
      if (price > 0 && gi >= 0) gammeCounts[gi] += q
      if (isReadyNow(w)) readyCount += q
      if (w.vintage) { ageSum += (CURRENT_YEAR - w.vintage) * q; ageBottles += q }
    })

    const byType = Object.entries(typeCounts)
      .map(([type, count]) => ({ type, count, ...TYPE_META[type] }))
      .sort((a, b) => b.count - a.count)
    const byRegion = Object.entries(regionCounts)
      .map(([region, count]) => ({ region, count }))
      .sort((a, b) => b.count - a.count)
    const avgAge = ageBottles ? ageSum / ageBottles : 0
    const avgPrice = priceBottles ? priceSum / priceBottles : 0

    return {
      totalBottles, byType, byRegion, gammeCounts, totalValue, readyCount, avgAge, avgPrice,
      profil: buildProfil({ byType, byRegion, avgPrice, totalBottles, readyCount }),
    }
  }, [wines])

  // ── État vide ──
  if (stats.totalBottles === 0) {
    return (
      <div className="card p-12 text-center animate-fade-in">
        <BarChart3 size={36} className="text-anthracite-200 mx-auto mb-4" />
        <p className="font-serif text-base text-anthracite-400 mb-1">Rien à contempler pour l'instant</p>
        <p className="text-xs text-anthracite-300 max-w-sm mx-auto">
          Ajoutez quelques bouteilles à votre cave et ce panorama prendra vie : répartitions, valeur, apogées…
        </p>
      </div>
    )
  }

  const maxType = Math.max(...stats.byType.map(t => t.count), 1)
  const maxRegion = Math.max(...stats.byRegion.map(r => r.count), 1)
  const maxGamme = Math.max(...stats.gammeCounts, 1)
  const pct = n => Math.round((n / stats.totalBottles) * 100)

  return (
    <div className="animate-fade-in space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-wine-800 flex items-center justify-center shadow-wine">
          <BarChart3 size={18} className="text-gold-400" />
        </div>
        <div>
          <span className="eyebrow mb-1">Vue d'ensemble</span>
          <h2 className="section-title">Panorama de ma cave</h2>
          <p className="section-sub">{stats.totalBottles} bouteille{stats.totalBottles > 1 ? 's' : ''}, racontées en chiffres</p>
        </div>
      </div>

      {/* Chiffres clés */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { Icon: Coins,         label: 'Valeur estimée',   value: `${Math.round(stats.totalValue).toLocaleString('fr')} €`, sub: 'prix moyens du marché' },
          { Icon: Wine,          label: 'À boire cette année', value: stats.readyCount, sub: 'dans leur fenêtre idéale' },
          { Icon: Hourglass,     label: 'Âge moyen',        value: stats.avgAge ? `${stats.avgAge.toFixed(1).replace('.', ',')} ans` : '—', sub: 'depuis le millésime' },
          { Icon: CalendarClock, label: 'Prix moyen',       value: stats.avgPrice ? `${Math.round(stats.avgPrice)} €` : '—', sub: 'par bouteille' },
        ].map(({ Icon, label, value, sub }, i) => (
          <div key={label} className="card p-4 animate-fade-in-up" style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}>
            <Icon size={14} className="text-gold-600 mb-2" />
            <div className="text-xl sm:text-2xl font-semibold text-anthracite-900 font-serif">{value}</div>
            <div className="text-[10px] text-anthracite-500 uppercase tracking-wide mt-0.5">{label}</div>
            <div className="text-[10px] text-anthracite-400">{sub}</div>
          </div>
        ))}
      </div>

      {/* Profil de buveur */}
      {stats.profil && (
        <div className="rounded-2xl p-5 flex items-start gap-3 animate-fade-in-up"
             style={{ background: 'linear-gradient(135deg, #0C0A09 0%, #3a0616 60%, #5c0d22 100%)', animationDelay: '200ms', animationFillMode: 'both' }}>
          <Quote size={16} className="text-gold-400 flex-shrink-0 mt-1" />
          <div>
            <div className="eyebrow-dark mb-1.5">Votre profil de buveur</div>
            <p className="font-serif text-base sm:text-lg text-cream leading-relaxed italic">{stats.profil}</p>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Par couleur */}
        <div className="card p-5">
          <div className="text-[10px] uppercase tracking-wider font-bold text-anthracite-400 mb-4">Répartition par couleur</div>
          <div className="space-y-3">
            {stats.byType.map((t, i) => (
              <BarRow key={t.type} label={t.label || t.type} count={t.count} max={maxType}
                      color={t.color || '#8c8577'} pct={pct(t.count)} delay={i * 90} mounted={mounted} />
            ))}
          </div>
        </div>

        {/* Par gamme de prix */}
        <div className="card p-5">
          <div className="text-[10px] uppercase tracking-wider font-bold text-anthracite-400 mb-4">Par gamme de prix</div>
          <div className="space-y-3">
            {PRIX_GAMMES.map((g, i) => (
              <BarRow key={g.label} label={g.label} count={stats.gammeCounts[i]} max={maxGamme}
                      color="#c9a84c" pct={pct(stats.gammeCounts[i])} delay={i * 90} mounted={mounted} />
            ))}
          </div>
        </div>
      </div>

      {/* Par région */}
      <div className="card p-5">
        <div className="text-[10px] uppercase tracking-wider font-bold text-anthracite-400 mb-4">
          Par région — {stats.byRegion.length} terroir{stats.byRegion.length > 1 ? 's' : ''} représenté{stats.byRegion.length > 1 ? 's' : ''}
        </div>
        <div className="space-y-3">
          {stats.byRegion.map((r, i) => (
            <BarRow key={r.region} label={r.region} count={r.count} max={maxRegion}
                    color={i === 0 ? '#5c0d22' : i === 1 ? '#8c2f39' : '#b08d57'} pct={pct(r.count)} delay={i * 70} mounted={mounted} />
          ))}
        </div>
      </div>
    </div>
  )
}
