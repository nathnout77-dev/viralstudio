import { useState, useEffect, useCallback, useMemo } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { FournisseurCave } from '../lib/cave'

import Navbar           from '../components/Navbar'
import Sidebar          from '../components/Sidebar'
import WineDetail       from '../components/WineDetail'
import WineForm         from '../components/WineForm'
import CaveView         from '../components/CaveView'
import BibliothequeView from '../components/BibliothequeView'
import LandingPage      from '../components/LandingPage'
import HubGuide         from '../components/HubGuide'
import FilAriane        from '../components/FilAriane'
import ParcoursVin      from '../components/ParcoursVin'
import ParcoursApprendre from '../components/ParcoursApprendre'
import ParcoursExplorer from '../components/ParcoursExplorer'
import MenuGrille       from '../components/MenuGrille'
import OnboardingProfil, { loadProfil } from '../components/OnboardingProfil'
import { removeEnvie } from '../components/Envies'
import { toast } from '../components/Toast'
import { normaliser } from '../data/aromes'
import { WINE_DB_TERROIR } from '../data/wineDatabase'
import useSwipeNav from '../lib/useSwipeNav'
import { lireReglages } from '../lib/reglages'
import { estVinDemo, approprier, caveEncoreDemo } from '../lib/demo'

// Ordre des onglets pour la navigation par glissement (mobile). Il reprend
// EXACTEMENT l'ordre visible dans la barre du bas (Découvrir · Trouver · Scan ·
// Ma cave), Scan étant une fenêtre et non une vue : glisser vers la gauche mène
// à l'onglet de gauche, ce que l'utilisateur voit à l'écran.
const SWIPE_ORDER = ['decouvrir', 'trouver', 'cave']
import { Sparkles, NotebookPen, Wine as WineIcon, X } from 'lucide-react'

const InteractiveMap = dynamic(() => import('../components/InteractiveMap'), { ssr: false })
// Overlays lourds, chargés uniquement à l'ouverture (jamais au premier rendu)
const CeSoirMode     = dynamic(() => import('../components/CeSoirMode'), { ssr: false })
const ScanEtiquette  = dynamic(() => import('../components/ScanEtiquette'), { ssr: false })
const AssistantView  = dynamic(() => import('../components/AssistantView'), { ssr: false })
const CompteSync     = dynamic(() => import('../components/CompteSync'), { ssr: false })
const CaveAmieViewer = dynamic(() => import('../components/CaveAmis').then(m => m.CaveAmieViewer), { ssr: false })
const RechercheRapide = dynamic(() => import('../components/RechercheRapide'), { ssr: false })
const TourGuide       = dynamic(() => import('../components/TourGuide'), { ssr: false })
const DecouvrirSwipe  = dynamic(() => import('../components/DecouvrirSwipe'), { ssr: false })
const SommelierForm   = dynamic(() => import('../components/SommelierForm'), { ssr: false })
const GuideView       = dynamic(() => import('../components/GuideView'), { ssr: false })
const FicheVin        = dynamic(() => import('../components/BibliothequeView').then(m => m.FicheVin), { ssr: false })
// Le social ne sert qu'aux comptes connectés : inutile de le charger au démarrage.
const SocialView      = dynamic(() => import('../components/SocialView'), { ssr: false })
// La présentation embarque les chiffres de la base nationale : à la demande.
const PitchOeno       = dynamic(() => import('../components/PitchOeno'), { ssr: false })
const AvatarEditeur   = dynamic(() => import('../components/AvatarProfil'), { ssr: false })
const Reglages        = dynamic(() => import('../components/Reglages'), { ssr: false })
// Veille des messages d'amis : aucun rendu, mais elle doit tourner en
// permanence — c'est elle qui notifie quand un ami écrit, quel que soit l'écran.
const VeilleMessages  = dynamic(() => import('../components/VeilleMessages'), { ssr: false })

