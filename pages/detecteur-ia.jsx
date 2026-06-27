import { useState, useCallback, useRef, useEffect } from 'react'

// ─── Listes de marqueurs ───────────────────────────────────────────────────────
const STRONG_AI_MARKERS = [
  // Transition formelle FR
  'il est important de noter','il convient de souligner','il est essentiel de',
  'il faut noter que','il est à noter que','il est crucial de','il est fondamental',
  'force est de constater','il va sans dire','il est indéniable que',
  'il est primordial','il est impératif','il est nécessaire de souligner',
  // Intro de section IA
  'dans un premier temps','dans un second temps','dans un troisième temps',
  'pour commencer','pour débuter','pour conclure','pour résumer',
  'en guise de conclusion','en guise d\'introduction','en définitive',
  'en somme','en résumé','en conclusion','tout d\'abord','ensuite','enfin',
  'premièrement','deuxièmement','troisièmement',
  // Impersonnel IA typique
  'on peut noter','on peut observer','on peut affirmer','on peut dire que',
  'on peut constater','on peut souligner','il convient d\'abord',
  'il convient également','à cet égard','dans ce contexte','à ce titre',
  'dans cette optique','dans cette perspective','dans le cadre de',
  // EN
  'it is important to note','it should be noted','it is worth noting',
  'it is essential to','it is crucial to','first and foremost',
  'last but not least','to summarize','to conclude','in conclusion',
  'in summary','furthermore','moreover','additionally','consequently',
  'in this context','in this regard','on the other hand','it goes without saying',
  'needless to say','as a result','therefore','thus','hence',
]

const MEDIUM_AI_MARKERS = [
  'par ailleurs','de plus','en outre','cependant','néanmoins','toutefois',
  'ainsi','donc','en effet','or','certes','quant à','en ce qui concerne',
  'notamment','à savoir','c\'est-à-dire','autrement dit','c\'est pourquoi',
  'c\'est ainsi que','il s\'agit','il existe','on trouve','on observe',
  'however','although','despite','while','whereas','nevertheless',
  'nonetheless','in addition','as well as','not only','but also',
]

const PASSIVE_INDICATORS_FR = [
  'est utilisé','est considéré','est défini','est caractérisé','est reconnu',
  'est souvent','est généralement','est fréquemment','est habituellement',
  'sont utilisés','sont considérés','sont définis','sont caractérisés',
  'peut être','peuvent être','doit être','doivent être',
  'a été','ont été','avait été','a pu être',
]

const HEDGING_PATTERNS = [
  'il semblerait','il semble que','il paraît que','on pourrait dire',
  'il est possible que','il est probable que','dans une certaine mesure',
  'dans une certaine façon','d\'une certaine manière','plus ou moins',
  'à bien des égards','sous certains aspects','en quelque sorte',
  'seems to','appears to','would suggest','it could be argued','in some ways',
  'to some extent','in a sense','arguably','it might be','one could say',
]

// ─── Moteur d'analyse amélioré ─────────────────────────────────────────────────
function tokenize(text) {
  return (text.toLowerCase().match(/\b[a-zA-ZÀ-ÿ]{2,}\b/g) || [])
}

function splitSentences(text) {
  return (text.match(/[^.!?…]+[.!?…]+(?:\s|$)|[^.!?…]{10,}$/g) || [text])
    .map(s => s.trim()).filter(s => s.length > 5)
}

function splitParagraphs(text) {
  return text.split(/\n\s*\n/).map(p => p.trim()).filter(p => p.length > 20)
}

function countMatches(text, patterns) {
  const lower = text.toLowerCase()
  return patterns.filter(p => lower.includes(p))
}

function stdDev(arr) {
  if (arr.length < 2) return 0
  const avg = arr.reduce((a, b) => a + b, 0) / arr.length
  return Math.sqrt(arr.reduce((a, b) => a + (b - avg) ** 2, 0) / arr.length)
}

function movingTTR(words, windowSize = 50) {
  if (words.length < windowSize) {
    return new Set(words).size / words.length
  }
  let total = 0
  const steps = Math.floor(words.length / windowSize)
  for (let i = 0; i < steps; i++) {
    const window = words.slice(i * windowSize, (i + 1) * windowSize)
    total += new Set(window).size / windowSize
  }
  return total / steps
}

