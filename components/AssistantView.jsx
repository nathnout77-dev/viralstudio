import { useState, useRef, useEffect, useCallback } from 'react'
import { X, Send, Sparkles, RefreshCw, Wine, Camera } from 'lucide-react'
import { WINE_DB, WINE_DB_TERROIR, WINE_DB_GRAND_PUBLIC, MILLESIMES_DB, DIFFICULTE_CONFIG } from '../data/wineDatabase'
import Icone from './Icone'
import { profilApprisPourAssistant } from '../data/goutsAppris'
import { resumeAchats } from '../lib/achats'
import { normaliser } from '../data/aromes'
import JaugesGout from './JaugesGout'
import WineVisuel from './WineVisuel'
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
        { ic: 'doux', label: 'Doux, comme un jus de fruit' },
        { ic: 'agrumes', label: 'Sec et frais' },
        { ic: 'incertain', label: 'Aucune idée, je découvre !' },
      ],
    },
    {
      id: 'fruits',
      q: 'Quels fruits vous font envie ?',
      options: [
        { ic: 'fruits_rouges', label: 'Fruits rouges (fraise, cerise)' },
        { ic: 'fruits_jaunes', label: 'Fruits jaunes (pêche, abricot)' },
        { ic: 'agrumes', label: 'Agrumes (citron, pamplemousse)' },
        { ic: 'fruits_noirs', label: 'Fruits noirs (mûre, cassis)' },
      ],
    },
    {
      id: 'intensite',
      q: 'En bouche, vous préférez…',
      options: [
        { ic: 'leger', label: 'Léger et facile à boire' },
        { ic: 'equilibre', label: 'Équilibré' },
        { ic: 'puissant', label: 'Costaud, qui a du corps' },
      ],
    },
  ],
  expert: [
    {
      id: 'bouche',
      q: 'Qu\'aimez-vous en bouche ?',
      options: [
        { ic: 'puissant', label: 'Puissant et corsé' },
        { ic: 'leger', label: 'Léger et élégant' },
        { ic: 'tannique', label: 'Tannique, avec de la mâche' },
        { ic: 'mineral', label: 'Minéral et tendu' },
      ],
    },
    {
      id: 'frequence',
      q: 'Votre fréquence de dégustation ?',
      options: [
        { ic: 'amateur', label: 'Occasionnelle (fêtes, dîners)' },
        { ic: 'millesime', label: 'Hebdomadaire' },
        { ic: 'vigne', label: 'Passionné, plusieurs fois par semaine' },
      ],
    },
    {
      id: 'regions',
      q: 'Vos régions de prédilection ?',
      options: [
        { ic: 'amateur', label: 'Bordeaux & Sud-Ouest' },
        { ic: 'fruits_rouges', label: 'Bourgogne & Beaujolais' },
        { ic: 'soleil', label: 'Rhône & Sud' },
        { ic: 'chateau', label: 'Loire' },
        { ic: 'apero', label: 'Grand Est (Alsace, Champagne, Jura)' },
        { ic: 'decouverte', label: 'Éclectique, tout m\'intéresse' },
      ],
    },
  ],
}

const MENU = [
  { id: 'decouverte', ic: 'vigne', label: 'Découverte',
    prompt: 'Propose-moi des vins à découvrir adaptés à mon profil, avec pour chacun : pourquoi il me plaira, le prix moyen, et un domaine recommandé.' },
  { id: 'actualite', ic: 'actualite', label: 'Actualité du Vin',
    prompt: 'Donne-moi l\'actualité récente du vin : derniers grands concours et leurs médaillés, sorties de millésimes marquantes, estimation des dates de vendanges à venir, et événements/salons à ne pas manquer. Utilise la recherche web pour des infos fraîches.' },
  { id: 'calendrier', ic: 'millesime', label: 'Calendrier des Saisons',
    prompt: 'Explique-moi le cycle de la vigne et où on en est en ce moment. Précise comment la période de récolte varie selon les cépages (précoces vs tardifs) et l\'influence du millésime.' },
  { id: 'moment', ic: 'soleil', label: 'Vins du Moment',
    prompt: 'Quels vins boire en ce moment ? Donne-moi : les millésimes qui entrent dans leur fenêtre de maturité idéale maintenant, des vins adaptés à la saison et à la météo actuelle, et des idées d\'accords avec des plats de saison.' },
]

