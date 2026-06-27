import { useState, useCallback } from 'react'

// ─── Analyse heuristique ───────────────────────────────────────────────────────
const AI_PHRASES_FR = [
  'il est important de noter','il convient de souligner','en conclusion','en résumé',
  'tout d\'abord','de plus','par ailleurs','en outre','cependant','néanmoins',
  'toutefois','ainsi donc','en effet','il faut noter','il est essentiel',
  'dans ce contexte','à cet égard','il est à noter','il est crucial',
  'dans un premier temps','dans un second temps','pour conclure',
  'en définitive','il va sans dire','force est de constater',
]
const AI_PHRASES_EN = [
  'it is important to note','it should be noted','furthermore','moreover',
  'additionally','in conclusion','in summary','on the other hand',
  'it is worth noting','it is essential','in this context','in this regard',
  'as a result','consequently','therefore','thus','hence',
  'first and foremost','last but not least','to summarize','to conclude',
  'it is crucial','it goes without saying','in light of this',
]

function tokenize(text) {
  return (text.toLowerCase().match(/\b\w+\b/g) || [])
}

function splitSentences(text) {
  const raw = text.match(/[^.!?\n]+[.!?]+(?:\s|$)|[^.!?\n]+$/g) || [text]
  return raw.map(s => s.trim()).filter(s => s.length > 2)
}

function seededRandom(seed) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    return (s >>> 0) / 0xffffffff
  }
}