function scoreParagraph(para, docAvgSentLen, docStdDev) {
  const sentences = splitSentences(para)
  const words = tokenize(para)
  const lower = para.toLowerCase()

  if (words.length < 10) return { score: 30, indicators: [], sentences }

  const indicators = []
  let score = 20 // base neutre

  // 1. Marqueurs IA forts (poids élevé)
  const strongMatches = countMatches(para, STRONG_AI_MARKERS)
  if (strongMatches.length > 0) {
    score += Math.min(35, strongMatches.length * 18)
    indicators.push({ label: `${strongMatches.length} marqueur${strongMatches.length > 1 ? 's' : ''} IA fort${strongMatches.length > 1 ? 's' : ''}`, phrases: strongMatches, severity: 'high' })
  }

  // 2. Marqueurs moyens
  const medMatches = countMatches(para, MEDIUM_AI_MARKERS)
  if (medMatches.length >= 2) {
    score += Math.min(15, (medMatches.length - 1) * 5)
    indicators.push({ label: `${medMatches.length} connecteurs logiques IA`, phrases: medMatches.slice(0, 4), severity: 'medium' })
  }

  // 3. Voix passive
  const passiveMatches = countMatches(para, PASSIVE_INDICATORS_FR)
  if (passiveMatches.length >= 2) {
    score += Math.min(10, passiveMatches.length * 4)
    indicators.push({ label: 'Construction passive fréquente', phrases: passiveMatches.slice(0, 3), severity: 'low' })
  }

  // 4. Formules impersonnelles
  const hedgeMatches = countMatches(para, HEDGING_PATTERNS)
  if (hedgeMatches.length > 0) {
    score += hedgeMatches.length * 5
    indicators.push({ label: 'Formules impersonnelles/atténuatrices', phrases: hedgeMatches.slice(0, 3), severity: 'low' })
  }

  // 5. Uniformité des phrases dans le paragraphe
  const sentLens = sentences.map(s => tokenize(s).length)
  const paraStd = stdDev(sentLens)
  const paraAvg = sentLens.reduce((a, b) => a + b, 0) / (sentLens.length || 1)
  if (sentLens.length >= 3 && paraStd < paraAvg * 0.3) {
    score += 12
    indicators.push({ label: 'Phrases très uniformes (faible burstiness)', phrases: [], severity: 'medium' })
  }

  // 6. Longueur des phrases vs référence humaine (14-18 mots)
  if (paraAvg > 26) {
    score += 10
    indicators.push({ label: `Phrases longues (moy. ${Math.round(paraAvg)} mots)`, phrases: [], severity: 'medium' })
  } else if (paraAvg > 20) {
    score += 5
  }

  // 7. Absence de première personne (signe possible d'IA)
  const hasFirstPerson = /\b(je|j'|me|mon|ma|mes|nous|notre|nos|i |i'm|we |my |our )\b/i.test(lower)
  if (!hasFirstPerson && words.length > 40) {
    score += 5
    indicators.push({ label: 'Aucune première personne détectée', phrases: [], severity: 'low' })
  }

  // 8. Structure intro/transition de paragraphe
  const firstWord = lower.trim().split(/\s+/)[0]
  const aiStartWords = ['tout','premièrement','deuxièmement','troisièmement','ensuite',
    'de plus','par ailleurs','en outre','cependant','ainsi','enfin','therefore','furthermore',
    'moreover','additionally','first','second','third','finally','however']
  if (aiStartWords.some(w => lower.startsWith(w))) {
    score += 8
    indicators.push({ label: 'Début de paragraphe typique IA', phrases: [firstWord], severity: 'medium' })
  }

  return { score: Math.min(98, Math.max(5, Math.round(score))), indicators, sentences }
}

