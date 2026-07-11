import { useCallback, useEffect, useState } from 'react'
import { Newspaper, RefreshCw, ExternalLink, CloudOff, Grape, Sparkles, CalendarDays, TrendingUp } from 'lucide-react'

// ═══════════════════════════════════════════════════════════════════════════
// Actualité vivante — 4 à 6 actualités fraîches du monde du vin, obtenues
// via /api/claude avec recherche web, mises en cache 24 h (localStorage).
// ═══════════════════════════════════════════════════════════════════════════

const CACHE_KEY = 'oeno-actu'
const CACHE_TTL = 24 * 60 * 60 * 1000 // 24 h

const CATEGORIES = {
  vendanges:  { label: 'Vendanges',  Icon: Grape,        cls: 'bg-wine-50 text-wine-700 border-wine-200' },
  millesimes: { label: 'Millésimes', Icon: Sparkles,     cls: 'bg-gold-500/10 text-gold-700 border-gold-500/30' },
  salons:     { label: 'Salons & foires', Icon: CalendarDays, cls: 'bg-anthracite-50 text-anthracite-700 border-anthracite-200' },
  tendances:  { label: 'Tendances',  Icon: TrendingUp,   cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
}

const PROMPT = `Tu es le rédacteur de la rubrique actualité d'Œno, une application française dédiée au vin.
Recherche sur le web les actualités les plus récentes et vérifiables du monde du vin, puis rends UNIQUEMENT un tableau JSON (aucun texte autour) de 4 à 6 éléments au format strict :
[{"titre": "...", "resume": "... (2-3 phrases, ton chaleureux et précis, en français)", "categorie": "vendanges|millesimes|salons|tendances", "source": "nom du média (optionnel)"}]

Sujets attendus : vendanges et météo du vignoble, sorties et primeurs de millésimes, salons et foires aux vins en France, tendances de consommation ou nouveautés du secteur.
Règles impératives : réponses en français ; ne mentionne JAMAIS de supermarché, de grande distribution ou d'enseigne commerciale de distribution ; ne recommande aucun lieu d'achat ; privilégie les faits datés et récents.`

// Extraction robuste du JSON : la réponse peut contenir du texte autour.
function parseItems(raw) {
  if (!raw) return null
  const start = raw.indexOf('[')
  const end = raw.lastIndexOf(']')
  if (start === -1 || end === -1 || end <= start) return null
  try {
    const arr = JSON.parse(raw.slice(start, end + 1))
    if (!Array.isArray(arr)) return null
    const items = arr
      .filter(it => it && typeof it.titre === 'string' && typeof it.resume === 'string')
      .map(it => ({
        titre: it.titre.trim(),
        resume: it.resume.trim(),
        categorie: CATEGORIES[it.categorie] ? it.categorie : 'tendances',
        source: typeof it.source === 'string' ? it.source.trim() : null,
      }))
      .slice(0, 6)
    return items.length ? items : null
  } catch {
    return null
  }
}

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    if (!data?.timestamp || !Array.isArray(data.items) || !data.items.length) return null
    return data
  } catch {
    return null
  }
}

export default function ActualiteVin() {
  const [items, setItems] = useState(null)
  const [fetchedAt, setFetchedAt] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const load = useCallback(async (force = false) => {
    if (!force) {
      const cached = readCache()
      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        setItems(cached.items)
        setFetchedAt(cached.timestamp)
        return
      }
    }
    setLoading(true)
    setError(false)
    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-5',
          max_tokens: 2000,
          messages: [{ role: 'user', content: PROMPT }],
          tools: [{ type: 'web_search_20250305', name: 'web_search', max_uses: 4 }],
        }),
      })
      const data = await res.json()
      const raw = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('\n')
      const parsed = parseItems(raw)
      if (!res.ok || !parsed) throw new Error('empty')
      const now = Date.now()
      setItems(parsed)
      setFetchedAt(now)
      try { localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: now, items: parsed })) } catch {}
    } catch {
      // Fallback : cache périmé mieux que rien, sinon message élégant.
      const cached = readCache()
      if (cached) {
        setItems(cached.items)
        setFetchedAt(cached.timestamp)
      } else {
        setError(true)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load(false) }, [load])

  const dateLabel = fetchedAt
    ? new Date(fetchedAt).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
    : null

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-wine-800 flex items-center justify-center shadow-wine">
            <Newspaper size={18} className="text-gold-400" />
          </div>
          <div>
            <span className="eyebrow mb-1">La gazette</span>
            <h2 className="section-title">Actualité du vin</h2>
            <p className="section-sub">
              {dateLabel ? `Fraîcheur du ${dateLabel}` : 'Vendanges, millésimes, salons et tendances — en direct'}
            </p>
          </div>
        </div>
        <button
          onClick={() => load(true)}
          disabled={loading}
          className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-white text-anthracite-600 border border-anthracite-200 hover:border-wine-300 hover:text-wine-700 transition-all cursor-pointer disabled:opacity-50 min-h-[44px]"
          aria-label="Actualiser les actualités"
        >
          <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
          <span className="hidden sm:inline">Actualiser</span>
        </button>
      </div>

      {/* Chargement */}
      {loading && !items && (
        <div className="grid sm:grid-cols-2 gap-4" aria-busy="true" aria-label="Chargement des actualités">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="card p-5">
              <div className="h-4 w-24 rounded-full bg-anthracite-100 animate-pulse mb-3" />
              <div className="h-5 w-3/4 rounded bg-anthracite-100 animate-pulse mb-2.5" />
              <div className="h-3 w-full rounded bg-anthracite-100 animate-pulse mb-1.5" />
              <div className="h-3 w-5/6 rounded bg-anthracite-100 animate-pulse" />
            </div>
          ))}
        </div>
      )}

      {/* Erreur / API indisponible */}
      {error && !loading && (
        <div className="card p-8 text-center max-w-md mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-anthracite-50 flex items-center justify-center mx-auto mb-4">
            <CloudOff size={20} className="text-anthracite-400" />
          </div>
          <h3 className="font-serif text-base font-bold text-anthracite-900 mb-2">La gazette est en retard</h3>
          <p className="text-sm text-anthracite-500 leading-relaxed mb-5">
            Impossible de récupérer les actualités du vin pour le moment. Vérifiez votre connexion ou réessayez dans un instant.
          </p>
          <button onClick={() => load(true)} className="btn-gold text-xs cursor-pointer">
            <RefreshCw size={13} /> Réessayer
          </button>
        </div>
      )}

      {/* Cartes d'actualités */}
      {items && (
        <div className="grid sm:grid-cols-2 gap-4">
          {items.map((it, i) => {
            const cat = CATEGORIES[it.categorie] || CATEGORIES.tendances
            return (
              <article
                key={i}
                className="card p-5 flex flex-col animate-fade-in-up"
                style={{ animationDelay: `${i * 70}ms`, animationFillMode: 'both' }}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold border ${cat.cls}`}>
                    <cat.Icon size={10} />
                    {cat.label}
                  </span>
                  {dateLabel && (
                    <span className="text-[10px] text-anthracite-400">{dateLabel}</span>
                  )}
                </div>
                <h3 className="font-serif text-base font-bold text-anthracite-900 leading-snug mb-2">{it.titre}</h3>
                <p className="text-sm text-anthracite-600 leading-relaxed flex-1">{it.resume}</p>
                {it.source && (
                  <div className="mt-3 pt-3 border-t border-anthracite-100 flex items-center gap-1.5 text-[11px] text-anthracite-400">
                    <ExternalLink size={10} />
                    Source : {it.source}
                  </div>
                )}
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
