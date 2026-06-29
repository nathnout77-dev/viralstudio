import axios from 'axios';
import type { Job, SearchResult, ContractType } from '../types';
import { CONFIG } from '../config';

interface FTToken { access_token: string; expires_at: number; }
let token: FTToken | null = null;

async function getToken(): Promise<string> {
  if (token && Date.now() < token.expires_at) return token.access_token;

  const { clientId, clientSecret } = CONFIG.credentials.francetravail;
  if (!clientId || !clientSecret) throw new Error('France Travail credentials manquants (FRANCE_TRAVAIL_CLIENT_ID / SECRET)');

  const res = await axios.post(
    'https://entreprise.francetravail.fr/connexion/oauth2/access_token?realm=%2Fpartenaire',
    new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
      scope: 'api_offresdemploiv2 o2dsoffre',
    }),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );

  token = { access_token: res.data.access_token, expires_at: Date.now() + (res.data.expires_in - 60) * 1000 };
  return token.access_token;
}

function mapContract(code: string): ContractType {
  const map: Record<string, ContractType> = { CDI: 'CDI', CDD: 'CDD', MIS: 'Intérim', LIB: 'Freelance', SAI: 'CDD' };
  return map[code] || 'Autre';
}

async function searchKeyword(accessToken: string, keyword: string): Promise<Job[]> {
  const { inseeCode, radiusKm } = CONFIG.search.location;
  const res = await axios.get('https://api.francetravail.io/partenaire/offresdemploi/v2/offres/search', {
    params: {
      motsCles: keyword,
      commune: inseeCode,
      distance: radiusKm,
      typeContrat: 'CDI,MIS,LIB',
      range: '0-49',
      sort: 1,
    },
    headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/json' },
  });

  return (res.data.resultats || []).map((r: any): Job => ({
    id: r.id,
    platform: 'francetravail',
    title: r.intitule || '',
    company: r.entreprise?.nom || '',
    location: r.lieuTravail?.libelle || '',
    salary: r.salaire?.libelle || '',
    contract: mapContract(r.typeContrat),
    description: r.description || '',
    url: r.origineOffre?.urlOrigine || `https://candidat.francetravail.fr/offres/recherche/detail/${r.id}`,
    easyApply: false,
    sectors: [],
    postedAt: r.dateCreation,
  }));
}

export async function searchFranceTravail(): Promise<SearchResult> {
  try {
    const accessToken = await getToken();
    const seen = new Set<string>();
    const jobs: Job[] = [];

    for (const keyword of CONFIG.search.keywords.slice(0, 6)) {
      try {
        const results = await searchKeyword(accessToken, keyword);
        for (const job of results) {
          if (!seen.has(job.url)) { seen.add(job.url); jobs.push(job); }
        }
        await new Promise(r => setTimeout(r, 600));
      } catch (e: any) {
        console.warn(`  FT "${keyword}": ${e.message}`);
      }
    }

    return { jobs, platform: 'francetravail', totalFound: jobs.length };
  } catch (e: any) {
    console.error(`France Travail search failed: ${e.message}`);
    return { jobs: [], platform: 'francetravail', totalFound: 0, errors: [e.message] };
  }
}