function analyzeText(rawText) {
  const text = rawText.trim()
  const paragraphs = splitParagraphs(text)
  const allSentences = splitSentences(text)
  const words = tokenize(text)
  const totalWords = words.length

  if (totalWords < 30 || allSentences.length < 2) return null

  // ── Stats document ──
  const sentLens = allSentences.map(s => tokenize(s).length)
  const avgSentLen = sentLens.reduce((a, b) => a + b, 0) / sentLens.length
  const docStdDev = stdDev(sentLens)
  const uniqueWords = new Set(words).size
  const mTTR = movingTTR(words)

  // ── Analyse par passage (paragraphe) ──
  const passageResults = paragraphs.map((para, i) => {
    const res = scoreParagraph(para, avgSentLen, docStdDev)
    return {
      id: i + 1,
      text: para,
      score: res.score,
      indicators: res.indicators,
      label: res.score >= 65 ? 'ia' : res.score >= 38 ? 'mixte' : 'humain',
      sentences: res.sentences,
      wordCount: tokenize(para).length,
    }
  })

  // ── Analyse par phrase pour l'annotation ──
  const lower = text.toLowerCase()
  let rngSeed = totalWords * 31 + words.length
  const rng = () => {
    rngSeed = (rngSeed * 1664525 + 1013904223) & 0xffffffff
    return (rngSeed >>> 0) / 0xffffffff
  }

  const sentenceResults = allSentences.map(sent => {
    const sLower = sent.toLowerCase()
    const sWords = tokenize(sent).length
    const strongHit = STRONG_AI_MARKERS.some(p => sLower.includes(p))
    const medHit = countMatches(sent, MEDIUM_AI_MARKERS).length
    const passiveHit = countMatches(sent, PASSIVE_INDICATORS_FR).length > 0
    const hedgeHit = HEDGING_PATTERNS.some(p => sLower.includes(p))

    let prob = 0.18
    if (strongHit) prob += 0.38
    if (medHit >= 2) prob += 0.12
    if (medHit === 1) prob += 0.05
    if (passiveHit) prob += 0.07
    if (hedgeHit) prob += 0.08
    if (sWords > 30) prob += 0.10
    if (sWords > 22 && sWords <= 30) prob += 0.05
    if (sWords < 7) prob -= 0.10
    prob += (rng() - 0.5) * 0.12
    prob = Math.max(0.03, Math.min(0.97, prob))

    return {
      text: sent,
      prob,
      label: prob > 0.62 ? 'ia' : prob > 0.36 ? 'mixte' : 'humain',
    }
  })

  // ── Critères globaux ──
  const strongDoc = countMatches(text, STRONG_AI_MARKERS)
  const medDoc = countMatches(text, MEDIUM_AI_MARKERS)
  const passiveDoc = countMatches(text, PASSIVE_INDICATORS_FR)
  const hedgeDoc = countMatches(text, HEDGING_PATTERNS)

  const passageAvgScore = passageResults.reduce((a, p) => a + p.score, 0) / (passageResults.length || 1)

  const perplexScore = Math.round(Math.max(5, Math.min(95, (1 - mTTR * 1.3) * 100)))
  const uniformScore = Math.round(Math.max(5, Math.min(95, (1 - Math.min(1, docStdDev / (avgSentLen * 0.55))) * 100)))
  const longSentScore = Math.round(Math.max(5, Math.min(95, Math.max(0, (avgSentLen - 9) / 21) * 100)))
  const markeursScore = Math.round(Math.min(95, (strongDoc.length * 18 + medDoc.length * 6) / (allSentences.length * 0.5 + 1) * 100))
  const passiveScore = Math.round(Math.min(95, passiveDoc.length / (allSentences.length || 1) * 280))
  const styleScore = Math.round(Math.max(5, Math.min(95, (1 - Math.min(1, (text.match(/[!?;:—–…«»]/g) || []).length / (totalWords * 0.04))) * 100)))
  const structureScore = Math.round(Math.max(5, Math.min(95, passageAvgScore)))

  const criteria = [
    {
      id: 'perplexite', name: 'Diversité lexicale', icon: '📊', weight: 0.16,
      score: perplexScore,
      desc: 'Les modèles IA tendent à utiliser un vocabulaire prévisible et répétitif. Un score élevé indique un vocabulaire homogène.',
      detail: `Ratio TTR mobile : ${Math.round(mTTR * 100)}% · ${uniqueWords} mots distincts / ${totalWords} mots totaux`,
    },
    {
      id: 'uniformite', name: 'Variation rythmique (burstiness)', icon: '📏', weight: 0.18,
      score: uniformScore,
      desc: 'Les humains alternent naturellement phrases courtes et longues. Une faible variation signale un texte potentiellement généré.',
      detail: `Écart-type : ${Math.round(docStdDev * 10) / 10} mots · Moyenne : ${Math.round(avgSentLen * 10) / 10} mots/phrase`,
    },
    {
      id: 'marqueurs', name: 'Marqueurs stylistiques IA', icon: '🔍', weight: 0.25,
      score: Math.min(95, markeursScore),
      desc: 'Expressions de transition et formules structurantes caractéristiques des LLM (GPT, Gemini, Claude…).',
      detail: `${strongDoc.length} marqueur${strongDoc.length > 1 ? 's' : ''} fort${strongDoc.length > 1 ? 's' : ''} · ${medDoc.length} connecteur${medDoc.length > 1 ? 's' : ''} · ${hedgeDoc.length} atténuateur${hedgeDoc.length > 1 ? 's' : ''}`,
    },
    {
      id: 'longueur', name: 'Longueur des phrases', icon: '📝', weight: 0.14,
      score: longSentScore,
      desc: 'Les IA produisent des phrases plus longues que la moyenne humaine (14–18 mots). Au-delà de 22 mots en moyenne, le risque augmente.',
      detail: `Moyenne : ${Math.round(avgSentLen * 10) / 10} mots/phrase · Référence humaine : 14–18 mots`,
    },
    {
      id: 'voix_passive', name: 'Voix passive & impersonnel', icon: '🎭', weight: 0.12,
      score: passiveScore,
      desc: 'Les modèles IA utilisent fréquemment la voix passive et les formulations impersonnelles pour généraliser.',
      detail: `${passiveDoc.length} construction${passiveDoc.length > 1 ? 's' : ''} passive${passiveDoc.length > 1 ? 's' : ''} détectée${passiveDoc.length > 1 ? 's' : ''}`,
    },
    {
      id: 'style', name: 'Style & ponctuation expressive', icon: '✏️', weight: 0.10,
      score: styleScore,
      desc: 'Les humains utilisent une ponctuation variée et expressive (!, ?, ;, —). Les IA restent neutres et formelles.',
      detail: `${(text.match(/[!?;:—–…«»]/g) || []).length} signe${(text.match(/[!?;:—–…«»]/g) || []).length > 1 ? 's' : ''} expressif${(text.match(/[!?;:—–…«»]/g) || []).length > 1 ? 's' : ''} pour ${totalWords} mots`,
    },
    {
      id: 'structure', name: 'Structure des passages', icon: '📄', weight: 0.05,
      score: structureScore,
      desc: 'Score moyen des passages analysés individuellement. Les paragraphes très réguliers sont suspects.',
      detail: `${passageResults.filter(p => p.label === 'ia').length} passage${passageResults.filter(p => p.label === 'ia').length > 1 ? 's' : ''} à haut risque sur ${passageResults.length}`,
    },
  ]

  const globalScore = Math.round(
    criteria.reduce((s, c) => s + c.score * c.weight, 0)
  )

  const verdict = globalScore >= 65 ? 'ia' : globalScore >= 35 ? 'mixte' : 'humain'
  const suspectPassages = passageResults.filter(p => p.label !== 'humain')
    .sort((a, b) => b.score - a.score)

  return {
    globalScore,
    humanScore: 100 - globalScore,
    criteria,
    passages: passageResults,
    suspectPassages,
    sentences: sentenceResults,
    strongMarkers: strongDoc,
    medMarkers: medDoc,
    stats: {
      wordCount: totalWords,
      charCount: text.replace(/\s/g, '').length,
      charWithSpaces: text.length,
      sentenceCount: allSentences.length,
      paragraphCount: paragraphs.length,
      avgWordsPerSentence: Math.round(avgSentLen * 10) / 10,
      uniqueWords,
      mTTR: Math.round(mTTR * 100),
      stdDev: Math.round(docStdDev * 10) / 10,
    },
    verdict,
  }
}

// ─── Composants UI ─────────────────────────────────────────────────────────────
function DonutGauge({ score }) {
  const r = 66
  const circ = 2 * Math.PI * r
  const fill = (score / 100) * circ
  const color = score >= 65 ? '#dc2626' : score >= 35 ? '#d97706' : '#16a34a'
  const trackColor = '#e5e7eb'
  return (
    <svg width={170} height={170} viewBox="0 0 170 170">
      <circle cx={85} cy={85} r={r} fill="none" stroke={trackColor} strokeWidth={13} />
      <circle cx={85} cy={85} r={r} fill="none" stroke={color} strokeWidth={13}
        strokeDasharray={`${fill} ${circ}`} strokeLinecap="round"
        transform="rotate(-90 85 85)"
        style={{ transition: 'stroke-dasharray 1.2s cubic-bezier(.4,0,.2,1), stroke 0.4s' }}
      />
      <text x={85} y={80} textAnchor="middle" fill={color} fontSize={30} fontWeight={800} fontFamily="system-ui, -apple-system, sans-serif">{score}</text>
      <text x={85} y={97} textAnchor="middle" fill="#6b7280" fontSize={11} fontWeight={600} fontFamily="system-ui, -apple-system, sans-serif">% IA détecté</text>
    </svg>
  )
}

