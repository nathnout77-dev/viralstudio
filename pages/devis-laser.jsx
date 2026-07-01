import { useState, useEffect, useMemo } from 'react'

// ─── Constantes & helpers ──────────────────────────────────────────────────
const PIERCING_TIME_S = 1 // temps fixe d'amorçage laser par perçage (N_total × 1)

const uid = () => Math.random().toString(36).slice(2, 10)

const num = (v, fallback = 0) => {
  const n = parseFloat(v)
  return Number.isFinite(n) && n >= 0 ? n : fallback
}

const newHole = () => ({ id: uid(), label: '', qte: '', temps: '' })
const newPiece = () => ({
  id: uid(),
  nom: 'Pièce 1',
  quantite: '1',
  longueurContour: '',
  vitesseContour: '',
  tempsContourManuel: '',
  modeContour: 'auto', // 'auto' (longueur/vitesse) ou 'manuel'
  surfaceM2: '',
  trous: [newHole()],
  oblongs: [newHole()],
})

const defaultSettings = {
  tauxHoraire: '60',      // €/h machine
  coefficient: '1.20',
  prixMatiereM2: '0',     // €/m²
  fraisMiseEnRoute: '0',  // €/devis
  tva: '20',
}

const STORAGE_KEY = 'devis-laser-v1'

// ─── Calculs ────────────────────────────────────────────────────────────────
function computeContourTime(piece) {
  if (piece.modeContour === 'manuel') return num(piece.tempsContourManuel)
  const longueur = num(piece.longueurContour) // mm
  const vitesse = num(piece.vitesseContour)   // mm/s
  if (!vitesse) return 0
  return longueur / vitesse
}

function computePiece(piece, settings) {
  const coefficient = num(settings.coefficient, 1)
  const tContour = computeContourTime(piece)

  const trousDetail = piece.trous
    .filter(h => h.qte || h.temps)
    .map(h => ({ ...h, qte: num(h.qte), temps: num(h.temps), sousTotal: num(h.qte) * num(h.temps) }))
  const oblongsDetail = piece.oblongs
    .filter(h => h.qte || h.temps)
    .map(h => ({ ...h, qte: num(h.qte), temps: num(h.temps), sousTotal: num(h.qte) * num(h.temps) }))

  const tTrous = trousDetail.reduce((s, h) => s + h.sousTotal, 0)
  const tOblongs = oblongsDetail.reduce((s, h) => s + h.sousTotal, 0)
  const nTotal = trousDetail.reduce((s, h) => s + h.qte, 0) + oblongsDetail.reduce((s, h) => s + h.qte, 0)
  const tPercage = nTotal * PIERCING_TIME_S

  const tBrut = tContour + tTrous + tOblongs + tPercage
  const tFacture = coefficient * tBrut // secondes, par pièce unitaire

  const quantite = num(piece.quantite, 1) || 1
  const tempsTotalLot = tFacture * quantite // secondes pour tout le lot

  const tauxHoraire = num(settings.tauxHoraire)
  const coutMachineUnitaire = (tFacture / 3600) * tauxHoraire
  const coutMachineLot = coutMachineUnitaire * quantite

  const prixMatiereM2 = num(settings.prixMatiereM2)
  const coutMatiereUnitaire = num(piece.surfaceM2) * prixMatiereM2
  const coutMatiereLot = coutMatiereUnitaire * quantite

  const coutTotalLot = coutMachineLot + coutMatiereLot

  return {
    tContour, trousDetail, oblongsDetail, tTrous, tOblongs, nTotal, tPercage,
    tBrut, tFacture, quantite, tempsTotalLot,
    coutMachineUnitaire, coutMachineLot, coutMatiereUnitaire, coutMatiereLot, coutTotalLot,
  }
}

function fmtTime(s) {
  if (!Number.isFinite(s)) return '0 s'
  if (s < 60) return `${s.toFixed(1)} s`
  const m = Math.floor(s / 60)
  const r = s - m * 60
  return `${m} min ${r.toFixed(0)} s`
}

const fmtEur = (v) => (Number.isFinite(v) ? v : 0).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })

