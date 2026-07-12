import { useState, useEffect, useCallback } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'

import Navbar           from '../components/Navbar'
import Sidebar          from '../components/Sidebar'
import WineDetail       from '../components/WineDetail'
import WineForm         from '../components/WineForm'
import CaveView         from '../components/CaveView'
import SommelierForm    from '../components/SommelierForm'
import GuideView        from '../components/GuideView'
import BibliothequeView from '../components/BibliothequeView'
import LandingPage      from '../components/LandingPage'
import OnboardingProfil, { loadProfil } from '../components/OnboardingProfil'
import { removeEnvie } from '../components/Envies'
import { Sparkles }     from 'lucide-react'

const InteractiveMap = dynamic(() => import('../components/InteractiveMap'), { ssr: false })
// Overlays lourds, chargés uniquement à l'ouverture (jamais au premier rendu)
const CeSoirMode     = dynamic(() => import('../components/CeSoirMode'), { ssr: false })
const ScanEtiquette  = dynamic(() => import('../components/ScanEtiquette'), { ssr: false })
const AssistantView  = dynamic(() => import('../components/AssistantView'), { ssr: false })
const CompteSync     = dynamic(() => import('../components/CompteSync'), { ssr: false })
const CaveAmieViewer = dynamic(() => import('../components/CaveAmis').then(m => m.CaveAmieViewer), { ssr: false })

// ─── Vins de démonstration ────────────────────────────────────────────────────
const DEMO_WINES = [
  {
    id:'w1', name:'Gevrey-Chambertin 1er Cru', domain:'Domaine Rossignol-Trapet',
    appellation:'Gevrey-Chambertin', region:'Bourgogne', country:'France',
    type:'red', cepages:['Pinot Noir'], vintage:2019, quantity:6,
    drinkFrom:4, drinkUntil:14, serviceTemp:16, carafage:'45 min',
    estimatedValue:85, rating:17.5,
    foodPairings:['Viande rouge','Gibier','Fromage'],
    notes:'Nez complexe de cerise noire, de sous-bois et d\'épices. Bouche élégante, tanins soyeux.',
  },
  {
    id:'w2', name:'Château Léoville-Barton', domain:'Château Léoville-Barton',
    appellation:'Saint-Julien', region:'Bordeaux', country:'France',
    type:'red', cepages:['Cabernet Sauvignon','Merlot'], vintage:2018,
    quantity:12, drinkFrom:8, drinkUntil:25, serviceTemp:18, carafage:'2h',
    estimatedValue:120, rating:18,
    foodPairings:['Viande rouge','Gibier'],
    notes:'Grand millésime. Cassis, cèdre et graphite. Garde certaine.',
  },
  {
    id:'w3', name:'Meursault Les Charmes', domain:'Domaine Roulot',
    appellation:'Meursault', region:'Bourgogne', country:'France',
    type:'white', cepages:['Chardonnay'], vintage:2020,
    quantity:4, drinkFrom:2, drinkUntil:10, serviceTemp:13, carafage:null,
    estimatedValue:95, rating:18,
    foodPairings:['Poisson','Fruits de mer','Fromage'],
    notes:'Beurre frais, noisette, citron confit. Minéralité omniprésente.',
  },
  {
    id:'w4', name:'Morgon Côte du Py', domain:'Jean Foillard',
    appellation:'Morgon', region:'Beaujolais', country:'France',
    type:'red', cepages:['Gamay'], vintage:2022,
    quantity:6, drinkFrom:1, drinkUntil:8, serviceTemp:15, carafage:null,
    estimatedValue:22, rating:16.5,
    foodPairings:['Charcuterie','Volaille'],
    notes:'Le Beaujolais des sommeliers. Cerise noire éclatante, texture soyeuse.',
  },
  {
    id:'w5', name:'Sancerre La Poussie', domain:'Cordier Père & Fils',
    appellation:'Sancerre', region:'Loire', country:'France',
    type:'white', cepages:['Sauvignon Blanc'], vintage:2022,
    quantity:6, drinkFrom:1, drinkUntil:6, serviceTemp:10, carafage:null,
    estimatedValue:22, rating:15.5,
    foodPairings:['Poisson','Fruits de mer','Fromage'],
    notes:'Vif et tendu. Citron vert, buis, pierre à fusil.',
  },
]

