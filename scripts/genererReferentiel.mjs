// Génère data/referentielFrance.js depuis la base markdown fournie.
//   node scripts/genererReferentiel.mjs <chemin-du-md>
//
// Le markdown source est en texte non accentué (contrainte de la source). Œno
// étant une app française soignée, on ré-accentue via un dictionnaire explicite
// de termes viticoles : chaque entrée est vérifiable, aucune heuristique.

import { readFileSync, writeFileSync } from 'fs'

const src = process.argv[2]
if (!src) { console.error('usage: node scripts/genererReferentiel.mjs <md>'); process.exit(1) }
const md = readFileSync(src, 'utf8')

// ── Ré-accentuation : dictionnaire mot-à-mot, appliqué sur les mots entiers ──
const ACCENTS = {
  Chateau: 'Château', chateau: 'château', Chateaux: 'Châteaux',
  Cotes: 'Côtes', cotes: 'côtes', Cote: 'Côte', cote: 'côte',
  Medoc: 'Médoc', Rhone: 'Rhône', Vallee: 'Vallée', vallee: 'vallée',
  Cepage: 'Cépage', cepage: 'cépage', Cepages: 'Cépages', cepages: 'cépages',
  Aromes: 'Arômes', aromes: 'arômes', arome: 'arôme',
  Millesime: 'Millésime', millesime: 'millésime', Millesimes: 'Millésimes', millesimes: 'millésimes',
  Regionale: 'Régionale', regionale: 'régionale', Region: 'Région', region: 'région',
  Regions: 'Régions', regions: 'régions',
  Cremant: 'Crémant', cremant: 'crémant',
  Peray: 'Péray', Perignon: 'Pérignon',
  Sartene: 'Sartène', Cerons: 'Cérons', Bearn: 'Béarn',
  Jurancon: 'Jurançon', Pecharmant: 'Pécharmant', Saussignac: 'Saussignac',
  Leognan: 'Léognan', Segur: 'Ségur', Estephe: 'Estèphe', Bregon: 'Brégon',
  Beze: 'Bèze', Echezeaux: 'Échezeaux', Genevrieres: 'Genevrières',
  Chevaliere: 'Chevalière', Latricieres: 'Latricières', Griotte: 'Griotte',
  Charmes: 'Charmes', Mazoyeres: 'Mazoyères', Ruchottes: 'Ruchottes',
  Romanee: 'Romanée', Tache: 'Tâche', Vosne: 'Vosne', Nuits: 'Nuits',
  Pernand: 'Pernand', Vergelesses: 'Vergelesses', Aloxe: 'Aloxe',
  Montelie: 'Monthélie', Monthelie: 'Monthélie', Meursault: 'Meursault',
  Puligny: 'Puligny', Chassagne: 'Chassagne', Batard: 'Bâtard',
  Criots: 'Criots', Bienvenues: 'Bienvenues', Maranges: 'Maranges',
  Cheilly: 'Cheilly', Dezize: 'Dezize', Sampigny: 'Sampigny',
  Auxey: 'Auxey', Duresses: 'Duresses', Saint: 'Saint', Sainte: 'Sainte',
  Beaujolais: 'Beaujolais', Regnie: 'Régnié', Julienas: 'Juliénas',
  Chenas: 'Chénas', Brouilly: 'Brouilly', Fleurie: 'Fleurie',
  Nimes: 'Nîmes', Costieres: 'Costières', Ventoux: 'Ventoux',
  Rasteau: 'Rasteau', Seguret: 'Séguret', Valreas: 'Valréas',
  Beaumes: 'Beaumes', Gigondas: 'Gigondas', Vacqueyras: 'Vacqueyras',
  Cairanne: 'Cairanne', Vinsobres: 'Vinsobres', Tricastin: 'Tricastin',
  Adhemar: 'Adhémar', Grignan: 'Grignan', Diois: 'Diois',
  Chatillon: 'Châtillon', Hermitage: 'Hermitage', Rotie: 'Rôtie',
  Condrieu: 'Condrieu', Cornas: 'Cornas', Grillet: 'Grillet',
  Menetou: 'Menetou', Reuilly: 'Reuilly', Quincy: 'Quincy',
  Sancerre: 'Sancerre', Fume: 'Fumé', Bourgueil: 'Bourgueil',
  Jasnieres: 'Jasnières', Vendomois: 'Vendômois', Cheverny: 'Cheverny',
  Valencay: 'Valençay', Montlouis: 'Montlouis', Vouvray: 'Vouvray',
  Savennieres: 'Savennières', Bonnezeaux: 'Bonnezeaux', Aubance: 'Aubance',
  Layon: 'Layon', Chaume: 'Chaume', Faye: 'Faye', Rablay: 'Rablay',
  Luigne: 'Luigné', Lattay: 'Lattay', Brissac: 'Brissac',
  Muscadet: 'Muscadet', Sevre: 'Sèvre', Grandlieu: 'Grandlieu',
  Ancenis: 'Ancenis', Vendeens: 'Vendéens', Thouarsais: 'Thouarsais',
  Orleans: 'Orléans', Clery: 'Cléry', Chateaumeillant: 'Châteaumeillant',
  Roannaise: 'Roannaise', Forez: 'Forez', Auvergne: 'Auvergne',
  Boudes: 'Boudes', Chanturgue: 'Chanturgue', Chateaugay: 'Châteaugay',
  Corent: 'Corent', Madargues: 'Madargues', Pourcain: 'Pourçain',
  Irouleguy: 'Irouléguy', Madiran: 'Madiran', Pacherenc: 'Pacherenc',
  Bilh: 'Bilh', Marcillac: 'Marcillac', Gaillac: 'Gaillac',
  Fronton: 'Fronton', Frontonnais: 'Frontonnais', Cahors: 'Cahors',
  Bergerac: 'Bergerac', Monbazillac: 'Monbazillac', Montravel: 'Montravel',
  Rosette: 'Rosette', Duras: 'Duras', Buzet: 'Buzet', Marmandais: 'Marmandais',
  Brulhois: 'Brulhois', Lavilledieu: 'Lavilledieu', Quercy: 'Quercy',
  Millau: 'Millau', Entraygues: 'Entraygues', Estaing: 'Estaing',
  Tursan: 'Tursan', Sardos: 'Sardos', Correze: 'Corrèze',
  Banyuls: 'Banyuls', Collioure: 'Collioure', Maury: 'Maury',
  Rivesaltes: 'Rivesaltes', Roussillon: 'Roussillon', Aspres: 'Aspres',
  Corbieres: 'Corbières', Boutenac: 'Boutenac', Fitou: 'Fitou',
  Faugeres: 'Faugères', Minervois: 'Minervois', Liviniere: 'Livinière',
  Chinian: 'Chinian', Berlou: 'Berlou', Roquebrun: 'Roquebrun',
  Cabardes: 'Cabardès', Malepere: 'Malepère', Limoux: 'Limoux',
  Clairette: 'Clairette', Bellegarde: 'Bellegarde', Picpoul: 'Picpoul',
  Larzac: 'Larzac', Bandol: 'Bandol', Cassis: 'Cassis', Bellet: 'Bellet',
  Palette: 'Palette', Pierrevert: 'Pierrevert', Varois: 'Varois',
  Frejus: 'Fréjus', Londe: 'Londe', Victoire: 'Victoire',
  Patrimonio: 'Patrimonio', Figari: 'Figari', Calvi: 'Calvi',
  Ajaccio: 'Ajaccio', Arbois: 'Arbois', Pupillin: 'Pupillin',
  Chalon: 'Chalon', Etoile: 'Étoile', Macvin: 'Macvin', Jura: 'Jura',
  Seyssel: 'Seyssel', Crepy: 'Crépy', Bugey: 'Bugey', Savoie: 'Savoie',
  Moselle: 'Moselle', Toul: 'Toul', Charentes: 'Charentes',
  Bourgogne: 'Bourgogne', Aligote: 'Aligoté', Bouzeron: 'Bouzeron',
  Auxerre: 'Auxerre', Auxerrois: 'Auxerrois', Irancy: 'Irancy',
  Vezelay: 'Vézelay', Tonnerre: 'Tonnerre', Passetoutgrain: 'Passetoutgrain',
  Maconnais: 'Mâconnais', Macon: 'Mâcon', Fuisse: 'Fuissé',
  Vinzelles: 'Vinzelles', Loche: 'Loché', Veran: 'Véran', Clesse: 'Clessé',
  Vire: 'Viré', Chalonnaise: 'Chalonnaise', Mercurey: 'Mercurey',
  Givry: 'Givry', Rully: 'Rully', Montagny: 'Montagny',
  Chablisien: 'Chablisien', Chablis: 'Chablis', Bris: 'Bris',
  Petillant: 'Pétillant', petillant: 'pétillant',
  Rose: 'Rosé', rose: 'rosé', Roses: 'Rosés',
  Liquoreux: 'Liquoreux', liquoreux: 'liquoreux',
  Moelleux: 'Moelleux', moelleux: 'moelleux',
  Eleve: 'Élevé', eleve: 'élevé', Elevee: 'Élevée', elevee: 'élevée',
  Tres: 'Très', tres: 'très', Moyenne: 'Moyenne', Corse: 'Corsé',
  Legere: 'Légère', legere: 'légère', Leger: 'Léger', leger: 'léger',
  Faible: 'Faible', Charnu: 'Charnu', Ample: 'Ample',
  Acidite: 'Acidité', acidite: 'acidité',
  Epices: 'Épices', epices: 'épices', epice: 'épice', Epice: 'Épicé', epicee: 'épicée',
  Reglisse: 'Réglisse', reglisse: 'réglisse',
  Cedre: 'Cèdre', cedre: 'cèdre', Truffe: 'Truffe',
  Peche: 'Pêche', peche: 'pêche', Peches: 'Pêches',
  Grille: 'Grillé', grille: 'grillé', grillees: 'grillées', grilles: 'grillés',
  Roti: 'Rôti', roti: 'rôti', rotie: 'rôtie', roties: 'rôties',
  Fume: 'Fumé', fume: 'fumé', fumee: 'fumée',
  Affines: 'Affinés', affines: 'affinés', affine: 'affiné',
  Chevre: 'Chèvre', chevre: 'chèvre',
  Boeuf: 'Bœuf', boeuf: 'bœuf', Oeuf: 'Œuf',
  Volaille: 'Volaille', volaille: 'volaille',
  Poivre: 'Poivre', Violette: 'Violette', Framboise: 'Framboise',
  Cerise: 'Cerise', Prune: 'Prune', Mure: 'Mûre', mure: 'mûre',
  Agrumes: 'Agrumes', Citron: 'Citron', Pamplemousse: 'Pamplemousse',
  Mineral: 'Minéral', mineral: 'minéral', Minerale: 'Minérale', minerale: 'minérale',
  Miel: 'Miel', Brioche: 'Brioche', Noisette: 'Noisette', Amande: 'Amande',
  Abricot: 'Abricot', Litchi: 'Litchi', Rose_: 'Rose',
  Graves: 'Graves', Argilo: 'Argilo', Calcaire: 'Calcaire',
  Schistes: 'Schistes', Granite: 'Granite', Galets: 'Galets',
  Sableuses: 'Sableuses', Argile: 'Argile', Marnes: 'Marnes',
  Siliceux: 'Siliceux', Volcanique: 'Volcanique',
  Superieur: 'Supérieur', superieur: 'supérieur', Superieures: 'Supérieures',
  Premier: 'Premier', Premiers: 'Premiers', Premieres: 'Premières',
  Classe: 'Classé', classe: 'classé', Classes: 'Classés', classes: 'classés',
  Classement: 'Classement', classement: 'classement',
  Proprietes: 'Propriétés', proprietes: 'propriétés',
  Communale: 'Communale', Hierarchie: 'Hiérarchie',
  Denomination: 'Dénomination', denomination: 'dénomination',
  Geographique: 'Géographique', geographique: 'géographique',
  Meridionale: 'Méridionale', meridionale: 'méridionale',
  Septentrionale: 'Septentrionale', septentrionale: 'septentrionale',
  Ete: 'Été', Apogee: 'Apogée', apogee: 'apogée',
  Recolte: 'Récolte', recolte: 'récolte',
  Maturite: 'Maturité', maturite: 'maturité',
  Fraicheur: 'Fraîcheur', fraicheur: 'fraîcheur',
  Homogene: 'Homogène', homogene: 'homogène',
  Exuberante: 'Exubérante', exuberante: 'exubérante',
  Concentre: 'Concentré', concentre: 'concentré', concentration: 'concentration',
  Austere: 'Austère', austere: 'austère',
  Elegant: 'Élégant', elegant: 'élégant', elegante: 'élégante',
  Reference: 'Référence', reference: 'référence',
  Etiquettes: 'Étiquettes', etiquettes: 'étiquettes',
  Systeme: 'Système', systeme: 'système',
  Numero: 'Numéro', Annee: 'Année', annee: 'année',
  Departement: 'Département', departement: 'département',
  Precision: 'Précision', Sous: 'Sous',
  Vin: 'Vin', Vins: 'Vins', Pays: 'Pays', Ile: 'Île', ile: 'île',
  Cotiere: 'Côtière', Vermeille: 'Vermeille',
  Ardeche: 'Ardèche', Drome: 'Drôme', Herault: 'Hérault',
  Aude: 'Aude', Gard: 'Gard', Var: 'Var', Isere: 'Isère',
  Loire: 'Loire', Cher: 'Cher', Indre: 'Indre', Vienne: 'Vienne',
  Charente: 'Charente', Dordogne: 'Dordogne', Gironde: 'Gironde',
  Landes: 'Landes', Gers: 'Gers', Tarn: 'Tarn', Lot: 'Lot',
  Aveyron: 'Aveyron', Correze_: 'Corrèze', Creuse: 'Creuse',
  Puy: 'Puy', Dome: 'Dôme', Allier: 'Allier', Nievre: 'Nièvre',
  Yonne: 'Yonne', Aube: 'Aube', Marne: 'Marne', Meuse: 'Meuse',
  Vosges: 'Vosges', Rhin: 'Rhin', Haut: 'Haut', Bas: 'Bas',
  Ain: 'Ain', Jura_: 'Jura', Doubs: 'Doubs', Saone: 'Saône',
  Ardennes: 'Ardennes', Pyrenees: 'Pyrénées', Atlantiques: 'Atlantiques',
  Orientales: 'Orientales', Mediterranee: 'Méditerranée',
  Alpes: 'Alpes', Maritimes: 'Maritimes', Provence: 'Provence',
  Bouches: 'Bouches', Vaucluse: 'Vaucluse', Garonne: 'Garonne',
  Sud: 'Sud', Ouest: 'Ouest', Est: 'Est', Nord: 'Nord',
  Alsace: 'Alsace', Champagne: 'Champagne', Bordeaux: 'Bordeaux',
  Libournais: 'Libournais', Sauternais: 'Sauternais', Blaye: 'Blaye',
  Bourg: 'Bourg', Fronsac: 'Fronsac', Pomerol: 'Pomerol',
  Emilion: 'Émilion', Lussac: 'Lussac', Puisseguin: 'Puisseguin',
  Montagne: 'Montagne', Georges: 'Georges', Lalande: 'Lalande',
  Listrac: 'Listrac', Moulis: 'Moulis', Margaux: 'Margaux',
  Pauillac: 'Pauillac', Julien: 'Julien', Barsac: 'Barsac',
  Sauternes: 'Sauternes', Loupiac: 'Loupiac', Cadillac: 'Cadillac',
  Croix: 'Croix', Mont: 'Mont', Foy: 'Foy', Macaire: 'Macaire',
  Vayres: 'Vayres', Benauge: 'Benauge', Mers: 'Mers', Francs: 'Francs',
  Castillon: 'Castillon', Canon: 'Canon',
}