function analyzeText(text) {
  const sentences = splitSentences(text)
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0)
  const words = tokenize(text)
  const totalWords = words.length
  if (totalWords < 30) return null

  const uniqueWords = new Set(words).size
  const ttr = uniqueWords / totalWords

  // Sentence length stats
  const sentLengths = sentences.map(s => tokenize(s).length)
  const avgLen = sentLengths.reduce((a, b) => a + b, 0) / sentLengths.length
  const variance = sentLengths.reduce((a, b) => a + (b - avgLen) ** 2, 0) / sentLengths.length
  const stdDev = Math.sqrt(variance)

  // Paragraph length regularity
  const paraLengths = paragraphs.map(p => p.length)
  const paraAvg = paraLengths.reduce((a, b) => a + b, 0) / (paraLengths.length || 1)
  const paraVariance = paraLengths.reduce((a, b) => a + (b - paraAvg) ** 2, 0) / (paraLengths.length || 1)

  // AI phrase detection
  const lower = text.toLowerCase()
  const aiPhrases = [...AI_PHRASES_FR, ...AI_PHRASES_EN]
  const matchedPhrases = aiPhrases.filter(p => lower.includes(p))
  const phraseHitRate = matchedPhrases.length / (sentences.length || 1)

  // Punctuation variety
  const expressive = (text.match(/[!?;:—–…«»]/g) || []).length
  const punctRate = expressive / (totalWords || 1)

  // Repetitive sentence starts
  const starts = sentences.map(s => s.split(' ').slice(0, 2).join(' ').toLowerCase())
  const startFreq = {}
  starts.forEach(st => { startFreq[st] = (startFreq[st] || 0) + 1 })
  const repeatStarts = Object.values(startFreq).filter(v => v > 1).reduce((a, b) => a + b, 0)
  const repeatStartRate = repeatStarts / (sentences.length || 1)

  // ── Criteria scores (0-100, higher = more AI indicators) ──
  // Perplexité : low vocabulary diversity → high AI score
  const perplexiteScore = Math.round(Math.max(0, Math.min(100, (1 - ttr * 1.4) * 100)))

  // Uniformité des phrases : low std dev relative to avg → high AI
  const uniformiteScore = Math.round(Math.max(0, Math.min(100, (1 - Math.min(1, stdDev / (avgLen * 0.5))) * 100)))

  // Longueur des phrases : long + regular → high AI
  const longueurScore = Math.round(Math.max(0, Math.min(100, (avgLen - 8) / 22 * 100)))

  // Marqueurs IA : detected phrases → high AI
  const marqueursScore = Math.round(Math.min(100, phraseHitRate * 220))

  // Style & ponctuation : low expressive punct → high AI
  const styleScore = Math.round(Math.max(0, Math.min(100, (1 - Math.min(1, punctRate * 40)) * 100)))

  // Structure paragraphique : very regular paragraphs → high AI
  const structureScore = Math.round(Math.max(0, Math.min(100, (1 - Math.min(1, Math.sqrt(paraVariance) / 300)) * 100)))

  // Répétition stylistique
  const repetitionScore = Math.round(Math.min(100, repeatStartRate * 180))

  const criteria = [
    {
      id: 'perplexite',
      name: 'Perplexité lexicale',
      desc: 'Mesure la prévisibilité et la diversité du vocabulaire. Les textes IA présentent souvent un vocabulaire homogène et prévisible.',
      score: perplexiteScore,
      weight: 0.18,
      icon: '📊',
    },
    {
      id: 'uniformite',
      name: 'Uniformité des phrases',
      desc: 'Analyse la variation de longueur entre les phrases. Les IA produisent des phrases de longueur similaire (faible variation = faible burstiness).',
      score: uniformiteScore,
      weight: 0.20,
      icon: '📏',
    },
    {
      id: 'longueur',
      name: 'Longueur moyenne des phrases',
      desc: 'Les modèles IA tendent à produire des phrases plus longues et plus complexes que la moyenne humaine.',
      score: longueurScore,
      weight: 0.15,
      icon: '📝',
    },
    {
      id: 'marqueurs',
      name: 'Marqueurs stylistiques IA',
      desc: 'Détecte les expressions de transition et formules typiquement utilisées par les modèles de langage (« de plus », « il convient de », « en conclusion »…).',
      score: marqueursScore,
      weight: 0.22,
      icon: '🔍',
    },
    {
      id: 'style',
      name: 'Style & ponctuation',
      desc: 'Les humains utilisent une ponctuation expressive et variée (!, ?, ;, —). Les IA privilégient une ponctuation minimale et neutre.',
      score: styleScore,
      weight: 0.13,
      icon: '✏️',
    },
    {
      id: 'structure',
      name: 'Structure paragraphique',
      desc: 'Les IA produisent souvent des paragraphes de taille très régulière et équilibrée, contrairement à la variation naturelle humaine.',
      score: structureScore,
      weight: 0.08,
    icon: '📄',
    },
    {
      id: 'repetition',
      name: 'Répétitions stylistiques',
      desc: 'Détecte les motifs répétitifs dans les débuts de phrases ou tournures, un marqueur fréquent des textes génératifs.',
      score: repetitionScore,
      weight: 0.04,
      icon: '🔄',
    },
  ]

  const aiScore = Math.round(
    criteria.reduce((sum, c) => sum + c.score * c.weight, 0)
  )

  // Per-sentence analysis
  const rng = seededRandom(text.length * 137 + totalWords)
  const sentenceResults = sentences.map((sent, i) => {
    const sLower = sent.toLowerCase()
    const sWords = tokenize(sent).length
    const hasPhrase = aiPhrases.some(p => sLower.includes(p))
    const isLong = sWords > 28
    const isShort = sWords < 6
    const isVeryRegular = sWords >= 15 && sWords <= 22

    let prob = aiScore / 100 * 0.6 + 0.15
    if (hasPhrase) prob += 0.28
    if (isLong) prob += 0.12
    if (isVeryRegular && !hasPhrase) prob += 0.06
    if (isShort) prob -= 0.15
    prob += (rng() - 0.5) * 0.18
    prob = Math.max(0.04, Math.min(0.96, prob))

    return {
      text: sent,
      prob,
      label: prob > 0.62 ? 'ai' : prob > 0.38 ? 'mixed' : 'human',
    }
  })

  const verdict = aiScore >= 68 ? 'ia' : aiScore >= 38 ? 'mixte' : 'humain'

  return {
    aiScore,
    humanScore: 100 - aiScore,
    sentences: sentenceResults,
    criteria,
    matchedPhrases,
    stats: {
      wordCount: totalWords,
      charCount: text.replace(/\s/g, '').length,
      charWithSpaces: text.length,
      sentenceCount: sentences.length,
      paragraphCount: Math.max(1, paragraphs.length),
      avgWordsPerSentence: Math.round(avgLen * 10) / 10,
      uniqueWords,
      ttr: Math.round(ttr * 100),
      stdDev: Math.round(stdDev * 10) / 10,
    },
    verdict,
  }
}

