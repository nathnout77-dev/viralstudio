import { useState, useEffect, useCallback } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'

import Navbar       from '../components/Navbar'
import WineCard     from '../components/WineCard'
import WineDetail   from '../components/WineDetail'
import WineForm     from '../components/WineForm'
import CaveView     from '../components/CaveView'
import AccordsView  from '../components/AccordsView'
import SommelierForm from '../components/SommelierForm'
import MillesimesView from '../components/MillesimesView'

// Leaflet must load client-side only
const InteractiveMap = dynamic(() => import('../components/InteractiveMap'), { ssr: false })

// ─── Demo data ────────────────────────────────────────────────────────────────
const DEMO_WINES = [
  {
    id:'w1', name:'Gevrey-Chambertin 1er Cru', domain:'Domaine Rossignol-Trapet',
    appellation:'Gevrey-Chambertin', region:'Bourgogne', country:'France',
    type:'red', cepages:['Pinot Noir'], vintage:2019, quantity:6,
    drinkFrom:4, drinkUntil:14, serviceTemp:16, carafage:'45 min',
    estimatedValue:85, rating:17.5,
    foodPairings:['Viande rouge','Gibier','Fromage'],
    notes:'Nez complexe de cerise noire, de sous-bois et d\'épices. Bouche élégante, tanins soyeux, longue finale minérale.',
  },
  {
    id:'w2', name:'Château Léoville-Barton', domain:'Château Léoville-Barton',
    appellation:'Saint-Julien 2ème Cru Classé', region:'Bordeaux', country:'France',
    type:'red', cepages:['Cabernet Sauvignon','Merlot','Cabernet Franc'], vintage:2018,
    quantity:12, drinkFrom:8, drinkUntil:25, serviceTemp:18, carafage:'2h',
    estimatedValue:120, rating:18,
    foodPairings:['Viande rouge','Gibier'],
    notes:'Grand millésime. Robe profonde, bouquet de cassis, cèdre et graphite. Tanins denses et serrés, garde certaine.',
  },
  {
    id:'w3', name:'Meursault Les Charmes', domain:'Domaine Roulot',
    appellation:'Meursault 1er Cru', region:'Bourgogne', country:'France',
    type:'white', cepages:['Chardonnay'], vintage:2020,
    quantity:4, drinkFrom:2, drinkUntil:10, serviceTemp:13, carafage:null,
    estimatedValue:95, rating:18,
    foodPairings:['Poisson','Fruits de mer','Fromage'],
    notes:'Beurre frais, noisette, citron confit. Bouche ample et tendue à la fois, minéralité calcaire omniprésente.',
  },
  {
    id:'w4', name:'Dom Pérignon', domain:'Moët & Chandon',
    appellation:'Champagne Millésimé', region:'Champagne', country:'France',
    type:'sparkling', cepages:['Chardonnay','Pinot Noir'], vintage:2013,
    quantity:3, drinkFrom:5, drinkUntil:20, serviceTemp:10, carafage:null,
    estimatedValue:200, rating:19,
    foodPairings:['Fruits de mer','Foie gras','Dessert'],
    notes:'Le prestige absolu. Bulles fines, arômes de brioche, agrumes confits et fleurs blanches. Complexité sans égal.',
  },
  {
    id:'w5', name:'Château d\'Yquem', domain:'Château d\'Yquem',
    appellation:'Sauternes 1er Cru Supérieur', region:'Bordeaux', country:'France',
    type:'sweet', cepages:['Sémillon','Sauvignon Blanc'], vintage:2015,
    quantity:2, drinkFrom:10, drinkUntil:50, serviceTemp:9, carafage:null,
    estimatedValue:350, rating:19.5,
    foodPairings:['Foie gras','Fromage','Dessert'],
    notes:'Le vin de légende. Miel, abricot confit, safran, noix de coco. Équilibre parfait entre douceur et acidité.',
  },
  {
    id:'w6', name:'Domaine Tempier Bandol Rouge', domain:'Domaine Tempier',
    appellation:'Bandol', region:'Provence', country:'France',
    type:'red', cepages:['Mourvèdre','Grenache','Cinsault'], vintage:2017,
    quantity:8, drinkFrom:5, drinkUntil:18, serviceTemp:17, carafage:'1h',
    estimatedValue:45, rating:16.5,
    foodPairings:['Viande rouge','Charcuterie','Fromage'],
    notes:'Garrigue, olive noire, violette et épices. La Provence dans toute sa puissance aromatique.',
  },
  {
    id:'w7', name:'Côte-Rôtie La Landonne', domain:'E. Guigal',
    appellation:'Côte-Rôtie', region:'Rhône Nord', country:'France',
    type:'red', cepages:['Syrah'], vintage:2016,
    quantity:6, drinkFrom:10, drinkUntil:30, serviceTemp:17, carafage:'2h',
    estimatedValue:280, rating:19,
    foodPairings:['Viande rouge','Gibier'],
    notes:'La Syrah la plus puissante et complexe du Rhône. Poivre noir, olive, violette et réglisse. Monumental.',
  },
  {
    id:'w8', name:'Sancerre La Poussie', domain:'Cordier Père & Fils',
    appellation:'Sancerre', region:'Loire', country:'France',
    type:'white', cepages:['Sauvignon Blanc'], vintage:2022,
    quantity:6, drinkFrom:1, drinkUntil:6, serviceTemp:10, carafage:null,
    estimatedValue:22, rating:15.5,
    foodPairings:['Poisson','Fruits de mer','Fromage'],
    notes:'Vif et tendu. Citron vert, buis, pierre à fusil. La quintessence du Sauvignon Blanc de la Loire.',
  },
]

