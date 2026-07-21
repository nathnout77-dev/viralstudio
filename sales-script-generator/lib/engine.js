// ============================================================================
//  Moteur de génération : remplit les templates avec les données du prospect
//  et les profils secteur. 100 % local, aucun appel réseau.
// ============================================================================
import {
  SECTORS,
  TONES,
  TEMPLATES,
  OBJECTION_RESPONSES,
  OBJECTIONS,
} from "../data/templates";

function pick(list, seed = 0) {
  if (!list || list.length === 0) return "";
  return list[seed % list.length];
}

// Nettoie un fragment de phrase (première lettre, ponctuation).
function trimPain(text = "") {
  return text.replace(/^(perdre|des|un|une|trop)\s+/i, "").trim();
}

/**
 * Construit le dictionnaire de variables à partir des entrées utilisateur.
 */
function buildVars(input) {
  const sector = SECTORS.find((s) => s.id === input.sectorId) || SECTORS[0];
  const tone = TONES.find((t) => t.id === input.toneId) || TONES[0];
  const seed = input.variant || 0;

  const pain = input.pain?.trim() || pick(sector.pains, seed);
  const value = input.value?.trim() || pick(sector.values, seed);
  const proof = input.proof?.trim() || pick(sector.proofs, seed);
  const role = input.role?.trim() || pick(sector.roles, seed);

  return {
    prospect: input.prospect?.trim() || "[Prénom]",
    company: input.company?.trim() || "votre entreprise",
    role,
    product: input.product?.trim() || "notre solution",
    sender: input.sender?.trim() || "[Votre prénom]",
    senderCompany: input.senderCompany?.trim() || "[Votre société]",
    pain,
    painShort: trimPain(pain),
    value,
    proof: proof.charAt(0).toUpperCase() + proof.slice(1),
    open: tone.open,
    bridge: tone.bridge,
    soft: tone.soft,
    cta: tone.cta,
  };
}

function interpolate(line, vars) {
  return line.replace(/\{\{(\w+)\}\}/g, (_, key) =>
    vars[key] !== undefined ? vars[key] : `{{${key}}}`
  );
}

/**
 * Génère le script final (string) pour une configuration donnée.
 */
export function generateScript(input) {
  const vars = buildVars(input);

  // Étape objection : injecter la réponse spécifique à l'objection choisie.
  if (input.stageId === "objection") {
    const objId = input.objectionId || OBJECTIONS[0].id;
    const objLabel =
      OBJECTIONS.find((o) => o.id === objId)?.label || "";
    const rawResponse = OBJECTION_RESPONSES[objId] || "";
    vars.objectionLabel = objLabel;
    vars.objectionResponse = interpolate(rawResponse, vars);
  }

  const template = TEMPLATES[input.stageId] || TEMPLATES.cold_call;
  return template.map((line) => interpolate(line, vars)).join("\n");
}

/**
 * Génère plusieurs variantes (pour bouton « Régénérer »).
 */
export function generateVariants(input, count = 3) {
  return Array.from({ length: count }, (_, i) =>
    generateScript({ ...input, variant: i })
  );
}
