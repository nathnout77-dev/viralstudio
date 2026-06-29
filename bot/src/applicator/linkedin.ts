import { type BrowserContext, type Page } from 'playwright';
import { CONFIG } from '../config';
import type { SavedJob } from '../types';

export async function applyLinkedIn(job: SavedJob, coverLetter: string, context: BrowserContext): Promise<boolean> {
  const page = await context.newPage();

  try {
    await page.goto(job.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Click Easy Apply button
    const applyBtn = page.locator('button:has-text("Candidature simplifiée"), button:has-text("Easy Apply")').first();
    if (!await applyBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      console.log(`    ℹ️  Pas de bouton Easy Apply`);
      return false;
    }
    await applyBtn.click();
    await page.waitForTimeout(2000);

    return await fillEasyApplyModal(page, coverLetter);
  } catch (e: any) {
    console.warn(`    LinkedIn apply error: ${e.message}`);
    return false;
  } finally {
    await page.close();
  }
}

async function fillEasyApplyModal(page: Page, coverLetter: string): Promise<boolean> {
  for (let step = 0; step < 8; step++) {
    await page.waitForTimeout(1000);

    // Success check
    if (await page.locator('h3:has-text("Candidature envoyée"), div:has-text("Votre candidature a été envoyée")').isVisible({ timeout: 500 }).catch(() => false)) {
      return true;
    }

    // Dismiss "Save application" prompts
    const dismissBtn = page.locator('button[aria-label="Ignorer"], button:has-text("Ignorer")').first();
    if (await dismissBtn.isVisible({ timeout: 500 }).catch(() => false)) {
      await dismissBtn.click();
      return false;
    }

    // Phone number
    await fillIfEmpty(page, 'input[id*="phoneNumber"], input[name*="phone"]', CONFIG.user.phone);

    // Cover letter textarea
    const clField = page.locator('textarea').first();
    if (await clField.isVisible({ timeout: 500 }).catch(() => false)) {
      const val = await clField.inputValue().catch(() => '');
      if (!val) await clField.fill(coverLetter);
    }

    // Yes/No radio — default to first "Oui"
    const radioYes = page.locator('label:has-text("Oui"), label:has-text("Yes")').first();
    if (await radioYes.isVisible({ timeout: 500 }).catch(() => false)) {
      await radioYes.click().catch(() => {});
    }

    // Numeric inputs — default to 3 (years of experience)
    const numericInputs = page.locator('input[type="number"]');
    const numCount = await numericInputs.count().catch(() => 0);
    for (let i = 0; i < numCount; i++) {
      const inp = numericInputs.nth(i);
      const val = await inp.inputValue().catch(() => '1');
      if (!val || val === '0') await inp.fill('3').catch(() => {});
    }

    // Select dropdowns — pick first real option
    const selects = page.locator('select');
    const selCount = await selects.count().catch(() => 0);
    for (let i = 0; i < selCount; i++) {
      const sel = selects.nth(i);
      const val = await sel.inputValue().catch(() => '');
      if (!val) {
        const options = await sel.locator('option').all();
        if (options.length > 1) await sel.selectOption({ index: 1 }).catch(() => {});
      }
    }

    // Navigate
    const submitBtn = page.locator('button:has-text("Envoyer la candidature"), button[aria-label*="Envoyer la candidature"]').first();
    const reviewBtn = page.locator('button:has-text("Vérifier"), button:has-text("Review")').first();
    const nextBtn = page.locator('button:has-text("Suivant"), button:has-text("Next"), button[aria-label="Continuer"]').first();

    if (await submitBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
      await submitBtn.click();
      await page.waitForTimeout(3000);
      return true;
    } else if (await reviewBtn.isVisible({ timeout: 500 }).catch(() => false)) {
      await reviewBtn.click();
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
