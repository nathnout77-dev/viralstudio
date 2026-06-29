import { searchFranceTravail } from './francetravail';
import { searchIndeed } from './indeed';
import { searchLinkedIn } from './linkedin';
import { searchWTTJ } from './wttj';
import { CONFIG } from '../config';
import type { Job } from '../types';

export async function searchAllPlatforms(platforms?: string[]): Promise<Job[]> {
  const enabled = platforms || Object.entries(CONFIG.platforms)
    .filter(([, cfg]) => cfg.enabled)
    .map(([name]) => name);

  const tasks: Promise<{ platform: string; jobs: Job[] }>[] = [];

  if (enabled.includes('francetravail')) {
    tasks.push(searchFranceTravail().then(r => ({ platform: 'francetravail', jobs: r.jobs })).catch(e => {
      console.error('France Travail error:', e.message);
      return { platform: 'francetravail', jobs: [] };
    }));
  }

  if (enabled.includes('wttj')) {
    tasks.push(searchWTTJ().then(r => ({ platform: 'wttj', jobs: r.jobs })).catch(e => {
      console.error('WTTJ error:', e.message);
      return { platform: 'wttj', jobs: [] };
    }));
  }

  // Playwright-based searches run sequentially to avoid resource contention
  const playwrightSearches = async () => {
    const results: Job[] = [];
    if (enabled.includes('indeed')) {
      try {
        const r = await searchIndeed();
        console.log(`  ✓ Indeed: ${r.totalFound} offres`);
        results.push(...r.jobs);
      } catch (e: any) { console.error('Indeed error:', e.message); }
    }
    if (enabled.includes('linkedin')) {
      try {
        const r = await searchLinkedIn();
        console.log(`  ✓ LinkedIn: ${r.totalFound} offres`);
        results.push(...r.jobs);
      } catch (e: any) { console.error('LinkedIn error:', e.message); }
    }
    return results;
  };

  const [apiResults, playwrightResults] = await Promise.all([
    Promise.all(tasks),
    playwrightSearches(),
  ]);

  const allJobs: Job[] = [];
  for (const r of apiResults) {
    console.log(`  ✓ ${r.platform}: ${r.jobs.length} offres`);
    allJobs.push(...r.jobs);
  }
  allJobs.push(...playwrightResults);

  return allJobs;
}