const reaccentuer = (s) => {
  if (!s) return s
  // Remplacement sur les mots entiers uniquement (lettres/chiffres/’)
  return s.replace(/[A-Za-zÀ-ÿ]+/g, (mot) => ACCENTS[mot] ?? mot)
}

// ── Lecture d'une table markdown par son titre ───────────────────────────────
function table(titre) {
  const lignes = md.split('\n')
  const i = lignes.findIndex(l => l.trim() === `## ${titre}`)
  if (i === -1) throw new Error(`table introuvable : ${titre}`)
  const out = []
  for (let j = i + 1; j < lignes.length; j++) {
    const l = lignes[j]
    if (l.startsWith('## ')) break
    if (!l.trim().startsWith('|')) continue
    if (/^\|\s*-+/.test(l.trim())) continue           // séparateur
    const cells = l.split('|').slice(1, -1).map(c => c.trim())
    if (!cells.length) continue
    if (/^ID$/i.test(cells[0])) continue               // en-tête
    out.push(cells)
  }
  return out
}

const liste = (s) => !s ? [] : s.split(/\s*[,/]\s*/).map(x => x.trim()).filter(Boolean)
const nz = (s) => (s && s !== '-' ? s : null)

// ── Construction des tables ──────────────────────────────────────────────────
const appellations = [
  ...table('Appellations FR (toutes)').map(([id, nom, region, sous]) => ({
    id, nom: reaccentuer(nom), region: reaccentuer(region),
    sousRegion: reaccentuer(nz(sous)), type: 'AOC',
  })),
  ...table('IGP - Vins de Pays').map(([id, nom, region, dep]) => ({
    id, nom: reaccentuer(nom), region: reaccentuer(region),
    sousRegion: reaccentuer(nz(dep)), type: 'IGP',
  })),
]

