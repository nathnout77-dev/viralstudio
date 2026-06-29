import Anthropic from '@anthropic-ai/sdk';
import { CONFIG } from './config';
import type { Job } from './types';

let client: Anthropic | null = null;

function getClient(): Anthropic {
  if (!client) client = new Anthropic({ apiKey: CONFIG.anthropic.apiKey });
  return client;
}

export async function generateCoverLetter(job: Job): Promise<string> {
  if (!CONFIG.anthropic.apiKey) {
    return fallbackLetter(job);
  }

  try {
    const response = await getClient().messages.create({
      model: CONFIG.anthropic.model,
      max_tokens: 600,
      messages: [{
        role: 'user',
        content: `Génère une lettre de motivation courte, professionnelle et percutante en français pour ce poste commercial.

OFFRE:
Titre: ${job.title}
Entreprise: ${job.company || 'l\'entreprise'}
Lieu: ${job.location}
Contrat: ${job.contract}
Description: ${(job.description || '').slice(0, 1500)}

PROFIL CANDIDAT:
${CONFIG.user.profile}

RÈGLES STRICTES:
- 180 à 220 mots maximum
- Commencer par "Madame, Monsieur,"
- Terminer par "Cordialement,\\n${CONFIG.user.name || '[Prénom NOM]'}"
- Ton direct, sans formules creuses
- Mettre en valeur l'expertise terrain et la culture résultat
- Pas de mention de localisation géographique
- Générer uniquement la lettre, rien d'autre`,
      }],
    });

    const content = response.content[0];
    return content.type === 'text' ? content.text : fallbackLetter(job);
  } catch {
    return fallbackLetter(job);
  }
}

function fallbackLetter(job: Job): string {
  const sector = job.title.toLowerCase().includes('auto') ? "l'automobile"
    : job.title.toLowerCase().includes('indust') ? "l'industrie"
    : "la vente B2B";

  return `Madame, Monsieur,

Votre annonce pour le poste de ${job.title}${job.company ? ` au sein de ${job.company}` : ''} a immédiatement retenu mon attention.

Fort d'une expérience terrain en vente B2B, j'ai développé une réelle expertise dans ${sector} : prospection de nouveaux comptes, développement du portefeuille existant et négociation jusqu'à la signature. Habitué à travailler en autonomie avec des objectifs clairs, j'obtiens des résultats concrets grâce à une approche à la fois méthodique et relationnelle.

Ce poste correspond exactement à mon projet professionnel. Je suis convaincu que mon profil peut apporter une valeur immédiate à ${job.company || 'votre équipe'} et j'aurais plaisir à vous le démontrer lors d'un entretien.

Cordialement,
${CONFIG.user.name || '[Prénom NOM]'}${CONFIG.user.phone ? '\n' + CONFIG.user.phone : ''}${CONFIG.user.email ? '\n' + CONFIG.user.email : ''}`;
}
