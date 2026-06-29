import { chromium, type BrowserContext } from 'playwright';
import { CONFIG } from '../config';
import { applyLinkedIn } from './linkedin';
import { applyIndeed } from './indeed';
import type { SavedJob } from '../types';

let linkedinContext: BrowserContext | null = null;
let indeedContext: BrowserContext | null = null;

async function getLinkedInContext(): Promise<BrowserContext> {
  if (linkedinContext) return linkedinContext;
  const browser = await chromium.launch({ headless: CONFIG.bot.headless });
  linkedinContext = await browser.newContext({ locale: 'fr-FR', viewport: { width: 1280, height: 800 } });

  const page = await linkedinContext.newPage();
  await page.goto('https://www.linkedin.com/login');
  await page.fill('#username', CONFIG.credentials.linkedin.email);
  await page.fill('#password', CONFIG.credentials.linkedin.password);
  await page.click('[type="submit"]');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);
  await page.close();

  return linkedinContext;
}

async function getIndeedContext(): Promise<BrowserContext> {
  if (indeedContext) return indeedContext;
  const browser = await chromium.launch({ headless: CONFIG.bot.headless });
  indeedContext = await browser.newContext({ locale: 'fr-FR', viewport: { width: 1280, height: 800 } });

  const page = await indeedContext.newPage();
  await page.goto('https://fr.indeed.com/compte/connexion');
  await page.fill('input[type="email"], input[name*="email"]', CONFIG.credentials.indeed.email);
  await page.click('button[type="submit"]');
  await page.waitForTimeout(2000);
  await page.fill('input[type="password"]', CONFIG.credentials.indeed.password);
  await page.click('button[type="submit"]');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);
  await page.close();

  return indeedContext;
}

export async function applyToJob(job: SavedJob, coverLetter: string): Promise<boolean> {
  if (!job.easyApply) return false;

  switch (job.platform) {
    case 'linkedin': {
      const ctx = await getLinkedInContext();
      return applyLinkedIn(job, coverLetter, ctx);
    }
    case 'indeed': {
      const ctx = await getIndeedContext();
      return applyIndeed(job, coverLetter, ctx);
    }
    default:
      return false;
  }
}

export async function closeAllBrowsers() {
  await linkedinContext?.browser()?.close().catch(() => {});
  await indeedContext?.browser()?.close().catch(() => {});
  linkedinContext = null;
  indeedContext = null;
}