const details = table('Appellations detaillees').map(
  ([id, nom, region, sous, couleurs, cepages, sol, garde, hierarchie]) => ({
    id, nom: reaccentuer(nom), region: reaccentuer(region), sousRegion: reaccentuer(nz(sous)),
    couleurs: liste(couleurs).map(reaccentuer),
    cepages: liste(cepages).map(reaccentuer),
    sol: reaccentuer(nz(sol)), garde: nz(garde), hierarchie: reaccentuer(nz(hierarchie)),
  })
)

const cepages = table('Cepages').map(
  ([id, nom, couleur, origine, apps, syn, aromes, tanins, acidite, corps, garde, temp, accords]) => ({
    id, nom: reaccentuer(nom), couleur: reaccentuer(couleur), origine: reaccentuer(origine),
    appellations: liste(apps).map(reaccentuer),
    synonymes: liste(syn).map(reaccentuer),
    aromes: liste(aromes).map(reaccentuer),
    tanins: reaccentuer(nz(tanins)), acidite: reaccentuer(nz(acidite)), corps: reaccentuer(nz(corps)),
    // « 16-18C » dans la source → « 16-18 °C »
    garde: nz(garde), tempService: nz(temp)?.replace(/\s*C$/, ' °C'),
    accords: liste(accords).map(reaccentuer),
  })
)

