import { chromium } from 'playwright';
import type { Job, SearchResult, ContractType } from '../types';
import { CONFIG } from '../config';

const BASE = 'https://fr.indeed.com';

function parseContract(text: string): ContractType {
  const t = text.toLowerCase();
  if (t.includes('cdi')) return 'CDI';
  if (t.includes('intérim') || t.includes('interim') || t.includes('mission')) return 'Intérim';
  if (t.includes('freelance')) return 'Freelance';
  if (t.includes('cdd')) return 'CDD';
  return 'CDI';
}

export async function searchIndeed(): Promise<SearchResult> {
  const browser = await chromium.launch({ headless: CONFIG.bot.headless });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    locale: 'fr-FR',
    viewport: { width: 1280, height: 720 },
  });

  const jobs: Job[] = [];
  const seen = new Set<string>();

  try {
    const page = await context.newPage();
    const { city, zipCode, radiusKm } = CONFIG.search.location;
    const location = `${city}, ${zipCode}`;

    for (const keyword of CONFIG.search.keywords.slice(0, 4)) {
      const url = `${BASE}/emplois?q=${encodeURIComponent(keyword)}&l=${encodeURIComponent(location)}&radius=${radiusKm}&sort=date&fromage=14`;

      try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
        await page.waitForTimeout(2000 + Math.random() * 2000);

        // Accept cookies
        const cookieBtn = page.locator('button:has-text("Accepter"), button[id*="accept"]').first();
        if (await cookieBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
          await cookieBtn.click().catch(() => {});
          await page.waitForTimeout(1000);
        }

        // Extract job cards from page JSON (Indeed often embeds job data in script tags)
        const cards = await page.locator('[data-testid="slider_item"], .job_seen_beacon, .tapItem, li.css-5lfssm').all();

        for (const card of cards) {
          const titleEl = card.locator('h2.jobTitle a, [data-testid="jobTitle"] a').first();
          const title = await titleEl.textContent().catch(() => '');
          const href = await titleEl.getAttribute('href').catch(() => null);
          if (!title?.trim() || !href) continue;

          const jobUrl = href.startsWith('http') ? href.split('?')[0] : `${BASE}${href.split('?')[0]}`;
          if (seen.has(jobUrl)) continue;
          seen.add(jobUrl);

          const company = await card.locator('[data-testid="company-name"], .companyName').first().textContent().catch(() => '');
          const loc = await card.locator('[data-testid="text-location"], .companyLocation').first().textContent().catch(() => '');
          const salary = await card.locator('.metadata.salary-snippet-container, [data-testid="salary-snippet"]').first().textContent().catch(() => '');
          const meta = await card.locator('.metadata:not(.salary-snippet-container)').first().textContent().catch(() => '');
          const easyApply = await card.locator('[aria-label*="candidature simplifiée"], .ia-BasePanelTitle').count() > 0;

          jobs.push({
            id: '',
            platform: 'indeed',
            title: title.trim(),
            company: company?.trim() || '',
            location: loc?.trim() || '',
            salary: salary?.trim() || '',
            contract: parseContract(meta || ''),
            description: '',
            url: jobUrl,
            easyApply,
            sectors: [],
          });
        }

        await page.waitForTimeout(3000 + Math.random() * 3000);
      } catch (e: any) {
        console.warn(`  Indeed "${keyword}": ${e.message}`);
      }
    }
    await page.close();
  } finally {
    await browser.close();
  }

  return { jobs, platform: 'indeed', totalFound: jobs.length };
}
