// Script léger pour GitHub Actions — France Travail uniquement, sans Playwright
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '../../.env') });
dotenv.config({ path: path.join(__dirname, '../../.env.local') });

import { searchFranceTravail } from './searchers/francetravail';
import { searchWTTJ } from './searchers/wttj';
import { filterJobs } from './filter';
import { jobDb } from './db';

async function main() {
  console.log('🔍 Recherche API (sans navigateur)...');

  const [ft, wttj] = await Promise.allSettled([
    searchFranceTravail(),
    searchWTTJ(),
  ]);

  const raw = [
    ...(ft.status === 'fulfilled' ? ft.value.jobs : []),
    ...(wttj.status === 'fulfilled' ? wttj.value.jobs : []),
  ];

  console.log(`  France Travail: ${ft.status === 'fulfilled' ? ft.value.totalFound : 'ERREUR'}`);
  console.log(`  WTTJ: ${wttj.status === 'fulfilled' ? wttj.value.totalFound : 'ERREUR'}`);

  const filtered = filterJobs(raw);
  let newCount = 0;
  for (const job of filtered) {
    if (jobDb.saveJob(job)) newCount++;
  }

  const jsonPath = path.join(__dirname, '../../data/jobs.json');
  jobDb.exportJson(jsonPath);

  console.log(`✅ ${newCount} nouvelles offres | Export → data/jobs.json`);
  console.log(JSON.stringify(jobDb.getStats(), null, 2));
}

main().catch(e => {
  console.error('Fatal:', e.message);
  process.exit(1);
});