const domaines = table('Domaines').map(
  ([id, nom, region, appellation, cuvees, style, statut, note]) => ({
    id, nom: reaccentuer(nom), region: reaccentuer(region), appellation: reaccentuer(appellation),
    cuvees: liste(cuvees).map(reaccentuer),
    style: reaccentuer(nz(style)), statut: reaccentuer(nz(statut)), note: reaccentuer(nz(note)),
  })
)

const millesimes = table('Millesimes').map(
  ([id, annee, region, note, style, apogee, commentaire]) => ({
    id, annee: Number(annee), region: reaccentuer(region), note: Number(note),
    style: reaccentuer(nz(style)), apogee: nz(apogee), commentaire: reaccentuer(nz(commentaire)),
  })
)

const classements = table('Classements Bordeaux').map(
  ([id, classement, rang, chateau, appellation]) => ({
    id, classement: reaccentuer(classement), rang: reaccentuer(nz(rang)),
    chateau: reaccentuer(chateau), appellation: reaccentuer(appellation),
  })
)

const crus = [
  ...table('Grands Crus Alsace').map(([id, nom, commune, dep, sol]) => ({
    id, nom: reaccentuer(nom), type: 'alsace_gc', commune: reaccentuer(commune),
    zone: reaccentuer(nz(dep)), sol: reaccentuer(nz(sol)), cepage: null,
  })),
  ...table('Grands Crus Bourgogne').map(([id, nom, zone, commune, couleur, cepage, note]) => ({
    id, nom: reaccentuer(nom), type: 'bourgogne_gc', commune: reaccentuer(commune),
    zone: reaccentuer(nz(zone)), sol: null, cepage: reaccentuer(nz(cepage)),
    couleur: reaccentuer(nz(couleur)), note: reaccentuer(nz(note)),
  })),
  ...table('Crus Champagne').map(([id, nom, niveau, zone, cepage]) => ({
    id, nom: reaccentuer(nom), type: 'champagne', commune: reaccentuer(nom),
    zone: reaccentuer(nz(zone)), sol: null, cepage: reaccentuer(nz(cepage)),
    niveau: reaccentuer(nz(niveau)),
  })),
]