// ─── UI ─────────────────────────────────────────────────────────────────────
const card = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 18 }
const label = { fontSize: 11, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4, display: 'block', fontWeight: 600 }
const inputStyle = { width: '100%', padding: '8px 10px', borderRadius: 8, background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.12)', color: '#f5ede0', fontSize: 13 }
const btn = (primary) => ({
  padding: '9px 14px', borderRadius: 9, cursor: 'pointer', fontSize: 12.5, fontWeight: 700, border: 'none',
  background: primary ? 'linear-gradient(135deg,#8c2030,#ca2e43)' : 'rgba(255,255,255,0.06)',
  color: primary ? '#fff' : '#d1d5db',
})

function Field({ children, w }) {
  return <div style={{ flex: w || 1, minWidth: 0 }}>{children}</div>
}

function HoleRow({ hole, onChange, onRemove, kindLabel }) {
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'flex-end' }}>
      <Field w={2}>
        <label style={label}>{kindLabel}</label>
        <input style={inputStyle} placeholder="ex: Ø6 mm" value={hole.label}
          onChange={e => onChange({ ...hole, label: e.target.value })} />
      </Field>
      <Field>
        <label style={label}>Quantité</label>
        <input style={inputStyle} type="number" min="0" value={hole.qte}
          onChange={e => onChange({ ...hole, qte: e.target.value })} />
      </Field>
      <Field>
        <label style={label}>Temps unitaire (s)</label>
        <input style={inputStyle} type="number" min="0" step="0.1" value={hole.temps}
          onChange={e => onChange({ ...hole, temps: e.target.value })} />
      </Field>
      <button onClick={onRemove} style={{ ...btn(false), padding: '8px 10px', color: '#f87171' }}>✕</button>
    </div>
  )
}

