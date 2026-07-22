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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icons/icon-192.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />

        {/* SEO */}
        <meta name="description" content="Œno traduit l'œnologie en langage humain : plus de 250 vins décodés, un Goût-o-mètre ludique, une carte des vignobles et votre cave, sans jargon." />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Œno — Le vin, enfin simple" />
        <meta property="og:description" content="Vous n'y connaissez rien en vin ? Parfait. plus de 240 appellations décodées, quiz de goût, carte des vignobles, gestion de cave — sans jargon." />
        <meta property="og:image" content="/icons/icon-512.png" />
        <meta property="og:locale" content="fr_FR" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Œno — Le vin, enfin simple" />
        <meta name="twitter:description" content="Vous n'y connaissez rien en vin ? Parfait. Œno décode plus de 250 vins pour néophytes." />
        <meta name="twitter:image" content="/icons/icon-512.png" />

        {/* Inter / Fraunces / Tangerine sont désormais auto-hébergées via
            next/font/google (voir lib/fonts.js + pages/_app.jsx) : plus de
            <link> vers fonts.googleapis.com.
            Le CSS de Leaflet est désormais importé localement depuis
            node_modules (voir pages/_app.jsx) plutôt que via ce CDN externe,
            qui rendait la carte des vignobles cassée dès que unpkg.com
            n'était pas joignable (réseau restreint, offline, etc.). */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