const reperes = table('Reperes').map(([id, region, sujet, donnee, source]) => ({
  id, region: reaccentuer(region), sujet: reaccentuer(sujet),
  donnee: reaccentuer(donnee), source: nz(source),
}))

// ── Écriture du module ───────────────────────────────────────────────────────
const j = (v) => JSON.stringify(v, null, 0)
const bloc = (nom, arr, commentaire) =>
  `// ${commentaire}\nexport const ${nom} = ${JSON.stringify(arr, null, 1)}\n`

const sortie = `// ═══════════════════════════════════════════════════════════════════════════
// referentielFrance — base viticole nationale d'Œno.
//
// FICHIER GÉNÉRÉ — ne pas éditer à la main.
// Source : base markdown « Base viticole France - Oeno » (v3, 25/07/2026).
// Régénérer : node scripts/genererReferentiel.mjs <chemin-du-md>
//
// Ce référentiel complète WINE_DB (vins entièrement modélisés : goût, prix,
// accords). Ici, on couvre TOUTE la France de façon factuelle : chaque
// appellation, cépage, domaine, cru et classement, sans inventer de notes de
// dégustation là où la source n'en donne pas.
// ═══════════════════════════════════════════════════════════════════════════

${bloc('APPELLATIONS_FR', appellations, `${appellations.length} appellations : AOC/AOP et IGP, toutes régions.`)}
${bloc('APPELLATIONS_DETAIL', details, `${details.length} appellations détaillées : cépages, sol, garde, hiérarchie.`)}
${bloc('CEPAGES_FR', cepages, `${cepages.length} cépages : arômes, structure, garde, température, accords.`)}
${bloc('DOMAINES_FR', domaines, `${domaines.length} domaines de référence : cuvées, style, statut.`)}
${bloc('MILLESIMES_FR', millesimes, `${millesimes.length} millésimes notés par région, avec apogée.`)}
${bloc('CLASSEMENTS_BORDEAUX', classements, `${classements.length} crus classés : 1855, Graves, Saint-Émilion 2022.`)}
${bloc('CRUS_FR', crus, `${crus.length} crus : Grands Crus d'Alsace et de Bourgogne, échelle Champagne.`)}
${bloc('REPERES_FR', reperes, `${reperes.length} repères chiffrés (INAO, interprofessions).`)}
`

writeFileSync('data/referentielFrance.js', sortie)
console.log(`appellations   ${appellations.length}
détails        ${details.length}
cépages        ${cepages.length}
domaines       ${domaines.length}
millésimes     ${millesimes.length}
classements    ${classements.length}
crus           ${crus.length}
repères        ${reperes.length}
TOTAL          ${appellations.length + details.length + cepages.length + domaines.length + millesimes.length + classements.length + crus.length + reperes.length}`)
