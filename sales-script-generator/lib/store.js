// ============================================================================
//  Persistance locale (historique + quota freemium) via localStorage.
//  Aucune dépendance serveur : fonctionne sans compte.
// ============================================================================
const HISTORY_KEY = "svg_history";
const USAGE_KEY = "svg_usage";
const PLAN_KEY = "svg_plan";

export const FREE_LIMIT = 5; // scripts / jour sur le plan gratuit

function today() {
  return new Date().toISOString().slice(0, 10);
}

export function getPlan() {
  if (typeof window === "undefined") return "free";
  return localStorage.getItem(PLAN_KEY) || "free";
}

export function setPlan(plan) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PLAN_KEY, plan);
}

export function getUsage() {
  if (typeof window === "undefined") return { date: today(), count: 0 };
  try {
    const raw = JSON.parse(localStorage.getItem(USAGE_KEY) || "{}");
    if (raw.date !== today()) return { date: today(), count: 0 };
    return { date: raw.date, count: raw.count || 0 };
  } catch {
    return { date: today(), count: 0 };
  }
}

export function incrementUsage() {
  const u = getUsage();
  const next = { date: today(), count: u.count + 1 };
  localStorage.setItem(USAGE_KEY, JSON.stringify(next));
  return next;
}

export function canGenerate() {
  if (getPlan() === "pro") return true;
  return getUsage().count < FREE_LIMIT;
}

export function remaining() {
  if (getPlan() === "pro") return Infinity;
  return Math.max(0, FREE_LIMIT - getUsage().count);
}

export function getHistory() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveToHistory(entry) {
  const list = getHistory();
  const next = [
    { ...entry, id: Date.now(), savedAt: new Date().toISOString() },
    ...list,
  ].slice(0, 50);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  return next;
}

export function deleteFromHistory(id) {
  const next = getHistory().filter((e) => e.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  return next;
}