export default function App() {
  const [wines, setWines]     = useState([])
  const [tab, setTab]         = useState('cave')
  const [ready, setReady]     = useState(false)
  const [detailWine, setDetailWine] = useState(null)
  const [showForm, setShowForm]     = useState(false)
  const [editWine, setEditWine]     = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('oenotheque-v2')
    setWines(saved ? JSON.parse(saved) : DEMO_WINES)
    setReady(true)
  }, [])

  useEffect(() => {
    if (ready) localStorage.setItem('oenotheque-v2', JSON.stringify(wines))
  }, [wines, ready])

  const saveWine = useCallback(w => {
    setWines(prev =>
      prev.find(x => x.id === w.id)
        ? prev.map(x => x.id === w.id ? w : x)
        : [...prev, w]
    )
    setShowForm(false)
    setEditWine(null)
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
      <div className="min-h-screen bg-anthracite-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-wine"
               style={{ background: 'linear-gradient(135deg, #9a1633 0%, #72102a 100%)' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 2h8l1 7H7L8 2z"/><path d="M7 9c0 5.523 4.477 10 5 10s5-4.477 5-10"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="9" y1="22" x2="15" y2="22"/>
            </svg>
          </div>
          <div className="font-serif text-xl font-semibold text-cream">Œnothèque</div>
          <div className="text-xs text-gold-500/60 uppercase tracking-[0.2em] mt-1">Chargement…</div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Œnothèque — Gestion de Cave Premium</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-dvh bg-cream font-sans">
        <Navbar
          tab={tab}
          setTab={setTab}
          total={total}
          onAdd={() => setShowForm(true)}
        />

        {/* Main content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-10">
          {tab === 'cave'      && (
            <CaveView
              wines={wines}
              onAdd={() => setShowForm(true)}
              onEdit={editWineHandler}
              onDelete={deleteWine}
              onSelect={setDetailWine}
              onUpdateQty={updateQty}
            />
          )}
          {tab === 'carte'     && <InteractiveMap />}
          {tab === 'sommelier' && <SommelierForm />}
          {tab === 'accords'   && <AccordsView />}
          {tab === 'millésimes'&& <MillesimesView />}
        </main>

        {/* Modals */}
        {detailWine && (
          <WineDetail
            wine={detailWine}
            onClose={() => setDetailWine(null)}
            onEdit={editWineHandler}
          />
        )}
        {(showForm || editWine) && (
          <WineForm
            initial={editWine || undefined}
            onSave={saveWine}
            onClose={() => { setShowForm(false); setEditWine(null) }}
          />
        )}
      </div>
    </>
  )
}