// Étapes de la visite guidée (premier lancement mobile) : chaque étape éclaire
// un vrai bouton de l'écran et explique sa fonction.
const TOUR_KEY = 'oeno-tour-v1'
const TOUR_STEPS = [
  { title: 'Bienvenue dans Œno 🍷', text: "Voici votre cave. En quelques secondes, on vous montre l'essentiel — vous pourrez passer quand vous voulez." },
  { selector: '[data-tour="cave"]',      placement: 'top',    title: '🍾 Ma cave',              text: 'Vos bouteilles, vos dégustations et vos envies vivent ici. C’est votre point de départ.' },
  { selector: '[data-tour="ajouter"]',   placement: 'bottom', title: '➕ Ajouter un vin',       text: 'Cherchez un vin ou scannez-le : sa fiche complète se remplit toute seule.' },
  { selector: '[data-tour="scan"]',      placement: 'top',    title: '📷 Scanner une étiquette', text: 'En rayon ? Photographiez l’étiquette : Œno décode le vin, même inconnu, et le garde pour vous.' },
  { selector: '[data-tour="trouver"]',   placement: 'top',    title: '🔍 Trouver un vin',       text: 'Quoi boire ce soir, pour un plat, un budget… deux questions et Œno vous guide.' },
  { selector: '[data-tour="menu"]',      placement: 'top',    title: '🧭 Tout Œno',             text: 'Bibliothèque, carte des vignobles, école du vin… tout le reste est dans ce menu.' },
  { selector: '[data-tour="assistant"]', placement: 'top',    title: '✨ Votre sommelier Œno',  text: 'Une question sur le vin ? Œno répond à tout moment, en langage simple.' },
]

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
// `demo: true` n'est pas décoratif : c'est lui qui empêche ces bouteilles de
// partir dans le cloud et de se faire passer pour la cave de quelqu'un.
].map(v => ({ ...v, demo: true }))

// Intitulés du fil d'Ariane pour chaque parcours (le hub n'en a pas)
const VUES = {
  decouvrir: { titre: '🍷 Découvrir',              sousTitre: 'Glissez, gardez ce qui vous plaît' },
  trouver:   { titre: '🔍 Trouver un vin',        sousTitre: 'On vous guide en 2 questions' },
  cave:      { titre: '🍾 Ma cave',                sousTitre: 'Bouteilles, dégustations, envies' },
  social:    { titre: '👥 Mes amis',               sousTitre: 'Caves partagées et discussions' },
  vins:      { titre: '📚 La bibliothèque',        sousTitre: `${WINE_DB_TERROIR.length} vins décodés` },
  explorer:  { titre: '🗺️ Explorer les régions',   sousTitre: 'Carte, routes des vins, domaines' },
  apprendre: { titre: '🎓 Apprendre',              sousTitre: 'Votre parcours du vin' },
  carte:     { titre: '🗺️ Carte des vignobles',    sousTitre: 'Accès direct' },
  sommelier: { titre: '🍷 Sommelier',              sousTitre: 'Goût-o-mètre · Budget · Dîner' },
  guide:     { titre: '📖 Guide complet',          sousTitre: 'Accords, millésimes, actualité…' },
}

