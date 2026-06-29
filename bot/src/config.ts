import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });
dotenv.config({ path: path.join(__dirname, '../../.env.local') });

export const CONFIG = {
  user: {
    name: process.env.USER_FULL_NAME || '',
    email: process.env.USER_EMAIL || '',
    phone: process.env.USER_PHONE || '',
    cvPath: process.env.CV_PATH || path.join(__dirname, '../../cv.pdf'),
    profile: process.env.USER_PROFILE ||
      `Commercial expérimenté, autonome et orienté résultats, avec une expertise dans les secteurs automobile, industrie et vente BtoB. ` +
      `À l'aise sur le terrain comme en gestion de portefeuille clients, je maîtrise la prospection, la négociation et la fidélisation. ` +
      `Je recherche un poste en CDI ou intérim autour de Beaumont-du-Gâtinais (77), avec une rémunération à partir de 27 000€ bruts annuels.`,
  },

  credentials: {
    linkedin: {
      email: process.env.LINKEDIN_EMAIL || '',
      password: process.env.LINKEDIN_PASSWORD || '',
    },
    indeed: {
      email: process.env.INDEED_EMAIL || '',
      password: process.env.INDEED_PASSWORD || '',
    },
    francetravail: {
      clientId: process.env.FRANCE_TRAVAIL_CLIENT_ID || '',
      clientSecret: process.env.FRANCE_TRAVAIL_CLIENT_SECRET || '',
    },
  },

  search: {
    location: {
      city: 'Beaumont-du-Gâtinais',
      zipCode: '77890',
      latitude: 48.1667,
      longitude: 2.5833,
      radiusKm: 30,
      inseeCode: '77024',
    },
    keywords: [
      'commercial automobile',
      'commercial industrie',
      'technico-commercial',
      'attaché commercial BtoB',
      'commercial terrain',
      'VRP',
      'responsable commercial',
      'développeur commercial',
      'commercial flotte',
      'conseiller commercial automobile',
    ],
    contracts: ['CDI', 'Intérim', 'Freelance'],
    minSalaryYear: 27000,
    sectors: ['automobile', 'industrie', 'vente'],
  },

  platforms: {
    linkedin: { enabled: true, autoApply: true },
    indeed: { enabled: true, autoApply: true },
    francetravail: { enabled: true, autoApply: false },
    wttj: { enabled: true, autoApply: false },
  },

  anthropic: {
    apiKey: process.env.ANTHROPIC_API_KEY || '',
    model: 'claude-sonnet-4-6',
  },

  bot: {
    delayBetweenAppsMs: 8000,
    maxApplicationsPerRun: 15,
    headless: process.env.BOT_HEADLESS !== 'false',
  },
};
