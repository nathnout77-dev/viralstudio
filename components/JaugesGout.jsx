// Jauges de goût visuelles — lisibles en 3 secondes par un néophyte
const JAUGES_CONFIG = [
  { key: 'puissance', left: 'Léger',  right: 'Puissant', color: '#8c2f39' },
  { key: 'douceur',   left: 'Sec',    right: 'Doux',     color: '#c98f2c' },
  { key: 'tanins',    left: 'Souple', right: 'Costaud',  color: '#6b4a3a' },
]

export default function JaugesGout({ jauges, compact = false, animate = true }) {
  if (!jauges) return null
  return (
    <div className={compact ? 'space-y-1.5' : 'space-y-2.5'}>
      {JAUGES_CONFIG.map(({ key, left, right, color }, idx) => {
        const val = jauges[key] || 1
        return (
          <div key={key}>
            <div className="flex items-center justify-between mb-0.5">
              <span className={`${compact ? 'text-[9px]' : 'text-[10px]'} text-anthracite-400 font-medium`}>{left}</span>
              <span className={`${compact ? 'text-[9px]' : 'text-[10px]'} text-anthracite-400 font-medium`}>{right}</span>
            </div>
            <div className={`flex gap-1 ${compact ? 'h-1.5' : 'h-2'}`}>
              {[1, 2, 3, 4, 5].map(i => (
                <div
                  key={i}
                  className="flex-1 rounded-full transition-all duration-500"
                  style={{
                    background: i <= val ? color : '#e7e5e4',
                    opacity: i <= val ? 0.5 + (i / 10) : 1,
                    transitionDelay: animate ? `${idx * 120 + i * 60}ms` : '0ms',
                  }}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
