// Emblème officiel Œno : verre de vin inscrit dans un cercle ouvert,
// blanc sur fond framboise — même dessin que les icônes d'application
// (public/icons/*), en SVG inline pour un rendu net à toutes les tailles.
export default function LogoOeno({ size = 36, className = '' }) {
  return (
    <div
      className={`rounded-full flex items-center justify-center flex-shrink-0 ${className}`}
      style={{ width: size, height: size, background: '#A00E3C', boxShadow: '0 0 0 1px rgba(201,168,76,0.3)' }}
      aria-hidden="true"
    >
      <svg viewBox="232 120 560 580" width={size * 0.68} height={size * 0.68}>
        {/* Cercle ouvert en bas */}
        <path d="M 400.6 617.8 A 240 240 0 1 1 623.4 617.8"
              fill="none" stroke="#FFFFFF" strokeWidth="34" strokeLinecap="round" />
        {/* Vin dans le calice */}
        <path d="M 402 345 L 622 345 C 616 420 584 462 546 482 C 524 493 500 493 478 482 C 440 462 408 420 402 345 Z"
              fill="#3F0817" />
        {/* Calice */}
        <path d="M 396 232 C 397 318 398 390 424 436 C 444 472 478 496 512 496 C 546 496 580 472 600 436 C 626 390 627 318 628 232 C 628 224 622 218 614 218 L 410 218 C 402 218 396 224 396 232 Z"
              fill="none" stroke="#FFFFFF" strokeWidth="32" strokeLinejoin="round" />
        {/* Jambe et amorce de pied */}
        <path d="M 512 496 L 512 664" fill="none" stroke="#FFFFFF" strokeWidth="32" strokeLinecap="round" />
        <path d="M 462 684 C 478 672 546 672 562 684" fill="none" stroke="#FFFFFF" strokeWidth="30" strokeLinecap="round" />
      </svg>
    </div>
  )
}
