import { useState, useRef, useEffect, useCallback } from 'react'
import { X, Send, Sparkles, RefreshCw, Wine } from 'lucide-react'
import { WINE_DB, MILLESIMES_DB, DIFFICULTE_CONFIG } from '../data/wineDatabase'
import { profilApprisPourAssistant } from '../data/goutsAppris'
import JaugesGout from './JaugesGout'
import useModalBehavior from '../lib/useModal'
import { askIA } from '../lib/askIA'
import { FicheVin } from './BibliothequeView'

// ═══════════════════════════════════════════════════════════════════════════
// Assistant conversationnel « Œno » — profilage, menu, chat IA + fallback
// ═══════════════════════════════════════════════════════════════════════════

const PROFIL_KEY = 'oeno-profil'

const PROFILING = {
  debutant: [
    {
      id: 'sucre',
      q: 'Vous aimez quand c\'est plutôt…',
      options: [
        { emoji: '🍯', label: 'Doux, comme un jus de fruit' },
        { emoji: '🍋', label: 'Sec et frais' },
        { emoji: '🤷', label: 'Aucune idée, je découvre !' },
      ],
    },
    {
      id: 'fruits',
      q: 'Quels fruits vous font envie ?',
      options: [
        { emoji: '🍓', label: 'Fruits rouges (fraise, cerise)' },
        { emoji: '🍑', label: 'Fruits jaunes (pêche, abricot)' },
        { emoji: '🍋', label: 'Agrumes (citron, pamplemousse)' },
        { emoji: '🫐', label: 'Fruits noirs (mûre, cassis)' },
      ],
    },
    {
      id: 'intensite',
      q: 'En bouche, vous préférez…',
      options: [
        { emoji: '🪶', label: 'Léger et facile à boire' },
        { emoji: '⚖️', label: 'Équilibré' },
        { emoji: '💪', label: 'Costaud, qui a du corps' },
      ],
    },
  ],
  expert: [
    {
      id: 'bouche',
      q: 'Qu\'aimez-vous en bouche ?',
      options: [
        { emoji: '🔥', label: 'Puissant et corsé' },
        { emoji: '🩰', label: 'Léger et élégant' },
        { emoji: '🌵', label: 'Tannique, avec de la mâche' },
        { emoji: '💎', label: 'Minéral et tendu' },
      ],
    },
    {
      id: 'frequence',
      q: 'Votre fréquence de dégustation ?',
      options: [
        { emoji: '🍷', label: 'Occasionnelle (fêtes, dîners)' },
        { emoji: '📅', label: 'Hebdomadaire' },
        { emoji: '🍇', label: 'Passionné, plusieurs fois par semaine' },
      ],
    },
    {
      id: 'regions',
      q: 'Vos régions de prédilection ?',
      options: [
        { emoji: '🍷', label: 'Bordeaux & Sud-Ouest' },
        { emoji: '🍒', label: 'Bourgogne & Beaujolais' },
        { emoji: '☀️', label: 'Rhône & Sud' },
        { emoji: '🏰', label: 'Loire' },
        { emoji: '🥨', label: 'Grand Est (Alsace, Champagne, Jura)' },
        { emoji: '🌍', label: 'Éclectique, tout m\'intéresse' },
      ],
    },
  ],
}

const MENU = [
  { id: 'decouverte', emoji: '🍇', label: 'Découverte',
    prompt: 'Propose-moi des vins à découvrir adaptés à mon profil, avec pour chacun : pourquoi il me plaira, le prix moyen, et un domaine recommandé.' },
  { id: 'actualite', emoji: '📰', label: 'Actualité du Vin',
    prompt: 'Donne-moi l\'actualité récente du vin : derniers grands concours et leurs médaillés, sorties de millésimes marquantes, estimation des dates de vendanges à venir, et événements/salons à ne pas manquer. Utilise la recherche web pour des infos fraîches.' },
  { id: 'calendrier', emoji: '🗓️', label: 'Calendrier des Saisons',
    prompt: 'Explique-moi le cycle de la vigne et où on en est en ce moment. Précise comment la période de récolte varie selon les cépages (précoces vs tardifs) et l\'influence du millésime.' },
  { id: 'moment', emoji: '☀️', label: 'Vins du Moment',
    prompt: 'Quels vins boire en ce moment ? Donne-moi : les millésimes qui entrent dans leur fenêtre de maturité idéale maintenant, des vins adaptés à la saison et à la météo actuelle, et des idées d\'accords avec des plats de saison.' },
]

