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
        {/* Thème posé AVANT le premier pixel. Sans ce script, la page serait
            rendue en clair puis basculerait en sombre après l'hydratation :
            un éclair blanc à chaque ouverture, précisément ce qu'on cherche à
            éviter en choisissant le mode sombre. Volontairement minuscule,
            sans dépendance, et silencieux si le stockage est refusé. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{
var r=document.documentElement,g={},p='systeme',t='normal';
try{g=JSON.parse(localStorage.getItem('oeno-reglages'))||{}}catch(e){}
if(g.theme)p=g.theme; if(g.taille)t=g.taille;
var s=p==='sombre'||(p!=='clair'&&window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches);
r.dataset.theme=s?'sombre':'clair';
r.dataset.taille=t;
r.style.colorScheme=s?'dark':'light';
var z={compact:0.92,normal:1,confort:1.12}[t]||1; if(z!==1)r.style.zoom=z;
var m=document.querySelector('meta[name="theme-color"]'); if(m)m.content=s?'#141210':'#FAFAF9';
}catch(e){}})()`,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
