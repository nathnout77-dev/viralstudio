import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        {/* Identité / PWA */}
        <meta name="application-name" content="Œno" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Œno" />
        <meta name="theme-color" content="#5c0d22" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/icon-192.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />

        {/* SEO */}
        <meta name="description" content="Œno traduit l'œnologie en langage humain : 55+ vins décodés, un Goût-o-mètre ludique, une carte des vignobles et votre cave, sans jargon." />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Œno — Le vin, enfin simple" />
        <meta property="og:description" content="Vous n'y connaissez rien en vin ? Parfait. 55+ appellations décodées, quiz de goût, carte des vignobles, gestion de cave — sans jargon." />
        <meta property="og:image" content="/icons/icon-512.png" />
        <meta property="og:locale" content="fr_FR" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Œno — Le vin, enfin simple" />
        <meta name="twitter:description" content="Vous n'y connaissez rien en vin ? Parfait. Œno décode 55+ vins pour néophytes." />
        <meta name="twitter:image" content="/icons/icon-512.png" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