function buildSystemPrompt(profil) {
  const appris = profilApprisPourAssistant()
  // PROMPT VOLONTAIREMENT DENSE : le budget gratuit Groq est de 6-12k
  // tokens PAR MINUTE et par modèle, réponse comprise. Pour garantir
  // plusieurs questions par minute, la requête entière doit rester sous
  // ~4k tokens. D'où : liste de vins ultra-compacte (le modèle connaît
  // déjà ces appellations, la base sert à contraindre le choix et donner
  // les prix), millésimes résumés en années à privilégier par région,
  // pas de lexique embarqué (les fiches de l'app s'en chargent).
  const vins = WINE_DB.map(w =>
    [w.appellation, w.region, w.typeLabel, `${w.prixMoyen}€`, w.difficulte].join('|')
  ).join('\n')
  const topMillesimes = {}
  for (const m of MILLESIMES_DB) {
    if (m[0] >= 2019 && m[7] === 'Privilégier') {
      (topMillesimes[m[2]] = topMillesimes[m[2]] || new Set()).add(m[0])
    }
  }
  const millesimes = Object.entries(topMillesimes)
    .map(([r, ys]) => `${r}: ${[...ys].sort().join(', ')}`).join('\n')
  const today = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

  return `Tu es « Œno », assistant œnologique de l'application Œno. L'œnologie est une affaire de plaisir, pas d'experts : tu parles comme un ami caviste — chaleureux, précis, jamais snob — et tu expliques chaque terme technique simplement, entre parenthèses, à la première utilisation.

Nous sommes le ${today}. Adapte tes recommandations à la saison.

# Profil de l'utilisateur
${profil ? JSON.stringify(profil) : 'Non renseigné — adapte-toi à ses réponses.'}
${profil?.niveau === 'debutant'
  ? 'DÉBUTANT : langage ultra simple, zéro jargon non expliqué, privilégie les vins "facile", rassure-le.'
  : profil?.niveau
    ? 'AMATEUR/CONNAISSEUR : sois plus technique et précis, propose aussi des vins "explorer" et "pointu".'
    : ''}
${appris ? `Goûts appris de ses ${appris.degustationsNotees} dégustations notées dans l'app (source la plus fiable) : ${JSON.stringify(appris)}` : ''}

# Vins de l'application (recommande d'abord dans cette liste — appellation|région|type|prix moyen|difficulté)
${vins}

# Années à privilégier par région (millésimes récents)
${millesimes}

# Règles impératives
1. JAMAIS de supermarchés/grandes surfaces. Pour l'achat : cavistes indépendants ou domaines — et invite à ouvrir la fiche du vin dans l'onglet Vins de l'app, qui liste les domaines recommandés avec leur site.
2. Réponses COURTES et scannables : listes à puces, 2-4 recommandations max. Chaque vin : nom + région + prix + une phrase sur pourquoi il plaira.
3. Pour l'actualité (concours, vendanges, salons) : appuie-toi sur les résultats de recherche web fournis, cite tes sources, n'invente jamais de médailles ou dates.
4. Dès que le prix/budget entre en jeu (ou pour un débutant), mets en avant la fourchette 3-10 € : la liste ci-dessus contient d'excellents vins accessibles (Picpoul, Muscadet, Côtes du Rhône, Corbières, Gaillac…) — le plaisir ne dépend pas du prix.
5. Réponds en français, markdown léger (##, **, puces).`
}

function renderMarkdown(text) {
  const lines = text.split('\n')
  const out = []
  let list = null
  const flush = () => { if (list) { out.push(<ul key={`ul-${out.length}`} className="space-y-1 my-2 pl-1">{list}</ul>); list = null } }

  const inline = (s, k) => {
    const parts = s.split(/(\*\*[^*]+\*\*)/g)
    return parts.map((p, i) =>
      p.startsWith('**') && p.endsWith('**')
        ? <strong key={`${k}-${i}`} className="font-semibold text-anthracite-900">{p.slice(2, -2)}</strong>
        : p
    )
  }

  lines.forEach((line, i) => {
    const t = line.trim()
    if (/^#{1,4}\s/.test(t)) {
      flush()
      out.push(<h4 key={i} className="font-serif text-sm font-bold text-wine-800 mt-3 mb-1">{t.replace(/^#+\s*/, '')}</h4>)
    } else if (t.startsWith('- ') || t.startsWith('* ') || /^\d+\.\s/.test(t)) {
      const content = t.replace(/^(-|\*|\d+\.)\s+/, '')
      list = list || []
      list.push(
        <li key={i} className="flex items-start gap-2 text-[13px] leading-relaxed">
          <span className="w-1 h-1 rounded-full bg-gold-500 mt-2 flex-shrink-0" />
          <span>{inline(content, i)}</span>
        </li>
      )
    } else if (t === '') {
      flush()
    } else {
      flush()
      out.push(<p key={i} className="text-[13px] leading-relaxed my-1.5">{inline(t, i)}</p>)
    }
  })
  flush()
  return out
}

function findMentionedWines(text) {
  const lower = text.toLowerCase()
  return WINE_DB.filter(w => lower.includes(w.appellation.toLowerCase())).slice(0, 3)
}

function InlineWineCard({ wine, onSelect }) {
  const diff = DIFFICULTE_CONFIG[wine.difficulte]
  return (
    <div
      onClick={() => onSelect?.(wine)}
      role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onSelect?.(wine)}
      className="card p-3 mt-2 flex items-start gap-3 cursor-pointer hover:border-gold-500/30 hover:-translate-y-0.5 transition-all">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
           style={{ background: `${wine.color}18` }}>
        {wine.emoji}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <div className="font-serif text-[13px] font-bold text-anthracite-900 truncate">{wine.appellation}</div>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                style={{ background: diff.bg, color: diff.color }}>
            {diff.emoji} ~{wine.prixMoyen}€
          </span>
        </div>
        <p className="text-[11px] text-anthracite-400 italic mb-1.5">« {wine.enUneMot} »</p>
        <JaugesGout jauges={wine.jauges} compact animate={false} />
      </div>
    </div>
  )
}

function fallbackFor(menuId, profil) {
  const now = new Date()
  const mois = now.toLocaleDateString('fr-FR', { month: 'long' })
  const ete = now.getMonth() >= 4 && now.getMonth() <= 8

  if (menuId === 'moment') {
    const enFenetre = MILLESIMES_DB
      .filter(m => m[7] === 'Privilégier' && now.getFullYear() - m[0] >= 3 && now.getFullYear() - m[0] <= m[5])
      .slice(0, 4)
    const saisonniers = WINE_DB.filter(w => (ete ? ['white', 'rosé'].includes(w.type) : w.type === 'red'))
      .filter(w => w.difficulte === 'facile').slice(0, 3)
    return `## Vins du moment (${mois})\n` +
      saisonniers.map(w => `- **${w.appellation}** (${w.region}, ~${w.prixMoyen}€) — ${w.enUneMot}`).join('\n') +
      `\n\n## Millésimes en fenêtre idéale\n` +
      enFenetre.map(m => `- **${m[3]} ${m[0]}** (${m[2]}) — ${m[6]}`).join('\n')
  }
  if (menuId === 'calendrier') {
    return `## Le cycle de la vigne\n- **Hiver** : la vigne dort, on taille.\n- **Printemps** : débourrement (les bourgeons s'ouvrent), puis floraison en juin.\n- **Été** : véraison (les raisins changent de couleur).\n- **Fin août à octobre** : les vendanges. Les cépages **précoces** (Chardonnay, Merlot) se récoltent en premier, les **tardifs** (Cabernet Sauvignon, Mourvèdre) jusqu'à octobre.\n\nUne année chaude avance les vendanges de 2-3 semaines ; une année fraîche les retarde.`
  }
  if (menuId === 'decouverte') {
    const niveau = profil?.niveau === 'debutant' ? 'facile' : 'explorer'
    const picks = WINE_DB.filter(w => w.difficulte === niveau).slice(0, 4)
    return `## Mes suggestions pour vous\n` +
      picks.map(w => `- **${w.appellation}** (${w.region}, ~${w.prixMoyen}€) — ${w.pourQui}. À chercher chez : ${w.domaines[0]?.name || 'votre caviste'}.`).join('\n')
  }
  return `Je n'arrive pas à joindre mon cerveau distant pour le moment 😅. En attendant, explorez l'onglet **Vins** (plus de 100 appellations décodées) ou le **Guide** (millésimes, accords, lexique) — tout y est disponible hors-ligne !`
}

export default function AssistantView({ onClose }) {
  useModalBehavior(onClose)
  const [profil, setProfil]               = useState(null)
  const [profilStep, setProfilStep]       = useState(-1)
  const [profilAnswers, setProfilAnswers] = useState({})
  const [messages, setMessages]           = useState([])
  const [input, setInput]                 = useState('')
  const [loading, setLoading]             = useState(false)
  const [wineSelected, setWineSelected]   = useState(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(PROFIL_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        setProfil(p)
        setProfilStep(999)
        setMessages([{
          role: 'assistant',
          content: `Re-bonjour ! 🍷 Ravi de vous revoir. Que puis-je faire pour vous aujourd'hui ? Choisissez un raccourci ci-dessous ou posez-moi n'importe quelle question sur le vin.`,
        }])
      }
    } catch {}
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading, profilStep])

  const questions = profil?.niveau ? PROFILING[profil.niveau === 'debutant' ? 'debutant' : 'expert'] : []

  const pickNiveau = (niveau) => {
    setProfil({ niveau })
    setProfilStep(0)
  }

  const answerProfiling = (qid, label) => {
    const next = { ...profilAnswers, [qid]: label }
    setProfilAnswers(next)
    if (profilStep < questions.length - 1) {
      setProfilStep(s => s + 1)
    } else {
      const complete = { ...profil, gouts: next }
      setProfil(complete)
      setProfilStep(999)
      try { localStorage.setItem(PROFIL_KEY, JSON.stringify(complete)) } catch {}
      setMessages([{
        role: 'assistant',
        content: complete.niveau === 'debutant'
          ? `Parfait, j'ai tout ce qu'il me faut ! 🌱 Je vous parlerai simplement, sans jargon — et quand un mot technique se glisse, je l'explique aussitôt. Par où on commence ? Les raccourcis ci-dessous sont un bon début.`
          : `Excellent, profil enregistré ! 🎓 Je peux maintenant cibler précisément mes recommandations. Millésimes en fenêtre, pépites méconnues, actualité des concours… demandez-moi ce que vous voulez.`,
      }])
    }
  }

  const resetProfil = () => {
    try { localStorage.removeItem(PROFIL_KEY) } catch {}
    setProfil(null)
    setProfilAnswers({})
    setProfilStep(-1)
    setMessages([])
  }

  const sendMessage = useCallback(async (text, menuId = null) => {
    if (!text.trim() || loading) return
    const userMsg = { role: 'user', content: text.trim() }
    const history = [...messages, userMsg]
    setMessages(history)
    setInput('')
    setLoading(true)

    try {
      const body = {
        model: 'claude-sonnet-5',
        // 900 suffit largement pour des réponses courtes (règle n°2) et
        // réduit le coût par requête sur le budget/minute Groq.
        max_tokens: 900,
        system: buildSystemPrompt(profil),
        messages: history.slice(-8).map(m => ({ role: m.role, content: m.content })),
      }
      if (menuId === 'actualite' || /actualité|concours|vendange|salon|médaill/i.test(text)) {
        body.tools = [{ type: 'web_search_20250305', name: 'web_search', max_uses: 3 }]
      }

      const { ok, data } = await askIA(body)

      const textBlocks = (data.content || []).filter(b => b.type === 'text').map(b => b.text)
      const answer = textBlocks.join('\n\n')

      if (!ok || !answer) {
        // Quota temporairement dépassé ≠ service hors-ligne : on le dit
        // honnêtement plutôt que d'afficher le contenu de secours local.
        const err = new Error(data?.error?.message || data?.error || 'empty')
        err.rateLimited = data?.error === 'rate_limited' || /quota|429/i.test(String(data?.error || ''))
        throw err
      }

      setMessages(prev => [...prev, { role: 'assistant', content: answer }])
    } catch (e) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: e?.rateLimited
          ? `Vous êtes en pleine forme, et moi j'ai besoin de reprendre mon souffle une petite minute ! 😅 Le temps de reposer mes idées, reposez-moi votre question dans quelques instants — en attendant, l'onglet **Vins** et le **Guide** sont là.`
          : fallbackFor(menuId, profil),
        fallback: true,
      }])
    } finally {
      setLoading(false)
    }
  }, [messages, loading, profil])

  const currentQ = profilStep >= 0 && profilStep < questions.length ? questions[profilStep] : null

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(12,10,9,0.55)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
      role="dialog" aria-modal="true" aria-label="Assistant Œno"
    >
      <div
        className="modal-panel sm:max-w-2xl h-[92vh] sm:h-[85vh] shadow-card-hover"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 flex items-center justify-between flex-shrink-0 text-cream"
             style={{ background: 'linear-gradient(135deg, #0C0A09 0%, #3a0616 60%, #5c0d22 100%)' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-white/15 flex items-center justify-center">
              <Sparkles size={16} className="text-gold-400" />
            </div>
            <div>
              <div className="font-serif text-base font-bold leading-tight">Œno, votre assistant</div>
              <div className="text-[10px] text-cream/60 uppercase tracking-widest">
                {profil?.niveau === 'debutant' ? 'Mode débutant — zéro jargon' : profil?.niveau ? 'Mode connaisseur' : 'Faisons connaissance'}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {profil && (
              <button onClick={resetProfil} title="Refaire mon profil"
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/25 transition-all cursor-pointer">
                <RefreshCw size={13} />
              </button>
            )}
            <button onClick={onClose} aria-label="Fermer"
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/25 transition-all cursor-pointer">
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Corps */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4">

          {profilStep === -1 && (
            <div className="animate-fade-in-up">
              <div className="text-center mb-6 mt-4">
                <div className="text-4xl mb-3">👋</div>
                <h3 className="font-serif text-xl font-bold text-anthracite-900">Bienvenue sur Œno !</h3>
                <p className="text-sm text-anthracite-500 mt-2 max-w-sm mx-auto">
                  Pour bien vous conseiller, dites-moi d'abord : le vin et vous, c'est… ?
                </p>
              </div>
              <div className="space-y-3 max-w-sm mx-auto">
                {[
                  { id: 'debutant', emoji: '🌱', label: 'Je débute', hint: 'Je découvre, parlez-moi simplement' },
                  { id: 'amateur',  emoji: '🍷', label: 'J\'ai quelques repères', hint: 'J\'aime le vin, je veux approfondir' },
                  { id: 'expert',   emoji: '🎓', label: 'Je m\'y connais bien', hint: 'Soyez technique, je suis' },
                ].map((o, i) => (
                  <button
                    key={o.id}
                    onClick={() => pickNiveau(o.id)}
                    className="w-full card p-4 flex items-center gap-4 text-left hover:-translate-y-0.5 hover:border-wine-300 transition-all cursor-pointer animate-scale-in"
                    style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
                  >
                    <span className="text-2xl">{o.emoji}</span>
                    <span>
                      <span className="block text-sm font-bold text-anthracite-900">{o.label}</span>
                      <span className="block text-xs text-anthracite-400">{o.hint}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentQ && (
            <div key={currentQ.id} className="animate-slide-up">
              <div className="flex items-center justify-center gap-1.5 mb-5">
                {questions.map((_, i) => (
                  <span key={i} className="rounded-full transition-all"
                        style={{ width: i === profilStep ? 22 : 7, height: 7,
                                 background: i <= profilStep ? '#8c2f39' : '#e7e5e4' }} />
                ))}
              </div>
              <h3 className="font-serif text-lg font-bold text-anthracite-900 text-center mb-5">{currentQ.q}</h3>
              <div className="space-y-2.5 max-w-sm mx-auto">
                {currentQ.options.map((o, i) => (
                  <button
                    key={o.label}
                    onClick={() => answerProfiling(currentQ.id, o.label)}
                    className="w-full card p-3.5 flex items-center gap-3 text-left hover:-translate-y-0.5 hover:border-wine-300 transition-all cursor-pointer animate-scale-in"
                    style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
                  >
                    <span className="text-xl">{o.emoji}</span>
                    <span className="text-sm font-semibold text-anthracite-800">{o.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {profilStep === 999 && messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                m.role === 'user'
                  ? 'text-cream rounded-br-md'
                  : 'bg-white border border-anthracite-100 text-anthracite-700 rounded-bl-md shadow-card'
              }`}
                   style={m.role === 'user' ? { background: 'linear-gradient(135deg, #8c2f39, #5c0d22)' } : {}}>
                {m.role === 'user'
                  ? <p className="text-[13px] leading-relaxed">{m.content}</p>
                  : (
                    <>
                      {renderMarkdown(m.content)}
                      {findMentionedWines(m.content).map(w => <InlineWineCard key={w.id} wine={w} onSelect={setWineSelected} />)}
                      {m.fallback && (
                        <p className="text-[10px] text-anthracite-400 mt-2 italic">Mode hors-ligne — contenu depuis la base locale.</p>
                      )}
                    </>
                  )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-white border border-anthracite-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-card flex items-center gap-2">
                <Wine size={13} className="text-wine-700 animate-bounce-subtle" />
                <span className="text-xs text-anthracite-400">Œno réfléchit…</span>
              </div>
            </div>
          )}
        </div>

        {/* Menu + input */}
        {profilStep === 999 && (
          <div className="flex-shrink-0 border-t border-anthracite-100 bg-cream p-4 space-y-3">
            <div className="flex gap-2 overflow-x-auto hide-scrollbar">
              {MENU.map(item => (
                <button
                  key={item.id}
                  onClick={() => sendMessage(item.prompt, item.id)}
                  disabled={loading}
                  className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold bg-white border border-anthracite-200 text-anthracite-700 hover:border-wine-400 hover:text-wine-800 transition-all cursor-pointer disabled:opacity-50"
                >
                  <span>{item.emoji}</span>
                  {item.label}
                </button>
              ))}
            </div>
            <form
              onSubmit={e => { e.preventDefault(); sendMessage(input) }}
              className="flex items-center gap-2"
            >
              <input
                className="flex-1 px-4 py-3 bg-white border border-anthracite-200 rounded-2xl text-sm placeholder-anthracite-400 focus:outline-none focus:ring-2 focus:ring-gold-600/40 focus:border-gold-500 transition-all"
                placeholder="Posez votre question sur le vin…"
                value={input}
                onChange={e => setInput(e.target.value)}
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-2xl text-cream transition-all cursor-pointer hover:brightness-110 disabled:opacity-40"
                style={{ background: 'linear-gradient(135deg, #8c2f39, #5c0d22)' }}
                aria-label="Envoyer"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        )}
      </div>

      {wineSelected && (
        <FicheVin wine={wineSelected} onClose={() => setWineSelected(null)} />
      )}
    </div>
  )
}