function PieceCard({ piece, settings, onChange, onRemove, canRemove }) {
  const result = useMemo(() => computePiece(piece, settings), [piece, settings])

  const set = (patch) => onChange({ ...piece, ...patch })
  const setHole = (kind, id, updated) => set({ [kind]: piece[kind].map(h => h.id === id ? updated : h) })
  const addHole = (kind) => set({ [kind]: [...piece[kind], newHole()] })
  const removeHole = (kind, id) => set({ [kind]: piece[kind].filter(h => h.id !== id) })

  return (
    <div style={{ ...card, marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <input style={{ ...inputStyle, fontWeight: 700, fontSize: 15, background: 'transparent', border: 'none', padding: '4px 0', maxWidth: 260 }}
          value={piece.nom} onChange={e => set({ nom: e.target.value })} />
        {canRemove && <button onClick={onRemove} style={{ ...btn(false), color: '#f87171' }}>Supprimer la pièce</button>}
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <Field><label style={label}>Quantité de pièces</label>
          <input style={inputStyle} type="number" min="1" value={piece.quantite} onChange={e => set({ quantite: e.target.value })} />
        </Field>
        <Field w={2}><label style={label}>Surface matière (m²) — optionnel</label>
          <input style={inputStyle} type="number" min="0" step="0.001" value={piece.surfaceM2} onChange={e => set({ surfaceM2: e.target.value })} />
        </Field>
      </div>

      {/* Contour */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
          <span style={{ ...label, marginBottom: 0 }}>T contour</span>
          <div style={{ display: 'flex', gap: 4 }}>
            {['auto', 'manuel'].map(m => (
              <button key={m} onClick={() => set({ modeContour: m })}
                style={{ ...btn(piece.modeContour === m), padding: '4px 10px', fontSize: 11 }}>
                {m === 'auto' ? 'Longueur / vitesse' : 'Temps direct'}
              </button>
            ))}
          </div>
        </div>
        {piece.modeContour === 'auto' ? (
          <div style={{ display: 'flex', gap: 8 }}>
            <Field><label style={label}>Longueur contour (mm)</label>
              <input style={inputStyle} type="number" min="0" value={piece.longueurContour}
                onChange={e => set({ longueurContour: e.target.value })} />
            </Field>
            <Field><label style={label}>Vitesse de coupe (mm/s)</label>
              <input style={inputStyle} type="number" min="0" value={piece.vitesseContour}
                onChange={e => set({ vitesseContour: e.target.value })} />
            </Field>
          </div>
        ) : (
          <Field><label style={label}>T contour (s)</label>
            <input style={inputStyle} type="number" min="0" value={piece.tempsContourManuel}
              onChange={e => set({ tempsContourManuel: e.target.value })} />
          </Field>
        )}
      </div>

      {/* Trous */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <span style={label}>Trous</span>
          <button onClick={() => addHole('trous')} style={{ ...btn(false), padding: '4px 10px', fontSize: 11 }}>+ ajouter un diamètre</button>
        </div>
        {piece.trous.map(h => (
          <HoleRow key={h.id} hole={h} kindLabel="Type / diamètre"
            onChange={u => setHole('trous', h.id, u)} onRemove={() => removeHole('trous', h.id)} />
        ))}
      </div>

      {/* Oblongs */}
      <div style={{ marginBottom: 4 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <span style={label}>Oblongs</span>
          <button onClick={() => addHole('oblongs')} style={{ ...btn(false), padding: '4px 10px', fontSize: 11 }}>+ ajouter un type</button>
        </div>
        {piece.oblongs.map(h => (
          <HoleRow key={h.id} hole={h} kindLabel="Type / dimension"
            onChange={u => setHole('oblongs', h.id, u)} onRemove={() => removeHole('oblongs', h.id)} />
        ))}
      </div>

      {/* Détail calcul */}
      <div style={{ marginTop: 14, padding: 12, borderRadius: 10, background: 'rgba(0,0,0,0.3)', fontSize: 12.5, color: '#c9c3ba' }}>
        <div style={{ fontWeight: 700, color: '#e8e0d5', marginBottom: 6 }}>Détail du calcul (par pièce)</div>
        <Row k="T contour" v={fmtTime(result.tContour)} />
        <Row k={`Σ trous (${result.trousDetail.reduce((s, h) => s + h.qte, 0)} perçages)`} v={fmtTime(result.tTrous)} />
        <Row k={`Σ oblongs (${result.oblongsDetail.reduce((s, h) => s + h.qte, 0)} perçages)`} v={fmtTime(result.tOblongs)} />
        <Row k={`N total × 1 s (${result.nTotal} perçages)`} v={fmtTime(result.tPercage)} />
        <Row k="Temps brut (somme)" v={fmtTime(result.tBrut)} />
        <Row k={`× coefficient ${settings.coefficient}`} v={fmtTime(result.tFacture)} bold />
        <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '8px 0' }} />
        <Row k={`Coût machine unitaire (${settings.tauxHoraire} €/h)`} v={fmtEur(result.coutMachineUnitaire)} />
        {num(piece.surfaceM2) > 0 && <Row k="Coût matière unitaire" v={fmtEur(result.coutMatiereUnitaire)} />}
        <Row k={`Total lot (× ${result.quantite})`} v={fmtEur(result.coutTotalLot)} bold accent />
      </div>
    </div>
  )
}

function Row({ k, v, bold, accent }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 0', fontWeight: bold ? 700 : 400, color: accent ? '#f9a8b8' : undefined }}>
      <span>{k}</span><span>{v}</span>
    </div>
  )
}

export default function DevisLaser() {
  const [settings, setSettings] = useState(defaultSettings)
  const [pieces, setPieces] = useState([newPiece()])
  const [client, setClient] = useState({ nom: '', ref: '' })
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const data = JSON.parse(raw)
        if (data.settings) setSettings(data.settings)
        if (data.pieces?.length) setPieces(data.pieces)
        if (data.client) setClient(data.client)
      }
    } catch {}
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ settings, pieces, client })) } catch {}
  }, [settings, pieces, client, loaded])

  const results = useMemo(() => pieces.map(p => ({ piece: p, result: computePiece(p, settings) })), [pieces, settings])
  const sousTotal = results.reduce((s, r) => s + r.result.coutTotalLot, 0)
  const fraisMiseEnRoute = num(settings.fraisMiseEnRoute)
  const totalHT = sousTotal + fraisMiseEnRoute
  const tva = num(settings.tva)
  const totalTTC = totalHT * (1 + tva / 100)

  const updatePiece = (id, patch) => setPieces(ps => ps.map(p => p.id === id ? patch : p))
  const removePiece = (id) => setPieces(ps => ps.filter(p => p.id !== id))
  const addPiece = () => setPieces(ps => [...ps, { ...newPiece(), nom: `Pièce ${ps.length + 1}` }])
  const resetAll = () => {
    if (!confirm('Réinitialiser tout le devis ?')) return
    setSettings(defaultSettings); setPieces([newPiece()]); setClient({ nom: '', ref: '' })
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 16px' }}>
      <style>{`@media print { .no-print { display: none !important; } body { background: #fff !important; color: #000 !important; } }`}</style>

      <div style={{ marginBottom: 24, padding: '24px 28px', borderRadius: 18, background: 'linear-gradient(135deg,#3e0c17 0%,#1a0a1a 55%,#0a0a0f 100%)', border: '1px solid rgba(139,26,48,0.28)' }}>
        <div style={{ fontSize: 11, color: '#ca2e43', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 6, fontWeight: 700 }}>Découpe laser</div>
        <h1 style={{ fontSize: 22, fontWeight: 900, color: '#e8e0d5', marginBottom: 8 }}>Simulateur de devis</h1>
        <p style={{ color: '#9ca3af', fontSize: 13 }}>
          T_facturé = 1,20 × [T_contour + Σ(N_trous × T_trou) + Σ(N_oblongs × T_oblong) + N_total × 1]
        </p>
      </div>

      {/* Paramètres */}
      <div className="no-print" style={{ ...card, marginBottom: 20 }}>
        <div style={{ fontWeight: 700, color: '#e8e0d5', marginBottom: 12 }}>Paramètres de facturation</div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Field><label style={label}>Taux horaire machine (€/h)</label>
            <input style={inputStyle} type="number" min="0" value={settings.tauxHoraire}
              onChange={e => setSettings(s => ({ ...s, tauxHoraire: e.target.value }))} /></Field>
          <Field><label style={label}>Coefficient (marge)</label>
            <input style={inputStyle} type="number" min="1" step="0.01" value={settings.coefficient}
              onChange={e => setSettings(s => ({ ...s, coefficient: e.target.value }))} /></Field>
          <Field><label style={label}>Prix matière (€/m²)</label>
            <input style={inputStyle} type="number" min="0" value={settings.prixMatiereM2}
              onChange={e => setSettings(s => ({ ...s, prixMatiereM2: e.target.value }))} /></Field>
          <Field><label style={label}>Frais de mise en route (€)</label>
            <input style={inputStyle} type="number" min="0" value={settings.fraisMiseEnRoute}
              onChange={e => setSettings(s => ({ ...s, fraisMiseEnRoute: e.target.value }))} /></Field>
          <Field><label style={label}>TVA (%)</label>
            <input style={inputStyle} type="number" min="0" value={settings.tva}
              onChange={e => setSettings(s => ({ ...s, tva: e.target.value }))} /></Field>
        </div>
      </div>

      {/* Client */}
      <div className="no-print" style={{ ...card, marginBottom: 20 }}>
        <div style={{ fontWeight: 700, color: '#e8e0d5', marginBottom: 12 }}>Client / référence</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Field><label style={label}>Client</label>
            <input style={inputStyle} value={client.nom} onChange={e => setClient(c => ({ ...c, nom: e.target.value }))} /></Field>
          <Field><label style={label}>Référence devis</label>
            <input style={inputStyle} value={client.ref} onChange={e => setClient(c => ({ ...c, ref: e.target.value }))} /></Field>
        </div>
      </div>

      {/* Pièces */}
      {pieces.map(p => (
        <PieceCard key={p.id} piece={p} settings={settings}
          onChange={patch => updatePiece(p.id, patch)}
          onRemove={() => removePiece(p.id)}
          canRemove={pieces.length > 1} />
      ))}

      <button onClick={addPiece} className="no-print" style={{ ...btn(false), width: '100%', marginBottom: 20, padding: 12 }}>+ Ajouter une pièce au devis</button>

      {/* Total */}
      <div style={{ ...card, background: 'rgba(139,26,48,0.12)', border: '1px solid rgba(139,26,48,0.35)' }}>
        <Row k="Sous-total pièces" v={fmtEur(sousTotal)} />
        <Row k="Frais de mise en route" v={fmtEur(fraisMiseEnRoute)} />
        <Row k="Total HT" v={fmtEur(totalHT)} bold />
        <Row k={`TVA (${tva}%)`} v={fmtEur(totalHT * tva / 100)} />
        <div style={{ height: 1, background: 'rgba(255,255,255,0.15)', margin: '8px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 900, color: '#f9a8b8' }}>
          <span>Total TTC</span><span>{fmtEur(totalTTC)}</span>
        </div>
      </div>

      <div className="no-print" style={{ display: 'flex', gap: 10, marginTop: 16 }}>
        <button onClick={() => window.print()} style={btn(true)}>🖨️ Imprimer / Exporter PDF</button>
        <button onClick={resetAll} style={btn(false)}>Réinitialiser</button>
      </div>
    </div>
  )
}
