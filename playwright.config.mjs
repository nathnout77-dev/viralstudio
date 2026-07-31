import { defineConfig } from '@playwright/test'

// Le parcours réel, dans un vrai navigateur. C'est le seul filet qui puisse
// attraper ce que la compilation laisse passer : un import manquant, un écran
// qui plante à l'ouverture, une modale qui ne s'ouvre pas.
//
// `channel: 'chromium'` n'est pas décoratif — le mode sans tête par défaut
// refuse les notifications quoi qu'on autorise, et l'app en dépend.
export default defineConfig({
  testDir: 'tests',
  testMatch: '**/*.spec.mjs',
  timeout: 45000,
  fullyParallel: false,
  workers: 1,
  reporter: [['list']],
  use: {
    baseURL: 'http://127.0.0.1:3210',
    channel: 'chromium',
    viewport: { width: 1280, height: 900 },
  },
  webServer: {
    command: 'npx next dev -p 3210',
    url: 'http://127.0.0.1:3210',
    reuseExistingServer: true,
    timeout: 180000,
  },
})
