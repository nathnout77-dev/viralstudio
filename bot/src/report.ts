import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '../../.env') });

import { jobDb } from './db';

function bar(n: number, max: number, width = 20): string {
  const filled = Math.round((n / Math.max(max, 1)) * width);
  return '█'.repeat(filled) + '░'.repeat(width - filled);
}

function main() {
  const stats = jobDb.getStats();
  const recent = jobDb.getAllJobs(10);
  const manual = jobDb.getJobsByStatus('manual_required');

  console.log('\n╔══════════════════════════════════════════╗');
  console.log('║         📊 RAPPORT CANDIDATURES          ║');
  console.log('╚══════════════════════════════════════════╝\n');

  const maxVal = Math.max(stats.found, stats.applied, stats.manual_required, stats.replied, stats.interview);
  const rows = [
    ['Nouvelles offres', stats.found, '🔵'],
    ['Candidatures envoyées', stats.applied, '🟢'],
    ['Manuelles requises', stats.manual_required, '🟡'],
    ['Réponses reçues', stats.replied, '🟠'],
    ['Entretiens', stats.interview, '⭐'],
    ['Refus', stats.rejected, '🔴'],
    ['Acceptées', stats.accepted, '🏆'],
  ] as [string, number, string][];

  for (const [label, count, icon] of rows) {
    console.log(`  ${icon} ${label.padEnd(28)} ${bar(count, maxVal)} ${count}`);
  }

  console.log(`\n  Total dans la base: ${stats.total}\n`);

  if (manual.length > 0) {
    console.log('━━━━ ⚠️  CANDIDATURES MANUELLES REQUISES ━━━━━');
    for (const job of manual.slice(0, 10)) {
      console.log(`  • [${job.platform}] ${job.title} @ ${job.company}`);
      console.log(`    ${job.url}`);
    }
    console.log('');
  }

  if (recent.length > 0) {
    console.log('━━━━ 🆕  OFFRES RÉCENTES ━━━━━━━━━━━━━━━━━━━━━');
    for (const job of recent) {
      const date = new Date(job.foundAt).toLocaleDateString('fr-FR');
      const status = job.status === 'applied' ? '✅' : job.status === 'manual_required' ? '⚠️' : '🔵';
      console.log(`  ${status} [${date}] ${job.title} @ ${job.company} (${job.platform})`);
    }
  }

  console.log('\n══════════════════════════════════════════════\n');
}

main();
