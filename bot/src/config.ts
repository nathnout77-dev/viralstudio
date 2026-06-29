import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });
dotenv.config({ path: path.join(__dirname, '../../.env.local') });

export const CONFIG = {
  user: {
    name: process.env.USER_FULL_NAME || 'Nathan ORTUNO',
    email: process.env.USER_EMAIL || 'nathanortuno@yahoo.fr',
    phone: process.env.USER_PHONE || '06 10 11 65 33',
    cvPath: process.env.CV_PATH || path.join(__dirname, '../../cv.pdf'),
    availableFrom: 'octobre 2026',
    profile: process.env.USER_PROFILE ||
      `Je suis Nathan ORTUNO, commercial BtoB disponible à partir d'octobre 2026, titulaire d'un BTS NDRC (Négociation et Digitalisation de la Relation Client) et actuellement en Licence Pro Management et Gestion des Organisations.

Mes 3 alternances m'ont permis de développer une vraie polyvalence commerciale :
- Groupe Triametal / SCMM / CTL (industrie métallurgie, BtoB) : prospection téléphonique et mailing, élaboration de devis sur plans techniques DXF, vente de prestations de maintenance et réparation aux professionnels, suivi reporting (JePilote), campagnes e-mailing (Brevo).
- Groupe Depreytere Restauration : développement portefeuille clients BtoB et BtoC, création de contenus digitaux.
- Traiteur à la Carte : gestion et développement portefeuille, devis personnalisés, vente BtoB et BtoC.

Passionné de mécanique automobile et de sport auto, je suis particulièrement motivé par les secteurs automobile, industrie et commerce BtoB. Autonome, rigoureux, à l'aise avec les outils digitaux (WordPress, Brevo, Solidworks DXF, bureautique). Permis B. Secteur recherché : rayon 30km autour de Beaumont-du-Gâtinais (77), salaire cible minimum 27 000€ bruts annuels.`,
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
      'commercial BtoB industrie',
      'technico-commercial',
      'attaché commercial',
      'commercial automobile',
      'conseiller commercial automobile',
      'commercial junior',
      'commercial terrain',
      'VRP',
      'commercial flotte automobile',
      'commercial pièces détachées',
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
