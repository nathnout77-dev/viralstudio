// ── Encépagements officiels des appellations françaises ─────────────────────
// Vérité de terrain (cahiers des charges AOC) pour corriger la lecture vision
// du scanner : le modèle devine parfois des cépages étrangers à l'appellation
// (ex. « Chardonnay » pour un Anjou blanc, qui est du Chenin). Cette table ne
// couvre que des faits établis et sans ambiguïté ; en cas de doute, on ne
// corrige pas. Complète WINE_DB (qui couvre déjà ses propres appellations).
//
// k : clé normalisée (sans accents ni ponctuation) cherchée dans l'appellation lue
// t : couleurs concernées (['red'|'white'|'rosé'|'sweet']) — null = toutes
// c : cépages dominants/autorisés, du principal au secondaire

const TABLE = [
  // ── Loire ──────────────────────────────────────────────────────────────
  { k: 'anjou villages', t: ['red'], c: ['Cabernet franc', 'Cabernet sauvignon'] },
  { k: 'cabernet d anjou', t: ['rosé'], c: ['Cabernet franc', 'Cabernet sauvignon'] },
  { k: 'rose d anjou', t: ['rosé'], c: ['Grolleau'] },
  { k: 'anjou', t: ['white', 'sweet'], c: ['Chenin blanc'] },
  { k: 'anjou', t: ['red'], c: ['Cabernet franc', 'Cabernet sauvignon'] },
  { k: 'saumur champigny', t: ['red'], c: ['Cabernet franc'] },
  { k: 'saumur', t: ['white'], c: ['Chenin blanc'] },
  { k: 'saumur', t: ['red'], c: ['Cabernet franc'] },
  { k: 'coteaux du layon', t: ['sweet', 'white'], c: ['Chenin blanc'] },
  { k: 'coteaux de l aubance', t: ['sweet', 'white'], c: ['Chenin blanc'] },
  { k: 'quarts de chaume', t: ['sweet', 'white'], c: ['Chenin blanc'] },
  { k: 'bonnezeaux', t: ['sweet', 'white'], c: ['Chenin blanc'] },
  { k: 'montlouis', t: null, c: ['Chenin blanc'] },
  { k: 'jasnieres', t: ['white'], c: ['Chenin blanc'] },
  { k: 'savennieres', t: ['white'], c: ['Chenin blanc'] },
  { k: 'vouvray', t: null, c: ['Chenin blanc'] },
  { k: 'saint nicolas de bourgueil', t: ['red'], c: ['Cabernet franc'] },
  { k: 'bourgueil', t: ['red'], c: ['Cabernet franc'] },
  { k: 'chinon', t: ['red'], c: ['Cabernet franc'] },
  { k: 'touraine', t: ['white'], c: ['Sauvignon blanc'] },
  { k: 'touraine', t: ['red'], c: ['Gamay', 'Cabernet franc'] },
  { k: 'cheverny', t: ['white'], c: ['Sauvignon blanc', 'Chardonnay'] },
  { k: 'cheverny', t: ['red'], c: ['Pinot noir', 'Gamay'] },
  { k: 'menetou salon', t: ['white'], c: ['Sauvignon blanc'] },
  { k: 'menetou salon', t: ['red'], c: ['Pinot noir'] },
  { k: 'quincy', t: ['white'], c: ['Sauvignon blanc'] },
  { k: 'reuilly', t: ['white'], c: ['Sauvignon blanc'] },
  { k: 'pouilly fume', t: ['white'], c: ['Sauvignon blanc'] },
  { k: 'sancerre', t: ['white'], c: ['Sauvignon blanc'] },
  { k: 'sancerre', t: ['red', 'rosé'], c: ['Pinot noir'] },
  { k: 'muscadet', t: ['white'], c: ['Melon de Bourgogne'] },
  { k: 'cremant de loire', t: null, c: ['Chenin blanc', 'Chardonnay', 'Cabernet franc'] },

  // ── Bordeaux ───────────────────────────────────────────────────────────
  { k: 'bordeaux superieur', t: ['red'], c: ['Merlot', 'Cabernet sauvignon', 'Cabernet franc'] },
  { k: 'bordeaux', t: ['red'], c: ['Merlot', 'Cabernet sauvignon', 'Cabernet franc'] },
  { k: 'bordeaux', t: ['white'], c: ['Sauvignon blanc', 'Sémillon'] },
  { k: 'entre deux mers', t: ['white'], c: ['Sauvignon blanc', 'Sémillon', 'Muscadelle'] },
  { k: 'haut medoc', t: ['red'], c: ['Cabernet sauvignon', 'Merlot'] },
  { k: 'medoc', t: ['red'], c: ['Cabernet sauvignon', 'Merlot'] },
  { k: 'moulis', t: ['red'], c: ['Cabernet sauvignon', 'Merlot'] },
  { k: 'listrac', t: ['red'], c: ['Cabernet sauvignon', 'Merlot'] },
  { k: 'graves', t: ['red'], c: ['Cabernet sauvignon', 'Merlot'] },
  { k: 'graves', t: ['white'], c: ['Sauvignon blanc', 'Sémillon'] },
  { k: 'cotes de bourg', t: ['red'], c: ['Merlot', 'Cabernet sauvignon'] },
  { k: 'blaye', t: ['red'], c: ['Merlot', 'Cabernet sauvignon'] },
  { k: 'castillon', t: ['red'], c: ['Merlot', 'Cabernet franc'] },
  { k: 'fronsac', t: ['red'], c: ['Merlot', 'Cabernet franc'] },
  { k: 'lalande de pomerol', t: ['red'], c: ['Merlot', 'Cabernet franc'] },
  { k: 'lussac saint emilion', t: ['red'], c: ['Merlot', 'Cabernet franc'] },
  { k: 'montagne saint emilion', t: ['red'], c: ['Merlot', 'Cabernet franc'] },
  { k: 'puisseguin saint emilion', t: ['red'], c: ['Merlot', 'Cabernet franc'] },
  { k: 'saint georges saint emilion', t: ['red'], c: ['Merlot', 'Cabernet franc'] },
  { k: 'barsac', t: ['sweet', 'white'], c: ['Sémillon', 'Sauvignon blanc'] },
  { k: 'loupiac', t: ['sweet', 'white'], c: ['Sémillon', 'Sauvignon blanc'] },
  { k: 'sainte croix du mont', t: ['sweet', 'white'], c: ['Sémillon', 'Sauvignon blanc'] },
  { k: 'cadillac', t: ['sweet', 'white'], c: ['Sémillon', 'Sauvignon blanc'] },

  // ── Bourgogne / Beaujolais (hors défauts région ci-dessous) ────────────
  { k: 'bourgogne aligote', t: ['white'], c: ['Aligoté'] },
  { k: 'saint bris', t: ['white'], c: ['Sauvignon blanc'] },
  { k: 'passetoutgrain', t: ['red'], c: ['Gamay', 'Pinot noir'] },
  { k: 'cremant de bourgogne', t: null, c: ['Chardonnay', 'Pinot noir'] },

  // ── Rhône ──────────────────────────────────────────────────────────────
  { k: 'cote rotie', t: ['red'], c: ['Syrah'] },
  { k: 'condrieu', t: ['white'], c: ['Viognier'] },
  { k: 'chateau grillet', t: ['white'], c: ['Viognier'] },
  { k: 'cornas', t: ['red'], c: ['Syrah'] },
  { k: 'saint joseph', t: ['red'], c: ['Syrah'] },
  { k: 'saint joseph', t: ['white'], c: ['Marsanne', 'Roussanne'] },
  { k: 'crozes hermitage', t: ['red'], c: ['Syrah'] },
  { k: 'crozes hermitage', t: ['white'], c: ['Marsanne', 'Roussanne'] },
  { k: 'hermitage', t: ['red'], c: ['Syrah'] },
  { k: 'hermitage', t: ['white'], c: ['Marsanne', 'Roussanne'] },
  { k: 'saint peray', t: ['white'], c: ['Marsanne', 'Roussanne'] },
  { k: 'chateauneuf du pape', t: ['red'], c: ['Grenache', 'Syrah', 'Mourvèdre'] },
  { k: 'gigondas', t: ['red'], c: ['Grenache', 'Syrah', 'Mourvèdre'] },
  { k: 'vacqueyras', t: ['red'], c: ['Grenache', 'Syrah', 'Mourvèdre'] },
  { k: 'rasteau', t: ['red'], c: ['Grenache', 'Syrah', 'Mourvèdre'] },
  { k: 'cairanne', t: ['red'], c: ['Grenache', 'Syrah', 'Mourvèdre'] },
  { k: 'lirac', t: ['red'], c: ['Grenache', 'Syrah', 'Mourvèdre'] },
  { k: 'tavel', t: ['rosé'], c: ['Grenache', 'Cinsault'] },
  { k: 'cotes du rhone', t: ['red'], c: ['Grenache', 'Syrah', 'Mourvèdre'] },
  { k: 'ventoux', t: ['red'], c: ['Grenache', 'Syrah'] },
  { k: 'luberon', t: ['red'], c: ['Grenache', 'Syrah'] },
  { k: 'costieres de nimes', t: ['red'], c: ['Grenache', 'Syrah'] },

  // ── Sud-Ouest ──────────────────────────────────────────────────────────
  { k: 'cahors', t: ['red'], c: ['Malbec'] },
  { k: 'madiran', t: ['red'], c: ['Tannat'] },
  { k: 'fronton', t: ['red', 'rosé'], c: ['Négrette'] },
  { k: 'gaillac', t: ['red'], c: ['Duras', 'Braucol', 'Syrah'] },
  { k: 'bergerac', t: ['red'], c: ['Merlot', 'Cabernet sauvignon', 'Cabernet franc'] },
  { k: 'bergerac', t: ['white'], c: ['Sauvignon blanc', 'Sémillon'] },
  { k: 'pecharmant', t: ['red'], c: ['Merlot', 'Cabernet sauvignon', 'Cabernet franc'] },
  { k: 'monbazillac', t: ['sweet', 'white'], c: ['Sémillon', 'Sauvignon blanc', 'Muscadelle'] },
  { k: 'jurancon', t: null, c: ['Gros Manseng', 'Petit Manseng'] },
  { k: 'irouleguy', t: ['red'], c: ['Tannat', 'Cabernet franc'] },
  { k: 'buzet', t: ['red'], c: ['Merlot', 'Cabernet sauvignon'] },
  { k: 'marcillac', t: ['red'], c: ['Fer Servadou'] },

  // ── Languedoc / Roussillon ─────────────────────────────────────────────
  { k: 'picpoul de pinet', t: ['white'], c: ['Piquepoul'] },
  { k: 'pic saint loup', t: ['red'], c: ['Syrah', 'Grenache'] },
  { k: 'faugeres', t: ['red'], c: ['Syrah', 'Grenache', 'Carignan', 'Mourvèdre'] },
  { k: 'saint chinian', t: ['red'], c: ['Syrah', 'Grenache', 'Carignan', 'Mourvèdre'] },
  { k: 'corbieres', t: ['red'], c: ['Carignan', 'Grenache', 'Syrah'] },
  { k: 'minervois', t: ['red'], c: ['Syrah', 'Grenache', 'Carignan'] },
  { k: 'fitou', t: ['red'], c: ['Carignan', 'Grenache'] },
  { k: 'cotes du roussillon', t: ['red'], c: ['Grenache', 'Syrah', 'Carignan'] },
  { k: 'maury', t: null, c: ['Grenache'] },
  { k: 'banyuls', t: null, c: ['Grenache'] },
  { k: 'limoux', t: ['white'], c: ['Chardonnay', 'Chenin blanc', 'Mauzac'] },
  { k: 'cremant de limoux', t: null, c: ['Chardonnay', 'Chenin blanc', 'Mauzac'] },

  // ── Provence / Corse ───────────────────────────────────────────────────
  { k: 'bandol', t: ['red'], c: ['Mourvèdre'] },
  { k: 'cotes de provence', t: ['rosé'], c: ['Grenache', 'Cinsault', 'Syrah'] },
  { k: 'coteaux d aix', t: null, c: ['Grenache', 'Syrah', 'Cinsault'] },
  { k: 'coteaux varois', t: null, c: ['Grenache', 'Syrah', 'Cinsault'] },
  { k: 'cassis', t: ['white'], c: ['Marsanne', 'Clairette'] },
  { k: 'patrimonio', t: ['red'], c: ['Nielluccio'] },
  { k: 'ajaccio', t: ['red'], c: ['Sciaccarello'] },
  { k: 'vin de corse', t: ['red'], c: ['Nielluccio', 'Sciaccarello', 'Grenache'] },

  // ── Jura / Savoie / Alsace (effervescents) ─────────────────────────────
  { k: 'vin jaune', t: null, c: ['Savagnin'] },
  { k: 'chateau chalon', t: null, c: ['Savagnin'] },
  { k: 'arbois', t: ['red'], c: ['Poulsard', 'Trousseau', 'Pinot noir'] },
  { k: 'arbois', t: ['white'], c: ['Chardonnay', 'Savagnin'] },
  { k: 'cotes du jura', t: ['white'], c: ['Chardonnay', 'Savagnin'] },
  { k: 'apremont', t: ['white'], c: ['Jacquère'] },
  { k: 'abymes', t: ['white'], c: ['Jacquère'] },
  { k: 'chignin bergeron', t: ['white'], c: ['Roussanne'] },
  { k: 'cremant d alsace', t: null, c: ['Pinot blanc'] },
  { k: 'cremant du jura', t: null, c: ['Chardonnay'] },
]

