import axios from 'axios';
import type { Job, SearchResult } from '../types';
import { CONFIG } from '../config';

export async function searchWTTJ(): Promise<SearchResult> {
  const { latitude, longitude, radiusKm } = CONFIG.search.location;
  const jobs: Job[] = [];
  const seen = new Set<string>();

  for (const keyword of CONFIG.search.keywords.slice(0, 3)) {
    try {
      // WTTJ uses Algolia search under the hood
      const res = await axios.post(
        'https://csekhvms53-dsn.algolia.net/1/indexes/*/queries',
        {
          requests: [{
            indexName: 'wttj_jobs_production_fr',
            params: new URLSearchParams({
              query: keyword,
              aroundLatLng: `${latitude},${longitude}`,
              aroundRadius: String(radiusKm * 1000),
              filters: 'contract_type:permanent_contract OR contract_type:temporary_work OR contract_type:freelance',
              hitsPerPage: '30',
              attributesToRetrieve: 'name,organization,office,salary_min,salary_max,salary_period,slug,organization_slug,published_at,contract_type',
            }).toString(),
          }],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Algolia-Application-Id': 'CSEKHVMS53',
            'X-Algolia-API-Key': '1a0b5a3e4dfe42553bb49c97d0c78bf5',
          },
        }
      );

      const hits = res.data.results?.[0]?.hits || [];
      for (const h of hits) {
        const url = `https://www.welcometothejungle.com/fr/companies/${h.organization_slug || h.organization?.slug}/jobs/${h.slug}`;
        if (seen.has(url)) continue;
        seen.add(url);

        const salaryStr = h.salary_min && h.salary_max
          ? `${h.salary_min} - ${h.salary_max}€ ${h.salary_period === 'monthly' ? '/mois' : '/an'}`
          : '';

        jobs.push({
          id: h.objectID || '',
          platform: 'wttj',
          title: h.name || '',
          company: h.organization?.name || '',
          location: h.office?.city || '',
          salary: salaryStr,
          salaryMin: h.salary_min ? (h.salary_period === 'monthly' ? h.salary_min * 12 : h.salary_min) : undefined,
          contract: h.contract_type === 'permanent_contract' ? 'CDI' : h.contract_type === 'temporary_work' ? 'Intérim' : 'Freelance',
          description: '',
          url,
          easyApply: false,
          sectors: [],
          postedAt: h.published_at,
        });
      }

      await new Promise(r => setTimeout(r, 800));
    } catch (e: any) {
      console.warn(`  WTTJ "${keyword}": ${e.message}`);
    }
  }

  return { jobs, platform: 'wttj', totalFound: jobs.length };
}