// ─── Composants SVG ────────────────────────────────────────────────────────────
function DonutGauge({ score }) {
  const radius = 70
  const stroke = 14
  const circumference = 2 * Math.PI * radius
  const filled = (score / 100) * circumference
  const color = score >= 68 ? '#ef4444' : score >= 38 ? '#f59e0b' : '#22c55e'
  const trackColor = 'rgba(255,255,255,0.06)'

  return (
    <svg width={180} height={180} viewBox="0 0 180 180">
      <circle cx={90} cy={90} r={radius} fill="none" stroke={trackColor} strokeWidth={stroke} />
      <circle
        cx={90} cy={90} r={radius}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={`${filled} ${circumference}`}
        strokeLinecap="round"
        transform="rotate(-90 90 90)"
        style={{ transition: 'stroke-dasharray 1s ease, stroke 0.5s ease' }}
      />
      <text x={90} y={84} textAnchor="middle" fill={color} fontSize={28} fontWeight={800} fontFamily="system-ui">
        {score}
      </text>
      <text x={90} y={102} textAnchor="middle" fill="#6b7280" fontSize={11} fontFamily="system-ui">
        % IA
      </text>
    </svg>
  )
}

function ScoreBar({ score, color }) {
  return (
    <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
      <div style={{
        height: '100%',
        width: `${score}%`,
        background: color,
        borderRadius: 3,
        transition: 'width 0.8s ease',
      }} />
    </div>
  )
}

