/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        wine: {
          /* Rose très pâle des encarts : sur fond sombre, il devient une
             teinte bordeaux profonde plutôt qu'un aplat rose éclatant. */
          50:  'rgb(var(--wine-50) / <alpha-value>)',
          100: '#fae0e4',
          200: '#f5c0ca',
          300: '#ee91a2',
          400: '#e45872',
          500: '#d42e4f',
          600: '#b81d3c',
          700: '#9a1633',
          800: '#72102a',
          900: '#5c0d22',
          950: '#3a0616',
        },
        gold: {
          300: '#e8c96b',
          400: '#d4a847',
          500: '#c9a84c',
          /* Or de TEXTE : doit rester lisible sur le fond du moment, donc
             variable — sombre sur crème, clair sur nuit. Contraste ≥ 4.5:1
             dans les deux thèmes. */
          600: 'rgb(var(--or-texte) / <alpha-value>)',
          700: 'rgb(var(--or-texte-fort) / <alpha-value>)',
        },
        /* Gamme "pierre chaude". Elle porte le texte ET les bordures, donc
           elle s'inverse avec le thème : anthracite-900 est le texte
           principal, sombre sur clair et clair sur sombre. Les surfaces qui
           doivent rester noires quel que soit le thème utilisent `nuit`. */
        anthracite: {
          50:  'rgb(var(--anth-50) / <alpha-value>)',
          100: 'rgb(var(--anth-100) / <alpha-value>)',
          200: 'rgb(var(--anth-200) / <alpha-value>)',
          300: 'rgb(var(--anth-300) / <alpha-value>)',
          400: 'rgb(var(--anth-400) / <alpha-value>)',
          500: 'rgb(var(--anth-500) / <alpha-value>)',
          600: 'rgb(var(--anth-600) / <alpha-value>)',
          700: 'rgb(var(--anth-700) / <alpha-value>)',
          800: 'rgb(var(--anth-800) / <alpha-value>)',
          900: 'rgb(var(--anth-900) / <alpha-value>)',
          950: 'rgb(var(--anth-950) / <alpha-value>)',
        },
        /* Le fond de page et la surface des cartes — le cœur du thème. */
        fond:  'rgb(var(--fond) / <alpha-value>)',
        carte: 'rgb(var(--carte) / <alpha-value>)',
        /* Noirs FIXES : voiles de modale, bulles d'aide, encarts sombres
           assumés. Ils ne suivent pas le thème, sinon ils s'éclairciraient
           en mode sombre alors qu'ils portent du texte crème. */
        nuit:      '#0C0A09',
        'nuit-doux': '#1C1917',
        /* Crème FIXE : c'est la couleur du texte posé sur bordeaux ou sur
           noir. Elle doit rester claire dans les deux thèmes. */
        cream: '#FAFAF9',
      },
      fontFamily: {
        serif:  ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans:   ['var(--font-inter)', 'system-ui', 'sans-serif'],
        script: ['var(--font-tangerine)', 'cursive'],
      },
      boxShadow: {
        'gold':        '0 8px 32px rgba(201,168,76,0.20)',
        'gold-lg':     '0 16px 64px rgba(201,168,76,0.28)',
        'wine':        '0 8px 32px rgba(92,13,34,0.30)',
        'wine-lg':     '0 16px 64px rgba(92,13,34,0.40)',
        'card':        '0 1px 2px rgba(28,25,23,0.04), 0 8px 32px rgba(28,25,23,0.06)',
        'card-hover':  '0 2px 4px rgba(28,25,23,0.05), 0 20px 56px rgba(28,25,23,0.10)',
        'glass':       '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
        'glow-gold':   '0 0 40px rgba(201,168,76,0.3)',
        'glow-wine':   '0 0 40px rgba(114,16,42,0.5)',
      },
      animation: {
        'fade-in':       'fadeIn 0.5s cubic-bezier(0.22,1,0.36,1)',
        'fade-in-up':    'fadeInUp 0.8s cubic-bezier(0.22,1,0.36,1)',
        'fade-in-down':  'fadeInDown 0.7s cubic-bezier(0.22,1,0.36,1)',
        'slide-up':      'slideUp 0.45s cubic-bezier(0.22,1,0.36,1)',
        'slide-in-right':'slideInRight 0.6s cubic-bezier(0.22,1,0.36,1)',
        'scale-in':      'scaleIn 0.5s cubic-bezier(0.22,1,0.36,1)',
        'float':         'float 6s ease-in-out infinite',
        'float-slow':    'float 9s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out infinite 2s',
        'shimmer':       'shimmer 2.5s linear infinite',
        'pulse-gold':    'pulseGold 3s ease-in-out infinite',
        'spin-slow':     'spin 12s linear infinite',
        'gradient-x':    'gradientX 8s ease infinite',
        'count-up':      'countUp 1.5s ease-out',
        'draw-line':     'drawLine 1.2s ease-out forwards',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:        { from: { opacity: 0 }, to: { opacity: 1 } },
        fadeInUp:      { from: { opacity: 0, transform: 'translateY(24px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeInDown:    { from: { opacity: 0, transform: 'translateY(-16px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        slideUp:       { from: { opacity: 0, transform: 'translateY(12px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        slideInRight:  { from: { opacity: 0, transform: 'translateX(24px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
        scaleIn:       { from: { opacity: 0, transform: 'scale(0.92)' }, to: { opacity: 1, transform: 'scale(1)' } },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':      { transform: 'translateY(-18px) rotate(2deg)' },
          '66%':      { transform: 'translateY(-8px) rotate(-1deg)' },
        },
        shimmer: {
          from: { backgroundPosition: '-200% center' },
          to:   { backgroundPosition: '200% center' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(201,168,76,0.2)' },
          '50%':      { boxShadow: '0 0 40px rgba(201,168,76,0.5)' },
        },
        gradientX: {
          '0%, 100%': { backgroundSize: '200% 200%', backgroundPosition: 'left center' },
          '50%':      { backgroundSize: '200% 200%', backgroundPosition: 'right center' },
        },
        countUp: {
          from: { opacity: 0, transform: 'translateY(8px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
        drawLine: {
          from: { transform: 'scaleX(0)', transformOrigin: 'left' },
          to:   { transform: 'scaleX(1)', transformOrigin: 'left' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-6px)' },
        },
      },
      backgroundImage: {
        'gradient-radial':    'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':     'conic-gradient(var(--tw-gradient-stops))',
        'shimmer-gold':       'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)',
        'noise':              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