function buildSystemPrompt(profil) {
  const appris = profilApprisPourAssistant()
  const achats = resumeAchats()
  // PROMPT VOLONTAIREMENT DENSE : le budget gratuit Groq est de 6-12k
  // tokens PAR MINUTE et par modèle, réponse comprise. Pour garantir
  // plusieurs questions par minute, la requête entière doit rester sous
  // ~4k tokens. D'où : liste de vins ultra-compacte (le modèle connaît
  // déjà ces appellations, la base sert à contraindre le choix et donner
  // les prix), millésimes résumés en années à privilégier par région,
  // pas de lexique embarqué (les fiches de l'app s'en chargent).
  const vins = WINE_DB_TERROIR.map(w =>
    [w.appellation, w.region, w.typeLabel, `${w.prixMoyen}€`, w.difficulte].join('|')
  ).join('\n')
  const vinsGrandPublic = WINE_DB_GRAND_PUBLIC.map(w =>
    [w.appellation, w.region, w.typeLabel, `${w.prixMoyen}€`].join('|')
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
${achats ? `Décisions récentes en rayon après scan (ACHETÉ = mis au panier, reposé = pas convaincu) — déduis-en ses goûts et son budget réels :\n${achats}` : ''}

# Vins de l'application (recommande d'abord dans cette liste — appellation|région|type|prix moyen|difficulté)
${vins}

# Repères grand public / supermarché (marques de grande distribution — appellation|région|type|prix) — mentionne-les quand l'utilisateur parle rayon/enseigne/petit budget, et signale-les toujours « (grand public) »
${vinsGrandPublic}

# Années à privilégier par région (millésimes récents)
${millesimes}

# Règles impératives
1. Par défaut, recommande D'ABORD un vin de la liste de l'app (qualité et prix repérés) et oriente l'achat vers cavistes indépendants ou domaines, en invitant à ouvrir la fiche du vin dans l'onglet Vins. MAIS si l'utilisateur te parle d'un vin de supermarché / grande surface — une marque (ex. « Roche Mazet »), une enseigne (Carrefour, Leclerc, Auchan, Intermarché, Lidl, Monoprix, Casino…), une foire aux vins, ou « en rayon » / « en magasin » — aide-le PLEINEMENT et sans mépris : identifie la bouteille, dis honnêtement ce qu'elle vaut et à quoi s'attendre, donne un repère de prix, et propose au besoin une meilleure alternative au même budget. Utilise la recherche web fournie (sites des enseignes, avis, guides comme le Guide Hachette) pour des infos réelles et actuelles ; cite tes sources et n'invente JAMAIS un prix, une note ou une médaille.
2. Réponses COURTES et scannables : listes à puces, 2-4 recommandations max. Chaque vin : nom + région + prix + une phrase sur pourquoi il plaira.
3. Pour l'actualité (concours, vendanges, salons) et les vins de supermarché : appuie-toi sur les résultats de recherche web fournis, cite tes sources, n'invente jamais de médailles, dates ou prix.
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

// Lecture directe de la cave (l'assistant ne la reçoit pas en prop).
function chargerCave() {
  if (typeof window === 'undefined') return []
  try { const v = JSON.parse(localStorage.getItem('oenotheque-v2')); return Array.isArray(v) ? v : [] } catch { return [] }
}

// Compose le message d'accord à partir du JSON d'analyse du plat : choisit de
// vraies appellations de WINE_DB (jauges proches du profil conseillé, couleur
// adaptée), en priorisant celles déjà en cave. Le texte NOMME les appellations
// pour que findMentionedWines rende automatiquement leurs cartes.
function messageAccord(json) {
  if (!json || !json.plat) {
    return "Je ne reconnais pas de plat sur cette photo 🤔 Réessayez avec une assiette bien cadrée, ou décrivez-moi simplement ce que vous mangez — je trouverai l'accord."
  }
  const types = Array.isArray(json.typesConseilles) && json.typesConseilles.length ? json.typesConseilles : null
  const prof = json.profilConseille
  const caveApps = new Set(chargerCave().map(w => normaliser(w.appellation)))
  const score = (w) => {
    let s = 0
    if (types) s += Math.max(0, types.length - types.indexOf(w.type)) // couleur conseillée
    else s += 0
    if (prof && w.jauges) {
      s += 3 - (Math.abs(w.jauges.puissance - prof.puissance) +
                Math.abs(w.jauges.douceur - prof.douceur) +
                Math.abs(w.jauges.tanins - prof.tanins)) / 2
    }
    if (caveApps.has(normaliser(w.appellation))) s += 6 // déjà en cave = idéal
    if (w.difficulte === 'facile') s += 0.4
    return s
  }
  const classes = WINE_DB
    .filter(w => !types || types.includes(w.type))
    .map(w => ({ w, s: score(w), enCave: caveApps.has(normaliser(w.appellation)) }))
    .sort((a, b) => b.s - a.s)

  const choix = []
  const vus = new Set()
  for (const c of classes) {
    const base = normaliser(c.w.appellation).split(' ')[0]
    if (vus.has(base)) continue // évite 3 variantes de la même appellation
    vus.add(base)
    choix.push(c)
    if (choix.length === 3) break
  }

  const enCave = choix.find(c => c.enCave)
  const noms = choix.map(c => `**${c.w.appellation}**`)
  let msg = `🍽️ **${json.plat}**${json.description ? ` — ${json.description}` : ''}\n\n`
  if (json.explication) msg += `${json.explication}\n\n`
  msg += `Mes accords : ${noms.join(', ')}.`
  if (enCave) msg += `\n\n✓ Vous avez déjà **${enCave.w.appellation}** en cave — parfait pour ce soir.`
  return msg
}

function InlineWineCard({ wine, onSelect }) {
  const diff = DIFFICULTE_CONFIG[wine.difficulte]
  return (
    <div
      onClick={() => onSelect?.(wine)}
      role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onSelect?.(wine)}
      className="card p-3 mt-2 flex items-start gap-3 cursor-pointer hover:border-gold-500/30 hover:-translate-y-0.5 transition-all">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
           style={{ background: `${wine.color}18` }}>
        <WineVisuel type={wine.type} size={18} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <div className="font-serif text-[13px] font-bold text-anthracite-900 truncate">{wine.appellation}</div>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                style={{ background: diff.bg, color: diff.color }}>
            ~{wine.prixMoyen}€
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
  return `Je n'arrive pas à joindre mon cerveau distant pour le moment. En attendant, explorez l'onglet **Vins** (plus de ${WINE_DB_TERROIR.length} appellations décodées) ou le **Guide** (millésimes, accords, lexique) — tout y est disponible hors-ligne !`
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
  const platInputRef = useRef(null)

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

  // Base viticole nationale : plutôt que de gonfler le prompt avec 1200
  // fiches (impossible sous le quota Groq), on n'injecte QUE les entrées
  // citées dans la question. Chargement à la volée, sans coût au démarrage.
  const contexteReferentiel = useCallback(async (question) => {
    try {
      const R = await import('../lib/referentiel')
      const mots = question.split(/[^A-Za-zÀ-ÿ'’-]+/).filter(m => m.length >= 4)
      const vus = new Set()
      const lignes = []

      const ajouter = (r) => {
        const cle = `${r.kind}:${r.item.id}`
        if (vus.has(cle) || lignes.length >= 6) return
        vus.add(cle)
        const it = r.item
        if (r.kind === 'appellation') {
          const d = R.detailAppellation(it.nom)
          const crus = R.classementsAppellation(it.nom)
          lignes.push([
            `APPELLATION ${it.nom} (${it.type}) — ${it.region}${it.sousRegion ? `, ${it.sousRegion}` : ''}`,
            d?.cepages?.length ? `cépages: ${d.cepages.join(', ')}` : null,
            d?.sol ? `sol: ${d.sol}` : null,
            d?.garde ? `garde: ${d.garde}` : null,
            d?.hierarchie ? `rang: ${d.hierarchie}` : null,
            crus.length ? `crus classés: ${crus.length}` : null,
          ].filter(Boolean).join(' | '))
        } else if (r.kind === 'cepage') {
          lignes.push([
            `CÉPAGE ${it.nom} (${it.couleur}, ${it.origine})`,
            it.aromes?.length ? `arômes: ${it.aromes.join(', ')}` : null,
            it.tanins ? `tanins ${it.tanins}` : null,
            it.acidite ? `acidité ${it.acidite}` : null,
            it.corps ? `corps ${it.corps}` : null,
            it.garde ? `garde ${it.garde}` : null,
            it.tempService ? `service ${it.tempService}` : null,
            it.accords?.length ? `accords: ${it.accords.join(', ')}` : null,
          ].filter(Boolean).join(' | '))
        } else {
          lignes.push([
            `DOMAINE ${it.nom} — ${it.appellation}, ${it.region}`,
            it.statut ? `statut: ${it.statut}` : null,
            it.style ? `style: ${it.style}` : null,
            it.cuvees?.length ? `cuvées: ${it.cuvees.join(', ')}` : null,
          ].filter(Boolean).join(' | '))
        }
      }

      // Requête entière d'abord (expressions à plusieurs mots), puis mot à mot
      for (const r of R.chercherReferentiel(question, 4)) ajouter(r)
      for (const mot of mots) {
        if (lignes.length >= 6) break
        for (const r of R.chercherReferentiel(mot, 2)) ajouter(r)
      }
      if (!lignes.length) return ''
      return `\n\n# Fiches officielles (base viticole France) — utilise ces données exactes, ne les contredis pas\n${lignes.join('\n')}`
    } catch {
      return '' // le référentiel est un bonus : jamais bloquant
    }
  }, [])

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
        system: buildSystemPrompt(profil) + (await contexteReferentiel(text)),
        messages: history.slice(-8).map(m => ({ role: m.role, content: m.content })),
      }
      // Recherche web : actualité, ET vins de supermarché/enseignes (infos réelles
      // à jour — prix en rayon, avis, foires aux vins — introuvables dans la base).
      const veutWeb = menuId === 'actualite'
        || /actualité|concours|vendange|salon|médaill/i.test(text)
        || /supermarch|grande surface|hypermarch|carrefour|leclerc|auchan|intermarch|lidl|aldi|monoprix|casino|super\s?u|cora|foire aux vins|en rayon|en magasin/i.test(text)
      if (veutWeb) {
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
          ? `Vous êtes en pleine forme, et moi j'ai besoin de reprendre mon souffle une petite minute ! Le temps de reposer mes idées, reposez-moi votre question dans quelques instants — en attendant, l'onglet **Vins** et le **Guide** sont là.`
          : fallbackFor(menuId, profil),
        fallback: true,
      }])
    } finally {
      setLoading(false)
    }
  }, [messages, loading, profil])

  // ── Accords à partir d'une photo de plat ──────────────────────────────────
  const analyserPlat = useCallback(async (file) => {
    if (!file || loading) return
    setMessages(prev => [...prev, { role: 'user', content: '🍽️ (photo d’un plat)' }])
    setLoading(true)
    try {
      const dataUrl = await new Promise((resolve, reject) => {
        const r = new FileReader()
        r.onload = () => resolve(r.result)
        r.onerror = reject
        r.readAsDataURL(file)
      })
      const base64 = String(dataUrl).split(',')[1]
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64, mode: 'plat' }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data?.json) {
        const quota = data?.error === 'quota'
        throw Object.assign(new Error('plat'), { rateLimited: quota })
      }
      setMessages(prev => [...prev, { role: 'assistant', content: messageAccord(data.json) }])
    } catch (e) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: e?.rateLimited
          ? "J'ai besoin d'une petite minute avant de relire une photo — réessayez dans un instant. En attendant, décrivez-moi le plat, je trouverai l'accord !"
          : "Je n'ai pas réussi à lire cette photo. Réessayez avec une assiette bien éclairée, ou dites-moi simplement ce que vous mangez.",
      }])
    } finally {
      setLoading(false)
    }
  }, [loading])

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
                <div className="text-4xl mb-3" role="img" aria-hidden="true">👋</div>
                <h3 className="font-serif text-xl font-bold text-anthracite-900">Bienvenue sur Œno !</h3>
                <p className="text-sm text-anthracite-500 mt-2 max-w-sm mx-auto">
                  Pour bien vous conseiller, dites-moi d'abord : le vin et vous, c'est… ?
                </p>
              </div>
              <div className="space-y-3 max-w-sm mx-auto">
                {[
                  { id: 'debutant', ic: 'debutant', label: 'Je débute', hint: 'Je découvre, parlez-moi simplement' },
                  { id: 'amateur',  ic: 'amateur', label: 'J\'ai quelques repères', hint: 'J\'aime le vin, je veux approfondir' },
                  { id: 'expert',   ic: 'expert', label: 'Je m\'y connais bien', hint: 'Soyez technique, je suis' },
                ].map((o, i) => (
                  <button
                    key={o.id}
                    onClick={() => pickNiveau(o.id)}
                    className="w-full card p-4 flex items-center gap-4 text-left hover:-translate-y-0.5 hover:border-wine-300 transition-all cursor-pointer animate-scale-in"
                    style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
                  >
                    <Icone nom={o.ic} size={22} className="text-wine-700 flex-shrink-0" />
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
                    <Icone nom={o.ic} size={19} className="text-wine-700 flex-shrink-0" />
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
              <button
                onClick={() => platInputRef.current?.click()}
                disabled={loading}
                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold bg-wine-50 border border-wine-200 text-wine-800 hover:border-wine-400 transition-all cursor-pointer disabled:opacity-50"
              >
                <Camera size={13} />
                Accord d’un plat
              </button>
              {MENU.map(item => (
                <button
                  key={item.id}
                  onClick={() => sendMessage(item.prompt, item.id)}
                  disabled={loading}
                  className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold bg-white border border-anthracite-200 text-anthracite-700 hover:border-wine-400 hover:text-wine-800 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Icone nom={item.ic} size={16} className="text-wine-700 flex-shrink-0" />
                  {item.label}
                </button>
              ))}
            </div>
            <form
              onSubmit={e => { e.preventDefault(); sendMessage(input) }}
              className="flex items-center gap-2"
            >
              {/* Accords depuis une photo de plat */}
              <input
                ref={platInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={e => { const f = e.target.files?.[0]; e.target.value = ''; if (f) analyserPlat(f) }}
              />
              <button
                type="button"
                onClick={() => platInputRef.current?.click()}
                disabled={loading}
                title="Photographier un plat pour trouver l'accord vin"
                aria-label="Photographier un plat pour l'accord mets-vins"
                className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-2xl bg-white border border-anthracite-200 text-wine-700 hover:border-gold-500/70 hover:text-wine-900 transition-all cursor-pointer disabled:opacity-40"
              >
                <Camera size={17} />
              </button>
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
