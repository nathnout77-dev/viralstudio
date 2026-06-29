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

  const isAuto = /auto|véhicule|vehicule|concess|fleet|flotte|moto/i.test(`${job.title} ${job.company} ${job.description}`);
  const isIndustrie = /indust|métal|metal|mainten|réparat|technico|pièces|machines/i.test(`${job.title} ${job.company} ${job.description}`);

  const accrocheSector = isAuto
    ? `Passionné de mécanique et de sport automobile depuis toujours, je suis particulièrement attiré par les postes commerciaux dans ce secteur.`
    : isIndustrie
    ? `Mon alternance actuelle chez Groupe Triametal (vente de prestations de maintenance et réparation BtoB, chiffrage sur plans techniques DXF) m'a conféré une vraie compréhension du tissu industriel et des attentes des clients professionnels.`
    : `Mes 3 alternances en commerce BtoB m'ont permis de maîtriser l'ensemble du cycle de vente, de la prospection à la signature.`;

  try {
    const response = await getClient().messages.create({
      model: CONFIG.anthropic.model,
      max_tokens: 600,
      messages: [{
        role: 'user',
        content: `Génère une lettre de motivation courte, professionnelle et percutante en français pour ce poste.

OFFRE:
Titre: ${job.title}
Entreprise: ${job.company || "l'entreprise"}
Lieu: ${job.location}
Contrat: ${job.contract}
Description: ${(job.description || '').slice(0, 1500)}

PROFIL DU CANDIDAT:
${CONFIG.user.profile}

ACCROCHE SECTORIELLE SUGGÉRÉE: ${accrocheSector}

DISPONIBILITÉ: À partir d'${CONFIG.user.availableFrom}

RÈGLES STRICTES:
- 180 à 220 mots maximum
- Commencer par "Madame, Monsieur,"
- Terminer par "Cordialement,\n${CONFIG.user.name}"
- Mentionner naturellement la disponibilité dès octobre 2026
- Valoriser la maîtrise des outils digitaux (Brevo, JePilote, WordPress, DXF) comme plus-value concrète
- Ton direct, concret, sans formules vides
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
  const isAuto = /auto|véhicule|vehicule|concess|moto/i.test(`${job.title} ${job.description}`);
  const isIndustrie = /indust|métal|metal|mainten|technico/i.test(`${job.title} ${job.description}`);

  const body = isAuto
    ? `Passionné de mécanique et de sport automobile, je suis particulièrement motivé par ce poste. ` +
      `Mon BTS NDRC et mes 3 alternances en commerce BtoB m'ont permis de développer une vraie maîtrise de la prospection, du chiffrage et de la relation client. ` +
      `Je suis à l'aise avec les outils digitaux (CRM, Brevo, réseaux sociaux) et sais construire et fidéliser un portefeuille clients exigeant.`
    : isIndustrie
    ? `Mon alternance actuelle au Groupe Triametal (vente de prestations de maintenance et réparation BtoB, devis sur plans techniques DXF, prospection et reporting JePilote) correspond directement aux enjeux de ce poste. ` +
      `Titulaire d'un BTS NDRC, je sais allier rigueur technique et efficacité commerciale pour développer un portefeuille clients industriels.`
    : `Mes 3 alternances successives en commerce BtoB m'ont permis de maîtriser l'ensemble du cycle de vente : prospection téléphonique et digitale, élaboration de devis personnalisés, négociation et fidélisation. ` +
      `Titulaire d'un BTS NDRC et en cours de Licence Pro MGO, je combine rigueur, aisance relationnelle et maîtrise des outils digitaux (Brevo, JePilote, WordPress).`;

  return `Madame, Monsieur,

Votre offre pour le poste de ${job.title}${job.company ? ` au sein de ${job.company}` : ''} retient toute mon attention.

${body}

Disponible à partir d'octobre 2026, je serais ravi d'échanger avec vous pour vous présenter ma candidature plus en détail.

Cordialement,
${CONFIG.user.name}
${CONFIG.user.phone}
${CONFIG.user.email}`;
}
