import { useState, useEffect, useCallback } from 'react'

// ─── Données de démonstration ──────────────────────────────────────────────────
const DEMO_WINES = [
  {
    id: '1', name: 'Gevrey-Chambertin 1er Cru', domain: 'Domaine Rossignol-Trapet',
    appellation: 'Gevrey-Chambertin', region: 'Bourgogne', country: 'France',
    type: 'red', cepages: ['Pinot Noir'], vintage: 2019, quantity: 6,
    price: 85, location: 'Rangée A - Case 3', drinkFrom: 2024, drinkUntil: 2032,
    rating: 93, status: 'cellar',
    aromas: ['Cerise noire', 'Réglisse', 'Terre humide', 'Épices douces'],
    foodPairings: ['Bœuf bourguignon', 'Canard aux cerises', 'Comté affiné'],
    notes: 'Nez complexe et élégant. Bouche structurée avec des tanins soyeux. Grande longueur en bouche.',
    purchaseDate: '2021-09-15',
  },
  {
    id: '2', name: 'Château Margaux', domain: 'Château Margaux',
    appellation: 'Margaux', region: 'Bordeaux', country: 'France',
    type: 'red', cepages: ['Cabernet Sauvignon', 'Merlot', 'Petit Verdot'], vintage: 2015, quantity: 3,
    price: 480, location: 'Rangée B - Case 1', drinkFrom: 2025, drinkUntil: 2050,
    rating: 97, status: 'cellar',
    aromas: ['Cassis', 'Violette', 'Graphite', 'Tabac', 'Cèdre'],
    foodPairings: ['Agneau de Pauillac', 'Filet de bœuf en croûte', 'Truffe noire'],
    notes: 'Millésime exceptionnel. Profondeur et complexité remarquables. À attendre encore 5 ans minimum.',
    purchaseDate: '2018-06-20',
  },
  {
    id: '3', name: 'Puligny-Montrachet Les Pucelles', domain: 'Domaine Leflaive',
    appellation: 'Puligny-Montrachet', region: 'Bourgogne', country: 'France',
    type: 'white', cepages: ['Chardonnay'], vintage: 2020, quantity: 4,
    price: 120, location: 'Rangée C - Case 2', drinkFrom: 2023, drinkUntil: 2030,
    rating: 95, status: 'cellar',
    aromas: ['Fleurs blanches', 'Beurre frais', 'Noisette', 'Pierre à fusil', 'Citron confit'],
    foodPairings: ['Saint-Jacques à la crème', 'Homard thermidor', 'Sole meunière'],
    notes: 'Minéralité exceptionnelle. Texture crémeuse avec une acidité parfaitement intégrée.',
    purchaseDate: '2022-03-10',
  },
  {
    id: '4', name: 'Hermitage Rouge', domain: 'M. Chapoutier',
    appellation: 'Hermitage', region: 'Vallée du Rhône', country: 'France',
    type: 'red', cepages: ['Syrah'], vintage: 2017, quantity: 2,
    price: 65, location: 'Rangée A - Case 7', drinkFrom: 2023, drinkUntil: 2035,
    rating: 91, status: 'cellar',
    aromas: ['Olive noire', 'Viande fumée', 'Poivre noir', 'Violette', 'Réglisse'],
    foodPairings: ['Gibier', 'Daube provençale', 'Fromages affinés'],
    notes: 'Syrah puissante et épicée. Potentiel de garde impressionnant.',
    purchaseDate: '2020-11-05',
  },
  {
    id: '5', name: 'Sancerre Blanc', domain: 'Henri Bourgeois',
    appellation: 'Sancerre', region: 'Loire', country: 'France',
    type: 'white', cepages: ['Sauvignon Blanc'], vintage: 2022, quantity: 8,
    price: 22, location: 'Rangée D - Case 4', drinkFrom: 2023, drinkUntil: 2026,
    rating: 88, status: 'cellar',
    aromas: ['Buis', 'Citron vert', 'Pamplemousse', 'Pierre à fusil'],
    foodPairings: ['Chèvre frais', 'Huîtres', 'Ceviche', 'Asperges'],
    notes: 'Frais, vif et aromatique. À boire dans les 3 ans.',
    purchaseDate: '2023-04-01',
  },
]

const FEATURED_CEPAGES = [
  { name: 'Pinot Noir', region: 'Bourgogne', reason: 'Millésimes 2019-2021 exceptionnels', icon: '🍷', trend: 'up' },
  { name: 'Chardonnay', region: 'Bourgogne / Champagne', reason: 'Grand potentiel de garde 2020', icon: '🥂', trend: 'up' },
  { name: 'Grenache', region: 'Châteauneuf-du-Pape', reason: 'Renaissance qualitative en cours', icon: '🍷', trend: 'up' },
  { name: 'Riesling', region: 'Alsace / Moselle', reason: 'Acidité naturelle, vieillissement parfait', icon: '🍾', trend: 'stable' },
  { name: 'Nebbiolo', region: 'Barolo / Barbaresco', reason: 'Italie du Nord en pleine forme', icon: '🍷', trend: 'up' },
]

const FEATURED_MILLESIMES = [
  { year: 2025, regions: ['Bourgogne', 'Loire', 'Alsace'], score: 94, note: 'En cours de vinification — très prometteur après un été sec', action: 'À suivre' },
  { year: 2023, regions: ['Bourgogne', 'Bordeaux', 'Rhône'], score: 96, note: 'Millésime solaire, équilibre remarquable', action: 'Acheter maintenant' },
  { year: 2022, regions: ['Bourgogne', 'Loire', 'Alsace'], score: 95, note: 'Blancs exceptionnels, rouges concentrés', action: 'Acheter maintenant' },
  { year: 2019, regions: ['Bourgogne', 'Bordeaux'], score: 98, note: 'Millésime du siècle en Bourgogne — apogée 2026–2035', action: 'Conserver' },
  { year: 2015, regions: ['Bordeaux', 'Rhône'], score: 97, note: 'Grands rouges de garde — encore 10 ans minimum', action: 'Conserver' },
]

const AROMAS_LIST = [
  'Cassis','Cerise noire','Fraise','Framboise','Mûre','Myrtille','Prune',
  'Pêche','Abricot','Citron','Pamplemousse','Orange','Citron vert',
  'Fleurs blanches','Rose','Violette','Lavande','Acacia',
  'Vanille','Chocolat','Café','Caramel','Réglisse','Tabac',
  'Cèdre','Chêne','Épices','Poivre noir','Cannelle','Noix de muscade',
  'Truffe','Champignon','Terre humide','Sous-bois','Cuir',
  'Pierre à fusil','Silex','Minéral','Fumé','Grillé',
  'Beurre','Noisette','Amande','Miel','Cire d\'abeille',
  'Olive noire','Viande fumée','Buis','Herbe coupée',
]

const FOOD_PAIRINGS_LIST = [
  'Bœuf bourguignon','Filet de bœuf','Côte de bœuf','Agneau rôti','Gigot d\'agneau',
  'Canard aux cerises','Magret de canard','Pigeon rôti','Faisan en cocotte',
  'Homard thermidor','Langoustines','Saint-Jacques à la crème','Sole meunière','Turbot',
  'Huîtres','Ceviche','Saumon grillé','Thon mi-cuit',
  'Truffe noire','Foie gras','Terrine de gibier',
  'Comté affiné','Munster','Époisses','Reblochon','Chèvre frais',
  'Risotto aux cèpes','Pasta aux truffes','Pizza','Charcuterie',
  'Daube provençale','Cassoulet','Pot-au-feu','Blanquette de veau',
  'Asperges','Artichauts','Ratatouille','Gibier','Fromages affinés',
  'Agneau de Pauillac','Filet de bœuf en croûte',
]

// ─── Icônes ────────────────────────────────────────────────────────────────────
const WineGlass = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 22h8M12 11v11M5 2h14l-2 7a5 5 0 0 1-10 0L5 2z"/>
  </svg>
)
const BottleIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 2v3.5c0 .8-.3 1.6-.9 2.2L6 9.5V20a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9.5l-2.1-1.8c-.6-.6-.9-1.4-.9-2.2V2"/>
    <path d="M9 2h6M9 13h6"/>
  </svg>
)
const PlusIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
)
const SearchIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
)
const CloseIcon = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)
const EditIcon = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
)
const TrashIcon = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3,6 5,6 21,6"/><path d="M19,6l-1,14H6L5,6"/><path d="M10,11v6M14,11v6"/><path d="M9,6V4h6v2"/>
  </svg>
)
const MapPin = () => (
  <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
)
const ChartBar = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
    <line x1="2" y1="20" x2="22" y2="20"/>
  </svg>
)
const GrapeIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="8.5" cy="7" r="2.5"/><circle cx="15.5" cy="7" r="2.5"/>
    <circle cx="6" cy="12" r="2.5"/><circle cx="12" cy="12" r="2.5"/><circle cx="18" cy="12" r="2.5"/>
    <circle cx="8.5" cy="17" r="2.5"/><circle cx="15.5" cy="17" r="2.5"/>
    <path d="M12 2v2.5"/>
  </svg>
)
const AwardIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
)
const TrendUpIcon = () => (
  <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
    <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/><polyline points="17,6 23,6 23,12"/>
  </svg>
)
const CellarIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="3" width="20" height="4" rx="1"/><rect x="2" y="10" width="20" height="4" rx="1"/><rect x="2" y="17" width="20" height="4" rx="1"/>
    <circle cx="7" cy="5" r="0.8" fill="currentColor"/><circle cx="7" cy="12" r="0.8" fill="currentColor"/><circle cx="7" cy="19" r="0.8" fill="currentColor"/>
  </svg>
)
const ForkKnifeIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>
  </svg>
)

// ─── Utilitaires ───────────────────────────────────────────────────────────────
const YEAR = new Date().getFullYear()
const TYPE_LABELS = { red: 'Rouge', white: 'Blanc', rosé: 'Rosé', sparkling: 'Effervescent', sweet: 'Liquoreux' }

function getDrinkStatus(w) {
  if (w.drinkFrom > YEAR) return { label: 'Trop jeune', color: '#60a5fa', bg: 'rgba(96,165,250,0.1)' }
  if (w.drinkUntil < YEAR) return { label: 'À consommer vite', color: '#f87171', bg: 'rgba(248,113,113,0.1)' }
  if (w.drinkUntil - YEAR <= 2) return { label: 'Apogée imminente', color: '#fbbf24', bg: 'rgba(251,191,36,0.1)' }
  return { label: 'À maturité', color: '#4ade80', bg: 'rgba(74,222,128,0.1)' }
}