export default function App() {
  const [wines, setWines]             = useState([])
  const [tab, setTab]                 = useState('cave')
  const [ready, setReady]             = useState(false)
  const [showLanding, setShowLanding] = useState(true)
  const [detailWine, setDetailWine]   = useState(null)
  const [showForm, setShowForm]       = useState(false)
  const [editWine, setEditWine]       = useState(null)
  const [showCeSoir, setShowCeSoir]   = useState(false)
  const [showScan, setShowScan]       = useState(false)
  const [showAssistant, setShowAssistant] = useState(false)
  const [profil, setProfil]           = useState(null)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [librarySearch, setLibrarySearch] = useState('')
  const [journalPrefill, setJournalPrefill] = useState(null)
  const [enviePrefill, setEnviePrefill] = useState(null) // « J'ai acheté » depuis la liste d'envies
  const [showCompte, setShowCompte]   = useState(false)
  const [friendCode, setFriendCode]   = useState(null) // ?cave=CODE → cave d'un ami

  useEffect(() => {
    // Lecture robuste : un localStorage corrompu ne doit jamais bloquer l'app
    let saved = null
    try {
      const raw = localStorage.getItem('oenotheque-v2')
      const parsed = raw ? JSON.parse(raw) : null
      if (Array.isArray(parsed)) saved = parsed
    } catch { /* données illisibles : on repart des vins de démo */ }
    setWines(saved || DEMO_WINES)
    const seen = sessionStorage.getItem('landing-seen')
    if (seen) setShowLanding(false)
    setProfil(loadProfil())
    // Lien « cave entre amis » : /?cave=CODE
    const code = new URLSearchParams(window.location.search).get('cave')
    if (code) setFriendCode(code)
    setReady(true)
  }, [])

  const closeFriendCave = useCallback(() => {
    setFriendCode(null)
    // Nettoie l'URL pour ne pas rouvrir la cave au refresh
    window.history.replaceState(null, '', window.location.pathname)
  }, [])

  // Mode global : 'debutant' | 'amateur' | 'expert'
  const mode = profil?.niveau || null

  const completeOnboarding = useCallback((p) => {
    setProfil(p)
    setShowOnboarding(false)
  }, [])

  const redoProfil = useCallback(() => setShowOnboarding(true), [])

  useEffect(() => {
    if (ready) localStorage.setItem('oenotheque-v2', JSON.stringify(wines))
  }, [wines, ready])

  const enterApp = useCallback(() => {
    sessionStorage.setItem('landing-seen', '1')
    setShowLanding(false)
    if (!loadProfil()) setShowOnboarding(true)
  }, [])

  const handleTabChange = useCallback((newTab, searchTerm) => {
    sessionStorage.setItem('landing-seen', '1')
    setShowLanding(false)
    setLibrarySearch(searchTerm || '')
    setTab(newTab)
    if (!loadProfil()) setShowOnboarding(true)
  }, [])

  const openCeSoir = useCallback(() => {
    sessionStorage.setItem('landing-seen', '1')
    setShowLanding(false)
    setShowCeSoir(true)
  }, [])

  const openScan = useCallback(() => {
    sessionStorage.setItem('landing-seen', '1')
    setShowLanding(false)
    setShowScan(true)
  }, [])

  // « Noter cette dégustation » depuis la fiche vin (bibliothèque) ou la carte
  const noterDegustation = useCallback((seed) => {
    sessionStorage.setItem('landing-seen', '1')
    setShowLanding(false)
    setJournalPrefill({ ...seed, _key: Date.now() })
    setTab('cave')
  }, [])

  const saveWine = useCallback(w => {
    setWines(prev =>
      prev.find(x => x.id === w.id)
        ? prev.map(x => x.id === w.id ? w : x)
        : [...prev, w]
    )
    setShowForm(false)
    setEditWine(null)
    // Si l'ajout vient de la liste d'envies, l'envie est honorée : on la retire.
    setEnviePrefill(prev => {
      if (prev?._envieId) removeEnvie(prev._envieId)
      return null
    })
  }, [])

  // « J'ai acheté » depuis la liste d'envies → formulaire d'ajout pré-rempli
  const buyFromEnvie = useCallback(prefill => {
    setEnviePrefill(prefill)
  }, [])

  const deleteWine = useCallback(id => {
    if (!confirm('Supprimer définitivement ce vin de la cave ?')) return
    setWines(prev => prev.filter(w => w.id !== id))
    if (detailWine?.id === id) setDetailWine(null)
  }, [detailWine])

  const editWineHandler = useCallback(w => {
    setDetailWine(null)
    setEditWine(w)
  }, [])

  const updateQty = useCallback((wine, delta) => {
    const newQty = Math.max(0, wine.quantity + delta)
    setWines(prev => prev.map(w => w.id === wine.id ? { ...w, quantity: newQty } : w))
    if (detailWine?.id === wine.id) setDetailWine(prev => ({ ...prev, quantity: newQty }))
  }, [detailWine])

  const total = wines.reduce((s, w) => s + w.quantity, 0)

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#12100e' }}>
        <div className="text-center">
          <div className="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-5 animate-pulse-gold"
               style={{ background: 'linear-gradient(135deg, #8c2f39 0%, #5c0d22 100%)' }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 2h8l1 7H7L8 2z"/>
              <path d="M7 9c0 5.523 4.477 10 5 10s5-4.477 5-10"/>
              <line x1="12" y1="19" x2="12" y2="22"/>
              <line x1="9" y1="22" x2="15" y2="22"/>
            </svg>
          </div>
          <div className="font-serif text-2xl font-bold" style={{ color: '#f5f0e8' }}>Œno</div>
          <div className="text-xs uppercase tracking-[0.25em] mt-2 shimmer-text">Le vin, enfin simple</div>
        </div>
      </div>
    )
  }

  if (showLanding) {
    return (
      <>
        <Head>
          <title>Œno — Le vin, enfin simple</title>
          <meta name="description" content="Vous n'y connaissez rien en vin ? Parfait. Œno traduit l'œnologie en langage humain : plus de 100 vins décodés, quiz de goût, carte des vignobles." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <LandingPage onEnter={enterApp} onTabChange={handleTabChange} onCeSoir={openCeSoir} onScan={openScan} />
        {friendCode && <CaveAmieViewer code={friendCode} onClose={closeFriendCave} />}
        {showCeSoir && (
          <CeSoirMode
            mode={mode}
            onClose={() => setShowCeSoir(false)}
            onOpenBibliotheque={() => handleTabChange('vins')}
          />
        )}
        {showScan && (
          <ScanEtiquette
            onClose={() => setShowScan(false)}
            onAddWine={saveWine}
          />
        )}
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Œno — Le vin, enfin simple</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-dvh bg-cream font-sans lg:pl-64">
        {/* Mobile / tablette : topbar + bottom nav */}
        <Navbar
          tab={tab}
          setTab={setTab}
          total={total}
          mode={mode}
          onProfil={redoProfil}
          onAdd={() => setShowForm(true)}
          onLanding={() => setShowLanding(true)}
          onCeSoir={() => setShowCeSoir(true)}
          onScan={() => setShowScan(true)}
          onCompte={() => setShowCompte(true)}
        />

        {/* Desktop ≥ lg : sidebar fixe noire, signature luxe */}
        <Sidebar
          tab={tab}
          setTab={setTab}
          total={total}
          mode={mode}
          onProfil={redoProfil}
          onAdd={() => setShowForm(true)}
          onLanding={() => setShowLanding(true)}
          onCeSoir={() => setShowCeSoir(true)}
          onScan={() => setShowScan(true)}
          onCompte={() => setShowCompte(true)}
          onAssistant={() => setShowAssistant(true)}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 lg:py-10 pb-24 md:pb-10">
          {tab === 'cave' && (
            <CaveView
              wines={wines}
              onAdd={() => setShowForm(true)}
              onEdit={editWineHandler}
              onDelete={deleteWine}
              onSelect={setDetailWine}
              onUpdateQty={updateQty}
              journalPrefill={journalPrefill}
              onConsumeJournalPrefill={() => setJournalPrefill(null)}
              onBuyEnvie={buyFromEnvie}
              onCompte={() => setShowCompte(true)}
            />
          )}
          {tab === 'vins'      && <BibliothequeView onAddWine={saveWine} mode={mode} initialSearch={librarySearch} onNoter={noterDegustation} />}
          {tab === 'carte'     && <InteractiveMap onAddWine={saveWine} onNoter={noterDegustation} />}
          {tab === 'sommelier' && <SommelierForm onOpenBibliotheque={() => setTab('vins')} />}
          {tab === 'guide'     && <GuideView onAddWine={saveWine} />}
        </main>

        {detailWine && (
          <WineDetail
            wine={detailWine}
            onClose={() => setDetailWine(null)}
            onEdit={editWineHandler}
          />
        )}
        {(showForm || editWine || enviePrefill) && (
          <WineForm
            initial={editWine || enviePrefill || undefined}
            onSave={saveWine}
            onClose={() => { setShowForm(false); setEditWine(null); setEnviePrefill(null) }}
          />
        )}
        {showCeSoir && (
          <CeSoirMode
            mode={mode}
            onClose={() => setShowCeSoir(false)}
            onOpenBibliotheque={() => setTab('vins')}
          />
        )}
        {showScan && (
          <ScanEtiquette
            onClose={() => setShowScan(false)}
            onAddWine={saveWine}
          />
        )}
        {friendCode && <CaveAmieViewer code={friendCode} onClose={closeFriendCave} />}
        {showCompte && <CompteSync onClose={() => setShowCompte(false)} />}
        {showAssistant && <AssistantView onClose={() => setShowAssistant(false)} />}
        {showOnboarding && <OnboardingProfil onComplete={completeOnboarding} />}

        {/* Bulle flottante Assistant Œno */}
        {!showAssistant && (
          <button
            onClick={() => setShowAssistant(true)}
            className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center text-cream shadow-wine-lg hover:scale-110 active:scale-95 transition-all cursor-pointer animate-pulse-gold"
            style={{ background: 'linear-gradient(135deg, #8c2f39, #5c0d22)' }}
            aria-label="Ouvrir l'assistant Œno"
            title="Œno, votre assistant"
          >
            <Sparkles size={22} className="text-gold-400" />
          </button>
        )}
      </div>
    </>
  )
}
