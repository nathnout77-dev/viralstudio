// ═══════════════════════════════════════════════════════════════════════════
// Génère public/.well-known/assetlinks.json — la preuve, pour Android, que le
// domaine d'Œno et l'application app.oeno vont ensemble.
//
// Sans ce fichier, l'application Play Store s'ouvre avec une barre d'adresse
// (motif de refus) et le lien de connexion reçu par email s'ouvre dans le
// navigateur au lieu d'Œno.
//
// Usage :  node scripts/assetlinks.mjs <empreinte SHA-256> [autre empreinte…]
// L'empreinte se lit dans la Play Console → Configuration → Intégrité de
// l'application → Signature de l'application (« Certificat de la clé de
// signature d'application »). Ajouter aussi celle de la clé d'importation
// pour tester un APK signé localement.
//
// Volontairement un script, et pas un fichier posé d'avance : une empreinte
// inventée ne validerait rien, et ressemblerait à une configuration faite.
// ═══════════════════════════════════════════════════════════════════════════
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs'

const PAQUET = JSON.parse(readFileSync(new URL('../twa/twa-manifest.json', import.meta.url))).packageId
const empreintes = process.argv.slice(2).map(e => e.trim().toUpperCase())

const FORME = /^([0-9A-F]{2}:){31}[0-9A-F]{2}$/
if (!empreintes.length || !empreintes.every(e => FORME.test(e))) {
  console.error('Empreinte attendue : 32 octets hexadécimaux séparés par « : »')
  console.error('  ex. 14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83:42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:44:E5')
  process.exit(1)
}

const contenu = [{
  relation: ['delegate_permission/common.handle_all_urls'],
  target: { namespace: 'android_app', package_name: PAQUET, sha256_cert_fingerprints: empreintes },
}]
mkdirSync(new URL('../public/.well-known/', import.meta.url), { recursive: true })
writeFileSync(new URL('../public/.well-known/assetlinks.json', import.meta.url), JSON.stringify(contenu, null, 2) + '\n')
console.log(`assetlinks.json écrit pour ${PAQUET} (${empreintes.length} empreinte${empreintes.length > 1 ? 's' : ''}).`)
