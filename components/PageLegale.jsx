import Head from 'next/head'

// ═══════════════════════════════════════════════════════════════════════════
// Le gabarit des pages publiques hors application : confidentialité,
// suppression de compte. Google Play en exige les adresses dans la fiche ;
// elles doivent donc se lire sans rien charger d'autre — ni la cave, ni le
// moindre écran d'Œno, ni réseau au-delà de la page elle-même.
// ═══════════════════════════════════════════════════════════════════════════

// L'adresse de contact, en un seul endroit : elle figure dans la fiche Play.
export const CONTACT = 'contact@oeno.app'

export default function PageLegale({ titre, majLe, children }) {
  return (
    <>
      <Head>
        <title>{`${titre} — Œno`}</title>
        <meta name="robots" content="index,follow" />
      </Head>
      <main className="min-h-screen px-4 py-10">
        <article className="max-w-2xl mx-auto card p-6 sm:p-10">
          <a href="/" className="text-xs text-wine-texte underline">← Revenir dans Œno</a>
          <h1 className="font-serif text-2xl text-anthracite-900 mt-4 mb-1">{titre}</h1>
          <p className="text-[11px] text-anthracite-400 mb-8">Mise à jour : {majLe}</p>
          <div className="space-y-6 text-sm text-anthracite-700 leading-relaxed [&_h2]:font-serif [&_h2]:text-lg [&_h2]:text-anthracite-900 [&_h2]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_a]:text-wine-texte [&_a]:underline">
            {children}
          </div>
        </article>
      </main>
    </>
  )
}
