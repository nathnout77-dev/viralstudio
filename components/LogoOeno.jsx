// Emblème officiel Œno — fichier fourni tel quel (public/icons/logo-oeno.png),
// non modifié, non recadré.
export default function LogoOeno({ size = 36, className = '' }) {
  return (
    <img
      src="/icons/logo-oeno.png"
      alt="Œno"
      width={size}
      height={size}
      className={`rounded-lg flex-shrink-0 ${className}`}
      style={{ width: size, height: size, objectFit: 'contain' }}
    />
  )
}
