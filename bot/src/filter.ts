import type { Job } from './types';
import { CONFIG } from './config';

const SECTOR_KEYWORDS: Record<string, string[]> = {
  automobile: ['automobile', 'automotive', 'auto', 'moto', 'véhicule', 'vehicule', 'concessionnaire', 'garage', 'fleet', 'flotte', 'pneu', 'pièces auto', 'carrosserie', 'occasion'],
  industrie: ['industrie', 'industriel', 'pièces', 'équipement', 'equipement', 'mécanique', 'mecanique', 'btp', 'construction', 'manufacturing', 'usine', 'production', 'outils', 'machines', 'maintenance'],
  vente: ['commercial', 'vente', 'sales', 'business', 'développeur', 'developpeur', 'technico', 'vrp', 'représentant', 'representant', 'compte', 'client', 'prospection', 'négociation'],
};

const CONTRACT_MAP: Record<string, string[]> = {
  CDI: ['cdi', 'indéterminée', 'indeterminate', 'permanent'],
  Intérim: ['intérim', 'interim', 'temporaire', 'mission', 'mis', 'tt ', 'travail temporaire'],
  Freelance: ['freelance', 'indépendant', 'independant', 'portage', 'auto-entrepreneur'],
};

function parseSalary(text: string): number | null {
  if (!text) return null;
  const clean = text.replace(/\s/g, '').toLowerCase();

  const monthlyMatch = clean.match(/(\d+(?:[.,]\d+)?)(?:k|000)?€?\/mois/);
  if (monthlyMatch) {
    let val = parseFloat(monthlyMatch[1].replace(',', '.'));
    if (val < 100) val *= 1000; // 2,5k -> 2500
    return val * 12;
  }

  const yearMatch = clean.match(/(\d+(?:[.,]\d+)?)k?€?(?:\/an|annuel|brut)/);
  if (yearMatch) {
    let val = parseFloat(yearMatch[1].replace(',', '.'));
    if (val < 200) val *= 1000; // 27k -> 27000
    return val;
  }

  const rangeMatch = clean.match(/(\d+(?:[.,]\d+)?)k?€?\s*[-–]\s*(\d+(?:[.,]\d+)?)k?€/);
  if (rangeMatch) {
    let min = parseFloat(rangeMatch[1].replace(',', '.'));
    if (min < 200) min *= 1000;
    return min;
  }

  return null;
}

function matchesSector(job: Job): boolean {
  const text = `${job.title} ${job.company} ${job.description}`.toLowerCase();
  return CONFIG.search.sectors.some(s => SECTOR_KEYWORDS[s]?.some(kw => text.includes(kw)));
}

function matchesContract(job: Job): boolean {
  const contract = job.contract.toLowerCase();
  return CONFIG.search.contracts.some(c => {
    const aliases = CONTRACT_MAP[c] || [c.toLowerCase()];
    return aliases.some(alias => contract.includes(alias));
  });
}

function meetsSalary(job: Job): boolean {
  if (!job.salary) return true; // include if salary not stated
  const annual = parseSalary(job.salary);
  if (!annual) return true;
  return annual >= CONFIG.search.minSalaryYear;
}

export function filterJobs(jobs: Job[]): Job[] {
  const seenUrls = new Set<string>();

  return jobs.filter(job => {
    if (!job.url || !job.title) return false;
    const url = job.url.split('?')[0];
    if (seenUrls.has(url)) return false;
    seenUrls.add(url);

    if (!matchesSector(job)) return false;
    if (!matchesContract(job)) return false;
    if (!meetsSalary(job)) return false;

    return true;
  });
}