function CriteriaBar({ score }) {
  const color = score >= 65 ? '#dc2626' : score >= 35 ? '#d97706' : '#16a34a'
  return (
    <div style={{ height: 6, borderRadius: 3, background: '#e5e7eb', overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${score}%`, background: color, borderRadius: 3, transition: 'width 0.9s cubic-bezier(.4,0,.2,1)' }} />
    </div>
  )
}

function PassageBadge({ label, score }) {
  const s = {
    ia:     { bg: '#fef2f2', color: '#dc2626', border: '#fecaca' },
    mixte:  { bg: '#fffbeb', color: '#d97706', border: '#fde68a' },
    humain: { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0' },
  }[label]
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 8px', borderRadius: 12, background: s.bg, color: s.color, border: `1px solid ${s.border}`, fontSize: 11, fontWeight: 700 }}>
      {label === 'ia' ? '🤖 Probable IA' : label === 'mixte' ? '⚠️ Incertain' : '✍️ Humain'}
      <span style={{ opacity: 0.7 }}>· {score}%</span>
    </span>
  )
}

function SentenceHighlight({ sent }) {
  const style = {
    ia:     { background: 'rgba(220,38,38,0.10)', borderBottom: '2px solid rgba(220,38,38,0.6)', color: '#1e293b' },
    mixte:  { background: 'rgba(217,119,6,0.09)', borderBottom: '2px solid rgba(217,119,6,0.5)', color: '#1e293b' },
    humain: { background: 'transparent', borderBottom: 'none', color: '#374151' },
  }[sent.label]
  return (
    <span
      style={{ ...style, display: 'inline', padding: '0 2px', marginRight: 2, borderRadius: 2, cursor: sent.label !== 'humain' ? 'help' : 'default' }}
      title={sent.label !== 'humain' ? `Score IA : ${Math.round(sent.prob * 100)}%` : undefined}
    >
      {sent.text}{' '}
    </span>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function DetecteurIA() {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [tab, setTab] = useState('resume')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activePassage, setActivePassage] = useState(null)
  const passageRefs = useRef({})
  const analyzeDate = useRef(null)

  const handleAnalyze = useCallback(() => {
    if (text.trim().length < 60) { setError('Veuillez saisir au moins 60 caractères.'); return }
    setError(null); setLoading(true)
    analyzeDate.current = new Date().toLocaleString('fr-FR')
    setTimeout(() => {
      const res = analyzeText(text)
      if (!res) { setError('Texte trop court pour une analyse fiable (min. 30 mots).'); setLoading(false); return }
      setResult(res); setTab('resume'); setActivePassage(null); setLoading(false)
    }, 1400)
  }, [text])

  const handleReset = () => { setResult(null); setText(''); setError(null); setActivePassage(null) }

  const scrollToPassage = (id) => {
    setTab('texte')
    setActivePassage(id)
    setTimeout(() => {
      passageRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 80)
  }

  const verdictConfig = result ? {
    ia:     { label: 'Contenu probablement généré par IA', sub: 'Ce texte présente de forts indices de génération automatique.', color: '#dc2626', bg: '#fef2f2', border: '#fca5a5', icon: '🤖' },
    mixte:  { label: 'Contenu mixte', sub: 'Certains passages semblent générés par IA, d\'autres sont probablement humains.', color: '#d97706', bg: '#fffbeb', border: '#fcd34d', icon: '⚠️' },
    humain: { label: 'Contenu probablement humain', sub: 'Ce texte présente les caractéristiques d\'une écriture naturelle.', color: '#16a34a', bg: '#f0fdf4', border: '#86efac', icon: '✍️' },
  }[result.verdict] : null

  const scoreColor = result ? (result.globalScore >= 65 ? '#dc2626' : result.globalScore >= 35 ? '#d97706' : '#16a34a') : '#6b7280'

  // ── Styles ──
  const page = { minHeight: '100vh', background: '#f1f5f9', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', color: '#1e293b' }
  const header = { background: '#1e293b', color: '#fff', padding: '0' }
  const card = (extra = {}) => ({ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', ...extra })
  const tabBtn = (active) => ({
    padding: '10px 20px', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
    fontFamily: 'inherit', background: 'none',
    color: active ? '#4f46e5' : '#64748b',
    borderBottom: `2px solid ${active ? '#4f46e5' : 'transparent'}`,
    transition: 'all 0.15s',
  })
  const label = { fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8', display: 'block', marginBottom: 4 }

  return (
    <div style={page}>
      {/* ── Header ── */}
      <div style={header}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>🤖</div>
            <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.02em' }}>Détecteur IA</span>
            <span style={{ fontSize: 11, color: '#94a3b8', padding: '2px 8px', borderRadius: 10, background: 'rgba(255,255,255,0.08)', marginLeft: 4 }}>BETA</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5 }}>← Retour</a>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 24px' }}>

        {/* ── Saisie ── */}
        {!result && (
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <h1 style={{ fontSize: 26, fontWeight: 900, color: '#0f172a', margin: '0 0 10px', letterSpacing: '-0.03em' }}>
                Détection de contenu généré par IA
              </h1>
              <p style={{ fontSize: 14, color: '#64748b', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
                Analyse heuristique multi-critères inspirée de Compilatio — 7 indicateurs, rapport par passage, localisation des zones suspectes.
              </p>
            </div>

            <div style={{ ...card(), padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '6px 16px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#fca5a5' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#fcd34d' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#86efac' }} />
                <span style={{ fontSize: 11, color: '#94a3b8', marginLeft: 6 }}>Zone de saisie</span>
              </div>
              <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Collez votre texte ici (minimum 30 mots)…&#10;&#10;L'analyse identifiera les passages à vérifier et produira un rapport détaillé par critère."
                style={{ width: '100%', minHeight: 260, border: 'none', outline: 'none', resize: 'vertical', color: '#1e293b', fontSize: 14, lineHeight: 1.8, fontFamily: 'inherit', padding: '20px 20px', boxSizing: 'border-box', background: 'transparent' }}
              />
              <div style={{ padding: '12px 20px', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fafafa' }}>
                <span style={{ fontSize: 12, color: '#94a3b8' }}>
                  {text.trim() ? `${tokenize(text).length} mots · ${text.length} caractères` : 'En attente de texte'}
                </span>
                <div style={{ display: 'flex', gap: 9 }}>
                  {text && <button onClick={() => setText('')} style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', cursor: 'pointer', fontSize: 13, fontFamily: 'inherit' }}>Effacer</button>}
                  <button
                    onClick={handleAnalyze}
                    disabled={loading || text.trim().length < 20}
                    style={{ padding: '8px 22px', borderRadius: 8, border: 'none', background: loading || text.trim().length < 20 ? '#c7d2fe' : 'linear-gradient(135deg, #4f46e5, #6366f1)', color: '#fff', cursor: loading || text.trim().length < 20 ? 'not-allowed' : 'pointer', fontSize: 14, fontWeight: 700, fontFamily: 'inherit' }}
                  >
                    {loading ? '⏳ Analyse…' : 'Analyser →'}
                  </button>
                </div>
              </div>
            </div>

            {error && <div style={{ marginTop: 12, padding: '10px 16px', borderRadius: 9, background: '#fef2f2', border: '1px solid #fca5a5', color: '#dc2626', fontSize: 13 }}>{error}</div>}

            {/* Grille des critères */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12, marginTop: 28 }}>
              {[
                { icon: '📊', name: 'Diversité lexicale', desc: 'Analyse la richesse et la variabilité du vocabulaire (TTR mobile)' },
                { icon: '📏', name: 'Variation rythmique', desc: 'Burstiness — variation naturelle des longueurs de phrases' },
                { icon: '🔍', name: 'Marqueurs IA', desc: '80+ expressions de transition typiques des LLM (FR + EN)' },
                { icon: '📝', name: 'Longueur des phrases', desc: 'Comparaison avec le profil d\'écriture humaine (14–18 mots)' },
                { icon: '🎭', name: 'Voix passive', desc: 'Fréquence des constructions passives et impersonnelles' },
                { icon: '✏️', name: 'Style & ponctuation', desc: 'Richesse expressive : !, ?, ;, —, «»…' },
                { icon: '📄', name: 'Structure des passages', desc: 'Analyse individuelle de chaque paragraphe avec score' },
              ].map(c => (
                <div key={c.name} style={{ ...card(), padding: '14px 16px', display: 'flex', gap: 10 }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#1e293b', marginBottom: 3 }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: '#94a3b8', lineHeight: 1.5 }}>{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Rapport ── */}
        {result && (
          <div>
            {/* En-tête rapport */}
            <div style={{ ...card(), padding: '16px 22px', marginBottom: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: 9, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>📄</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>Texte analysé</div>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>
                    {result.stats.wordCount} mots · {result.stats.sentenceCount} phrases · {result.stats.paragraphCount} paragraphes · {analyzeDate.current}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <PassageBadge label={result.verdict} score={result.globalScore} />
                <button onClick={handleReset} style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', cursor: 'pointer', fontSize: 12, fontFamily: 'inherit', fontWeight: 600 }}>
                  ← Nouveau texte
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div style={{ borderBottom: '1px solid #e2e8f0', marginBottom: 20, background: '#fff', borderRadius: '12px 12px 0 0', display: 'flex', paddingLeft: 8 }}>
              {[{ id: 'resume', label: '📋 Résumé' }, { id: 'texte', label: '🔍 Texte annoté' }, { id: 'stats', label: '📊 Statistiques' }].map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} style={tabBtn(tab === t.id)}>{t.label}</button>
              ))}
            </div>

            {/* ══ TAB RÉSUMÉ ══ */}
            {tab === 'resume' && (
              <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 18, alignItems: 'start' }}>

                {/* Colonne gauche */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {/* Score global */}
                  <div style={{ ...card(), padding: '24px 16px', textAlign: 'center' }}>
                    <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8', marginBottom: 14 }}>Score de détection IA</div>
                    <DonutGauge score={result.globalScore} />
                    <div style={{ marginTop: 14, padding: '10px 14px', borderRadius: 9, background: verdictConfig.bg, border: `1px solid ${verdictConfig.border}` }}>
                      <div style={{ fontSize: 13, fontWeight: 800, color: verdictConfig.color }}>{verdictConfig.icon} {verdictConfig.label}</div>
                      <div style={{ fontSize: 11, color: '#64748b', marginTop: 4, lineHeight: 1.5 }}>{verdictConfig.sub}</div>
                    </div>
                  </div>

                  {/* Répartition */}
                  <div style={{ ...card(), padding: '16px 18px' }}>
                    <div style={label}>Répartition humain / IA</div>
                    <div style={{ display: 'flex', height: 10, borderRadius: 5, overflow: 'hidden', marginBottom: 8, gap: 1 }}>
                      <div style={{ flex: result.humanScore, background: '#16a34a', transition: 'flex 1s' }} />
                      <div style={{ flex: result.globalScore, background: '#dc2626', transition: 'flex 1s' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                      <span style={{ color: '#16a34a', fontWeight: 700 }}>✍️ {result.humanScore}% humain</span>
                      <span style={{ color: '#dc2626', fontWeight: 700 }}>{result.globalScore}% IA 🤖</span>
                    </div>
                  </div>

                  {/* Quick stats */}
                  <div style={{ ...card(), padding: '16px 18px' }}>
                    <div style={label}>Document</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {[
                        { l: 'Mots', v: result.stats.wordCount },
                        { l: 'Phrases', v: result.stats.sentenceCount },
                        { l: 'Moy. mots/phrase', v: result.stats.avgWordsPerSentence },
                        { l: 'Diversité vocab. (TTR)', v: `${result.stats.mTTR}%` },
                        { l: 'Marqueurs IA forts', v: result.strongMarkers.length },
                        { l: 'Passages suspects', v: result.suspectPassages.length },
                      ].map(s => (
                        <div key={s.l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                          <span style={{ color: '#64748b' }}>{s.l}</span>
                          <span style={{ fontWeight: 700, color: '#1e293b' }}>{s.v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Colonne droite */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {/* Critères */}
                  <div style={{ ...card(), padding: '20px 22px' }}>
                    <div style={label}>Critères d'analyse</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                      {result.criteria.map(c => {
                        const col = c.score >= 65 ? '#dc2626' : c.score >= 35 ? '#d97706' : '#16a34a'
                        const verdict = c.score >= 65 ? 'Indicateur IA fort' : c.score >= 35 ? 'Indicateur modéré' : 'Profil humain'
                        return (
                          <div key={c.id}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 7 }}>
                              <span style={{ fontSize: 16, flexShrink: 0 }}>{c.icon}</span>
                              <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                                  <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{c.name}</span>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, marginLeft: 12 }}>
                                    <span style={{ fontSize: 10, padding: '1px 7px', borderRadius: 8, background: col + '18', color: col, fontWeight: 700 }}>{verdict}</span>
                                    <span style={{ fontSize: 16, fontWeight: 900, color: col }}>{c.score}%</span>
                                  </div>
                                </div>
                                <div style={{ fontSize: 11, color: '#64748b', lineHeight: 1.5, marginBottom: 6 }}>{c.desc}</div>
                                <CriteriaBar score={c.score} />
                                <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 5 }}>{c.detail}</div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Passages à vérifier */}
                  <div style={{ ...card(), padding: '20px 22px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                      <div style={label}>Passages à vérifier ({result.suspectPassages.length})</div>
                      {result.suspectPassages.length > 0 && (
                        <button onClick={() => setTab('texte')} style={{ fontSize: 11, color: '#4f46e5', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, fontFamily: 'inherit' }}>
                          Voir dans le texte →
                        </button>
                      )}
                    </div>
                    {result.suspectPassages.length === 0 ? (
                      <div style={{ padding: '20px', textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>
                        ✅ Aucun passage suspect détecté
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {result.suspectPassages.map(p => (
                          <div
                            key={p.id}
                            onClick={() => scrollToPassage(p.id)}
                            style={{ padding: '14px 16px', borderRadius: 10, border: `1px solid ${p.label === 'ia' ? '#fca5a5' : '#fde68a'}`, background: p.label === 'ia' ? '#fef2f2' : '#fffbeb', cursor: 'pointer', transition: 'box-shadow 0.15s' }}
                            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.09)'}
                            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <div style={{ width: 22, height: 22, borderRadius: 6, background: p.label === 'ia' ? '#dc2626' : '#d97706', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, flexShrink: 0 }}>
                                  P{p.id}
                                </div>
                                <PassageBadge label={p.label} score={p.score} />
                              </div>
                              <span style={{ fontSize: 10, color: '#94a3b8' }}>{p.wordCount} mots</span>
                            </div>
                            <p style={{ fontSize: 12, color: '#374151', lineHeight: 1.6, margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                              {p.text}
                            </p>
                            {p.indicators.length > 0 && (
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 8 }}>
                                {p.indicators.slice(0, 3).map((ind, i) => (
                                  <span key={i} style={{ fontSize: 10, padding: '2px 7px', borderRadius: 8, background: 'rgba(0,0,0,0.06)', color: '#374151' }}>
                                    {ind.label}
                                  </span>
                                ))}
                              </div>
                            )}
                            <div style={{ fontSize: 10, color: p.label === 'ia' ? '#dc2626' : '#d97706', marginTop: 6, fontWeight: 600 }}>
                              → Cliquer pour localiser dans le texte
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Marqueurs détectés */}
                  {result.strongMarkers.length > 0 && (
                    <div style={{ ...card(), padding: '20px 22px' }}>
                      <div style={label}>Marqueurs IA détectés ({result.strongMarkers.length})</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 4 }}>
                        {result.strongMarkers.map(p => (
                          <span key={p} style={{ padding: '3px 10px', borderRadius: 20, background: '#fef2f2', border: '1px solid #fca5a5', fontSize: 12, color: '#dc2626', fontWeight: 500 }}>
                            «&nbsp;{p}&nbsp;»
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Note d'interprétation */}
                  <div style={{ padding: '14px 16px', borderRadius: 10, background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: 12, color: '#64748b', lineHeight: 1.6 }}>
                    ⚠️ <strong>Avertissement</strong> — Cette analyse est basée sur des heuristiques statistiques. Elle constitue une aide à la décision, non une preuve. Un score élevé nécessite une vérification humaine des passages signalés. Certains auteurs humains adoptent naturellement un style formel proche du profil IA.
                  </div>
                </div>
              </div>
            )}

            {/* ══ TAB TEXTE ANNOTÉ ══ */}
            {tab === 'texte' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 18, alignItems: 'start' }}>
                {/* Texte principal avec passages numérotés */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {/* Légende */}
                  <div style={{ ...card(), padding: '12px 18px' }}>
                    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center' }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#64748b' }}>Légende :</span>
                      {[
                        { bg: 'rgba(220,38,38,0.1)', border: 'rgba(220,38,38,0.5)', label: 'Probable IA (> 62%)', dot: '#dc2626' },
                        { bg: 'rgba(217,119,6,0.09)', border: 'rgba(217,119,6,0.5)', label: 'Incertain (36–62%)', dot: '#d97706' },
                        { bg: 'transparent', border: 'transparent', label: 'Humain (< 36%)', dot: '#16a34a' },
                      ].map(l => (
                        <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: '#64748b' }}>
                          <div style={{ width: 16, height: 3, borderRadius: 2, background: l.dot }} />
                          {l.label}
                        </div>
                      ))}
                      <span style={{ marginLeft: 'auto', fontSize: 11, color: '#94a3b8' }}>Survoler une phrase pour voir son score</span>
                    </div>
                  </div>

                  {/* Passages annotés */}
                  {result.passages.map(p => {
                    const isActive = activePassage === p.id
                    const isSuspect = p.label !== 'humain'
                    const passageSents = result.sentences.filter(s =>
                      p.text.includes(s.text.substring(0, 30))
                    )
                    return (
                      <div
                        key={p.id}
                        ref={el => { passageRefs.current[p.id] = el }}
                        style={{
                          ...card(),
                          padding: '18px 20px',
                          border: `1px solid ${isActive ? (p.label === 'ia' ? '#fca5a5' : p.label === 'mixte' ? '#fde68a' : '#e2e8f0') : (isSuspect ? (p.label === 'ia' ? 'rgba(220,38,38,0.25)' : 'rgba(217,119,6,0.25)') : '#e2e8f0')}`,
                          background: isActive ? (p.label === 'ia' ? '#fef2f2' : p.label === 'mixte' ? '#fffbeb' : '#fff') : '#fff',
                          transition: 'all 0.3s',
                          boxShadow: isActive ? '0 0 0 3px rgba(79,70,229,0.15)' : '0 1px 3px rgba(0,0,0,0.04)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                          <div style={{ width: 24, height: 24, borderRadius: 7, background: isSuspect ? (p.label === 'ia' ? '#dc2626' : '#d97706') : '#e2e8f0', color: isSuspect ? '#fff' : '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, flexShrink: 0 }}>
                            P{p.id}
                          </div>
                          <PassageBadge label={p.label} score={p.score} />
                          {p.indicators.length > 0 && (
                            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginLeft: 4 }}>
                              {p.indicators.slice(0, 2).map((ind, i) => (
                                <span key={i} style={{ fontSize: 10, padding: '1px 7px', borderRadius: 8, background: '#f1f5f9', color: '#64748b', border: '1px solid #e2e8f0' }}>
                                  {ind.label}
                                </span>
                              ))}
                            </div>
                          )}
                          <span style={{ marginLeft: 'auto', fontSize: 10, color: '#94a3b8' }}>{p.wordCount} mots</span>
                        </div>

                        <div style={{ fontSize: 14, lineHeight: 2, color: '#374151' }}>
                          {passageSents.length > 0
                            ? passageSents.map((s, i) => <SentenceHighlight key={i} sent={s} />)
                            : <span>{p.text}</span>
                          }
                        </div>

                        {/* Indicateurs du passage */}
                        {p.indicators.length > 0 && (
                          <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #f1f5f9' }}>
                            {p.indicators.map((ind, i) => (
                              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
                                <div style={{ width: 4, height: 4, borderRadius: '50%', background: ind.severity === 'high' ? '#dc2626' : ind.severity === 'medium' ? '#d97706' : '#94a3b8', marginTop: 6, flexShrink: 0 }} />
                                <div>
                                  <span style={{ fontSize: 11, color: '#374151', fontWeight: 600 }}>{ind.label}</span>
                                  {ind.phrases.length > 0 && (
                                    <span style={{ fontSize: 11, color: '#94a3b8' }}> — {ind.phrases.slice(0, 3).map(p => `« ${p} »`).join(', ')}</span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* Sidebar passages */}
                <div style={{ position: 'sticky', top: 20 }}>
                  <div style={{ ...card(), padding: '16px 18px' }}>
                    <div style={label}>Navigation des passages</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginTop: 8 }}>
                      {result.passages.map(p => (
                        <button
                          key={p.id}
                          onClick={() => scrollToPassage(p.id)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 9, padding: '8px 10px', borderRadius: 9,
                            border: `1px solid ${activePassage === p.id ? '#4f46e5' : '#e2e8f0'}`,
                            background: activePassage === p.id ? '#eef2ff' : p.label === 'ia' ? '#fef2f2' : p.label === 'mixte' ? '#fffbeb' : '#fff',
                            cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', transition: 'all 0.15s',
                          }}
                        >
                          <div style={{ width: 20, height: 20, borderRadius: 5, background: p.label === 'ia' ? '#dc2626' : p.label === 'mixte' ? '#d97706' : '#e2e8f0', color: p.label !== 'humain' ? '#fff' : '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, flexShrink: 0 }}>
                            {p.id}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 12, color: p.label === 'ia' ? '#dc2626' : p.label === 'mixte' ? '#d97706' : '#64748b', fontWeight: 700 }}>
                              {p.label === 'ia' ? '🤖 Probable IA' : p.label === 'mixte' ? '⚠️ Incertain' : '✍️ Humain'}
                            </div>
                            <div style={{ fontSize: 10, color: '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {p.text.substring(0, 38)}…
                            </div>
                          </div>
                          <span style={{ fontSize: 11, fontWeight: 800, color: p.label === 'ia' ? '#dc2626' : p.label === 'mixte' ? '#d97706' : '#16a34a', flexShrink: 0 }}>{p.score}%</span>
                        </button>
                      ))}
                    </div>

                    {/* Mini résumé */}
                    <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid #f1f5f9' }}>
                      <div style={label}>Résumé des phrases</div>
                      <div style={{ display: 'flex', height: 6, borderRadius: 3, overflow: 'hidden', gap: 0.5, marginTop: 6 }}>
                        {result.sentences.map((s, i) => (
                          <div key={i} style={{ flex: 1, background: s.label === 'ia' ? '#dc2626' : s.label === 'mixte' ? '#d97706' : '#16a34a', minWidth: 2 }} title={`${Math.round(s.prob * 100)}% IA`} />
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: 10, marginTop: 9, fontSize: 11, color: '#64748b', flexWrap: 'wrap' }}>
                        <span style={{ color: '#dc2626', fontWeight: 700 }}>{result.sentences.filter(s => s.label === 'ia').length} IA</span>
                        <span style={{ color: '#d97706', fontWeight: 700 }}>{result.sentences.filter(s => s.label === 'mixte').length} incert.</span>
                        <span style={{ color: '#16a34a', fontWeight: 700 }}>{result.sentences.filter(s => s.label === 'human').length} hum.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ══ TAB STATISTIQUES ══ */}
            {tab === 'stats' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
                  {[
                    { l: 'Mots', v: result.stats.wordCount, c: '#4f46e5', desc: 'Total du texte' },
                    { l: 'Mots uniques', v: result.stats.uniqueWords, c: '#4f46e5', desc: 'Diversité brute' },
                    { l: 'TTR mobile', v: `${result.stats.mTTR}%`, c: result.stats.mTTR < 40 ? '#dc2626' : result.stats.mTTR < 60 ? '#d97706' : '#16a34a', desc: 'Richesse lexicale normalisée' },
                    { l: 'Phrases', v: result.stats.sentenceCount, c: '#4f46e5', desc: 'Phrases détectées' },
                    { l: 'Paragraphes', v: result.stats.paragraphCount, c: '#4f46e5', desc: 'Blocs de texte' },
                    { l: 'Moy. mots/phrase', v: result.stats.avgWordsPerSentence, c: result.stats.avgWordsPerSentence > 25 ? '#dc2626' : result.stats.avgWordsPerSentence > 18 ? '#d97706' : '#16a34a', desc: 'Réf. humaine : 14–18' },
                    { l: 'Écart-type phrases', v: result.stats.stdDev, c: result.stats.stdDev < 5 ? '#dc2626' : result.stats.stdDev < 10 ? '#d97706' : '#16a34a', desc: 'Burstiness (variation naturelle)' },
                    { l: 'Marqueurs forts', v: result.strongMarkers.length, c: result.strongMarkers.length > 4 ? '#dc2626' : result.strongMarkers.length > 2 ? '#d97706' : '#16a34a', desc: 'Expressions IA typiques' },
                    { l: 'Passages suspects', v: result.suspectPassages.length, c: result.suspectPassages.length > 2 ? '#dc2626' : result.suspectPassages.length > 0 ? '#d97706' : '#16a34a', desc: `Sur ${result.passages.length} passages` },
                    { l: 'Score global IA', v: `${result.globalScore}%`, c: scoreColor, desc: 'Score de détection final' },
                  ].map(s => (
                    <div key={s.l} style={{ ...card(), padding: '16px', textAlign: 'center' }}>
                      <div style={{ fontSize: 24, fontWeight: 900, color: s.c }}>{s.v}</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#1e293b', marginTop: 4 }}>{s.l}</div>
                      <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 3, lineHeight: 1.4 }}>{s.desc}</div>
                    </div>
                  ))}
                </div>

                {/* Tableau des critères */}
                <div style={{ ...card(), padding: '20px 22px', overflowX: 'auto' }}>
                  <div style={label}>Tableau des critères</div>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, marginTop: 10 }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                        {['Critère', 'Score', 'Interprétation', 'Poids', 'Détail'].map(h => (
                          <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#94a3b8' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {result.criteria.map((c, i) => {
                        const col = c.score >= 65 ? '#dc2626' : c.score >= 35 ? '#d97706' : '#16a34a'
                        return (
                          <tr key={c.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                            <td style={{ padding: '12px 12px', color: '#1e293b', fontWeight: 600 }}>
                              <span style={{ marginRight: 7 }}>{c.icon}</span>{c.name}
                            </td>
                            <td style={{ padding: '12px 12px' }}>
                              <span style={{ fontSize: 15, fontWeight: 900, color: col }}>{c.score}%</span>
                            </td>
                            <td style={{ padding: '12px 12px' }}>
                              <span style={{ padding: '2px 8px', borderRadius: 8, background: col + '18', color: col, fontSize: 11, fontWeight: 700 }}>
                                {c.score >= 65 ? 'Fort indicateur IA' : c.score >= 35 ? 'Indicateur modéré' : 'Profil humain'}
                              </span>
                            </td>
                            <td style={{ padding: '12px 12px', color: '#64748b', fontSize: 12 }}>{Math.round(c.weight * 100)}%</td>
                            <td style={{ padding: '12px 12px', color: '#94a3b8', fontSize: 11, maxWidth: 260 }}>{c.detail}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{ textAlign: 'center', marginTop: 48, marginBottom: 24, fontSize: 11, color: '#cbd5e1' }}>
        Analyse 100% locale · aucune donnée transmise à des serveurs tiers · résultats indicatifs
      </div>
    </div>
  )
}