function getTypeStyle(type) {
  const s = {
    red:      { bg: 'rgba(139,26,48,0.25)',  border: 'rgba(139,26,48,0.5)',  text: '#f9a8b8', dot: '#ca2e43' },
    white:    { bg: 'rgba(180,160,60,0.2)',   border: 'rgba(180,160,60,0.4)', text: '#fde68a', dot: '#d97706' },
    rosé:     { bg: 'rgba(244,63,94,0.15)',   border: 'rgba(244,63,94,0.35)', text: '#fda4af', dot: '#f43f5e' },
    sparkling:{ bg: 'rgba(6,182,212,0.12)',   border: 'rgba(6,182,212,0.3)',  text: '#67e8f9', dot: '#06b6d4' },
    sweet:    { bg: 'rgba(245,158,11,0.15)',  border: 'rgba(245,158,11,0.35)',text: '#fcd34d', dot: '#f59e0b' },
  }
  return s[type] || s.red
}

// ─── Modal ─────────────────────────────────────────────────────────────────────
function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])
  if (!open) return null
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '48px 16px 16px', background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(6px)' }}>
      <div style={{ position: 'relative', width: '100%', maxWidth: 720, maxHeight: '85vh', overflowY: 'auto', borderRadius: 20, background: 'linear-gradient(160deg, #1c1c28 0%, #111118 100%)', border: '1px solid rgba(139,26,48,0.3)', boxShadow: '0 0 80px rgba(139,26,48,0.18)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'sticky', top: 0, background: 'linear-gradient(160deg, #1c1c28, #111118)', zIndex: 1 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: '#e8e0d5', fontFamily: 'Georgia, serif' }}>{title}</h2>
          <button onClick={onClose} style={{ padding: 8, borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: 'none', color: '#6b7280', cursor: 'pointer', display: 'flex' }}>
            <CloseIcon />
          </button>
        </div>
        <div style={{ padding: 24 }}>{children}</div>
      </div>
    </div>
  )
}

// ─── Formulaire ajout/édition ──────────────────────────────────────────────────
const EMPTY = {
  name:'', domain:'', appellation:'', region:'', country:'France',
  type:'red', cepages:[], vintage: YEAR-2, quantity:1, price:'',
  location:'', drinkFrom: YEAR+2, drinkUntil: YEAR+10,
  rating:'', status:'cellar', aromas:[], foodPairings:[], notes:'', purchaseDate:'',
}

function WineForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial || EMPTY)
  const [aroma, setAroma] = useState('')
  const [food, setFood] = useState('')
  const [cepage, setCepage] = useState('')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const addTag = (field, val, reset) => {
    if (!val.trim()) return
    if (!form[field].includes(val.trim())) set(field, [...form[field], val.trim()])
    reset('')
  }
  const removeTag = (field, val) => set(field, form[field].filter(x => x !== val))
  const submit = (e) => {
    e.preventDefault()
    if (!form.name || !form.domain) return
    onSave({ ...form, id: form.id || Date.now().toString() })
  }

  const inp = { width:'100%', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.09)', borderRadius:9, padding:'9px 13px', color:'#e8e0d5', fontSize:14, outline:'none', fontFamily:'inherit' }
  const lbl = { display:'block', fontSize:11, color:'#9ca3af', marginBottom:5, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.07em' }
  const tagRed = { padding:'3px 10px', background:'rgba(139,26,48,0.2)', border:'1px solid rgba(139,26,48,0.4)', borderRadius:20, fontSize:12, color:'#f9a8b8', cursor:'pointer' }
  const tagGold = { padding:'3px 10px', background:'rgba(120,53,15,0.25)', border:'1px solid rgba(180,83,9,0.4)', borderRadius:20, fontSize:12, color:'#fcd34d', cursor:'pointer' }
  const tagGreen = { padding:'3px 10px', background:'rgba(20,50,20,0.5)', border:'1px solid rgba(34,100,34,0.4)', borderRadius:20, fontSize:12, color:'#86efac', cursor:'pointer' }
  const addBtn = { padding:'9px 14px', background:'rgba(139,26,48,0.25)', border:'1px solid rgba(139,26,48,0.4)', borderRadius:9, color:'#f9a8b8', fontSize:13, cursor:'pointer' }

  return (
    <form onSubmit={submit}>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
        <div style={{ gridColumn:'1/-1' }}>
          <label style={lbl}>Nom du vin *</label>
          <input style={inp} value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Gevrey-Chambertin 1er Cru" required />
        </div>
        <div>
          <label style={lbl}>Domaine / Château *</label>
          <input style={inp} value={form.domain} onChange={e=>set('domain',e.target.value)} placeholder="Domaine Rossignol-Trapet" required />
        </div>
        <div>
          <label style={lbl}>Appellation</label>
          <input style={inp} value={form.appellation} onChange={e=>set('appellation',e.target.value)} placeholder="Gevrey-Chambertin" />
        </div>
        <div>
          <label style={lbl}>Région</label>
          <input style={inp} value={form.region} onChange={e=>set('region',e.target.value)} placeholder="Bourgogne" />
        </div>
        <div>
          <label style={lbl}>Pays</label>
          <input style={inp} value={form.country} onChange={e=>set('country',e.target.value)} placeholder="France" />
        </div>
        <div>
          <label style={lbl}>Type</label>
          <select style={inp} value={form.type} onChange={e=>set('type',e.target.value)}>
            {Object.entries(TYPE_LABELS).map(([v,l])=><option key={v} value={v}>{l}</option>)}
          </select>
        </div>
        <div>
          <label style={lbl}>Millésime *</label>
          <input style={inp} type="number" min="1900" max={YEAR} value={form.vintage} onChange={e=>set('vintage',+e.target.value)} required />
        </div>
        <div>
          <label style={lbl}>Quantité (btl)</label>
          <input style={inp} type="number" min="1" value={form.quantity} onChange={e=>set('quantity',+e.target.value)} />
        </div>
        <div>
          <label style={lbl}>Prix unitaire (€)</label>
          <input style={inp} type="number" min="0" value={form.price} onChange={e=>set('price',+e.target.value)} placeholder="0" />
        </div>
        <div>
          <label style={lbl}>Emplacement cave</label>
          <input style={inp} value={form.location} onChange={e=>set('location',e.target.value)} placeholder="Rangée A - Case 3" />
        </div>
        <div>
          <label style={lbl}>Boire à partir de</label>
          <input style={inp} type="number" min="1900" max="2100" value={form.drinkFrom} onChange={e=>set('drinkFrom',+e.target.value)} />
        </div>
        <div>
          <label style={lbl}>Boire avant</label>
          <input style={inp} type="number" min="1900" max="2100" value={form.drinkUntil} onChange={e=>set('drinkUntil',+e.target.value)} />
        </div>
        <div>
          <label style={lbl}>Note (0–100)</label>
          <input style={inp} type="number" min="0" max="100" value={form.rating} onChange={e=>set('rating',+e.target.value)} placeholder="90" />
        </div>
        <div>
          <label style={lbl}>Date d'achat</label>
          <input style={inp} type="date" value={form.purchaseDate} onChange={e=>set('purchaseDate',e.target.value)} />
        </div>

        {/* Cépages */}
        <div style={{ gridColumn:'1/-1' }}>
          <label style={lbl}>Cépages</label>
          <div style={{ display:'flex', gap:8, marginBottom:8 }}>
            <input style={{ ...inp, flex:1 }} value={cepage} onChange={e=>setCepage(e.target.value)}
              onKeyDown={e=>{ if(e.key==='Enter'){e.preventDefault();addTag('cepages',cepage,setCepage)} }}
              placeholder="Pinot Noir, Cabernet Sauvignon…" />
            <button type="button" style={addBtn} onClick={()=>addTag('cepages',cepage,setCepage)}>+ Ajouter</button>
          </div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
            {form.cepages.map(c=><span key={c} style={tagRed} onClick={()=>removeTag('cepages',c)}>{c} ×</span>)}
          </div>
        </div>

        {/* Arômes */}
        <div style={{ gridColumn:'1/-1' }}>
          <label style={lbl}>Arômes</label>
          <div style={{ display:'flex', gap:8, marginBottom:8 }}>
            <select style={{ ...inp, flex:1 }} value={aroma} onChange={e=>setAroma(e.target.value)}>
              <option value="">Sélectionner un arôme…</option>
              {AROMAS_LIST.map(a=><option key={a} value={a}>{a}</option>)}
            </select>
            <button type="button" style={addBtn} onClick={()=>addTag('aromas',aroma,setAroma)}>+</button>
          </div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
            {form.aromas.map(a=><span key={a} style={tagGold} onClick={()=>removeTag('aromas',a)}>{a} ×</span>)}
          </div>
        </div>

        {/* Accords */}
        <div style={{ gridColumn:'1/-1' }}>
          <label style={lbl}>Accords mets & vins</label>
          <div style={{ display:'flex', gap:8, marginBottom:8 }}>
            <select style={{ ...inp, flex:1 }} value={food} onChange={e=>setFood(e.target.value)}>
              <option value="">Sélectionner un accord…</option>
              {FOOD_PAIRINGS_LIST.map(f=><option key={f} value={f}>{f}</option>)}
            </select>
            <button type="button" style={addBtn} onClick={()=>addTag('foodPairings',food,setFood)}>+</button>
          </div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
            {form.foodPairings.map(f=><span key={f} style={tagGreen} onClick={()=>removeTag('foodPairings',f)}>{f} ×</span>)}
          </div>
        </div>

        {/* Notes */}
        <div style={{ gridColumn:'1/-1' }}>
          <label style={lbl}>Notes de dégustation</label>
          <textarea style={{ ...inp, minHeight:80, resize:'vertical' }} value={form.notes} onChange={e=>set('notes',e.target.value)} placeholder="Nez, bouche, finale, potentiel de garde…" />
        </div>
      </div>

      <div style={{ display:'flex', gap:10, marginTop:20 }}>
        <button type="button" onClick={onClose} style={{ flex:1, padding:'11px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:10, color:'#9ca3af', cursor:'pointer', fontSize:14 }}>
          Annuler
        </button>
        <button type="submit" style={{ flex:2, padding:'11px', background:'linear-gradient(135deg, #8c2030, #ca2e43)', border:'none', borderRadius:10, color:'#fff', cursor:'pointer', fontSize:14, fontWeight:700 }}>
          {initial ? 'Enregistrer' : 'Ajouter à la cave'}
        </button>
      </div>
    </form>
  )
}

// ─── Carte vin ─────────────────────────────────────────────────────────────────
function WineCard({ wine, onClick, onEdit, onDelete }) {
  const status = getDrinkStatus(wine)
  const ts = getTypeStyle(wine.type)
  const [hov, setHov] = useState(false)

  return (
    <div onClick={onClick} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        position:'relative', cursor:'pointer', borderRadius:16, padding:18,
        background: hov ? 'linear-gradient(145deg,#1e1e2a,#16161e)' : 'linear-gradient(145deg,#1a1a24,#111118)',
        border:`1px solid ${hov ? 'rgba(139,26,48,0.45)' : 'rgba(255,255,255,0.06)'}`,
        transition:'all 0.18s ease',
        boxShadow: hov ? '0 8px 30px rgba(139,26,48,0.14)' : '0 2px 8px rgba(0,0,0,0.28)',
        transform: hov ? 'translateY(-2px)' : 'none',
      }}>
      {hov && (
        <div style={{ position:'absolute', top:12, right:12, display:'flex', gap:5 }} onClick={e=>e.stopPropagation()}>
          <button onClick={()=>onEdit(wine)} style={{ padding:'5px 7px', background:'rgba(255,255,255,0.07)', border:'none', borderRadius:7, color:'#9ca3af', cursor:'pointer', display:'flex' }}><EditIcon /></button>
          <button onClick={()=>onDelete(wine.id)} style={{ padding:'5px 7px', background:'rgba(239,68,68,0.1)', border:'none', borderRadius:7, color:'#f87171', cursor:'pointer', display:'flex' }}><TrashIcon /></button>
        </div>
      )}

      <div style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
        <div style={{ width:42, height:42, borderRadius:11, background:ts.bg, border:`1px solid ${ts.border}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          <WineGlass size={19} color={ts.dot} />
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:'flex', gap:6, marginBottom:5, flexWrap:'wrap' }}>
            <span style={{ fontSize:10, padding:'2px 8px', borderRadius:20, background:ts.bg, color:ts.text, border:`1px solid ${ts.border}`, fontWeight:600 }}>{TYPE_LABELS[wine.type]}</span>
            <span style={{ fontSize:11, color:'#6b7280' }}>{wine.vintage}</span>
          </div>
          <div style={{ fontSize:14, fontWeight:700, color:'#e8e0d5', fontFamily:'Georgia,serif', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{wine.name}</div>
          <div style={{ fontSize:12, color:'#9ca3af', marginTop:2 }}>{wine.domain}</div>
          <div style={{ fontSize:11, color:'#6b7280', marginTop:1 }}>{wine.region}</div>
        </div>
      </div>

      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:13 }}>
        <div style={{ display:'flex', gap:14 }}>
          <div style={{ textAlign:'center' }}>
            <div style={{ fontSize:17, fontWeight:800, color:'#d97706' }}>{wine.quantity}</div>
            <div style={{ fontSize:9, color:'#6b7280', textTransform:'uppercase' }}>btl</div>
          </div>
          {wine.rating > 0 && (
            <div style={{ textAlign:'center' }}>
              <div style={{ fontSize:17, fontWeight:800, color:'#f59e0b' }}>{wine.rating}</div>
              <div style={{ fontSize:9, color:'#6b7280', textTransform:'uppercase' }}>pts</div>
            </div>
          )}
          {wine.price > 0 && (
            <div style={{ textAlign:'center' }}>
              <div style={{ fontSize:17, fontWeight:800, color:'#a3a3a3' }}>{wine.price}€</div>
              <div style={{ fontSize:9, color:'#6b7280', textTransform:'uppercase' }}>/ btl</div>
            </div>
          )}
        </div>
        <span style={{ fontSize:10, padding:'3px 9px', borderRadius:20, background:status.bg, color:status.color, fontWeight:600 }}>{status.label}</span>
      </div>

      {wine.cepages?.length > 0 && (
        <div style={{ display:'flex', flexWrap:'wrap', gap:4, marginTop:10 }}>
          {wine.cepages.slice(0,3).map(c=>(
            <span key={c} style={{ fontSize:10, padding:'2px 7px', borderRadius:10, background:'rgba(255,255,255,0.04)', color:'#6b7280', border:'1px solid rgba(255,255,255,0.06)' }}>{c}</span>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Détail vin ────────────────────────────────────────────────────────────────
function WineDetail({ wine, onEdit }) {
  const status = getDrinkStatus(wine)
  const ts = getTypeStyle(wine.type)
  const window = Math.max(1, wine.drinkUntil - wine.drinkFrom)
  const progress = Math.max(0, Math.min(100, ((YEAR - wine.drinkFrom) / window) * 100))

  return (
    <div>
      <div style={{ display:'flex', gap:16, marginBottom:22 }}>
        <div style={{ width:60, height:60, borderRadius:15, background:ts.bg, border:`1px solid ${ts.border}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          <WineGlass size={26} color={ts.dot} />
        </div>
        <div>
          <div style={{ display:'flex', gap:7, marginBottom:6 }}>
            <span style={{ fontSize:11, padding:'2px 9px', borderRadius:20, background:ts.bg, color:ts.text, border:`1px solid ${ts.border}` }}>{TYPE_LABELS[wine.type]}</span>
            <span style={{ fontSize:11, padding:'2px 9px', borderRadius:20, background:status.bg, color:status.color }}>{status.label}</span>
          </div>
          <div style={{ fontSize:19, fontWeight:800, color:'#e8e0d5', fontFamily:'Georgia,serif' }}>{wine.name}</div>
          <div style={{ fontSize:14, color:'#9ca3af' }}>{wine.domain}</div>
          <div style={{ fontSize:12, color:'#6b7280' }}>{[wine.appellation, wine.region, wine.country].filter(Boolean).join(' · ')}</div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginBottom:20 }}>
        {[
          { l:'Millésime', v:wine.vintage, c:'#d97706' },
          { l:'Quantité', v:`${wine.quantity} btl`, c:'#f59e0b' },
          { l:'Note', v: wine.rating ? `${wine.rating}/100` : '—', c:'#fbbf24' },
          { l:'Valeur', v: wine.price ? `${(wine.price*wine.quantity).toLocaleString('fr')}€` : '—', c:'#a3a3a3' },
        ].map(s=>(
          <div key={s.l} style={{ textAlign:'center', padding:'14px 6px', background:'rgba(255,255,255,0.03)', borderRadius:11, border:'1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize:19, fontWeight:800, color:s.c }}>{s.v}</div>
            <div style={{ fontSize:10, color:'#6b7280', marginTop:2, textTransform:'uppercase', letterSpacing:'0.05em' }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Fenêtre */}
      <div style={{ marginBottom:18, padding:16, background:'rgba(255,255,255,0.03)', borderRadius:11, border:'1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:9 }}>
          <span style={{ fontSize:11, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.05em', fontWeight:600 }}>Fenêtre de dégustation</span>
          <span style={{ fontSize:11, color:'#6b7280' }}>{wine.drinkFrom} – {wine.drinkUntil}</span>
        </div>
        <div style={{ height:7, background:'rgba(255,255,255,0.06)', borderRadius:4, overflow:'hidden' }}>
          <div style={{ height:'100%', width:`${progress}%`, background:'linear-gradient(90deg,#22c55e,#16a34a)', borderRadius:4 }} />
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', marginTop:6, fontSize:11, color:'#6b7280' }}>
          {wine.purchaseDate && <span>Acheté le {wine.purchaseDate}</span>}
          <span style={{ color:status.color, marginLeft:'auto' }}>{status.label}</span>
        </div>
      </div>

      {wine.cepages?.length > 0 && (
        <Section title="Cépages">
          {wine.cepages.map(c=><Tag key={c} style="red">{c}</Tag>)}
        </Section>
      )}
      {wine.aromas?.length > 0 && (
        <Section title="Profil aromatique">
          {wine.aromas.map(a=><Tag key={a} style="gold">{a}</Tag>)}
        </Section>
      )}
      {wine.foodPairings?.length > 0 && (
        <Section title="Accords mets & vins">
          {wine.foodPairings.map(f=><Tag key={f} style="green">{f}</Tag>)}
        </Section>
      )}
      {wine.notes && (
        <div style={{ marginBottom:16, padding:14, background:'rgba(255,255,255,0.02)', borderRadius:10, borderLeft:'3px solid #8c2030' }}>
          <div style={{ fontSize:11, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:7, fontWeight:600 }}>Notes de dégustation</div>
          <p style={{ fontSize:13, color:'#c9bfb5', lineHeight:1.65, fontStyle:'italic' }}>{wine.notes}</p>
        </div>
      )}
      {wine.location && (
        <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:16, fontSize:12, color:'#6b7280' }}>
          <MapPin /> Emplacement : <span style={{ color:'#9ca3af' }}>{wine.location}</span>
        </div>
      )}

      <button onClick={()=>onEdit(wine)} style={{ width:'100%', padding:'11px', background:'rgba(139,26,48,0.2)', border:'1px solid rgba(139,26,48,0.4)', borderRadius:10, color:'#f9a8b8', cursor:'pointer', fontSize:14, fontWeight:600 }}>
        Modifier ce vin
      </button>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom:15 }}>
      <div style={{ fontSize:11, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:8, fontWeight:600 }}>{title}</div>
      <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>{children}</div>
    </div>
  )
}
function Tag({ children, style }) {
  const styles = {
    red:   { padding:'4px 12px', background:'rgba(139,26,48,0.2)', border:'1px solid rgba(139,26,48,0.4)', borderRadius:20, fontSize:12, color:'#f9a8b8' },
    gold:  { padding:'4px 12px', background:'rgba(120,53,15,0.25)', border:'1px solid rgba(180,83,9,0.35)', borderRadius:20, fontSize:12, color:'#fcd34d' },
    green: { padding:'4px 12px', background:'rgba(20,50,20,0.5)', border:'1px solid rgba(34,100,34,0.35)', borderRadius:20, fontSize:12, color:'#86efac' },
  }
  return <span style={styles[style]}>{children}</span>
}

// ─── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard({ wines }) {
  const total = wines.reduce((s,w)=>s+w.quantity,0)
  const value = wines.reduce((s,w)=>s+(w.price||0)*w.quantity,0)
  const rated = wines.filter(w=>w.rating>0)
  const avgRating = rated.length ? rated.reduce((s,w)=>s+w.rating,0)/rated.length : 0
  const ready = wines.filter(w=>getDrinkStatus(w).label==='À maturité').length
  const typeMap = wines.reduce((a,w)=>{a[w.type]=(a[w.type]||0)+w.quantity;return a},{})
  const regionMap = wines.reduce((a,w)=>{if(w.region){a[w.region]=(a[w.region]||0)+w.quantity}return a},{})

  return (
    <div>
      {/* KPIs */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(190px,1fr))', gap:14, marginBottom:28 }}>
        {[
          { label:'Bouteilles', value:total, sub:'en cave', icon:<BottleIcon size={20}/>, color:'#ca2e43' },
          { label:'Vins distincts', value:wines.length, sub:'références', icon:<WineGlass size={20}/>, color:'#d97706' },
          { label:'Valeur cave', value:`${value.toLocaleString('fr')} €`, sub:'estimation', icon:<AwardIcon/>, color:'#f59e0b' },
          { label:'À maturité', value:ready, sub:'prêts à boire', icon:<ChartBar/>, color:'#4ade80' },
        ].map(c=>(
          <div key={c.label} style={{ padding:18, borderRadius:15, background:'linear-gradient(145deg,#1a1a24,#111118)', border:'1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ padding:9, borderRadius:9, background:`rgba(${c.color==='#ca2e43'?'202,46,67':c.color==='#d97706'?'217,119,6':c.color==='#f59e0b'?'245,158,11':'74,222,128'},0.12)`, color:c.color, display:'inline-flex', marginBottom:10 }}>
              {c.icon}
            </div>
            <div style={{ fontSize:26, fontWeight:800, color:'#e8e0d5' }}>{c.value}</div>
            <div style={{ fontSize:11, color:'#6b7280', marginTop:2 }}>{c.label} · {c.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:28 }}>
        {/* Par type */}
        <div style={{ padding:18, borderRadius:15, background:'linear-gradient(145deg,#1a1a24,#111118)', border:'1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontSize:12, fontWeight:700, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:14 }}>Répartition par type</div>
          {Object.entries(typeMap).map(([t,q])=>{
            const ts=getTypeStyle(t), pct=Math.round(q/total*100)
            return (
              <div key={t} style={{ marginBottom:10 }}>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, marginBottom:4 }}>
                  <span style={{ color:ts.text }}>{TYPE_LABELS[t]}</span>
                  <span style={{ color:'#6b7280' }}>{q} · {pct}%</span>
                </div>
                <div style={{ height:5, background:'rgba(255,255,255,0.06)', borderRadius:3 }}>
                  <div style={{ height:'100%', width:`${pct}%`, background:ts.dot, borderRadius:3 }}/>
                </div>
              </div>
            )
          })}
        </div>

        {/* Par région */}
        <div style={{ padding:18, borderRadius:15, background:'linear-gradient(145deg,#1a1a24,#111118)', border:'1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontSize:12, fontWeight:700, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:14 }}>Par région</div>
          {Object.entries(regionMap).sort((a,b)=>b[1]-a[1]).map(([r,q])=>{
            const pct=Math.round(q/total*100)
            return (
              <div key={r} style={{ marginBottom:10 }}>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, marginBottom:4 }}>
                  <span style={{ color:'#c9bfb5' }}>{r}</span>
                  <span style={{ color:'#6b7280' }}>{q} btl</span>
                </div>
                <div style={{ height:5, background:'rgba(255,255,255,0.06)', borderRadius:3 }}>
                  <div style={{ height:'100%', width:`${pct}%`, background:'linear-gradient(90deg,#8c2030,#ca2e43)', borderRadius:3 }}/>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Note moyenne */}
      {avgRating > 0 && (
        <div style={{ padding:18, borderRadius:15, background:'linear-gradient(145deg,#1a1a24,#111118)', border:'1px solid rgba(255,255,255,0.06)', marginBottom:28 }}>
          <div style={{ fontSize:12, fontWeight:700, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:14 }}>Note moyenne de la cave</div>
          <div style={{ display:'flex', alignItems:'center', gap:18 }}>
            <div style={{ fontSize:52, fontWeight:900, background:'linear-gradient(135deg,#d4a017,#f5c842)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
              {avgRating.toFixed(1)}
            </div>
            <div>
              <div style={{ fontSize:16, color:'#e8e0d5', fontWeight:600 }}>
                {avgRating>=95?'Exceptionnel':avgRating>=90?'Excellent':avgRating>=85?'Très bien':avgRating>=80?'Bien':'Correct'}
              </div>
              <div style={{ fontSize:12, color:'#6b7280', marginTop:3 }}>sur {rated.length} vin{rated.length>1?'s':''} noté{rated.length>1?'s':''}</div>
            </div>
          </div>
        </div>
      )}

      {/* Cépages du moment */}
      <div style={{ marginBottom:28 }}>
        <div style={{ display:'flex', alignItems:'center', gap:9, marginBottom:14 }}>
          <GrapeIcon />
          <h3 style={{ fontSize:17, fontWeight:700, color:'#e8e0d5', fontFamily:'Georgia,serif' }}>Cépages idéaux du moment</h3>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(190px,1fr))', gap:11 }}>
          {FEATURED_CEPAGES.map(c=>(
            <div key={c.name} style={{ padding:15, borderRadius:13, background:'linear-gradient(145deg,#1a1a24,#111118)', border:'1px solid rgba(139,26,48,0.22)' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:7 }}>
                <span style={{ fontSize:20 }}>{c.icon}</span>
                {c.trend==='up' && <TrendUpIcon />}
              </div>
              <div style={{ fontSize:14, fontWeight:700, color:'#e8e0d5', marginBottom:3 }}>{c.name}</div>
              <div style={{ fontSize:10, color:'#ca2e43', fontWeight:600, marginBottom:5 }}>{c.region}</div>
              <div style={{ fontSize:11, color:'#6b7280', lineHeight:1.45 }}>{c.reason}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Millésimes */}
      <div>
        <div style={{ display:'flex', alignItems:'center', gap:9, marginBottom:14 }}>
          <AwardIcon />
          <h3 style={{ fontSize:17, fontWeight:700, color:'#e8e0d5', fontFamily:'Georgia,serif' }}>Millésimes à privilégier</h3>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
          {FEATURED_MILLESIMES.map(m=>(
            <div key={m.year} style={{ display:'flex', alignItems:'center', gap:14, padding:15, borderRadius:13, background:'linear-gradient(145deg,#1a1a24,#111118)', border:'1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ textAlign:'center', minWidth:55 }}>
                <div style={{ fontSize:24, fontWeight:900, background:'linear-gradient(135deg,#d4a017,#f5c842)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>{m.year}</div>
                <div style={{ fontSize:10, color:'#d97706', fontWeight:700 }}>{m.score} pts</div>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, color:'#c9bfb5', marginBottom:5 }}>{m.note}</div>
                <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
                  {m.regions.map(r=>(
                    <span key={r} style={{ fontSize:10, padding:'1px 7px', borderRadius:10, background:'rgba(255,255,255,0.04)', color:'#6b7280', border:'1px solid rgba(255,255,255,0.06)' }}>{r}</span>
                  ))}
                </div>
              </div>
              <span style={{
                fontSize:11, padding:'4px 11px', borderRadius:20, fontWeight:600, whiteSpace:'nowrap',
                background: m.action==='Acheter maintenant'?'rgba(34,197,94,0.1)':m.action==='Conserver'?'rgba(96,165,250,0.1)':'rgba(251,191,36,0.1)',
                color: m.action==='Acheter maintenant'?'#4ade80':m.action==='Conserver'?'#60a5fa':'#fbbf24',
              }}>{m.action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Vue Cave ──────────────────────────────────────────────────────────────────
function CaveView({ wines, onAdd, onEdit, onDelete, onSelect }) {
  const [q, setQ] = useState('')
  const [type, setType] = useState('all')
  const [statusF, setStatusF] = useState('all')
  const [sort, setSort] = useState('name')

  const list = wines
    .filter(w => {
      const lq = q.toLowerCase()
      if (lq && !w.name.toLowerCase().includes(lq) && !w.domain.toLowerCase().includes(lq) && !(w.region||'').toLowerCase().includes(lq)) return false
      if (type !== 'all' && w.type !== type) return false
      if (statusF !== 'all') {
        const s = getDrinkStatus(w).label
        if (statusF==='ready' && s!=='À maturité') return false
        if (statusF==='young' && s!=='Trop jeune') return false
        if (statusF==='urgent' && s!=='À consommer vite') return false
      }
      return true
    })
    .sort((a,b)=>{
      if (sort==='name') return a.name.localeCompare(b.name)
      if (sort==='vintage') return b.vintage - a.vintage
      if (sort==='rating') return (b.rating||0)-(a.rating||0)
      if (sort==='price') return (b.price||0)-(a.price||0)
      return 0
    })

  const sel = { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:9, padding:'9px 12px', color:'#e8e0d5', fontSize:13, outline:'none', cursor:'pointer' }

  return (
    <div>
      <div style={{ display:'flex', gap:10, marginBottom:18, flexWrap:'wrap' }}>
        <div style={{ position:'relative', flex:'1 1 200px' }}>
          <div style={{ position:'absolute', left:11, top:'50%', transform:'translateY(-50%)', color:'#6b7280', pointerEvents:'none' }}><SearchIcon /></div>
          <input style={{ ...sel, width:'100%', paddingLeft:34 }} placeholder="Vin, domaine, région…" value={q} onChange={e=>setQ(e.target.value)} />
        </div>
        <select style={sel} value={type} onChange={e=>setType(e.target.value)}>
          <option value="all">Tous types</option>
          {Object.entries(TYPE_LABELS).map(([v,l])=><option key={v} value={v}>{l}</option>)}
        </select>
        <select style={sel} value={statusF} onChange={e=>setStatusF(e.target.value)}>
          <option value="all">Tous statuts</option>
          <option value="ready">À maturité</option>
          <option value="young">Trop jeunes</option>
          <option value="urgent">À consommer vite</option>
        </select>
        <select style={sel} value={sort} onChange={e=>setSort(e.target.value)}>
          <option value="name">Nom</option>
          <option value="vintage">Millésime</option>
          <option value="rating">Note</option>
          <option value="price">Prix</option>
        </select>
        <button onClick={onAdd} style={{ display:'flex', alignItems:'center', gap:6, padding:'9px 16px', background:'linear-gradient(135deg,#8c2030,#ca2e43)', border:'none', borderRadius:9, color:'#fff', cursor:'pointer', fontSize:13, fontWeight:700, whiteSpace:'nowrap' }}>
          <PlusIcon /> Ajouter
        </button>
      </div>

      <div style={{ fontSize:12, color:'#6b7280', marginBottom:14 }}>
        {list.length} vin{list.length>1?'s':''} · {list.reduce((s,w)=>s+w.quantity,0)} bouteilles
      </div>

      {list.length === 0 ? (
        <div style={{ textAlign:'center', padding:'60px 20px' }}>
          <div style={{ fontSize:52, marginBottom:14, opacity:0.4 }}>🍷</div>
          <div style={{ fontSize:16, color:'#6b7280' }}>Cave vide ou aucun résultat</div>
          <div style={{ fontSize:13, color:'#4b5563', marginTop:6 }}>Ajoutez votre premier vin pour commencer</div>
        </div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(275px,1fr))', gap:14 }}>
          {list.map(w=><WineCard key={w.id} wine={w} onClick={()=>onSelect(w)} onEdit={onEdit} onDelete={onDelete}/>)}
        </div>
      )}
    </div>
  )
}

// ─── Vue Accords ───────────────────────────────────────────────────────────────
function AccordsView({ wines }) {
  const allFoods = [...new Set(wines.flatMap(w=>w.foodPairings||[]))].sort()
  const byFood = {}
  allFoods.forEach(f=>{ byFood[f]=wines.filter(w=>w.foodPairings?.includes(f)) })
  const typeDot = { red:'#ca2e43', white:'#d97706', rosé:'#f43f5e', sparkling:'#06b6d4', sweet:'#f59e0b' }

  return (
    <div>
      <div style={{ marginBottom:22, padding:18, borderRadius:14, background:'linear-gradient(145deg,#1a1a24,#111118)', border:'1px solid rgba(255,255,255,0.06)' }}>
        <p style={{ fontSize:13, color:'#9ca3af', lineHeight:1.7 }}>
          Accords mets & vins issus de votre cave. Chaque plat est associé aux bouteilles que vous avez sélectionnées.
        </p>
      </div>
      {allFoods.length === 0 ? (
        <div style={{ textAlign:'center', padding:'60px 20px' }}>
          <div style={{ fontSize:52, marginBottom:14, opacity:0.4 }}>🍽️</div>
          <div style={{ fontSize:16, color:'#6b7280' }}>Aucun accord défini</div>
          <div style={{ fontSize:13, color:'#4b5563', marginTop:6 }}>Ajoutez des accords lors de l'édition d'un vin</div>
        </div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(290px,1fr))', gap:13 }}>
          {allFoods.map(food=>(
            <div key={food} style={{ padding:16, borderRadius:13, background:'linear-gradient(145deg,#1a1a24,#111118)', border:'1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize:14, fontWeight:700, color:'#e8e0d5', marginBottom:11, display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ fontSize:17 }}>🍽️</span> {food}
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
                {byFood[food].map(w=>(
                  <div key={w.id} style={{ display:'flex', alignItems:'center', gap:9, padding:'7px 10px', borderRadius:9, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.04)' }}>
                    <div style={{ width:7, height:7, borderRadius:'50%', background:typeDot[w.type]||'#ca2e43', flexShrink:0 }}/>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:12, color:'#c9bfb5', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{w.name}</div>
                      <div style={{ fontSize:10, color:'#6b7280' }}>{w.vintage} · {TYPE_LABELS[w.type]}</div>
                    </div>
                    {w.rating>0 && <span style={{ fontSize:10, color:'#d97706', fontWeight:700 }}>{w.rating}</span>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Base de données vins à acheter ───────────────────────────────────────────
const WINE_DB = [
  // Rouges légers & fruités
  { name:'Pinot Noir d\'Alsace', appellation:'Alsace', region:'Alsace', type:'red', body:'light', taste:['fruité','floral','léger'], budget:[8,18], cepages:['Pinot Noir'], foods:['Charcuterie','Saumon grillé','Volaille','Fromages doux'], desc:'Léger, fruité, notes de cerise et framboise. Parfait en entrée de gamme.', score:87, garde:'1-4 ans' },
  { name:'Bourgogne Pinot Noir', appellation:'Bourgogne', region:'Bourgogne', type:'red', body:'light', taste:['fruité','élégant','minéral'], budget:[15,35], cepages:['Pinot Noir'], foods:['Volaille rôtie','Veau','Champignons','Comté'], desc:'Élégance bourguignonne, fruits rouges et notes terreuses caractéristiques.', score:89, garde:'3-8 ans' },
  { name:'Gevrey-Chambertin', appellation:'Gevrey-Chambertin', region:'Bourgogne', type:'red', body:'medium', taste:['complexe','épicé','terroir'], budget:[40,120], cepages:['Pinot Noir'], foods:['Bœuf bourguignon','Gibier','Canard','Époisses'], desc:'Grand terroir bourguignon. Tanins soyeux, finale longue et complexe.', score:94, garde:'8-20 ans' },
  { name:'Côte de Nuits-Villages', appellation:'Côte de Nuits', region:'Bourgogne', type:'red', body:'medium', taste:['fruité','structuré','terroir'], budget:[20,40], cepages:['Pinot Noir'], foods:['Magret de canard','Bœuf','Fromages affinés'], desc:'Porte d\'entrée idéale vers les grands vins de la Côte de Nuits.', score:90, garde:'5-12 ans' },
  // Rouges puissants
  { name:'Château Pichon Baron', appellation:'Pauillac', region:'Bordeaux', type:'red', body:'full', taste:['puissant','tannique','boisé'], budget:[60,150], cepages:['Cabernet Sauvignon','Merlot'], foods:['Agneau rôti','Filet de bœuf','Truffe'], desc:'Classique bordelais puissant. Fruits noirs, cèdre, finale tannique élégante.', score:95, garde:'15-30 ans' },
  { name:'Saint-Émilion Grand Cru', appellation:'Saint-Émilion', region:'Bordeaux', type:'red', body:'full', taste:['charnu','fruité','velouté'], budget:[25,80], cepages:['Merlot','Cabernet Franc'], foods:['Côte de bœuf','Magret','Foie gras'], desc:'Dominante Merlot, rondeur et générosité. Plus accessible que les Médocs.', score:91, garde:'8-20 ans' },
  { name:'Côtes du Rhône Villages', appellation:'Côtes du Rhône', region:'Vallée du Rhône', type:'red', body:'medium', taste:['épicé','fruité','chaleureux'], budget:[8,20], cepages:['Grenache','Syrah','Mourvèdre'], foods:['Daube','Pizza','Charcuterie','Grillades'], desc:'Rapport qualité-prix imbattable. Garrigue, fruits rouges, épices douces.', score:86, garde:'2-6 ans' },
  { name:'Châteauneuf-du-Pape', appellation:'Châteauneuf-du-Pape', region:'Vallée du Rhône', type:'red', body:'full', taste:['puissant','chaleureux','complexe'], budget:[30,80], cepages:['Grenache','Mourvèdre','Syrah'], foods:['Gibier','Agneau','Fromages puissants','Truffe'], desc:'Soleil du Rhône concentré. Alcool généreux, fruits mûrs, épices méditerranéennes.', score:93, garde:'8-20 ans' },
  { name:'Crozes-Hermitage', appellation:'Crozes-Hermitage', region:'Vallée du Rhône', type:'red', body:'medium', taste:['épicé','fumé','fruits noirs'], budget:[15,35], cepages:['Syrah'], foods:['Gibier','Daube provençale','Fromages affinés'], desc:'Syrah du Rhône septentrional. Olive noire, viande fumée, poivre blanc.', score:90, garde:'5-12 ans' },
  { name:'Barolo', appellation:'Barolo', region:'Piémont', type:'red', body:'full', taste:['tannique','complexe','floral'], budget:[35,100], cepages:['Nebbiolo'], foods:['Truffe blanche','Bœuf braisé','Gibier','Fromages affinés'], desc:'Le roi des vins italiens. Tanins puissants, rose fanée, goudron. Garde exceptionnelle.', score:96, garde:'15-30 ans' },
  { name:'Chianti Classico Riserva', appellation:'Chianti Classico', region:'Toscane', type:'red', body:'medium', taste:['fruité','épicé','acidité'], budget:[18,45], cepages:['Sangiovese'], foods:['Pasta bolognaise','Pizza','Viandes rouges','Pecorino'], desc:'Toscane authentique. Cerise, herbes, acidité fraîche et persistante.', score:91, garde:'5-15 ans' },
  { name:'Rioja Reserva', appellation:'Rioja', region:'Rioja', type:'red', body:'medium', taste:['boisé','vanillé','fruité'], budget:[12,30], cepages:['Tempranillo'], foods:['Agneau rôti','Jambon ibérique','Chorizo'], desc:'Espagne classique. Vieillissement en fût de chêne américain, vanille et fruits rouges.', score:89, garde:'5-12 ans' },
  // Blancs secs
  { name:'Sancerre', appellation:'Sancerre', region:'Loire', type:'white', body:'light', taste:['minéral','vif','fruité'], budget:[15,30], cepages:['Sauvignon Blanc'], foods:['Huîtres','Chèvre frais','Asperges','Poissons'], desc:'Le Sauvignon par excellence. Pierre à fusil, buis, agrumes, fraîcheur absolue.', score:91, garde:'2-6 ans' },
  { name:'Pouilly-Fumé', appellation:'Pouilly-Fumé', region:'Loire', type:'white', body:'light', taste:['fumé','minéral','vif'], budget:[18,40], cepages:['Sauvignon Blanc'], foods:['Chèvre','Asperges','Saumon','Crevettes'], desc:'Cousin du Sancerre, plus fumé. Minéralité unique, grande fraîcheur.', score:92, garde:'3-8 ans' },
  { name:'Chablis 1er Cru', appellation:'Chablis', region:'Bourgogne', type:'white', body:'medium', taste:['minéral','vif','iodé'], budget:[20,45], cepages:['Chardonnay'], foods:['Huîtres','Fruits de mer','Poissons nobles','Saint-Jacques'], desc:'Chardonnay le plus minéral qui soit. Silex, iode, citron vert. Accord huîtres parfait.', score:93, garde:'4-10 ans' },
  { name:'Puligny-Montrachet', appellation:'Puligny-Montrachet', region:'Bourgogne', type:'white', body:'full', taste:['complexe','beurré','minéral'], budget:[50,150], cepages:['Chardonnay'], foods:['Homard','Saint-Jacques','Truffe blanche','Sole'], desc:'Sommet du Chardonnay mondial. Beurre frais, noisette, minéralité profonde.', score:96, garde:'8-20 ans' },
  { name:'Meursault', appellation:'Meursault', region:'Bourgogne', type:'white', body:'full', taste:['beurré','noisette','opulent'], budget:[35,90], cepages:['Chardonnay'], foods:['Volaille à la crème','Poissons gras','Langoustines','Camembert'], desc:'Opulence bourguignonne. Beurre, noisette, miel. Plus généreux que Puligny.', score:94, garde:'6-15 ans' },
  { name:'Alsace Riesling Grand Cru', appellation:'Alsace Grand Cru', region:'Alsace', type:'white', body:'medium', taste:['minéral','pétrolé','vif'], budget:[20,50], cepages:['Riesling'], foods:['Choucroute','Poissons','Crustacés','Munster'], desc:'Riesling au sommet. Notes pétrolées avec l\'âge, acidité tendue, longévité exceptionnelle.', score:94, garde:'10-25 ans' },
  { name:'Condrieu', appellation:'Condrieu', region:'Vallée du Rhône', type:'white', body:'full', taste:['floral','exotique','opulent'], budget:[30,70], cepages:['Viognier'], foods:['Foie gras','Homard à la vanille','Poulet à la crème','Abricots'], desc:'Viognier pur, seul au monde à ce niveau. Abricot, violette, miel. Déroutant de luxe.', score:95, garde:'3-8 ans' },
  { name:'Muscadet Sèvre et Maine', appellation:'Muscadet', region:'Loire', type:'white', body:'light', taste:['minéral','iodé','vif'], budget:[6,15], cepages:['Melon de Bourgogne'], foods:['Huîtres','Moules marinières','Crevettes','Poissons'], desc:'Le vin des fruits de mer par excellence. Sur lie = plus de texture. Prix imbattable.', score:85, garde:'1-3 ans' },
  // Rosés
  { name:'Bandol Rosé', appellation:'Bandol', region:'Provence', type:'rosé', body:'medium', taste:['structuré','fruité','garrigue'], budget:[18,40], cepages:['Mourvèdre','Grenache'], foods:['Bouillabaisse','Grillades','Ratatouille','Tapenade'], desc:'Le roi des rosés provençaux. Tenue en bouche rare pour un rosé, fruits rouges et garrigue.', score:92, garde:'2-5 ans' },
  { name:'Tavel', appellation:'Tavel', region:'Vallée du Rhône', type:'rosé', body:'full', taste:['puissant','fruité','épicé'], budget:[12,22], cepages:['Grenache','Syrah'], foods:['Charcuterie','Grillades','Tajine','Fromages'], desc:'Le seul AOC 100% rosé de France. Charnu, coloré, peut se garder.', score:88, garde:'2-4 ans' },
  { name:'Côtes de Provence Rosé', appellation:'Côtes de Provence', region:'Provence', type:'rosé', body:'light', taste:['léger','fruité','floral'], budget:[8,20], cepages:['Grenache','Cinsault','Syrah'], foods:['Salade niçoise','Poissons grillés','Pizza','Apéritif'], desc:'L\'incontournable de l\'été. Pâle, frais, fleurs blanches et fruits exotiques.', score:86, garde:'1-2 ans' },
  // Effervescents
  { name:'Champagne Blanc de Blancs', appellation:'Champagne', region:'Champagne', type:'sparkling', body:'light', taste:['minéral','vif','élégant'], budget:[30,80], cepages:['Chardonnay'], foods:['Huîtres','Caviar','Saint-Jacques','Sushis'], desc:'100% Chardonnay, finesse absolue. Craie, citron, brioche légère. Apéritif de prestige.', score:93, garde:'5-15 ans' },
  { name:'Champagne Rosé', appellation:'Champagne', region:'Champagne', type:'sparkling', body:'medium', taste:['fruité','élégant','vif'], budget:[35,100], cepages:['Pinot Noir','Chardonnay'], foods:['Fraises','Saumon','Canard','Desserts aux fruits rouges'], desc:'Champagne rosé : fraise, framboise, petites bulles élégantes. Festif et versatile.', score:91, garde:'5-10 ans' },
  { name:'Crémant d\'Alsace', appellation:'Crémant d\'Alsace', region:'Alsace', type:'sparkling', body:'light', taste:['fruité','vif','frais'], budget:[10,20], cepages:['Pinot Blanc','Auxerrois'], foods:['Apéritif','Poissons','Fruits de mer','Desserts légers'], desc:'Meilleure alternative au Champagne en rapport Q/P. Frais, fruité, bulles fines.', score:88, garde:'2-5 ans' },
  // Liquoreux
  { name:'Sauternes', appellation:'Sauternes', region:'Bordeaux', type:'sweet', body:'full', taste:['doux','mielleux','complexe'], budget:[25,200], cepages:['Sémillon','Sauvignon'], foods:['Foie gras','Roquefort','Desserts exotiques','Tarte Tatin'], desc:'Le plus grand vin liquoreux du monde. Miel, abricot confit, botrytis noble unique.', score:96, garde:'20-50 ans' },
  { name:'Gewurztraminer Vendanges Tardives', appellation:'Alsace', region:'Alsace', type:'sweet', body:'full', taste:['exotique','doux','floral'], budget:[20,50], cepages:['Gewurztraminer'], foods:['Foie gras','Roquefort','Curry','Tarte aux mirabelles'], desc:'Litchi, rose, mangue, sucrosité équilibrée par l\'acidité alsacienne. Déroutant.', score:93, garde:'10-20 ans' },
]

const TASTE_OPTIONS = [
  { id:'léger', label:'Léger & délicat', icon:'🌸', desc:'Vins subtils, peu alcoolisés' },
  { id:'fruité', label:'Fruité & gourmand', icon:'🍓', desc:'Beaucoup de fruit, accessible' },
  { id:'minéral', label:'Minéral & vif', icon:'🪨', desc:'Fraîcheur, acidité, terroir' },
  { id:'boisé', label:'Boisé & vanillé', icon:'🪵', desc:'Passage en fût de chêne' },
  { id:'épicé', label:'Épicé & poivré', icon:'🌶️', desc:'Herbes, épices, garrigue' },
  { id:'puissant', label:'Puissant & tannique', icon:'💪', desc:'Structure, garde, concentration' },
  { id:'doux', label:'Doux & liquoreux', icon:'🍯', desc:'Sucré, mielleux, onctueux' },
  { id:'complexe', label:'Complexe & élégant', icon:'✨', desc:'Nuances, longueur, profondeur' },
]

const OCCASION_OPTIONS = [
  { id:'apero', label:'Apéritif', icon:'🥂' },
  { id:'poisson', label:'Poissons & fruits de mer', icon:'🐟' },
  { id:'viande', label:'Viandes & gibier', icon:'🥩' },
  { id:'fromage', label:'Fromages', icon:'🧀' },
  { id:'dessert', label:'Desserts', icon:'🍰' },
  { id:'fete', label:'Fête & célébration', icon:'🎉' },
  { id:'cadeau', label:'Cadeau', icon:'🎁' },
  { id:'cave', label:'Cave & investissement', icon:'📈' },
]

const BUDGET_RANGES = [
  { id:'b1', label:'< 15€', max:15, min:0, icon:'💰' },
  { id:'b2', label:'15 – 30€', max:30, min:15, icon:'💰💰' },
  { id:'b3', label:'30 – 60€', max:60, min:30, icon:'💰💰💰' },
  { id:'b4', label:'60 – 150€', max:150, min:60, icon:'💎' },
  { id:'b5', label:'+ de 150€', max:9999, min:150, icon:'👑' },
]

// ─── Vue Choisir un Vin ────────────────────────────────────────────────────────
function ChoisirView() {
  const [step, setStep] = useState(0)
  const [sel, setSel] = useState({ type: null, tastes: [], occasion: null, budget: null })
  const [results, setResults] = useState(null)

  const toggle = (field, val, multi = false) => {
    if (multi) {
      setSel(s => ({ ...s, [field]: s[field].includes(val) ? s[field].filter(x=>x!==val) : [...s[field], val] }))
    } else {
      setSel(s => ({ ...s, [field]: s[field] === val ? null : val }))
    }
  }

  const compute = () => {
    let scored = WINE_DB.map(w => {
      let score = 0
      if (sel.type && sel.type !== 'all' && w.type !== sel.type) return null
      if (sel.budget) {
        const b = BUDGET_RANGES.find(b => b.id === sel.budget)
        if (b && (w.budget[0] > b.max || w.budget[1] < b.min)) return null
      }
      if (sel.tastes.length > 0) {
        const matches = sel.tastes.filter(t => w.taste.includes(t)).length
        if (matches === 0) score -= 10
        score += matches * 15
      }
      if (sel.occasion) {
        const occasionFoodMap = {
          apero: ['Apéritif','Charcuterie','Tapenade'],
          poisson: ['Poissons','Saumon','Huîtres','Fruits de mer','Saint-Jacques','Moules marinières','Sole','Turbot'],
          viande: ['Bœuf','Agneau','Gibier','Magret','Côte de bœuf','Filet de bœuf','Côte de bœuf'],
          fromage: ['Fromages','Comté','Reblochon','Époisses','Chèvre','Munster','Pecorino','Roquefort'],
          dessert: ['Desserts','Tarte','Fraises'],
          fete: ['Champagne'],
          cadeau: [],
          cave: [],
        }
        const foods = occasionFoodMap[sel.occasion] || []
        const match = w.foods.some(f => foods.some(occ => f.toLowerCase().includes(occ.toLowerCase())))
        if (match) score += 20
        if (sel.occasion === 'fete' && w.type === 'sparkling') score += 30
        if (sel.occasion === 'cadeau' && w.score >= 92) score += 20
        if (sel.occasion === 'cave' && w.garde.includes('ans') && parseInt(w.garde) >= 8) score += 20
      }
      score += (w.score - 85) * 2
      return { ...w, matchScore: score }
    }).filter(Boolean).sort((a,b) => b.matchScore - a.matchScore)
    setResults(scored.slice(0, 6))
    setStep(4)
  }

  const reset = () => { setSel({ type: null, tastes: [], occasion: null, budget: null }); setResults(null); setStep(0) }

  const typeColor = { red:'#ca2e43', white:'#d97706', rosé:'#f43f5e', sparkling:'#06b6d4', sweet:'#f59e0b' }
  const typeLabel = { red:'Rouge', white:'Blanc', rosé:'Rosé', sparkling:'Effervescent', sweet:'Liquoreux', all:'Tous' }

  const btnBase = { padding:'10px 14px', borderRadius:11, cursor:'pointer', fontSize:13, fontWeight:500, transition:'all 0.15s', textAlign:'left' }
  const selected = (active) => active
    ? { ...btnBase, background:'rgba(139,26,48,0.25)', border:'1px solid rgba(139,26,48,0.55)', color:'#f9a8b8' }
    : { ...btnBase, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', color:'#9ca3af' }

  const progress = Math.round((step / 4) * 100)

  return (
    <div style={{ maxWidth:860, margin:'0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom:28, padding:'24px 28px', borderRadius:18, background:'linear-gradient(135deg,#3e0c17 0%,#1a0a1a 55%,#0a0a0f 100%)', border:'1px solid rgba(139,26,48,0.28)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 70% 50%,rgba(139,26,48,0.15) 0%,transparent 65%)', pointerEvents:'none' }}/>
        <div style={{ position:'relative' }}>
          <div style={{ fontSize:11, color:'#ca2e43', textTransform:'uppercase', letterSpacing:'0.15em', marginBottom:6, fontWeight:700 }}>Aide au choix</div>
          <h2 style={{ fontSize:22, fontWeight:900, color:'#e8e0d5', fontFamily:'Georgia,serif', marginBottom:8 }}>Quel vin choisir ?</h2>
          <p style={{ color:'#9ca3af', fontSize:13 }}>Répondez à 3 questions pour trouver le vin parfait selon votre goût, l'occasion et votre budget.</p>
        </div>
      </div>

      {step < 4 && (
        <div style={{ marginBottom:24 }}>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'#6b7280', marginBottom:8 }}>
            <span>{step === 0 ? 'Type de vin' : step === 1 ? 'Goût & style' : step === 2 ? 'Occasion' : 'Budget'}</span>
            <span>Étape {step+1} / 4</span>
          </div>
          <div style={{ height:4, background:'rgba(255,255,255,0.06)', borderRadius:2 }}>
            <div style={{ height:'100%', width:`${(step+1)*25}%`, background:'linear-gradient(90deg,#8c2030,#ca2e43)', borderRadius:2, transition:'width 0.3s' }}/>
          </div>
        </div>
      )}

      {/* Étape 0 : Type */}
      {step === 0 && (
        <div>
          <h3 style={{ fontSize:16, fontWeight:700, color:'#e8e0d5', marginBottom:16 }}>Quel type de vin ?</h3>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))', gap:10, marginBottom:24 }}>
            {[
              { id:'all', label:'Peu importe', icon:'🍷' },
              { id:'red', label:'Rouge', icon:'🔴' },
              { id:'white', label:'Blanc', icon:'⚪' },
              { id:'rosé', label:'Rosé', icon:'🌸' },
              { id:'sparkling', label:'Effervescent', icon:'🥂' },
              { id:'sweet', label:'Liquoreux', icon:'🍯' },
            ].map(t => (
              <button key={t.id} onClick={() => toggle('type', t.id)} style={{
                ...selected(sel.type === t.id),
                display:'flex', flexDirection:'column', alignItems:'center', padding:'16px 10px', gap:8, borderRadius:13,
              }}>
                <span style={{ fontSize:24 }}>{t.icon}</span>
                <span style={{ fontSize:12, fontWeight:600 }}>{t.label}</span>
              </button>
            ))}
          </div>
          <button onClick={() => setStep(1)} disabled={!sel.type}
            style={{ width:'100%', padding:'12px', background: sel.type ? 'linear-gradient(135deg,#8c2030,#ca2e43)' : 'rgba(255,255,255,0.05)', border:'none', borderRadius:11, color: sel.type ? '#fff' : '#4b5563', cursor: sel.type ? 'pointer' : 'default', fontSize:14, fontWeight:700 }}>
            Continuer →
          </button>
        </div>
      )}

      {/* Étape 1 : Goût */}
      {step === 1 && (
        <div>
          <h3 style={{ fontSize:16, fontWeight:700, color:'#e8e0d5', marginBottom:6 }}>Quel(s) style(s) vous attire(nt) ?</h3>
          <p style={{ fontSize:12, color:'#6b7280', marginBottom:16 }}>Sélectionnez 1 à 3 styles (facultatif)</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(175px,1fr))', gap:9, marginBottom:24 }}>
            {TASTE_OPTIONS.map(t => (
              <button key={t.id} onClick={() => toggle('tastes', t.id, true)} style={{
                ...selected(sel.tastes.includes(t.id)),
                display:'flex', alignItems:'center', gap:10, padding:'12px 14px',
              }}>
                <span style={{ fontSize:20, flexShrink:0 }}>{t.icon}</span>
                <div>
                  <div style={{ fontSize:12, fontWeight:600, color: sel.tastes.includes(t.id) ? '#f9a8b8' : '#c9bfb5' }}>{t.label}</div>
                  <div style={{ fontSize:10, color:'#6b7280', marginTop:1 }}>{t.desc}</div>
                </div>
              </button>
            ))}
          </div>
          <div style={{ display:'flex', gap:10 }}>
            <button onClick={() => setStep(0)} style={{ flex:1, padding:'12px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:11, color:'#9ca3af', cursor:'pointer', fontSize:13 }}>← Retour</button>
            <button onClick={() => setStep(2)} style={{ flex:3, padding:'12px', background:'linear-gradient(135deg,#8c2030,#ca2e43)', border:'none', borderRadius:11, color:'#fff', cursor:'pointer', fontSize:14, fontWeight:700 }}>Continuer →</button>
          </div>
        </div>
      )}

      {/* Étape 2 : Occasion */}
      {step === 2 && (
        <div>
          <h3 style={{ fontSize:16, fontWeight:700, color:'#e8e0d5', marginBottom:16 }}>Pour quelle occasion ?</h3>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))', gap:10, marginBottom:24 }}>
            {OCCASION_OPTIONS.map(o => (
              <button key={o.id} onClick={() => toggle('occasion', o.id)} style={{
                ...selected(sel.occasion === o.id),
                display:'flex', alignItems:'center', gap:10, padding:'13px 14px',
              }}>
                <span style={{ fontSize:22 }}>{o.icon}</span>
                <span style={{ fontSize:12, fontWeight:600 }}>{o.label}</span>
              </button>
            ))}
          </div>
          <div style={{ display:'flex', gap:10 }}>
            <button onClick={() => setStep(1)} style={{ flex:1, padding:'12px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:11, color:'#9ca3af', cursor:'pointer', fontSize:13 }}>← Retour</button>
            <button onClick={() => setStep(3)} style={{ flex:3, padding:'12px', background:'linear-gradient(135deg,#8c2030,#ca2e43)', border:'none', borderRadius:11, color:'#fff', cursor:'pointer', fontSize:14, fontWeight:700 }}>Continuer →</button>
          </div>
        </div>
      )}

      {/* Étape 3 : Budget */}
      {step === 3 && (
        <div>
          <h3 style={{ fontSize:16, fontWeight:700, color:'#e8e0d5', marginBottom:16 }}>Quel est votre budget ?</h3>
          <div style={{ display:'flex', flexDirection:'column', gap:9, marginBottom:24 }}>
            {BUDGET_RANGES.map(b => (
              <button key={b.id} onClick={() => toggle('budget', b.id)} style={{
                ...selected(sel.budget === b.id),
                display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 18px',
              }}>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <span style={{ fontSize:18 }}>{b.icon}</span>
                  <span style={{ fontSize:14, fontWeight:600 }}>{b.label}</span>
                </div>
                {sel.budget === b.id && <span style={{ fontSize:16 }}>✓</span>}
              </button>
            ))}
          </div>
          <div style={{ display:'flex', gap:10 }}>
            <button onClick={() => setStep(2)} style={{ flex:1, padding:'12px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:11, color:'#9ca3af', cursor:'pointer', fontSize:13 }}>← Retour</button>
            <button onClick={compute} disabled={!sel.budget}
              style={{ flex:3, padding:'12px', background: sel.budget ? 'linear-gradient(135deg,#8c2030,#ca2e43)' : 'rgba(255,255,255,0.05)', border:'none', borderRadius:11, color: sel.budget ? '#fff' : '#4b5563', cursor: sel.budget ? 'pointer' : 'default', fontSize:14, fontWeight:700 }}>
              Voir mes recommandations 🍷
            </button>
          </div>
        </div>
      )}

      {/* Résultats */}
      {step === 4 && results && (
        <div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20, flexWrap:'wrap', gap:10 }}>
            <div>
              <h3 style={{ fontSize:17, fontWeight:800, color:'#e8e0d5', fontFamily:'Georgia,serif' }}>
                {results.length} vin{results.length > 1 ? 's' : ''} recommandé{results.length > 1 ? 's' : ''}
              </h3>
              <p style={{ fontSize:12, color:'#6b7280', marginTop:3 }}>
                {sel.type && sel.type !== 'all' ? typeLabel[sel.type] : 'Tous types'} · {sel.budget ? BUDGET_RANGES.find(b=>b.id===sel.budget)?.label : 'Tous budgets'}
                {sel.occasion ? ` · ${OCCASION_OPTIONS.find(o=>o.id===sel.occasion)?.label}` : ''}
              </p>
            </div>
            <button onClick={reset} style={{ padding:'8px 16px', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:9, color:'#9ca3af', cursor:'pointer', fontSize:13 }}>
              ↺ Recommencer
            </button>
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {results.map((w, i) => (
              <div key={w.name} style={{
                padding:18, borderRadius:15,
                background: i === 0 ? 'linear-gradient(145deg,#1e1620,#160e14)' : 'linear-gradient(145deg,#1a1a24,#111118)',
                border: i === 0 ? '1px solid rgba(139,26,48,0.5)' : '1px solid rgba(255,255,255,0.06)',
                boxShadow: i === 0 ? '0 4px 20px rgba(139,26,48,0.12)' : 'none',
              }}>
                <div style={{ display:'flex', alignItems:'flex-start', gap:14 }}>
                  {/* Rang */}
                  <div style={{ width:34, height:34, borderRadius:10, background: i===0 ? 'linear-gradient(135deg,#d4a017,#f5c842)' : 'rgba(255,255,255,0.05)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontWeight:800, fontSize:14, color: i===0 ? '#000' : '#6b7280' }}>
                    {i+1}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:'flex', gap:7, marginBottom:5, flexWrap:'wrap', alignItems:'center' }}>
                      <span style={{ fontSize:10, padding:'2px 8px', borderRadius:20, background:`rgba(${typeColor[w.type]==='#ca2e43'?'202,46,67':typeColor[w.type]==='#d97706'?'217,119,6':typeColor[w.type]==='#f43f5e'?'244,63,94':typeColor[w.type]==='#06b6d4'?'6,182,212':'245,158,11'},0.18)`, color:typeColor[w.type], fontWeight:600 }}>
                        {typeLabel[w.type]}
                      </span>
                      <span style={{ fontSize:10, color:'#6b7280' }}>{w.appellation}</span>
                      {i === 0 && <span style={{ fontSize:10, padding:'2px 8px', borderRadius:20, background:'rgba(212,160,23,0.15)', color:'#d4a017', fontWeight:700 }}>★ Meilleur choix</span>}
                    </div>
                    <div style={{ fontSize:15, fontWeight:800, color:'#e8e0d5', fontFamily:'Georgia,serif', marginBottom:3 }}>{w.name}</div>
                    <div style={{ fontSize:12, color:'#9ca3af', marginBottom:8, lineHeight:1.5 }}>{w.desc}</div>

                    {/* Détails */}
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(130px,1fr))', gap:8 }}>
                      <div style={{ padding:'8px 10px', borderRadius:8, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ fontSize:10, color:'#6b7280', marginBottom:2, textTransform:'uppercase', letterSpacing:'0.06em' }}>Budget</div>
                        <div style={{ fontSize:13, fontWeight:700, color:'#d97706' }}>{w.budget[0]}€ – {w.budget[1]}€</div>
                      </div>
                      <div style={{ padding:'8px 10px', borderRadius:8, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ fontSize:10, color:'#6b7280', marginBottom:2, textTransform:'uppercase', letterSpacing:'0.06em' }}>Garde</div>
                        <div style={{ fontSize:13, fontWeight:700, color:'#60a5fa' }}>{w.garde}</div>
                      </div>
                      <div style={{ padding:'8px 10px', borderRadius:8, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ fontSize:10, color:'#6b7280', marginBottom:2, textTransform:'uppercase', letterSpacing:'0.06em' }}>Note critique</div>
                        <div style={{ fontSize:13, fontWeight:700, color:'#f59e0b' }}>{w.score} / 100</div>
                      </div>
                      <div style={{ padding:'8px 10px', borderRadius:8, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ fontSize:10, color:'#6b7280', marginBottom:2, textTransform:'uppercase', letterSpacing:'0.06em' }}>Cépage</div>
                        <div style={{ fontSize:12, fontWeight:600, color:'#f9a8b8' }}>{w.cepages.join(', ')}</div>
                      </div>
                    </div>

                    {/* Accords */}
                    <div style={{ marginTop:10 }}>
                      <div style={{ fontSize:10, color:'#6b7280', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.06em' }}>Accords mets & vins</div>
                      <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
                        {w.foods.map(f=>(
                          <span key={f} style={{ fontSize:10, padding:'2px 8px', borderRadius:10, background:'rgba(20,50,20,0.5)', border:'1px solid rgba(34,100,34,0.3)', color:'#86efac' }}>{f}</span>
                        ))}
                      </div>
                    </div>

                    {/* Style tags */}
                    <div style={{ marginTop:8, display:'flex', flexWrap:'wrap', gap:5 }}>
                      {w.taste.map(t=>(
                        <span key={t} style={{ fontSize:10, padding:'2px 8px', borderRadius:10, background:'rgba(120,53,15,0.2)', border:'1px solid rgba(180,83,9,0.3)', color:'#fcd34d' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── App ───────────────────────────────────────────────────────────────────────
const TABS = [
  { id:'dashboard', label:'Tableau de bord', icon:<ChartBar/> },
  { id:'cave', label:'Ma Cave', icon:<CellarIcon/> },
  { id:'accords', label:'Accords', icon:<ForkKnifeIcon/> },
  { id:'choisir', label:'Choisir un Vin', icon:<span style={{fontSize:16}}>🔍</span> },
]

export default function App() {
  const [wines, setWines] = useState([])
  const [tab, setTab] = useState('dashboard')
  const [showAdd, setShowAdd] = useState(false)
  const [editW, setEditW] = useState(null)
  const [detailW, setDetailW] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(()=>{
    const s = localStorage.getItem('cave-a-vin-v1')
    setWines(s ? JSON.parse(s) : DEMO_WINES)
    setReady(true)
  },[])

  useEffect(()=>{ if(ready) localStorage.setItem('cave-a-vin-v1', JSON.stringify(wines)) },[wines,ready])

  const save = useCallback(w=>{
    setWines(prev=>prev.find(x=>x.id===w.id)?prev.map(x=>x.id===w.id?w:x):[...prev,w])
    setShowAdd(false); setEditW(null)
  },[])

  const del = useCallback(id=>{
    if(!confirm('Supprimer ce vin de la cave ?')) return
    setWines(p=>p.filter(w=>w.id!==id))
    if(detailW?.id===id) setDetailW(null)
  },[detailW])

  const edit = useCallback(w=>{ setDetailW(null); setEditW(w) },[])

  const total = wines.reduce((s,w)=>s+w.quantity,0)
  const readyCount = wines.filter(w=>getDrinkStatus(w).label==='À maturité').length

  if(!ready) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#0a0a0f' }}>
      <WineGlass size={40} color="#8c2030" />
    </div>
  )

  return (
    <div style={{ minHeight:'100vh', background:'#0a0a0f' }}>
      {/* Header */}
      <header style={{ position:'sticky', top:0, zIndex:40, background:'rgba(10,10,15,0.92)', backdropFilter:'blur(18px)', borderBottom:'1px solid rgba(139,26,48,0.18)' }}>
        <div style={{ maxWidth:1300, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', height:60, padding:'0 20px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:11 }}>
            <div style={{ width:34, height:34, borderRadius:9, background:'linear-gradient(135deg,#8c2030,#3e0c17)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <WineGlass size={16} color="#f9a8b8" />
            </div>
            <div>
              <div style={{ fontSize:16, fontWeight:800, color:'#e8e0d5', fontFamily:'Georgia,serif', letterSpacing:'0.02em' }}>Cave à Vin</div>
              <div style={{ fontSize:9, color:'#6b7280', textTransform:'uppercase', letterSpacing:'0.1em' }}>{total} bouteilles · {readyCount} prêtes</div>
            </div>
          </div>

          <nav style={{ display:'flex', gap:3 }}>
            {TABS.map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)}
                style={{
                  display:'flex', alignItems:'center', gap:7, padding:'7px 14px', borderRadius:9,
                  background: tab===t.id ? 'rgba(139,26,48,0.22)' : 'transparent',
                  border: tab===t.id ? '1px solid rgba(139,26,48,0.38)' : '1px solid transparent',
                  color: tab===t.id ? '#f9a8b8' : '#6b7280',
                  cursor:'pointer', fontSize:13, fontWeight: tab===t.id ? 700 : 400, transition:'all 0.15s',
                }}>
                {t.icon} {t.label}
              </button>
            ))}
          </nav>

          <button onClick={()=>setShowAdd(true)} style={{ display:'flex', alignItems:'center', gap:6, padding:'7px 14px', background:'linear-gradient(135deg,#8c2030,#ca2e43)', border:'none', borderRadius:9, color:'#fff', cursor:'pointer', fontSize:13, fontWeight:700 }}>
            <PlusIcon /> Ajouter
          </button>
        </div>
      </header>

      {/* Main */}
      <main style={{ maxWidth:1300, margin:'0 auto', padding:'28px 20px' }}>
        {tab === 'dashboard' && (
          <div style={{ marginBottom:26, padding:'28px 32px', borderRadius:18, background:'linear-gradient(135deg,#3e0c17 0%,#1a0a1a 55%,#0a0a0f 100%)', border:'1px solid rgba(139,26,48,0.28)', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 80% 50%,rgba(139,26,48,0.18) 0%,transparent 65%)', pointerEvents:'none' }}/>
            <div style={{ position:'relative' }}>
              <div style={{ fontSize:11, color:'#ca2e43', textTransform:'uppercase', letterSpacing:'0.15em', marginBottom:7, fontWeight:700 }}>Millésime {YEAR}</div>
              <h1 style={{ fontSize:28, fontWeight:900, color:'#e8e0d5', fontFamily:'Georgia,serif', lineHeight:1.2, marginBottom:10 }}>
                Votre cave compte<br/>
                <span style={{ background:'linear-gradient(135deg,#d4a017,#f5c842)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                  {total} bouteilles
                </span>
              </h1>
              <p style={{ color:'#9ca3af', fontSize:13 }}>
                {readyCount} vin{readyCount>1?'s':''} à leur apogée · {wines.filter(w=>getDrinkStatus(w).label==='Trop jeune').length} en attente
              </p>
            </div>
          </div>
        )}

        {tab==='dashboard' && <Dashboard wines={wines}/>}
        {tab==='cave' && <CaveView wines={wines} onAdd={()=>setShowAdd(true)} onEdit={edit} onDelete={del} onSelect={setDetailW}/>}
        {tab==='accords' && <AccordsView wines={wines}/>}
        {tab==='choisir' && <ChoisirView/>}
      </main>

      <Modal open={showAdd} onClose={()=>setShowAdd(false)} title="Ajouter un vin à la cave">
        <WineForm onSave={save} onClose={()=>setShowAdd(false)}/>
      </Modal>
      <Modal open={!!editW} onClose={()=>setEditW(null)} title="Modifier le vin">
        {editW && <WineForm initial={editW} onSave={save} onClose={()=>setEditW(null)}/>}
      </Modal>
      <Modal open={!!detailW} onClose={()=>setDetailW(null)} title="Fiche du vin">
        {detailW && <WineDetail wine={detailW} onEdit={edit}/>}
      </Modal>
    </div>
  )
}
