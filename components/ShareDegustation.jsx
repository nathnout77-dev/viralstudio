import { useEffect, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { X, Share2, Download, Loader2 } from 'lucide-react'
import useModalBehavior from '../lib/useModal'

// ═══════════════════════════════════════════════════════════════════════════
// Partage de dégustation — carte image 1080×1350 (4:5 Instagram) via canvas.
// Fond noir → bordeaux, nom du vin en Tangerine, note en grappes or,
// extrait du ressenti, signature Œno. Prévisualisation puis share / download.
// ═══════════════════════════════════════════════════════════════════════════

const W = 1080
const H = 1350
const GOLD = '#c9a84c'
const CREAM = '#f5f0e8'

// Découpe un texte en lignes tenant dans maxWidth (police déjà appliquée au ctx)
function wrapLines(ctx, text, maxWidth, maxLines) {
  const words = text.split(/\s+/)
  const lines = []
  let line = ''
  for (const word of words) {
    const test = line ? `${line} ${word}` : word
    if (ctx.measureText(test).width <= maxWidth) {
      line = test
    } else {
      if (line) lines.push(line)
      line = word
      if (lines.length === maxLines - 1) break
    }
  }
  if (line && lines.length < maxLines) lines.push(line)
  // Ellipse si le texte a été tronqué
  const used = lines.join(' ')
  if (used.length < text.trim().length && lines.length > 0) {
    lines[lines.length - 1] = lines[lines.length - 1].replace(/[,.\s]*$/, '') + '…'
  }
  return lines
}

// Dessine une petite grappe de raisin (grains en quinconce + tige)
function drawGrappe(ctx, cx, cy, scale, filled) {
  ctx.save()
  ctx.translate(cx, cy)
  ctx.scale(scale, scale)
  ctx.lineWidth = 2.2
  ctx.strokeStyle = filled ? GOLD : 'rgba(245,240,232,0.35)'
  ctx.fillStyle = filled ? GOLD : 'transparent'

  // Tige
  ctx.beginPath()
  ctx.moveTo(0, -16)
  ctx.quadraticCurveTo(3, -10, 0, -6)
  ctx.stroke()

  // Grains : rangées 3 / 2 / 1
  const r = 5.2
  const rows = [
    [-11, 0, 11].map(x => [x, 0]),
    [-5.5, 5.5].map(x => [x, 9]),
    [[0, 18]],
  ].flat()
  rows.forEach(([x, y]) => {
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    if (filled) ctx.fill()
    ctx.stroke()
  })
  ctx.restore()
}

async function renderCard(canvas, entry) {
  // S'assurer que les polices sont chargées AVANT de dessiner le canvas
  try {
    await Promise.all([
      document.fonts.load('700 130px Tangerine'),
      document.fonts.load('400 62px Tangerine'),
      document.fonts.load('italic 500 40px "Fraunces"'),
      document.fonts.load('600 26px Inter'),
      document.fonts.ready,
    ])
  } catch { /* on dessine quand même, fallback système */ }

  const ctx = canvas.getContext('2d')
  canvas.width = W
  canvas.height = H

  // Fond : dégradé noir → bordeaux
  const bg = ctx.createLinearGradient(0, 0, W * 0.4, H)
  bg.addColorStop(0, '#0C0A09')
  bg.addColorStop(0.55, '#26060f')
  bg.addColorStop(1, '#5c0d22')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, W, H)

  // Halo doux en haut à droite
  const halo = ctx.createRadialGradient(W * 0.85, H * 0.1, 0, W * 0.85, H * 0.1, 600)
  halo.addColorStop(0, 'rgba(201,168,76,0.10)')
  halo.addColorStop(1, 'rgba(201,168,76,0)')
  ctx.fillStyle = halo
  ctx.fillRect(0, 0, W, H)

  // Cadre fin doré
  ctx.strokeStyle = 'rgba(201,168,76,0.45)'
  ctx.lineWidth = 2
  ctx.strokeRect(48, 48, W - 96, H - 96)

  ctx.textAlign = 'center'

  // Eyebrow
  ctx.fillStyle = GOLD
  ctx.font = '600 26px Inter, sans-serif'
  const eyebrow = 'M É M O I R E S   D E   V I N'
  ctx.fillText(eyebrow, W / 2, 175)

  // Date
  let dateStr = ''
  if (entry.tastedAt) {
    try {
      dateStr = new Date(entry.tastedAt + 'T12:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    } catch { dateStr = entry.tastedAt }
  }
  if (dateStr) {
    ctx.fillStyle = 'rgba(245,240,232,0.55)'
    ctx.font = '400 30px Inter, sans-serif'
    ctx.fillText(dateStr, W / 2, 230)
  }

  // Nom du vin — Tangerine, taille adaptative
  let nameSize = 150
  ctx.font = `700 ${nameSize}px Tangerine, cursive`
  while (ctx.measureText(entry.name).width > W - 180 && nameSize > 70) {
    nameSize -= 8
    ctx.font = `700 ${nameSize}px Tangerine, cursive`
  }
  ctx.fillStyle = CREAM
  ctx.fillText(entry.name, W / 2, 420)

  // Domaine · millésime
  const sub = [entry.domain, entry.vintage].filter(Boolean).join(' · ')
  if (sub) {
    ctx.fillStyle = 'rgba(245,240,232,0.75)'
    ctx.font = '400 68px Tangerine, cursive'
    ctx.fillText(sub, W / 2, 515)
  }

  // Filet doré
  ctx.strokeStyle = 'rgba(201,168,76,0.6)'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(W / 2 - 130, 585)
  ctx.lineTo(W / 2 + 130, 585)
  ctx.stroke()

  // Note en grappes (5 grappes, remplies en or selon la note)
  const note = Math.max(0, Math.min(5, entry.note || 0))
  const spacing = 105
  const startX = W / 2 - spacing * 2
  for (let i = 0; i < 5; i++) {
    drawGrappe(ctx, startX + i * spacing, 690, 2.1, i < note)
  }

  // En un mot
  let y = 850
  if (entry.unMot) {
    ctx.fillStyle = GOLD
    ctx.font = '400 84px Tangerine, cursive'
    ctx.fillText(`« ${entry.unMot} »`, W / 2, y)
    y += 100
  } else {
    y += 20
  }

  // Ressenti — 2-3 lignes max, guillemets élégants, Fraunces italique
  if (entry.ressenti) {
    ctx.font = 'italic 500 40px "Fraunces", serif'
    ctx.fillStyle = 'rgba(245,240,232,0.88)'
    const lines = wrapLines(ctx, entry.ressenti.replace(/\s+/g, ' ').trim(), W - 300, 3)
    if (lines.length) {
      lines[0] = `“ ${lines[0]}`
      lines[lines.length - 1] = `${lines[lines.length - 1]} ”`
    }
    lines.forEach((l, i) => ctx.fillText(l, W / 2, y + i * 62))
  }

  // Signature en bas
  ctx.fillStyle = 'rgba(201,168,76,0.85)'
  ctx.font = '400 58px Tangerine, cursive'
  ctx.fillText('Œno', W / 2, H - 160)
  ctx.fillStyle = 'rgba(245,240,232,0.45)'
  ctx.font = '400 24px Inter, sans-serif'
  ctx.fillText('L E   V I N ,   E N F I N   S I M P L E', W / 2, H - 115)
}

export default function ShareDegustation({ entry, onClose }) {
  useModalBehavior(onClose)
  const canvasRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [busy, setBusy] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!mounted || !canvasRef.current) return
    let cancelled = false
    renderCard(canvasRef.current, entry).then(() => { if (!cancelled) setReady(true) })
    return () => { cancelled = true }
  }, [mounted, entry])

  const fileName = `oeno-${(entry.name || 'degustation').toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`

  const getBlob = () => new Promise(resolve => canvasRef.current.toBlob(resolve, 'image/png'))

  const download = useCallback(async () => {
    const blob = await getBlob()
    if (!blob) return
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(url), 4000)
  }, [fileName])

  const share = useCallback(async () => {
    setBusy(true)
    try {
      const blob = await getBlob()
      if (!blob) return
      const file = new File([blob], fileName, { type: 'image/png' })
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `Dégustation — ${entry.name}`,
          text: `Ma dégustation de ${entry.name}, racontée avec Œno 🍷`,
        })
      } else {
        await download()
      }
    } catch { /* partage annulé par l'utilisateur */ }
    setBusy(false)
  }, [entry.name, fileName, download])

  if (!mounted) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[95] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(12,10,9,0.65)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
      role="dialog" aria-modal="true" aria-label="Partager cette dégustation"
    >
      <div
        className="modal-panel sm:max-w-md max-h-[92vh] shadow-card-hover"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-5 pb-4 flex-shrink-0 flex items-center justify-between border-b border-anthracite-900/[0.06]">
          <div>
            <span className="eyebrow mb-1">Prêt à faire des jaloux</span>
            <h3 className="font-serif text-xl font-bold text-anthracite-900">Partager cette dégustation</h3>
          </div>
          <button onClick={onClose} aria-label="Fermer"
                  className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full bg-anthracite-100 hover:bg-anthracite-200 text-anthracite-600 transition-all cursor-pointer">
            <X size={15} />
          </button>
        </div>

        {/* Prévisualisation */}
        <div className="flex-1 overflow-y-auto p-5">
          <div className="relative rounded-2xl overflow-hidden shadow-card-hover mx-auto" style={{ maxWidth: 340 }}>
            <canvas
              ref={canvasRef}
              className="w-full h-auto block"
              style={{ aspectRatio: '4 / 5' }}
              aria-label={`Carte de dégustation de ${entry.name}`}
            />
            {!ready && (
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: '#0C0A09' }}>
                <Loader2 size={22} className="text-gold-400 animate-spin" />
              </div>
            )}
          </div>
          <p className="text-[11px] text-anthracite-400 text-center mt-3">
            Format 1080 × 1350 — pile pour Instagram.
          </p>
        </div>

        <div className="p-5 border-t border-anthracite-100 bg-fond flex-shrink-0 flex items-center gap-3">
          <button onClick={download} disabled={!ready} className="btn-ghost text-xs px-4 py-2.5 flex-1 justify-center">
            <Download size={13} /> Télécharger
          </button>
          <button onClick={share} disabled={!ready || busy} className="btn-gold text-xs px-4 py-2.5 flex-1 justify-center">
            {busy ? <Loader2 size={13} className="animate-spin" /> : <Share2 size={13} />} Partager
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
