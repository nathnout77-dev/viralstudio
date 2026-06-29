import { chromium, type BrowserContext } from 'playwright';
import type { Job, SearchResult } from '../types';
import { CONFIG } from '../config';

let sharedContext: BrowserContext | null = null;

async function getLinkedInContext(): Promise<BrowserContext> {
  if (sharedContext) return sharedContext;

  const browser = await chromium.launch({ headless: CONFIG.bot.headless });
  const context = await browser.newContext({ locale: 'fr-FR', viewport: { width: 1280, height: 800 } });

  const page = await context.newPage();
  await page.goto('https://www.linkedin.com/login', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);
  await page.fill('#username', CONFIG.credentials.linkedin.email);
  await page.fill('#password', CONFIG.credentials.linkedin.password);
  await page.click('[type="submit"]');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);

  const url = page.url();
  if (url.includes('challenge') || url.includes('checkpoint')) {
    throw new Error('LinkedIn demande une vérification manuelle. Connectez-vous manuellement puis relancez.');
  }

  await page.close();
  sharedContext = context;
  return context;
}

export async function searchLinkedIn(): Promise<SearchResult> {
  if (!CONFIG.credentials.linkedin.email || !CONFIG.credentials.linkedin.password) {
    console.warn('  LinkedIn: credentials manquants, skip');
    return { jobs: [], platform: 'linkedin', totalFound: 0 };
  }

  const jobs: Job[] = [];
  const seen = new Set<string>();

  try {
    const context = await getLinkedInContext();
    const page = await context.newPage();
    const { city, radiusKm } = CONFIG.search.location;

    for (const keyword of CONFIG.search.keywords.slice(0, 3)) {
      const params = new URLSearchParams({
        keywords: keyword,
        location: `${city}, Seine-et-Marne, Île-de-France, France`,
        distance: String(radiusKm),
        f_JT: 'F,T,C',  // Full-time, Temporary, Contract
        sortBy: 'DD',    // Date Posted
      });

      try {
        await page.goto(`https://www.linkedin.com/jobs/search/?${params}`, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(3000);

        // Scroll to load more
        for (let i = 0; i < 3; i++) {
          await page.keyboard.press('End');
          await page.waitForTimeout(1200);
        }

        const cards = await page.locator('li.scaffold-layout__list-item, li.jobs-search-results__list-item').all();

        for (const card of cards) {
          const title = await card.locator('.job-card-list__title, h3.base-search-card__title').first().textContent().catch(() => '');
          const company = await card.locator('.job-card-container__company-name, h4.base-search-card__subtitle').first().textContent().catch(() => '');
          const loc = await card.locator('.job-card-container__metadata-item, .job-search-card__location').first().textContent().catch(() => '');
          const href = await card.locator('a[href*="/jobs/view/"]').first().getAttribute('href').catch(() => null);

          if (!title?.trim() || !href) continue;
          const jobUrl = `https://www.linkedin.com${href.split('?')[0]}`;
          if (seen.has(jobUrl)) continue;
          seen.add(jobUrl);

          const easyApply = await card.locator('.job-card-container__apply-method').textContent().catch(() => '').then(t => t.includes('Candidature') || t.includes('Easy'));

          jobs.push({
            id: '',
            platform: 'linkedin',
            title: title.trim(),
            company: company?.trim() || '',
            location: loc?.trim() || '',
            salary: '',
            contract: 'CDI',
            description: '',
            url: jobUrl,
            easyApply,
            sectors: [],
          });
        }

        await page.waitForTimeout(4000 + Math.random() * 3000);
      } catch (e: any) {
        console.warn(`  LinkedIn "${keyword}": ${e.message}`);
      }
    }

    await page.close();
  } catch (e: any) {
    console.error(`LinkedIn search failed: ${e.message}`);
    return { jobs: [], platform: 'linkedin', totalFound: 0, errors: [e.message] };
  }

  return { jobs, platform: 'linkedin', totalFound: jobs.length };
}

export function closeLinkedInContext() {
  sharedContext?.browser()?.close();
  sharedContext = null;
}