// ─── Page principale ───────────────────────────────────────────────────────────
export default function DetecteurIA() {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [tab, setTab] = useState('resume')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleAnalyze = useCallback(() => {
    if (text.trim().length < 50) {
      setError('Veuillez saisir au moins 50 caractères pour analyser le texte.')
      return
    }
    setError(null)
    setLoading(true)
    setTimeout(() => {
      const res = analyzeText(text)
      if (!res) {
        setError('Texte trop court. Veuillez fournir au moins 30 mots.')
        setLoading(false)
        return
      }
      setResult(res)
      setTab('resume')
      setLoading(false)
    }, 1200)
  }, [text])

  const handleReset = () => {
    setResult(null)
    setText('')
    setError(null)
  }

  const verdictInfo = result ? {
    ia:     { label: 'Probablement généré par IA', color: '#ef4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)', icon: '🤖' },
    mixte:  { label: 'Contenu mixte (IA + humain)', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', icon: '⚠️' },
    humain: { label: 'Probablement rédigé par un humain', color: '#22c55e', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.3)', icon: '✍️' },
  }[result.verdict] : null

  const getCriteriaColor = (score) =>
    score >= 68 ? '#ef4444' : score >= 38 ? '#f59e0b' : '#22c55e'

  const getSentenceStyle = (label) => {
    if (label === 'ai') return { background: 'rgba(239,68,68,0.13)', borderBottom: '2px solid rgba(239,68,68,0.5)', color: '#fca5a5' }
    if (label === 'mixed') return { background: 'rgba(245,158,11,0.1)', borderBottom: '2px solid rgba(245,158,11,0.4)', color: '#fde68a' }
    return { background: 'rgba(34,197,94,0.06)', borderBottom: '2px solid rgba(34,197,94,0.3)', color: '#bbf7d0' }
  }

  const base = {
    minHeight: '100vh',
    background: 'linear-gradient(160deg, #0e0e16 0%, #0a0a10 100%)',
    color: '#e8e0d5',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    padding: '0 0 60px',
  }

  const card = {
    background: 'linear-gradient(145deg, #1a1a24, #111118)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 16,
    padding: 22,
  }

  const tabBtn = (active) => ({
    padding: '9px 20px',
    borderRadius: 9,
    border: 'none',
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 600,
    fontFamily: 'inherit',
    background: active ? 'rgba(99,102,241,0.2)' : 'transparent',
    color: active ? '#a5b4fc' : '#6b7280',
    transition: 'all 0.15s',
  })

  return (
    <div style={base}>
      {/* ── Header ── */}
      <div style={{ background: 'linear-gradient(180deg, #13131e 0%, #0e0e16 100%)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '20px 0' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
              🤖
            </div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 800, color: '#e8e0d5', letterSpacing: '-0.02em' }}>Détecteur IA</div>
              <div style={{ fontSize: 11, color: '#6b7280' }}>Analyse heuristique de contenu généré par intelligence artificielle</div>
            </div>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#6b7280', textDecoration: 'none', padding: '6px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
            ← Retour
          </a>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 24px 0' }}>

        {/* ── Zone de saisie ── */}
        {!result && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <h1 style={{ fontSize: 28, fontWeight: 900, color: '#e8e0d5', margin: '0 0 10px', letterSpacing: '-0.03em' }}>
                Analysez votre texte
              </h1>
              <p style={{ fontSize: 14, color: '#6b7280', maxWidth: 520, margin: '0 auto', lineHeight: 1.6 }}>
                Collez ou saisissez un texte pour détecter s'il a été généré par une intelligence artificielle.
                L'analyse est basée sur 7 critères heuristiques.
              </p>
            </div>

            <div style={{ ...card, marginBottom: 16 }}>
              <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Collez votre texte ici (minimum 30 mots)…"
                style={{
                  width: '100%', minHeight: 280, background: 'transparent',
                  border: 'none', outline: 'none', resize: 'vertical',
                  color: '#e8e0d5', fontSize: 15, lineHeight: 1.7,
                  fontFamily: 'inherit', boxSizing: 'border-box',
                }}
              />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontSize: 12, color: '#4b5563' }}>
                  {text.trim() ? `${tokenize(text).length} mots · ${text.length} caractères` : 'Aucun texte'}
                </span>
                <div style={{ display: 'flex', gap: 10 }}>
                  {text && (
                    <button onClick={() => setText('')} style={{ padding: '9px 16px', borderRadius: 9, border: '1px solid rgba(255,255,255,0.09)', background: 'transparent', color: '#6b7280', cursor: 'pointer', fontSize: 13, fontFamily: 'inherit' }}>
                      Effacer
                    </button>
                  )}
                  <button
                    onClick={handleAnalyze}
                    disabled={loading || text.trim().length < 10}
                    style={{
                      padding: '9px 24px', borderRadius: 9, border: 'none',
                      background: loading || text.trim().length < 10
                        ? 'rgba(99,102,241,0.3)'
                        : 'linear-gradient(135deg, #6366f1, #7c3aed)',
                      color: loading || text.trim().length < 10 ? '#6b7280' : '#fff',
                      cursor: loading || text.trim().length < 10 ? 'not-allowed' : 'pointer',
                      fontSize: 14, fontWeight: 700, fontFamily: 'inherit',
                      transition: 'all 0.15s',
                    }}
                  >
                    {loading ? 'Analyse en cours…' : 'Analyser le texte'}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', color: '#fca5a5', fontSize: 13 }}>
                {error}
              </div>
            )}

            {/* Légende critères */}
            <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
              {[
                { icon: '📊', name: 'Perplexité lexicale', desc: 'Diversité et prévisibilité du vocabulaire' },
                { icon: '📏', name: 'Uniformité des phrases', desc: 'Variation de la longueur des phrases (burstiness)' },
                { icon: '🔍', name: 'Marqueurs IA', desc: 'Expressions de transition et formules typiques' },
                { icon: '✏️', name: 'Style & ponctuation', desc: 'Richesse expressive de la ponctuation' },
                { icon: '📝', name: 'Longueur des phrases', desc: 'Longueur moyenne vs profil humain' },
                { icon: '📄', name: 'Structure paragraphique', desc: 'Régularité de la structure des paragraphes' },
                { icon: '🔄', name: 'Répétitions stylistiques', desc: 'Motifs répétitifs dans les débuts de phrases' },
              ].map(c => (
                <div key={c.name} style={{ display: 'flex', gap: 11, padding: '12px 14px', borderRadius: 11, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#c9bfb5', marginBottom: 3 }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: '#4b5563', lineHeight: 1.5 }}>{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Résultats ── */}
        {result && (
          <div>
            {/* Barre supérieure résultats */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: '#e8e0d5', margin: 0, letterSpacing: '-0.02em' }}>Rapport d'analyse</h2>
                <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>
                  {result.stats.wordCount} mots · {result.stats.sentenceCount} phrases · {result.stats.paragraphCount} paragraphe{result.stats.paragraphCount > 1 ? 's' : ''}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 9 }}>
                <button
                  onClick={handleReset}
                  style={{ padding: '9px 16px', borderRadius: 9, border: '1px solid rgba(255,255,255,0.09)', background: 'transparent', color: '#9ca3af', cursor: 'pointer', fontSize: 13, fontFamily: 'inherit' }}
                >
                  ← Nouveau texte
                </button>
              </div>
            </div>

            {/* Score global + verdict */}
            <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 16, marginBottom: 20 }}>
              {/* Donut */}
              <div style={{ ...card, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                <DonutGauge score={result.aiScore} />
                <div style={{ fontSize: 11, color: '#6b7280', textAlign: 'center', marginTop: -4 }}>Score de détection IA</div>
              </div>

              {/* Verdict + barre humain/IA */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ ...card, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  {/* Verdict */}
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 9, padding: '10px 16px',
                    borderRadius: 10, background: verdictInfo.bg, border: `1px solid ${verdictInfo.border}`,
                    marginBottom: 18,
                  }}>
                    <span style={{ fontSize: 20 }}>{verdictInfo.icon}</span>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 800, color: verdictInfo.color }}>{verdictInfo.label}</div>
                      <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>
                        Niveau de confiance : {result.aiScore >= 85 || result.aiScore <= 15 ? 'élevé' : result.aiScore >= 68 || result.aiScore <= 32 ? 'modéré' : 'faible'}
                      </div>
                    </div>
                  </div>

                  {/* Jauge humain vs IA */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7, fontSize: 12 }}>
                      <span style={{ color: '#22c55e', fontWeight: 700 }}>✍️ Humain — {result.humanScore}%</span>
                      <span style={{ color: '#ef4444', fontWeight: 700 }}>{result.aiScore}% — IA 🤖</span>
                    </div>
                    <div style={{ height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.06)', overflow: 'hidden', display: 'flex' }}>
                      <div style={{ height: '100%', width: `${result.humanScore}%`, background: 'linear-gradient(90deg, #22c55e, #16a34a)', transition: 'width 1s ease' }} />
                      <div style={{ height: '100%', width: `${result.aiScore}%`, background: 'linear-gradient(90deg, #f59e0b, #ef4444)', transition: 'width 1s ease' }} />
                    </div>
                  </div>

                  {/* Mini stats */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 16 }}>
                    {[
                      { v: result.stats.wordCount, l: 'Mots' },
                      { v: result.stats.sentenceCount, l: 'Phrases' },
                      { v: `${result.stats.avgWordsPerSentence}`, l: 'Mots/phrase' },
                    ].map(s => (
                      <div key={s.l} style={{ textAlign: 'center', padding: '10px 6px', borderRadius: 9, background: 'rgba(255,255,255,0.03)' }}>
                        <div style={{ fontSize: 18, fontWeight: 800, color: '#a5b4fc' }}>{s.v}</div>
                        <div style={{ fontSize: 10, color: '#6b7280', marginTop: 2 }}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 16, background: 'rgba(255,255,255,0.03)', borderRadius: 11, padding: 4, width: 'fit-content' }}>
              {[
                { id: 'resume', label: 'Résumé' },
                { id: 'analyse', label: 'Texte annoté' },
                { id: 'stats', label: 'Statistiques' },
              ].map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} style={tabBtn(tab === t.id)}>
                  {t.label}
                </button>
              ))}
            </div>

            {/* ── Tab Résumé ── */}
            {tab === 'resume' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={card}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 18 }}>
                    Critères d'analyse détaillés
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {result.criteria.map(c => {
                      const col = getCriteriaColor(c.score)
                      return (
                        <div key={c.id}>
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 8 }}>
                            <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{c.icon}</span>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: '#e8e0d5' }}>{c.name}</div>
                                <div style={{ fontSize: 15, fontWeight: 800, color: col, marginLeft: 12, flexShrink: 0 }}>{c.score}%</div>
                              </div>
                              <div style={{ fontSize: 11, color: '#6b7280', lineHeight: 1.55, marginBottom: 8 }}>{c.desc}</div>
                              <ScoreBar score={c.score} color={col} />
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Phrases détectées */}
                {result.matchedPhrases.length > 0 && (
                  <div style={card}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 14 }}>
                      Marqueurs IA détectés ({result.matchedPhrases.length})
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                      {result.matchedPhrases.map(p => (
                        <span key={p} style={{ padding: '4px 11px', borderRadius: 20, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', fontSize: 12, color: '#fca5a5' }}>
                          «&nbsp;{p}&nbsp;»
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Interprétation */}
                <div style={{ ...card, borderLeft: `3px solid ${verdictInfo.color}` }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>Interprétation</div>
                  <p style={{ fontSize: 13, color: '#c9bfb5', lineHeight: 1.7, margin: 0 }}>
                    {result.verdict === 'ia' && `Ce texte présente un score IA de ${result.aiScore}%, ce qui indique qu'il a très probablement été généré (en tout ou en partie) par un modèle de langage. Les principaux indicateurs sont : ${result.criteria.filter(c => c.score > 60).map(c => c.name.toLowerCase()).join(', ')}.`}
                    {result.verdict === 'mixte' && `Ce texte présente un score IA de ${result.aiScore}%, suggérant un contenu mixte, possiblement co-rédigé ou partiellement remanié. Certains passages semblent générés par IA, d'autres présentent des caractéristiques humaines.`}
                    {result.verdict === 'humain' && `Ce texte présente un score IA de ${result.aiScore}%, suggérant qu'il a très probablement été rédigé par un humain. Le style, la variation des phrases et le vocabulaire correspondent à un profil d'écriture naturelle.`}
                  </p>
                  <div style={{ fontSize: 11, color: '#4b5563', marginTop: 12, padding: '8px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.02)' }}>
                    ⚠️ Cette analyse est basée sur des heuristiques statistiques. Elle ne constitue pas une preuve définitive. Un résultat négatif n'exclut pas l'usage de l'IA et vice-versa.
                  </div>
                </div>
              </div>
            )}

            {/* ── Tab Texte annoté ── */}
            {tab === 'analyse' && (
              <div>
                {/* Légende */}
                <div style={{ display: 'flex', gap: 14, marginBottom: 16, flexWrap: 'wrap' }}>
                  {[
                    { color: 'rgba(239,68,68,0.2)', border: 'rgba(239,68,68,0.5)', label: 'Probable IA (> 62%)', dot: '#ef4444' },
                    { color: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.4)', label: 'Incertain (38–62%)', dot: '#f59e0b' },
                    { color: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.3)', label: 'Probable humain (< 38%)', dot: '#22c55e' },
                  ].map(l => (
                    <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: '#9ca3af' }}>
                      <div style={{ width: 14, height: 4, borderRadius: 2, background: l.dot }} />
                      {l.label}
                    </div>
                  ))}
                </div>

                <div style={{ ...card }}>
                  <div style={{ fontSize: 15, lineHeight: 2, color: '#c9bfb5' }}>
                    {result.sentences.map((s, i) => {
                      const st = getSentenceStyle(s.label)
                      return (
                        <span
                          key={i}
                          title={`Score IA : ${Math.round(s.prob * 100)}%`}
                          style={{
                            ...st,
                            display: 'inline',
                            padding: '1px 3px',
                            marginRight: 3,
                            borderRadius: 3,
                            cursor: 'help',
                          }}
                        >
                          {s.text}
                        </span>
                      )
                    })}
                  </div>

                  {/* Barre de résumé des phrases */}
                  <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 10 }}>Répartition des phrases par niveau de détection</div>
                    <div style={{ display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden', gap: 1 }}>
                      {result.sentences.map((s, i) => (
                        <div
                          key={i}
                          style={{
                            flex: 1,
                            background: s.label === 'ai' ? '#ef4444' : s.label === 'mixed' ? '#f59e0b' : '#22c55e',
                            borderRadius: 1,
                          }}
                          title={`Phrase ${i + 1} — ${Math.round(s.prob * 100)}% IA`}
                        />
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 11, color: '#4b5563' }}>
                      <span>{result.sentences.filter(s => s.label === 'ai').length} phrases IA · {result.sentences.filter(s => s.label === 'mixed').length} incertaines · {result.sentences.filter(s => s.label === 'human').length} humaines</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── Tab Statistiques ── */}
            {tab === 'stats' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 }}>
                {[
                  { label: 'Mots', value: result.stats.wordCount, desc: 'Nombre total de mots', color: '#a5b4fc' },
                  { label: 'Mots uniques', value: result.stats.uniqueWords, desc: 'Diversité du vocabulaire', color: '#a5b4fc' },
                  { label: 'Ratio TTR', value: `${result.stats.ttr}%`, desc: 'Richesse lexicale (mots uniques / total)', color: result.stats.ttr < 40 ? '#ef4444' : result.stats.ttr < 60 ? '#f59e0b' : '#22c55e' },
                  { label: 'Caractères', value: result.stats.charWithSpaces, desc: 'Avec espaces', color: '#94a3b8' },
                  { label: 'Phrases', value: result.stats.sentenceCount, desc: 'Phrases détectées', color: '#a5b4fc' },
                  { label: 'Paragraphes', value: result.stats.paragraphCount, desc: 'Blocs de texte', color: '#a5b4fc' },
                  { label: 'Mots/phrase', value: result.stats.avgWordsPerSentence, desc: `Moy. humaine : 14–18 mots`, color: result.stats.avgWordsPerSentence > 25 ? '#ef4444' : result.stats.avgWordsPerSentence > 18 ? '#f59e0b' : '#22c55e' },
                  { label: 'Écart-type', value: result.stats.stdDev, desc: 'Variation longueur phrases (burstiness)', color: result.stats.stdDev < 5 ? '#ef4444' : result.stats.stdDev < 10 ? '#f59e0b' : '#22c55e' },
                  { label: 'Score IA', value: `${result.aiScore}%`, desc: 'Score global de détection', color: getCriteriaColor(result.aiScore) },
                  { label: 'Marqueurs IA', value: result.matchedPhrases.length, desc: 'Expressions typiquement IA détectées', color: result.matchedPhrases.length > 5 ? '#ef4444' : result.matchedPhrases.length > 2 ? '#f59e0b' : '#22c55e' },
                ].map(s => (
                  <div key={s.label} style={{ ...card, textAlign: 'center' }}>
                    <div style={{ fontSize: 26, fontWeight: 900, color: s.color, marginBottom: 4 }}>{s.value}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#e8e0d5', marginBottom: 4 }}>{s.label}</div>
                    <div style={{ fontSize: 11, color: '#4b5563', lineHeight: 1.5 }}>{s.desc}</div>
                  </div>
                ))}

                {/* Tableau critères */}
                <div style={{ ...card, gridColumn: '1 / -1' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 16 }}>
                    Détail des scores par critère
                  </div>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead>
                      <tr>
                        {['Critère', 'Score', 'Interprétation', 'Poids'].map(h => (
                          <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: '#6b7280', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {result.criteria.map((c, i) => {
                        const col = getCriteriaColor(c.score)
                        return (
                          <tr key={c.id} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                            <td style={{ padding: '10px 12px', color: '#c9bfb5', display: 'flex', alignItems: 'center', gap: 8 }}>
                              <span>{c.icon}</span> {c.name}
                            </td>
                            <td style={{ padding: '10px 12px', color: col, fontWeight: 800 }}>{c.score}%</td>
                            <td style={{ padding: '10px 12px', color: '#6b7280', fontSize: 12 }}>
                              {c.score >= 68 ? 'Indicateur IA fort' : c.score >= 38 ? 'Indicateur modéré' : 'Profil humain'}
                            </td>
                            <td style={{ padding: '10px 12px', color: '#4b5563', fontSize: 12 }}>{Math.round(c.weight * 100)}%</td>
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

      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: 60, fontSize: 11, color: '#374151' }}>
        Analyse heuristique — résultats indicatifs — aucune donnée transmise à des serveurs tiers
      </div>
    </div>
  )
}
