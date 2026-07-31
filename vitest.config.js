import { defineConfig } from 'vitest/config'

// Tests unitaires : la logique qui ne demande pas de navigateur.
// Le parcours réel, lui, se vérifie dans `tests/parcours.spec.mjs` (Playwright).
export default defineConfig({
  esbuild: { jsx: 'automatic' },
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.{js,jsx}'],
    globals: false,
  },
})
