import { type BrowserContext, type Page } from 'playwright';
import { CONFIG } from '../config';
import type { SavedJob } from '../types';

export async function applyIndeed(job: SavedJob, coverLetter: string, context: BrowserContext): Promise<boolean> {
  const page = await context.newPage();

  try {
    await page.goto(job.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Look for Indeed Easy Apply button
    const applyBtn = page.locator('#indeedApplyButton, button:has-text("Postuler facilement"), a:has-text("Postuler facilement")').first();
    if (!await applyBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      return false;
    }

    await applyBtn.click();
    await page.waitForTimeout(2500);

    // Indeed may open apply in a popup/iframe
    const pages = context.pages();
    const applyPage = pages.find(p => p.url().includes('indeed.com') && p !== page) || page;

    return await fillIndeedForm(applyPage, coverLetter);
  } catch (e: any) {
    console.warn(`    Indeed apply error: ${e.message}`);
    return false;
  } finally {
    await page.close();
  }
}

async function fillIndeedForm(page: Page, coverLetter: string): Promise<boolean> {
  for (let step = 0; step < 8; step++) {
    await page.waitForTimeout(1200);

    // Check success
    if (await page.locator('text=Candidature envoyée, text=Application submitted').isVisible({ timeout: 500 }).catch(() => false)) {
      return true;
    }

    // Fill name fields
    await fillIfEmpty(page, 'input[name="applicant.name"], input[id*="firstName"]', CONFIG.user.name.split(' ')[0] || '');
    await fillIfEmpty(page, 'input[id*="lastName"]', CONFIG.user.name.split(' ').slice(1).join(' ') || '');
    await fillIfEmpty(page, 'input[type="email"], input[name*="email"]', CONFIG.user.email);
    await fillIfEmpty(page, 'input[type="tel"], input[name*="phone"]', CONFIG.user.phone);

    // Cover letter
    const clField = page.locator('textarea[name*="coverLetter"], textarea[id*="cover"], textarea').first();
    if (await clField.isVisible({ timeout: 500 }).catch(() => false)) {
      const val = await clField.inputValue().catch(() => '');
      if (!val) await clField.fill(coverLetter).catch(() => {});
    }

    // Submit or Next
    const submitBtn = page.locator('button[type="submit"]:has-text("Envoyer"), button:has-text("Soumettre"), button:has-text("Submit")').first();
    const nextBtn = page.locator('button:has-text("Continuer"), button:has-text("Suivant"), button:has-text("Next")').first();

    if (await submitBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
      await submitBtn.click();
      await page.waitForTimeout(3000);
      return true;
    } else if (await nextBtn.isVisible({ timeout: 500 }).catch(() => false)) {
      await nextBtn.click();
    } else {
      break;
    }
  }

  return false;
}

async function fillIfEmpty(page: Page, selector: string, value: string) {
  if (!value) return;
  const el = page.locator(selector).first();
  if (await el.isVisible({ timeout: 500 }).catch(() => false)) {
    const val = await el.inputValue().catch(() => value);
    if (!val) await el.fill(value).catch(() => {});
  }
}
