import { useState } from 'react'
import { HelpCircle } from 'lucide-react'
import { GLOSSAIRE } from '../data/glossaire'

// Terme technique avec explication au clic — "décodé pour néophytes"
export default function Terme({ id, children }) {
  const [open, setOpen] = useState(false)
  const entry = GLOSSAIRE[id]
  if (!entry) return <span>{children}</span>

  return (
    <span className="relative inline-flex items-baseline">
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); setOpen(o => !o) }}
        className="inline-flex items-center gap-0.5 border-b border-dashed border-wine-400 text-inherit cursor-help hover:text-wine-700 transition-colors"
      >
        {children || entry.terme}
        <HelpCircle size={9} className="text-wine-400 flex-shrink-0" />
      </button>
      {open && (
        <>
          <span className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-56 p-3 rounded-xl bg-nuit-doux text-cream text-xs leading-relaxed shadow-card-hover animate-fade-in block">
            <span className="font-semibold text-gold-400 block mb-1">{entry.terme}</span>
            {entry.simple}
            <span className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-anthracite-900" />
          </span>
        </>
      )}
    </span>
  )
}
