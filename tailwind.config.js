/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        wine: {
          50:  '#fdf2f4',
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
          400: '#d4a847',
          500: '#c9a84c',
          600: '#b8962a',
          700: '#9a7d1e',
        },
        anthracite: {
          50:  '#f6f7f7',
          100: '#e2e4e4',
          200: '#c5c9ca',
          300: '#a0a7a8',
          400: '#7a8486',
          500: '#5f6b6d',
          600: '#4a5558',
          700: '#3d4547',
          800: '#2c3234',
          900: '#1e2426',
          950: '#111516',
        },
        cream: '#f5f0e8',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'gold':      '0 4px 24px rgba(201,168,76,0.25)',
        'wine':      '0 4px 24px rgba(114,16,42,0.4)',
        'card':      '0 2px 16px rgba(0,0,0,0.08)',
        'card-hover':'0 8px 32px rgba(0,0,0,0.14)',
      },
      animation: {
        'fade-in':  'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.35s ease-out',
      },
      keyframes: {
        fadeIn:  { from: { opacity: 0 },           to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(12px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