export default function App() {
  const [wines, setWines]             = useState([])
  const [view, setView]               = useState('hub')
  const [ready, setReady]             = useState(false)
  const [showLanding, setShowLanding] = useState(true)
  const [detailWine, setDetailWine]   = useState(null)
  const [showForm, setShowForm]       = useState(false)
  const [editWine, setEditWine]       = useState(null)
  const [showCeSoir, setShowCeSoir]   = useState(false)
  const [showScan, setShowScan]       = useState(false)
  const [showAssistant, setShowAssistant] = useState(false)
  const [amiOuvert, setAmiOuvert]     = useState(null) // conversation Social ouverte (id de l'ami) : masque la bulle assistante et ses notifications
  const [amiCible, setAmiCible]       = useState(null) // ami à ouvrir d'emblée (clic sur une notification)
  const [showMenu, setShowMenu]       = useState(false)
  const [showRecherche, setShowRecherche] = useState(false)
  const [profil, setProfil]           = useState(null)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [librarySearch, setLibrarySearch] = useState('')
  const [journalPrefill, setJournalPrefill] = useState(null)
  const [enviePrefill, setEnviePrefill] = useState(null) // « J'ai acheté » depuis la liste d'envies
  const [showCompte, setShowCompte]   = useState(false)
  const [showPitch, setShowPitch]     = useState(false) // « Œno, c'est quoi ? »
  const [showAvatar, setShowAvatar]   = useState(false) // éditeur de photo de profil
  const [showReglages, setShowReglages] = useState(false) // thème, taille, son, écran d'ouverture
  const [friendCode, setFriendCode]   = useState(null) // ?cave=CODE → cave d'un ami
  const [nextStep, setNextStep]       = useState(null) // guidage : prochaine étape après un ajout
  const [showTour, setShowTour]       = useState(false) // visite guidée premier lancement mobile
  const [ficheVin, setFicheVin]       = useState(null)  // fiche ouverte depuis l'écran Découvrir

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
    const params = new URLSearchParams(window.location.search)
    const code = params.get('cave')
    if (code) setFriendCode(code)
    // Raccourcis écran d'accueil (manifest shortcuts) : /?action=scan | cesoir | recherche
    const action = params.get('action')
    if (action === 'scan' || action === 'cesoir' || action === 'recherche') {
      sessionStorage.setItem('landing-seen', '1')
      setShowLanding(false)
      if (action === 'scan') setShowScan(true)
      else if (action === 'recherche') setShowRecherche(true)
      else setShowCeSoir(true)
      window.history.replaceState(null, '', window.location.pathname)
    }
    // Notification « un ami vous a écrit » ouverte app entièrement fermée :
    // /?ami=<id> nous amène droit sur la bonne conversation.
    const ami = params.get('ami')
    if (ami) {
      sessionStorage.setItem('landing-seen', '1')
      setShowLanding(false)
      setAmiCible(ami)
      setView('social')
      window.history.replaceState(null, '', window.location.pathname)
    }
    // Sur mobile, on saute l'écran d'intro (landing) et on entre directement
    // dans l'app, sur Ma cave (le hub reste accessible via « Accueil »). Les
    // raccourcis d'accueil (?action=) et les liens cave d'ami gardent la main.
    if (window.innerWidth < 768 && !code) {
      sessionStorage.setItem('landing-seen', '1')
      setShowLanding(false)
      if (!action && !ami) setView(lireReglages().ecranDepart || 'cave')
      // Nouveau visiteur sans profil : on propose l'onboarding tout de suite.
      if (!loadProfil()) setShowOnboarding(true)
    }
    setReady(true)
  }, [])

  // Visite guidée : premier lancement mobile, une seule fois. Se déclenche une
  // fois l'écran d'accueil (landing) passé, quand la bottom nav est à l'écran.
  useEffect(() => {
    if (!ready || showLanding) return
    if (typeof window === 'undefined' || window.innerWidth >= 768) return
    try { if (!localStorage.getItem(TOUR_KEY)) setShowTour(true) } catch { /* stockage indispo : pas de visite */ }
  }, [ready, showLanding])

  const fermerTour = useCallback(() => {
    setShowTour(false)
    // On marque aussi le tour du hub comme vu : pas de double tutoriel.
    try { localStorage.setItem(TOUR_KEY, '1'); localStorage.setItem('oeno-hub-tour', '1') } catch { /* ignore */ }
  }, [])

  // Clic sur une notification alors que l'app tourne déjà : le service worker
  // remet l'onglet au premier plan et nous dit quelle conversation ouvrir.
  useEffect(() => {
    if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return
    const surMessage = e => {
      if (e.data?.type !== 'oeno-ouvrir-discussion') return
      sessionStorage.setItem('landing-seen', '1')
      setShowLanding(false)
      if (e.data.amiId) setAmiCible(e.data.amiId)
      setView('social')
    }
    navigator.serviceWorker.addEventListener('message', surMessage)
    return () => navigator.serviceWorker.removeEventListener('message', surMessage)
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
    setView('hub')
    if (!loadProfil()) setShowOnboarding(true)
  }, [])

  // Navigation générale — utilisée par le hub, la landing, le menu grille…
  const goTo = useCallback((newView, searchTerm) => {
    sessionStorage.setItem('landing-seen', '1')
    setShowLanding(false)
    setLibrarySearch(searchTerm || '')
    setView(newView)
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
    setNextStep(null)
    setJournalPrefill({ ...seed, _key: Date.now() })
    setView('cave')
  }, [])

  const saveWine = useCallback(w => {
    setWines(prev => {
      const connu = prev.find(x => x.id === w.id)
      // Une bouteille qu'on modifie devient la sienne : on lui retire sa
      // marque de démonstration plutôt que de la voir s'effacer plus tard.
      if (connu) return prev.map(x => x.id === w.id ? approprier(w) : x)
      // Premier vin bien à soi : les bouteilles d'exemple ont fini leur
      // office. Les garder mêlerait pour toujours du décor à une vraie cave.
      return [...prev.filter(x => !estVinDemo(x)), w]
    })
    setShowForm(false)
    setEditWine(null)
    toast('Enregistré dans votre cave')
    // Guidage : proposer la prochaine étape naturelle après un ajout
    setNextStep({ type: 'vin-ajoute', wine: w })
    // Si l'ajout vient de la liste d'envies, l'envie est honorée : on la retire.
    setEnviePrefill(prev => {
      if (prev?._envieId) removeEnvie(prev._envieId)
      return null
    })
  }, [])

  // Ce que la fiche d'un vin peut faire, où qu'elle s'ouvre (lib/cave.js).
  // Mémorisé : le contexte re-rendrait sinon tous ses lecteurs à chaque frappe.
  const capacitesCave = useMemo(
    () => ({ ranger: saveWine, noter: noterDegustation }),
    [saveWine, noterDegustation],
  )

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

  // Étoile « préféré » sur un vin de la cave, persisté dans oenotheque-v2
  const toggleFavori = useCallback((wine) => {
    setWines(prev => prev.map(w => w.id === wine.id ? { ...w, favori: !w.favori } : w))
    if (detailWine?.id === wine.id) setDetailWine(prev => ({ ...prev, favori: !prev.favori }))
  }, [detailWine])

  // Pont Mémoires de Vin → Préférés : une note ≥ 4 grappes sur un vin en cave
  // marque automatiquement ce vin comme favori (matching appellation / nom).
  const markFavoriFromNote = useCallback((entry) => {
    if (!entry || (entry.note || 0) < 4) return
    const nname = normaliser(entry.name)
    if (!nname) return
    const match = wines.find(w =>
      !w.favori && (normaliser(w.appellation) === nname || normaliser(w.name) === nname)
    )
    if (!match) return
    setWines(prev => prev.map(w => w.id === match.id ? { ...w, favori: true } : w))
    toast('Ajouté à vos préférés ⭐')
  }, [wines])

  const total = wines.reduce((s, w) => s + w.quantity, 0)
  // Cave encore entièrement composée d'exemples : rien n'appartient au visiteur.
  const caveDemo = caveEncoreDemo(wines)
  const ariane = VUES[view]

  // Glissement horizontal entre onglets (mobile). Désactivé pendant la landing
  // et dès qu'un overlay/fiche est ouvert : le geste ne doit agir que sur la
  // vue principale.
  const overlayOuvert = showLanding || showCeSoir || showScan || showAssistant ||
    showMenu || showRecherche || showCompte || showForm || showOnboarding || showAvatar || showReglages ||
    !!detailWine || !!editWine || !!enviePrefill || !!friendCode || !!ficheVin
  // Sur « Découvrir », le glissement horizontal appartient aux cartes : la
  // navigation entre onglets par swipe se met en retrait pour ne pas voler le geste.
  useSwipeNav({
    order: SWIPE_ORDER,
    current: view,
    onNavigate: goTo,
    enabled: !overlayOuvert && view !== 'decouvrir',
  })

  // Indice unique (tactile) : faire découvrir le glissement entre onglets.
  useEffect(() => {
    if (!ready || overlayOuvert) return
    if (typeof window === 'undefined' || !('ontouchstart' in window)) return
    try {
      if (localStorage.getItem('oeno-swipe-hint')) return
      localStorage.setItem('oeno-swipe-hint', '1')
      const t = setTimeout(() => toast('👆 Astuce : glissez vers l’onglet voulu — ← ou →'), 1200)
      return () => clearTimeout(t)
    } catch { /* stockage indisponible */ }
  }, [ready, overlayOuvert])

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
          <meta name="description" content="Vous n'y connaissez rien en vin ? Parfait. Œno traduit l'œnologie en langage humain : plus de 250 vins décodés, quiz de goût, carte des vignobles." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <LandingPage onEnter={enterApp} onTabChange={goTo} onCeSoir={openCeSoir} onScan={openScan} />
        {friendCode && <CaveAmieViewer code={friendCode} onClose={closeFriendCave} />}
        {showCeSoir && (
          <CeSoirMode
            mode={mode}
            onClose={() => setShowCeSoir(false)}
            onOpenBibliotheque={() => goTo('vins')}
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
    <FournisseurCave value={capacitesCave}>
      <Head>
        <title>Œno — Le vin, enfin simple</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Veille des messages d'amis — sans rendu, mais toujours en marche :
          c'est elle qui notifie et tient la pastille de l'icône à jour. */}
      <VeilleMessages amiOuvert={amiOuvert} />

      <div className="min-h-dvh bg-fond font-sans lg:pl-64">
        {/* Mobile / tablette : topbar + bottom nav guidée */}
        <Navbar
          view={view}
          setView={goTo}
          total={total}
          caveDemo={caveDemo}
          mode={mode}
          prenom={profil?.prenom}
          onProfil={redoProfil}
          onAdd={() => setShowForm(true)}
          onLanding={() => setShowLanding(true)}
          onCeSoir={() => setShowCeSoir(true)}
          onScan={() => setShowScan(true)}
          onCompte={() => setShowCompte(true)}
          onMenu={() => setShowMenu(true)}
          onRecherche={() => setShowRecherche(true)}
          onAvatar={() => setShowAvatar(true)}
        />

        {/* Desktop ≥ lg : sidebar fixe noire, signature luxe */}
        <Sidebar
          view={view}
          setView={goTo}
          total={total}
          caveDemo={caveDemo}
          mode={mode}
          prenom={profil?.prenom}
          onProfil={redoProfil}
          onAdd={() => setShowForm(true)}
          onLanding={() => setShowLanding(true)}
          onCeSoir={() => setShowCeSoir(true)}
          onScan={() => setShowScan(true)}
          onCompte={() => setShowCompte(true)}
          onAssistant={() => setShowAssistant(true)}
          onMenu={() => setShowMenu(true)}
          onRecherche={() => setShowRecherche(true)}
          onAvatar={() => setShowAvatar(true)}
          onReglages={() => setShowReglages(true)}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 lg:py-10 pb-24 md:pb-10">
          {/* key={view} remonte le conteneur : la nouvelle vue entre sous un
              voile bordeaux qui se dissout. */}
          <div key={view} className="view-transition">
          {/* Fil d'Ariane — présent sur tous les parcours, jamais sur le hub */}
          {view !== 'hub' && view !== 'decouvrir' && ariane && (
            <FilAriane titre={ariane.titre} sousTitre={ariane.sousTitre} onAccueil={() => goTo('hub')} />
          )}

          {view === 'hub' && (
            <HubGuide
              wines={wines}
              prenom={profil?.prenom}
              onParcours={goTo}
              onScan={() => setShowScan(true)}
              onAssistant={() => setShowAssistant(true)}
              onRecherche={() => setShowRecherche(true)}
              onPitch={() => setShowPitch(true)}
            />
          )}
          {view === 'decouvrir' && (
            <DecouvrirSwipe onFiche={setFicheVin} onAddWine={saveWine} />
          )}
          {view === 'trouver' && (
            <ParcoursVin mode={mode} onOpenBibliotheque={() => goTo('vins')} />
          )}
          {view === 'cave' && (
            <CaveView
              wines={wines}
              onAdd={() => setShowForm(true)}
              onEdit={editWineHandler}
              onDelete={deleteWine}
              onSelect={setDetailWine}
              onUpdateQty={updateQty}
              onToggleFavori={toggleFavori}
              onMarkFavori={markFavoriFromNote}
              journalPrefill={journalPrefill}
              onConsumeJournalPrefill={() => setJournalPrefill(null)}
              onBuyEnvie={buyFromEnvie}
              onCompte={() => setShowCompte(true)}
              onOpenBibliotheque={() => goTo('vins')}
            />
          )}
          {view === 'social'    && (
            <SocialView
              onCompte={() => setShowCompte(true)}
              onVoirVin={setDetailWine}
              onEcranChange={setAmiOuvert}
              amiInitial={amiCible}
              onAmiInitialOuvert={() => setAmiCible(null)}
            />
          )}
          {view === 'vins'      && <BibliothequeView onAddWine={saveWine} mode={mode} initialSearch={librarySearch} onNoter={noterDegustation} />}
          {view === 'explorer'  && <ParcoursExplorer onAddWine={saveWine} onNoter={noterDegustation} />}
          {view === 'apprendre' && <ParcoursApprendre />}
          {/* Accès directs conservés pour les habitués (menu « Tout Œno ») */}
          {view === 'carte'     && <InteractiveMap onAddWine={saveWine} onNoter={noterDegustation} />}
          {view === 'sommelier' && <SommelierForm onOpenBibliotheque={() => goTo('vins')} />}
          {view === 'guide'     && <GuideView onAddWine={saveWine} />}
          </div>
        </main>

        {detailWine && (
          <WineDetail
            wine={detailWine}
            onClose={() => setDetailWine(null)}
            onEdit={editWineHandler}
            onToggleFavori={toggleFavori}
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
            onOpenBibliotheque={() => goTo('vins')}
          />
        )}
        {showScan && (
          <ScanEtiquette
            onClose={() => setShowScan(false)}
            onAddWine={saveWine}
          />
        )}
        {/* Fiche complète depuis Découvrir : le vin en 1 geste, tout en 2 */}
        {ficheVin && (
          <FicheVin
            wine={ficheVin}
            onClose={() => setFicheVin(null)}
            onNoter={noterDegustation}
          />
        )}
        {friendCode && <CaveAmieViewer code={friendCode} onClose={closeFriendCave} />}
        {showCompte && <CompteSync onClose={() => setShowCompte(false)} />}
        {showAvatar && <AvatarEditeur onClose={() => setShowAvatar(false)} prenom={profil?.prenom} />}
        {showReglages && <Reglages onClose={() => setShowReglages(false)} />}
        {showPitch && (
          <PitchOeno
            onClose={() => setShowPitch(false)}
            onCommencer={() => { setShowPitch(false); goTo('trouver') }}
          />
        )}
        {showAssistant && <AssistantView onClose={() => setShowAssistant(false)} onAddWine={saveWine} />}
        {showMenu && (
          <MenuGrille
            onGo={goTo}
            onScan={() => setShowScan(true)}
            onAssistant={() => setShowAssistant(true)}
            onCeSoir={() => setShowCeSoir(true)}
            onCompte={() => setShowCompte(true)}
            onAdd={() => setShowForm(true)}
            onRecherche={() => setShowRecherche(true)}
            onReglages={() => setShowReglages(true)}
            onClose={() => setShowMenu(false)}
          />
        )}
        {showRecherche && (
          <RechercheRapide
            onClose={() => setShowRecherche(false)}
            onOpenBibliotheque={(q) => goTo('vins', q)}
            onAddWine={saveWine}
          />
        )}
        {showOnboarding && <OnboardingProfil onComplete={completeOnboarding} />}

        {/* Guidage : prochaine étape naturelle après un ajout en cave */}
        {nextStep?.type === 'vin-ajoute' && !showForm && !editWine && (
          <div className="fixed bottom-36 md:bottom-6 left-4 right-4 md:left-auto md:right-24 z-40 md:w-96 card !bg-nuit !border-white/10 p-4 shadow-2xl animate-slide-up">
            <button
              onClick={() => setNextStep(null)}
              className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center text-stone-500 hover:text-cream transition-colors cursor-pointer"
              aria-label="Fermer"
            >
              <X size={13} />
            </button>
            <div className="text-[10px] uppercase tracking-[0.18em] font-bold text-gold-500 mb-1">Et maintenant ?</div>
            <div className="text-sm font-semibold text-cream mb-3 pr-6">
              « {nextStep.wine?.name} » est dans votre cave.
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => { setNextStep(null); goTo('cave') }}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-full text-[11px] font-bold text-anthracite-950 bg-gold-500 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
              >
                <WineIcon size={12} /> Voir ma cave
              </button>
              <button
                onClick={() => noterDegustation({ name: nextStep.wine?.name || '' })}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-full text-[11px] font-bold text-cream border border-white/20 hover:border-gold-500/60 active:scale-[0.98] transition-all cursor-pointer"
              >
                <NotebookPen size={12} /> La noter
              </button>
            </div>
          </div>
        )}

        {/* Visite guidée — premier lancement mobile. Ne s'affiche qu'écran
            dégagé (sinon les cibles de la bottom nav sont masquées). */}
        {showTour && !overlayOuvert && (
          <TourGuide steps={TOUR_STEPS} onClose={fermerTour} />
        )}

        {/* Bulle flottante Assistant Œno — masquée en pleine conversation
            Social, où elle chevauche le champ de saisie du message. */}
        {!showAssistant && !amiOuvert && (
          <button
            onClick={() => setShowAssistant(true)}
            data-tour="assistant"
            className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center text-cream shadow-wine-lg hover:scale-110 active:scale-95 transition-all cursor-pointer animate-pulse-gold"
            style={{ background: 'linear-gradient(135deg, #8c2f39, #5c0d22)' }}
            aria-label="Ouvrir l'assistant Œno"
            title="Œno, votre assistant"
          >
            <Sparkles size={22} className="text-gold-400" />
          </button>
        )}
      </div>
    </FournisseurCave>
  )
}
