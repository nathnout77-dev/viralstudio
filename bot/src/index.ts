#!/usr/bin/env node
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../../.env') });
dotenv.config({ path: path.join(__dirname, '../../.env.local') });

import { searchAllPlatforms } from './searchers';
import { filterJobs } from './filter';
import { generateCoverLetter } from './generator';
import { applyToJob, closeAllBrowsers } from './applicator';
import { jobDb } from './db';
import { CONFIG } from './config';

const args = process.argv.slice(2);
const searchOnly = args.includes('--search-only') || args.includes('-s');
const applyOnly = args.includes('--apply-only') || args.includes('-a');
const dryRun = args.includes('--dry-run') || args.includes('-d');

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

async function search() {
  console.log('\n🔍 Recherche d\'offres...');
  const raw = await searchAllPlatforms();
  const filtered = filterJobs(raw);

  let newCount = 0;
  for (const job of filtered) {
    if (jobDb.saveJob(job)) newCount++;
  }

  console.log(`\n✅ ${raw.length} brutes → ${filtered.length} pertinentes → ${newCount} nouvelles`);
  return newCount;
}

async function apply() {
  const pending = jobDb.getJobsByStatus('found');
  const toProcess = pending.slice(0, CONFIG.bot.maxApplicationsPerRun);

  console.log(`\n📧 ${pending.length} offres en attente (traitement de ${toProcess.length})`);

  let applied = 0;
  let manual = 0;
  let errors = 0;

  for (const job of toProcess) {
    console.log(`\n  → [${job.platform}] ${job.title} @ ${job.company}`);

    try {
      const letter = await generateCoverLetter(job);
      jobDb.updateCoverLetter(job.id, letter);

      if (dryRun) {
        console.log(`    [DRY RUN] Candidature simulée`);
        continue;
      }

      const success = await applyToJob(job, letter);

      if (success) {
        jobDb.updateStatus(job.id, 'applied');
        console.log(`    ✅ Candidature envoyée`);
        applied++;
      } else {
        jobDb.updateStatus(job.id, 'manual_required');
        console.log(`    ⚠️  Manuelle requise → ${job.url}`);
        manual++;
      }

      await sleep(CONFIG.bot.delayBetweenAppsMs + Math.random() * 5000);
    } catch (e: any) {
      console.error(`    ❌ Erreur: ${e.message}`);
      jobDb.updateStatus(job.id, 'error');
      errors++;
    }
  }

  console.log(`\n📊 Résultats: ${applied} envoyées | ${manual} manuelles | ${errors} erreurs`);
}

async function main() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🤖 Job Application Bot');
  console.log(`📍 ${CONFIG.search.location.city} +${CONFIG.search.location.radiusKm}km`);
  console.log(`💰 Min. ${CONFIG.search.minSalaryYear.toLocaleString('fr-FR')}€ bruts`);
  console.log(`📋 Contrats: ${CONFIG.search.contracts.join(', ')}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  try {
    if (!applyOnly) await search();
    if (!searchOnly) await apply();

    // Export JSON for dashboard
    const jsonPath = path.join(__dirname, '../../data/jobs.json');
    jobDb.exportJson(jsonPath);
    console.log(`\n💾 Données exportées → bot/data/jobs.json`);

    const stats = jobDb.getStats();
    console.log('\n📈 Stats globales:');
    console.log(`  Total: ${stats.total} | En attente: ${stats.found} | Envoyées: ${stats.applied} | Entretiens: ${stats.interview} | Acceptées: ${stats.accepted}`);
  } finally {
    await closeAllBrowsers();
  }
}

main().catch(e => {
  console.error('\n💥 Fatal:', e.message);
  process.exit(1);
});