// Régions entières où la règle est quasi universelle.
const REGION_DEFAULTS = {
  bourgogne: { red: ['Pinot noir'], white: ['Chardonnay'] },
  beaujolais: { red: ['Gamay'], white: ['Chardonnay'] },
  champagne: { any: ['Chardonnay', 'Pinot noir', 'Meunier'] },
}

const norm = s => String(s || '')
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, ' ')
  .trim()

// Trié une fois : clés les plus spécifiques (longues) d'abord.
const SORTED = [...TABLE].sort((a, b) => b.k.length - a.k.length)

// Cépages officiels d'une appellation lue sur étiquette, ou null si on ne
// peut pas trancher avec certitude (appellation inconnue, couleur ambiguë).
export function cepagesOfficiels(appellation, type, region) {
  const napp = norm(appellation)
  if (napp) {
    const hits = SORTED.filter(e => napp.includes(e.k))
    if (hits.length) {
      const topLen = hits[0].k.length
      const top = hits.filter(e => e.k.length === topLen)
      if (type) {
        const m = top.find(e => !e.t || e.t.includes(type))
        if (m) return m.c
        return null // couleur lue incompatible avec nos entrées : on ne force pas
      }
      if (top.length === 1) return top[0].c
      return null // plusieurs couleurs possibles, couleur non lue : prudence
    }
  }
  const rd = REGION_DEFAULTS[norm(region)]
  if (rd) {
    if (rd.any) return rd.any
    if (type && rd[type]) return rd[type]
  }
  return null
}

export default cepagesOfficiels
