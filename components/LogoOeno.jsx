// Emblème officiel Œno : verre de vin inscrit dans un cercle ouvert,
// blanc sur fond framboise — asset fourni (public/icons/logo-oeno.png).
export default function LogoOeno({ size = 36, className = '' }) {
  return (
    <img
      src="/icons/logo-oeno-icon.png"
      alt="Œno"
      width={size}
      height={size}
      className={`rounded-full flex-shrink-0 object-cover ${className}`}
      style={{ width: size, height: size, boxShadow: '0 0 0 1px rgba(201,168,76,0.3)' }}
    />
  )
}
