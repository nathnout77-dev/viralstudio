// ═══════════════════════════════════════════════════════════════════════════
// referentielFrance — base viticole nationale d'Œno.
//
// FICHIER GÉNÉRÉ — ne pas éditer à la main.
// Source : classeur « Base viticole France - Oeno ».
// Régénérer : python3 scripts/generer_referentiel.py <chemin-du-xlsx>
//
// PROFILS_GOUT donne à CHAQUE appellation ses jauges, ses arômes, ses accords
// et sa fourchette de prix : c'est ce qui permet de la recommander, et pas
// seulement de la documenter.
// ═══════════════════════════════════════════════════════════════════════════

// 580 appellations : AOC/AOP et IGP, toutes régions.
export const APPELLATIONS_FR = [
 {
  "id": "APP001",
  "nom": "Ajaccio",
  "region": "Corse",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP002",
  "nom": "Aloxe-Corton",
  "region": "Bourgogne",
  "sousRegion": "Côte de Beaune",
  "type": "AOC"
 },
 {
  "id": "APP003",
  "nom": "Alsace (ou Vins d'Alsace)",
  "region": "Alsace",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP004",
  "nom": "Alsace Klevener de Heiligenstein",
  "region": "Alsace",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP005",
  "nom": "Alsace Edelzwicker",
  "region": "Alsace",
  "sousRegion": "assemblage",
  "type": "AOC"
 },
 {
  "id": "APP006",
  "nom": "Alsace Gentil",
  "region": "Alsace",
  "sousRegion": "assemblage",
  "type": "AOC"
 },
 {
  "id": "APP007",
  "nom": "Alsace Chasselas",
  "region": "Alsace",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP008",
  "nom": "Alsace Gewurztraminer",
  "region": "Alsace",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP009",
  "nom": "Alsace Muscat",
  "region": "Alsace",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP010",
  "nom": "Alsace Pinot / Pinot Blanc / Klevner",
  "region": "Alsace",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP011",
  "nom": "Alsace Pinot Gris",
  "region": "Alsace",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP012",
  "nom": "Alsace Pinot Noir",
  "region": "Alsace",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP013",
  "nom": "Alsace Riesling",
  "region": "Alsace",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP014",
  "nom": "Alsace Sylvaner",
  "region": "Alsace",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP015",
  "nom": "Alsace Grand Cru",
  "region": "Alsace",
  "sousRegion": "51 lieux-dits classés",
  "type": "AOC"
 },
 {
  "id": "APP016",
  "nom": "Anjou (ou Anjou Val de Loire)",
  "region": "Vallée de la Loire",
  "sousRegion": "Anjou",
  "type": "AOC"
 },
 {
  "id": "APP017",
  "nom": "Anjou-Coteaux de la Loire",
  "region": "Vallée de la Loire",
  "sousRegion": "Anjou",
  "type": "AOC"
 },
 {
  "id": "APP018",
  "nom": "Anjou Gamay",
  "region": "Vallée de la Loire",
  "sousRegion": "Anjou",
  "type": "AOC"
 },
 {
  "id": "APP019",
  "nom": "Anjou Mousseux",
  "region": "Vallée de la Loire",
  "sousRegion": "Anjou",
  "type": "AOC"
 },
 {
  "id": "APP020",
  "nom": "Anjou-Villages",
  "region": "Vallée de la Loire",
  "sousRegion": "Anjou",
  "type": "AOC"
 },
 {
  "id": "APP021",
  "nom": "Anjou-Villages-Brissac",
  "region": "Vallée de la Loire",
  "sousRegion": "Anjou",
  "type": "AOC"
 },
 {
  "id": "APP022",
  "nom": "Arbois",
  "region": "Jura",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP023",
  "nom": "Arbois Pupillin",
  "region": "Jura",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP024",
  "nom": "Arbois Mousseux",
  "region": "Jura",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP025",
  "nom": "Auxey-Duresses",
  "region": "Bourgogne",
  "sousRegion": "Côte de Beaune",
  "type": "AOC"
 },
 {
  "id": "APP026",
  "nom": "Bandol",
  "region": "Provence",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP027",
  "nom": "Banyuls",
  "region": "Roussillon",
  "sousRegion": "VDN",
  "type": "AOC"
 },
 {
  "id": "APP028",
  "nom": "Banyuls Grand Cru",
  "region": "Roussillon",
  "sousRegion": "VDN",
  "type": "AOC"
 },
 {
  "id": "APP029",
  "nom": "Barsac",
  "region": "Bordeaux",
  "sousRegion": "Sauternais",
  "type": "AOC"
 },
 {
  "id": "APP030",
  "nom": "Bâtard-Montrachet",
  "region": "Bourgogne",
  "sousRegion": "Côte de Beaune - Grand Cru",
  "type": "AOC"
 },
 {
  "id": "APP031",
  "nom": "Béarn",
  "region": "Sud-Ouest",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP032",
  "nom": "Beaujolais",
  "region": "Beaujolais",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP033",
  "nom": "Beaujolais-Villages",
  "region": "Beaujolais",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP034",
  "nom": "Beaumes de Venise",
  "region": "Vallée du Rhône",
  "sousRegion": "depuis 2005",
  "type": "AOC"
 },
 {
  "id": "APP035",
  "nom": "Beaune",
  "region": "Bourgogne",
  "sousRegion": "Côte de Beaune",
  "type": "AOC"
 },
 {
  "id": "APP036",
  "nom": "Bellet (ou Vins de Bellet)",
  "region": "Provence",
  "sousRegion": "Nice",
  "type": "AOC"
 },
 {
  "id": "APP037",
  "nom": "Bergerac",
  "region": "Sud-Ouest",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP038",
  "nom": "Bergerac Sec",
  "region": "Sud-Ouest",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP039",
  "nom": "Bergerac Rosé",
  "region": "Sud-Ouest",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP040",
  "nom": "Bienvenues-Bâtard-Montrachet",
  "region": "Bourgogne",
  "sousRegion": "Côte de Beaune - Grand Cru",
  "type": "AOC"
 },
 {
  "id": "APP041",
  "nom": "Blagny",
  "region": "Bourgogne",
  "sousRegion": "Côte de Beaune",
  "type": "AOC"
 },
 {
  "id": "APP042",
  "nom": "Blanquette de Limoux",
  "region": "Languedoc",
  "sousRegion": "effervescent",
  "type": "AOC"
 },
 {
  "id": "APP043",
  "nom": "Blanquette de Limoux methode ancestrale",
  "region": "Languedoc",
  "sousRegion": "effervescent",
  "type": "AOC"
 },
 {
  "id": "APP044",
  "nom": "Blaye",
  "region": "Bordeaux",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP045",
  "nom": "Blaye Côtes de Bordeaux",
  "region": "Bordeaux",
  "sousRegion": "ex-Premières Côtes de Blaye",
  "type": "AOC"
 },
 {
  "id": "APP046",
  "nom": "Bonnes-Mares",
  "region": "Bourgogne",
  "sousRegion": "Côte de Nuits - Grand Cru",
  "type": "AOC"
 },
 {
  "id": "APP047",
  "nom": "Bonnezeaux",
  "region": "Vallée de la Loire",
  "sousRegion": "Anjou - liquoreux",
  "type": "AOC"
 },
 {
  "id": "APP048",
  "nom": "Bordeaux",
  "region": "Bordeaux",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP049",
  "nom": "Bordeaux Clairet",
  "region": "Bordeaux",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP050",
  "nom": "Bordeaux Côtes de Francs",
  "region": "Bordeaux",
  "sousRegion": "Francs Côtes de Bordeaux depuis 2009",
  "type": "AOC"
 },
 {
  "id": "APP051",
  "nom": "Bordeaux Rosé",
  "region": "Bordeaux",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP052",
  "nom": "Bordeaux Sec",
  "region": "Bordeaux",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP053",
  "nom": "Bordeaux Supérieur",
  "region": "Bordeaux",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP054",
  "nom": "Bourgogne",
  "region": "Bourgogne",
  "sousRegion": "régionale",
  "type": "AOC"
 },
 {
  "id": "APP055",
  "nom": "Bourgogne Aligoté",
  "region": "Bourgogne",
  "sousRegion": "régionale",
  "type": "AOC"
 },
 {
  "id": "APP056",
  "nom": "Bourgogne Aligoté Bouzeron",
  "region": "Bourgogne",
  "sousRegion": "Côte Chalonnaise",
  "type": "AOC"
 },
 {
  "id": "APP057",
  "nom": "Bourgogne Côte Chalonnaise",
  "region": "Bourgogne",
  "sousRegion": "Côte Chalonnaise",
  "type": "AOC"
 },
 {
  "id": "APP058",
  "nom": "Bourgogne Côte d'Auxerre",
  "region": "Bourgogne",
  "sousRegion": "Auxerrois",
  "type": "AOC"
 },
 {
  "id": "APP059",
  "nom": "Bourgogne Grand Ordinaire",
  "region": "Bourgogne",
  "sousRegion": "régionale",
  "type": "AOC"
 },
 {
  "id": "APP060",
  "nom": "Bourgogne Hautes-Côtes de Beaune",
  "region": "Bourgogne",
  "sousRegion": "régionale",
  "type": "AOC"
 },
 {
  "id": "APP061",
  "nom": "Bourgogne Hautes-Côtes de Nuits",
  "region": "Bourgogne",
  "sousRegion": "régionale",
  "type": "AOC"
 },
 {
  "id": "APP062",
  "nom": "Bourgogne Mousseux",
  "region": "Bourgogne",
  "sousRegion": "effervescent",
  "type": "AOC"
 },
 {
  "id": "APP063",
  "nom": "Bourgogne Ordinaire",
  "region": "Bourgogne",
  "sousRegion": "régionale",
  "type": "AOC"
 },
 {
  "id": "APP064",
  "nom": "Bourgogne Passetoutgrain",
  "region": "Bourgogne",
  "sousRegion": "régionale",
  "type": "AOC"
 },
 {
  "id": "APP065",
  "nom": "Bourgogne Rosé / Clairet",
  "region": "Bourgogne",
  "sousRegion": "régionale",
  "type": "AOC"
 },
 {
  "id": "APP066",
  "nom": "Bourgogne Tonnerre",
  "region": "Bourgogne",
  "sousRegion": "depuis 2006",
  "type": "AOC"
 },
 {
  "id": "APP067",
  "nom": "Bourgogne Vézelay",
  "region": "Bourgogne",
  "sousRegion": "Yonne",
  "type": "AOC"
 },
 {
  "id": "APP068",
  "nom": "Bourgueil",
  "region": "Vallée de la Loire",
  "sousRegion": "Touraine",
  "type": "AOC"
 },
 {
  "id": "APP069",
  "nom": "Bouzeron",
  "region": "Bourgogne",
  "sousRegion": "Côte Chalonnaise",
  "type": "AOC"
 },
 {
  "id": "APP070",
  "nom": "Brouilly",
  "region": "Beaujolais",
  "sousRegion": "Cru",
  "type": "AOC"
 },
 {
  "id": "APP071",
  "nom": "Bugey",
  "region": "Savoie",
  "sousRegion": "AOC depuis 2009",
  "type": "AOC"
 },
 {
  "id": "APP072",
  "nom": "Buzet",
  "region": "Sud-Ouest",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP073",
  "nom": "Cabardès",
  "region": "Languedoc",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP074",
  "nom": "Cabernet d'Anjou",
  "region": "Vallée de la Loire",
  "sousRegion": "Anjou - rosé",
  "type": "AOC"
 },
 {
  "id": "APP075",
  "nom": "Cabernet de Saumur",
  "region": "Vallée de la Loire",
  "sousRegion": "Saumur - rosé",
  "type": "AOC"
 },
 {
  "id": "APP076",
  "nom": "Cadillac",
  "region": "Bordeaux",
  "sousRegion": "liquoreux",
  "type": "AOC"
 },
 {
  "id": "APP077",
  "nom": "Cadillac Côtes de Bordeaux",
  "region": "Bordeaux",
  "sousRegion": "ex-Premières Côtes de Bordeaux",
  "type": "AOC"
 },
 {
  "id": "APP078",
  "nom": "Cahors",
  "region": "Sud-Ouest",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP079",
  "nom": "Canon-Fronsac",
  "region": "Bordeaux",
  "sousRegion": "Libournais",
  "type": "AOC"
 },
 {
  "id": "APP080",
  "nom": "Cassis",
  "region": "Provence",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP081",
  "nom": "Castillon Côtes de Bordeaux",
  "region": "Bordeaux",
  "sousRegion": "ex-Côtes de Castillon",
  "type": "AOC"
 },
 {
  "id": "APP082",
  "nom": "Cérons",
  "region": "Bordeaux",
  "sousRegion": "liquoreux",
  "type": "AOC"
 },
 {
  "id": "APP083",
  "nom": "Chablis",
  "region": "Bourgogne",
  "sousRegion": "Chablisien",
  "type": "AOC"
 },
 {
  "id": "APP084",
  "nom": "Chablis Grand Cru",
  "region": "Bourgogne",
  "sousRegion": "Chablisien - Grand Cru",
  "type": "AOC"
 },
 {
  "id": "APP085",
  "nom": "Chablis Premier Cru",
  "region": "Bourgogne",
  "sousRegion": "Chablisien",
  "type": "AOC"
 },
 {
  "id": "APP086",
  "nom": "Chambertin",
  "region": "Bourgogne",
  "sousRegion": "Côte de Nuits - Grand Cru",
  "type": "AOC"
 },
 {
  "id": "APP087",
  "nom": "Chambertin-Clos de Bèze",
  "region": "Bourgogne",
  "sousRegion": "Côte de Nuits - Grand Cru",
  "type": "AOC"
 },
 {
  "id": "APP088",
  "nom": "Chambolle-Musigny",
  "region": "Bourgogne",
  "sousRegion": "Côte de Nuits",
  "type": "AOC"
 },
 {
  "id": "APP089",
  "nom": "Champagne",
  "region": "Champagne",
  "sousRegion": "effervescent",
  "type": "AOC"
 },
 {
  "id": "APP090",
  "nom": "Champagne Grand Cru",
  "region": "Champagne",
  "sousRegion": "17 villages",
  "type": "AOC"
 },
 {
  "id": "APP091",
  "nom": "Champagne Premier Cru",
  "region": "Champagne",
  "sousRegion": "44 villages",
  "type": "AOC"
 },
 {
  "id": "APP092",
  "nom": "Chapelle-Chambertin",
  "region": "Bourgogne",
  "sousRegion": "Côte de Nuits - Grand Cru",
  "type": "AOC"
 },
 {
  "id": "APP093",
  "nom": "Charlemagne",
  "region": "Bourgogne",
  "sousRegion": "Côte de Beaune - Grand Cru",
  "type": "AOC"
 },
 {
  "id": "APP094",
  "nom": "Charmes-Chambertin",
  "region": "Bourgogne",
  "sousRegion": "Côte de Nuits - Grand Cru",
  "type": "AOC"
 },
 {
  "id": "APP095",
  "nom": "Chassagne-Montrachet",
  "region": "Bourgogne",
  "sousRegion": "Côte de Beaune",
  "type": "AOC"
 },
 {
  "id": "APP096",
  "nom": "Château-Chalon",
  "region": "Jura",
  "sousRegion": "Vin Jaune",
  "type": "AOC"
 },
 {
  "id": "APP097",
  "nom": "Château-Grillet",
  "region": "Vallée du Rhône",
  "sousRegion": "septentrionale - monopole",
  "type": "AOC"
 },
 {
  "id": "APP098",
  "nom": "Châteaumeillant",
  "region": "Vallée de la Loire",
  "sousRegion": "Massif central",
  "type": "AOC"
 },
 {
  "id": "APP099",
  "nom": "Chateauneuf-du-Pape",
  "region": "Vallée du Rhône",
  "sousRegion": "méridionale",
  "type": "AOC"
 },
 {
  "id": "APP100",
  "nom": "Châtillon-en-Diois",
  "region": "Vallée du Rhône",
  "sousRegion": "Centre-Rhône",
  "type": "AOC"
 },
 {
  "id": "APP101",
  "nom": "Chénas",
  "region": "Beaujolais",
  "sousRegion": "Cru",
  "type": "AOC"
 },
 {
  "id": "APP102",
  "nom": "Chevalier-Montrachet",
  "region": "Bourgogne",
  "sousRegion": "Côte de Beaune - Grand Cru",
  "type": "AOC"
 },
 {
  "id": "APP103",
  "nom": "Cheverny",
  "region": "Vallée de la Loire",
  "sousRegion": "Touraine",
  "type": "AOC"
 },
 {
  "id": "APP104",
  "nom": "Chinon",
  "region": "Vallée de la Loire",
  "sousRegion": "Touraine",
  "type": "AOC"
 },
 {
  "id": "APP105",
  "nom": "Chiroubles",
  "region": "Beaujolais",
  "sousRegion": "Cru",
  "type": "AOC"
 },
 {
  "id": "APP106",
  "nom": "Chorey-les-Beaune",
  "region": "Bourgogne",
  "sousRegion": "Côte de Beaune",
  "type": "AOC"
 },
 {
  "id": "APP107",
  "nom": "Clairette de Bellegarde",
  "region": "Vallée du Rhône",
  "sousRegion": "Costières de Nîmes",
  "type": "AOC"
 },
 {
  "id": "APP108",
  "nom": "Clairette de Die",
  "region": "Vallée du Rhône",
  "sousRegion": "Centre-Rhône - effervescent",
  "type": "AOC"
 },
 {
  "id": "APP109",
  "nom": "Clairette du Languedoc",
  "region": "Languedoc",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP110",
  "nom": "Clos de la Roche",
  "region": "Bourgogne",
  "sousRegion": "Côte de Nuits - Grand Cru",
  "type": "AOC"
 },
 {
  "id": "APP111",
  "nom": "Clos de Tart",
  "region": "Bourgogne",
  "sousRegion": "Côte de Nuits - Grand Cru",
  "type": "AOC"
 },
 {
  "id": "APP112",
  "nom": "Clos de Vougeot",
  "region": "Bourgogne",
  "sousRegion": "Côte de Nuits - Grand Cru",
  "type": "AOC"
 },
 {
  "id": "APP113",
  "nom": "Clos des Lambrays",
  "region": "Bourgogne",
  "sousRegion": "Côte de Nuits - Grand Cru",
  "type": "AOC"
 },
 {
  "id": "APP114",
  "nom": "Clos Saint-Denis",
  "region": "Bourgogne",
  "sousRegion": "Côte de Nuits - Grand Cru",
  "type": "AOC"
 },
 {
  "id": "APP115",
  "nom": "Collioure",
  "region": "Roussillon",
  "sousRegion": "Côte Vermeille",
  "type": "AOC"
 },
 {
  "id": "APP116",
  "nom": "Condrieu",
  "region": "Vallée du Rhône",
  "sousRegion": "septentrionale",
  "type": "AOC"
 },
 {
  "id": "APP117",
  "nom": "Corbières",
  "region": "Languedoc",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP118",
  "nom": "Corbières-Boutenac",
  "region": "Languedoc",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP119",
  "nom": "Cornas",
  "region": "Vallée du Rhône",
  "sousRegion": "septentrionale",
  "type": "AOC"
 },
 {
  "id": "APP120",
  "nom": "Corse (ou Vin de Corse)",
  "region": "Corse",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP121",
  "nom": "Corse Calvi",
  "region": "Corse",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP122",
  "nom": "Corse Coteaux du Cap Corse",
  "region": "Corse",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP123",
  "nom": "Corse Figari",
  "region": "Corse",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP124",
  "nom": "Corse Porto-Vecchio",
  "region": "Corse",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP125",
  "nom": "Corse Sartène",
  "region": "Corse",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP126",
  "nom": "Corton",
  "region": "Bourgogne",
  "sousRegion": "Côte de Beaune - Grand Cru",
  "type": "AOC"
 },
 {
  "id": "APP127",
  "nom": "Corton-Charlemagne",
  "region": "Bourgogne",
  "sousRegion": "Côte de Beaune - Grand Cru",
  "type": "AOC"
 },
 {
  "id": "APP128",
  "nom": "Costières de Nîmes",
  "region": "Vallée du Rhône",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP129",
  "nom": "Côte de Beaune",
  "region": "Bourgogne",
  "sousRegion": "Côte de Beaune",
  "type": "AOC"
 },
 {
  "id": "APP130",
  "nom": "Côte de Brouilly",
  "region": "Beaujolais",
  "sousRegion": "Cru",
  "type": "AOC"
 },
 {
  "id": "APP131",
  "nom": "Côte de Nuits-Villages",
  "region": "Bourgogne",
  "sousRegion": "Côte de Nuits",
  "type": "AOC"
 },
 {
  "id": "APP132",
  "nom": "Côte Roannaise",
  "region": "Vallée de la Loire",
  "sousRegion": "Massif central",
  "type": "AOC"
 },
 {
  "id": "APP133",
  "nom": "Côte-Rôtie",
  "region": "Vallée du Rhône",
  "sousRegion": "septentrionale",
  "type": "AOC"
 },
 {
  "id": "APP134",
  "nom": "Coteaux Champenois",
  "region": "Champagne",
  "sousRegion": "vin tranquille",
  "type": "AOC"
 },
 {
  "id": "APP135",
  "nom": "Coteaux d'Aix-en-Provence",
  "region": "Provence",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP136",
  "nom": "Coteaux d'Ancenis",
  "region": "Vallée de la Loire",
  "sousRegion": "Nantais",
  "type": "AOC"
 },
 {
  "id": "APP137",
  "nom": "Coteaux de Die",
  "region": "Vallée du Rhône",
  "sousRegion": "Centre-Rhône",
  "type": "AOC"
 },
 {
  "id": "APP138",
  "nom": "Coteaux de l'Aubance",
  "region": "Vallée de la Loire",
  "sousRegion": "Anjou - liquoreux",
  "type": "AOC"
 },
 {
  "id": "APP139",
  "nom": "Coteaux de Pierrevert",
  "region": "Provence",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP140",
  "nom": "Coteaux de Saumur",
  "region": "Vallée de la Loire",
  "sousRegion": "Saumur",
  "type": "AOC"
 },
 {
  "id": "APP141",
  "nom": "Coteaux du Giennois",
  "region": "Vallée de la Loire",
  "sousRegion": "Centre-Loire",
  "type": "AOC"
 },
 {
  "id": "APP142",
  "nom": "Coteaux du Languedoc",
  "region": "Languedoc",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP143",
  "nom": "Coteaux du Layon",
  "region": "Vallée de la Loire",
  "sousRegion": "Anjou - liquoreux",
  "type": "AOC"
 },
 {
  "id": "APP144",
  "nom": "Coteaux du Layon Beaulieu-sur-Layon",
  "region": "Vallée de la Loire",
  "sousRegion": "Anjou",
  "type": "AOC"
 },
 {
  "id": "APP145",
  "nom": "Coteaux du Layon Chaume",
  "region": "Vallée de la Loire",
  "sousRegion": "Anjou",
  "type": "AOC"
 },
 {
  "id": "APP146",
  "nom": "Coteaux du Layon Chaume Premier Cru",
  "region": "Vallée de la Loire",
  "sousRegion": "Anjou",
  "type": "AOC"
 },
 {
  "id": "APP147",
  "nom": "Coteaux du Layon Faye-d'Anjou",
  "region": "Vallée de la Loire",
  "sousRegion": "Anjou",
  "type": "AOC"
 },
 {
  "id": "APP148",
  "nom": "Coteaux du Layon Rablay-sur-Layon",
  "region": "Vallée de la Loire",
  "sousRegion": "Anjou",
  "type": "AOC"
 },
 {
  "id": "APP149",
  "nom": "Coteaux du Layon Rochefort-sur-Loire",
  "region": "Vallée de la Loire",
  "sousRegion": "Anjou",
  "type": "AOC"
 },
 {
  "id": "APP150",
  "nom": "Coteaux du Layon Saint-Aubin-de-Luigné",
  "region": "Vallée de la Loire",
  "sousRegion": "Anjou",
  "type": "AOC"
 },
 {
  "id": "APP151",
  "nom": "Coteaux du Layon Saint-Lambert-du-Lattay",
  "region": "Vallée de la Loire",
  "sousRegion": "Anjou",
  "type": "AOC"
 },
 {
  "id": "APP152",
  "nom": "Coteaux du Loir",
  "region": "Vallée de la Loire",
  "sousRegion": "Touraine",
  "type": "AOC"
 },
 {
  "id": "APP153",
  "nom": "Coteaux du Lyonnais",
  "region": "Beaujolais / Lyonnais",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP154",
  "nom": "Coteaux du Quercy",
  "region": "Sud-Ouest",
  "sousRegion": "entre Cahors et Gaillac",
  "type": "AOC"
 },
 {
  "id": "APP155",
  "nom": "Coteaux du Tricastin",
  "region": "Vallée du Rhône",
  "sousRegion": "devenu Grignan-les-Adhémar en 2010",
  "type": "AOC"
 },
 {
  "id": "APP156",
  "nom": "Coteaux du Vendômois",
  "region": "Vallée de la Loire",
  "sousRegion": "Touraine",
  "type": "AOC"
 },
 {
  "id": "APP157",
  "nom": "Coteaux Varois en Provence",
  "region": "Provence",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP158",
  "nom": "Côtes d'Auvergne",
  "region": "Vallée de la Loire",
  "sousRegion": "Massif central",
  "type": "AOC"
 },
 {
  "id": "APP159",
  "nom": "Côtes d'Auvergne Boudes",
  "region": "Vallée de la Loire",
  "sousRegion": "Massif central",
  "type": "AOC"
 },
 {
  "id": "APP160",
  "nom": "Côtes d'Auvergne Chanturgue",
  "region": "Vallée de la Loire",
  "sousRegion": "Massif central",
  "type": "AOC"
 },
 {
  "id": "APP161",
  "nom": "Côtes d'Auvergne Châteaugay",
  "region": "Vallée de la Loire",
  "sousRegion": "Massif central",
  "type": "AOC"
 },
 {
  "id": "APP162",
  "nom": "Côtes d'Auvergne Corent",
  "region": "Vallée de la Loire",
  "sousRegion": "Massif central",
  "type": "AOC"
 },
 {
  "id": "APP163",
  "nom": "Côtes d'Auvergne Madargues",
  "region": "Vallée de la Loire",
  "sousRegion": "Massif central",
  "type": "AOC"
 },
 {
  "id": "APP164",
  "nom": "Côtes de Beaune-Villages",
  "region": "Bourgogne",
  "sousRegion": "Côte de Beaune",
  "type": "AOC"
 },
 {
  "id": "APP165",
  "nom": "Côtes de Bergerac",
  "region": "Sud-Ouest",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP166",
  "nom": "Côtes de Blaye",
  "region": "Bordeaux",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP167",
  "nom": "Côtes de Bordeaux",
  "region": "Bordeaux",
  "sousRegion": "depuis 2009",
  "type": "AOC"
 },
 {
  "id": "APP168",
  "nom": "Côtes de Bordeaux Saint-Macaire",
  "region": "Bordeaux",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP169",
  "nom": "Côtes de Bourg",
  "region": "Bordeaux",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP170",
  "nom": "Côtes de Castillon",
  "region": "Bordeaux",
  "sousRegion": "Castillon Côtes de Bordeaux depuis 2009",
  "type": "AOC"
 },
 {
  "id": "APP171",
  "nom": "Côtes de Duras",
  "region": "Sud-Ouest",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP172",
  "nom": "Côtes de Millau",
  "region": "Sud-Ouest",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP173",
  "nom": "Côtes de Montravel",
  "region": "Sud-Ouest",
  "sousRegion": "Bergeracois",
  "type": "AOC"
 },
 {
  "id": "APP174",
  "nom": "Côtes de Provence",
  "region": "Provence",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP175",
  "nom": "Côtes de Provence Fréjus",
  "region": "Provence",
  "sousRegion": "dénomination",
  "type": "AOC"
 },
 {
  "id": "APP176",
  "nom": "Côtes de Provence La Londe",
  "region": "Provence",
  "sousRegion": "dénomination",
  "type": "AOC"
 },
 {
  "id": "APP177",
  "nom": "Côtes de Provence Sainte-Victoire",
  "region": "Provence",
  "sousRegion": "dénomination",
  "type": "AOC"
 },
 {
  "id": "APP178",
  "nom": "Côtes de Saint-Mont",
  "region": "Sud-Ouest",
  "sousRegion": "pres de Madiran",
  "type": "AOC"
 },
 {
  "id": "APP179",
  "nom": "Côtes de Toul",
  "region": "Lorraine / Est",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP180",
  "nom": "Côtes du Brulhois",
  "region": "Sud-Ouest",
  "sousRegion": "pres d'Agen",
  "type": "AOC"
 },
 {
  "id": "APP181",
  "nom": "Côtes du Forez",
  "region": "Vallée de la Loire",
  "sousRegion": "Massif central",
  "type": "AOC"
 },
 {
  "id": "APP182",
  "nom": "Côtes du Frontonnais (Fronton)",
  "region": "Sud-Ouest",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP183",
  "nom": "Côtes du Jura",
  "region": "Jura",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP184",
  "nom": "Côtes du Jura Mousseux",
  "region": "Jura",
  "sousRegion": "effervescent",
  "type": "AOC"
 },
 {
  "id": "APP185",
  "nom": "Côtes du Marmandais",
  "region": "Sud-Ouest",
  "sousRegion": "entre Duras et Buzet",
  "type": "AOC"
 },
 {
  "id": "APP186",
  "nom": "Côtes du Rhône",
  "region": "Vallée du Rhône",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP187",
  "nom": "Côtes du Rhône-Villages",
  "region": "Vallée du Rhône",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP188",
  "nom": "Côtes du Rhône-Villages Beaumes-de-Venise",
  "region": "Vallée du Rhône",
  "sousRegion": "nom géographique",
  "type": "AOC"
 },
 {
  "id": "APP189",
  "nom": "Côtes du Rhône-Villages Cairanne",
  "region": "Vallée du Rhône",
  "sousRegion": "nom géographique",
  "type": "AOC"
 },
 {
  "id": "APP190",
  "nom": "Côtes du Rhône-Villages Chusclan",
  "region": "Vallée du Rhône",
  "sousRegion": "nom géographique",
  "type": "AOC"
 },
 {
  "id": "APP191",
  "nom": "Côtes du Rhône-Villages Laudun",
  "region": "Vallée du Rhône",
  "sousRegion": "nom géographique",
  "type": "AOC"
 },
 {
  "id": "APP192",
  "nom": "Côtes du Rhône-Villages Rasteau",
  "region": "Vallée du Rhône",
  "sousRegion": "nom géographique",
  "type": "AOC"
 },
 {
  "id": "APP193",
  "nom": "Côtes du Rhône-Villages Roaix",
  "region": "Vallée du Rhône",
  "sousRegion": "nom géographique",
  "type": "AOC"
 },
 {
  "id": "APP194",
  "nom": "Côtes du Rhône-Villages Rochegude",
  "region": "Vallée du Rhône",
  "sousRegion": "nom géographique",
  "type": "AOC"
 },
 {
  "id": "APP195",
  "nom": "Côtes du Rhône-Villages Rousset-les-Vignes",
  "region": "Vallée du Rhône",
  "sousRegion": "nom géographique",
  "type": "AOC"
 },
 {
  "id": "APP196",
  "nom": "Côtes du Rhône-Villages Sablet",
  "region": "Vallée du Rhône",
  "sousRegion": "nom géographique",
  "type": "AOC"
 },
 {
  "id": "APP197",
  "nom": "Côtes du Rhône-Villages Saint-Gervais",
  "region": "Vallée du Rhône",
  "sousRegion": "nom géographique",
  "type": "AOC"
 },
 {
  "id": "APP198",
  "nom": "Côtes du Rhône-Villages Saint-Maurice",
  "region": "Vallée du Rhône",
  "sousRegion": "nom géographique",
  "type": "AOC"
 },
 {
  "id": "APP199",
  "nom": "Côtes du Rhône-Villages Saint-Pantaleon-les-Vignes",
  "region": "Vallée du Rhône",
  "sousRegion": "nom géographique",
  "type": "AOC"
 },
 {
  "id": "APP200",
  "nom": "Côtes du Rhône-Villages Séguret",
  "region": "Vallée du Rhône",
  "sousRegion": "nom géographique",
  "type": "AOC"
 },
 {
  "id": "APP201",
  "nom": "Côtes du Rhône-Villages Valréas",
  "region": "Vallée du Rhône",
  "sousRegion": "nom géographique",
  "type": "AOC"
 },
 {
  "id": "APP202",
  "nom": "Côtes du Rhône-Villages Vinsobres",
  "region": "Vallée du Rhône",
  "sousRegion": "nom géographique",
  "type": "AOC"
 },
 {
  "id": "APP203",
  "nom": "Côtes du Rhône-Villages Visan",
  "region": "Vallée du Rhône",
  "sousRegion": "nom géographique",
  "type": "AOC"
 },
 {
  "id": "APP204",
  "nom": "Côtes du Roussillon",
  "region": "Roussillon",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP205",
  "nom": "Côtes du Roussillon Les Aspres",
  "region": "Roussillon",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP206",
  "nom": "Côtes du Roussillon-Villages",
  "region": "Roussillon",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP207",
  "nom": "Côtes du Vivarais",
  "region": "Vallée du Rhône",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP208",
  "nom": "Cour-Cheverny",
  "region": "Vallée de la Loire",
  "sousRegion": "Touraine",
  "type": "AOC"
 },
 {
  "id": "APP209",
  "nom": "Crémant d'Alsace",
  "region": "Alsace",
  "sousRegion": "effervescent",
  "type": "AOC"
 },
 {
  "id": "APP210",
  "nom": "Crémant de Bordeaux",
  "region": "Bordeaux",
  "sousRegion": "effervescent",
  "type": "AOC"
 },
 {
  "id": "APP211",
  "nom": "Crémant de Bourgogne",
  "region": "Bourgogne",
  "sousRegion": "effervescent",
  "type": "AOC"
 },
 {
  "id": "APP212",
  "nom": "Crémant de Die",
  "region": "Vallée du Rhône",
  "sousRegion": "effervescent",
  "type": "AOC"
 },
 {
  "id": "APP213",
  "nom": "Crémant de Limoux",
  "region": "Languedoc",
  "sousRegion": "effervescent",
  "type": "AOC"
 },
 {
  "id": "APP214",
  "nom": "Crémant de Loire",
  "region": "Vallée de la Loire",
  "sousRegion": "effervescent",
  "type": "AOC"
 },
 {
  "id": "APP215",
  "nom": "Crémant du Jura",
  "region": "Jura",
  "sousRegion": "effervescent",
  "type": "AOC"
 },
 {
  "id": "APP216",
  "nom": "Crépy",
  "region": "Savoie",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP217",
  "nom": "Criots-Bâtard-Montrachet",
  "region": "Bourgogne",
  "sousRegion": "Côte de Beaune - Grand Cru",
  "type": "AOC"
 },
 {
  "id": "APP218",
  "nom": "Crozes-Hermitage",
  "region": "Vallée du Rhône",
  "sousRegion": "septentrionale",
  "type": "AOC"
 },
 {
  "id": "APP219",
  "nom": "Échezeaux",
  "region": "Bourgogne",
  "sousRegion": "Côte de Nuits - Grand Cru",
  "type": "AOC"
 },
 {
  "id": "APP220",
  "nom": "Entre-Deux-Mers",
  "region": "Bordeaux",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP221",
  "nom": "Entre-Deux-Mers Haut-Benauge",
  "region": "Bordeaux",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP222",
  "nom": "Faugères",
  "region": "Languedoc",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP223",
  "nom": "Fiefs Vendéens",
  "region": "Vallée de la Loire",
  "sousRegion": "Vendée",
  "type": "AOC"
 },
 {
  "id": "APP224",
  "nom": "Fitou",
  "region": "Languedoc",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP225",
  "nom": "Fixin",
  "region": "Bourgogne",
  "sousRegion": "Côte de Nuits",
  "type": "AOC"
 },
 {
  "id": "APP226",
  "nom": "Fleurie",
  "region": "Beaujolais",
  "sousRegion": "Cru",
  "type": "AOC"
 },
 {
  "id": "APP227",
  "nom": "Floc de Gascogne",
  "region": "Sud-Ouest",
  "sousRegion": "vin de liqueur",
  "type": "AOC"
 },
 {
  "id": "APP228",
  "nom": "Francs Côtes de Bordeaux",
  "region": "Bordeaux",
  "sousRegion": "ex-Bordeaux Côtes de Francs",
  "type": "AOC"
 },
 {
  "id": "APP229",
  "nom": "Fronsac",
  "region": "Bordeaux",
  "sousRegion": "Libournais",
  "type": "AOC"
 },
 {
  "id": "APP230",
  "nom": "Gaillac",
  "region": "Sud-Ouest",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP231",
  "nom": "Gaillac Premières Côtes",
  "region": "Sud-Ouest",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP232",
  "nom": "Gevrey-Chambertin",
  "region": "Bourgogne",
  "sousRegion": "Côte de Nuits",
  "type": "AOC"
 },
 {
  "id": "APP233",
  "nom": "Gigondas",
  "region": "Vallée du Rhône",
  "sousRegion": "méridionale",
  "type": "AOC"
 },
 {
  "id": "APP234",
  "nom": "Givry",
  "region": "Bourgogne",
  "sousRegion": "Côte Chalonnaise",
  "type": "AOC"
 },
 {
  "id": "APP235",
  "nom": "Grands-Échezeaux",
  "region": "Bourgogne",
  "sousRegion": "Côte de Nuits - Grand Cru",
  "type": "AOC"
 },
 {
  "id": "APP236",
  "nom": "Graves",
  "region": "Bordeaux",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP237",
  "nom": "Graves de Vayres",
  "region": "Bordeaux",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP238",
  "nom": "Graves Supérieures",
  "region": "Bordeaux",
  "sousRegion": "liquoreux",
  "type": "AOC"
 },
 {
  "id": "APP239",
  "nom": "Grignan-les-Adhémar",
  "region": "Vallée du Rhône",
  "sousRegion": "ex-Coteaux du Tricastin",
  "type": "AOC"
 },
 {
  "id": "APP240",
  "nom": "Griotte-Chambertin",
  "region": "Bourgogne",
  "sousRegion": "Côte de Nuits - Grand Cru",
  "type": "AOC"
 },
 {
  "id": "APP241",
  "nom": "Gros Plant du Pays Nantais",
  "region": "Vallée de la Loire",
  "sousRegion": "Nantais",
  "type": "AOC"
 },
 {
  "id": "APP242",
  "nom": "Haut-Médoc",
  "region": "Bordeaux",
  "sousRegion": "Médoc",
  "type": "AOC"
 },
 {
  "id": "APP243",
  "nom": "Haut-Montravel",
  "region": "Sud-Ouest",
  "sousRegion": "Bergeracois",
  "type": "AOC"
 },
 {
  "id": "APP244",
  "nom": "Haut-Poitou",
  "region": "Vallée de la Loire",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP245",
  "nom": "Hermitage (ou Ermitage)",
  "region": "Vallée du Rhône",
  "sousRegion": "septentrionale",
  "type": "AOC"
 },
 {
  "id": "APP246",
  "nom": "Irancy",
  "region": "Bourgogne",
  "sousRegion": "Auxerrois",
  "type": "AOC"
 },
 {
  "id": "APP247",
  "nom": "Irouléguy",
  "region": "Sud-Ouest",
  "sousRegion": "Pays Basque",
  "type": "AOC"
 },
 {
  "id": "APP248",
  "nom": "Jasnières",
  "region": "Vallée de la Loire",
  "sousRegion": "Touraine",
  "type": "AOC"
 },
 {
  "id": "APP249",
  "nom": "Juliénas",
  "region": "Beaujolais",
  "sousRegion": "Cru",
  "type": "AOC"
 },
 {
  "id": "APP250",
  "nom": "Jurançon",
  "region": "Sud-Ouest",
  "sousRegion": "Béarn - moelleux",
  "type": "AOC"
 },
 {
  "id": "APP251",
  "nom": "Jurançon Sec",
  "region": "Sud-Ouest",
  "sousRegion": "Béarn",
  "type": "AOC"
 },
 {
  "id": "APP252",
  "nom": "La Grande Rue",
  "region": "Bourgogne",
  "sousRegion": "Côte de Nuits - Grand Cru",
  "type": "AOC"
 },
 {
  "id": "APP253",
  "nom": "La Romanée",
  "region": "Bourgogne",
  "sousRegion": "Côte de Nuits - Grand Cru",
  "type": "AOC"
 },
 {
  "id": "APP254",
  "nom": "La Tâche",
  "region": "Bourgogne",
  "sousRegion": "Côte de Nuits - Grand Cru",
  "type": "AOC"
 },
 {
  "id": "APP255",
  "nom": "Ladoix",
  "region": "Bourgogne",
  "sousRegion": "Côte de Beaune",
  "type": "AOC"
 },
 {
  "id": "APP256",
  "nom": "Lalande-de-Pomerol",
  "region": "Bordeaux",
  "sousRegion": "Libournais",
  "type": "AOC"
 },
 {
  "id": "APP257",
  "nom": "Latricières-Chambertin",
  "region": "Bourgogne",
  "sousRegion": "Côte de Nuits - Grand Cru",
  "type": "AOC"
 },
 {
  "id": "APP258",
  "nom": "Lavilledieu",
  "region": "Sud-Ouest",
  "sousRegion": "au nord de Fronton",
  "type": "AOC"
 },
 {
  "id": "APP259",
  "nom": "Les Baux-de-Provence",
  "region": "Provence",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP260",
  "nom": "L'Étoile",
  "region": "Jura",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP261",
  "nom": "L'Étoile Mousseux",
  "region": "Jura",
  "sousRegion": "effervescent",
  "type": "AOC"
 },
 {
  "id": "APP262",
  "nom": "Limoux",
  "region": "Languedoc",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP263",
  "nom": "Lirac",
  "region": "Vallée du Rhône",
  "sousRegion": "méridionale",
  "type": "AOC"
 },
 {
  "id": "APP264",
  "nom": "Listrac-Médoc",
  "region": "Bordeaux",
  "sousRegion": "Médoc",
  "type": "AOC"
 },
 {
  "id": "APP265",
  "nom": "Loupiac",
  "region": "Bordeaux",
  "sousRegion": "liquoreux",
  "type": "AOC"
 },
 {
  "id": "APP266",
  "nom": "Luberon",
  "region": "Vallée du Rhône",
  "sousRegion": "méridionale",
  "type": "AOC"
 },
 {
  "id": "APP267",
  "nom": "Lussac Saint-Émilion",
  "region": "Bordeaux",
  "sousRegion": "Libournais",
  "type": "AOC"
 },
 {
  "id": "APP268",
  "nom": "Mâcon",
  "region": "Bourgogne",
  "sousRegion": "Mâconnais",
  "type": "AOC"
 },
 {
  "id": "APP269",
  "nom": "Mâcon-Supérieur",
  "region": "Bourgogne",
  "sousRegion": "Mâconnais",
  "type": "AOC"
 },
 {
  "id": "APP270",
  "nom": "Mâcon-Villages",
  "region": "Bourgogne",
  "sousRegion": "Mâconnais",
  "type": "AOC"
 },
 {
  "id": "APP271",
  "nom": "Macvin du Jura",
  "region": "Jura",
  "sousRegion": "vin de liqueur",
  "type": "AOC"
 },
 {
  "id": "APP272",
  "nom": "Madiran",
  "region": "Sud-Ouest",
  "sousRegion": "Gascogne",
  "type": "AOC"
 },
 {
  "id": "APP273",
  "nom": "Malepère",
  "region": "Languedoc",
  "sousRegion": "ex-Côtes de la Malepère",
  "type": "AOC"
 },
 {
  "id": "APP274",
  "nom": "Maranges",
  "region": "Bourgogne",
  "sousRegion": "Côte de Beaune",
  "type": "AOC"
 },
 {
  "id": "APP275",
  "nom": "Maranges Premier Cru",
  "region": "Bourgogne",
  "sousRegion": "Côte de Beaune",
  "type": "AOC"
 },
 {
  "id": "APP276",
  "nom": "Marcillac",
  "region": "Sud-Ouest",
  "sousRegion": "Aveyron",
  "type": "AOC"
 },
 {
  "id": "APP277",
  "nom": "Margaux",
  "region": "Bordeaux",
  "sousRegion": "Médoc",
  "type": "AOC"
 },
 {
  "id": "APP278",
  "nom": "Marsannay",
  "region": "Bourgogne",
  "sousRegion": "Côte de Nuits",
  "type": "AOC"
 },
 {
  "id": "APP279",
  "nom": "Marsannay Rosé",
  "region": "Bourgogne",
  "sousRegion": "Côte de Nuits",
  "type": "AOC"
 },
 {
  "id": "APP280",
  "nom": "Maury",
  "region": "Roussillon",
  "sousRegion": "VDN",
  "type": "AOC"
 },
 {
  "id": "APP281",
  "nom": "Mazis-Chambertin",
  "region": "Bourgogne",
  "sousRegion": "Côte de Nuits - Grand Cru",
  "type": "AOC"
 },
 {
  "id": "APP282",
  "nom": "Mazoyères-Chambertin",
  "region": "Bourgogne",
  "sousRegion": "Côte de Nuits - Grand Cru",
  "type": "AOC"
 },
 {
  "id": "APP283",
  "nom": "Médoc",
  "region": "Bordeaux",
  "sousRegion": "Médoc",
  "type": "AOC"
 },
 {
  "id": "APP284",
  "nom": "Menetou-Salon",
  "region": "Vallée de la Loire",
  "sousRegion": "Centre-Loire",
  "type": "AOC"
 },
 {
  "id": "APP285",
  "nom": "Mercurey",
  "region": "Bourgogne",
  "sousRegion": "Côte Chalonnaise",
  "type": "AOC"
 },
 {
  "id": "APP286",
  "nom": "Meursault",
  "region": "Bourgogne",
  "sousRegion": "Côte de Beaune",
  "type": "AOC"
 },
 {
  "id": "APP287",
  "nom": "Minervois",
  "region": "Languedoc",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP288",
  "nom": "Minervois-La Livinière",
  "region": "Languedoc",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP289",
  "nom": "Monbazillac",
  "region": "Sud-Ouest",
  "sousRegion": "Bergeracois - liquoreux",
  "type": "AOC"
 },
 {
  "id": "APP290",
  "nom": "Montagne Saint-Émilion",
  "region": "Bordeaux",
  "sousRegion": "Libournais",
  "type": "AOC"
 },
 {
  "id": "APP291",
  "nom": "Montagny",
  "region": "Bourgogne",
  "sousRegion": "Côte Chalonnaise",
  "type": "AOC"
 },
 {
  "id": "APP292",
  "nom": "Monthélie",
  "region": "Bourgogne",
  "sousRegion": "Côte de Beaune",
  "type": "AOC"
 },
 {
  "id": "APP293",
  "nom": "Montlouis-sur-Loire",
  "region": "Vallée de la Loire",
  "sousRegion": "Touraine",
  "type": "AOC"
 },
 {
  "id": "APP294",
  "nom": "Montlouis-sur-Loire Mousseux",
  "region": "Vallée de la Loire",
  "sousRegion": "effervescent",
  "type": "AOC"
 },
 {
  "id": "APP295",
  "nom": "Montlouis-sur-Loire Pétillant",
  "region": "Vallée de la Loire",
  "sousRegion": "effervescent",
  "type": "AOC"
 },
 {
  "id": "APP296",
  "nom": "Montrachet",
  "region": "Bourgogne",
  "sousRegion": "Côte de Beaune - Grand Cru",
  "type": "AOC"
 },
 {
  "id": "APP297",
  "nom": "Montravel",
  "region": "Sud-Ouest",
  "sousRegion": "Bergeracois",
  "type": "AOC"
 },
 {
  "id": "APP298",
  "nom": "Morey-Saint-Denis",
  "region": "Bourgogne",
  "sousRegion": "Côte de Nuits",
  "type": "AOC"
 },
 {
  "id": "APP299",
  "nom": "Morgon",
  "region": "Beaujolais",
  "sousRegion": "Cru",
  "type": "AOC"
 },
 {
  "id": "APP300",
  "nom": "Moselle",
  "region": "Lorraine / Est",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP301",
  "nom": "Moulin-a-Vent",
  "region": "Beaujolais",
  "sousRegion": "Cru",
  "type": "AOC"
 },
 {
  "id": "APP302",
  "nom": "Moulis (Moulis-en-Médoc)",
  "region": "Bordeaux",
  "sousRegion": "Médoc",
  "type": "AOC"
 },
 {
  "id": "APP303",
  "nom": "Muscadet",
  "region": "Vallée de la Loire",
  "sousRegion": "Nantais",
  "type": "AOC"
 },
 {
  "id": "APP304",
  "nom": "Muscadet Côtes de Grandlieu",
  "region": "Vallée de la Loire",
  "sousRegion": "Nantais",
  "type": "AOC"
 },
 {
  "id": "APP305",
  "nom": "Muscadet Sèvre-et-Maine",
  "region": "Vallée de la Loire",
  "sousRegion": "Nantais",
  "type": "AOC"
 },
 {
  "id": "APP306",
  "nom": "Muscadet Coteaux de la Loire",
  "region": "Vallée de la Loire",
  "sousRegion": "Nantais",
  "type": "AOC"
 },
 {
  "id": "APP307",
  "nom": "Muscat de Beaumes-de-Venise",
  "region": "Vallée du Rhône",
  "sousRegion": "VDN",
  "type": "AOC"
 },
 {
  "id": "APP308",
  "nom": "Muscat de Frontignan",
  "region": "Languedoc",
  "sousRegion": "VDN",
  "type": "AOC"
 },
 {
  "id": "APP309",
  "nom": "Muscat de Lunel",
  "region": "Languedoc",
  "sousRegion": "VDN",
  "type": "AOC"
 },
 {
  "id": "APP310",
  "nom": "Muscat de Mireval",
  "region": "Languedoc",
  "sousRegion": "VDN",
  "type": "AOC"
 },
 {
  "id": "APP311",
  "nom": "Muscat de Rivesaltes",
  "region": "Roussillon",
  "sousRegion": "VDN",
  "type": "AOC"
 },
 {
  "id": "APP312",
  "nom": "Muscat de Saint-Jean-de-Minervois",
  "region": "Languedoc",
  "sousRegion": "VDN",
  "type": "AOC"
 },
 {
  "id": "APP313",
  "nom": "Muscat du Cap Corse",
  "region": "Corse",
  "sousRegion": "VDN",
  "type": "AOC"
 },
 {
  "id": "APP314",
  "nom": "Musigny",
  "region": "Bourgogne",
  "sousRegion": "Côte de Nuits - Grand Cru",
  "type": "AOC"
 },
 {
  "id": "APP315",
  "nom": "Nuits-Saint-Georges",
  "region": "Bourgogne",
  "sousRegion": "Côte de Nuits",
  "type": "AOC"
 },
 {
  "id": "APP316",
  "nom": "Orléans",
  "region": "Vallée de la Loire",
  "sousRegion": "Centre-Loire",
  "type": "AOC"
 },
 {
  "id": "APP317",
  "nom": "Orléans-Cléry",
  "region": "Vallée de la Loire",
  "sousRegion": "Centre-Loire",
  "type": "AOC"
 },
 {
  "id": "APP318",
  "nom": "Pacherenc du Vic-Bilh",
  "region": "Sud-Ouest",
  "sousRegion": "moelleux",
  "type": "AOC"
 },
 {
  "id": "APP319",
  "nom": "Pacherenc du Vic-Bilh Sec",
  "region": "Sud-Ouest",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP320",
  "nom": "Palette",
  "region": "Provence",
  "sousRegion": "Aix",
  "type": "AOC"
 },
 {
  "id": "APP321",
  "nom": "Patrimonio",
  "region": "Corse",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP322",
  "nom": "Pauillac",
  "region": "Bordeaux",
  "sousRegion": "Médoc",
  "type": "AOC"
 },
 {
  "id": "APP323",
  "nom": "Pécharmant",
  "region": "Sud-Ouest",
  "sousRegion": "Bergeracois",
  "type": "AOC"
 },
 {
  "id": "APP324",
  "nom": "Pernand-Vergelesses",
  "region": "Bourgogne",
  "sousRegion": "Côte de Beaune",
  "type": "AOC"
 },
 {
  "id": "APP325",
  "nom": "Pessac-Léognan",
  "region": "Bordeaux",
  "sousRegion": "Graves",
  "type": "AOC"
 },
 {
  "id": "APP326",
  "nom": "Petit Chablis",
  "region": "Bourgogne",
  "sousRegion": "Chablisien",
  "type": "AOC"
 },
 {
  "id": "APP327",
  "nom": "Pineau des Charentes",
  "region": "Charentes",
  "sousRegion": "vin de liqueur",
  "type": "AOC"
 },
 {
  "id": "APP328",
  "nom": "Pomerol",
  "region": "Bordeaux",
  "sousRegion": "Libournais",
  "type": "AOC"
 },
 {
  "id": "APP329",
  "nom": "Pommard",
  "region": "Bourgogne",
  "sousRegion": "Côte de Beaune",
  "type": "AOC"
 },
 {
  "id": "APP330",
  "nom": "Pouilly-Fuissé",
  "region": "Bourgogne",
  "sousRegion": "Mâconnais",
  "type": "AOC"
 },
 {
  "id": "APP331",
  "nom": "Pouilly-Fumé",
  "region": "Vallée de la Loire",
  "sousRegion": "Centre-Loire",
  "type": "AOC"
 },
 {
  "id": "APP332",
  "nom": "Pouilly-Loché",
  "region": "Bourgogne",
  "sousRegion": "Mâconnais",
  "type": "AOC"
 },
 {
  "id": "APP333",
  "nom": "Pouilly-sur-Loire",
  "region": "Vallée de la Loire",
  "sousRegion": "Centre-Loire",
  "type": "AOC"
 },
 {
  "id": "APP334",
  "nom": "Pouilly-Vinzelles",
  "region": "Bourgogne",
  "sousRegion": "Mâconnais",
  "type": "AOC"
 },
 {
  "id": "APP335",
  "nom": "Premières Côtes de Blaye",
  "region": "Bordeaux",
  "sousRegion": "Blaye Côtes de Bordeaux depuis 2009",
  "type": "AOC"
 },
 {
  "id": "APP336",
  "nom": "Premières Côtes de Bordeaux",
  "region": "Bordeaux",
  "sousRegion": "Cadillac Côtes de Bordeaux depuis 2009",
  "type": "AOC"
 },
 {
  "id": "APP337",
  "nom": "Puisseguin Saint-Émilion",
  "region": "Bordeaux",
  "sousRegion": "Libournais",
  "type": "AOC"
 },
 {
  "id": "APP338",
  "nom": "Puligny-Montrachet",
  "region": "Bourgogne",
  "sousRegion": "Côte de Beaune",
  "type": "AOC"
 },
 {
  "id": "APP339",
  "nom": "Quarts de Chaume",
  "region": "Vallée de la Loire",
  "sousRegion": "Anjou - Grand Cru liquoreux",
  "type": "AOC"
 },
 {
  "id": "APP340",
  "nom": "Quincy",
  "region": "Vallée de la Loire",
  "sousRegion": "Centre-Loire",
  "type": "AOC"
 },
 {
  "id": "APP341",
  "nom": "Rasteau",
  "region": "Vallée du Rhône",
  "sousRegion": "VDN et sec",
  "type": "AOC"
 },
 {
  "id": "APP342",
  "nom": "Régnié",
  "region": "Beaujolais",
  "sousRegion": "Cru",
  "type": "AOC"
 },
 {
  "id": "APP343",
  "nom": "Reuilly",
  "region": "Vallée de la Loire",
  "sousRegion": "Centre-Loire",
  "type": "AOC"
 },
 {
  "id": "APP344",
  "nom": "Richebourg",
  "region": "Bourgogne",
  "sousRegion": "Côte de Nuits - Grand Cru",
  "type": "AOC"
 },
 {
  "id": "APP345",
  "nom": "Rivesaltes",
  "region": "Roussillon",
  "sousRegion": "VDN",
  "type": "AOC"
 },
 {
  "id": "APP346",
  "nom": "Romanée-Conti",
  "region": "Bourgogne",
  "sousRegion": "Côte de Nuits - Grand Cru",
  "type": "AOC"
 },
 {
  "id": "APP347",
  "nom": "Romanée-Saint-Vivant",
  "region": "Bourgogne",
  "sousRegion": "Côte de Nuits - Grand Cru",
  "type": "AOC"
 },
 {
  "id": "APP348",
  "nom": "Rosé d'Anjou",
  "region": "Vallée de la Loire",
  "sousRegion": "Anjou",
  "type": "AOC"
 },
 {
  "id": "APP349",
  "nom": "Rosé de Loire",
  "region": "Vallée de la Loire",
  "sousRegion": "Anjou, Saumur, Touraine",
  "type": "AOC"
 },
 {
  "id": "APP350",
  "nom": "Rosé des Riceys",
  "region": "Champagne",
  "sousRegion": "Côte des Bar",
  "type": "AOC"
 },
 {
  "id": "APP351",
  "nom": "Rosette",
  "region": "Sud-Ouest",
  "sousRegion": "Bergeracois",
  "type": "AOC"
 },
 {
  "id": "APP352",
  "nom": "Roussette de Savoie",
  "region": "Savoie",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP353",
  "nom": "Roussette du Bugey",
  "region": "Savoie",
  "sousRegion": "AOC depuis 2009",
  "type": "AOC"
 },
 {
  "id": "APP354",
  "nom": "Ruchottes-Chambertin",
  "region": "Bourgogne",
  "sousRegion": "Côte de Nuits - Grand Cru",
  "type": "AOC"
 },
 {
  "id": "APP355",
  "nom": "Rully",
  "region": "Bourgogne",
  "sousRegion": "Côte Chalonnaise",
  "type": "AOC"
 },
 {
  "id": "APP356",
  "nom": "Saint-Amour",
  "region": "Beaujolais",
  "sousRegion": "Cru",
  "type": "AOC"
 },
 {
  "id": "APP357",
  "nom": "Saint-Aubin",
  "region": "Bourgogne",
  "sousRegion": "Côte de Beaune",
  "type": "AOC"
 },
 {
  "id": "APP358",
  "nom": "Saint-Bris",
  "region": "Bourgogne",
  "sousRegion": "Chablisien - Sauvignon",
  "type": "AOC"
 },
 {
  "id": "APP359",
  "nom": "Saint-Chinian",
  "region": "Languedoc",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP360",
  "nom": "Saint-Chinian Berlou",
  "region": "Languedoc",
  "sousRegion": "dénomination",
  "type": "AOC"
 },
 {
  "id": "APP361",
  "nom": "Saint-Chinian Roquebrun",
  "region": "Languedoc",
  "sousRegion": "dénomination",
  "type": "AOC"
 },
 {
  "id": "APP362",
  "nom": "Saint-Émilion",
  "region": "Bordeaux",
  "sousRegion": "Libournais",
  "type": "AOC"
 },
 {
  "id": "APP363",
  "nom": "Saint-Émilion Grand Cru",
  "region": "Bordeaux",
  "sousRegion": "Libournais - classement 2022",
  "type": "AOC"
 },
 {
  "id": "APP364",
  "nom": "Saint-Estèphe",
  "region": "Bordeaux",
  "sousRegion": "Médoc",
  "type": "AOC"
 },
 {
  "id": "APP365",
  "nom": "Saint-Georges Saint-Émilion",
  "region": "Bordeaux",
  "sousRegion": "Libournais",
  "type": "AOC"
 },
 {
  "id": "APP366",
  "nom": "Saint-Joseph",
  "region": "Vallée du Rhône",
  "sousRegion": "septentrionale",
  "type": "AOC"
 },
 {
  "id": "APP367",
  "nom": "Saint-Julien",
  "region": "Bordeaux",
  "sousRegion": "Médoc",
  "type": "AOC"
 },
 {
  "id": "APP368",
  "nom": "Saint-Nicolas-de-Bourgueil",
  "region": "Vallée de la Loire",
  "sousRegion": "Touraine",
  "type": "AOC"
 },
 {
  "id": "APP369",
  "nom": "Saint-Péray",
  "region": "Vallée du Rhône",
  "sousRegion": "septentrionale",
  "type": "AOC"
 },
 {
  "id": "APP370",
  "nom": "Saint-Péray Mousseux",
  "region": "Vallée du Rhône",
  "sousRegion": "effervescent",
  "type": "AOC"
 },
 {
  "id": "APP371",
  "nom": "Saint-Pourçain",
  "region": "Vallée de la Loire",
  "sousRegion": "Massif central - AOC 2009",
  "type": "AOC"
 },
 {
  "id": "APP372",
  "nom": "Saint-Romain",
  "region": "Bourgogne",
  "sousRegion": "Côte de Beaune",
  "type": "AOC"
 },
 {
  "id": "APP373",
  "nom": "Saint-Sardos",
  "region": "Sud-Ouest",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP374",
  "nom": "Saint-Véran",
  "region": "Bourgogne",
  "sousRegion": "Mâconnais",
  "type": "AOC"
 },
 {
  "id": "APP375",
  "nom": "Sainte-Croix-du-Mont",
  "region": "Bordeaux",
  "sousRegion": "liquoreux",
  "type": "AOC"
 },
 {
  "id": "APP376",
  "nom": "Sainte-Foy-Bordeaux",
  "region": "Bordeaux",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP377",
  "nom": "Sancerre",
  "region": "Vallée de la Loire",
  "sousRegion": "Centre-Loire",
  "type": "AOC"
 },
 {
  "id": "APP378",
  "nom": "Santenay",
  "region": "Bourgogne",
  "sousRegion": "Côte de Beaune",
  "type": "AOC"
 },
 {
  "id": "APP379",
  "nom": "Saumur",
  "region": "Vallée de la Loire",
  "sousRegion": "Saumur",
  "type": "AOC"
 },
 {
  "id": "APP380",
  "nom": "Saumur Mousseux",
  "region": "Vallée de la Loire",
  "sousRegion": "effervescent",
  "type": "AOC"
 },
 {
  "id": "APP381",
  "nom": "Saumur-Champigny",
  "region": "Vallée de la Loire",
  "sousRegion": "Saumur",
  "type": "AOC"
 },
 {
  "id": "APP382",
  "nom": "Saussignac",
  "region": "Sud-Ouest",
  "sousRegion": "Bergeracois - liquoreux",
  "type": "AOC"
 },
 {
  "id": "APP383",
  "nom": "Sauternes",
  "region": "Bordeaux",
  "sousRegion": "Sauternais - liquoreux",
  "type": "AOC"
 },
 {
  "id": "APP384",
  "nom": "Savennières",
  "region": "Vallée de la Loire",
  "sousRegion": "Anjou",
  "type": "AOC"
 },
 {
  "id": "APP385",
  "nom": "Savigny-les-Beaune",
  "region": "Bourgogne",
  "sousRegion": "Côte de Beaune",
  "type": "AOC"
 },
 {
  "id": "APP386",
  "nom": "Seyssel",
  "region": "Savoie",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP387",
  "nom": "Seyssel Mousseux",
  "region": "Savoie",
  "sousRegion": "effervescent",
  "type": "AOC"
 },
 {
  "id": "APP388",
  "nom": "Tavel",
  "region": "Vallée du Rhône",
  "sousRegion": "rosé uniquement",
  "type": "AOC"
 },
 {
  "id": "APP389",
  "nom": "Touraine",
  "region": "Vallée de la Loire",
  "sousRegion": "Touraine",
  "type": "AOC"
 },
 {
  "id": "APP390",
  "nom": "Touraine Amboise",
  "region": "Vallée de la Loire",
  "sousRegion": "Touraine",
  "type": "AOC"
 },
 {
  "id": "APP391",
  "nom": "Touraine Azay-le-Rideau",
  "region": "Vallée de la Loire",
  "sousRegion": "Touraine",
  "type": "AOC"
 },
 {
  "id": "APP392",
  "nom": "Touraine Mesland",
  "region": "Vallée de la Loire",
  "sousRegion": "Touraine",
  "type": "AOC"
 },
 {
  "id": "APP393",
  "nom": "Touraine Mousseux",
  "region": "Vallée de la Loire",
  "sousRegion": "effervescent",
  "type": "AOC"
 },
 {
  "id": "APP394",
  "nom": "Touraine Noble-Joue",
  "region": "Vallée de la Loire",
  "sousRegion": "Touraine - rosé",
  "type": "AOC"
 },
 {
  "id": "APP395",
  "nom": "Touraine Pétillant",
  "region": "Vallée de la Loire",
  "sousRegion": "effervescent",
  "type": "AOC"
 },
 {
  "id": "APP396",
  "nom": "Tursan",
  "region": "Sud-Ouest",
  "sousRegion": "proche de Madiran",
  "type": "AOC"
 },
 {
  "id": "APP397",
  "nom": "Vacqueyras",
  "region": "Vallée du Rhône",
  "sousRegion": "méridionale",
  "type": "AOC"
 },
 {
  "id": "APP398",
  "nom": "Valençay",
  "region": "Vallée de la Loire",
  "sousRegion": "AOC depuis 2003",
  "type": "AOC"
 },
 {
  "id": "APP399",
  "nom": "Ventoux",
  "region": "Vallée du Rhône",
  "sousRegion": "méridionale",
  "type": "AOC"
 },
 {
  "id": "APP400",
  "nom": "Vin de Savoie",
  "region": "Savoie",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP401",
  "nom": "Vin de Savoie (suivi d'un nom de cru)",
  "region": "Savoie",
  "sousRegion": "16 crus",
  "type": "AOC"
 },
 {
  "id": "APP402",
  "nom": "Vin de Savoie Mousseux",
  "region": "Savoie",
  "sousRegion": "effervescent",
  "type": "AOC"
 },
 {
  "id": "APP403",
  "nom": "Vin de Savoie Pétillant",
  "region": "Savoie",
  "sousRegion": "effervescent",
  "type": "AOC"
 },
 {
  "id": "APP404",
  "nom": "Vins d'Entraygues et du Fel",
  "region": "Sud-Ouest",
  "sousRegion": "Aveyron",
  "type": "AOC"
 },
 {
  "id": "APP405",
  "nom": "Vins d'Estaing",
  "region": "Sud-Ouest",
  "sousRegion": "Aveyron",
  "type": "AOC"
 },
 {
  "id": "APP406",
  "nom": "Vins de l'Orleanais",
  "region": "Vallée de la Loire",
  "sousRegion": "Centre-Loire",
  "type": "AOC"
 },
 {
  "id": "APP407",
  "nom": "Vins du Thouarsais",
  "region": "Vallée de la Loire",
  "sousRegion": null,
  "type": "AOC"
 },
 {
  "id": "APP408",
  "nom": "Vinsobres",
  "region": "Vallée du Rhône",
  "sousRegion": "depuis 2005",
  "type": "AOC"
 },
 {
  "id": "APP409",
  "nom": "Viré-Clessé",
  "region": "Bourgogne",
  "sousRegion": "Mâconnais",
  "type": "AOC"
 },
 {
  "id": "APP410",
  "nom": "Volnay",
  "region": "Bourgogne",
  "sousRegion": "Côte de Beaune",
  "type": "AOC"
 },
 {
  "id": "APP411",
  "nom": "Volnay Santenots",
  "region": "Bourgogne",
  "sousRegion": "Côte de Beaune",
  "type": "AOC"
 },
 {
  "id": "APP412",
  "nom": "Vosne-Romanée",
  "region": "Bourgogne",
  "sousRegion": "Côte de Nuits",
  "type": "AOC"
 },
 {
  "id": "APP413",
  "nom": "Vougeot",
  "region": "Bourgogne",
  "sousRegion": "Côte de Nuits",
  "type": "AOC"
 },
 {
  "id": "APP414",
  "nom": "Vouvray",
  "region": "Vallée de la Loire",
  "sousRegion": "Touraine",
  "type": "AOC"
 },
 {
  "id": "APP415",
  "nom": "Vouvray Mousseux",
  "region": "Vallée de la Loire",
  "sousRegion": "effervescent",
  "type": "AOC"
 },
 {
  "id": "APP416",
  "nom": "Vouvray Pétillant",
  "region": "Vallée de la Loire",
  "sousRegion": "effervescent",
  "type": "AOC"
 },
 {
  "id": "APP417",
  "nom": "Pic Saint-Loup",
  "region": "Languedoc",
  "sousRegion": "AOC 2017",
  "type": "AOC"
 },
 {
  "id": "APP418",
  "nom": "La Clape",
  "region": "Languedoc",
  "sousRegion": "AOC 2015",
  "type": "AOC"
 },
 {
  "id": "APP419",
  "nom": "Picpoul de Pinet",
  "region": "Languedoc",
  "sousRegion": "AOC 2013",
  "type": "AOC"
 },
 {
  "id": "APP420",
  "nom": "Terrasses du Larzac",
  "region": "Languedoc",
  "sousRegion": "AOC 2014",
  "type": "AOC"
 },
 {
  "id": "APP421",
  "nom": "Cairanne",
  "region": "Vallée du Rhône",
  "sousRegion": "AOC 2016",
  "type": "AOC"
 },
 {
  "id": "APP422",
  "nom": "Corrèze",
  "region": "Sud-Ouest",
  "sousRegion": "AOC 2023",
  "type": "AOC"
 },
 {
  "id": "APP423",
  "nom": "Sable de Camargue",
  "region": "Languedoc",
  "sousRegion": "AOC 2023",
  "type": "AOC"
 },
 {
  "id": "IGP001",
  "nom": "Agenais",
  "region": "Sud-Ouest",
  "sousRegion": "Lot-et-Garonne",
  "type": "IGP"
 },
 {
  "id": "IGP002",
  "nom": "Aigues",
  "region": "Provence",
  "sousRegion": "Bouches-du-Rhône",
  "type": "IGP"
 },
 {
  "id": "IGP003",
  "nom": "Ain",
  "region": "Vallée du Rhône",
  "sousRegion": "Ain",
  "type": "IGP"
 },
 {
  "id": "IGP004",
  "nom": "Allier",
  "region": "Centre",
  "sousRegion": "Allier",
  "type": "IGP"
 },
 {
  "id": "IGP005",
  "nom": "Allobrogie",
  "region": "Savoie",
  "sousRegion": "Haute-Savoie et Ain",
  "type": "IGP"
 },
 {
  "id": "IGP006",
  "nom": "Alpes-de-Haute-Provence",
  "region": "Sud-Est",
  "sousRegion": "Alpes-de-Haute-Provence",
  "type": "IGP"
 },
 {
  "id": "IGP007",
  "nom": "Alpes-Maritimes",
  "region": "Provence",
  "sousRegion": "Alpes-Maritimes",
  "type": "IGP"
 },
 {
  "id": "IGP008",
  "nom": "Ardailhou",
  "region": "Languedoc",
  "sousRegion": "Hérault",
  "type": "IGP"
 },
 {
  "id": "IGP009",
  "nom": "Ardèche",
  "region": "Vallée du Rhône",
  "sousRegion": "Ardèche",
  "type": "IGP"
 },
 {
  "id": "IGP010",
  "nom": "Argens",
  "region": "Provence",
  "sousRegion": "Var",
  "type": "IGP"
 },
 {
  "id": "IGP011",
  "nom": "Ariege",
  "region": "Sud-Ouest",
  "sousRegion": "Ariege",
  "type": "IGP"
 },
 {
  "id": "IGP012",
  "nom": "Aude",
  "region": "Languedoc",
  "sousRegion": "Aude",
  "type": "IGP"
 },
 {
  "id": "IGP013",
  "nom": "Aveyron",
  "region": "Sud-Ouest",
  "sousRegion": "Aveyron",
  "type": "IGP"
 },
 {
  "id": "IGP014",
  "nom": "Balmes dauphinoises",
  "region": "Savoie",
  "sousRegion": "Isère et Savoie",
  "type": "IGP"
 },
 {
  "id": "IGP015",
  "nom": "Benovie",
  "region": "Languedoc",
  "sousRegion": "Hérault",
  "type": "IGP"
 },
 {
  "id": "IGP016",
  "nom": "Berange",
  "region": "Languedoc",
  "sousRegion": "Hérault",
  "type": "IGP"
 },
 {
  "id": "IGP017",
  "nom": "Bessan",
  "region": "Languedoc",
  "sousRegion": "Hérault",
  "type": "IGP"
 },
 {
  "id": "IGP018",
  "nom": "Bigorre",
  "region": "Sud-Ouest",
  "sousRegion": "Hautes-Pyrénées",
  "type": "IGP"
 },
 {
  "id": "IGP019",
  "nom": "Bouches-du-Rhône",
  "region": "Provence",
  "sousRegion": "Bouches-du-Rhône",
  "type": "IGP"
 },
 {
  "id": "IGP020",
  "nom": "Bourbonnais",
  "region": "Vallée de la Loire",
  "sousRegion": "Allier",
  "type": "IGP"
 },
 {
  "id": "IGP021",
  "nom": "Calvados",
  "region": "Normandie",
  "sousRegion": "Calvados",
  "type": "IGP"
 },
 {
  "id": "IGP022",
  "nom": "Cassan",
  "region": "Languedoc",
  "sousRegion": "Hérault",
  "type": "IGP"
 },
 {
  "id": "IGP023",
  "nom": "Catalan",
  "region": "Roussillon",
  "sousRegion": "Pyrénées-Orientales",
  "type": "IGP"
 },
 {
  "id": "IGP024",
  "nom": "Cathare",
  "region": "Languedoc",
  "sousRegion": "Aude",
  "type": "IGP"
 },
 {
  "id": "IGP025",
  "nom": "Caux",
  "region": "Languedoc",
  "sousRegion": "Hérault",
  "type": "IGP"
 },
 {
  "id": "IGP026",
  "nom": "Cessenon",
  "region": "Languedoc",
  "sousRegion": "Hérault",
  "type": "IGP"
 },
 {
  "id": "IGP027",
  "nom": "Cevennes",
  "region": "Vallée du Rhône",
  "sousRegion": "Gard",
  "type": "IGP"
 },
 {
  "id": "IGP028",
  "nom": "Charentais",
  "region": "Charentes",
  "sousRegion": "Charente et Charente-Maritime",
  "type": "IGP"
 },
 {
  "id": "IGP029",
  "nom": "Charente",
  "region": "Charentes",
  "sousRegion": "Charente",
  "type": "IGP"
 },
 {
  "id": "IGP030",
  "nom": "Charente-Maritime",
  "region": "Charentes",
  "sousRegion": "Charente-Maritime",
  "type": "IGP"
 },
 {
  "id": "IGP031",
  "nom": "Cher",
  "region": "Vallée de la Loire",
  "sousRegion": "Cher",
  "type": "IGP"
 },
 {
  "id": "IGP032",
  "nom": "Cite de Carcassonne",
  "region": "Languedoc",
  "sousRegion": "Aude",
  "type": "IGP"
 },
 {
  "id": "IGP033",
  "nom": "Collines de la Moure",
  "region": "Languedoc",
  "sousRegion": "Hérault",
  "type": "IGP"
 },
 {
  "id": "IGP034",
  "nom": "Collines rhodaniennes",
  "region": "Vallée du Rhône",
  "sousRegion": "Drôme",
  "type": "IGP"
 },
 {
  "id": "IGP035",
  "nom": "Comte de Grignan",
  "region": "Vallée du Rhône",
  "sousRegion": "Drôme",
  "type": "IGP"
 },
 {
  "id": "IGP036",
  "nom": "Comte Tolosan",
  "region": "Sud-Ouest",
  "sousRegion": "Ariege, Aveyron, Haute-Garonne, Hautes-Pyrénées, Landes, Lot, Lot-et-Garonne, Pyrénées-Atlantiques, Tarn, Tarn-et-Garonne",
  "type": "IGP"
 },
 {
  "id": "IGP037",
  "nom": "Comtes rhodaniens",
  "region": "Vallée du Rhône",
  "sousRegion": "Loire, Rhône, Ain, Isère, Drôme, Ardèche",
  "type": "IGP"
 },
 {
  "id": "IGP038",
  "nom": "Condomois",
  "region": "Sud-Ouest",
  "sousRegion": "Gers",
  "type": "IGP"
 },
 {
  "id": "IGP039",
  "nom": "Corrèze",
  "region": "Sud-Ouest",
  "sousRegion": "Corrèze",
  "type": "IGP"
 },
 {
  "id": "IGP040",
  "nom": "Côte Vermeille",
  "region": "Roussillon",
  "sousRegion": "Pyrénées-Orientales",
  "type": "IGP"
 },
 {
  "id": "IGP041",
  "nom": "Coteaux charitois",
  "region": "Vallée de la Loire",
  "sousRegion": "Nièvre",
  "type": "IGP"
 },
 {
  "id": "IGP042",
  "nom": "Coteaux d'Enserune",
  "region": "Languedoc",
  "sousRegion": "Hérault",
  "type": "IGP"
 },
 {
  "id": "IGP043",
  "nom": "Coteaux de Coiffy",
  "region": "Est",
  "sousRegion": "Haute-Marne",
  "type": "IGP"
 },
 {
  "id": "IGP044",
  "nom": "Coteaux de l'Ardèche",
  "region": "Vallée du Rhône",
  "sousRegion": "Ardèche",
  "type": "IGP"
 },
 {
  "id": "IGP045",
  "nom": "Coteaux de l'Auxois",
  "region": "Bourgogne",
  "sousRegion": "Côte-d'Or",
  "type": "IGP"
 },
 {
  "id": "IGP046",
  "nom": "Coteaux de Bessilles",
  "region": "Languedoc",
  "sousRegion": "Hérault",
  "type": "IGP"
 },
 {
  "id": "IGP047",
  "nom": "Coteaux de Ceze",
  "region": "Languedoc",
  "sousRegion": "Gard",
  "type": "IGP"
 },
 {
  "id": "IGP048",
  "nom": "Coteaux de Fontcaude",
  "region": "Languedoc",
  "sousRegion": "Hérault",
  "type": "IGP"
 },
 {
  "id": "IGP049",
  "nom": "Coteaux de Glanes",
  "region": "Sud-Ouest",
  "sousRegion": "Lot",
  "type": "IGP"
 },
 {
  "id": "IGP050",
  "nom": "Coteaux de La Cabrerisse",
  "region": "Languedoc",
  "sousRegion": "Aude",
  "type": "IGP"
 },
 {
  "id": "IGP051",
  "nom": "Coteaux de Laurens",
  "region": "Languedoc",
  "sousRegion": "Hérault",
  "type": "IGP"
 },
 {
  "id": "IGP052",
  "nom": "Coteaux de Miramont",
  "region": "Languedoc",
  "sousRegion": "Aude",
  "type": "IGP"
 },
 {
  "id": "IGP053",
  "nom": "Coteaux de Montelimar",
  "region": "Vallée du Rhône",
  "sousRegion": "Drôme",
  "type": "IGP"
 },
 {
  "id": "IGP054",
  "nom": "Coteaux de Murviel",
  "region": "Languedoc",
  "sousRegion": "Hérault",
  "type": "IGP"
 },
 {
  "id": "IGP055",
  "nom": "Coteaux de Narbonne",
  "region": "Languedoc",
  "sousRegion": "Aude",
  "type": "IGP"
 },
 {
  "id": "IGP056",
  "nom": "Coteaux de Peyriac",
  "region": "Languedoc",
  "sousRegion": "Aude",
  "type": "IGP"
 },
 {
  "id": "IGP057",
  "nom": "Coteaux de Seyssuel",
  "region": "Vallée du Rhône",
  "sousRegion": "Isère",
  "type": "IGP"
 },
 {
  "id": "IGP058",
  "nom": "Coteaux de Tannay",
  "region": "Vallée de la Loire",
  "sousRegion": "Nièvre",
  "type": "IGP"
 },
 {
  "id": "IGP059",
  "nom": "Coteaux des Baronnies",
  "region": "Vallée du Rhône",
  "sousRegion": "Drôme",
  "type": "IGP"
 },
 {
  "id": "IGP060",
  "nom": "Coteaux des Fenouilledes",
  "region": "Roussillon",
  "sousRegion": "Pyrénées-Orientales",
  "type": "IGP"
 },
 {
  "id": "IGP061",
  "nom": "Coteaux du Cher et de l'Arnon",
  "region": "Vallée de la Loire",
  "sousRegion": "Cher",
  "type": "IGP"
 },
 {
  "id": "IGP062",
  "nom": "Coteaux du Gresivaudan",
  "region": "Savoie",
  "sousRegion": "Isère",
  "type": "IGP"
 },
 {
  "id": "IGP063",
  "nom": "Coteaux du Libron",
  "region": "Languedoc",
  "sousRegion": "Hérault",
  "type": "IGP"
 },
 {
  "id": "IGP064",
  "nom": "Coteaux du Littoral Audois",
  "region": "Languedoc",
  "sousRegion": "Aude",
  "type": "IGP"
 },
 {
  "id": "IGP065",
  "nom": "Coteaux du Pont du Gard",
  "region": "Languedoc",
  "sousRegion": "Gard",
  "type": "IGP"
 },
 {
  "id": "IGP066",
  "nom": "Coteaux du Salagou",
  "region": "Languedoc",
  "sousRegion": "Hérault",
  "type": "IGP"
 },
 {
  "id": "IGP067",
  "nom": "Coteaux du Verdon",
  "region": "Provence",
  "sousRegion": "Var",
  "type": "IGP"
 },
 {
  "id": "IGP068",
  "nom": "Coteaux et Terrasses de Montauban",
  "region": "Sud-Ouest",
  "sousRegion": "Tarn-et-Garonne",
  "type": "IGP"
 },
 {
  "id": "IGP069",
  "nom": "Coteaux Flaviens",
  "region": "Languedoc",
  "sousRegion": "Gard",
  "type": "IGP"
 },
 {
  "id": "IGP070",
  "nom": "Côtes catalanes",
  "region": "Roussillon",
  "sousRegion": "Pyrénées-Orientales",
  "type": "IGP"
 },
 {
  "id": "IGP071",
  "nom": "Côtes de Gascogne",
  "region": "Sud-Ouest",
  "sousRegion": "Gers",
  "type": "IGP"
 },
 {
  "id": "IGP072",
  "nom": "Côtes de Lastours",
  "region": "Languedoc",
  "sousRegion": "Aude",
  "type": "IGP"
 },
 {
  "id": "IGP073",
  "nom": "Côtes de Perignan",
  "region": "Languedoc",
  "sousRegion": "Aude",
  "type": "IGP"
 },
 {
  "id": "IGP074",
  "nom": "Côtes de Prouilhe",
  "region": "Languedoc",
  "sousRegion": "Aude",
  "type": "IGP"
 },
 {
  "id": "IGP075",
  "nom": "Côtes de Thau",
  "region": "Languedoc",
  "sousRegion": "Hérault",
  "type": "IGP"
 },
 {
  "id": "IGP076",
  "nom": "Côtes de Thongue",
  "region": "Languedoc",
  "sousRegion": "Hérault",
  "type": "IGP"
 },
 {
  "id": "IGP077",
  "nom": "Côtes du Brian",
  "region": "Languedoc",
  "sousRegion": "Hérault",
  "type": "IGP"
 },
 {
  "id": "IGP078",
  "nom": "Côtes du Ceressou",
  "region": "Languedoc",
  "sousRegion": "Hérault",
  "type": "IGP"
 },
 {
  "id": "IGP079",
  "nom": "Côtes du Tarn",
  "region": "Sud-Ouest",
  "sousRegion": "Tarn",
  "type": "IGP"
 },
 {
  "id": "IGP080",
  "nom": "Côtes du Vidourle",
  "region": "Languedoc",
  "sousRegion": "Gard",
  "type": "IGP"
 },
 {
  "id": "IGP081",
  "nom": "Creuse",
  "region": "Centre",
  "sousRegion": "Creuse",
  "type": "IGP"
 },
 {
  "id": "IGP082",
  "nom": "Cucugnan",
  "region": "Languedoc",
  "sousRegion": "Aude",
  "type": "IGP"
 },
 {
  "id": "IGP083",
  "nom": "Deux-Sevres",
  "region": "Vallée de la Loire",
  "sousRegion": "Deux-Sevres",
  "type": "IGP"
 },
 {
  "id": "IGP084",
  "nom": "Dordogne",
  "region": "Sud-Ouest",
  "sousRegion": "Dordogne",
  "type": "IGP"
 },
 {
  "id": "IGP085",
  "nom": "Doubs",
  "region": "Jura",
  "sousRegion": "Doubs",
  "type": "IGP"
 },
 {
  "id": "IGP086",
  "nom": "Drôme",
  "region": "Vallée du Rhône",
  "sousRegion": "Drôme",
  "type": "IGP"
 },
 {
  "id": "IGP087",
  "nom": "Duche d'Uzes",
  "region": "Languedoc",
  "sousRegion": "Gard",
  "type": "IGP"
 },
 {
  "id": "IGP088",
  "nom": "Franche-Comte",
  "region": "Jura",
  "sousRegion": "Doubs et Jura",
  "type": "IGP"
 },
 {
  "id": "IGP089",
  "nom": "Gard",
  "region": "Languedoc / Rhône",
  "sousRegion": "Gard",
  "type": "IGP"
 },
 {
  "id": "IGP090",
  "nom": "Gers",
  "region": "Sud-Ouest",
  "sousRegion": "Gers",
  "type": "IGP"
 },
 {
  "id": "IGP091",
  "nom": "Gorges de l'Hérault",
  "region": "Languedoc",
  "sousRegion": "Hérault",
  "type": "IGP"
 },
 {
  "id": "IGP092",
  "nom": "Haute-Garonne",
  "region": "Sud-Ouest",
  "sousRegion": "Haute-Garonne",
  "type": "IGP"
 },
 {
  "id": "IGP093",
  "nom": "Haute-Marne",
  "region": "Est",
  "sousRegion": "Haute-Marne",
  "type": "IGP"
 },
 {
  "id": "IGP094",
  "nom": "Haute-Saône",
  "region": "Est",
  "sousRegion": "Haute-Saône",
  "type": "IGP"
 },
 {
  "id": "IGP095",
  "nom": "Haute Vallée de l'Aude",
  "region": "Languedoc",
  "sousRegion": "Aude",
  "type": "IGP"
 },
 {
  "id": "IGP096",
  "nom": "Haute Vallée de l'Orb",
  "region": "Languedoc",
  "sousRegion": "Hérault",
  "type": "IGP"
 },
 {
  "id": "IGP097",
  "nom": "Haute-Vienne",
  "region": "Centre",
  "sousRegion": "Haute-Vienne",
  "type": "IGP"
 },
 {
  "id": "IGP098",
  "nom": "Hauterive",
  "region": "Languedoc",
  "sousRegion": "Aude",
  "type": "IGP"
 },
 {
  "id": "IGP099",
  "nom": "Hautes-Alpes",
  "region": "Sud-Est",
  "sousRegion": "Hautes-Alpes",
  "type": "IGP"
 },
 {
  "id": "IGP100",
  "nom": "Hautes-Pyrénées",
  "region": "Sud-Ouest",
  "sousRegion": "Hautes-Pyrénées",
  "type": "IGP"
 },
 {
  "id": "IGP101",
  "nom": "Hauts de Badens",
  "region": "Languedoc",
  "sousRegion": "Aude",
  "type": "IGP"
 },
 {
  "id": "IGP102",
  "nom": "Hérault",
  "region": "Languedoc",
  "sousRegion": "Hérault",
  "type": "IGP"
 },
 {
  "id": "IGP103",
  "nom": "Île de Beaute",
  "region": "Corse",
  "sousRegion": "Corse",
  "type": "IGP"
 },
 {
  "id": "IGP104",
  "nom": "Indre",
  "region": "Vallée de la Loire",
  "sousRegion": "Indre",
  "type": "IGP"
 },
 {
  "id": "IGP105",
  "nom": "Indre-et-Loire",
  "region": "Vallée de la Loire",
  "sousRegion": "Indre-et-Loire",
  "type": "IGP"
 },
 {
  "id": "IGP106",
  "nom": "Isère",
  "region": "Vallée du Rhône",
  "sousRegion": "Isère",
  "type": "IGP"
 },
 {
  "id": "IGP107",
  "nom": "Jardin de la France (Val de Loire)",
  "region": "Vallée de la Loire",
  "sousRegion": "13 départements ligeriens",
  "type": "IGP"
 },
 {
  "id": "IGP108",
  "nom": "Landes",
  "region": "Sud-Ouest",
  "sousRegion": "Landes",
  "type": "IGP"
 },
 {
  "id": "IGP109",
  "nom": "Loir-et-Cher",
  "region": "Vallée de la Loire",
  "sousRegion": "Loir-et-Cher",
  "type": "IGP"
 },
 {
  "id": "IGP110",
  "nom": "Loire-Atlantique",
  "region": "Vallée de la Loire",
  "sousRegion": "Loire-Atlantique",
  "type": "IGP"
 },
 {
  "id": "IGP111",
  "nom": "Loiret",
  "region": "Vallée de la Loire",
  "sousRegion": "Loiret",
  "type": "IGP"
 },
 {
  "id": "IGP112",
  "nom": "Lot",
  "region": "Sud-Ouest",
  "sousRegion": "Lot",
  "type": "IGP"
 },
 {
  "id": "IGP113",
  "nom": "Lot-et-Garonne",
  "region": "Sud-Ouest",
  "sousRegion": "Lot-et-Garonne",
  "type": "IGP"
 },
 {
  "id": "IGP114",
  "nom": "Maine-et-Loire",
  "region": "Vallée de la Loire",
  "sousRegion": "Maine-et-Loire",
  "type": "IGP"
 },
 {
  "id": "IGP115",
  "nom": "Marches de Bretagne",
  "region": "Bretagne",
  "sousRegion": "Loire-Atlantique, Ille-et-Vilaine",
  "type": "IGP"
 },
 {
  "id": "IGP116",
  "nom": "Maures",
  "region": "Provence",
  "sousRegion": "Var",
  "type": "IGP"
 },
 {
  "id": "IGP117",
  "nom": "Meuse",
  "region": "Est",
  "sousRegion": "Meuse",
  "type": "IGP"
 },
 {
  "id": "IGP118",
  "nom": "Mont Baudile",
  "region": "Languedoc",
  "sousRegion": "Hérault",
  "type": "IGP"
 },
 {
  "id": "IGP119",
  "nom": "Mont-Caume",
  "region": "Provence",
  "sousRegion": "Var",
  "type": "IGP"
 },
 {
  "id": "IGP120",
  "nom": "Montestruc",
  "region": "Sud-Ouest",
  "sousRegion": "Gers",
  "type": "IGP"
 },
 {
  "id": "IGP121",
  "nom": "Monts de la Grage",
  "region": "Languedoc",
  "sousRegion": "Hérault",
  "type": "IGP"
 },
 {
  "id": "IGP122",
  "nom": "Nièvre",
  "region": "Vallée de la Loire",
  "sousRegion": "Nièvre",
  "type": "IGP"
 },
 {
  "id": "IGP123",
  "nom": "Oc",
  "region": "Languedoc",
  "sousRegion": "Gard, Hérault, Aude, Pyrénées-Orientales",
  "type": "IGP"
 },
 {
  "id": "IGP124",
  "nom": "Perigord",
  "region": "Sud-Ouest",
  "sousRegion": "Dordogne",
  "type": "IGP"
 },
 {
  "id": "IGP125",
  "nom": "Petite Crau",
  "region": "Provence",
  "sousRegion": "Bouches-du-Rhône",
  "type": "IGP"
 },
 {
  "id": "IGP126",
  "nom": "Pezenas",
  "region": "Languedoc",
  "sousRegion": "Hérault",
  "type": "IGP"
 },
 {
  "id": "IGP127",
  "nom": "Portes de Méditerranée",
  "region": "Sud-Est",
  "sousRegion": "Hautes-Alpes, Vaucluse, Alpes-de-Haute-Provence, Alpes-Maritimes, Var",
  "type": "IGP"
 },
 {
  "id": "IGP128",
  "nom": "Principaute d'Orange",
  "region": "Vallée du Rhône",
  "sousRegion": "Vaucluse",
  "type": "IGP"
 },
 {
  "id": "IGP129",
  "nom": "Puy-de-Dôme",
  "region": "Centre",
  "sousRegion": "Puy-de-Dôme",
  "type": "IGP"
 },
 {
  "id": "IGP130",
  "nom": "Pyrénées-Atlantiques",
  "region": "Sud-Ouest",
  "sousRegion": "Pyrénées-Atlantiques",
  "type": "IGP"
 },
 {
  "id": "IGP131",
  "nom": "Pyrénées-Orientales",
  "region": "Roussillon",
  "sousRegion": "Pyrénées-Orientales",
  "type": "IGP"
 },
 {
  "id": "IGP132",
  "nom": "Sables du Golfe du Lion",
  "region": "Languedoc",
  "sousRegion": "Gard",
  "type": "IGP"
 },
 {
  "id": "IGP133",
  "nom": "Sainte Beaume",
  "region": "Provence",
  "sousRegion": "Var",
  "type": "IGP"
 },
 {
  "id": "IGP134",
  "nom": "Sainte-Marie-la-Blanche",
  "region": "Bourgogne",
  "sousRegion": "Côte-d'Or",
  "type": "IGP"
 },
 {
  "id": "IGP135",
  "nom": "Saône-et-Loire",
  "region": "Bourgogne",
  "sousRegion": "Saône-et-Loire",
  "type": "IGP"
 },
 {
  "id": "IGP136",
  "nom": "Sarthe",
  "region": "Vallée de la Loire",
  "sousRegion": "Sarthe",
  "type": "IGP"
 },
 {
  "id": "IGP137",
  "nom": "Seine-et-Marne",
  "region": "Est",
  "sousRegion": "Seine-et-Marne",
  "type": "IGP"
 },
 {
  "id": "IGP138",
  "nom": "Tarn",
  "region": "Sud-Ouest",
  "sousRegion": "Tarn",
  "type": "IGP"
 },
 {
  "id": "IGP139",
  "nom": "Tarn-et-Garonne",
  "region": "Sud-Ouest",
  "sousRegion": "Tarn-et-Garonne",
  "type": "IGP"
 },
 {
  "id": "IGP140",
  "nom": "Terroirs Landais",
  "region": "Sud-Ouest",
  "sousRegion": "Landes",
  "type": "IGP"
 },
 {
  "id": "IGP141",
  "nom": "Thezac-Perricard",
  "region": "Sud-Ouest",
  "sousRegion": "Lot-et-Garonne",
  "type": "IGP"
 },
 {
  "id": "IGP142",
  "nom": "Torgan",
  "region": "Languedoc",
  "sousRegion": "Aude",
  "type": "IGP"
 },
 {
  "id": "IGP143",
  "nom": "Urfe",
  "region": "Vallée de la Loire",
  "sousRegion": "Loire",
  "type": "IGP"
 },
 {
  "id": "IGP144",
  "nom": "Val de Cesse",
  "region": "Languedoc",
  "sousRegion": "Aude",
  "type": "IGP"
 },
 {
  "id": "IGP145",
  "nom": "Val de Dagne",
  "region": "Languedoc",
  "sousRegion": "Aude",
  "type": "IGP"
 },
 {
  "id": "IGP146",
  "nom": "Val de Montferrand",
  "region": "Languedoc",
  "sousRegion": "Hérault",
  "type": "IGP"
 },
 {
  "id": "IGP147",
  "nom": "Vallée du Paradis",
  "region": "Languedoc",
  "sousRegion": "Aude",
  "type": "IGP"
 },
 {
  "id": "IGP148",
  "nom": "Vals d'Agly",
  "region": "Roussillon",
  "sousRegion": "Pyrénées-Orientales",
  "type": "IGP"
 },
 {
  "id": "IGP149",
  "nom": "Var",
  "region": "Provence",
  "sousRegion": "Var",
  "type": "IGP"
 },
 {
  "id": "IGP150",
  "nom": "Vaucluse",
  "region": "Sud-Est",
  "sousRegion": "Vaucluse",
  "type": "IGP"
 },
 {
  "id": "IGP151",
  "nom": "Vaunage",
  "region": "Languedoc",
  "sousRegion": "Gard",
  "type": "IGP"
 },
 {
  "id": "IGP152",
  "nom": "Vendée",
  "region": "Vallée de la Loire",
  "sousRegion": "Vendée",
  "type": "IGP"
 },
 {
  "id": "IGP153",
  "nom": "Vicomte d'Aumelas",
  "region": "Languedoc",
  "sousRegion": "Hérault",
  "type": "IGP"
 },
 {
  "id": "IGP154",
  "nom": "Vienne",
  "region": "Vallée de la Loire",
  "sousRegion": "Vienne",
  "type": "IGP"
 },
 {
  "id": "IGP155",
  "nom": "Vistrenque",
  "region": "Languedoc",
  "sousRegion": "Gard",
  "type": "IGP"
 },
 {
  "id": "IGP156",
  "nom": "Yonne",
  "region": "Bourgogne",
  "sousRegion": "Yonne",
  "type": "IGP"
 },
 {
  "id": "IGP157",
  "nom": "Terres du Midi",
  "region": "Languedoc",
  "sousRegion": "IGP créée en 2023",
  "type": "IGP"
 }
]

// 120 appellations détaillées : cépages, sol, garde, hiérarchie.
export const APPELLATIONS_DETAIL = [
 {
  "id": "AOC001",
  "nom": "Pauillac",
  "region": "Bordeaux",
  "sousRegion": "Médoc",
  "couleurs": [
   "Rouge"
  ],
  "cepages": [
   "Cabernet Sauvignon",
   "Merlot",
   "Cabernet Franc"
  ],
  "sol": "Graves gunziennes",
  "garde": "15-50 ans",
  "hierarchie": "AOC communale - 3 Premiers Crus"
 },
 {
  "id": "AOC002",
  "nom": "Margaux",
  "region": "Bordeaux",
  "sousRegion": "Médoc",
  "couleurs": [
   "Rouge"
  ],
  "cepages": [
   "Cabernet Sauvignon",
   "Merlot",
   "Petit Verdot"
  ],
  "sol": "Graves fines",
  "garde": "12-40 ans",
  "hierarchie": "AOC communale"
 },
 {
  "id": "AOC003",
  "nom": "Saint-Julien",
  "region": "Bordeaux",
  "sousRegion": "Médoc",
  "couleurs": [
   "Rouge"
  ],
  "cepages": [
   "Cabernet Sauvignon",
   "Merlot"
  ],
  "sol": "Graves profondes",
  "garde": "12-40 ans",
  "hierarchie": "AOC communale"
 },
 {
  "id": "AOC004",
  "nom": "Saint-Estèphe",
  "region": "Bordeaux",
  "sousRegion": "Médoc",
  "couleurs": [
   "Rouge"
  ],
  "cepages": [
   "Cabernet Sauvignon",
   "Merlot"
  ],
  "sol": "Graves sur argile",
  "garde": "12-40 ans",
  "hierarchie": "AOC communale"
 },
 {
  "id": "AOC005",
  "nom": "Pessac-Léognan",
  "region": "Bordeaux",
  "sousRegion": "Graves",
  "couleurs": [
   "Rouge",
   "Blanc"
  ],
  "cepages": [
   "Cabernet Sauvignon",
   "Merlot",
   "Sauvignon",
   "Semillon"
  ],
  "sol": "Graves sableuses",
  "garde": "10-40 ans",
  "hierarchie": "AOC - Crus Classés de Graves"
 },
 {
  "id": "AOC006",
  "nom": "Saint-Émilion Grand Cru",
  "region": "Bordeaux",
  "sousRegion": "Libournais",
  "couleurs": [
   "Rouge"
  ],
  "cepages": [
   "Merlot",
   "Cabernet Franc"
  ],
  "sol": "Calcaire, argile, sable",
  "garde": "10-40 ans",
  "hierarchie": "Classement révisé ~10 ans"
 },
 {
  "id": "AOC007",
  "nom": "Pomerol",
  "region": "Bordeaux",
  "sousRegion": "Libournais",
  "couleurs": [
   "Rouge"
  ],
  "cepages": [
   "Merlot",
   "Cabernet Franc"
  ],
  "sol": "Argile bleue, crasse de fer",
  "garde": "10-50 ans",
  "hierarchie": "Pas de classement"
 },
 {
  "id": "AOC008",
  "nom": "Sauternes",
  "region": "Bordeaux",
  "sousRegion": "Sauternais",
  "couleurs": [
   "Blanc liquoreux"
  ],
  "cepages": [
   "Semillon",
   "Sauvignon",
   "Muscadelle"
  ],
  "sol": "Graves, argile",
  "garde": "20-100 ans",
  "hierarchie": "Classement 1855"
 },
 {
  "id": "AOC009",
  "nom": "Barsac",
  "region": "Bordeaux",
  "sousRegion": "Sauternais",
  "couleurs": [
   "Blanc liquoreux"
  ],
  "cepages": [
   "Semillon",
   "Sauvignon"
  ],
  "sol": "Calcaire",
  "garde": "20-80 ans",
  "hierarchie": "Classement 1855"
 },
 {
  "id": "AOC010",
  "nom": "Fronsac",
  "region": "Bordeaux",
  "sousRegion": "Libournais",
  "couleurs": [
   "Rouge"
  ],
  "cepages": [
   "Merlot",
   "Cabernet Franc"
  ],
  "sol": "Molasses du Fronsadais",
  "garde": "8-25 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC011",
  "nom": "Chablis Grand Cru",
  "region": "Bourgogne",
  "sousRegion": "Chablisien",
  "couleurs": [
   "Blanc"
  ],
  "cepages": [
   "Chardonnay"
  ],
  "sol": "Kimmeridgien",
  "garde": "10-30 ans",
  "hierarchie": "Grand Cru (7 climats)"
 },
 {
  "id": "AOC012",
  "nom": "Chablis Premier Cru",
  "region": "Bourgogne",
  "sousRegion": "Chablisien",
  "couleurs": [
   "Blanc"
  ],
  "cepages": [
   "Chardonnay"
  ],
  "sol": "Kimmeridgien",
  "garde": "5-20 ans",
  "hierarchie": "Premier Cru"
 },
 {
  "id": "AOC013",
  "nom": "Gevrey-Chambertin",
  "region": "Bourgogne",
  "sousRegion": "Côte de Nuits",
  "couleurs": [
   "Rouge"
  ],
  "cepages": [
   "Pinot Noir"
  ],
  "sol": "Calcaire, marnes",
  "garde": "10-40 ans",
  "hierarchie": "Communale + 9 GC"
 },
 {
  "id": "AOC014",
  "nom": "Vosne-Romanée",
  "region": "Bourgogne",
  "sousRegion": "Côte de Nuits",
  "couleurs": [
   "Rouge"
  ],
  "cepages": [
   "Pinot Noir"
  ],
  "sol": "Calcaire brun",
  "garde": "10-50 ans",
  "hierarchie": "Communale + 8 GC"
 },
 {
  "id": "AOC015",
  "nom": "Chambolle-Musigny",
  "region": "Bourgogne",
  "sousRegion": "Côte de Nuits",
  "couleurs": [
   "Rouge"
  ],
  "cepages": [
   "Pinot Noir"
  ],
  "sol": "Calcaire fin",
  "garde": "10-35 ans",
  "hierarchie": "Communale + 2 GC"
 },
 {
  "id": "AOC016",
  "nom": "Nuits-Saint-Georges",
  "region": "Bourgogne",
  "sousRegion": "Côte de Nuits",
  "couleurs": [
   "Rouge"
  ],
  "cepages": [
   "Pinot Noir"
  ],
  "sol": "Calcaire, graviers",
  "garde": "8-30 ans",
  "hierarchie": "Communale + 1ers Crus"
 },
 {
  "id": "AOC017",
  "nom": "Meursault",
  "region": "Bourgogne",
  "sousRegion": "Côte de Beaune",
  "couleurs": [
   "Blanc"
  ],
  "cepages": [
   "Chardonnay"
  ],
  "sol": "Marnes calcaires",
  "garde": "8-30 ans",
  "hierarchie": "Communale + 1ers Crus"
 },
 {
  "id": "AOC018",
  "nom": "Puligny-Montrachet",
  "region": "Bourgogne",
  "sousRegion": "Côte de Beaune",
  "couleurs": [
   "Blanc"
  ],
  "cepages": [
   "Chardonnay"
  ],
  "sol": "Calcaire actif",
  "garde": "10-30 ans",
  "hierarchie": "Communale + 4 GC"
 },
 {
  "id": "AOC019",
  "nom": "Chassagne-Montrachet",
  "region": "Bourgogne",
  "sousRegion": "Côte de Beaune",
  "couleurs": [
   "Blanc",
   "Rouge"
  ],
  "cepages": [
   "Chardonnay",
   "Pinot Noir"
  ],
  "sol": "Calcaire",
  "garde": "8-30 ans",
  "hierarchie": "Communale + 3 GC"
 },
 {
  "id": "AOC020",
  "nom": "Volnay",
  "region": "Bourgogne",
  "sousRegion": "Côte de Beaune",
  "couleurs": [
   "Rouge"
  ],
  "cepages": [
   "Pinot Noir"
  ],
  "sol": "Calcaire rouge",
  "garde": "8-25 ans",
  "hierarchie": "Communale + 1ers Crus"
 },
 {
  "id": "AOC021",
  "nom": "Pommard",
  "region": "Bourgogne",
  "sousRegion": "Côte de Beaune",
  "couleurs": [
   "Rouge"
  ],
  "cepages": [
   "Pinot Noir"
  ],
  "sol": "Argilo-calcaire",
  "garde": "10-30 ans",
  "hierarchie": "Communale + 1ers Crus"
 },
 {
  "id": "AOC022",
  "nom": "Corton-Charlemagne",
  "region": "Bourgogne",
  "sousRegion": "Côte de Beaune",
  "couleurs": [
   "Blanc"
  ],
  "cepages": [
   "Chardonnay"
  ],
  "sol": "Marnes blanches",
  "garde": "10-40 ans",
  "hierarchie": "Grand Cru"
 },
 {
  "id": "AOC023",
  "nom": "Romanée-Conti",
  "region": "Bourgogne",
  "sousRegion": "Côte de Nuits",
  "couleurs": [
   "Rouge"
  ],
  "cepages": [
   "Pinot Noir"
  ],
  "sol": "Calcaire, monopole",
  "garde": "20-60 ans",
  "hierarchie": "Grand Cru monopole"
 },
 {
  "id": "AOC024",
  "nom": "Montrachet",
  "region": "Bourgogne",
  "sousRegion": "Côte de Beaune",
  "couleurs": [
   "Blanc"
  ],
  "cepages": [
   "Chardonnay"
  ],
  "sol": "Calcaire",
  "garde": "15-50 ans",
  "hierarchie": "Grand Cru"
 },
 {
  "id": "AOC025",
  "nom": "Mercurey",
  "region": "Bourgogne",
  "sousRegion": "Côte Chalonnaise",
  "couleurs": [
   "Rouge",
   "Blanc"
  ],
  "cepages": [
   "Pinot Noir",
   "Chardonnay"
  ],
  "sol": "Marnes",
  "garde": "5-20 ans",
  "hierarchie": "Communale"
 },
 {
  "id": "AOC026",
  "nom": "Pouilly-Fuissé",
  "region": "Bourgogne",
  "sousRegion": "Mâconnais",
  "couleurs": [
   "Blanc"
  ],
  "cepages": [
   "Chardonnay"
  ],
  "sol": "Calcaire",
  "garde": "5-20 ans",
  "hierarchie": "AOC + 1ers Crus (2020)"
 },
 {
  "id": "AOC027",
  "nom": "Bouzeron",
  "region": "Bourgogne",
  "sousRegion": "Côte Chalonnaise",
  "couleurs": [
   "Blanc"
  ],
  "cepages": [
   "Aligoté"
  ],
  "sol": "Calcaire",
  "garde": "3-10 ans",
  "hierarchie": "Communale"
 },
 {
  "id": "AOC028",
  "nom": "Irancy",
  "region": "Bourgogne",
  "sousRegion": "Auxerrois",
  "couleurs": [
   "Rouge"
  ],
  "cepages": [
   "Pinot Noir",
   "Cesar"
  ],
  "sol": "Kimmeridgien",
  "garde": "5-15 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC029",
  "nom": "Morgon",
  "region": "Beaujolais",
  "sousRegion": "Beaujolais",
  "couleurs": [
   "Rouge"
  ],
  "cepages": [
   "Gamay"
  ],
  "sol": "Schistes, roche pourrie",
  "garde": "5-20 ans",
  "hierarchie": "Cru"
 },
 {
  "id": "AOC030",
  "nom": "Moulin-a-Vent",
  "region": "Beaujolais",
  "sousRegion": "Beaujolais",
  "couleurs": [
   "Rouge"
  ],
  "cepages": [
   "Gamay"
  ],
  "sol": "Granit rosé, manganese",
  "garde": "5-25 ans",
  "hierarchie": "Cru"
 },
 {
  "id": "AOC031",
  "nom": "Fleurie",
  "region": "Beaujolais",
  "sousRegion": "Beaujolais",
  "couleurs": [
   "Rouge"
  ],
  "cepages": [
   "Gamay"
  ],
  "sol": "Granit rosé",
  "garde": "3-12 ans",
  "hierarchie": "Cru"
 },
 {
  "id": "AOC032",
  "nom": "Brouilly",
  "region": "Beaujolais",
  "sousRegion": "Beaujolais",
  "couleurs": [
   "Rouge"
  ],
  "cepages": [
   "Gamay"
  ],
  "sol": "Granit, diorite",
  "garde": "2-8 ans",
  "hierarchie": "Cru"
 },
 {
  "id": "AOC033",
  "nom": "Côte de Brouilly",
  "region": "Beaujolais",
  "sousRegion": "Beaujolais",
  "couleurs": [
   "Rouge"
  ],
  "cepages": [
   "Gamay"
  ],
  "sol": "Roche bleue",
  "garde": "3-12 ans",
  "hierarchie": "Cru"
 },
 {
  "id": "AOC034",
  "nom": "Chiroubles",
  "region": "Beaujolais",
  "sousRegion": "Beaujolais",
  "couleurs": [
   "Rouge"
  ],
  "cepages": [
   "Gamay"
  ],
  "sol": "Granit sableux altitude",
  "garde": "2-8 ans",
  "hierarchie": "Cru"
 },
 {
  "id": "AOC035",
  "nom": "Juliénas",
  "region": "Beaujolais",
  "sousRegion": "Beaujolais",
  "couleurs": [
   "Rouge"
  ],
  "cepages": [
   "Gamay"
  ],
  "sol": "Schistes, argile",
  "garde": "3-12 ans",
  "hierarchie": "Cru"
 },
 {
  "id": "AOC036",
  "nom": "Saint-Amour",
  "region": "Beaujolais",
  "sousRegion": "Beaujolais",
  "couleurs": [
   "Rouge"
  ],
  "cepages": [
   "Gamay"
  ],
  "sol": "Granit, argile",
  "garde": "2-8 ans",
  "hierarchie": "Cru"
 },
 {
  "id": "AOC037",
  "nom": "Chénas",
  "region": "Beaujolais",
  "sousRegion": "Beaujolais",
  "couleurs": [
   "Rouge"
  ],
  "cepages": [
   "Gamay"
  ],
  "sol": "Granit",
  "garde": "3-15 ans",
  "hierarchie": "Cru"
 },
 {
  "id": "AOC038",
  "nom": "Régnié",
  "region": "Beaujolais",
  "sousRegion": "Beaujolais",
  "couleurs": [
   "Rouge"
  ],
  "cepages": [
   "Gamay"
  ],
  "sol": "Granit sableux",
  "garde": "2-8 ans",
  "hierarchie": "Cru"
 },
 {
  "id": "AOC039",
  "nom": "Côte-Rôtie",
  "region": "Rhône",
  "sousRegion": "Rhône Nord",
  "couleurs": [
   "Rouge"
  ],
  "cepages": [
   "Syrah",
   "Viognier (max 20%)"
  ],
  "sol": "Schistes, gneiss",
  "garde": "10-40 ans",
  "hierarchie": "AOC - lieux-dits"
 },
 {
  "id": "AOC040",
  "nom": "Condrieu",
  "region": "Rhône",
  "sousRegion": "Rhône Nord",
  "couleurs": [
   "Blanc"
  ],
  "cepages": [
   "Viognier"
  ],
  "sol": "Arzelle (granit décomposé)",
  "garde": "3-12 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC041",
  "nom": "Château-Grillet",
  "region": "Rhône",
  "sousRegion": "Rhône Nord",
  "couleurs": [
   "Blanc"
  ],
  "cepages": [
   "Viognier"
  ],
  "sol": "Granit",
  "garde": "5-20 ans",
  "hierarchie": "AOC monopole"
 },
 {
  "id": "AOC042",
  "nom": "Hermitage",
  "region": "Rhône",
  "sousRegion": "Rhône Nord",
  "couleurs": [
   "Rouge",
   "Blanc"
  ],
  "cepages": [
   "Syrah",
   "Marsanne",
   "Roussanne"
  ],
  "sol": "Granit, loess",
  "garde": "15-50 ans",
  "hierarchie": "AOC - lieux-dits"
 },
 {
  "id": "AOC043",
  "nom": "Crozes-Hermitage",
  "region": "Rhône",
  "sousRegion": "Rhône Nord",
  "couleurs": [
   "Rouge",
   "Blanc"
  ],
  "cepages": [
   "Syrah",
   "Marsanne"
  ],
  "sol": "Galets, loess",
  "garde": "5-20 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC044",
  "nom": "Cornas",
  "region": "Rhône",
  "sousRegion": "Rhône Nord",
  "couleurs": [
   "Rouge"
  ],
  "cepages": [
   "Syrah"
  ],
  "sol": "Granit",
  "garde": "10-35 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC045",
  "nom": "Saint-Joseph",
  "region": "Rhône",
  "sousRegion": "Rhône Nord",
  "couleurs": [
   "Rouge",
   "Blanc"
  ],
  "cepages": [
   "Syrah",
   "Marsanne",
   "Roussanne"
  ],
  "sol": "Granit",
  "garde": "5-25 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC046",
  "nom": "Saint-Péray",
  "region": "Rhône",
  "sousRegion": "Rhône Nord",
  "couleurs": [
   "Blanc",
   "Effervescent"
  ],
  "cepages": [
   "Marsanne",
   "Roussanne"
  ],
  "sol": "Granit, calcaire",
  "garde": "3-15 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC047",
  "nom": "Chateauneuf-du-Pape",
  "region": "Rhône",
  "sousRegion": "Rhône Sud",
  "couleurs": [
   "Rouge",
   "Blanc"
  ],
  "cepages": [
   "13 cépages (Grenache dominant)"
  ],
  "sol": "Galets roules, safres",
  "garde": "10-40 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC048",
  "nom": "Gigondas",
  "region": "Rhône",
  "sousRegion": "Rhône Sud",
  "couleurs": [
   "Rouge",
   "Rosé"
  ],
  "cepages": [
   "Grenache",
   "Syrah",
   "Mourvedre"
  ],
  "sol": "Calcaire, marnes",
  "garde": "8-25 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC049",
  "nom": "Vacqueyras",
  "region": "Rhône",
  "sousRegion": "Rhône Sud",
  "couleurs": [
   "Rouge",
   "Blanc",
   "Rosé"
  ],
  "cepages": [
   "Grenache",
   "Syrah"
  ],
  "sol": "Terrasses caillouteuses",
  "garde": "5-20 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC050",
  "nom": "Rasteau",
  "region": "Rhône",
  "sousRegion": "Rhône Sud",
  "couleurs": [
   "Rouge",
   "VDN"
  ],
  "cepages": [
   "Grenache"
  ],
  "sol": "Argilo-calcaire",
  "garde": "5-20 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC051",
  "nom": "Tavel",
  "region": "Rhône",
  "sousRegion": "Rhône Sud",
  "couleurs": [
   "Rosé uniquement"
  ],
  "cepages": [
   "Grenache",
   "Cinsault",
   "Clairette"
  ],
  "sol": "Galets, sable",
  "garde": "3-10 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC052",
  "nom": "Lirac",
  "region": "Rhône",
  "sousRegion": "Rhône Sud",
  "couleurs": [
   "Rouge",
   "Blanc",
   "Rosé"
  ],
  "cepages": [
   "Grenache",
   "Syrah",
   "Mourvedre"
  ],
  "sol": "Galets",
  "garde": "5-15 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC053",
  "nom": "Beaumes-de-Venise",
  "region": "Rhône",
  "sousRegion": "Rhône Sud",
  "couleurs": [
   "Rouge",
   "VDN Muscat"
  ],
  "cepages": [
   "Grenache",
   "Muscat"
  ],
  "sol": "Trias, calcaire",
  "garde": "5-20 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC054",
  "nom": "Vinsobres",
  "region": "Rhône",
  "sousRegion": "Rhône Sud",
  "couleurs": [
   "Rouge"
  ],
  "cepages": [
   "Grenache",
   "Syrah"
  ],
  "sol": "Argilo-calcaire",
  "garde": "5-15 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC055",
  "nom": "Cairanne",
  "region": "Rhône",
  "sousRegion": "Rhône Sud",
  "couleurs": [
   "Rouge",
   "Blanc"
  ],
  "cepages": [
   "Grenache",
   "Syrah",
   "Mourvedre"
  ],
  "sol": "Terrasses",
  "garde": "5-18 ans",
  "hierarchie": "AOC (2016)"
 },
 {
  "id": "AOC056",
  "nom": "Sancerre",
  "region": "Loire",
  "sousRegion": "Centre-Loire",
  "couleurs": [
   "Blanc",
   "Rouge",
   "Rosé"
  ],
  "cepages": [
   "Sauvignon Blanc",
   "Pinot Noir"
  ],
  "sol": "Terres blanches, caillottes, silex",
  "garde": "3-15 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC057",
  "nom": "Pouilly-Fumé",
  "region": "Loire",
  "sousRegion": "Centre-Loire",
  "couleurs": [
   "Blanc"
  ],
  "cepages": [
   "Sauvignon Blanc"
  ],
  "sol": "Silex, marnes kimmeridgiennes",
  "garde": "3-15 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC058",
  "nom": "Menetou-Salon",
  "region": "Loire",
  "sousRegion": "Centre-Loire",
  "couleurs": [
   "Blanc",
   "Rouge"
  ],
  "cepages": [
   "Sauvignon",
   "Pinot Noir"
  ],
  "sol": "Kimmeridgien",
  "garde": "3-10 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC059",
  "nom": "Quincy",
  "region": "Loire",
  "sousRegion": "Centre-Loire",
  "couleurs": [
   "Blanc"
  ],
  "cepages": [
   "Sauvignon Blanc"
  ],
  "sol": "Sables, graviers",
  "garde": "2-8 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC060",
  "nom": "Reuilly",
  "region": "Loire",
  "sousRegion": "Centre-Loire",
  "couleurs": [
   "Blanc",
   "Rouge",
   "Rosé"
  ],
  "cepages": [
   "Sauvignon",
   "Pinot Noir",
   "Pinot Gris"
  ],
  "sol": "Calcaire, sable",
  "garde": "2-10 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC061",
  "nom": "Vouvray",
  "region": "Loire",
  "sousRegion": "Touraine",
  "couleurs": [
   "Blanc sec a liquoreux",
   "Effervescent"
  ],
  "cepages": [
   "Chenin Blanc"
  ],
  "sol": "Tuffeau, perruches",
  "garde": "5-50 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC062",
  "nom": "Montlouis-sur-Loire",
  "region": "Loire",
  "sousRegion": "Touraine",
  "couleurs": [
   "Blanc",
   "Effervescent"
  ],
  "cepages": [
   "Chenin Blanc"
  ],
  "sol": "Tuffeau, sables",
  "garde": "5-30 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC063",
  "nom": "Chinon",
  "region": "Loire",
  "sousRegion": "Touraine",
  "couleurs": [
   "Rouge",
   "Blanc",
   "Rosé"
  ],
  "cepages": [
   "Cabernet Franc",
   "Chenin"
  ],
  "sol": "Graviers, tuffeau",
  "garde": "5-25 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC064",
  "nom": "Bourgueil",
  "region": "Loire",
  "sousRegion": "Touraine",
  "couleurs": [
   "Rouge",
   "Rosé"
  ],
  "cepages": [
   "Cabernet Franc"
  ],
  "sol": "Graviers, tuffeau",
  "garde": "5-25 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC065",
  "nom": "Saint-Nicolas-de-Bourgueil",
  "region": "Loire",
  "sousRegion": "Touraine",
  "couleurs": [
   "Rouge",
   "Rosé"
  ],
  "cepages": [
   "Cabernet Franc"
  ],
  "sol": "Sables, graviers",
  "garde": "3-20 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC066",
  "nom": "Savennières",
  "region": "Loire",
  "sousRegion": "Anjou",
  "couleurs": [
   "Blanc sec"
  ],
  "cepages": [
   "Chenin Blanc"
  ],
  "sol": "Schistes, rhyolite",
  "garde": "10-40 ans",
  "hierarchie": "AOC + Coulée de Serrant"
 },
 {
  "id": "AOC067",
  "nom": "Coteaux du Layon",
  "region": "Loire",
  "sousRegion": "Anjou",
  "couleurs": [
   "Blanc liquoreux"
  ],
  "cepages": [
   "Chenin Blanc"
  ],
  "sol": "Schistes",
  "garde": "15-60 ans",
  "hierarchie": "AOC + Villages"
 },
 {
  "id": "AOC068",
  "nom": "Quarts de Chaume",
  "region": "Loire",
  "sousRegion": "Anjou",
  "couleurs": [
   "Blanc liquoreux"
  ],
  "cepages": [
   "Chenin Blanc"
  ],
  "sol": "Schistes",
  "garde": "20-80 ans",
  "hierarchie": "Grand Cru"
 },
 {
  "id": "AOC069",
  "nom": "Bonnezeaux",
  "region": "Loire",
  "sousRegion": "Anjou",
  "couleurs": [
   "Blanc liquoreux"
  ],
  "cepages": [
   "Chenin Blanc"
  ],
  "sol": "Schistes",
  "garde": "20-70 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC070",
  "nom": "Saumur-Champigny",
  "region": "Loire",
  "sousRegion": "Saumur",
  "couleurs": [
   "Rouge"
  ],
  "cepages": [
   "Cabernet Franc"
  ],
  "sol": "Tuffeau",
  "garde": "5-20 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC071",
  "nom": "Muscadet Sèvre-et-Maine",
  "region": "Loire",
  "sousRegion": "Nantais",
  "couleurs": [
   "Blanc"
  ],
  "cepages": [
   "Melon de Bourgogne"
  ],
  "sol": "Gneiss, gabbro, schistes",
  "garde": "2-20 ans",
  "hierarchie": "AOC + Crus communaux"
 },
 {
  "id": "AOC072",
  "nom": "Cour-Cheverny",
  "region": "Loire",
  "sousRegion": "Touraine",
  "couleurs": [
   "Blanc"
  ],
  "cepages": [
   "Romorantin"
  ],
  "sol": "Argile a silex",
  "garde": "5-30 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC073",
  "nom": "Alsace Grand Cru",
  "region": "Alsace",
  "sousRegion": "Alsace",
  "couleurs": [
   "Blanc"
  ],
  "cepages": [
   "Riesling",
   "Gewurztraminer",
   "Pinot Gris",
   "Muscat"
  ],
  "sol": "51 terroirs varies",
  "garde": "10-40 ans",
  "hierarchie": "51 Grands Crus"
 },
 {
  "id": "AOC074",
  "nom": "Alsace",
  "region": "Alsace",
  "sousRegion": "Alsace",
  "couleurs": [
   "Blanc",
   "Rouge"
  ],
  "cepages": [
   "Tous cépages alsaciens"
  ],
  "sol": "Varie",
  "garde": "3-15 ans",
  "hierarchie": "AOC régionale"
 },
 {
  "id": "AOC075",
  "nom": "Crémant d'Alsace",
  "region": "Alsace",
  "sousRegion": "Alsace",
  "couleurs": [
   "Effervescent"
  ],
  "cepages": [
   "Pinot Blanc",
   "Auxerrois",
   "Chardonnay"
  ],
  "sol": "Varie",
  "garde": "2-8 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC076",
  "nom": "Champagne",
  "region": "Champagne",
  "sousRegion": "Marne, Aube, Aisne",
  "couleurs": [
   "Effervescent"
  ],
  "cepages": [
   "Chardonnay",
   "Pinot Noir",
   "Meunier"
  ],
  "sol": "Craie",
  "garde": "3-30 ans",
  "hierarchie": "AOC + Grands/Premiers Crus"
 },
 {
  "id": "AOC077",
  "nom": "Coteaux Champenois",
  "region": "Champagne",
  "sousRegion": "Champagne",
  "couleurs": [
   "Rouge",
   "Blanc"
  ],
  "cepages": [
   "Pinot Noir",
   "Chardonnay"
  ],
  "sol": "Craie",
  "garde": "3-15 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC078",
  "nom": "Bandol",
  "region": "Provence",
  "sousRegion": "Provence",
  "couleurs": [
   "Rouge",
   "Rosé",
   "Blanc"
  ],
  "cepages": [
   "Mourvedre (min 50%)"
  ],
  "sol": "Calcaire, gres",
  "garde": "10-30 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC079",
  "nom": "Côtes de Provence",
  "region": "Provence",
  "sousRegion": "Provence",
  "couleurs": [
   "Rosé",
   "Rouge",
   "Blanc"
  ],
  "cepages": [
   "Grenache",
   "Cinsault",
   "Syrah",
   "Rolle"
  ],
  "sol": "Calcaire, schistes",
  "garde": "2-10 ans",
  "hierarchie": "AOC + dénominations"
 },
 {
  "id": "AOC080",
  "nom": "Bellet",
  "region": "Provence",
  "sousRegion": "Nice",
  "couleurs": [
   "Rouge",
   "Blanc",
   "Rosé"
  ],
  "cepages": [
   "Braquet",
   "Folle Noire",
   "Rolle"
  ],
  "sol": "Poudingue",
  "garde": "5-15 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC081",
  "nom": "Cassis",
  "region": "Provence",
  "sousRegion": "Provence",
  "couleurs": [
   "Blanc",
   "Rosé"
  ],
  "cepages": [
   "Marsanne",
   "Clairette",
   "Ugni Blanc"
  ],
  "sol": "Calcaire",
  "garde": "3-10 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC082",
  "nom": "Palette",
  "region": "Provence",
  "sousRegion": "Aix",
  "couleurs": [
   "Rouge",
   "Blanc",
   "Rosé"
  ],
  "cepages": [
   "Mourvedre",
   "Grenache",
   "Clairette"
  ],
  "sol": "Calcaire de Langesse",
  "garde": "10-25 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC083",
  "nom": "Corbières",
  "region": "Languedoc",
  "sousRegion": "Aude",
  "couleurs": [
   "Rouge",
   "Blanc",
   "Rosé"
  ],
  "cepages": [
   "Carignan",
   "Grenache",
   "Syrah",
   "Mourvedre"
  ],
  "sol": "Schistes, calcaire",
  "garde": "5-20 ans",
  "hierarchie": "AOC + Boutenac"
 },
 {
  "id": "AOC084",
  "nom": "Minervois",
  "region": "Languedoc",
  "sousRegion": "Aude/Hérault",
  "couleurs": [
   "Rouge",
   "Blanc",
   "Rosé"
  ],
  "cepages": [
   "Syrah",
   "Grenache",
   "Carignan"
  ],
  "sol": "Galets, calcaire",
  "garde": "5-15 ans",
  "hierarchie": "AOC + La Livinière"
 },
 {
  "id": "AOC085",
  "nom": "Faugères",
  "region": "Languedoc",
  "sousRegion": "Hérault",
  "couleurs": [
   "Rouge",
   "Rosé",
   "Blanc"
  ],
  "cepages": [
   "Syrah",
   "Grenache",
   "Mourvedre"
  ],
  "sol": "Schistes",
  "garde": "5-20 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC086",
  "nom": "Saint-Chinian",
  "region": "Languedoc",
  "sousRegion": "Hérault",
  "couleurs": [
   "Rouge",
   "Blanc",
   "Rosé"
  ],
  "cepages": [
   "Syrah",
   "Grenache",
   "Mourvedre"
  ],
  "sol": "Schistes, calcaire",
  "garde": "5-18 ans",
  "hierarchie": "AOC + Roquebrun, Berlou"
 },
 {
  "id": "AOC087",
  "nom": "Pic Saint-Loup",
  "region": "Languedoc",
  "sousRegion": "Hérault",
  "couleurs": [
   "Rouge",
   "Rosé"
  ],
  "cepages": [
   "Syrah",
   "Grenache",
   "Mourvedre"
  ],
  "sol": "Calcaire, altitude",
  "garde": "5-20 ans",
  "hierarchie": "AOC (2017)"
 },
 {
  "id": "AOC088",
  "nom": "La Clape",
  "region": "Languedoc",
  "sousRegion": "Aude",
  "couleurs": [
   "Rouge",
   "Blanc"
  ],
  "cepages": [
   "Mourvedre",
   "Bourboulenc"
  ],
  "sol": "Calcaire maritime",
  "garde": "5-20 ans",
  "hierarchie": "AOC (2015)"
 },
 {
  "id": "AOC089",
  "nom": "Picpoul de Pinet",
  "region": "Languedoc",
  "sousRegion": "Hérault",
  "couleurs": [
   "Blanc"
  ],
  "cepages": [
   "Picpoul"
  ],
  "sol": "Calcaire, lagune",
  "garde": "1-5 ans",
  "hierarchie": "AOC (2013)"
 },
 {
  "id": "AOC090",
  "nom": "Limoux",
  "region": "Languedoc",
  "sousRegion": "Aude",
  "couleurs": [
   "Blanc",
   "Effervescent"
  ],
  "cepages": [
   "Mauzac",
   "Chardonnay",
   "Chenin"
  ],
  "sol": "Calcaire, altitude",
  "garde": "3-15 ans",
  "hierarchie": "AOC + Blanquette"
 },
 {
  "id": "AOC091",
  "nom": "Fitou",
  "region": "Languedoc",
  "sousRegion": "Aude",
  "couleurs": [
   "Rouge"
  ],
  "cepages": [
   "Carignan",
   "Grenache",
   "Mourvedre"
  ],
  "sol": "Schistes, calcaire",
  "garde": "5-20 ans",
  "hierarchie": "AOC (1948, 1ere du Languedoc)"
 },
 {
  "id": "AOC092",
  "nom": "Côtes du Roussillon Villages",
  "region": "Roussillon",
  "sousRegion": "Pyrénées-Orientales",
  "couleurs": [
   "Rouge"
  ],
  "cepages": [
   "Grenache",
   "Syrah",
   "Carignan",
   "Mourvedre"
  ],
  "sol": "Schistes, granit",
  "garde": "5-20 ans",
  "hierarchie": "AOC + 4 dénominations"
 },
 {
  "id": "AOC093",
  "nom": "Collioure",
  "region": "Roussillon",
  "sousRegion": "Côte Vermeille",
  "couleurs": [
   "Rouge",
   "Rosé",
   "Blanc"
  ],
  "cepages": [
   "Grenache",
   "Mourvedre",
   "Syrah"
  ],
  "sol": "Schistes en terrasses",
  "garde": "5-20 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC094",
  "nom": "Banyuls",
  "region": "Roussillon",
  "sousRegion": "Côte Vermeille",
  "couleurs": [
   "VDN"
  ],
  "cepages": [
   "Grenache Noir"
  ],
  "sol": "Schistes",
  "garde": "10-60 ans",
  "hierarchie": "AOC + Grand Cru"
 },
 {
  "id": "AOC095",
  "nom": "Maury",
  "region": "Roussillon",
  "sousRegion": "Agly",
  "couleurs": [
   "VDN",
   "Sec"
  ],
  "cepages": [
   "Grenache Noir"
  ],
  "sol": "Schistes noirs",
  "garde": "10-50 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC096",
  "nom": "Rivesaltes",
  "region": "Roussillon",
  "sousRegion": "Roussillon",
  "couleurs": [
   "VDN"
  ],
  "cepages": [
   "Grenache",
   "Macabeu",
   "Muscat"
  ],
  "sol": "Varie",
  "garde": "10-60 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC097",
  "nom": "Cahors",
  "region": "Sud-Ouest",
  "sousRegion": "Lot",
  "couleurs": [
   "Rouge"
  ],
  "cepages": [
   "Malbec (min 70%)"
  ],
  "sol": "Causses, terrasses du Lot",
  "garde": "8-30 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC098",
  "nom": "Madiran",
  "region": "Sud-Ouest",
  "sousRegion": "Gascogne",
  "couleurs": [
   "Rouge"
  ],
  "cepages": [
   "Tannat",
   "Cabernets"
  ],
  "sol": "Argilo-calcaire, galets",
  "garde": "10-30 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC099",
  "nom": "Jurançon",
  "region": "Sud-Ouest",
  "sousRegion": "Béarn",
  "couleurs": [
   "Blanc moelleux",
   "Sec"
  ],
  "cepages": [
   "Petit Manseng",
   "Gros Manseng"
  ],
  "sol": "Poudingues, argile",
  "garde": "10-40 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC100",
  "nom": "Gaillac",
  "region": "Sud-Ouest",
  "sousRegion": "Tarn",
  "couleurs": [
   "Rouge",
   "Blanc",
   "Effervescent"
  ],
  "cepages": [
   "Duras",
   "Braucol",
   "Mauzac",
   "Len de l'El"
  ],
  "sol": "Graves, calcaire",
  "garde": "3-15 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC101",
  "nom": "Fronton",
  "region": "Sud-Ouest",
  "sousRegion": "Haute-Garonne",
  "couleurs": [
   "Rouge",
   "Rosé"
  ],
  "cepages": [
   "Negrette"
  ],
  "sol": "Boulbenes, graves",
  "garde": "3-12 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC102",
  "nom": "Marcillac",
  "region": "Sud-Ouest",
  "sousRegion": "Aveyron",
  "couleurs": [
   "Rouge"
  ],
  "cepages": [
   "Fer Servadou"
  ],
  "sol": "Rougier (gres rouge)",
  "garde": "3-15 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC103",
  "nom": "Bergerac / Pécharmant",
  "region": "Sud-Ouest",
  "sousRegion": "Dordogne",
  "couleurs": [
   "Rouge",
   "Blanc"
  ],
  "cepages": [
   "Merlot",
   "Cabernets",
   "Semillon",
   "Sauvignon"
  ],
  "sol": "Graves, argile",
  "garde": "5-20 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC104",
  "nom": "Monbazillac",
  "region": "Sud-Ouest",
  "sousRegion": "Dordogne",
  "couleurs": [
   "Blanc liquoreux"
  ],
  "cepages": [
   "Semillon",
   "Sauvignon",
   "Muscadelle"
  ],
  "sol": "Argilo-calcaire",
  "garde": "10-50 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC105",
  "nom": "Irouléguy",
  "region": "Sud-Ouest",
  "sousRegion": "Pays Basque",
  "couleurs": [
   "Rouge",
   "Rosé",
   "Blanc"
  ],
  "cepages": [
   "Tannat",
   "Cabernets",
   "Mansengs"
  ],
  "sol": "Gres rouge, schistes",
  "garde": "5-20 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC106",
  "nom": "Arbois",
  "region": "Jura",
  "sousRegion": "Jura",
  "couleurs": [
   "Rouge",
   "Blanc",
   "Vin Jaune"
  ],
  "cepages": [
   "Poulsard",
   "Trousseau",
   "Savagnin",
   "Chardonnay"
  ],
  "sol": "Marnes",
  "garde": "5-50 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC107",
  "nom": "Château-Chalon",
  "region": "Jura",
  "sousRegion": "Jura",
  "couleurs": [
   "Vin Jaune uniquement"
  ],
  "cepages": [
   "Savagnin"
  ],
  "sol": "Marnes bleues",
  "garde": "20-100 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC108",
  "nom": "Côtes du Jura",
  "region": "Jura",
  "sousRegion": "Jura",
  "couleurs": [
   "Tous types"
  ],
  "cepages": [
   "Savagnin",
   "Chardonnay",
   "Poulsard",
   "Trousseau"
  ],
  "sol": "Marnes, calcaire",
  "garde": "5-50 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC109",
  "nom": "L'Étoile",
  "region": "Jura",
  "sousRegion": "Jura",
  "couleurs": [
   "Blanc",
   "Vin Jaune"
  ],
  "cepages": [
   "Chardonnay",
   "Savagnin"
  ],
  "sol": "Marnes a etoiles (fossiles)",
  "garde": "10-50 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC110",
  "nom": "Macvin du Jura",
  "region": "Jura",
  "sousRegion": "Jura",
  "couleurs": [
   "Vin de liqueur"
  ],
  "cepages": [
   "Cépages jurassiens + marc"
  ],
  "sol": "Marnes",
  "garde": "5-20 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC111",
  "nom": "Vin de Savoie",
  "region": "Savoie",
  "sousRegion": "Savoie",
  "couleurs": [
   "Blanc",
   "Rouge"
  ],
  "cepages": [
   "Jacquère",
   "Altesse",
   "Mondeuse"
  ],
  "sol": "Eboulis calcaires",
  "garde": "2-15 ans",
  "hierarchie": "AOC + 16 crus"
 },
 {
  "id": "AOC112",
  "nom": "Roussette de Savoie",
  "region": "Savoie",
  "sousRegion": "Savoie",
  "couleurs": [
   "Blanc"
  ],
  "cepages": [
   "Altesse"
  ],
  "sol": "Molasse, calcaire",
  "garde": "3-15 ans",
  "hierarchie": "AOC + 4 crus"
 },
 {
  "id": "AOC113",
  "nom": "Seyssel",
  "region": "Savoie",
  "sousRegion": "Savoie",
  "couleurs": [
   "Blanc",
   "Effervescent"
  ],
  "cepages": [
   "Altesse",
   "Molette"
  ],
  "sol": "Molasse",
  "garde": "2-10 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC114",
  "nom": "Patrimonio",
  "region": "Corse",
  "sousRegion": "Corse",
  "couleurs": [
   "Rouge",
   "Blanc",
   "Rosé"
  ],
  "cepages": [
   "Nielluccio",
   "Vermentino"
  ],
  "sol": "Calcaire",
  "garde": "5-20 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC115",
  "nom": "Ajaccio",
  "region": "Corse",
  "sousRegion": "Corse",
  "couleurs": [
   "Rouge",
   "Blanc",
   "Rosé"
  ],
  "cepages": [
   "Sciaccarellu",
   "Vermentino"
  ],
  "sol": "Granit",
  "garde": "5-15 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC116",
  "nom": "Muscat du Cap Corse",
  "region": "Corse",
  "sousRegion": "Corse",
  "couleurs": [
   "VDN"
  ],
  "cepages": [
   "Muscat a Petits Grains"
  ],
  "sol": "Schistes",
  "garde": "5-25 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC117",
  "nom": "Côtes du Rhône Villages",
  "region": "Rhône",
  "sousRegion": "Rhône Sud",
  "couleurs": [
   "Rouge",
   "Blanc",
   "Rosé"
  ],
  "cepages": [
   "Grenache",
   "Syrah",
   "Mourvedre"
  ],
  "sol": "Varie",
  "garde": "3-15 ans",
  "hierarchie": "AOC + 22 noms geographiques"
 },
 {
  "id": "AOC118",
  "nom": "Crémant de Bourgogne",
  "region": "Bourgogne",
  "sousRegion": "Bourgogne",
  "couleurs": [
   "Effervescent"
  ],
  "cepages": [
   "Chardonnay",
   "Pinot Noir",
   "Aligoté"
  ],
  "sol": "Calcaire",
  "garde": "2-10 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC119",
  "nom": "Crémant de Loire",
  "region": "Loire",
  "sousRegion": "Loire",
  "couleurs": [
   "Effervescent"
  ],
  "cepages": [
   "Chenin",
   "Chardonnay",
   "Cabernet Franc"
  ],
  "sol": "Tuffeau",
  "garde": "2-8 ans",
  "hierarchie": "AOC"
 },
 {
  "id": "AOC120",
  "nom": "Crémant du Jura",
  "region": "Jura",
  "sousRegion": "Jura",
  "couleurs": [
   "Effervescent"
  ],
  "cepages": [
   "Chardonnay",
   "Poulsard"
  ],
  "sol": "Marnes",
  "garde": "2-10 ans",
  "hierarchie": "AOC"
 }
]

// 580 profils : jauges /5, arômes, accords, prix, fiabilité du prix.
export const PROFILS_GOUT = [
 {
  "id": "PRF001",
  "appellation": "Ajaccio",
  "type": "AOC",
  "region": "Corse",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 3,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil ample, acidité fraîche, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Cerise",
   "maquis",
   "immortelle",
   "cuir"
  ],
  "accords": [
   "Charcuterie corse",
   "cabri",
   "brocciu",
   "agneau"
  ],
  "prixEntree": 15,
  "prixCoeur": 24,
  "prixHaut": 50,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF002",
  "appellation": "Aloxe-Corton",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 30,
  "prixCoeur": 48,
  "prixHaut": 120,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF003",
  "appellation": "Alsace (ou Vins d'Alsace)",
  "type": "AOC",
  "region": "Alsace",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 2,
  "intensite": 5,
  "garde": 4,
  "profil": "Profil ample, acidité vive. Garde estimée : 10-20 ans.",
  "aromes": [
   "Agrume",
   "fleur blanche",
   "litchi",
   "pétrole",
   "épices"
  ],
  "accords": [
   "Choucroute",
   "munster",
   "cuisine asiatique",
   "poissons fumes"
  ],
  "prixEntree": 10,
  "prixCoeur": 18,
  "prixHaut": 45,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF004",
  "appellation": "Alsace Klevener de Heiligenstein",
  "type": "AOC",
  "region": "Alsace",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 2,
  "intensite": 5,
  "garde": 4,
  "profil": "Profil ample, acidité vive. Garde estimée : 10-20 ans.",
  "aromes": [
   "Agrume",
   "fleur blanche",
   "litchi",
   "pétrole",
   "épices"
  ],
  "accords": [
   "Choucroute",
   "munster",
   "cuisine asiatique",
   "poissons fumes"
  ],
  "prixEntree": 10,
  "prixCoeur": 18,
  "prixHaut": 45,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF005",
  "appellation": "Alsace Edelzwicker",
  "type": "AOC",
  "region": "Alsace",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 2,
  "intensite": 5,
  "garde": 4,
  "profil": "Profil ample, acidité vive. Garde estimée : 10-20 ans.",
  "aromes": [
   "Agrume",
   "fleur blanche",
   "litchi",
   "pétrole",
   "épices"
  ],
  "accords": [
   "Choucroute",
   "munster",
   "cuisine asiatique",
   "poissons fumes"
  ],
  "prixEntree": 10,
  "prixCoeur": 18,
  "prixHaut": 45,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF006",
  "appellation": "Alsace Gentil",
  "type": "AOC",
  "region": "Alsace",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 2,
  "intensite": 5,
  "garde": 4,
  "profil": "Profil ample, acidité vive. Garde estimée : 10-20 ans.",
  "aromes": [
   "Agrume",
   "fleur blanche",
   "litchi",
   "pétrole",
   "épices"
  ],
  "accords": [
   "Choucroute",
   "munster",
   "cuisine asiatique",
   "poissons fumes"
  ],
  "prixEntree": 10,
  "prixCoeur": 18,
  "prixHaut": 45,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF007",
  "appellation": "Alsace Chasselas",
  "type": "AOC",
  "region": "Alsace",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 2,
  "intensite": 5,
  "garde": 4,
  "profil": "Profil ample, acidité vive. Garde estimée : 10-20 ans.",
  "aromes": [
   "Agrume",
   "fleur blanche",
   "litchi",
   "pétrole",
   "épices"
  ],
  "accords": [
   "Choucroute",
   "munster",
   "cuisine asiatique",
   "poissons fumes"
  ],
  "prixEntree": 10,
  "prixCoeur": 18,
  "prixHaut": 45,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF008",
  "appellation": "Alsace Gewurztraminer",
  "type": "AOC",
  "region": "Alsace",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 2,
  "intensite": 5,
  "garde": 4,
  "profil": "Profil ample, acidité vive. Garde estimée : 10-20 ans.",
  "aromes": [
   "Agrume",
   "fleur blanche",
   "litchi",
   "pétrole",
   "épices"
  ],
  "accords": [
   "Choucroute",
   "munster",
   "cuisine asiatique",
   "poissons fumes"
  ],
  "prixEntree": 12,
  "prixCoeur": 20,
  "prixHaut": 50,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF009",
  "appellation": "Alsace Muscat",
  "type": "AOC",
  "region": "Alsace",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 2,
  "intensite": 5,
  "garde": 4,
  "profil": "Profil ample, acidité vive. Garde estimée : 10-20 ans.",
  "aromes": [
   "Agrume",
   "fleur blanche",
   "litchi",
   "pétrole",
   "épices"
  ],
  "accords": [
   "Choucroute",
   "munster",
   "cuisine asiatique",
   "poissons fumes"
  ],
  "prixEntree": 10,
  "prixCoeur": 18,
  "prixHaut": 45,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF010",
  "appellation": "Alsace Pinot / Pinot Blanc / Klevner",
  "type": "AOC",
  "region": "Alsace",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 2,
  "intensite": 5,
  "garde": 4,
  "profil": "Profil ample, acidité vive. Garde estimée : 10-20 ans.",
  "aromes": [
   "Agrume",
   "fleur blanche",
   "litchi",
   "pétrole",
   "épices"
  ],
  "accords": [
   "Choucroute",
   "munster",
   "cuisine asiatique",
   "poissons fumes"
  ],
  "prixEntree": 10,
  "prixCoeur": 18,
  "prixHaut": 45,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF011",
  "appellation": "Alsace Pinot Gris",
  "type": "AOC",
  "region": "Alsace",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 2,
  "intensite": 5,
  "garde": 4,
  "profil": "Profil ample, acidité vive. Garde estimée : 10-20 ans.",
  "aromes": [
   "Agrume",
   "fleur blanche",
   "litchi",
   "pétrole",
   "épices"
  ],
  "accords": [
   "Choucroute",
   "munster",
   "cuisine asiatique",
   "poissons fumes"
  ],
  "prixEntree": 12,
  "prixCoeur": 20,
  "prixHaut": 50,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF012",
  "appellation": "Alsace Pinot Noir",
  "type": "AOC",
  "region": "Alsace",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 2,
  "intensite": 5,
  "garde": 4,
  "profil": "Profil ample, acidité vive. Garde estimée : 10-20 ans.",
  "aromes": [
   "Agrume",
   "fleur blanche",
   "litchi",
   "pétrole",
   "épices"
  ],
  "accords": [
   "Choucroute",
   "munster",
   "cuisine asiatique",
   "poissons fumes"
  ],
  "prixEntree": 10,
  "prixCoeur": 18,
  "prixHaut": 45,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF013",
  "appellation": "Alsace Riesling",
  "type": "AOC",
  "region": "Alsace",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 2,
  "intensite": 5,
  "garde": 4,
  "profil": "Profil ample, acidité vive. Garde estimée : 10-20 ans.",
  "aromes": [
   "Agrume",
   "fleur blanche",
   "litchi",
   "pétrole",
   "épices"
  ],
  "accords": [
   "Choucroute",
   "munster",
   "cuisine asiatique",
   "poissons fumes"
  ],
  "prixEntree": 11,
  "prixCoeur": 18,
  "prixHaut": 45,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF014",
  "appellation": "Alsace Sylvaner",
  "type": "AOC",
  "region": "Alsace",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 2,
  "intensite": 5,
  "garde": 4,
  "profil": "Profil ample, acidité vive. Garde estimée : 10-20 ans.",
  "aromes": [
   "Agrume",
   "fleur blanche",
   "litchi",
   "pétrole",
   "épices"
  ],
  "accords": [
   "Choucroute",
   "munster",
   "cuisine asiatique",
   "poissons fumes"
  ],
  "prixEntree": 10,
  "prixCoeur": 18,
  "prixHaut": 45,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF015",
  "appellation": "Alsace Grand Cru",
  "type": "AOC",
  "region": "Alsace",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 2,
  "intensite": 5,
  "garde": 4,
  "profil": "Profil ample, acidité vive. Garde estimée : 10-20 ans.",
  "aromes": [
   "Agrume",
   "fleur blanche",
   "litchi",
   "pétrole",
   "épices"
  ],
  "accords": [
   "Choucroute",
   "munster",
   "cuisine asiatique",
   "poissons fumes"
  ],
  "prixEntree": 22,
  "prixCoeur": 38,
  "prixHaut": 120,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF016",
  "appellation": "Anjou (ou Anjou Val de Loire)",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité vive, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Framboise",
   "mine de crayon",
   "poivron",
   "violette"
  ],
  "accords": [
   "Rillettes",
   "chèvre chaud",
   "veau",
   "cuisine légère"
  ],
  "prixEntree": 9,
  "prixCoeur": 16,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF017",
  "appellation": "Anjou-Coteaux de la Loire",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Blanc",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Coing",
   "agrume",
   "silex",
   "camomille",
   "miel"
  ],
  "accords": [
   "Huitres",
   "sandre au beurre blanc",
   "chèvre",
   "sushi"
  ],
  "prixEntree": 9,
  "prixCoeur": 17,
  "prixHaut": 45,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF018",
  "appellation": "Anjou Gamay",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité vive, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Framboise",
   "mine de crayon",
   "poivron",
   "violette"
  ],
  "accords": [
   "Rillettes",
   "chèvre chaud",
   "veau",
   "cuisine légère"
  ],
  "prixEntree": 9,
  "prixCoeur": 16,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF019",
  "appellation": "Anjou Mousseux",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Effervescent",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Pomme",
   "agrume",
   "brioche",
   "fleurs blanches",
   "craie"
  ],
  "accords": [
   "Aperitif",
   "huitres",
   "fruits de mer",
   "sushi"
  ],
  "prixEntree": 11,
  "prixCoeur": 18,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF020",
  "appellation": "Anjou-Villages",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité vive, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Framboise",
   "mine de crayon",
   "poivron",
   "violette"
  ],
  "accords": [
   "Rillettes",
   "chèvre chaud",
   "veau",
   "cuisine légère"
  ],
  "prixEntree": 8,
  "prixCoeur": 14,
  "prixHaut": 34,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF021",
  "appellation": "Anjou-Villages-Brissac",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité vive, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Framboise",
   "mine de crayon",
   "poivron",
   "violette"
  ],
  "accords": [
   "Rillettes",
   "chèvre chaud",
   "veau",
   "cuisine légère"
  ],
  "prixEntree": 8,
  "prixCoeur": 14,
  "prixHaut": 34,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF022",
  "appellation": "Arbois",
  "type": "AOC",
  "region": "Jura",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité vive, tanins souples. Garde estimée : 5-10 ans.",
  "aromes": [
   "Fruits rouges pales",
   "rosé fanée",
   "terre",
   "épices"
  ],
  "accords": [
   "Coq au vin jaune",
   "volaille",
   "comte jeune"
  ],
  "prixEntree": 15,
  "prixCoeur": 25,
  "prixHaut": 60,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF023",
  "appellation": "Arbois Pupillin",
  "type": "AOC",
  "region": "Jura",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité vive, tanins souples. Garde estimée : 5-10 ans.",
  "aromes": [
   "Fruits rouges pales",
   "rosé fanée",
   "terre",
   "épices"
  ],
  "accords": [
   "Coq au vin jaune",
   "volaille",
   "comte jeune"
  ],
  "prixEntree": 14,
  "prixCoeur": 24,
  "prixHaut": 55,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF024",
  "appellation": "Arbois Mousseux",
  "type": "AOC",
  "region": "Jura",
  "couleur": "Effervescent",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Pomme",
   "agrume",
   "brioche",
   "fleurs blanches",
   "craie"
  ],
  "accords": [
   "Aperitif",
   "huitres",
   "fruits de mer",
   "sushi"
  ],
  "prixEntree": 11,
  "prixCoeur": 18,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF025",
  "appellation": "Auxey-Duresses",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 22,
  "prixCoeur": 45,
  "prixHaut": 150,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF026",
  "appellation": "Bandol",
  "type": "AOC",
  "region": "Provence",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 5-10 ans.",
  "aromes": [
   "Mûre",
   "cuir",
   "gibier",
   "thym",
   "romarin"
  ],
  "accords": [
   "Viandes rouges grillées",
   "agneau",
   "gibier",
   "fromages a pate pressée"
  ],
  "prixEntree": 20,
  "prixCoeur": 35,
  "prixHaut": 90,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF027",
  "appellation": "Banyuls",
  "type": "AOC",
  "region": "Roussillon",
  "couleur": "VDN / Vin de liqueur",
  "puissance": 5,
  "acidite": 2,
  "tanin": 2,
  "sucrosite": 5,
  "intensite": 5,
  "garde": 5,
  "profil": "Profil très puissant, acidité équilibrée, sucrosite marquée équilibrée par l'acidité. Garde estimée : 20 ans et plus.",
  "aromes": [
   "Fruits confits",
   "cacao",
   "rancio",
   "noix",
   "épices"
  ],
  "accords": [
   "Chocolat noir",
   "desserts",
   "fromages bleus",
   "aperitif"
  ],
  "prixEntree": 15,
  "prixCoeur": 25,
  "prixHaut": 70,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF028",
  "appellation": "Banyuls Grand Cru",
  "type": "AOC",
  "region": "Roussillon",
  "couleur": "VDN / Vin de liqueur",
  "puissance": 5,
  "acidite": 2,
  "tanin": 2,
  "sucrosite": 5,
  "intensite": 5,
  "garde": 5,
  "profil": "Profil très puissant, acidité équilibrée, sucrosite marquée équilibrée par l'acidité. Garde estimée : 20 ans et plus.",
  "aromes": [
   "Fruits confits",
   "cacao",
   "rancio",
   "noix",
   "épices"
  ],
  "accords": [
   "Chocolat noir",
   "desserts",
   "fromages bleus",
   "aperitif"
  ],
  "prixEntree": 25,
  "prixCoeur": 40,
  "prixHaut": 110,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF029",
  "appellation": "Barsac",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Blanc liquoreux",
  "puissance": 4,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 5,
  "intensite": 5,
  "garde": 5,
  "profil": "Profil puissant, acidité vive, sucrosite marquée équilibrée par l'acidité. Garde estimée : 20 ans et plus.",
  "aromes": [
   "Miel",
   "abricot confit",
   "safran",
   "cire",
   "botrytis"
  ],
  "accords": [
   "Foie gras",
   "roquefort",
   "desserts aux fruits jaunes"
  ],
  "prixEntree": 20,
  "prixCoeur": 45,
  "prixHaut": 250,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF030",
  "appellation": "Bâtard-Montrachet",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive. Garde estimée : 10-20 ans.",
  "aromes": [
   "Agrumes",
   "beurre",
   "noisette",
   "pierre a fusil"
  ],
  "accords": [
   "Homard",
   "poissons en sauce",
   "volaille crémée",
   "comte"
  ],
  "prixEntree": 400,
  "prixCoeur": 650,
  "prixHaut": 1500,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF031",
  "appellation": "Béarn",
  "type": "AOC",
  "region": "Sud-Ouest",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 5,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins puissants. Garde estimée : 10-20 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 8,
  "prixCoeur": 15,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF032",
  "appellation": "Beaujolais",
  "type": "AOC",
  "region": "Beaujolais",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 2,
  "profil": "Profil moyen, acidité vive, tanins souples. Garde estimée : 3-6 ans.",
  "aromes": [
   "Fraise",
   "banane",
   "kirsch",
   "granit",
   "poivre"
  ],
  "accords": [
   "Charcuterie",
   "andouillette",
   "quenelles",
   "fromages frais"
  ],
  "prixEntree": 7,
  "prixCoeur": 11,
  "prixHaut": 22,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF033",
  "appellation": "Beaujolais-Villages",
  "type": "AOC",
  "region": "Beaujolais",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 2,
  "profil": "Profil moyen, acidité vive, tanins souples. Garde estimée : 3-6 ans.",
  "aromes": [
   "Fraise",
   "banane",
   "kirsch",
   "granit",
   "poivre"
  ],
  "accords": [
   "Charcuterie",
   "andouillette",
   "quenelles",
   "fromages frais"
  ],
  "prixEntree": 9,
  "prixCoeur": 13,
  "prixHaut": 26,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF034",
  "appellation": "Beaumes de Venise",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 10,
  "prixCoeur": 20,
  "prixHaut": 55,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF035",
  "appellation": "Beaune",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 28,
  "prixCoeur": 45,
  "prixHaut": 120,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF036",
  "appellation": "Bellet (ou Vins de Bellet)",
  "type": "AOC",
  "region": "Provence",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 3,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 2,
  "profil": "Profil ample, acidité fraîche. Garde estimée : 3-6 ans.",
  "aromes": [
   "Poire",
   "fenouil",
   "anis",
   "iode"
  ],
  "accords": [
   "Bouillabaisse",
   "aioli",
   "poissons grillés",
   "anchoiade"
  ],
  "prixEntree": 12,
  "prixCoeur": 20,
  "prixHaut": 45,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF037",
  "appellation": "Bergerac",
  "type": "AOC",
  "region": "Sud-Ouest",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 5,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins puissants. Garde estimée : 10-20 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 7,
  "prixCoeur": 11,
  "prixHaut": 25,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF038",
  "appellation": "Bergerac Sec",
  "type": "AOC",
  "region": "Sud-Ouest",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil ample, acidité vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Fruits exotiques",
   "agrume",
   "miel",
   "épices"
  ],
  "accords": [
   "Poissons",
   "fruits de mer",
   "volaille",
   "fromages de chèvre"
  ],
  "prixEntree": 9,
  "prixCoeur": 15,
  "prixHaut": 35,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF039",
  "appellation": "Bergerac Rosé",
  "type": "AOC",
  "region": "Sud-Ouest",
  "couleur": "Rosé",
  "puissance": 2,
  "acidite": 4,
  "tanin": 1,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil moyen, acidité vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fraise",
   "pêche",
   "agrume",
   "fleurs",
   "épices douces"
  ],
  "accords": [
   "Cuisine mediterraneenne",
   "grillades",
   "salades",
   "tapas"
  ],
  "prixEntree": 9,
  "prixCoeur": 15,
  "prixHaut": 32,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF040",
  "appellation": "Bienvenues-Bâtard-Montrachet",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive. Garde estimée : 10-20 ans.",
  "aromes": [
   "Agrumes",
   "beurre",
   "noisette",
   "pierre a fusil"
  ],
  "accords": [
   "Homard",
   "poissons en sauce",
   "volaille crémée",
   "comte"
  ],
  "prixEntree": 350,
  "prixCoeur": 550,
  "prixHaut": 1200,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF041",
  "appellation": "Blagny",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive. Garde estimée : 10-20 ans.",
  "aromes": [
   "Agrumes",
   "beurre",
   "noisette",
   "pierre a fusil"
  ],
  "accords": [
   "Homard",
   "poissons en sauce",
   "volaille crémée",
   "comte"
  ],
  "prixEntree": 16,
  "prixCoeur": 35,
  "prixHaut": 120,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF042",
  "appellation": "Blanquette de Limoux",
  "type": "AOC",
  "region": "Languedoc",
  "couleur": "Effervescent",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Pomme",
   "agrume",
   "brioche",
   "fleurs blanches",
   "craie"
  ],
  "accords": [
   "Aperitif",
   "huitres",
   "fruits de mer",
   "sushi"
  ],
  "prixEntree": 9,
  "prixCoeur": 13,
  "prixHaut": 25,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF043",
  "appellation": "Blanquette de Limoux methode ancestrale",
  "type": "AOC",
  "region": "Languedoc",
  "couleur": "Effervescent",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Pomme",
   "agrume",
   "brioche",
   "fleurs blanches",
   "craie"
  ],
  "accords": [
   "Aperitif",
   "huitres",
   "fruits de mer",
   "sushi"
  ],
  "prixEntree": 11,
  "prixCoeur": 18,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF044",
  "appellation": "Blaye",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Fruits noirs",
   "cèdre",
   "graphite",
   "tabac",
   "épices douces"
  ],
  "accords": [
   "Entrecote",
   "agneau de Pauillac",
   "canard",
   "fromages affinés"
  ],
  "prixEntree": 9,
  "prixCoeur": 18,
  "prixHaut": 45,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF045",
  "appellation": "Blaye Côtes de Bordeaux",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Fruits noirs",
   "cèdre",
   "graphite",
   "tabac",
   "épices douces"
  ],
  "accords": [
   "Entrecote",
   "agneau de Pauillac",
   "canard",
   "fromages affinés"
  ],
  "prixEntree": 8,
  "prixCoeur": 13,
  "prixHaut": 28,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF046",
  "appellation": "Bonnes-Mares",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 300,
  "prixCoeur": 450,
  "prixHaut": 900,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF047",
  "appellation": "Bonnezeaux",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Blanc liquoreux",
  "puissance": 4,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 5,
  "intensite": 5,
  "garde": 5,
  "profil": "Profil puissant, acidité vive, sucrosite marquée équilibrée par l'acidité. Garde estimée : 20 ans et plus.",
  "aromes": [
   "Miel",
   "abricot confit",
   "safran",
   "cire",
   "botrytis"
  ],
  "accords": [
   "Foie gras",
   "roquefort",
   "desserts aux fruits jaunes"
  ],
  "prixEntree": 22,
  "prixCoeur": 38,
  "prixHaut": 90,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF048",
  "appellation": "Bordeaux",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Fruits noirs",
   "cèdre",
   "graphite",
   "tabac",
   "épices douces"
  ],
  "accords": [
   "Entrecote",
   "agneau de Pauillac",
   "canard",
   "fromages affinés"
  ],
  "prixEntree": 6,
  "prixCoeur": 10,
  "prixHaut": 20,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF049",
  "appellation": "Bordeaux Clairet",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Rosé",
  "puissance": 2,
  "acidite": 4,
  "tanin": 1,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil moyen, acidité vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fraise",
   "pêche",
   "agrume",
   "fleurs",
   "épices douces"
  ],
  "accords": [
   "Cuisine mediterraneenne",
   "grillades",
   "salades",
   "tapas"
  ],
  "prixEntree": 9,
  "prixCoeur": 15,
  "prixHaut": 32,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF050",
  "appellation": "Bordeaux Côtes de Francs",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Fruits noirs",
   "cèdre",
   "graphite",
   "tabac",
   "épices douces"
  ],
  "accords": [
   "Entrecote",
   "agneau de Pauillac",
   "canard",
   "fromages affinés"
  ],
  "prixEntree": 9,
  "prixCoeur": 18,
  "prixHaut": 45,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF051",
  "appellation": "Bordeaux Rosé",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Fruits noirs",
   "cèdre",
   "graphite",
   "tabac",
   "épices douces"
  ],
  "accords": [
   "Entrecote",
   "agneau de Pauillac",
   "canard",
   "fromages affinés"
  ],
  "prixEntree": 9,
  "prixCoeur": 18,
  "prixHaut": 45,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF052",
  "appellation": "Bordeaux Sec",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Blanc",
  "puissance": 2,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 2,
  "profil": "Profil moyen, acidité vive. Garde estimée : 3-6 ans.",
  "aromes": [
   "Buis",
   "pamplemousse",
   "citron",
   "cire"
  ],
  "accords": [
   "Poissons",
   "fruits de mer",
   "volaille",
   "fromages de chèvre"
  ],
  "prixEntree": 8,
  "prixCoeur": 15,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF053",
  "appellation": "Bordeaux Supérieur",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Fruits noirs",
   "cèdre",
   "graphite",
   "tabac",
   "épices douces"
  ],
  "accords": [
   "Entrecote",
   "agneau de Pauillac",
   "canard",
   "fromages affinés"
  ],
  "prixEntree": 8,
  "prixCoeur": 13,
  "prixHaut": 30,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF054",
  "appellation": "Bourgogne",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 12,
  "prixCoeur": 18,
  "prixHaut": 35,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF055",
  "appellation": "Bourgogne Aligoté",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive. Garde estimée : 10-20 ans.",
  "aromes": [
   "Agrumes",
   "beurre",
   "noisette",
   "pierre a fusil"
  ],
  "accords": [
   "Homard",
   "poissons en sauce",
   "volaille crémée",
   "comte"
  ],
  "prixEntree": 10,
  "prixCoeur": 15,
  "prixHaut": 28,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF056",
  "appellation": "Bourgogne Aligoté Bouzeron",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive. Garde estimée : 10-20 ans.",
  "aromes": [
   "Agrumes",
   "beurre",
   "noisette",
   "pierre a fusil"
  ],
  "accords": [
   "Homard",
   "poissons en sauce",
   "volaille crémée",
   "comte"
  ],
  "prixEntree": 16,
  "prixCoeur": 35,
  "prixHaut": 120,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF057",
  "appellation": "Bourgogne Côte Chalonnaise",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 22,
  "prixCoeur": 45,
  "prixHaut": 150,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF058",
  "appellation": "Bourgogne Côte d'Auxerre",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 22,
  "prixCoeur": 45,
  "prixHaut": 150,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF059",
  "appellation": "Bourgogne Grand Ordinaire",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 22,
  "prixCoeur": 45,
  "prixHaut": 150,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF060",
  "appellation": "Bourgogne Hautes-Côtes de Beaune",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 22,
  "prixCoeur": 45,
  "prixHaut": 150,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF061",
  "appellation": "Bourgogne Hautes-Côtes de Nuits",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 22,
  "prixCoeur": 45,
  "prixHaut": 150,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF062",
  "appellation": "Bourgogne Mousseux",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Effervescent",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Pomme",
   "agrume",
   "brioche",
   "fleurs blanches",
   "craie"
  ],
  "accords": [
   "Aperitif",
   "huitres",
   "fruits de mer",
   "sushi"
  ],
  "prixEntree": 11,
  "prixCoeur": 18,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF063",
  "appellation": "Bourgogne Ordinaire",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 22,
  "prixCoeur": 45,
  "prixHaut": 150,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF064",
  "appellation": "Bourgogne Passetoutgrain",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 22,
  "prixCoeur": 45,
  "prixHaut": 150,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF065",
  "appellation": "Bourgogne Rosé / Clairet",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rosé",
  "puissance": 2,
  "acidite": 4,
  "tanin": 1,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil moyen, acidité vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fraise",
   "pêche",
   "agrume",
   "fleurs",
   "épices douces"
  ],
  "accords": [
   "Cuisine mediterraneenne",
   "grillades",
   "salades",
   "tapas"
  ],
  "prixEntree": 9,
  "prixCoeur": 15,
  "prixHaut": 32,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF066",
  "appellation": "Bourgogne Tonnerre",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 22,
  "prixCoeur": 45,
  "prixHaut": 150,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF067",
  "appellation": "Bourgogne Vézelay",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 22,
  "prixCoeur": 45,
  "prixHaut": 150,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF068",
  "appellation": "Bourgueil",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité vive, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Framboise",
   "mine de crayon",
   "poivron",
   "violette"
  ],
  "accords": [
   "Rillettes",
   "chèvre chaud",
   "veau",
   "cuisine légère"
  ],
  "prixEntree": 11,
  "prixCoeur": 17,
  "prixHaut": 45,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF069",
  "appellation": "Bouzeron",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive. Garde estimée : 10-20 ans.",
  "aromes": [
   "Agrumes",
   "beurre",
   "noisette",
   "pierre a fusil"
  ],
  "accords": [
   "Homard",
   "poissons en sauce",
   "volaille crémée",
   "comte"
  ],
  "prixEntree": 14,
  "prixCoeur": 20,
  "prixHaut": 35,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF070",
  "appellation": "Brouilly",
  "type": "AOC",
  "region": "Beaujolais",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 2,
  "profil": "Profil moyen, acidité vive, tanins souples. Garde estimée : 3-6 ans.",
  "aromes": [
   "Fraise",
   "banane",
   "kirsch",
   "granit",
   "poivre"
  ],
  "accords": [
   "Charcuterie",
   "andouillette",
   "quenelles",
   "fromages frais"
  ],
  "prixEntree": 11,
  "prixCoeur": 16,
  "prixHaut": 32,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF071",
  "appellation": "Bugey",
  "type": "AOC",
  "region": "Savoie",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil ample, acidité vive, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Poivre",
   "violette",
   "fruits noirs",
   "altitude"
  ],
  "accords": [
   "Viandes rouges grillées",
   "agneau",
   "gibier",
   "fromages a pate pressée"
  ],
  "prixEntree": 9,
  "prixCoeur": 14,
  "prixHaut": 28,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF072",
  "appellation": "Buzet",
  "type": "AOC",
  "region": "Sud-Ouest",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 5,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins puissants. Garde estimée : 10-20 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 7,
  "prixCoeur": 11,
  "prixHaut": 22,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF073",
  "appellation": "Cabardès",
  "type": "AOC",
  "region": "Languedoc",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 2,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil puissant, acidité équilibrée, tanins fermes. Garde estimée : 5-10 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 8,
  "prixCoeur": 14,
  "prixHaut": 35,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF074",
  "appellation": "Cabernet d'Anjou",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Rosé",
  "puissance": 2,
  "acidite": 4,
  "tanin": 1,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil moyen, acidité vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fraise",
   "pêche",
   "agrume",
   "fleurs",
   "épices douces"
  ],
  "accords": [
   "Cuisine mediterraneenne",
   "grillades",
   "salades",
   "tapas"
  ],
  "prixEntree": 9,
  "prixCoeur": 15,
  "prixHaut": 32,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF075",
  "appellation": "Cabernet de Saumur",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Rosé",
  "puissance": 2,
  "acidite": 4,
  "tanin": 1,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil moyen, acidité vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fraise",
   "pêche",
   "agrume",
   "fleurs",
   "épices douces"
  ],
  "accords": [
   "Cuisine mediterraneenne",
   "grillades",
   "salades",
   "tapas"
  ],
  "prixEntree": 9,
  "prixCoeur": 15,
  "prixHaut": 32,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF076",
  "appellation": "Cadillac",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Blanc liquoreux",
  "puissance": 4,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 5,
  "intensite": 5,
  "garde": 5,
  "profil": "Profil puissant, acidité vive, sucrosite marquée équilibrée par l'acidité. Garde estimée : 20 ans et plus.",
  "aromes": [
   "Miel",
   "abricot confit",
   "safran",
   "cire",
   "botrytis"
  ],
  "accords": [
   "Foie gras",
   "roquefort",
   "desserts aux fruits jaunes"
  ],
  "prixEntree": 15,
  "prixCoeur": 30,
  "prixHaut": 90,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF077",
  "appellation": "Cadillac Côtes de Bordeaux",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Blanc liquoreux",
  "puissance": 4,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 5,
  "intensite": 5,
  "garde": 5,
  "profil": "Profil puissant, acidité vive, sucrosite marquée équilibrée par l'acidité. Garde estimée : 20 ans et plus.",
  "aromes": [
   "Miel",
   "abricot confit",
   "safran",
   "cire",
   "botrytis"
  ],
  "accords": [
   "Foie gras",
   "roquefort",
   "desserts aux fruits jaunes"
  ],
  "prixEntree": 15,
  "prixCoeur": 30,
  "prixHaut": 90,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF078",
  "appellation": "Cahors",
  "type": "AOC",
  "region": "Sud-Ouest",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 5,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins puissants. Garde estimée : 10-20 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 9,
  "prixCoeur": 16,
  "prixHaut": 50,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF079",
  "appellation": "Canon-Fronsac",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Fruits noirs",
   "cèdre",
   "graphite",
   "tabac",
   "épices douces"
  ],
  "accords": [
   "Entrecote",
   "agneau de Pauillac",
   "canard",
   "fromages affinés"
  ],
  "prixEntree": 14,
  "prixCoeur": 24,
  "prixHaut": 60,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF080",
  "appellation": "Cassis",
  "type": "AOC",
  "region": "Provence",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 3,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 2,
  "profil": "Profil ample, acidité fraîche. Garde estimée : 3-6 ans.",
  "aromes": [
   "Poire",
   "fenouil",
   "anis",
   "iode"
  ],
  "accords": [
   "Bouillabaisse",
   "aioli",
   "poissons grillés",
   "anchoiade"
  ],
  "prixEntree": 18,
  "prixCoeur": 28,
  "prixHaut": 50,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF081",
  "appellation": "Castillon Côtes de Bordeaux",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Fruits noirs",
   "cèdre",
   "graphite",
   "tabac",
   "épices douces"
  ],
  "accords": [
   "Entrecote",
   "agneau de Pauillac",
   "canard",
   "fromages affinés"
  ],
  "prixEntree": 9,
  "prixCoeur": 18,
  "prixHaut": 45,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF082",
  "appellation": "Cérons",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Blanc liquoreux",
  "puissance": 4,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 5,
  "intensite": 5,
  "garde": 5,
  "profil": "Profil puissant, acidité vive, sucrosite marquée équilibrée par l'acidité. Garde estimée : 20 ans et plus.",
  "aromes": [
   "Miel",
   "abricot confit",
   "safran",
   "cire",
   "botrytis"
  ],
  "accords": [
   "Foie gras",
   "roquefort",
   "desserts aux fruits jaunes"
  ],
  "prixEntree": 15,
  "prixCoeur": 30,
  "prixHaut": 90,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF083",
  "appellation": "Chablis",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive. Garde estimée : 10-20 ans.",
  "aromes": [
   "Agrumes",
   "beurre",
   "noisette",
   "pierre a fusil"
  ],
  "accords": [
   "Homard",
   "poissons en sauce",
   "volaille crémée",
   "comte"
  ],
  "prixEntree": 16,
  "prixCoeur": 24,
  "prixHaut": 45,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF084",
  "appellation": "Chablis Grand Cru",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive. Garde estimée : 10-20 ans.",
  "aromes": [
   "Agrumes",
   "beurre",
   "noisette",
   "pierre a fusil"
  ],
  "accords": [
   "Homard",
   "poissons en sauce",
   "volaille crémée",
   "comte"
  ],
  "prixEntree": 55,
  "prixCoeur": 90,
  "prixHaut": 250,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF085",
  "appellation": "Chablis Premier Cru",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive. Garde estimée : 10-20 ans.",
  "aromes": [
   "Agrumes",
   "beurre",
   "noisette",
   "pierre a fusil"
  ],
  "accords": [
   "Homard",
   "poissons en sauce",
   "volaille crémée",
   "comte"
  ],
  "prixEntree": 28,
  "prixCoeur": 45,
  "prixHaut": 110,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF086",
  "appellation": "Chambertin",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 450,
  "prixCoeur": 800,
  "prixHaut": 1800,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF087",
  "appellation": "Chambertin-Clos de Bèze",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 400,
  "prixCoeur": 700,
  "prixHaut": 1600,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF088",
  "appellation": "Chambolle-Musigny",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 55,
  "prixCoeur": 100,
  "prixHaut": 350,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF089",
  "appellation": "Champagne",
  "type": "AOC",
  "region": "Champagne",
  "couleur": "Effervescent",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Pomme",
   "agrume",
   "brioche",
   "fleurs blanches",
   "craie"
  ],
  "accords": [
   "Aperitif",
   "huitres",
   "fruits de mer",
   "sushi"
  ],
  "prixEntree": 28,
  "prixCoeur": 45,
  "prixHaut": 200,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF090",
  "appellation": "Champagne Grand Cru",
  "type": "AOC",
  "region": "Champagne",
  "couleur": "Effervescent",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Pomme",
   "agrume",
   "brioche",
   "fleurs blanches",
   "craie"
  ],
  "accords": [
   "Aperitif",
   "huitres",
   "fruits de mer",
   "sushi"
  ],
  "prixEntree": 45,
  "prixCoeur": 80,
  "prixHaut": 500,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF091",
  "appellation": "Champagne Premier Cru",
  "type": "AOC",
  "region": "Champagne",
  "couleur": "Effervescent",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Pomme",
   "agrume",
   "brioche",
   "fleurs blanches",
   "craie"
  ],
  "accords": [
   "Aperitif",
   "huitres",
   "fruits de mer",
   "sushi"
  ],
  "prixEntree": 35,
  "prixCoeur": 60,
  "prixHaut": 300,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF092",
  "appellation": "Chapelle-Chambertin",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 180,
  "prixCoeur": 280,
  "prixHaut": 550,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF093",
  "appellation": "Charlemagne",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive. Garde estimée : 10-20 ans.",
  "aromes": [
   "Agrumes",
   "beurre",
   "noisette",
   "pierre a fusil"
  ],
  "accords": [
   "Homard",
   "poissons en sauce",
   "volaille crémée",
   "comte"
  ],
  "prixEntree": 140,
  "prixCoeur": 230,
  "prixHaut": 550,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF094",
  "appellation": "Charmes-Chambertin",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 160,
  "prixCoeur": 250,
  "prixHaut": 500,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF095",
  "appellation": "Chassagne-Montrachet",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 38,
  "prixCoeur": 65,
  "prixHaut": 200,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF096",
  "appellation": "Château-Chalon",
  "type": "AOC",
  "region": "Jura",
  "couleur": "Blanc",
  "puissance": 4,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 5,
  "garde": 5,
  "profil": "Profil puissant, acidité très vive. Garde estimée : 20 ans et plus.",
  "aromes": [
   "Noix",
   "curry",
   "pomme verte",
   "oxydatif"
  ],
  "accords": [
   "Comte affiné",
   "poulet aux morilles",
   "curry"
  ],
  "prixEntree": 45,
  "prixCoeur": 70,
  "prixHaut": 180,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF097",
  "appellation": "Château-Grillet",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Blanc",
  "puissance": 4,
  "acidite": 2,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 5,
  "garde": 3,
  "profil": "Profil puissant, acidité équilibrée. Garde estimée : 5-10 ans.",
  "aromes": [
   "Abricot",
   "pêche",
   "violette",
   "amande",
   "miel"
  ],
  "accords": [
   "Poissons riches",
   "volaille crémée",
   "cuisine épicée"
  ],
  "prixEntree": 150,
  "prixCoeur": 190,
  "prixHaut": 260,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF098",
  "appellation": "Châteaumeillant",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité vive, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Framboise",
   "mine de crayon",
   "poivron",
   "violette"
  ],
  "accords": [
   "Rillettes",
   "chèvre chaud",
   "veau",
   "cuisine légère"
  ],
  "prixEntree": 9,
  "prixCoeur": 16,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF099",
  "appellation": "Chateauneuf-du-Pape",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 28,
  "prixCoeur": 55,
  "prixHaut": 300,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF100",
  "appellation": "Châtillon-en-Diois",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 10,
  "prixCoeur": 20,
  "prixHaut": 55,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF101",
  "appellation": "Chénas",
  "type": "AOC",
  "region": "Beaujolais",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 2,
  "profil": "Profil moyen, acidité vive, tanins souples. Garde estimée : 3-6 ans.",
  "aromes": [
   "Fraise",
   "banane",
   "kirsch",
   "granit",
   "poivre"
  ],
  "accords": [
   "Charcuterie",
   "andouillette",
   "quenelles",
   "fromages frais"
  ],
  "prixEntree": 12,
  "prixCoeur": 18,
  "prixHaut": 38,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF102",
  "appellation": "Chevalier-Montrachet",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive. Garde estimée : 10-20 ans.",
  "aromes": [
   "Agrumes",
   "beurre",
   "noisette",
   "pierre a fusil"
  ],
  "accords": [
   "Homard",
   "poissons en sauce",
   "volaille crémée",
   "comte"
  ],
  "prixEntree": 500,
  "prixCoeur": 850,
  "prixHaut": 2000,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF103",
  "appellation": "Cheverny",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité vive, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Framboise",
   "mine de crayon",
   "poivron",
   "violette"
  ],
  "accords": [
   "Rillettes",
   "chèvre chaud",
   "veau",
   "cuisine légère"
  ],
  "prixEntree": 9,
  "prixCoeur": 16,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF104",
  "appellation": "Chinon",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité vive, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Framboise",
   "mine de crayon",
   "poivron",
   "violette"
  ],
  "accords": [
   "Rillettes",
   "chèvre chaud",
   "veau",
   "cuisine légère"
  ],
  "prixEntree": 11,
  "prixCoeur": 18,
  "prixHaut": 50,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF105",
  "appellation": "Chiroubles",
  "type": "AOC",
  "region": "Beaujolais",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 2,
  "profil": "Profil moyen, acidité vive, tanins souples. Garde estimée : 3-6 ans.",
  "aromes": [
   "Fraise",
   "banane",
   "kirsch",
   "granit",
   "poivre"
  ],
  "accords": [
   "Charcuterie",
   "andouillette",
   "quenelles",
   "fromages frais"
  ],
  "prixEntree": 11,
  "prixCoeur": 16,
  "prixHaut": 32,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF106",
  "appellation": "Chorey-les-Beaune",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 22,
  "prixCoeur": 45,
  "prixHaut": 150,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF107",
  "appellation": "Clairette de Bellegarde",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Rosé",
  "puissance": 2,
  "acidite": 4,
  "tanin": 1,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil moyen, acidité vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fraise",
   "pêche",
   "agrume",
   "fleurs",
   "épices douces"
  ],
  "accords": [
   "Cuisine mediterraneenne",
   "grillades",
   "salades",
   "tapas"
  ],
  "prixEntree": 9,
  "prixCoeur": 15,
  "prixHaut": 32,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF108",
  "appellation": "Clairette de Die",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Effervescent",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Pomme",
   "agrume",
   "brioche",
   "fleurs blanches",
   "craie"
  ],
  "accords": [
   "Aperitif",
   "huitres",
   "fruits de mer",
   "sushi"
  ],
  "prixEntree": 11,
  "prixCoeur": 18,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF109",
  "appellation": "Clairette du Languedoc",
  "type": "AOC",
  "region": "Languedoc",
  "couleur": "Rosé",
  "puissance": 2,
  "acidite": 4,
  "tanin": 1,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil moyen, acidité vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fraise",
   "pêche",
   "agrume",
   "fleurs",
   "épices douces"
  ],
  "accords": [
   "Cuisine mediterraneenne",
   "grillades",
   "salades",
   "tapas"
  ],
  "prixEntree": 9,
  "prixCoeur": 15,
  "prixHaut": 32,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF110",
  "appellation": "Clos de la Roche",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 220,
  "prixCoeur": 350,
  "prixHaut": 700,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF111",
  "appellation": "Clos de Tart",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 700,
  "prixCoeur": 1100,
  "prixHaut": 2200,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF112",
  "appellation": "Clos de Vougeot",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 150,
  "prixCoeur": 240,
  "prixHaut": 550,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF113",
  "appellation": "Clos des Lambrays",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 250,
  "prixCoeur": 400,
  "prixHaut": 800,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF114",
  "appellation": "Clos Saint-Denis",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 220,
  "prixCoeur": 350,
  "prixHaut": 750,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF115",
  "appellation": "Collioure",
  "type": "AOC",
  "region": "Roussillon",
  "couleur": "Rouge",
  "puissance": 5,
  "acidite": 2,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil très puissant, acidité équilibrée, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Fruits noirs confits",
   "schiste",
   "cacao",
   "épices"
  ],
  "accords": [
   "Viandes rouges grillées",
   "agneau",
   "gibier",
   "fromages a pate pressée"
  ],
  "prixEntree": 15,
  "prixCoeur": 25,
  "prixHaut": 55,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF116",
  "appellation": "Condrieu",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Blanc",
  "puissance": 4,
  "acidite": 2,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 5,
  "garde": 3,
  "profil": "Profil puissant, acidité équilibrée. Garde estimée : 5-10 ans.",
  "aromes": [
   "Abricot",
   "pêche",
   "violette",
   "amande",
   "miel"
  ],
  "accords": [
   "Poissons riches",
   "volaille crémée",
   "cuisine épicée"
  ],
  "prixEntree": 38,
  "prixCoeur": 65,
  "prixHaut": 200,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF117",
  "appellation": "Corbières",
  "type": "AOC",
  "region": "Languedoc",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 2,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil puissant, acidité équilibrée, tanins fermes. Garde estimée : 5-10 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 8,
  "prixCoeur": 13,
  "prixHaut": 35,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF118",
  "appellation": "Corbières-Boutenac",
  "type": "AOC",
  "region": "Languedoc",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 2,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil puissant, acidité équilibrée, tanins fermes. Garde estimée : 5-10 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 8,
  "prixCoeur": 14,
  "prixHaut": 35,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF119",
  "appellation": "Cornas",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 35,
  "prixCoeur": 70,
  "prixHaut": 200,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF120",
  "appellation": "Corse (ou Vin de Corse)",
  "type": "AOC",
  "region": "Corse",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 3,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil ample, acidité fraîche, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Cerise",
   "maquis",
   "immortelle",
   "cuir"
  ],
  "accords": [
   "Charcuterie corse",
   "cabri",
   "brocciu",
   "agneau"
  ],
  "prixEntree": 12,
  "prixCoeur": 20,
  "prixHaut": 45,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF121",
  "appellation": "Corse Calvi",
  "type": "AOC",
  "region": "Corse",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 3,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil ample, acidité fraîche, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Cerise",
   "maquis",
   "immortelle",
   "cuir"
  ],
  "accords": [
   "Charcuterie corse",
   "cabri",
   "brocciu",
   "agneau"
  ],
  "prixEntree": 12,
  "prixCoeur": 20,
  "prixHaut": 45,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF122",
  "appellation": "Corse Coteaux du Cap Corse",
  "type": "AOC",
  "region": "Corse",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 3,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil ample, acidité fraîche, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Cerise",
   "maquis",
   "immortelle",
   "cuir"
  ],
  "accords": [
   "Charcuterie corse",
   "cabri",
   "brocciu",
   "agneau"
  ],
  "prixEntree": 12,
  "prixCoeur": 20,
  "prixHaut": 45,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF123",
  "appellation": "Corse Figari",
  "type": "AOC",
  "region": "Corse",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 3,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil ample, acidité fraîche, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Cerise",
   "maquis",
   "immortelle",
   "cuir"
  ],
  "accords": [
   "Charcuterie corse",
   "cabri",
   "brocciu",
   "agneau"
  ],
  "prixEntree": 12,
  "prixCoeur": 20,
  "prixHaut": 45,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF124",
  "appellation": "Corse Porto-Vecchio",
  "type": "AOC",
  "region": "Corse",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 3,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil ample, acidité fraîche, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Cerise",
   "maquis",
   "immortelle",
   "cuir"
  ],
  "accords": [
   "Charcuterie corse",
   "cabri",
   "brocciu",
   "agneau"
  ],
  "prixEntree": 12,
  "prixCoeur": 20,
  "prixHaut": 45,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF125",
  "appellation": "Corse Sartène",
  "type": "AOC",
  "region": "Corse",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 3,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil ample, acidité fraîche, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Cerise",
   "maquis",
   "immortelle",
   "cuir"
  ],
  "accords": [
   "Charcuterie corse",
   "cabri",
   "brocciu",
   "agneau"
  ],
  "prixEntree": 12,
  "prixCoeur": 20,
  "prixHaut": 45,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF126",
  "appellation": "Corton",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 70,
  "prixCoeur": 120,
  "prixHaut": 300,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF127",
  "appellation": "Corton-Charlemagne",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive. Garde estimée : 10-20 ans.",
  "aromes": [
   "Agrumes",
   "beurre",
   "noisette",
   "pierre a fusil"
  ],
  "accords": [
   "Homard",
   "poissons en sauce",
   "volaille crémée",
   "comte"
  ],
  "prixEntree": 150,
  "prixCoeur": 250,
  "prixHaut": 600,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF128",
  "appellation": "Costières de Nîmes",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 8,
  "prixCoeur": 13,
  "prixHaut": 28,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF129",
  "appellation": "Côte de Beaune",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 22,
  "prixCoeur": 45,
  "prixHaut": 150,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF130",
  "appellation": "Côte de Brouilly",
  "type": "AOC",
  "region": "Beaujolais",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 2,
  "profil": "Profil moyen, acidité vive, tanins souples. Garde estimée : 3-6 ans.",
  "aromes": [
   "Fraise",
   "banane",
   "kirsch",
   "granit",
   "poivre"
  ],
  "accords": [
   "Charcuterie",
   "andouillette",
   "quenelles",
   "fromages frais"
  ],
  "prixEntree": 12,
  "prixCoeur": 18,
  "prixHaut": 38,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF131",
  "appellation": "Côte de Nuits-Villages",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 19,
  "prixCoeur": 38,
  "prixHaut": 128,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF132",
  "appellation": "Côte Roannaise",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité vive, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Framboise",
   "mine de crayon",
   "poivron",
   "violette"
  ],
  "accords": [
   "Rillettes",
   "chèvre chaud",
   "veau",
   "cuisine légère"
  ],
  "prixEntree": 9,
  "prixCoeur": 16,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF133",
  "appellation": "Côte-Rôtie",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 50,
  "prixCoeur": 105,
  "prixHaut": 600,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF134",
  "appellation": "Coteaux Champenois",
  "type": "AOC",
  "region": "Champagne",
  "couleur": "Effervescent",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Pomme",
   "agrume",
   "brioche",
   "fleurs blanches",
   "craie"
  ],
  "accords": [
   "Aperitif",
   "huitres",
   "fruits de mer",
   "sushi"
  ],
  "prixEntree": 30,
  "prixCoeur": 50,
  "prixHaut": 120,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF135",
  "appellation": "Coteaux d'Aix-en-Provence",
  "type": "AOC",
  "region": "Provence",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 5-10 ans.",
  "aromes": [
   "Mûre",
   "cuir",
   "gibier",
   "thym",
   "romarin"
  ],
  "accords": [
   "Viandes rouges grillées",
   "agneau",
   "gibier",
   "fromages a pate pressée"
  ],
  "prixEntree": 9,
  "prixCoeur": 15,
  "prixHaut": 35,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF136",
  "appellation": "Coteaux d'Ancenis",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité vive, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Framboise",
   "mine de crayon",
   "poivron",
   "violette"
  ],
  "accords": [
   "Rillettes",
   "chèvre chaud",
   "veau",
   "cuisine légère"
  ],
  "prixEntree": 9,
  "prixCoeur": 16,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF137",
  "appellation": "Coteaux de Die",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 10,
  "prixCoeur": 20,
  "prixHaut": 55,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF138",
  "appellation": "Coteaux de l'Aubance",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Blanc liquoreux",
  "puissance": 4,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 5,
  "intensite": 5,
  "garde": 5,
  "profil": "Profil puissant, acidité vive, sucrosite marquée équilibrée par l'acidité. Garde estimée : 20 ans et plus.",
  "aromes": [
   "Miel",
   "abricot confit",
   "safran",
   "cire",
   "botrytis"
  ],
  "accords": [
   "Foie gras",
   "roquefort",
   "desserts aux fruits jaunes"
  ],
  "prixEntree": 15,
  "prixCoeur": 30,
  "prixHaut": 90,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF139",
  "appellation": "Coteaux de Pierrevert",
  "type": "AOC",
  "region": "Provence",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 5-10 ans.",
  "aromes": [
   "Mûre",
   "cuir",
   "gibier",
   "thym",
   "romarin"
  ],
  "accords": [
   "Viandes rouges grillées",
   "agneau",
   "gibier",
   "fromages a pate pressée"
  ],
  "prixEntree": 12,
  "prixCoeur": 22,
  "prixHaut": 60,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF140",
  "appellation": "Coteaux de Saumur",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Blanc",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Coing",
   "agrume",
   "silex",
   "camomille",
   "miel"
  ],
  "accords": [
   "Huitres",
   "sandre au beurre blanc",
   "chèvre",
   "sushi"
  ],
  "prixEntree": 9,
  "prixCoeur": 17,
  "prixHaut": 45,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF141",
  "appellation": "Coteaux du Giennois",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité vive, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Framboise",
   "mine de crayon",
   "poivron",
   "violette"
  ],
  "accords": [
   "Rillettes",
   "chèvre chaud",
   "veau",
   "cuisine légère"
  ],
  "prixEntree": 9,
  "prixCoeur": 16,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF142",
  "appellation": "Coteaux du Languedoc",
  "type": "AOC",
  "region": "Languedoc",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 2,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil puissant, acidité équilibrée, tanins fermes. Garde estimée : 5-10 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 8,
  "prixCoeur": 14,
  "prixHaut": 35,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF143",
  "appellation": "Coteaux du Layon",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Blanc liquoreux",
  "puissance": 4,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 5,
  "intensite": 5,
  "garde": 5,
  "profil": "Profil puissant, acidité vive, sucrosite marquée équilibrée par l'acidité. Garde estimée : 20 ans et plus.",
  "aromes": [
   "Miel",
   "abricot confit",
   "safran",
   "cire",
   "botrytis"
  ],
  "accords": [
   "Foie gras",
   "roquefort",
   "desserts aux fruits jaunes"
  ],
  "prixEntree": 13,
  "prixCoeur": 22,
  "prixHaut": 60,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF144",
  "appellation": "Coteaux du Layon Beaulieu-sur-Layon",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Blanc liquoreux",
  "puissance": 4,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 5,
  "intensite": 5,
  "garde": 5,
  "profil": "Profil puissant, acidité vive, sucrosite marquée équilibrée par l'acidité. Garde estimée : 20 ans et plus.",
  "aromes": [
   "Miel",
   "abricot confit",
   "safran",
   "cire",
   "botrytis"
  ],
  "accords": [
   "Foie gras",
   "roquefort",
   "desserts aux fruits jaunes"
  ],
  "prixEntree": 15,
  "prixCoeur": 30,
  "prixHaut": 90,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF145",
  "appellation": "Coteaux du Layon Chaume",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Blanc liquoreux",
  "puissance": 4,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 5,
  "intensite": 5,
  "garde": 5,
  "profil": "Profil puissant, acidité vive, sucrosite marquée équilibrée par l'acidité. Garde estimée : 20 ans et plus.",
  "aromes": [
   "Miel",
   "abricot confit",
   "safran",
   "cire",
   "botrytis"
  ],
  "accords": [
   "Foie gras",
   "roquefort",
   "desserts aux fruits jaunes"
  ],
  "prixEntree": 15,
  "prixCoeur": 30,
  "prixHaut": 90,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF146",
  "appellation": "Coteaux du Layon Chaume Premier Cru",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Blanc liquoreux",
  "puissance": 4,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 5,
  "intensite": 5,
  "garde": 5,
  "profil": "Profil puissant, acidité vive, sucrosite marquée équilibrée par l'acidité. Garde estimée : 20 ans et plus.",
  "aromes": [
   "Miel",
   "abricot confit",
   "safran",
   "cire",
   "botrytis"
  ],
  "accords": [
   "Foie gras",
   "roquefort",
   "desserts aux fruits jaunes"
  ],
  "prixEntree": 30,
  "prixCoeur": 60,
  "prixHaut": 180,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF147",
  "appellation": "Coteaux du Layon Faye-d'Anjou",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Blanc liquoreux",
  "puissance": 4,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 5,
  "intensite": 5,
  "garde": 5,
  "profil": "Profil puissant, acidité vive, sucrosite marquée équilibrée par l'acidité. Garde estimée : 20 ans et plus.",
  "aromes": [
   "Miel",
   "abricot confit",
   "safran",
   "cire",
   "botrytis"
  ],
  "accords": [
   "Foie gras",
   "roquefort",
   "desserts aux fruits jaunes"
  ],
  "prixEntree": 15,
  "prixCoeur": 30,
  "prixHaut": 90,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF148",
  "appellation": "Coteaux du Layon Rablay-sur-Layon",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Blanc liquoreux",
  "puissance": 4,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 5,
  "intensite": 5,
  "garde": 5,
  "profil": "Profil puissant, acidité vive, sucrosite marquée équilibrée par l'acidité. Garde estimée : 20 ans et plus.",
  "aromes": [
   "Miel",
   "abricot confit",
   "safran",
   "cire",
   "botrytis"
  ],
  "accords": [
   "Foie gras",
   "roquefort",
   "desserts aux fruits jaunes"
  ],
  "prixEntree": 15,
  "prixCoeur": 30,
  "prixHaut": 90,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF149",
  "appellation": "Coteaux du Layon Rochefort-sur-Loire",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Blanc liquoreux",
  "puissance": 4,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 5,
  "intensite": 5,
  "garde": 5,
  "profil": "Profil puissant, acidité vive, sucrosite marquée équilibrée par l'acidité. Garde estimée : 20 ans et plus.",
  "aromes": [
   "Miel",
   "abricot confit",
   "safran",
   "cire",
   "botrytis"
  ],
  "accords": [
   "Foie gras",
   "roquefort",
   "desserts aux fruits jaunes"
  ],
  "prixEntree": 15,
  "prixCoeur": 30,
  "prixHaut": 90,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF150",
  "appellation": "Coteaux du Layon Saint-Aubin-de-Luigné",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Blanc liquoreux",
  "puissance": 4,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 5,
  "intensite": 5,
  "garde": 5,
  "profil": "Profil puissant, acidité vive, sucrosite marquée équilibrée par l'acidité. Garde estimée : 20 ans et plus.",
  "aromes": [
   "Miel",
   "abricot confit",
   "safran",
   "cire",
   "botrytis"
  ],
  "accords": [
   "Foie gras",
   "roquefort",
   "desserts aux fruits jaunes"
  ],
  "prixEntree": 15,
  "prixCoeur": 30,
  "prixHaut": 90,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF151",
  "appellation": "Coteaux du Layon Saint-Lambert-du-Lattay",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Blanc liquoreux",
  "puissance": 4,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 5,
  "intensite": 5,
  "garde": 5,
  "profil": "Profil puissant, acidité vive, sucrosite marquée équilibrée par l'acidité. Garde estimée : 20 ans et plus.",
  "aromes": [
   "Miel",
   "abricot confit",
   "safran",
   "cire",
   "botrytis"
  ],
  "accords": [
   "Foie gras",
   "roquefort",
   "desserts aux fruits jaunes"
  ],
  "prixEntree": 15,
  "prixCoeur": 30,
  "prixHaut": 90,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF152",
  "appellation": "Coteaux du Loir",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité vive, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Framboise",
   "mine de crayon",
   "poivron",
   "violette"
  ],
  "accords": [
   "Rillettes",
   "chèvre chaud",
   "veau",
   "cuisine légère"
  ],
  "prixEntree": 9,
  "prixCoeur": 16,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF153",
  "appellation": "Coteaux du Lyonnais",
  "type": "AOC",
  "region": "Beaujolais / Lyonnais",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 3,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil ample, acidité fraîche, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Fruits",
   "fleurs",
   "épices"
  ],
  "accords": [
   "Viandes rouges grillées",
   "agneau",
   "gibier",
   "fromages a pate pressée"
  ],
  "prixEntree": 9,
  "prixCoeur": 16,
  "prixHaut": 38,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF154",
  "appellation": "Coteaux du Quercy",
  "type": "AOC",
  "region": "Sud-Ouest",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 5,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins puissants. Garde estimée : 10-20 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 8,
  "prixCoeur": 15,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF155",
  "appellation": "Coteaux du Tricastin",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 10,
  "prixCoeur": 20,
  "prixHaut": 55,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF156",
  "appellation": "Coteaux du Vendômois",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité vive, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Framboise",
   "mine de crayon",
   "poivron",
   "violette"
  ],
  "accords": [
   "Rillettes",
   "chèvre chaud",
   "veau",
   "cuisine légère"
  ],
  "prixEntree": 9,
  "prixCoeur": 16,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF157",
  "appellation": "Coteaux Varois en Provence",
  "type": "AOC",
  "region": "Provence",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 5-10 ans.",
  "aromes": [
   "Mûre",
   "cuir",
   "gibier",
   "thym",
   "romarin"
  ],
  "accords": [
   "Viandes rouges grillées",
   "agneau",
   "gibier",
   "fromages a pate pressée"
  ],
  "prixEntree": 8,
  "prixCoeur": 13,
  "prixHaut": 28,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF158",
  "appellation": "Côtes d'Auvergne",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité vive, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Framboise",
   "mine de crayon",
   "poivron",
   "violette"
  ],
  "accords": [
   "Rillettes",
   "chèvre chaud",
   "veau",
   "cuisine légère"
  ],
  "prixEntree": 9,
  "prixCoeur": 16,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF159",
  "appellation": "Côtes d'Auvergne Boudes",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité vive, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Framboise",
   "mine de crayon",
   "poivron",
   "violette"
  ],
  "accords": [
   "Rillettes",
   "chèvre chaud",
   "veau",
   "cuisine légère"
  ],
  "prixEntree": 9,
  "prixCoeur": 16,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF160",
  "appellation": "Côtes d'Auvergne Chanturgue",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité vive, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Framboise",
   "mine de crayon",
   "poivron",
   "violette"
  ],
  "accords": [
   "Rillettes",
   "chèvre chaud",
   "veau",
   "cuisine légère"
  ],
  "prixEntree": 9,
  "prixCoeur": 16,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF161",
  "appellation": "Côtes d'Auvergne Châteaugay",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité vive, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Framboise",
   "mine de crayon",
   "poivron",
   "violette"
  ],
  "accords": [
   "Rillettes",
   "chèvre chaud",
   "veau",
   "cuisine légère"
  ],
  "prixEntree": 9,
  "prixCoeur": 16,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF162",
  "appellation": "Côtes d'Auvergne Corent",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité vive, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Framboise",
   "mine de crayon",
   "poivron",
   "violette"
  ],
  "accords": [
   "Rillettes",
   "chèvre chaud",
   "veau",
   "cuisine légère"
  ],
  "prixEntree": 9,
  "prixCoeur": 16,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF163",
  "appellation": "Côtes d'Auvergne Madargues",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité vive, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Framboise",
   "mine de crayon",
   "poivron",
   "violette"
  ],
  "accords": [
   "Rillettes",
   "chèvre chaud",
   "veau",
   "cuisine légère"
  ],
  "prixEntree": 9,
  "prixCoeur": 16,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF164",
  "appellation": "Côtes de Beaune-Villages",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 19,
  "prixCoeur": 38,
  "prixHaut": 128,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF165",
  "appellation": "Côtes de Bergerac",
  "type": "AOC",
  "region": "Sud-Ouest",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 5,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins puissants. Garde estimée : 10-20 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 8,
  "prixCoeur": 15,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF166",
  "appellation": "Côtes de Blaye",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Fruits noirs",
   "cèdre",
   "graphite",
   "tabac",
   "épices douces"
  ],
  "accords": [
   "Entrecote",
   "agneau de Pauillac",
   "canard",
   "fromages affinés"
  ],
  "prixEntree": 9,
  "prixCoeur": 18,
  "prixHaut": 45,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF167",
  "appellation": "Côtes de Bordeaux",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Fruits noirs",
   "cèdre",
   "graphite",
   "tabac",
   "épices douces"
  ],
  "accords": [
   "Entrecote",
   "agneau de Pauillac",
   "canard",
   "fromages affinés"
  ],
  "prixEntree": 9,
  "prixCoeur": 18,
  "prixHaut": 45,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF168",
  "appellation": "Côtes de Bordeaux Saint-Macaire",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Fruits noirs",
   "cèdre",
   "graphite",
   "tabac",
   "épices douces"
  ],
  "accords": [
   "Entrecote",
   "agneau de Pauillac",
   "canard",
   "fromages affinés"
  ],
  "prixEntree": 9,
  "prixCoeur": 18,
  "prixHaut": 45,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF169",
  "appellation": "Côtes de Bourg",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Fruits noirs",
   "cèdre",
   "graphite",
   "tabac",
   "épices douces"
  ],
  "accords": [
   "Entrecote",
   "agneau de Pauillac",
   "canard",
   "fromages affinés"
  ],
  "prixEntree": 9,
  "prixCoeur": 14,
  "prixHaut": 30,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF170",
  "appellation": "Côtes de Castillon",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Fruits noirs",
   "cèdre",
   "graphite",
   "tabac",
   "épices douces"
  ],
  "accords": [
   "Entrecote",
   "agneau de Pauillac",
   "canard",
   "fromages affinés"
  ],
  "prixEntree": 9,
  "prixCoeur": 18,
  "prixHaut": 45,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF171",
  "appellation": "Côtes de Duras",
  "type": "AOC",
  "region": "Sud-Ouest",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 5,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins puissants. Garde estimée : 10-20 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 7,
  "prixCoeur": 11,
  "prixHaut": 22,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF172",
  "appellation": "Côtes de Millau",
  "type": "AOC",
  "region": "Sud-Ouest",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 5,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins puissants. Garde estimée : 10-20 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 8,
  "prixCoeur": 15,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF173",
  "appellation": "Côtes de Montravel",
  "type": "AOC",
  "region": "Sud-Ouest",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil ample, acidité vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Fruits exotiques",
   "agrume",
   "miel",
   "épices"
  ],
  "accords": [
   "Poissons",
   "fruits de mer",
   "volaille",
   "fromages de chèvre"
  ],
  "prixEntree": 9,
  "prixCoeur": 15,
  "prixHaut": 35,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF174",
  "appellation": "Côtes de Provence",
  "type": "AOC",
  "region": "Provence",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 5-10 ans.",
  "aromes": [
   "Mûre",
   "cuir",
   "gibier",
   "thym",
   "romarin"
  ],
  "accords": [
   "Viandes rouges grillées",
   "agneau",
   "gibier",
   "fromages a pate pressée"
  ],
  "prixEntree": 9,
  "prixCoeur": 16,
  "prixHaut": 60,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF175",
  "appellation": "Côtes de Provence Fréjus",
  "type": "AOC",
  "region": "Provence",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 5-10 ans.",
  "aromes": [
   "Mûre",
   "cuir",
   "gibier",
   "thym",
   "romarin"
  ],
  "accords": [
   "Viandes rouges grillées",
   "agneau",
   "gibier",
   "fromages a pate pressée"
  ],
  "prixEntree": 12,
  "prixCoeur": 22,
  "prixHaut": 60,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF176",
  "appellation": "Côtes de Provence La Londe",
  "type": "AOC",
  "region": "Provence",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 5-10 ans.",
  "aromes": [
   "Mûre",
   "cuir",
   "gibier",
   "thym",
   "romarin"
  ],
  "accords": [
   "Viandes rouges grillées",
   "agneau",
   "gibier",
   "fromages a pate pressée"
  ],
  "prixEntree": 12,
  "prixCoeur": 22,
  "prixHaut": 60,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF177",
  "appellation": "Côtes de Provence Sainte-Victoire",
  "type": "AOC",
  "region": "Provence",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 5-10 ans.",
  "aromes": [
   "Mûre",
   "cuir",
   "gibier",
   "thym",
   "romarin"
  ],
  "accords": [
   "Viandes rouges grillées",
   "agneau",
   "gibier",
   "fromages a pate pressée"
  ],
  "prixEntree": 12,
  "prixCoeur": 22,
  "prixHaut": 60,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF178",
  "appellation": "Côtes de Saint-Mont",
  "type": "AOC",
  "region": "Sud-Ouest",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 5,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins puissants. Garde estimée : 10-20 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 8,
  "prixCoeur": 15,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF179",
  "appellation": "Côtes de Toul",
  "type": "AOC",
  "region": "Lorraine / Est",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 3,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil ample, acidité fraîche, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Fruits",
   "fleurs",
   "épices"
  ],
  "accords": [
   "Viandes rouges grillées",
   "agneau",
   "gibier",
   "fromages a pate pressée"
  ],
  "prixEntree": 11,
  "prixCoeur": 16,
  "prixHaut": 28,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF180",
  "appellation": "Côtes du Brulhois",
  "type": "AOC",
  "region": "Sud-Ouest",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 5,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins puissants. Garde estimée : 10-20 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 8,
  "prixCoeur": 15,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF181",
  "appellation": "Côtes du Forez",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité vive, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Framboise",
   "mine de crayon",
   "poivron",
   "violette"
  ],
  "accords": [
   "Rillettes",
   "chèvre chaud",
   "veau",
   "cuisine légère"
  ],
  "prixEntree": 9,
  "prixCoeur": 16,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF182",
  "appellation": "Côtes du Frontonnais (Fronton)",
  "type": "AOC",
  "region": "Sud-Ouest",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 5,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins puissants. Garde estimée : 10-20 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 8,
  "prixCoeur": 13,
  "prixHaut": 28,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF183",
  "appellation": "Côtes du Jura",
  "type": "AOC",
  "region": "Jura",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité vive, tanins souples. Garde estimée : 5-10 ans.",
  "aromes": [
   "Fruits rouges pales",
   "rosé fanée",
   "terre",
   "épices"
  ],
  "accords": [
   "Coq au vin jaune",
   "volaille",
   "comte jeune"
  ],
  "prixEntree": 15,
  "prixCoeur": 25,
  "prixHaut": 60,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF184",
  "appellation": "Côtes du Jura Mousseux",
  "type": "AOC",
  "region": "Jura",
  "couleur": "Effervescent",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Pomme",
   "agrume",
   "brioche",
   "fleurs blanches",
   "craie"
  ],
  "accords": [
   "Aperitif",
   "huitres",
   "fruits de mer",
   "sushi"
  ],
  "prixEntree": 11,
  "prixCoeur": 18,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF185",
  "appellation": "Côtes du Marmandais",
  "type": "AOC",
  "region": "Sud-Ouest",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 5,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins puissants. Garde estimée : 10-20 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 8,
  "prixCoeur": 15,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF186",
  "appellation": "Côtes du Rhône",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 7,
  "prixCoeur": 11,
  "prixHaut": 22,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF187",
  "appellation": "Côtes du Rhône-Villages",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 9,
  "prixCoeur": 15,
  "prixHaut": 32,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF188",
  "appellation": "Côtes du Rhône-Villages Beaumes-de-Venise",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 8,
  "prixCoeur": 17,
  "prixHaut": 47,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF189",
  "appellation": "Côtes du Rhône-Villages Cairanne",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 8,
  "prixCoeur": 17,
  "prixHaut": 47,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF190",
  "appellation": "Côtes du Rhône-Villages Chusclan",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 8,
  "prixCoeur": 17,
  "prixHaut": 47,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF191",
  "appellation": "Côtes du Rhône-Villages Laudun",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 8,
  "prixCoeur": 17,
  "prixHaut": 47,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF192",
  "appellation": "Côtes du Rhône-Villages Rasteau",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 8,
  "prixCoeur": 17,
  "prixHaut": 47,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF193",
  "appellation": "Côtes du Rhône-Villages Roaix",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 8,
  "prixCoeur": 17,
  "prixHaut": 47,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF194",
  "appellation": "Côtes du Rhône-Villages Rochegude",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 8,
  "prixCoeur": 17,
  "prixHaut": 47,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF195",
  "appellation": "Côtes du Rhône-Villages Rousset-les-Vignes",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 8,
  "prixCoeur": 17,
  "prixHaut": 47,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF196",
  "appellation": "Côtes du Rhône-Villages Sablet",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 8,
  "prixCoeur": 17,
  "prixHaut": 47,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF197",
  "appellation": "Côtes du Rhône-Villages Saint-Gervais",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 8,
  "prixCoeur": 17,
  "prixHaut": 47,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF198",
  "appellation": "Côtes du Rhône-Villages Saint-Maurice",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 8,
  "prixCoeur": 17,
  "prixHaut": 47,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF199",
  "appellation": "Côtes du Rhône-Villages Saint-Pantaleon-les-Vignes",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 8,
  "prixCoeur": 17,
  "prixHaut": 47,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF200",
  "appellation": "Côtes du Rhône-Villages Séguret",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 8,
  "prixCoeur": 17,
  "prixHaut": 47,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF201",
  "appellation": "Côtes du Rhône-Villages Valréas",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 8,
  "prixCoeur": 17,
  "prixHaut": 47,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF202",
  "appellation": "Côtes du Rhône-Villages Vinsobres",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 8,
  "prixCoeur": 17,
  "prixHaut": 47,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF203",
  "appellation": "Côtes du Rhône-Villages Visan",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 8,
  "prixCoeur": 17,
  "prixHaut": 47,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF204",
  "appellation": "Côtes du Roussillon",
  "type": "AOC",
  "region": "Roussillon",
  "couleur": "Rouge",
  "puissance": 5,
  "acidite": 2,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil très puissant, acidité équilibrée, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Fruits noirs confits",
   "schiste",
   "cacao",
   "épices"
  ],
  "accords": [
   "Viandes rouges grillées",
   "agneau",
   "gibier",
   "fromages a pate pressée"
  ],
  "prixEntree": 8,
  "prixCoeur": 13,
  "prixHaut": 30,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF205",
  "appellation": "Côtes du Roussillon Les Aspres",
  "type": "AOC",
  "region": "Roussillon",
  "couleur": "Rouge",
  "puissance": 5,
  "acidite": 2,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil très puissant, acidité équilibrée, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Fruits noirs confits",
   "schiste",
   "cacao",
   "épices"
  ],
  "accords": [
   "Viandes rouges grillées",
   "agneau",
   "gibier",
   "fromages a pate pressée"
  ],
  "prixEntree": 9,
  "prixCoeur": 16,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF206",
  "appellation": "Côtes du Roussillon-Villages",
  "type": "AOC",
  "region": "Roussillon",
  "couleur": "Rouge",
  "puissance": 5,
  "acidite": 2,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil très puissant, acidité équilibrée, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Fruits noirs confits",
   "schiste",
   "cacao",
   "épices"
  ],
  "accords": [
   "Viandes rouges grillées",
   "agneau",
   "gibier",
   "fromages a pate pressée"
  ],
  "prixEntree": 10,
  "prixCoeur": 16,
  "prixHaut": 40,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF207",
  "appellation": "Côtes du Vivarais",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 10,
  "prixCoeur": 20,
  "prixHaut": 55,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF208",
  "appellation": "Cour-Cheverny",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Blanc",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Coing",
   "agrume",
   "silex",
   "camomille",
   "miel"
  ],
  "accords": [
   "Huitres",
   "sandre au beurre blanc",
   "chèvre",
   "sushi"
  ],
  "prixEntree": 12,
  "prixCoeur": 18,
  "prixHaut": 40,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF209",
  "appellation": "Crémant d'Alsace",
  "type": "AOC",
  "region": "Alsace",
  "couleur": "Effervescent",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Pomme",
   "agrume",
   "brioche",
   "fleurs blanches",
   "craie"
  ],
  "accords": [
   "Aperitif",
   "huitres",
   "fruits de mer",
   "sushi"
  ],
  "prixEntree": 11,
  "prixCoeur": 16,
  "prixHaut": 35,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF210",
  "appellation": "Crémant de Bordeaux",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Effervescent",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Pomme",
   "agrume",
   "brioche",
   "fleurs blanches",
   "craie"
  ],
  "accords": [
   "Aperitif",
   "huitres",
   "fruits de mer",
   "sushi"
  ],
  "prixEntree": 10,
  "prixCoeur": 14,
  "prixHaut": 26,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF211",
  "appellation": "Crémant de Bourgogne",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Effervescent",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Pomme",
   "agrume",
   "brioche",
   "fleurs blanches",
   "craie"
  ],
  "accords": [
   "Aperitif",
   "huitres",
   "fruits de mer",
   "sushi"
  ],
  "prixEntree": 11,
  "prixCoeur": 17,
  "prixHaut": 40,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF212",
  "appellation": "Crémant de Die",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Effervescent",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Pomme",
   "agrume",
   "brioche",
   "fleurs blanches",
   "craie"
  ],
  "accords": [
   "Aperitif",
   "huitres",
   "fruits de mer",
   "sushi"
  ],
  "prixEntree": 11,
  "prixCoeur": 18,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF213",
  "appellation": "Crémant de Limoux",
  "type": "AOC",
  "region": "Languedoc",
  "couleur": "Effervescent",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Pomme",
   "agrume",
   "brioche",
   "fleurs blanches",
   "craie"
  ],
  "accords": [
   "Aperitif",
   "huitres",
   "fruits de mer",
   "sushi"
  ],
  "prixEntree": 10,
  "prixCoeur": 15,
  "prixHaut": 30,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF214",
  "appellation": "Crémant de Loire",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Effervescent",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Pomme",
   "agrume",
   "brioche",
   "fleurs blanches",
   "craie"
  ],
  "accords": [
   "Aperitif",
   "huitres",
   "fruits de mer",
   "sushi"
  ],
  "prixEntree": 10,
  "prixCoeur": 15,
  "prixHaut": 32,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF215",
  "appellation": "Crémant du Jura",
  "type": "AOC",
  "region": "Jura",
  "couleur": "Effervescent",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Pomme",
   "agrume",
   "brioche",
   "fleurs blanches",
   "craie"
  ],
  "accords": [
   "Aperitif",
   "huitres",
   "fruits de mer",
   "sushi"
  ],
  "prixEntree": 13,
  "prixCoeur": 19,
  "prixHaut": 38,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF216",
  "appellation": "Crépy",
  "type": "AOC",
  "region": "Savoie",
  "couleur": "Blanc",
  "puissance": 2,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 2,
  "profil": "Profil moyen, acidité vive. Garde estimée : 3-6 ans.",
  "aromes": [
   "Silex",
   "pomme",
   "fleurs alpines"
  ],
  "accords": [
   "Fondue",
   "raclette",
   "poissons de lac",
   "tartiflette"
  ],
  "prixEntree": 9,
  "prixCoeur": 15,
  "prixHaut": 30,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF217",
  "appellation": "Criots-Bâtard-Montrachet",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive. Garde estimée : 10-20 ans.",
  "aromes": [
   "Agrumes",
   "beurre",
   "noisette",
   "pierre a fusil"
  ],
  "accords": [
   "Homard",
   "poissons en sauce",
   "volaille crémée",
   "comte"
  ],
  "prixEntree": 350,
  "prixCoeur": 550,
  "prixHaut": 1200,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF218",
  "appellation": "Crozes-Hermitage",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 14,
  "prixCoeur": 24,
  "prixHaut": 60,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF219",
  "appellation": "Échezeaux",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 220,
  "prixCoeur": 350,
  "prixHaut": 800,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF220",
  "appellation": "Entre-Deux-Mers",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Blanc",
  "puissance": 2,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 2,
  "profil": "Profil moyen, acidité vive. Garde estimée : 3-6 ans.",
  "aromes": [
   "Buis",
   "pamplemousse",
   "citron",
   "cire"
  ],
  "accords": [
   "Poissons",
   "fruits de mer",
   "volaille",
   "fromages de chèvre"
  ],
  "prixEntree": 7,
  "prixCoeur": 11,
  "prixHaut": 20,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF221",
  "appellation": "Entre-Deux-Mers Haut-Benauge",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Blanc",
  "puissance": 2,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 2,
  "profil": "Profil moyen, acidité vive. Garde estimée : 3-6 ans.",
  "aromes": [
   "Buis",
   "pamplemousse",
   "citron",
   "cire"
  ],
  "accords": [
   "Poissons",
   "fruits de mer",
   "volaille",
   "fromages de chèvre"
  ],
  "prixEntree": 8,
  "prixCoeur": 15,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF222",
  "appellation": "Faugères",
  "type": "AOC",
  "region": "Languedoc",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 2,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil puissant, acidité équilibrée, tanins fermes. Garde estimée : 5-10 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 10,
  "prixCoeur": 16,
  "prixHaut": 40,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF223",
  "appellation": "Fiefs Vendéens",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité vive, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Framboise",
   "mine de crayon",
   "poivron",
   "violette"
  ],
  "accords": [
   "Rillettes",
   "chèvre chaud",
   "veau",
   "cuisine légère"
  ],
  "prixEntree": 9,
  "prixCoeur": 16,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF224",
  "appellation": "Fitou",
  "type": "AOC",
  "region": "Languedoc",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 2,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil puissant, acidité équilibrée, tanins fermes. Garde estimée : 5-10 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 8,
  "prixCoeur": 13,
  "prixHaut": 28,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF225",
  "appellation": "Fixin",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 25,
  "prixCoeur": 38,
  "prixHaut": 80,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF226",
  "appellation": "Fleurie",
  "type": "AOC",
  "region": "Beaujolais",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 2,
  "profil": "Profil moyen, acidité vive, tanins souples. Garde estimée : 3-6 ans.",
  "aromes": [
   "Fraise",
   "banane",
   "kirsch",
   "granit",
   "poivre"
  ],
  "accords": [
   "Charcuterie",
   "andouillette",
   "quenelles",
   "fromages frais"
  ],
  "prixEntree": 13,
  "prixCoeur": 19,
  "prixHaut": 45,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF227",
  "appellation": "Floc de Gascogne",
  "type": "AOC",
  "region": "Sud-Ouest",
  "couleur": "VDN / Vin de liqueur",
  "puissance": 5,
  "acidite": 2,
  "tanin": 2,
  "sucrosite": 5,
  "intensite": 5,
  "garde": 5,
  "profil": "Profil très puissant, acidité équilibrée, sucrosite marquée équilibrée par l'acidité. Garde estimée : 20 ans et plus.",
  "aromes": [
   "Fruits confits",
   "cacao",
   "rancio",
   "noix",
   "épices"
  ],
  "accords": [
   "Chocolat noir",
   "desserts",
   "fromages bleus",
   "aperitif"
  ],
  "prixEntree": 11,
  "prixCoeur": 15,
  "prixHaut": 25,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF228",
  "appellation": "Francs Côtes de Bordeaux",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Fruits noirs",
   "cèdre",
   "graphite",
   "tabac",
   "épices douces"
  ],
  "accords": [
   "Entrecote",
   "agneau de Pauillac",
   "canard",
   "fromages affinés"
  ],
  "prixEntree": 9,
  "prixCoeur": 18,
  "prixHaut": 45,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF229",
  "appellation": "Fronsac",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Fruits noirs",
   "cèdre",
   "graphite",
   "tabac",
   "épices douces"
  ],
  "accords": [
   "Entrecote",
   "agneau de Pauillac",
   "canard",
   "fromages affinés"
  ],
  "prixEntree": 13,
  "prixCoeur": 22,
  "prixHaut": 55,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF230",
  "appellation": "Gaillac",
  "type": "AOC",
  "region": "Sud-Ouest",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 5,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins puissants. Garde estimée : 10-20 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 8,
  "prixCoeur": 13,
  "prixHaut": 30,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF231",
  "appellation": "Gaillac Premières Côtes",
  "type": "AOC",
  "region": "Sud-Ouest",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 5,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins puissants. Garde estimée : 10-20 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 8,
  "prixCoeur": 15,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF232",
  "appellation": "Gevrey-Chambertin",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 40,
  "prixCoeur": 70,
  "prixHaut": 220,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF233",
  "appellation": "Gigondas",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 20,
  "prixCoeur": 32,
  "prixHaut": 90,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF234",
  "appellation": "Givry",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 16,
  "prixCoeur": 26,
  "prixHaut": 55,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF235",
  "appellation": "Grands-Échezeaux",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 400,
  "prixCoeur": 650,
  "prixHaut": 1400,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF236",
  "appellation": "Graves",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Fruits noirs",
   "cèdre",
   "graphite",
   "tabac",
   "épices douces"
  ],
  "accords": [
   "Entrecote",
   "agneau de Pauillac",
   "canard",
   "fromages affinés"
  ],
  "prixEntree": 11,
  "prixCoeur": 20,
  "prixHaut": 55,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF237",
  "appellation": "Graves de Vayres",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Fruits noirs",
   "cèdre",
   "graphite",
   "tabac",
   "épices douces"
  ],
  "accords": [
   "Entrecote",
   "agneau de Pauillac",
   "canard",
   "fromages affinés"
  ],
  "prixEntree": 9,
  "prixCoeur": 18,
  "prixHaut": 45,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF238",
  "appellation": "Graves Supérieures",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Blanc liquoreux",
  "puissance": 4,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 5,
  "intensite": 5,
  "garde": 5,
  "profil": "Profil puissant, acidité vive, sucrosite marquée équilibrée par l'acidité. Garde estimée : 20 ans et plus.",
  "aromes": [
   "Miel",
   "abricot confit",
   "safran",
   "cire",
   "botrytis"
  ],
  "accords": [
   "Foie gras",
   "roquefort",
   "desserts aux fruits jaunes"
  ],
  "prixEntree": 16,
  "prixCoeur": 33,
  "prixHaut": 99,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF239",
  "appellation": "Grignan-les-Adhémar",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 10,
  "prixCoeur": 20,
  "prixHaut": 55,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF240",
  "appellation": "Griotte-Chambertin",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 300,
  "prixCoeur": 450,
  "prixHaut": 900,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF241",
  "appellation": "Gros Plant du Pays Nantais",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Blanc",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Coing",
   "agrume",
   "silex",
   "camomille",
   "miel"
  ],
  "accords": [
   "Huitres",
   "sandre au beurre blanc",
   "chèvre",
   "sushi"
  ],
  "prixEntree": 9,
  "prixCoeur": 17,
  "prixHaut": 45,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF242",
  "appellation": "Haut-Médoc",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Fruits noirs",
   "cèdre",
   "graphite",
   "tabac",
   "épices douces"
  ],
  "accords": [
   "Entrecote",
   "agneau de Pauillac",
   "canard",
   "fromages affinés"
  ],
  "prixEntree": 13,
  "prixCoeur": 24,
  "prixHaut": 80,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF243",
  "appellation": "Haut-Montravel",
  "type": "AOC",
  "region": "Sud-Ouest",
  "couleur": "Blanc liquoreux",
  "puissance": 4,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 5,
  "intensite": 5,
  "garde": 5,
  "profil": "Profil puissant, acidité vive, sucrosite marquée équilibrée par l'acidité. Garde estimée : 20 ans et plus.",
  "aromes": [
   "Miel",
   "abricot confit",
   "safran",
   "cire",
   "botrytis"
  ],
  "accords": [
   "Foie gras",
   "roquefort",
   "desserts aux fruits jaunes"
  ],
  "prixEntree": 15,
  "prixCoeur": 30,
  "prixHaut": 90,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF244",
  "appellation": "Haut-Poitou",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité vive, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Framboise",
   "mine de crayon",
   "poivron",
   "violette"
  ],
  "accords": [
   "Rillettes",
   "chèvre chaud",
   "veau",
   "cuisine légère"
  ],
  "prixEntree": 9,
  "prixCoeur": 16,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF245",
  "appellation": "Hermitage (ou Ermitage)",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 55,
  "prixCoeur": 110,
  "prixHaut": 500,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF246",
  "appellation": "Irancy",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 15,
  "prixCoeur": 22,
  "prixHaut": 40,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF247",
  "appellation": "Irouléguy",
  "type": "AOC",
  "region": "Sud-Ouest",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 5,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins puissants. Garde estimée : 10-20 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 13,
  "prixCoeur": 20,
  "prixHaut": 45,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF248",
  "appellation": "Jasnières",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Blanc",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Coing",
   "agrume",
   "silex",
   "camomille",
   "miel"
  ],
  "accords": [
   "Huitres",
   "sandre au beurre blanc",
   "chèvre",
   "sushi"
  ],
  "prixEntree": 14,
  "prixCoeur": 22,
  "prixHaut": 45,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF249",
  "appellation": "Juliénas",
  "type": "AOC",
  "region": "Beaujolais",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 2,
  "profil": "Profil moyen, acidité vive, tanins souples. Garde estimée : 3-6 ans.",
  "aromes": [
   "Fraise",
   "banane",
   "kirsch",
   "granit",
   "poivre"
  ],
  "accords": [
   "Charcuterie",
   "andouillette",
   "quenelles",
   "fromages frais"
  ],
  "prixEntree": 12,
  "prixCoeur": 17,
  "prixHaut": 35,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF250",
  "appellation": "Jurançon",
  "type": "AOC",
  "region": "Sud-Ouest",
  "couleur": "Blanc moelleux",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 4,
  "intensite": 5,
  "garde": 4,
  "profil": "Profil ample, acidité vive, sucrosite marquée équilibrée par l'acidité. Garde estimée : 10-20 ans.",
  "aromes": [
   "Ananas",
   "mangue",
   "miel",
   "agrume confit"
  ],
  "accords": [
   "Foie gras",
   "cuisine épicée",
   "desserts fruites"
  ],
  "prixEntree": 13,
  "prixCoeur": 22,
  "prixHaut": 60,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF251",
  "appellation": "Jurançon Sec",
  "type": "AOC",
  "region": "Sud-Ouest",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil ample, acidité vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Fruits exotiques",
   "agrume",
   "miel",
   "épices"
  ],
  "accords": [
   "Poissons",
   "fruits de mer",
   "volaille",
   "fromages de chèvre"
  ],
  "prixEntree": 11,
  "prixCoeur": 17,
  "prixHaut": 35,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF252",
  "appellation": "La Grande Rue",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 600,
  "prixCoeur": 900,
  "prixHaut": 1600,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF253",
  "appellation": "La Romanée",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 4500,
  "prixCoeur": 6500,
  "prixHaut": 12000,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF254",
  "appellation": "La Tâche",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 4500,
  "prixCoeur": 6500,
  "prixHaut": 11000,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF255",
  "appellation": "Ladoix",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 22,
  "prixCoeur": 45,
  "prixHaut": 150,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF256",
  "appellation": "Lalande-de-Pomerol",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Fruits noirs",
   "cèdre",
   "graphite",
   "tabac",
   "épices douces"
  ],
  "accords": [
   "Entrecote",
   "agneau de Pauillac",
   "canard",
   "fromages affinés"
  ],
  "prixEntree": 16,
  "prixCoeur": 26,
  "prixHaut": 70,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF257",
  "appellation": "Latricières-Chambertin",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 160,
  "prixCoeur": 250,
  "prixHaut": 500,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF258",
  "appellation": "Lavilledieu",
  "type": "AOC",
  "region": "Sud-Ouest",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 5,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins puissants. Garde estimée : 10-20 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 8,
  "prixCoeur": 15,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF259",
  "appellation": "Les Baux-de-Provence",
  "type": "AOC",
  "region": "Provence",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 5-10 ans.",
  "aromes": [
   "Mûre",
   "cuir",
   "gibier",
   "thym",
   "romarin"
  ],
  "accords": [
   "Viandes rouges grillées",
   "agneau",
   "gibier",
   "fromages a pate pressée"
  ],
  "prixEntree": 15,
  "prixCoeur": 25,
  "prixHaut": 60,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF260",
  "appellation": "L'Étoile",
  "type": "AOC",
  "region": "Jura",
  "couleur": "Blanc",
  "puissance": 4,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 5,
  "garde": 5,
  "profil": "Profil puissant, acidité très vive. Garde estimée : 20 ans et plus.",
  "aromes": [
   "Noix",
   "curry",
   "pomme verte",
   "oxydatif"
  ],
  "accords": [
   "Comte affiné",
   "poulet aux morilles",
   "curry"
  ],
  "prixEntree": 20,
  "prixCoeur": 30,
  "prixHaut": 60,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF261",
  "appellation": "L'Étoile Mousseux",
  "type": "AOC",
  "region": "Jura",
  "couleur": "Effervescent",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Pomme",
   "agrume",
   "brioche",
   "fleurs blanches",
   "craie"
  ],
  "accords": [
   "Aperitif",
   "huitres",
   "fruits de mer",
   "sushi"
  ],
  "prixEntree": 11,
  "prixCoeur": 18,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF262",
  "appellation": "Limoux",
  "type": "AOC",
  "region": "Languedoc",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 3,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 2,
  "profil": "Profil ample, acidité fraîche. Garde estimée : 3-6 ans.",
  "aromes": [
   "Fenouil",
   "agrume",
   "fleurs blanches",
   "iode"
  ],
  "accords": [
   "Poissons",
   "fruits de mer",
   "volaille",
   "fromages de chèvre"
  ],
  "prixEntree": 10,
  "prixCoeur": 16,
  "prixHaut": 35,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF263",
  "appellation": "Lirac",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 12,
  "prixCoeur": 20,
  "prixHaut": 45,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF264",
  "appellation": "Listrac-Médoc",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Fruits noirs",
   "cèdre",
   "graphite",
   "tabac",
   "épices douces"
  ],
  "accords": [
   "Entrecote",
   "agneau de Pauillac",
   "canard",
   "fromages affinés"
  ],
  "prixEntree": 14,
  "prixCoeur": 22,
  "prixHaut": 45,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF265",
  "appellation": "Loupiac",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Blanc liquoreux",
  "puissance": 4,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 5,
  "intensite": 5,
  "garde": 5,
  "profil": "Profil puissant, acidité vive, sucrosite marquée équilibrée par l'acidité. Garde estimée : 20 ans et plus.",
  "aromes": [
   "Miel",
   "abricot confit",
   "safran",
   "cire",
   "botrytis"
  ],
  "accords": [
   "Foie gras",
   "roquefort",
   "desserts aux fruits jaunes"
  ],
  "prixEntree": 15,
  "prixCoeur": 30,
  "prixHaut": 90,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF266",
  "appellation": "Luberon",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 8,
  "prixCoeur": 13,
  "prixHaut": 28,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF267",
  "appellation": "Lussac Saint-Émilion",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Fruits noirs",
   "cèdre",
   "graphite",
   "tabac",
   "épices douces"
  ],
  "accords": [
   "Entrecote",
   "agneau de Pauillac",
   "canard",
   "fromages affinés"
  ],
  "prixEntree": 9,
  "prixCoeur": 18,
  "prixHaut": 45,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF268",
  "appellation": "Mâcon",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive. Garde estimée : 10-20 ans.",
  "aromes": [
   "Agrumes",
   "beurre",
   "noisette",
   "pierre a fusil"
  ],
  "accords": [
   "Homard",
   "poissons en sauce",
   "volaille crémée",
   "comte"
  ],
  "prixEntree": 16,
  "prixCoeur": 35,
  "prixHaut": 120,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF269",
  "appellation": "Mâcon-Supérieur",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive. Garde estimée : 10-20 ans.",
  "aromes": [
   "Agrumes",
   "beurre",
   "noisette",
   "pierre a fusil"
  ],
  "accords": [
   "Homard",
   "poissons en sauce",
   "volaille crémée",
   "comte"
  ],
  "prixEntree": 18,
  "prixCoeur": 38,
  "prixHaut": 132,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF270",
  "appellation": "Mâcon-Villages",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive. Garde estimée : 10-20 ans.",
  "aromes": [
   "Agrumes",
   "beurre",
   "noisette",
   "pierre a fusil"
  ],
  "accords": [
   "Homard",
   "poissons en sauce",
   "volaille crémée",
   "comte"
  ],
  "prixEntree": 14,
  "prixCoeur": 30,
  "prixHaut": 102,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF271",
  "appellation": "Macvin du Jura",
  "type": "AOC",
  "region": "Jura",
  "couleur": "VDN / Vin de liqueur",
  "puissance": 5,
  "acidite": 2,
  "tanin": 2,
  "sucrosite": 5,
  "intensite": 5,
  "garde": 5,
  "profil": "Profil très puissant, acidité équilibrée, sucrosite marquée équilibrée par l'acidité. Garde estimée : 20 ans et plus.",
  "aromes": [
   "Fruits confits",
   "cacao",
   "rancio",
   "noix",
   "épices"
  ],
  "accords": [
   "Chocolat noir",
   "desserts",
   "fromages bleus",
   "aperitif"
  ],
  "prixEntree": 20,
  "prixCoeur": 28,
  "prixHaut": 45,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF272",
  "appellation": "Madiran",
  "type": "AOC",
  "region": "Sud-Ouest",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 5,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins puissants. Garde estimée : 10-20 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 10,
  "prixCoeur": 18,
  "prixHaut": 55,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF273",
  "appellation": "Malepère",
  "type": "AOC",
  "region": "Languedoc",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 2,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil puissant, acidité équilibrée, tanins fermes. Garde estimée : 5-10 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 8,
  "prixCoeur": 14,
  "prixHaut": 35,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF274",
  "appellation": "Maranges",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 22,
  "prixCoeur": 45,
  "prixHaut": 150,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF275",
  "appellation": "Maranges Premier Cru",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 44,
  "prixCoeur": 90,
  "prixHaut": 300,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF276",
  "appellation": "Marcillac",
  "type": "AOC",
  "region": "Sud-Ouest",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 5,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins puissants. Garde estimée : 10-20 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 10,
  "prixCoeur": 15,
  "prixHaut": 28,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF277",
  "appellation": "Margaux",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Fruits noirs",
   "cèdre",
   "graphite",
   "tabac",
   "épices douces"
  ],
  "accords": [
   "Entrecote",
   "agneau de Pauillac",
   "canard",
   "fromages affinés"
  ],
  "prixEntree": 40,
  "prixCoeur": 100,
  "prixHaut": 800,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF278",
  "appellation": "Marsannay",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 20,
  "prixCoeur": 30,
  "prixHaut": 60,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF279",
  "appellation": "Marsannay Rosé",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rosé",
  "puissance": 2,
  "acidite": 4,
  "tanin": 1,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil moyen, acidité vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fraise",
   "pêche",
   "agrume",
   "fleurs",
   "épices douces"
  ],
  "accords": [
   "Cuisine mediterraneenne",
   "grillades",
   "salades",
   "tapas"
  ],
  "prixEntree": 9,
  "prixCoeur": 15,
  "prixHaut": 32,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF280",
  "appellation": "Maury",
  "type": "AOC",
  "region": "Roussillon",
  "couleur": "VDN / Vin de liqueur",
  "puissance": 5,
  "acidite": 2,
  "tanin": 2,
  "sucrosite": 5,
  "intensite": 5,
  "garde": 5,
  "profil": "Profil très puissant, acidité équilibrée, sucrosite marquée équilibrée par l'acidité. Garde estimée : 20 ans et plus.",
  "aromes": [
   "Fruits confits",
   "cacao",
   "rancio",
   "noix",
   "épices"
  ],
  "accords": [
   "Chocolat noir",
   "desserts",
   "fromages bleus",
   "aperitif"
  ],
  "prixEntree": 13,
  "prixCoeur": 22,
  "prixHaut": 60,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF281",
  "appellation": "Mazis-Chambertin",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 200,
  "prixCoeur": 320,
  "prixHaut": 650,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF282",
  "appellation": "Mazoyères-Chambertin",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 140,
  "prixCoeur": 220,
  "prixHaut": 450,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF283",
  "appellation": "Médoc",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Fruits noirs",
   "cèdre",
   "graphite",
   "tabac",
   "épices douces"
  ],
  "accords": [
   "Entrecote",
   "agneau de Pauillac",
   "canard",
   "fromages affinés"
  ],
  "prixEntree": 11,
  "prixCoeur": 18,
  "prixHaut": 40,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF284",
  "appellation": "Menetou-Salon",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Blanc",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Coing",
   "agrume",
   "silex",
   "camomille",
   "miel"
  ],
  "accords": [
   "Huitres",
   "sandre au beurre blanc",
   "chèvre",
   "sushi"
  ],
  "prixEntree": 13,
  "prixCoeur": 19,
  "prixHaut": 38,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF285",
  "appellation": "Mercurey",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 18,
  "prixCoeur": 28,
  "prixHaut": 60,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF286",
  "appellation": "Meursault",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive. Garde estimée : 10-20 ans.",
  "aromes": [
   "Agrumes",
   "beurre",
   "noisette",
   "pierre a fusil"
  ],
  "accords": [
   "Homard",
   "poissons en sauce",
   "volaille crémée",
   "comte"
  ],
  "prixEntree": 38,
  "prixCoeur": 65,
  "prixHaut": 200,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF287",
  "appellation": "Minervois",
  "type": "AOC",
  "region": "Languedoc",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 2,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil puissant, acidité équilibrée, tanins fermes. Garde estimée : 5-10 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 8,
  "prixCoeur": 13,
  "prixHaut": 30,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF288",
  "appellation": "Minervois-La Livinière",
  "type": "AOC",
  "region": "Languedoc",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 2,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil puissant, acidité équilibrée, tanins fermes. Garde estimée : 5-10 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 8,
  "prixCoeur": 14,
  "prixHaut": 35,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF289",
  "appellation": "Monbazillac",
  "type": "AOC",
  "region": "Sud-Ouest",
  "couleur": "Blanc liquoreux",
  "puissance": 4,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 5,
  "intensite": 5,
  "garde": 5,
  "profil": "Profil puissant, acidité vive, sucrosite marquée équilibrée par l'acidité. Garde estimée : 20 ans et plus.",
  "aromes": [
   "Miel",
   "abricot confit",
   "safran",
   "cire",
   "botrytis"
  ],
  "accords": [
   "Foie gras",
   "roquefort",
   "desserts aux fruits jaunes"
  ],
  "prixEntree": 11,
  "prixCoeur": 20,
  "prixHaut": 60,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF290",
  "appellation": "Montagne Saint-Émilion",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Fruits noirs",
   "cèdre",
   "graphite",
   "tabac",
   "épices douces"
  ],
  "accords": [
   "Entrecote",
   "agneau de Pauillac",
   "canard",
   "fromages affinés"
  ],
  "prixEntree": 9,
  "prixCoeur": 18,
  "prixHaut": 45,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF291",
  "appellation": "Montagny",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive. Garde estimée : 10-20 ans.",
  "aromes": [
   "Agrumes",
   "beurre",
   "noisette",
   "pierre a fusil"
  ],
  "accords": [
   "Homard",
   "poissons en sauce",
   "volaille crémée",
   "comte"
  ],
  "prixEntree": 15,
  "prixCoeur": 24,
  "prixHaut": 45,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF292",
  "appellation": "Monthélie",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 22,
  "prixCoeur": 45,
  "prixHaut": 150,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF293",
  "appellation": "Montlouis-sur-Loire",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Blanc",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Coing",
   "agrume",
   "silex",
   "camomille",
   "miel"
  ],
  "accords": [
   "Huitres",
   "sandre au beurre blanc",
   "chèvre",
   "sushi"
  ],
  "prixEntree": 13,
  "prixCoeur": 20,
  "prixHaut": 55,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF294",
  "appellation": "Montlouis-sur-Loire Mousseux",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Effervescent",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Pomme",
   "agrume",
   "brioche",
   "fleurs blanches",
   "craie"
  ],
  "accords": [
   "Aperitif",
   "huitres",
   "fruits de mer",
   "sushi"
  ],
  "prixEntree": 11,
  "prixCoeur": 18,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF295",
  "appellation": "Montlouis-sur-Loire Pétillant",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Effervescent",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Pomme",
   "agrume",
   "brioche",
   "fleurs blanches",
   "craie"
  ],
  "accords": [
   "Aperitif",
   "huitres",
   "fruits de mer",
   "sushi"
  ],
  "prixEntree": 11,
  "prixCoeur": 18,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF296",
  "appellation": "Montrachet",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive. Garde estimée : 10-20 ans.",
  "aromes": [
   "Agrumes",
   "beurre",
   "noisette",
   "pierre a fusil"
  ],
  "accords": [
   "Homard",
   "poissons en sauce",
   "volaille crémée",
   "comte"
  ],
  "prixEntree": 1800,
  "prixCoeur": 3000,
  "prixHaut": 7000,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF297",
  "appellation": "Montravel",
  "type": "AOC",
  "region": "Sud-Ouest",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil ample, acidité vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Fruits exotiques",
   "agrume",
   "miel",
   "épices"
  ],
  "accords": [
   "Poissons",
   "fruits de mer",
   "volaille",
   "fromages de chèvre"
  ],
  "prixEntree": 9,
  "prixCoeur": 15,
  "prixHaut": 35,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF298",
  "appellation": "Morey-Saint-Denis",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 45,
  "prixCoeur": 75,
  "prixHaut": 220,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF299",
  "appellation": "Morgon",
  "type": "AOC",
  "region": "Beaujolais",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 2,
  "profil": "Profil moyen, acidité vive, tanins souples. Garde estimée : 3-6 ans.",
  "aromes": [
   "Fraise",
   "banane",
   "kirsch",
   "granit",
   "poivre"
  ],
  "accords": [
   "Charcuterie",
   "andouillette",
   "quenelles",
   "fromages frais"
  ],
  "prixEntree": 12,
  "prixCoeur": 18,
  "prixHaut": 45,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF300",
  "appellation": "Moselle",
  "type": "AOC",
  "region": "Lorraine / Est",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 3,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil ample, acidité fraîche, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Fruits",
   "fleurs",
   "épices"
  ],
  "accords": [
   "Viandes rouges grillées",
   "agneau",
   "gibier",
   "fromages a pate pressée"
  ],
  "prixEntree": 11,
  "prixCoeur": 16,
  "prixHaut": 30,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF301",
  "appellation": "Moulin-a-Vent",
  "type": "AOC",
  "region": "Beaujolais",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 2,
  "profil": "Profil moyen, acidité vive, tanins souples. Garde estimée : 3-6 ans.",
  "aromes": [
   "Fraise",
   "banane",
   "kirsch",
   "granit",
   "poivre"
  ],
  "accords": [
   "Charcuterie",
   "andouillette",
   "quenelles",
   "fromages frais"
  ],
  "prixEntree": 13,
  "prixCoeur": 20,
  "prixHaut": 50,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF302",
  "appellation": "Moulis (Moulis-en-Médoc)",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Fruits noirs",
   "cèdre",
   "graphite",
   "tabac",
   "épices douces"
  ],
  "accords": [
   "Entrecote",
   "agneau de Pauillac",
   "canard",
   "fromages affinés"
  ],
  "prixEntree": 15,
  "prixCoeur": 25,
  "prixHaut": 60,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF303",
  "appellation": "Muscadet",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Blanc",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Coing",
   "agrume",
   "silex",
   "camomille",
   "miel"
  ],
  "accords": [
   "Huitres",
   "sandre au beurre blanc",
   "chèvre",
   "sushi"
  ],
  "prixEntree": 6,
  "prixCoeur": 9,
  "prixHaut": 18,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF304",
  "appellation": "Muscadet Côtes de Grandlieu",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Blanc",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Coing",
   "agrume",
   "silex",
   "camomille",
   "miel"
  ],
  "accords": [
   "Huitres",
   "sandre au beurre blanc",
   "chèvre",
   "sushi"
  ],
  "prixEntree": 9,
  "prixCoeur": 17,
  "prixHaut": 45,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF305",
  "appellation": "Muscadet Sèvre-et-Maine",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Blanc",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Coing",
   "agrume",
   "silex",
   "camomille",
   "miel"
  ],
  "accords": [
   "Huitres",
   "sandre au beurre blanc",
   "chèvre",
   "sushi"
  ],
  "prixEntree": 8,
  "prixCoeur": 12,
  "prixHaut": 30,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF306",
  "appellation": "Muscadet Coteaux de la Loire",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Blanc",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Coing",
   "agrume",
   "silex",
   "camomille",
   "miel"
  ],
  "accords": [
   "Huitres",
   "sandre au beurre blanc",
   "chèvre",
   "sushi"
  ],
  "prixEntree": 9,
  "prixCoeur": 17,
  "prixHaut": 45,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF307",
  "appellation": "Muscat de Beaumes-de-Venise",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "VDN / Vin de liqueur",
  "puissance": 5,
  "acidite": 2,
  "tanin": 2,
  "sucrosite": 5,
  "intensite": 5,
  "garde": 5,
  "profil": "Profil très puissant, acidité équilibrée, sucrosite marquée équilibrée par l'acidité. Garde estimée : 20 ans et plus.",
  "aromes": [
   "Fruits confits",
   "cacao",
   "rancio",
   "noix",
   "épices"
  ],
  "accords": [
   "Chocolat noir",
   "desserts",
   "fromages bleus",
   "aperitif"
  ],
  "prixEntree": 13,
  "prixCoeur": 22,
  "prixHaut": 60,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF308",
  "appellation": "Muscat de Frontignan",
  "type": "AOC",
  "region": "Languedoc",
  "couleur": "VDN / Vin de liqueur",
  "puissance": 5,
  "acidite": 2,
  "tanin": 2,
  "sucrosite": 5,
  "intensite": 5,
  "garde": 5,
  "profil": "Profil très puissant, acidité équilibrée, sucrosite marquée équilibrée par l'acidité. Garde estimée : 20 ans et plus.",
  "aromes": [
   "Fruits confits",
   "cacao",
   "rancio",
   "noix",
   "épices"
  ],
  "accords": [
   "Chocolat noir",
   "desserts",
   "fromages bleus",
   "aperitif"
  ],
  "prixEntree": 13,
  "prixCoeur": 22,
  "prixHaut": 60,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF309",
  "appellation": "Muscat de Lunel",
  "type": "AOC",
  "region": "Languedoc",
  "couleur": "VDN / Vin de liqueur",
  "puissance": 5,
  "acidite": 2,
  "tanin": 2,
  "sucrosite": 5,
  "intensite": 5,
  "garde": 5,
  "profil": "Profil très puissant, acidité équilibrée, sucrosite marquée équilibrée par l'acidité. Garde estimée : 20 ans et plus.",
  "aromes": [
   "Fruits confits",
   "cacao",
   "rancio",
   "noix",
   "épices"
  ],
  "accords": [
   "Chocolat noir",
   "desserts",
   "fromages bleus",
   "aperitif"
  ],
  "prixEntree": 13,
  "prixCoeur": 22,
  "prixHaut": 60,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF310",
  "appellation": "Muscat de Mireval",
  "type": "AOC",
  "region": "Languedoc",
  "couleur": "VDN / Vin de liqueur",
  "puissance": 5,
  "acidite": 2,
  "tanin": 2,
  "sucrosite": 5,
  "intensite": 5,
  "garde": 5,
  "profil": "Profil très puissant, acidité équilibrée, sucrosite marquée équilibrée par l'acidité. Garde estimée : 20 ans et plus.",
  "aromes": [
   "Fruits confits",
   "cacao",
   "rancio",
   "noix",
   "épices"
  ],
  "accords": [
   "Chocolat noir",
   "desserts",
   "fromages bleus",
   "aperitif"
  ],
  "prixEntree": 13,
  "prixCoeur": 22,
  "prixHaut": 60,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF311",
  "appellation": "Muscat de Rivesaltes",
  "type": "AOC",
  "region": "Roussillon",
  "couleur": "VDN / Vin de liqueur",
  "puissance": 5,
  "acidite": 2,
  "tanin": 2,
  "sucrosite": 5,
  "intensite": 5,
  "garde": 5,
  "profil": "Profil très puissant, acidité équilibrée, sucrosite marquée équilibrée par l'acidité. Garde estimée : 20 ans et plus.",
  "aromes": [
   "Fruits confits",
   "cacao",
   "rancio",
   "noix",
   "épices"
  ],
  "accords": [
   "Chocolat noir",
   "desserts",
   "fromages bleus",
   "aperitif"
  ],
  "prixEntree": 13,
  "prixCoeur": 22,
  "prixHaut": 60,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF312",
  "appellation": "Muscat de Saint-Jean-de-Minervois",
  "type": "AOC",
  "region": "Languedoc",
  "couleur": "VDN / Vin de liqueur",
  "puissance": 5,
  "acidite": 2,
  "tanin": 2,
  "sucrosite": 5,
  "intensite": 5,
  "garde": 5,
  "profil": "Profil très puissant, acidité équilibrée, sucrosite marquée équilibrée par l'acidité. Garde estimée : 20 ans et plus.",
  "aromes": [
   "Fruits confits",
   "cacao",
   "rancio",
   "noix",
   "épices"
  ],
  "accords": [
   "Chocolat noir",
   "desserts",
   "fromages bleus",
   "aperitif"
  ],
  "prixEntree": 13,
  "prixCoeur": 22,
  "prixHaut": 60,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF313",
  "appellation": "Muscat du Cap Corse",
  "type": "AOC",
  "region": "Corse",
  "couleur": "VDN / Vin de liqueur",
  "puissance": 5,
  "acidite": 2,
  "tanin": 2,
  "sucrosite": 5,
  "intensite": 5,
  "garde": 5,
  "profil": "Profil très puissant, acidité équilibrée, sucrosite marquée équilibrée par l'acidité. Garde estimée : 20 ans et plus.",
  "aromes": [
   "Fruits confits",
   "cacao",
   "rancio",
   "noix",
   "épices"
  ],
  "accords": [
   "Chocolat noir",
   "desserts",
   "fromages bleus",
   "aperitif"
  ],
  "prixEntree": 18,
  "prixCoeur": 26,
  "prixHaut": 45,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF314",
  "appellation": "Musigny",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 900,
  "prixCoeur": 1600,
  "prixHaut": 4000,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF315",
  "appellation": "Nuits-Saint-Georges",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 38,
  "prixCoeur": 65,
  "prixHaut": 200,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF316",
  "appellation": "Orléans",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité vive, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Framboise",
   "mine de crayon",
   "poivron",
   "violette"
  ],
  "accords": [
   "Rillettes",
   "chèvre chaud",
   "veau",
   "cuisine légère"
  ],
  "prixEntree": 9,
  "prixCoeur": 16,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF317",
  "appellation": "Orléans-Cléry",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité vive, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Framboise",
   "mine de crayon",
   "poivron",
   "violette"
  ],
  "accords": [
   "Rillettes",
   "chèvre chaud",
   "veau",
   "cuisine légère"
  ],
  "prixEntree": 9,
  "prixCoeur": 16,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF318",
  "appellation": "Pacherenc du Vic-Bilh",
  "type": "AOC",
  "region": "Sud-Ouest",
  "couleur": "Blanc moelleux",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 4,
  "intensite": 5,
  "garde": 4,
  "profil": "Profil ample, acidité vive, sucrosite marquée équilibrée par l'acidité. Garde estimée : 10-20 ans.",
  "aromes": [
   "Ananas",
   "mangue",
   "miel",
   "agrume confit"
  ],
  "accords": [
   "Foie gras",
   "cuisine épicée",
   "desserts fruites"
  ],
  "prixEntree": 13,
  "prixCoeur": 20,
  "prixHaut": 45,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF319",
  "appellation": "Pacherenc du Vic-Bilh Sec",
  "type": "AOC",
  "region": "Sud-Ouest",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil ample, acidité vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Fruits exotiques",
   "agrume",
   "miel",
   "épices"
  ],
  "accords": [
   "Poissons",
   "fruits de mer",
   "volaille",
   "fromages de chèvre"
  ],
  "prixEntree": 9,
  "prixCoeur": 15,
  "prixHaut": 35,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF320",
  "appellation": "Palette",
  "type": "AOC",
  "region": "Provence",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 5-10 ans.",
  "aromes": [
   "Mûre",
   "cuir",
   "gibier",
   "thym",
   "romarin"
  ],
  "accords": [
   "Viandes rouges grillées",
   "agneau",
   "gibier",
   "fromages a pate pressée"
  ],
  "prixEntree": 35,
  "prixCoeur": 50,
  "prixHaut": 90,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF321",
  "appellation": "Patrimonio",
  "type": "AOC",
  "region": "Corse",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 3,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil ample, acidité fraîche, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Cerise",
   "maquis",
   "immortelle",
   "cuir"
  ],
  "accords": [
   "Charcuterie corse",
   "cabri",
   "brocciu",
   "agneau"
  ],
  "prixEntree": 15,
  "prixCoeur": 24,
  "prixHaut": 50,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF322",
  "appellation": "Pauillac",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Fruits noirs",
   "cèdre",
   "graphite",
   "tabac",
   "épices douces"
  ],
  "accords": [
   "Entrecote",
   "agneau de Pauillac",
   "canard",
   "fromages affinés"
  ],
  "prixEntree": 45,
  "prixCoeur": 110,
  "prixHaut": 900,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF323",
  "appellation": "Pécharmant",
  "type": "AOC",
  "region": "Sud-Ouest",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 5,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins puissants. Garde estimée : 10-20 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 11,
  "prixCoeur": 17,
  "prixHaut": 40,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF324",
  "appellation": "Pernand-Vergelesses",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 22,
  "prixCoeur": 45,
  "prixHaut": 150,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF325",
  "appellation": "Pessac-Léognan",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Fruits noirs",
   "cèdre",
   "graphite",
   "tabac",
   "épices douces"
  ],
  "accords": [
   "Entrecote",
   "agneau de Pauillac",
   "canard",
   "fromages affinés"
  ],
  "prixEntree": 28,
  "prixCoeur": 65,
  "prixHaut": 600,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF326",
  "appellation": "Petit Chablis",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive. Garde estimée : 10-20 ans.",
  "aromes": [
   "Agrumes",
   "beurre",
   "noisette",
   "pierre a fusil"
  ],
  "accords": [
   "Homard",
   "poissons en sauce",
   "volaille crémée",
   "comte"
  ],
  "prixEntree": 11,
  "prixCoeur": 15,
  "prixHaut": 26,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF327",
  "appellation": "Pineau des Charentes",
  "type": "AOC",
  "region": "Charentes",
  "couleur": "VDN / Vin de liqueur",
  "puissance": 5,
  "acidite": 2,
  "tanin": 2,
  "sucrosite": 5,
  "intensite": 5,
  "garde": 5,
  "profil": "Profil très puissant, acidité équilibrée, sucrosite marquée équilibrée par l'acidité. Garde estimée : 20 ans et plus.",
  "aromes": [
   "Fruits confits",
   "cacao",
   "rancio",
   "noix",
   "épices"
  ],
  "accords": [
   "Chocolat noir",
   "desserts",
   "fromages bleus",
   "aperitif"
  ],
  "prixEntree": 13,
  "prixCoeur": 18,
  "prixHaut": 35,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF328",
  "appellation": "Pomerol",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Fruits noirs",
   "cèdre",
   "graphite",
   "tabac",
   "épices douces"
  ],
  "accords": [
   "Entrecote",
   "agneau de Pauillac",
   "canard",
   "fromages affinés"
  ],
  "prixEntree": 45,
  "prixCoeur": 140,
  "prixHaut": 3000,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF329",
  "appellation": "Pommard",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 38,
  "prixCoeur": 65,
  "prixHaut": 180,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF330",
  "appellation": "Pouilly-Fuissé",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive. Garde estimée : 10-20 ans.",
  "aromes": [
   "Agrumes",
   "beurre",
   "noisette",
   "pierre a fusil"
  ],
  "accords": [
   "Homard",
   "poissons en sauce",
   "volaille crémée",
   "comte"
  ],
  "prixEntree": 18,
  "prixCoeur": 30,
  "prixHaut": 90,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF331",
  "appellation": "Pouilly-Fumé",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Blanc",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Coing",
   "agrume",
   "silex",
   "camomille",
   "miel"
  ],
  "accords": [
   "Huitres",
   "sandre au beurre blanc",
   "chèvre",
   "sushi"
  ],
  "prixEntree": 16,
  "prixCoeur": 24,
  "prixHaut": 70,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF332",
  "appellation": "Pouilly-Loché",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive. Garde estimée : 10-20 ans.",
  "aromes": [
   "Agrumes",
   "beurre",
   "noisette",
   "pierre a fusil"
  ],
  "accords": [
   "Homard",
   "poissons en sauce",
   "volaille crémée",
   "comte"
  ],
  "prixEntree": 16,
  "prixCoeur": 35,
  "prixHaut": 120,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF333",
  "appellation": "Pouilly-sur-Loire",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Blanc",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Coing",
   "agrume",
   "silex",
   "camomille",
   "miel"
  ],
  "accords": [
   "Huitres",
   "sandre au beurre blanc",
   "chèvre",
   "sushi"
  ],
  "prixEntree": 9,
  "prixCoeur": 17,
  "prixHaut": 45,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF334",
  "appellation": "Pouilly-Vinzelles",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive. Garde estimée : 10-20 ans.",
  "aromes": [
   "Agrumes",
   "beurre",
   "noisette",
   "pierre a fusil"
  ],
  "accords": [
   "Homard",
   "poissons en sauce",
   "volaille crémée",
   "comte"
  ],
  "prixEntree": 16,
  "prixCoeur": 35,
  "prixHaut": 120,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF335",
  "appellation": "Premières Côtes de Blaye",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Fruits noirs",
   "cèdre",
   "graphite",
   "tabac",
   "épices douces"
  ],
  "accords": [
   "Entrecote",
   "agneau de Pauillac",
   "canard",
   "fromages affinés"
  ],
  "prixEntree": 9,
  "prixCoeur": 18,
  "prixHaut": 45,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF336",
  "appellation": "Premières Côtes de Bordeaux",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Fruits noirs",
   "cèdre",
   "graphite",
   "tabac",
   "épices douces"
  ],
  "accords": [
   "Entrecote",
   "agneau de Pauillac",
   "canard",
   "fromages affinés"
  ],
  "prixEntree": 9,
  "prixCoeur": 18,
  "prixHaut": 45,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF337",
  "appellation": "Puisseguin Saint-Émilion",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Fruits noirs",
   "cèdre",
   "graphite",
   "tabac",
   "épices douces"
  ],
  "accords": [
   "Entrecote",
   "agneau de Pauillac",
   "canard",
   "fromages affinés"
  ],
  "prixEntree": 9,
  "prixCoeur": 18,
  "prixHaut": 45,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF338",
  "appellation": "Puligny-Montrachet",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive. Garde estimée : 10-20 ans.",
  "aromes": [
   "Agrumes",
   "beurre",
   "noisette",
   "pierre a fusil"
  ],
  "accords": [
   "Homard",
   "poissons en sauce",
   "volaille crémée",
   "comte"
  ],
  "prixEntree": 45,
  "prixCoeur": 80,
  "prixHaut": 250,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF339",
  "appellation": "Quarts de Chaume",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Blanc liquoreux",
  "puissance": 4,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 5,
  "intensite": 5,
  "garde": 5,
  "profil": "Profil puissant, acidité vive, sucrosite marquée équilibrée par l'acidité. Garde estimée : 20 ans et plus.",
  "aromes": [
   "Miel",
   "abricot confit",
   "safran",
   "cire",
   "botrytis"
  ],
  "accords": [
   "Foie gras",
   "roquefort",
   "desserts aux fruits jaunes"
  ],
  "prixEntree": 30,
  "prixCoeur": 50,
  "prixHaut": 120,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF340",
  "appellation": "Quincy",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Blanc",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Coing",
   "agrume",
   "silex",
   "camomille",
   "miel"
  ],
  "accords": [
   "Huitres",
   "sandre au beurre blanc",
   "chèvre",
   "sushi"
  ],
  "prixEntree": 12,
  "prixCoeur": 17,
  "prixHaut": 30,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF341",
  "appellation": "Rasteau",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "VDN / Vin de liqueur",
  "puissance": 5,
  "acidite": 2,
  "tanin": 2,
  "sucrosite": 5,
  "intensite": 5,
  "garde": 5,
  "profil": "Profil très puissant, acidité équilibrée, sucrosite marquée équilibrée par l'acidité. Garde estimée : 20 ans et plus.",
  "aromes": [
   "Fruits confits",
   "cacao",
   "rancio",
   "noix",
   "épices"
  ],
  "accords": [
   "Chocolat noir",
   "desserts",
   "fromages bleus",
   "aperitif"
  ],
  "prixEntree": 13,
  "prixCoeur": 20,
  "prixHaut": 45,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF342",
  "appellation": "Régnié",
  "type": "AOC",
  "region": "Beaujolais",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 2,
  "profil": "Profil moyen, acidité vive, tanins souples. Garde estimée : 3-6 ans.",
  "aromes": [
   "Fraise",
   "banane",
   "kirsch",
   "granit",
   "poivre"
  ],
  "accords": [
   "Charcuterie",
   "andouillette",
   "quenelles",
   "fromages frais"
  ],
  "prixEntree": 11,
  "prixCoeur": 16,
  "prixHaut": 30,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF343",
  "appellation": "Reuilly",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité vive, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Framboise",
   "mine de crayon",
   "poivron",
   "violette"
  ],
  "accords": [
   "Rillettes",
   "chèvre chaud",
   "veau",
   "cuisine légère"
  ],
  "prixEntree": 12,
  "prixCoeur": 18,
  "prixHaut": 32,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF344",
  "appellation": "Richebourg",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 1400,
  "prixCoeur": 2200,
  "prixHaut": 4500,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF345",
  "appellation": "Rivesaltes",
  "type": "AOC",
  "region": "Roussillon",
  "couleur": "VDN / Vin de liqueur",
  "puissance": 5,
  "acidite": 2,
  "tanin": 2,
  "sucrosite": 5,
  "intensite": 5,
  "garde": 5,
  "profil": "Profil très puissant, acidité équilibrée, sucrosite marquée équilibrée par l'acidité. Garde estimée : 20 ans et plus.",
  "aromes": [
   "Fruits confits",
   "cacao",
   "rancio",
   "noix",
   "épices"
  ],
  "accords": [
   "Chocolat noir",
   "desserts",
   "fromages bleus",
   "aperitif"
  ],
  "prixEntree": 11,
  "prixCoeur": 18,
  "prixHaut": 60,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF346",
  "appellation": "Romanée-Conti",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 18000,
  "prixCoeur": 26000,
  "prixHaut": 45000,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF347",
  "appellation": "Romanée-Saint-Vivant",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 900,
  "prixCoeur": 1500,
  "prixHaut": 3000,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF348",
  "appellation": "Rosé d'Anjou",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Rosé",
  "puissance": 2,
  "acidite": 4,
  "tanin": 1,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil moyen, acidité vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fraise",
   "pêche",
   "agrume",
   "fleurs",
   "épices douces"
  ],
  "accords": [
   "Cuisine mediterraneenne",
   "grillades",
   "salades",
   "tapas"
  ],
  "prixEntree": 9,
  "prixCoeur": 15,
  "prixHaut": 32,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF349",
  "appellation": "Rosé de Loire",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Rosé",
  "puissance": 2,
  "acidite": 4,
  "tanin": 1,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil moyen, acidité vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fraise",
   "pêche",
   "agrume",
   "fleurs",
   "épices douces"
  ],
  "accords": [
   "Cuisine mediterraneenne",
   "grillades",
   "salades",
   "tapas"
  ],
  "prixEntree": 9,
  "prixCoeur": 15,
  "prixHaut": 32,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF350",
  "appellation": "Rosé des Riceys",
  "type": "AOC",
  "region": "Champagne",
  "couleur": "Rosé",
  "puissance": 2,
  "acidite": 4,
  "tanin": 1,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil moyen, acidité vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fraise",
   "pêche",
   "agrume",
   "fleurs",
   "épices douces"
  ],
  "accords": [
   "Cuisine mediterraneenne",
   "grillades",
   "salades",
   "tapas"
  ],
  "prixEntree": 28,
  "prixCoeur": 40,
  "prixHaut": 70,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF351",
  "appellation": "Rosette",
  "type": "AOC",
  "region": "Sud-Ouest",
  "couleur": "Blanc liquoreux",
  "puissance": 4,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 5,
  "intensite": 5,
  "garde": 5,
  "profil": "Profil puissant, acidité vive, sucrosite marquée équilibrée par l'acidité. Garde estimée : 20 ans et plus.",
  "aromes": [
   "Miel",
   "abricot confit",
   "safran",
   "cire",
   "botrytis"
  ],
  "accords": [
   "Foie gras",
   "roquefort",
   "desserts aux fruits jaunes"
  ],
  "prixEntree": 15,
  "prixCoeur": 30,
  "prixHaut": 90,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF352",
  "appellation": "Roussette de Savoie",
  "type": "AOC",
  "region": "Savoie",
  "couleur": "Blanc",
  "puissance": 2,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 2,
  "profil": "Profil moyen, acidité vive. Garde estimée : 3-6 ans.",
  "aromes": [
   "Silex",
   "pomme",
   "fleurs alpines"
  ],
  "accords": [
   "Fondue",
   "raclette",
   "poissons de lac",
   "tartiflette"
  ],
  "prixEntree": 11,
  "prixCoeur": 17,
  "prixHaut": 35,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF353",
  "appellation": "Roussette du Bugey",
  "type": "AOC",
  "region": "Savoie",
  "couleur": "Blanc",
  "puissance": 2,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 2,
  "profil": "Profil moyen, acidité vive. Garde estimée : 3-6 ans.",
  "aromes": [
   "Silex",
   "pomme",
   "fleurs alpines"
  ],
  "accords": [
   "Fondue",
   "raclette",
   "poissons de lac",
   "tartiflette"
  ],
  "prixEntree": 9,
  "prixCoeur": 15,
  "prixHaut": 30,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF354",
  "appellation": "Ruchottes-Chambertin",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 280,
  "prixCoeur": 420,
  "prixHaut": 800,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF355",
  "appellation": "Rully",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 16,
  "prixCoeur": 26,
  "prixHaut": 55,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF356",
  "appellation": "Saint-Amour",
  "type": "AOC",
  "region": "Beaujolais",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 2,
  "profil": "Profil moyen, acidité vive, tanins souples. Garde estimée : 3-6 ans.",
  "aromes": [
   "Fraise",
   "banane",
   "kirsch",
   "granit",
   "poivre"
  ],
  "accords": [
   "Charcuterie",
   "andouillette",
   "quenelles",
   "fromages frais"
  ],
  "prixEntree": 12,
  "prixCoeur": 18,
  "prixHaut": 35,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF357",
  "appellation": "Saint-Aubin",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 28,
  "prixCoeur": 45,
  "prixHaut": 110,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF358",
  "appellation": "Saint-Bris",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive. Garde estimée : 10-20 ans.",
  "aromes": [
   "Agrumes",
   "beurre",
   "noisette",
   "pierre a fusil"
  ],
  "accords": [
   "Homard",
   "poissons en sauce",
   "volaille crémée",
   "comte"
  ],
  "prixEntree": 11,
  "prixCoeur": 16,
  "prixHaut": 28,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF359",
  "appellation": "Saint-Chinian",
  "type": "AOC",
  "region": "Languedoc",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 2,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil puissant, acidité équilibrée, tanins fermes. Garde estimée : 5-10 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 9,
  "prixCoeur": 15,
  "prixHaut": 35,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF360",
  "appellation": "Saint-Chinian Berlou",
  "type": "AOC",
  "region": "Languedoc",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 2,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil puissant, acidité équilibrée, tanins fermes. Garde estimée : 5-10 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 8,
  "prixCoeur": 14,
  "prixHaut": 35,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF361",
  "appellation": "Saint-Chinian Roquebrun",
  "type": "AOC",
  "region": "Languedoc",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 2,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil puissant, acidité équilibrée, tanins fermes. Garde estimée : 5-10 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 8,
  "prixCoeur": 14,
  "prixHaut": 35,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF362",
  "appellation": "Saint-Émilion",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Fruits noirs",
   "cèdre",
   "graphite",
   "tabac",
   "épices douces"
  ],
  "accords": [
   "Entrecote",
   "agneau de Pauillac",
   "canard",
   "fromages affinés"
  ],
  "prixEntree": 18,
  "prixCoeur": 30,
  "prixHaut": 90,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF363",
  "appellation": "Saint-Émilion Grand Cru",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Fruits noirs",
   "cèdre",
   "graphite",
   "tabac",
   "épices douces"
  ],
  "accords": [
   "Entrecote",
   "agneau de Pauillac",
   "canard",
   "fromages affinés"
  ],
  "prixEntree": 25,
  "prixCoeur": 65,
  "prixHaut": 900,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF364",
  "appellation": "Saint-Estèphe",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Fruits noirs",
   "cèdre",
   "graphite",
   "tabac",
   "épices douces"
  ],
  "accords": [
   "Entrecote",
   "agneau de Pauillac",
   "canard",
   "fromages affinés"
  ],
  "prixEntree": 30,
  "prixCoeur": 70,
  "prixHaut": 300,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF365",
  "appellation": "Saint-Georges Saint-Émilion",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Fruits noirs",
   "cèdre",
   "graphite",
   "tabac",
   "épices douces"
  ],
  "accords": [
   "Entrecote",
   "agneau de Pauillac",
   "canard",
   "fromages affinés"
  ],
  "prixEntree": 9,
  "prixCoeur": 18,
  "prixHaut": 45,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF366",
  "appellation": "Saint-Joseph",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 20,
  "prixCoeur": 35,
  "prixHaut": 90,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF367",
  "appellation": "Saint-Julien",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Fruits noirs",
   "cèdre",
   "graphite",
   "tabac",
   "épices douces"
  ],
  "accords": [
   "Entrecote",
   "agneau de Pauillac",
   "canard",
   "fromages affinés"
  ],
  "prixEntree": 40,
  "prixCoeur": 95,
  "prixHaut": 400,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF368",
  "appellation": "Saint-Nicolas-de-Bourgueil",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité vive, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Framboise",
   "mine de crayon",
   "poivron",
   "violette"
  ],
  "accords": [
   "Rillettes",
   "chèvre chaud",
   "veau",
   "cuisine légère"
  ],
  "prixEntree": 11,
  "prixCoeur": 17,
  "prixHaut": 40,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF369",
  "appellation": "Saint-Péray",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Blanc",
  "puissance": 4,
  "acidite": 2,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 5,
  "garde": 3,
  "profil": "Profil puissant, acidité équilibrée. Garde estimée : 5-10 ans.",
  "aromes": [
   "Abricot",
   "pêche",
   "violette",
   "amande",
   "miel"
  ],
  "accords": [
   "Poissons riches",
   "volaille crémée",
   "cuisine épicée"
  ],
  "prixEntree": 18,
  "prixCoeur": 28,
  "prixHaut": 60,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF370",
  "appellation": "Saint-Péray Mousseux",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Effervescent",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Pomme",
   "agrume",
   "brioche",
   "fleurs blanches",
   "craie"
  ],
  "accords": [
   "Aperitif",
   "huitres",
   "fruits de mer",
   "sushi"
  ],
  "prixEntree": 11,
  "prixCoeur": 18,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF371",
  "appellation": "Saint-Pourçain",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité vive, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Framboise",
   "mine de crayon",
   "poivron",
   "violette"
  ],
  "accords": [
   "Rillettes",
   "chèvre chaud",
   "veau",
   "cuisine légère"
  ],
  "prixEntree": 9,
  "prixCoeur": 16,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF372",
  "appellation": "Saint-Romain",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 22,
  "prixCoeur": 45,
  "prixHaut": 150,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF373",
  "appellation": "Saint-Sardos",
  "type": "AOC",
  "region": "Sud-Ouest",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 5,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins puissants. Garde estimée : 10-20 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 8,
  "prixCoeur": 15,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF374",
  "appellation": "Saint-Véran",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive. Garde estimée : 10-20 ans.",
  "aromes": [
   "Agrumes",
   "beurre",
   "noisette",
   "pierre a fusil"
  ],
  "accords": [
   "Homard",
   "poissons en sauce",
   "volaille crémée",
   "comte"
  ],
  "prixEntree": 13,
  "prixCoeur": 20,
  "prixHaut": 40,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF375",
  "appellation": "Sainte-Croix-du-Mont",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Blanc liquoreux",
  "puissance": 4,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 5,
  "intensite": 5,
  "garde": 5,
  "profil": "Profil puissant, acidité vive, sucrosite marquée équilibrée par l'acidité. Garde estimée : 20 ans et plus.",
  "aromes": [
   "Miel",
   "abricot confit",
   "safran",
   "cire",
   "botrytis"
  ],
  "accords": [
   "Foie gras",
   "roquefort",
   "desserts aux fruits jaunes"
  ],
  "prixEntree": 15,
  "prixCoeur": 30,
  "prixHaut": 90,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF376",
  "appellation": "Sainte-Foy-Bordeaux",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Fruits noirs",
   "cèdre",
   "graphite",
   "tabac",
   "épices douces"
  ],
  "accords": [
   "Entrecote",
   "agneau de Pauillac",
   "canard",
   "fromages affinés"
  ],
  "prixEntree": 9,
  "prixCoeur": 18,
  "prixHaut": 45,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF377",
  "appellation": "Sancerre",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Blanc",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Coing",
   "agrume",
   "silex",
   "camomille",
   "miel"
  ],
  "accords": [
   "Huitres",
   "sandre au beurre blanc",
   "chèvre",
   "sushi"
  ],
  "prixEntree": 16,
  "prixCoeur": 24,
  "prixHaut": 60,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF378",
  "appellation": "Santenay",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 22,
  "prixCoeur": 35,
  "prixHaut": 80,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF379",
  "appellation": "Saumur",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité vive, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Framboise",
   "mine de crayon",
   "poivron",
   "violette"
  ],
  "accords": [
   "Rillettes",
   "chèvre chaud",
   "veau",
   "cuisine légère"
  ],
  "prixEntree": 9,
  "prixCoeur": 16,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF380",
  "appellation": "Saumur Mousseux",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Effervescent",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Pomme",
   "agrume",
   "brioche",
   "fleurs blanches",
   "craie"
  ],
  "accords": [
   "Aperitif",
   "huitres",
   "fruits de mer",
   "sushi"
  ],
  "prixEntree": 11,
  "prixCoeur": 18,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF381",
  "appellation": "Saumur-Champigny",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité vive, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Framboise",
   "mine de crayon",
   "poivron",
   "violette"
  ],
  "accords": [
   "Rillettes",
   "chèvre chaud",
   "veau",
   "cuisine légère"
  ],
  "prixEntree": 12,
  "prixCoeur": 19,
  "prixHaut": 55,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF382",
  "appellation": "Saussignac",
  "type": "AOC",
  "region": "Sud-Ouest",
  "couleur": "Blanc liquoreux",
  "puissance": 4,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 5,
  "intensite": 5,
  "garde": 5,
  "profil": "Profil puissant, acidité vive, sucrosite marquée équilibrée par l'acidité. Garde estimée : 20 ans et plus.",
  "aromes": [
   "Miel",
   "abricot confit",
   "safran",
   "cire",
   "botrytis"
  ],
  "accords": [
   "Foie gras",
   "roquefort",
   "desserts aux fruits jaunes"
  ],
  "prixEntree": 15,
  "prixCoeur": 30,
  "prixHaut": 90,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF383",
  "appellation": "Sauternes",
  "type": "AOC",
  "region": "Bordeaux",
  "couleur": "Blanc liquoreux",
  "puissance": 4,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 5,
  "intensite": 5,
  "garde": 5,
  "profil": "Profil puissant, acidité vive, sucrosite marquée équilibrée par l'acidité. Garde estimée : 20 ans et plus.",
  "aromes": [
   "Miel",
   "abricot confit",
   "safran",
   "cire",
   "botrytis"
  ],
  "accords": [
   "Foie gras",
   "roquefort",
   "desserts aux fruits jaunes"
  ],
  "prixEntree": 22,
  "prixCoeur": 50,
  "prixHaut": 400,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF384",
  "appellation": "Savennières",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Blanc",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Coing",
   "agrume",
   "silex",
   "camomille",
   "miel"
  ],
  "accords": [
   "Huitres",
   "sandre au beurre blanc",
   "chèvre",
   "sushi"
  ],
  "prixEntree": 18,
  "prixCoeur": 28,
  "prixHaut": 80,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF385",
  "appellation": "Savigny-les-Beaune",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 24,
  "prixCoeur": 38,
  "prixHaut": 90,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF386",
  "appellation": "Seyssel",
  "type": "AOC",
  "region": "Savoie",
  "couleur": "Blanc",
  "puissance": 2,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 2,
  "profil": "Profil moyen, acidité vive. Garde estimée : 3-6 ans.",
  "aromes": [
   "Silex",
   "pomme",
   "fleurs alpines"
  ],
  "accords": [
   "Fondue",
   "raclette",
   "poissons de lac",
   "tartiflette"
  ],
  "prixEntree": 11,
  "prixCoeur": 16,
  "prixHaut": 28,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF387",
  "appellation": "Seyssel Mousseux",
  "type": "AOC",
  "region": "Savoie",
  "couleur": "Effervescent",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Pomme",
   "agrume",
   "brioche",
   "fleurs blanches",
   "craie"
  ],
  "accords": [
   "Aperitif",
   "huitres",
   "fruits de mer",
   "sushi"
  ],
  "prixEntree": 11,
  "prixCoeur": 18,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF388",
  "appellation": "Tavel",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Rosé",
  "puissance": 2,
  "acidite": 4,
  "tanin": 1,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil moyen, acidité vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fraise",
   "pêche",
   "agrume",
   "fleurs",
   "épices douces"
  ],
  "accords": [
   "Cuisine mediterraneenne",
   "grillades",
   "salades",
   "tapas"
  ],
  "prixEntree": 12,
  "prixCoeur": 18,
  "prixHaut": 35,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF389",
  "appellation": "Touraine",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité vive, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Framboise",
   "mine de crayon",
   "poivron",
   "violette"
  ],
  "accords": [
   "Rillettes",
   "chèvre chaud",
   "veau",
   "cuisine légère"
  ],
  "prixEntree": 9,
  "prixCoeur": 16,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF390",
  "appellation": "Touraine Amboise",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité vive, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Framboise",
   "mine de crayon",
   "poivron",
   "violette"
  ],
  "accords": [
   "Rillettes",
   "chèvre chaud",
   "veau",
   "cuisine légère"
  ],
  "prixEntree": 9,
  "prixCoeur": 16,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF391",
  "appellation": "Touraine Azay-le-Rideau",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité vive, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Framboise",
   "mine de crayon",
   "poivron",
   "violette"
  ],
  "accords": [
   "Rillettes",
   "chèvre chaud",
   "veau",
   "cuisine légère"
  ],
  "prixEntree": 9,
  "prixCoeur": 16,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF392",
  "appellation": "Touraine Mesland",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité vive, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Framboise",
   "mine de crayon",
   "poivron",
   "violette"
  ],
  "accords": [
   "Rillettes",
   "chèvre chaud",
   "veau",
   "cuisine légère"
  ],
  "prixEntree": 9,
  "prixCoeur": 16,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF393",
  "appellation": "Touraine Mousseux",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Effervescent",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Pomme",
   "agrume",
   "brioche",
   "fleurs blanches",
   "craie"
  ],
  "accords": [
   "Aperitif",
   "huitres",
   "fruits de mer",
   "sushi"
  ],
  "prixEntree": 11,
  "prixCoeur": 18,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF394",
  "appellation": "Touraine Noble-Joue",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Rosé",
  "puissance": 2,
  "acidite": 4,
  "tanin": 1,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil moyen, acidité vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fraise",
   "pêche",
   "agrume",
   "fleurs",
   "épices douces"
  ],
  "accords": [
   "Cuisine mediterraneenne",
   "grillades",
   "salades",
   "tapas"
  ],
  "prixEntree": 9,
  "prixCoeur": 15,
  "prixHaut": 32,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF395",
  "appellation": "Touraine Pétillant",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Effervescent",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Pomme",
   "agrume",
   "brioche",
   "fleurs blanches",
   "craie"
  ],
  "accords": [
   "Aperitif",
   "huitres",
   "fruits de mer",
   "sushi"
  ],
  "prixEntree": 11,
  "prixCoeur": 18,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF396",
  "appellation": "Tursan",
  "type": "AOC",
  "region": "Sud-Ouest",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 5,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins puissants. Garde estimée : 10-20 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 8,
  "prixCoeur": 15,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF397",
  "appellation": "Vacqueyras",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 15,
  "prixCoeur": 24,
  "prixHaut": 55,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF398",
  "appellation": "Valençay",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité vive, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Framboise",
   "mine de crayon",
   "poivron",
   "violette"
  ],
  "accords": [
   "Rillettes",
   "chèvre chaud",
   "veau",
   "cuisine légère"
  ],
  "prixEntree": 9,
  "prixCoeur": 16,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF399",
  "appellation": "Ventoux",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 8,
  "prixCoeur": 13,
  "prixHaut": 28,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF400",
  "appellation": "Vin de Savoie",
  "type": "AOC",
  "region": "Savoie",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil ample, acidité vive, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Poivre",
   "violette",
   "fruits noirs",
   "altitude"
  ],
  "accords": [
   "Viandes rouges grillées",
   "agneau",
   "gibier",
   "fromages a pate pressée"
  ],
  "prixEntree": 9,
  "prixCoeur": 14,
  "prixHaut": 30,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF401",
  "appellation": "Vin de Savoie (suivi d'un nom de cru)",
  "type": "AOC",
  "region": "Savoie",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil ample, acidité vive, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Poivre",
   "violette",
   "fruits noirs",
   "altitude"
  ],
  "accords": [
   "Viandes rouges grillées",
   "agneau",
   "gibier",
   "fromages a pate pressée"
  ],
  "prixEntree": 11,
  "prixCoeur": 18,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF402",
  "appellation": "Vin de Savoie Mousseux",
  "type": "AOC",
  "region": "Savoie",
  "couleur": "Effervescent",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Pomme",
   "agrume",
   "brioche",
   "fleurs blanches",
   "craie"
  ],
  "accords": [
   "Aperitif",
   "huitres",
   "fruits de mer",
   "sushi"
  ],
  "prixEntree": 11,
  "prixCoeur": 18,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF403",
  "appellation": "Vin de Savoie Pétillant",
  "type": "AOC",
  "region": "Savoie",
  "couleur": "Effervescent",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Pomme",
   "agrume",
   "brioche",
   "fleurs blanches",
   "craie"
  ],
  "accords": [
   "Aperitif",
   "huitres",
   "fruits de mer",
   "sushi"
  ],
  "prixEntree": 11,
  "prixCoeur": 18,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF404",
  "appellation": "Vins d'Entraygues et du Fel",
  "type": "AOC",
  "region": "Sud-Ouest",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 5,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins puissants. Garde estimée : 10-20 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 8,
  "prixCoeur": 15,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF405",
  "appellation": "Vins d'Estaing",
  "type": "AOC",
  "region": "Sud-Ouest",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 5,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins puissants. Garde estimée : 10-20 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 8,
  "prixCoeur": 15,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF406",
  "appellation": "Vins de l'Orleanais",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité vive, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Framboise",
   "mine de crayon",
   "poivron",
   "violette"
  ],
  "accords": [
   "Rillettes",
   "chèvre chaud",
   "veau",
   "cuisine légère"
  ],
  "prixEntree": 9,
  "prixCoeur": 16,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF407",
  "appellation": "Vins du Thouarsais",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Rouge",
  "puissance": 2,
  "acidite": 4,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité vive, tanins présents. Garde estimée : 5-10 ans.",
  "aromes": [
   "Framboise",
   "mine de crayon",
   "poivron",
   "violette"
  ],
  "accords": [
   "Rillettes",
   "chèvre chaud",
   "veau",
   "cuisine légère"
  ],
  "prixEntree": 9,
  "prixCoeur": 16,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF408",
  "appellation": "Vinsobres",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 10,
  "prixCoeur": 20,
  "prixHaut": 55,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF409",
  "appellation": "Viré-Clessé",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive. Garde estimée : 10-20 ans.",
  "aromes": [
   "Agrumes",
   "beurre",
   "noisette",
   "pierre a fusil"
  ],
  "accords": [
   "Homard",
   "poissons en sauce",
   "volaille crémée",
   "comte"
  ],
  "prixEntree": 13,
  "prixCoeur": 20,
  "prixHaut": 40,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF410",
  "appellation": "Volnay",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 38,
  "prixCoeur": 65,
  "prixHaut": 180,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF411",
  "appellation": "Volnay Santenots",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 22,
  "prixCoeur": 45,
  "prixHaut": 150,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF412",
  "appellation": "Vosne-Romanée",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 60,
  "prixCoeur": 110,
  "prixHaut": 400,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF413",
  "appellation": "Vougeot",
  "type": "AOC",
  "region": "Bourgogne",
  "couleur": "Rouge",
  "puissance": 3,
  "acidite": 4,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil ample, acidité vive, tanins souples. Garde estimée : 10-20 ans.",
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "rosé fanée",
   "épices"
  ],
  "accords": [
   "Bœuf bourguignon",
   "volaille de Bresse",
   "epoisses",
   "champignons"
  ],
  "prixEntree": 22,
  "prixCoeur": 45,
  "prixHaut": 150,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF414",
  "appellation": "Vouvray",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Blanc",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Coing",
   "agrume",
   "silex",
   "camomille",
   "miel"
  ],
  "accords": [
   "Huitres",
   "sandre au beurre blanc",
   "chèvre",
   "sushi"
  ],
  "prixEntree": 12,
  "prixCoeur": 20,
  "prixHaut": 60,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF415",
  "appellation": "Vouvray Mousseux",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Effervescent",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Pomme",
   "agrume",
   "brioche",
   "fleurs blanches",
   "craie"
  ],
  "accords": [
   "Aperitif",
   "huitres",
   "fruits de mer",
   "sushi"
  ],
  "prixEntree": 11,
  "prixCoeur": 18,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF416",
  "appellation": "Vouvray Pétillant",
  "type": "AOC",
  "region": "Vallée de la Loire",
  "couleur": "Effervescent",
  "puissance": 2,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 3,
  "profil": "Profil moyen, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Pomme",
   "agrume",
   "brioche",
   "fleurs blanches",
   "craie"
  ],
  "accords": [
   "Aperitif",
   "huitres",
   "fruits de mer",
   "sushi"
  ],
  "prixEntree": 11,
  "prixCoeur": 18,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF417",
  "appellation": "Pic Saint-Loup",
  "type": "AOC",
  "region": "Languedoc",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 2,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil puissant, acidité équilibrée, tanins fermes. Garde estimée : 5-10 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 12,
  "prixCoeur": 20,
  "prixHaut": 50,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF418",
  "appellation": "La Clape",
  "type": "AOC",
  "region": "Languedoc",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 2,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil puissant, acidité équilibrée, tanins fermes. Garde estimée : 5-10 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 12,
  "prixCoeur": 19,
  "prixHaut": 45,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF419",
  "appellation": "Picpoul de Pinet",
  "type": "AOC",
  "region": "Languedoc",
  "couleur": "Blanc",
  "puissance": 3,
  "acidite": 3,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 2,
  "profil": "Profil ample, acidité fraîche. Garde estimée : 3-6 ans.",
  "aromes": [
   "Fenouil",
   "agrume",
   "fleurs blanches",
   "iode"
  ],
  "accords": [
   "Poissons",
   "fruits de mer",
   "volaille",
   "fromages de chèvre"
  ],
  "prixEntree": 7,
  "prixCoeur": 10,
  "prixHaut": 18,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF420",
  "appellation": "Terrasses du Larzac",
  "type": "AOC",
  "region": "Languedoc",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 2,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil puissant, acidité équilibrée, tanins fermes. Garde estimée : 5-10 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 13,
  "prixCoeur": 22,
  "prixHaut": 55,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF421",
  "appellation": "Cairanne",
  "type": "AOC",
  "region": "Vallée du Rhône",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins fermes. Garde estimée : 10-20 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 13,
  "prixCoeur": 20,
  "prixHaut": 45,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF422",
  "appellation": "Corrèze",
  "type": "AOC",
  "region": "Sud-Ouest",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 3,
  "tanin": 5,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 4,
  "profil": "Profil puissant, acidité fraîche, tanins puissants. Garde estimée : 10-20 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 8,
  "prixCoeur": 15,
  "prixHaut": 40,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF423",
  "appellation": "Sable de Camargue",
  "type": "AOC",
  "region": "Languedoc",
  "couleur": "Rouge",
  "puissance": 4,
  "acidite": 2,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil puissant, acidité équilibrée, tanins fermes. Garde estimée : 5-10 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 8,
  "prixCoeur": 14,
  "prixHaut": 35,
  "fiabilitePrix": "Modèle régional"
 },
 {
  "id": "PRF-I001",
  "appellation": "Agenais",
  "type": "IGP",
  "region": "Sud-Ouest",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 2,
  "garde": 2,
  "profil": "Profil ample, acidité fraîche, tanins fermes. Garde estimée : 3-6 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I002",
  "appellation": "Aigues",
  "type": "IGP",
  "region": "Provence",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 2,
  "garde": 1,
  "profil": "Profil ample, acidité fraîche, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Mûre",
   "cuir",
   "gibier",
   "thym",
   "romarin"
  ],
  "accords": [
   "Viandes rouges grillées",
   "agneau",
   "gibier",
   "fromages a pate pressée"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I003",
  "appellation": "Ain",
  "type": "IGP",
  "region": "Vallée du Rhône",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 2,
  "profil": "Profil ample, acidité fraîche, tanins présents. Garde estimée : 3-6 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I004",
  "appellation": "Allier",
  "type": "IGP",
  "region": "Centre",
  "couleur": "Blanc (dominante)",
  "puissance": 2,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil moyen, acidité vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits",
   "fleurs",
   "épices"
  ],
  "accords": [
   "Poissons",
   "fruits de mer",
   "volaille",
   "fromages de chèvre"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I005",
  "appellation": "Allobrogie",
  "type": "IGP",
  "region": "Savoie",
  "couleur": "Blanc (dominante)",
  "puissance": 1,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 2,
  "garde": 1,
  "profil": "Profil léger, acidité vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Silex",
   "pomme",
   "fleurs alpines"
  ],
  "accords": [
   "Fondue",
   "raclette",
   "poissons de lac",
   "tartiflette"
  ],
  "prixEntree": 8,
  "prixCoeur": 12,
  "prixHaut": 22,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF-I006",
  "appellation": "Alpes-de-Haute-Provence",
  "type": "IGP",
  "region": "Sud-Est",
  "couleur": "Blanc (dominante)",
  "puissance": 2,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil moyen, acidité vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits",
   "fleurs",
   "épices"
  ],
  "accords": [
   "Poissons",
   "fruits de mer",
   "volaille",
   "fromages de chèvre"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I007",
  "appellation": "Alpes-Maritimes",
  "type": "IGP",
  "region": "Provence",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 2,
  "garde": 1,
  "profil": "Profil ample, acidité fraîche, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Mûre",
   "cuir",
   "gibier",
   "thym",
   "romarin"
  ],
  "accords": [
   "Viandes rouges grillées",
   "agneau",
   "gibier",
   "fromages a pate pressée"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I008",
  "appellation": "Ardailhou",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I009",
  "appellation": "Ardèche",
  "type": "IGP",
  "region": "Vallée du Rhône",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 2,
  "profil": "Profil ample, acidité fraîche, tanins présents. Garde estimée : 3-6 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 6,
  "prixCoeur": 10,
  "prixHaut": 20,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF-I010",
  "appellation": "Argens",
  "type": "IGP",
  "region": "Provence",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 2,
  "garde": 1,
  "profil": "Profil ample, acidité fraîche, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Mûre",
   "cuir",
   "gibier",
   "thym",
   "romarin"
  ],
  "accords": [
   "Viandes rouges grillées",
   "agneau",
   "gibier",
   "fromages a pate pressée"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I011",
  "appellation": "Ariege",
  "type": "IGP",
  "region": "Sud-Ouest",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 2,
  "garde": 2,
  "profil": "Profil ample, acidité fraîche, tanins fermes. Garde estimée : 3-6 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I012",
  "appellation": "Aude",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I013",
  "appellation": "Aveyron",
  "type": "IGP",
  "region": "Sud-Ouest",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 2,
  "garde": 2,
  "profil": "Profil ample, acidité fraîche, tanins fermes. Garde estimée : 3-6 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I014",
  "appellation": "Balmes dauphinoises",
  "type": "IGP",
  "region": "Savoie",
  "couleur": "Blanc (dominante)",
  "puissance": 1,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 2,
  "garde": 1,
  "profil": "Profil léger, acidité vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Silex",
   "pomme",
   "fleurs alpines"
  ],
  "accords": [
   "Fondue",
   "raclette",
   "poissons de lac",
   "tartiflette"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I015",
  "appellation": "Benovie",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I016",
  "appellation": "Berange",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I017",
  "appellation": "Bessan",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I018",
  "appellation": "Bigorre",
  "type": "IGP",
  "region": "Sud-Ouest",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 2,
  "garde": 2,
  "profil": "Profil ample, acidité fraîche, tanins fermes. Garde estimée : 3-6 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I019",
  "appellation": "Bouches-du-Rhône",
  "type": "IGP",
  "region": "Provence",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 2,
  "garde": 1,
  "profil": "Profil ample, acidité fraîche, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Mûre",
   "cuir",
   "gibier",
   "thym",
   "romarin"
  ],
  "accords": [
   "Viandes rouges grillées",
   "agneau",
   "gibier",
   "fromages a pate pressée"
  ],
  "prixEntree": 8,
  "prixCoeur": 14,
  "prixHaut": 40,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF-I020",
  "appellation": "Bourbonnais",
  "type": "IGP",
  "region": "Vallée de la Loire",
  "couleur": "Blanc (dominante)",
  "puissance": 1,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil léger, acidité très vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Coing",
   "agrume",
   "silex",
   "camomille",
   "miel"
  ],
  "accords": [
   "Huitres",
   "sandre au beurre blanc",
   "chèvre",
   "sushi"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I021",
  "appellation": "Calvados",
  "type": "IGP",
  "region": "Normandie",
  "couleur": "Blanc (dominante)",
  "puissance": 2,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil moyen, acidité vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits",
   "fleurs",
   "épices"
  ],
  "accords": [
   "Poissons",
   "fruits de mer",
   "volaille",
   "fromages de chèvre"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I022",
  "appellation": "Cassan",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I023",
  "appellation": "Catalan",
  "type": "IGP",
  "region": "Roussillon",
  "couleur": "Rouge (dominante)",
  "puissance": 4,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 2,
  "profil": "Profil puissant, acidité équilibrée, tanins présents. Garde estimée : 3-6 ans.",
  "aromes": [
   "Fruits noirs confits",
   "schiste",
   "cacao",
   "épices"
  ],
  "accords": [
   "Viandes rouges grillées",
   "agneau",
   "gibier",
   "fromages a pate pressée"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I024",
  "appellation": "Cathare",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I025",
  "appellation": "Caux",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I026",
  "appellation": "Cessenon",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I027",
  "appellation": "Cevennes",
  "type": "IGP",
  "region": "Vallée du Rhône",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 2,
  "profil": "Profil ample, acidité fraîche, tanins présents. Garde estimée : 3-6 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I028",
  "appellation": "Charentais",
  "type": "IGP",
  "region": "Charentes",
  "couleur": "Blanc (dominante)",
  "puissance": 2,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil moyen, acidité vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits",
   "fleurs",
   "épices"
  ],
  "accords": [
   "Poissons",
   "fruits de mer",
   "volaille",
   "fromages de chèvre"
  ],
  "prixEntree": 6,
  "prixCoeur": 9,
  "prixHaut": 16,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF-I029",
  "appellation": "Charente",
  "type": "IGP",
  "region": "Charentes",
  "couleur": "Blanc (dominante)",
  "puissance": 2,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil moyen, acidité vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits",
   "fleurs",
   "épices"
  ],
  "accords": [
   "Poissons",
   "fruits de mer",
   "volaille",
   "fromages de chèvre"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I030",
  "appellation": "Charente-Maritime",
  "type": "IGP",
  "region": "Charentes",
  "couleur": "Blanc (dominante)",
  "puissance": 2,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil moyen, acidité vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits",
   "fleurs",
   "épices"
  ],
  "accords": [
   "Poissons",
   "fruits de mer",
   "volaille",
   "fromages de chèvre"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I031",
  "appellation": "Cher",
  "type": "IGP",
  "region": "Vallée de la Loire",
  "couleur": "Blanc (dominante)",
  "puissance": 1,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil léger, acidité très vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Coing",
   "agrume",
   "silex",
   "camomille",
   "miel"
  ],
  "accords": [
   "Huitres",
   "sandre au beurre blanc",
   "chèvre",
   "sushi"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I032",
  "appellation": "Cite de Carcassonne",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I033",
  "appellation": "Collines de la Moure",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I034",
  "appellation": "Collines rhodaniennes",
  "type": "IGP",
  "region": "Vallée du Rhône",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 2,
  "profil": "Profil ample, acidité fraîche, tanins présents. Garde estimée : 3-6 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 12,
  "prixCoeur": 20,
  "prixHaut": 45,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF-I035",
  "appellation": "Comte de Grignan",
  "type": "IGP",
  "region": "Vallée du Rhône",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 2,
  "profil": "Profil ample, acidité fraîche, tanins présents. Garde estimée : 3-6 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I036",
  "appellation": "Comte Tolosan",
  "type": "IGP",
  "region": "Sud-Ouest",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 2,
  "garde": 2,
  "profil": "Profil ample, acidité fraîche, tanins fermes. Garde estimée : 3-6 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 6,
  "prixCoeur": 9,
  "prixHaut": 18,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF-I037",
  "appellation": "Comtes rhodaniens",
  "type": "IGP",
  "region": "Vallée du Rhône",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 2,
  "profil": "Profil ample, acidité fraîche, tanins présents. Garde estimée : 3-6 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I038",
  "appellation": "Condomois",
  "type": "IGP",
  "region": "Sud-Ouest",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 2,
  "garde": 2,
  "profil": "Profil ample, acidité fraîche, tanins fermes. Garde estimée : 3-6 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I039",
  "appellation": "Corrèze",
  "type": "IGP",
  "region": "Sud-Ouest",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 2,
  "garde": 2,
  "profil": "Profil ample, acidité fraîche, tanins fermes. Garde estimée : 3-6 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I040",
  "appellation": "Côte Vermeille",
  "type": "IGP",
  "region": "Roussillon",
  "couleur": "Rouge (dominante)",
  "puissance": 4,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 2,
  "profil": "Profil puissant, acidité équilibrée, tanins présents. Garde estimée : 3-6 ans.",
  "aromes": [
   "Fruits noirs confits",
   "schiste",
   "cacao",
   "épices"
  ],
  "accords": [
   "Viandes rouges grillées",
   "agneau",
   "gibier",
   "fromages a pate pressée"
  ],
  "prixEntree": 15,
  "prixCoeur": 25,
  "prixHaut": 60,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF-I041",
  "appellation": "Coteaux charitois",
  "type": "IGP",
  "region": "Vallée de la Loire",
  "couleur": "Blanc (dominante)",
  "puissance": 1,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil léger, acidité très vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Coing",
   "agrume",
   "silex",
   "camomille",
   "miel"
  ],
  "accords": [
   "Huitres",
   "sandre au beurre blanc",
   "chèvre",
   "sushi"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I042",
  "appellation": "Coteaux d'Enserune",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I043",
  "appellation": "Coteaux de Coiffy",
  "type": "IGP",
  "region": "Est",
  "couleur": "Blanc (dominante)",
  "puissance": 2,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil moyen, acidité vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits",
   "fleurs",
   "épices"
  ],
  "accords": [
   "Poissons",
   "fruits de mer",
   "volaille",
   "fromages de chèvre"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I044",
  "appellation": "Coteaux de l'Ardèche",
  "type": "IGP",
  "region": "Vallée du Rhône",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 2,
  "profil": "Profil ample, acidité fraîche, tanins présents. Garde estimée : 3-6 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I045",
  "appellation": "Coteaux de l'Auxois",
  "type": "IGP",
  "region": "Bourgogne",
  "couleur": "Blanc (dominante)",
  "puissance": 2,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 2,
  "profil": "Profil moyen, acidité vive. Garde estimée : 3-6 ans.",
  "aromes": [
   "Agrumes",
   "beurre",
   "noisette",
   "pierre a fusil"
  ],
  "accords": [
   "Homard",
   "poissons en sauce",
   "volaille crémée",
   "comte"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I046",
  "appellation": "Coteaux de Bessilles",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I047",
  "appellation": "Coteaux de Ceze",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I048",
  "appellation": "Coteaux de Fontcaude",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I049",
  "appellation": "Coteaux de Glanes",
  "type": "IGP",
  "region": "Sud-Ouest",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 2,
  "garde": 2,
  "profil": "Profil ample, acidité fraîche, tanins fermes. Garde estimée : 3-6 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I050",
  "appellation": "Coteaux de La Cabrerisse",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I051",
  "appellation": "Coteaux de Laurens",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I052",
  "appellation": "Coteaux de Miramont",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I053",
  "appellation": "Coteaux de Montelimar",
  "type": "IGP",
  "region": "Vallée du Rhône",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 2,
  "profil": "Profil ample, acidité fraîche, tanins présents. Garde estimée : 3-6 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I054",
  "appellation": "Coteaux de Murviel",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I055",
  "appellation": "Coteaux de Narbonne",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I056",
  "appellation": "Coteaux de Peyriac",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I057",
  "appellation": "Coteaux de Seyssuel",
  "type": "IGP",
  "region": "Vallée du Rhône",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 2,
  "profil": "Profil ample, acidité fraîche, tanins présents. Garde estimée : 3-6 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I058",
  "appellation": "Coteaux de Tannay",
  "type": "IGP",
  "region": "Vallée de la Loire",
  "couleur": "Blanc (dominante)",
  "puissance": 1,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil léger, acidité très vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Coing",
   "agrume",
   "silex",
   "camomille",
   "miel"
  ],
  "accords": [
   "Huitres",
   "sandre au beurre blanc",
   "chèvre",
   "sushi"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I059",
  "appellation": "Coteaux des Baronnies",
  "type": "IGP",
  "region": "Vallée du Rhône",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 2,
  "profil": "Profil ample, acidité fraîche, tanins présents. Garde estimée : 3-6 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I060",
  "appellation": "Coteaux des Fenouilledes",
  "type": "IGP",
  "region": "Roussillon",
  "couleur": "Rouge (dominante)",
  "puissance": 4,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 2,
  "profil": "Profil puissant, acidité équilibrée, tanins présents. Garde estimée : 3-6 ans.",
  "aromes": [
   "Fruits noirs confits",
   "schiste",
   "cacao",
   "épices"
  ],
  "accords": [
   "Viandes rouges grillées",
   "agneau",
   "gibier",
   "fromages a pate pressée"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I061",
  "appellation": "Coteaux du Cher et de l'Arnon",
  "type": "IGP",
  "region": "Vallée de la Loire",
  "couleur": "Blanc (dominante)",
  "puissance": 1,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil léger, acidité très vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Coing",
   "agrume",
   "silex",
   "camomille",
   "miel"
  ],
  "accords": [
   "Huitres",
   "sandre au beurre blanc",
   "chèvre",
   "sushi"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I062",
  "appellation": "Coteaux du Gresivaudan",
  "type": "IGP",
  "region": "Savoie",
  "couleur": "Blanc (dominante)",
  "puissance": 1,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 2,
  "garde": 1,
  "profil": "Profil léger, acidité vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Silex",
   "pomme",
   "fleurs alpines"
  ],
  "accords": [
   "Fondue",
   "raclette",
   "poissons de lac",
   "tartiflette"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I063",
  "appellation": "Coteaux du Libron",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I064",
  "appellation": "Coteaux du Littoral Audois",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I065",
  "appellation": "Coteaux du Pont du Gard",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I066",
  "appellation": "Coteaux du Salagou",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I067",
  "appellation": "Coteaux du Verdon",
  "type": "IGP",
  "region": "Provence",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 2,
  "garde": 1,
  "profil": "Profil ample, acidité fraîche, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Mûre",
   "cuir",
   "gibier",
   "thym",
   "romarin"
  ],
  "accords": [
   "Viandes rouges grillées",
   "agneau",
   "gibier",
   "fromages a pate pressée"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I068",
  "appellation": "Coteaux et Terrasses de Montauban",
  "type": "IGP",
  "region": "Sud-Ouest",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 2,
  "garde": 2,
  "profil": "Profil ample, acidité fraîche, tanins fermes. Garde estimée : 3-6 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I069",
  "appellation": "Coteaux Flaviens",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I070",
  "appellation": "Côtes catalanes",
  "type": "IGP",
  "region": "Roussillon",
  "couleur": "Rouge (dominante)",
  "puissance": 4,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 2,
  "profil": "Profil puissant, acidité équilibrée, tanins présents. Garde estimée : 3-6 ans.",
  "aromes": [
   "Fruits noirs confits",
   "schiste",
   "cacao",
   "épices"
  ],
  "accords": [
   "Viandes rouges grillées",
   "agneau",
   "gibier",
   "fromages a pate pressée"
  ],
  "prixEntree": 8,
  "prixCoeur": 14,
  "prixHaut": 45,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF-I071",
  "appellation": "Côtes de Gascogne",
  "type": "IGP",
  "region": "Sud-Ouest",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 2,
  "garde": 2,
  "profil": "Profil ample, acidité fraîche, tanins fermes. Garde estimée : 3-6 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 15,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF-I072",
  "appellation": "Côtes de Lastours",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I073",
  "appellation": "Côtes de Perignan",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I074",
  "appellation": "Côtes de Prouilhe",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I075",
  "appellation": "Côtes de Thau",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I076",
  "appellation": "Côtes de Thongue",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I077",
  "appellation": "Côtes du Brian",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I078",
  "appellation": "Côtes du Ceressou",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I079",
  "appellation": "Côtes du Tarn",
  "type": "IGP",
  "region": "Sud-Ouest",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 2,
  "garde": 2,
  "profil": "Profil ample, acidité fraîche, tanins fermes. Garde estimée : 3-6 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I080",
  "appellation": "Côtes du Vidourle",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I081",
  "appellation": "Creuse",
  "type": "IGP",
  "region": "Centre",
  "couleur": "Blanc (dominante)",
  "puissance": 2,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil moyen, acidité vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits",
   "fleurs",
   "épices"
  ],
  "accords": [
   "Poissons",
   "fruits de mer",
   "volaille",
   "fromages de chèvre"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I082",
  "appellation": "Cucugnan",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I083",
  "appellation": "Deux-Sevres",
  "type": "IGP",
  "region": "Vallée de la Loire",
  "couleur": "Blanc (dominante)",
  "puissance": 1,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil léger, acidité très vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Coing",
   "agrume",
   "silex",
   "camomille",
   "miel"
  ],
  "accords": [
   "Huitres",
   "sandre au beurre blanc",
   "chèvre",
   "sushi"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I084",
  "appellation": "Dordogne",
  "type": "IGP",
  "region": "Sud-Ouest",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 2,
  "garde": 2,
  "profil": "Profil ample, acidité fraîche, tanins fermes. Garde estimée : 3-6 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I085",
  "appellation": "Doubs",
  "type": "IGP",
  "region": "Jura",
  "couleur": "Blanc (dominante)",
  "puissance": 3,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil ample, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Noix",
   "curry",
   "pomme verte",
   "oxydatif"
  ],
  "accords": [
   "Comte affiné",
   "poulet aux morilles",
   "curry"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I086",
  "appellation": "Drôme",
  "type": "IGP",
  "region": "Vallée du Rhône",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 2,
  "profil": "Profil ample, acidité fraîche, tanins présents. Garde estimée : 3-6 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I087",
  "appellation": "Duche d'Uzes",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I088",
  "appellation": "Franche-Comte",
  "type": "IGP",
  "region": "Jura",
  "couleur": "Blanc (dominante)",
  "puissance": 3,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 4,
  "garde": 3,
  "profil": "Profil ample, acidité très vive. Garde estimée : 5-10 ans.",
  "aromes": [
   "Noix",
   "curry",
   "pomme verte",
   "oxydatif"
  ],
  "accords": [
   "Comte affiné",
   "poulet aux morilles",
   "curry"
  ],
  "prixEntree": 9,
  "prixCoeur": 14,
  "prixHaut": 28,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF-I089",
  "appellation": "Gard",
  "type": "IGP",
  "region": "Languedoc / Rhône",
  "couleur": "Blanc (dominante)",
  "puissance": 2,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil moyen, acidité vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits",
   "fleurs",
   "épices"
  ],
  "accords": [
   "Poissons",
   "fruits de mer",
   "volaille",
   "fromages de chèvre"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I090",
  "appellation": "Gers",
  "type": "IGP",
  "region": "Sud-Ouest",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 2,
  "garde": 2,
  "profil": "Profil ample, acidité fraîche, tanins fermes. Garde estimée : 3-6 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I091",
  "appellation": "Gorges de l'Hérault",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I092",
  "appellation": "Haute-Garonne",
  "type": "IGP",
  "region": "Sud-Ouest",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 2,
  "garde": 2,
  "profil": "Profil ample, acidité fraîche, tanins fermes. Garde estimée : 3-6 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I093",
  "appellation": "Haute-Marne",
  "type": "IGP",
  "region": "Est",
  "couleur": "Blanc (dominante)",
  "puissance": 2,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil moyen, acidité vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits",
   "fleurs",
   "épices"
  ],
  "accords": [
   "Poissons",
   "fruits de mer",
   "volaille",
   "fromages de chèvre"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I094",
  "appellation": "Haute-Saône",
  "type": "IGP",
  "region": "Est",
  "couleur": "Blanc (dominante)",
  "puissance": 2,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil moyen, acidité vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits",
   "fleurs",
   "épices"
  ],
  "accords": [
   "Poissons",
   "fruits de mer",
   "volaille",
   "fromages de chèvre"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I095",
  "appellation": "Haute Vallée de l'Aude",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I096",
  "appellation": "Haute Vallée de l'Orb",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I097",
  "appellation": "Haute-Vienne",
  "type": "IGP",
  "region": "Centre",
  "couleur": "Blanc (dominante)",
  "puissance": 2,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil moyen, acidité vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits",
   "fleurs",
   "épices"
  ],
  "accords": [
   "Poissons",
   "fruits de mer",
   "volaille",
   "fromages de chèvre"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I098",
  "appellation": "Hauterive",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I099",
  "appellation": "Hautes-Alpes",
  "type": "IGP",
  "region": "Sud-Est",
  "couleur": "Blanc (dominante)",
  "puissance": 2,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil moyen, acidité vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits",
   "fleurs",
   "épices"
  ],
  "accords": [
   "Poissons",
   "fruits de mer",
   "volaille",
   "fromages de chèvre"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I100",
  "appellation": "Hautes-Pyrénées",
  "type": "IGP",
  "region": "Sud-Ouest",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 2,
  "garde": 2,
  "profil": "Profil ample, acidité fraîche, tanins fermes. Garde estimée : 3-6 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I101",
  "appellation": "Hauts de Badens",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I102",
  "appellation": "Hérault",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 6,
  "prixCoeur": 10,
  "prixHaut": 60,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF-I103",
  "appellation": "Île de Beaute",
  "type": "IGP",
  "region": "Corse",
  "couleur": "Rouge (dominante)",
  "puissance": 2,
  "acidite": 3,
  "tanin": 2,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil moyen, acidité fraîche, tanins souples. Garde estimée : 2-4 ans.",
  "aromes": [
   "Cerise",
   "maquis",
   "immortelle",
   "cuir"
  ],
  "accords": [
   "Charcuterie corse",
   "cabri",
   "brocciu",
   "agneau"
  ],
  "prixEntree": 7,
  "prixCoeur": 11,
  "prixHaut": 25,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF-I104",
  "appellation": "Indre",
  "type": "IGP",
  "region": "Vallée de la Loire",
  "couleur": "Blanc (dominante)",
  "puissance": 1,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil léger, acidité très vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Coing",
   "agrume",
   "silex",
   "camomille",
   "miel"
  ],
  "accords": [
   "Huitres",
   "sandre au beurre blanc",
   "chèvre",
   "sushi"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I105",
  "appellation": "Indre-et-Loire",
  "type": "IGP",
  "region": "Vallée de la Loire",
  "couleur": "Blanc (dominante)",
  "puissance": 1,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil léger, acidité très vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Coing",
   "agrume",
   "silex",
   "camomille",
   "miel"
  ],
  "accords": [
   "Huitres",
   "sandre au beurre blanc",
   "chèvre",
   "sushi"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I106",
  "appellation": "Isère",
  "type": "IGP",
  "region": "Vallée du Rhône",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 2,
  "profil": "Profil ample, acidité fraîche, tanins présents. Garde estimée : 3-6 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I107",
  "appellation": "Jardin de la France (Val de Loire)",
  "type": "IGP",
  "region": "Vallée de la Loire",
  "couleur": "Blanc (dominante)",
  "puissance": 1,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil léger, acidité très vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Coing",
   "agrume",
   "silex",
   "camomille",
   "miel"
  ],
  "accords": [
   "Huitres",
   "sandre au beurre blanc",
   "chèvre",
   "sushi"
  ],
  "prixEntree": 6,
  "prixCoeur": 10,
  "prixHaut": 22,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF-I108",
  "appellation": "Landes",
  "type": "IGP",
  "region": "Sud-Ouest",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 2,
  "garde": 2,
  "profil": "Profil ample, acidité fraîche, tanins fermes. Garde estimée : 3-6 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I109",
  "appellation": "Loir-et-Cher",
  "type": "IGP",
  "region": "Vallée de la Loire",
  "couleur": "Blanc (dominante)",
  "puissance": 1,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil léger, acidité très vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Coing",
   "agrume",
   "silex",
   "camomille",
   "miel"
  ],
  "accords": [
   "Huitres",
   "sandre au beurre blanc",
   "chèvre",
   "sushi"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I110",
  "appellation": "Loire-Atlantique",
  "type": "IGP",
  "region": "Vallée de la Loire",
  "couleur": "Blanc (dominante)",
  "puissance": 1,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil léger, acidité très vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Coing",
   "agrume",
   "silex",
   "camomille",
   "miel"
  ],
  "accords": [
   "Huitres",
   "sandre au beurre blanc",
   "chèvre",
   "sushi"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I111",
  "appellation": "Loiret",
  "type": "IGP",
  "region": "Vallée de la Loire",
  "couleur": "Blanc (dominante)",
  "puissance": 1,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil léger, acidité très vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Coing",
   "agrume",
   "silex",
   "camomille",
   "miel"
  ],
  "accords": [
   "Huitres",
   "sandre au beurre blanc",
   "chèvre",
   "sushi"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I112",
  "appellation": "Lot",
  "type": "IGP",
  "region": "Sud-Ouest",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 2,
  "garde": 2,
  "profil": "Profil ample, acidité fraîche, tanins fermes. Garde estimée : 3-6 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I113",
  "appellation": "Lot-et-Garonne",
  "type": "IGP",
  "region": "Sud-Ouest",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 2,
  "garde": 2,
  "profil": "Profil ample, acidité fraîche, tanins fermes. Garde estimée : 3-6 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I114",
  "appellation": "Maine-et-Loire",
  "type": "IGP",
  "region": "Vallée de la Loire",
  "couleur": "Blanc (dominante)",
  "puissance": 1,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil léger, acidité très vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Coing",
   "agrume",
   "silex",
   "camomille",
   "miel"
  ],
  "accords": [
   "Huitres",
   "sandre au beurre blanc",
   "chèvre",
   "sushi"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I115",
  "appellation": "Marches de Bretagne",
  "type": "IGP",
  "region": "Bretagne",
  "couleur": "Blanc (dominante)",
  "puissance": 2,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil moyen, acidité vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits",
   "fleurs",
   "épices"
  ],
  "accords": [
   "Poissons",
   "fruits de mer",
   "volaille",
   "fromages de chèvre"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I116",
  "appellation": "Maures",
  "type": "IGP",
  "region": "Provence",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 2,
  "garde": 1,
  "profil": "Profil ample, acidité fraîche, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Mûre",
   "cuir",
   "gibier",
   "thym",
   "romarin"
  ],
  "accords": [
   "Viandes rouges grillées",
   "agneau",
   "gibier",
   "fromages a pate pressée"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I117",
  "appellation": "Meuse",
  "type": "IGP",
  "region": "Est",
  "couleur": "Blanc (dominante)",
  "puissance": 2,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil moyen, acidité vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits",
   "fleurs",
   "épices"
  ],
  "accords": [
   "Poissons",
   "fruits de mer",
   "volaille",
   "fromages de chèvre"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I118",
  "appellation": "Mont Baudile",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I119",
  "appellation": "Mont-Caume",
  "type": "IGP",
  "region": "Provence",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 2,
  "garde": 1,
  "profil": "Profil ample, acidité fraîche, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Mûre",
   "cuir",
   "gibier",
   "thym",
   "romarin"
  ],
  "accords": [
   "Viandes rouges grillées",
   "agneau",
   "gibier",
   "fromages a pate pressée"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I120",
  "appellation": "Montestruc",
  "type": "IGP",
  "region": "Sud-Ouest",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 2,
  "garde": 2,
  "profil": "Profil ample, acidité fraîche, tanins fermes. Garde estimée : 3-6 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I121",
  "appellation": "Monts de la Grage",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I122",
  "appellation": "Nièvre",
  "type": "IGP",
  "region": "Vallée de la Loire",
  "couleur": "Blanc (dominante)",
  "puissance": 1,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil léger, acidité très vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Coing",
   "agrume",
   "silex",
   "camomille",
   "miel"
  ],
  "accords": [
   "Huitres",
   "sandre au beurre blanc",
   "chèvre",
   "sushi"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I123",
  "appellation": "Oc",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 20,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF-I124",
  "appellation": "Perigord",
  "type": "IGP",
  "region": "Sud-Ouest",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 2,
  "garde": 2,
  "profil": "Profil ample, acidité fraîche, tanins fermes. Garde estimée : 3-6 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I125",
  "appellation": "Petite Crau",
  "type": "IGP",
  "region": "Provence",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 2,
  "garde": 1,
  "profil": "Profil ample, acidité fraîche, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Mûre",
   "cuir",
   "gibier",
   "thym",
   "romarin"
  ],
  "accords": [
   "Viandes rouges grillées",
   "agneau",
   "gibier",
   "fromages a pate pressée"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I126",
  "appellation": "Pezenas",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I127",
  "appellation": "Portes de Méditerranée",
  "type": "IGP",
  "region": "Sud-Est",
  "couleur": "Blanc (dominante)",
  "puissance": 2,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil moyen, acidité vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits",
   "fleurs",
   "épices"
  ],
  "accords": [
   "Poissons",
   "fruits de mer",
   "volaille",
   "fromages de chèvre"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I128",
  "appellation": "Principaute d'Orange",
  "type": "IGP",
  "region": "Vallée du Rhône",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 2,
  "profil": "Profil ample, acidité fraîche, tanins présents. Garde estimée : 3-6 ans.",
  "aromes": [
   "Poivre noir",
   "olive",
   "garrigue",
   "violette",
   "cuir"
  ],
  "accords": [
   "Gibier",
   "daube",
   "tajine",
   "côtes d'agneau au thym"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I129",
  "appellation": "Puy-de-Dôme",
  "type": "IGP",
  "region": "Centre",
  "couleur": "Blanc (dominante)",
  "puissance": 2,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil moyen, acidité vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits",
   "fleurs",
   "épices"
  ],
  "accords": [
   "Poissons",
   "fruits de mer",
   "volaille",
   "fromages de chèvre"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I130",
  "appellation": "Pyrénées-Atlantiques",
  "type": "IGP",
  "region": "Sud-Ouest",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 2,
  "garde": 2,
  "profil": "Profil ample, acidité fraîche, tanins fermes. Garde estimée : 3-6 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I131",
  "appellation": "Pyrénées-Orientales",
  "type": "IGP",
  "region": "Roussillon",
  "couleur": "Rouge (dominante)",
  "puissance": 4,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 2,
  "profil": "Profil puissant, acidité équilibrée, tanins présents. Garde estimée : 3-6 ans.",
  "aromes": [
   "Fruits noirs confits",
   "schiste",
   "cacao",
   "épices"
  ],
  "accords": [
   "Viandes rouges grillées",
   "agneau",
   "gibier",
   "fromages a pate pressée"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I132",
  "appellation": "Sables du Golfe du Lion",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I133",
  "appellation": "Sainte Beaume",
  "type": "IGP",
  "region": "Provence",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 2,
  "garde": 1,
  "profil": "Profil ample, acidité fraîche, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Mûre",
   "cuir",
   "gibier",
   "thym",
   "romarin"
  ],
  "accords": [
   "Viandes rouges grillées",
   "agneau",
   "gibier",
   "fromages a pate pressée"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I134",
  "appellation": "Sainte-Marie-la-Blanche",
  "type": "IGP",
  "region": "Bourgogne",
  "couleur": "Blanc (dominante)",
  "puissance": 2,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 2,
  "profil": "Profil moyen, acidité vive. Garde estimée : 3-6 ans.",
  "aromes": [
   "Agrumes",
   "beurre",
   "noisette",
   "pierre a fusil"
  ],
  "accords": [
   "Homard",
   "poissons en sauce",
   "volaille crémée",
   "comte"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I135",
  "appellation": "Saône-et-Loire",
  "type": "IGP",
  "region": "Bourgogne",
  "couleur": "Blanc (dominante)",
  "puissance": 2,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 2,
  "profil": "Profil moyen, acidité vive. Garde estimée : 3-6 ans.",
  "aromes": [
   "Agrumes",
   "beurre",
   "noisette",
   "pierre a fusil"
  ],
  "accords": [
   "Homard",
   "poissons en sauce",
   "volaille crémée",
   "comte"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I136",
  "appellation": "Sarthe",
  "type": "IGP",
  "region": "Vallée de la Loire",
  "couleur": "Blanc (dominante)",
  "puissance": 1,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil léger, acidité très vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Coing",
   "agrume",
   "silex",
   "camomille",
   "miel"
  ],
  "accords": [
   "Huitres",
   "sandre au beurre blanc",
   "chèvre",
   "sushi"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I137",
  "appellation": "Seine-et-Marne",
  "type": "IGP",
  "region": "Est",
  "couleur": "Blanc (dominante)",
  "puissance": 2,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil moyen, acidité vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits",
   "fleurs",
   "épices"
  ],
  "accords": [
   "Poissons",
   "fruits de mer",
   "volaille",
   "fromages de chèvre"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I138",
  "appellation": "Tarn",
  "type": "IGP",
  "region": "Sud-Ouest",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 2,
  "garde": 2,
  "profil": "Profil ample, acidité fraîche, tanins fermes. Garde estimée : 3-6 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I139",
  "appellation": "Tarn-et-Garonne",
  "type": "IGP",
  "region": "Sud-Ouest",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 2,
  "garde": 2,
  "profil": "Profil ample, acidité fraîche, tanins fermes. Garde estimée : 3-6 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I140",
  "appellation": "Terroirs Landais",
  "type": "IGP",
  "region": "Sud-Ouest",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 2,
  "garde": 2,
  "profil": "Profil ample, acidité fraîche, tanins fermes. Garde estimée : 3-6 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I141",
  "appellation": "Thezac-Perricard",
  "type": "IGP",
  "region": "Sud-Ouest",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 4,
  "sucrosite": 0,
  "intensite": 2,
  "garde": 2,
  "profil": "Profil ample, acidité fraîche, tanins fermes. Garde estimée : 3-6 ans.",
  "aromes": [
   "Prune",
   "mûre",
   "réglisse",
   "violette",
   "tanin ferme"
  ],
  "accords": [
   "Confit de canard",
   "cassoulet",
   "garbure",
   "magret"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I142",
  "appellation": "Torgan",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I143",
  "appellation": "Urfe",
  "type": "IGP",
  "region": "Vallée de la Loire",
  "couleur": "Blanc (dominante)",
  "puissance": 1,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil léger, acidité très vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Coing",
   "agrume",
   "silex",
   "camomille",
   "miel"
  ],
  "accords": [
   "Huitres",
   "sandre au beurre blanc",
   "chèvre",
   "sushi"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I144",
  "appellation": "Val de Cesse",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I145",
  "appellation": "Val de Dagne",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I146",
  "appellation": "Val de Montferrand",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I147",
  "appellation": "Vallée du Paradis",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I148",
  "appellation": "Vals d'Agly",
  "type": "IGP",
  "region": "Roussillon",
  "couleur": "Rouge (dominante)",
  "puissance": 4,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 2,
  "profil": "Profil puissant, acidité équilibrée, tanins présents. Garde estimée : 3-6 ans.",
  "aromes": [
   "Fruits noirs confits",
   "schiste",
   "cacao",
   "épices"
  ],
  "accords": [
   "Viandes rouges grillées",
   "agneau",
   "gibier",
   "fromages a pate pressée"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I149",
  "appellation": "Var",
  "type": "IGP",
  "region": "Provence",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 3,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 2,
  "garde": 1,
  "profil": "Profil ample, acidité fraîche, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Mûre",
   "cuir",
   "gibier",
   "thym",
   "romarin"
  ],
  "accords": [
   "Viandes rouges grillées",
   "agneau",
   "gibier",
   "fromages a pate pressée"
  ],
  "prixEntree": 7,
  "prixCoeur": 11,
  "prixHaut": 25,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF-I150",
  "appellation": "Vaucluse",
  "type": "IGP",
  "region": "Sud-Est",
  "couleur": "Blanc (dominante)",
  "puissance": 2,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil moyen, acidité vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits",
   "fleurs",
   "épices"
  ],
  "accords": [
   "Poissons",
   "fruits de mer",
   "volaille",
   "fromages de chèvre"
  ],
  "prixEntree": 6,
  "prixCoeur": 10,
  "prixHaut": 20,
  "fiabilitePrix": "Référence nominative"
 },
 {
  "id": "PRF-I151",
  "appellation": "Vaunage",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I152",
  "appellation": "Vendée",
  "type": "IGP",
  "region": "Vallée de la Loire",
  "couleur": "Blanc (dominante)",
  "puissance": 1,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil léger, acidité très vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Coing",
   "agrume",
   "silex",
   "camomille",
   "miel"
  ],
  "accords": [
   "Huitres",
   "sandre au beurre blanc",
   "chèvre",
   "sushi"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I153",
  "appellation": "Vicomte d'Aumelas",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I154",
  "appellation": "Vienne",
  "type": "IGP",
  "region": "Vallée de la Loire",
  "couleur": "Blanc (dominante)",
  "puissance": 1,
  "acidite": 5,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil léger, acidité très vive. Garde estimée : 2-4 ans.",
  "aromes": [
   "Coing",
   "agrume",
   "silex",
   "camomille",
   "miel"
  ],
  "accords": [
   "Huitres",
   "sandre au beurre blanc",
   "chèvre",
   "sushi"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I155",
  "appellation": "Vistrenque",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I156",
  "appellation": "Yonne",
  "type": "IGP",
  "region": "Bourgogne",
  "couleur": "Blanc (dominante)",
  "puissance": 2,
  "acidite": 4,
  "tanin": 0,
  "sucrosite": 1,
  "intensite": 3,
  "garde": 2,
  "profil": "Profil moyen, acidité vive. Garde estimée : 3-6 ans.",
  "aromes": [
   "Agrumes",
   "beurre",
   "noisette",
   "pierre a fusil"
  ],
  "accords": [
   "Homard",
   "poissons en sauce",
   "volaille crémée",
   "comte"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 },
 {
  "id": "PRF-I157",
  "appellation": "Terres du Midi",
  "type": "IGP",
  "region": "Languedoc",
  "couleur": "Rouge (dominante)",
  "puissance": 3,
  "acidite": 2,
  "tanin": 3,
  "sucrosite": 0,
  "intensite": 3,
  "garde": 1,
  "profil": "Profil ample, acidité équilibrée, tanins présents. Garde estimée : 2-4 ans.",
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "réglisse",
   "thym",
   "cacao"
  ],
  "accords": [
   "Grillades",
   "cassoulet",
   "viandes épicées",
   "brebis"
  ],
  "prixEntree": 5,
  "prixCoeur": 8,
  "prixHaut": 16,
  "fiabilitePrix": "Modèle IGP"
 }
]

// 92 cépages : arômes, structure, garde, température, accords.
export const CEPAGES_FR = [
 {
  "id": "CEP001",
  "nom": "Cabernet Sauvignon",
  "couleur": "Rouge",
  "origine": "Bordeaux",
  "appellations": [
   "Médoc",
   "Pauillac",
   "Margaux",
   "St-Estèphe",
   "Graves"
  ],
  "synonymes": [
   "Petit Cabernet",
   "Vidure"
  ],
  "aromes": [
   "Cassis",
   "poivron vert",
   "cèdre",
   "graphite",
   "tabac"
  ],
  "tanins": "Élevé",
  "acidite": "Moyenne+",
  "corps": "Corsé",
  "garde": "10-30 ans",
  "tempService": "16-18 °C",
  "accords": [
   "Agneau",
   "bœuf grillé",
   "fromages affinés"
  ]
 },
 {
  "id": "CEP002",
  "nom": "Merlot",
  "couleur": "Rouge",
  "origine": "Bordeaux",
  "appellations": [
   "Pomerol",
   "St-Émilion",
   "Fronsac",
   "Lalande-de-Pomerol"
  ],
  "synonymes": [
   "Bordeleais noir"
  ],
  "aromes": [
   "Prune",
   "cerise noire",
   "truffe",
   "chocolat"
  ],
  "tanins": "Moyen",
  "acidite": "Moyenne",
  "corps": "Charnu",
  "garde": "5-25 ans",
  "tempService": "16-17 °C",
  "accords": [
   "Magret",
   "volaille rôtie",
   "champignons"
  ]
 },
 {
  "id": "CEP003",
  "nom": "Cabernet Franc",
  "couleur": "Rouge",
  "origine": "Bordeaux / Loire",
  "appellations": [
   "Chinon",
   "Bourgueil",
   "St-Émilion",
   "Saumur-Champigny"
  ],
  "synonymes": [
   "Breton",
   "Bouchet"
  ],
  "aromes": [
   "Framboise",
   "mine de crayon",
   "poivron",
   "violette"
  ],
  "tanins": "Moyen",
  "acidite": "Élevée",
  "corps": "Moyen",
  "garde": "5-20 ans",
  "tempService": "15-16 °C",
  "accords": [
   "Charcuterie",
   "chèvre chaud",
   "veau"
  ]
 },
 {
  "id": "CEP004",
  "nom": "Petit Verdot",
  "couleur": "Rouge",
  "origine": "Bordeaux",
  "appellations": [
   "Médoc",
   "Haut-Médoc",
   "Pessac-Léognan"
  ],
  "synonymes": [
   "Verdot"
  ],
  "aromes": [
   "Violette",
   "épices",
   "encre",
   "réglisse"
  ],
  "tanins": "Très élevé",
  "acidite": "Élevée",
  "corps": "Très corsé",
  "garde": "10-25 ans",
  "tempService": "17-18 °C",
  "accords": [
   "Gibier",
   "viandes épicées"
  ]
 },
 {
  "id": "CEP005",
  "nom": "Malbec",
  "couleur": "Rouge",
  "origine": "Cahors / Bordeaux",
  "appellations": [
   "Cahors",
   "Bergerac",
   "Côtes de Bourg"
  ],
  "synonymes": [
   "Cot",
   "Auxerrois",
   "Pressac"
  ],
  "aromes": [
   "Mûre",
   "prune",
   "violette",
   "cacao"
  ],
  "tanins": "Élevé",
  "acidite": "Moyenne",
  "corps": "Corsé",
  "garde": "5-20 ans",
  "tempService": "16-18 °C",
  "accords": [
   "Cassoulet",
   "magret",
   "viandes fumées"
  ]
 },
 {
  "id": "CEP006",
  "nom": "Carménère",
  "couleur": "Rouge",
  "origine": "Bordeaux",
  "appellations": [
   "Bordeaux (rare",
   "historique)"
  ],
  "synonymes": [
   "Grande Vidure"
  ],
  "aromes": [
   "Poivron",
   "épices",
   "fruits noirs"
  ],
  "tanins": "Moyen+",
  "acidite": "Moyenne",
  "corps": "Corsé",
  "garde": "5-15 ans",
  "tempService": "16-17 °C",
  "accords": [
   "Viandes rouges épicées"
  ]
 },
 {
  "id": "CEP007",
  "nom": "Pinot Noir",
  "couleur": "Rouge",
  "origine": "Bourgogne",
  "appellations": [
   "Gevrey-Chambertin",
   "Vosne-Romanée",
   "Volnay",
   "Sancerre",
   "Champagne"
  ],
  "synonymes": [
   "Noirien",
   "Spatburgunder"
  ],
  "aromes": [
   "Cerise",
   "fraise",
   "sous-bois",
   "épices douces"
  ],
  "tanins": "Faible-Moyen",
  "acidite": "Élevée",
  "corps": "Léger-Moyen",
  "garde": "5-30 ans",
  "tempService": "14-16 °C",
  "accords": [
   "Volaille",
   "bœuf bourguignon",
   "saumon"
  ]
 },
 {
  "id": "CEP008",
  "nom": "Gamay",
  "couleur": "Rouge",
  "origine": "Beaujolais",
  "appellations": [
   "Morgon",
   "Fleurie",
   "Moulin-a-Vent",
   "Touraine"
  ],
  "synonymes": [
   "Gamay Noir a jus blanc"
  ],
  "aromes": [
   "Banane",
   "fraise",
   "kirsch",
   "granit"
  ],
  "tanins": "Faible",
  "acidite": "Élevée",
  "corps": "Léger",
  "garde": "2-15 ans",
  "tempService": "13-15 °C",
  "accords": [
   "Charcuterie",
   "andouillette",
   "tapas"
  ]
 },
 {
  "id": "CEP009",
  "nom": "Syrah",
  "couleur": "Rouge",
  "origine": "Rhône Nord",
  "appellations": [
   "Hermitage",
   "Côte-Rôtie",
   "Cornas",
   "St-Joseph",
   "Crozes"
  ],
  "synonymes": [
   "Shiraz",
   "Serine"
  ],
  "aromes": [
   "Poivre noir",
   "olive noire",
   "violette",
   "lard fumé"
  ],
  "tanins": "Élevé",
  "acidite": "Moyenne+",
  "corps": "Corsé",
  "garde": "8-30 ans",
  "tempService": "16-18 °C",
  "accords": [
   "Gibier",
   "agneau",
   "plats poivres"
  ]
 },
 {
  "id": "CEP010",
  "nom": "Grenache Noir",
  "couleur": "Rouge",
  "origine": "Rhône Sud",
  "appellations": [
   "Chateauneuf-du-Pape",
   "Gigondas",
   "Rasteau",
   "Banyuls"
  ],
  "synonymes": [
   "Garnacha",
   "Alicante"
  ],
  "aromes": [
   "Fraise confite",
   "garrigue",
   "épices",
   "cuir"
  ],
  "tanins": "Faible-Moyen",
  "acidite": "Faible",
  "corps": "Corsé (alcool)",
  "garde": "5-25 ans",
  "tempService": "16-17 °C",
  "accords": [
   "Daube",
   "tajine",
   "viandes mijotées"
  ]
 },
 {
  "id": "CEP011",
  "nom": "Mourvedre",
  "couleur": "Rouge",
  "origine": "Provence / Rhône",
  "appellations": [
   "Bandol",
   "Chateauneuf-du-Pape",
   "Vacqueyras"
  ],
  "synonymes": [
   "Monastrell",
   "Mataro"
  ],
  "aromes": [
   "Mûre",
   "cuir",
   "gibier",
   "thym"
  ],
  "tanins": "Très élevé",
  "acidite": "Moyenne",
  "corps": "Corsé",
  "garde": "10-30 ans",
  "tempService": "17-18 °C",
  "accords": [
   "Gibier",
   "sanglier",
   "fromages forts"
  ]
 },
 {
  "id": "CEP012",
  "nom": "Cinsault",
  "couleur": "Rouge",
  "origine": "Languedoc / Provence",
  "appellations": [
   "Côtes de Provence",
   "Languedoc",
   "Tavel"
  ],
  "synonymes": [
   "Cinsaut",
   "Ottavianello"
  ],
  "aromes": [
   "Fraise",
   "pêche",
   "floral"
  ],
  "tanins": "Faible",
  "acidite": "Moyenne",
  "corps": "Léger",
  "garde": "2-8 ans",
  "tempService": "12-15 °C",
  "accords": [
   "Rosés",
   "cuisine mediterraneenne"
  ]
 },
 {
  "id": "CEP013",
  "nom": "Carignan",
  "couleur": "Rouge",
  "origine": "Languedoc",
  "appellations": [
   "Corbières",
   "Fitou",
   "Minervois",
   "Faugères"
  ],
  "synonymes": [
   "Carinena",
   "Mazuelo"
  ],
  "aromes": [
   "Fruits noirs",
   "garrigue",
   "amertume noble"
  ],
  "tanins": "Élevé",
  "acidite": "Élevée",
  "corps": "Corsé",
  "garde": "5-20 ans",
  "tempService": "16-17 °C",
  "accords": [
   "Grillades",
   "cassoulet"
  ]
 },
 {
  "id": "CEP014",
  "nom": "Counoise",
  "couleur": "Rouge",
  "origine": "Rhône Sud",
  "appellations": [
   "Chateauneuf-du-Pape"
  ],
  "synonymes": [
   "Moustardier"
  ],
  "aromes": [
   "Poivre",
   "fruits rouges frais"
  ],
  "tanins": "Faible",
  "acidite": "Élevée",
  "corps": "Léger",
  "garde": "3-10 ans",
  "tempService": "15 °C",
  "accords": [
   "Charcuterie"
  ]
 },
 {
  "id": "CEP015",
  "nom": "Tannat",
  "couleur": "Rouge",
  "origine": "Sud-Ouest",
  "appellations": [
   "Madiran",
   "Irouléguy",
   "Tursan"
  ],
  "synonymes": [
   "Harriague"
  ],
  "aromes": [
   "Mûre",
   "réglisse",
   "tanin puissant"
  ],
  "tanins": "Très élevé",
  "acidite": "Moyenne",
  "corps": "Très corsé",
  "garde": "10-30 ans",
  "tempService": "17-18 °C",
  "accords": [
   "Confit de canard",
   "garbure"
  ]
 },
 {
  "id": "CEP016",
  "nom": "Negrette",
  "couleur": "Rouge",
  "origine": "Sud-Ouest",
  "appellations": [
   "Fronton"
  ],
  "synonymes": [
   "Petit Noir"
  ],
  "aromes": [
   "Violette",
   "pivoine",
   "réglisse"
  ],
  "tanins": "Moyen",
  "acidite": "Moyenne",
  "corps": "Moyen",
  "garde": "3-10 ans",
  "tempService": "15-16 °C",
  "accords": [
   "Charcuterie",
   "grillades"
  ]
 },
 {
  "id": "CEP017",
  "nom": "Fer Servadou",
  "couleur": "Rouge",
  "origine": "Sud-Ouest",
  "appellations": [
   "Marcillac",
   "Gaillac",
   "Béarn"
  ],
  "synonymes": [
   "Braucol",
   "Mansois",
   "Pinenc"
  ],
  "aromes": [
   "Cassis",
   "poivron",
   "iris"
  ],
  "tanins": "Moyen+",
  "acidite": "Élevée",
  "corps": "Moyen",
  "garde": "3-12 ans",
  "tempService": "16 °C",
  "accords": [
   "Tripous",
   "charcuterie"
  ]
 },
 {
  "id": "CEP018",
  "nom": "Duras",
  "couleur": "Rouge",
  "origine": "Sud-Ouest",
  "appellations": [
   "Gaillac"
  ],
  "synonymes": [],
  "aromes": [
   "Poivre",
   "fruits rouges"
  ],
  "tanins": "Moyen",
  "acidite": "Élevée",
  "corps": "Moyen",
  "garde": "3-10 ans",
  "tempService": "15-16 °C",
  "accords": [
   "Viandes blanches"
  ]
 },
 {
  "id": "CEP019",
  "nom": "Poulsard",
  "couleur": "Rouge",
  "origine": "Jura",
  "appellations": [
   "Arbois",
   "Côtes du Jura"
  ],
  "synonymes": [
   "Ploussard"
  ],
  "aromes": [
   "Fruits rouges pales",
   "rosé fanée"
  ],
  "tanins": "Très faible",
  "acidite": "Élevée",
  "corps": "Très léger",
  "garde": "3-15 ans",
  "tempService": "13-14 °C",
  "accords": [
   "Volaille",
   "poissons rouges"
  ]
 },
 {
  "id": "CEP020",
  "nom": "Trousseau",
  "couleur": "Rouge",
  "origine": "Jura",
  "appellations": [
   "Arbois",
   "Côtes du Jura"
  ],
  "synonymes": [
   "Bastardo"
  ],
  "aromes": [
   "Cerise",
   "épices",
   "terre"
  ],
  "tanins": "Moyen",
  "acidite": "Élevée",
  "corps": "Moyen",
  "garde": "5-20 ans",
  "tempService": "15-16 °C",
  "accords": [
   "Coq au vin jaune"
  ]
 },
 {
  "id": "CEP021",
  "nom": "Mondeuse",
  "couleur": "Rouge",
  "origine": "Savoie",
  "appellations": [
   "Savoie",
   "Arbin",
   "Bugey"
  ],
  "synonymes": [
   "Grosse Syrah"
  ],
  "aromes": [
   "Poivre",
   "violette",
   "fruits noirs"
  ],
  "tanins": "Moyen+",
  "acidite": "Élevée",
  "corps": "Moyen",
  "garde": "5-15 ans",
  "tempService": "15-16 °C",
  "accords": [
   "Diots",
   "viandes de montagne"
  ]
 },
 {
  "id": "CEP022",
  "nom": "Persan",
  "couleur": "Rouge",
  "origine": "Savoie",
  "appellations": [
   "Savoie (rare)"
  ],
  "synonymes": [
   "Becuet"
  ],
  "aromes": [
   "Épices",
   "fruits noirs",
   "tanin ferme"
  ],
  "tanins": "Élevé",
  "acidite": "Élevée",
  "corps": "Corsé",
  "garde": "10-25 ans",
  "tempService": "16-17 °C",
  "accords": [
   "Gibier"
  ]
 },
 {
  "id": "CEP023",
  "nom": "Nielluccio",
  "couleur": "Rouge",
  "origine": "Corse",
  "appellations": [
   "Patrimonio",
   "Corse"
  ],
  "synonymes": [
   "Sangiovese"
  ],
  "aromes": [
   "Cerise",
   "maquis",
   "cuir"
  ],
  "tanins": "Moyen+",
  "acidite": "Élevée",
  "corps": "Moyen",
  "garde": "5-20 ans",
  "tempService": "16 °C",
  "accords": [
   "Charcuterie corse",
   "agneau"
  ]
 },
 {
  "id": "CEP024",
  "nom": "Sciaccarellu",
  "couleur": "Rouge",
  "origine": "Corse",
  "appellations": [
   "Ajaccio",
   "Sartène"
  ],
  "synonymes": [
   "Sciacarello"
  ],
  "aromes": [
   "Poivre",
   "maquis",
   "fruits rouges"
  ],
  "tanins": "Faible",
  "acidite": "Moyenne",
  "corps": "Léger",
  "garde": "3-12 ans",
  "tempService": "14-15 °C",
  "accords": [
   "Cabri",
   "fromages de brebis"
  ]
 },
 {
  "id": "CEP025",
  "nom": "Pinot Meunier",
  "couleur": "Rouge",
  "origine": "Champagne",
  "appellations": [
   "Champagne",
   "Vallée de la Marne"
  ],
  "synonymes": [
   "Meunier"
  ],
  "aromes": [
   "Pomme",
   "brioche",
   "fruits jaunes"
  ],
  "tanins": "Faible",
  "acidite": "Élevée",
  "corps": "Léger",
  "garde": "3-12 ans",
  "tempService": "10-12 °C",
  "accords": [
   "Aperitif",
   "volaille"
  ]
 },
 {
  "id": "CEP026",
  "nom": "Grolleau",
  "couleur": "Rouge",
  "origine": "Loire",
  "appellations": [
   "Rosé d'Anjou",
   "Rosé de Loire"
  ],
  "synonymes": [
   "Groslot"
  ],
  "aromes": [
   "Fraise",
   "groseille"
  ],
  "tanins": "Très faible",
  "acidite": "Élevée",
  "corps": "Très léger",
  "garde": "1-4 ans",
  "tempService": "10-12 °C",
  "accords": [
   "Aperitif",
   "cuisine sucrée-salée"
  ]
 },
 {
  "id": "CEP027",
  "nom": "Pineau d'Aunis",
  "couleur": "Rouge",
  "origine": "Loire",
  "appellations": [
   "Coteaux du Vendômois",
   "Touraine"
  ],
  "synonymes": [
   "Chenin noir"
  ],
  "aromes": [
   "Poivre blanc",
   "framboise"
  ],
  "tanins": "Faible",
  "acidite": "Élevée",
  "corps": "Léger",
  "garde": "3-10 ans",
  "tempService": "13-14 °C",
  "accords": [
   "Charcuterie",
   "cuisine épicée"
  ]
 },
 {
  "id": "CEP028",
  "nom": "Cesar",
  "couleur": "Rouge",
  "origine": "Bourgogne",
  "appellations": [
   "Irancy"
  ],
  "synonymes": [
   "Romain"
  ],
  "aromes": [
   "Fruits noirs",
   "tanin rustique"
  ],
  "tanins": "Élevé",
  "acidite": "Élevée",
  "corps": "Corsé",
  "garde": "5-15 ans",
  "tempService": "16 °C",
  "accords": [
   "Gibier a plume"
  ]
 },
 {
  "id": "CEP029",
  "nom": "Aramon",
  "couleur": "Rouge",
  "origine": "Languedoc",
  "appellations": [
   "Vin de France (historique)"
  ],
  "synonymes": [],
  "aromes": [
   "Fruits rouges legers"
  ],
  "tanins": "Faible",
  "acidite": "Moyenne",
  "corps": "Très léger",
  "garde": "1-4 ans",
  "tempService": "13 °C",
  "accords": [
   "Cuisine simple"
  ]
 },
 {
  "id": "CEP030",
  "nom": "Terret Noir",
  "couleur": "Rouge",
  "origine": "Rhône Sud",
  "appellations": [
   "Chateauneuf-du-Pape"
  ],
  "synonymes": [],
  "aromes": [
   "Fruits rouges",
   "herbes"
  ],
  "tanins": "Faible",
  "acidite": "Élevée",
  "corps": "Léger",
  "garde": "3-10 ans",
  "tempService": "15 °C",
  "accords": [
   "Legumes grillés"
  ]
 },
 {
  "id": "CEP031",
  "nom": "Chardonnay",
  "couleur": "Blanc",
  "origine": "Bourgogne",
  "appellations": [
   "Meursault",
   "Chablis",
   "Puligny",
   "Champagne",
   "Mâcon"
  ],
  "synonymes": [
   "Beaunois",
   "Aubaine"
  ],
  "aromes": [
   "Agrumes",
   "beurre",
   "noisette",
   "pierre a fusil"
  ],
  "tanins": null,
  "acidite": "Moyenne+",
  "corps": "Moyen-Corsé",
  "garde": "3-30 ans",
  "tempService": "11-13 °C",
  "accords": [
   "Poissons en sauce",
   "volaille",
   "homard"
  ]
 },
 {
  "id": "CEP032",
  "nom": "Chenin Blanc",
  "couleur": "Blanc",
  "origine": "Loire",
  "appellations": [
   "Vouvray",
   "Savennières",
   "Montlouis",
   "Coteaux du Layon"
  ],
  "synonymes": [
   "Pineau de la Loire"
  ],
  "aromes": [
   "Coing",
   "miel",
   "camomille",
   "cire"
  ],
  "tanins": null,
  "acidite": "Très élevée",
  "corps": "Moyen",
  "garde": "5-50 ans",
  "tempService": "10-12 °C",
  "accords": [
   "Poissons",
   "foie gras (moelleux)",
   "chèvre"
  ]
 },
 {
  "id": "CEP033",
  "nom": "Sauvignon Blanc",
  "couleur": "Blanc",
  "origine": "Loire / Bordeaux",
  "appellations": [
   "Sancerre",
   "Pouilly-Fumé",
   "Menetou",
   "Bordeaux Blanc"
  ],
  "synonymes": [
   "Blanc Fumé",
   "Surin"
  ],
  "aromes": [
   "Buis",
   "agrumes",
   "fruit de la passion",
   "silex"
  ],
  "tanins": null,
  "acidite": "Très élevée",
  "corps": "Léger-Moyen",
  "garde": "2-10 ans",
  "tempService": "10-12 °C",
  "accords": [
   "Chèvre",
   "huitres",
   "asperges"
  ]
 },
 {
  "id": "CEP034",
  "nom": "Semillon",
  "couleur": "Blanc",
  "origine": "Bordeaux",
  "appellations": [
   "Sauternes",
   "Barsac",
   "Pessac-Léognan",
   "Graves"
  ],
  "synonymes": [
   "Chevrier"
  ],
  "aromes": [
   "Miel",
   "cire",
   "citron confit",
   "botrytis"
  ],
  "tanins": null,
  "acidite": "Faible-Moyenne",
  "corps": "Corsé",
  "garde": "5-50 ans",
  "tempService": "9-12 °C",
  "accords": [
   "Foie gras",
   "roquefort",
   "poissons riches"
  ]
 },
 {
  "id": "CEP035",
  "nom": "Muscadelle",
  "couleur": "Blanc",
  "origine": "Bordeaux",
  "appellations": [
   "Sauternes",
   "Bordeaux",
   "Bergerac"
  ],
  "synonymes": [],
  "aromes": [
   "Muscat",
   "fleurs",
   "raisin frais"
  ],
  "tanins": null,
  "acidite": "Faible",
  "corps": "Moyen",
  "garde": "3-10 ans",
  "tempService": "10 °C",
  "accords": [
   "Aperitif",
   "desserts"
  ]
 },
 {
  "id": "CEP036",
  "nom": "Riesling",
  "couleur": "Blanc",
  "origine": "Alsace",
  "appellations": [
   "Alsace Grand Cru",
   "Alsace"
  ],
  "synonymes": [],
  "aromes": [
   "Citron",
   "pétrole",
   "fleur blanche",
   "minérale"
  ],
  "tanins": null,
  "acidite": "Très élevée",
  "corps": "Léger-Moyen",
  "garde": "5-40 ans",
  "tempService": "10-12 °C",
  "accords": [
   "Choucroute",
   "poissons",
   "sushi"
  ]
 },
 {
  "id": "CEP037",
  "nom": "Gewurztraminer",
  "couleur": "Blanc",
  "origine": "Alsace",
  "appellations": [
   "Alsace Grand Cru",
   "Alsace"
  ],
  "synonymes": [
   "Traminer aromatique"
  ],
  "aromes": [
   "Litchi",
   "rosé",
   "épices",
   "pain d'épices"
  ],
  "tanins": null,
  "acidite": "Faible",
  "corps": "Corsé",
  "garde": "5-30 ans",
  "tempService": "10-12 °C",
  "accords": [
   "Munster",
   "cuisine asiatique",
   "foie gras"
  ]
 },
 {
  "id": "CEP038",
  "nom": "Pinot Gris",
  "couleur": "Blanc",
  "origine": "Alsace",
  "appellations": [
   "Alsace Grand Cru",
   "Alsace"
  ],
  "synonymes": [
   "Tokay d'Alsace",
   "Grauburgunder"
  ],
  "aromes": [
   "Poire",
   "fumée",
   "miel",
   "champignon"
  ],
  "tanins": null,
  "acidite": "Moyenne",
  "corps": "Corsé",
  "garde": "5-25 ans",
  "tempService": "11-12 °C",
  "accords": [
   "Volaille",
   "plats en sauce",
   "foie gras"
  ]
 },
 {
  "id": "CEP039",
  "nom": "Muscat d'Alsace",
  "couleur": "Blanc",
  "origine": "Alsace",
  "appellations": [
   "Alsace",
   "Alsace Grand Cru"
  ],
  "synonymes": [
   "Muscat Ottonel",
   "Petits Grains"
  ],
  "aromes": [
   "Raisin frais",
   "menthe",
   "agrume"
  ],
  "tanins": null,
  "acidite": "Moyenne",
  "corps": "Léger",
  "garde": "2-10 ans",
  "tempService": "9-10 °C",
  "accords": [
   "Asperges",
   "aperitif"
  ]
 },
 {
  "id": "CEP040",
  "nom": "Sylvaner",
  "couleur": "Blanc",
  "origine": "Alsace",
  "appellations": [
   "Alsace"
  ],
  "synonymes": [
   "Silvaner"
  ],
  "aromes": [
   "Herbes fraîches",
   "agrume discret"
  ],
  "tanins": null,
  "acidite": "Élevée",
  "corps": "Léger",
  "garde": "2-8 ans",
  "tempService": "9-10 °C",
  "accords": [
   "Fruits de mer",
   "charcuterie"
  ]
 },
 {
  "id": "CEP041",
  "nom": "Pinot Blanc",
  "couleur": "Blanc",
  "origine": "Alsace",
  "appellations": [
   "Alsace",
   "Crémant d'Alsace"
  ],
  "synonymes": [
   "Klevner",
   "Weissburgunder"
  ],
  "aromes": [
   "Pomme",
   "amande",
   "fleurs"
  ],
  "tanins": null,
  "acidite": "Moyenne",
  "corps": "Léger-Moyen",
  "garde": "2-8 ans",
  "tempService": "9-11 °C",
  "accords": [
   "Quiches",
   "poissons"
  ]
 },
 {
  "id": "CEP042",
  "nom": "Aligoté",
  "couleur": "Blanc",
  "origine": "Bourgogne",
  "appellations": [
   "Bouzeron",
   "Bourgogne Aligoté"
  ],
  "synonymes": [],
  "aromes": [
   "Citron",
   "pomme verte",
   "minérale"
  ],
  "tanins": null,
  "acidite": "Très élevée",
  "corps": "Léger",
  "garde": "2-10 ans",
  "tempService": "10-11 °C",
  "accords": [
   "Escargots",
   "huitres",
   "kir"
  ]
 },
 {
  "id": "CEP043",
  "nom": "Viognier",
  "couleur": "Blanc",
  "origine": "Rhône Nord",
  "appellations": [
   "Condrieu",
   "Château-Grillet",
   "Côtes du Rhône"
  ],
  "synonymes": [
   "Vionnier"
  ],
  "aromes": [
   "Abricot",
   "pêche",
   "violette",
   "musc"
  ],
  "tanins": null,
  "acidite": "Faible",
  "corps": "Corsé",
  "garde": "3-12 ans",
  "tempService": "11-13 °C",
  "accords": [
   "Poissons riches",
   "cuisine épicée"
  ]
 },
 {
  "id": "CEP044",
  "nom": "Marsanne",
  "couleur": "Blanc",
  "origine": "Rhône Nord",
  "appellations": [
   "Hermitage",
   "St-Joseph",
   "St-Péray"
  ],
  "synonymes": [
   "Ermitage blanc"
  ],
  "aromes": [
   "Amande",
   "miel",
   "acacia",
   "cire"
  ],
  "tanins": null,
  "acidite": "Faible",
  "corps": "Corsé",
  "garde": "5-20 ans",
  "tempService": "11-13 °C",
  "accords": [
   "Volaille crémée",
   "poissons gras"
  ]
 },
 {
  "id": "CEP045",
  "nom": "Roussanne",
  "couleur": "Blanc",
  "origine": "Rhône",
  "appellations": [
   "Hermitage",
   "Chateauneuf-du-Pape",
   "St-Péray"
  ],
  "synonymes": [
   "Bergeron"
  ],
  "aromes": [
   "The",
   "poire",
   "herbes",
   "miel"
  ],
  "tanins": null,
  "acidite": "Moyenne",
  "corps": "Moyen-Corsé",
  "garde": "5-20 ans",
  "tempService": "11-13 °C",
  "accords": [
   "Poissons nobles",
   "fromages"
  ]
 },
 {
  "id": "CEP046",
  "nom": "Grenache Blanc",
  "couleur": "Blanc",
  "origine": "Rhône Sud",
  "appellations": [
   "Chateauneuf-du-Pape",
   "Côtes du Rhône",
   "Collioure"
  ],
  "synonymes": [
   "Garnacha Blanca"
  ],
  "aromes": [
   "Fenouil",
   "poire",
   "amande"
  ],
  "tanins": null,
  "acidite": "Faible",
  "corps": "Corsé",
  "garde": "3-12 ans",
  "tempService": "11-12 °C",
  "accords": [
   "Poissons grillés",
   "aioli"
  ]
 },
 {
  "id": "CEP047",
  "nom": "Clairette",
  "couleur": "Blanc",
  "origine": "Rhône / Languedoc",
  "appellations": [
   "Clairette de Die",
   "Clairette du Languedoc"
  ],
  "synonymes": [],
  "aromes": [
   "Fleurs",
   "fenouil",
   "pomme"
  ],
  "tanins": null,
  "acidite": "Faible",
  "corps": "Moyen",
  "garde": "2-8 ans",
  "tempService": "10 °C",
  "accords": [
   "Aperitif",
   "poissons"
  ]
 },
 {
  "id": "CEP048",
  "nom": "Bourboulenc",
  "couleur": "Blanc",
  "origine": "Rhône Sud / Languedoc",
  "appellations": [
   "Chateauneuf-du-Pape",
   "La Clape"
  ],
  "synonymes": [
   "Doucillon"
  ],
  "aromes": [
   "Agrumes",
   "fleurs blanches"
  ],
  "tanins": null,
  "acidite": "Élevée",
  "corps": "Léger",
  "garde": "2-8 ans",
  "tempService": "10-11 °C",
  "accords": [
   "Fruits de mer"
  ]
 },
 {
  "id": "CEP049",
  "nom": "Picpoul",
  "couleur": "Blanc",
  "origine": "Languedoc",
  "appellations": [
   "Picpoul de Pinet",
   "Chateauneuf-du-Pape"
  ],
  "synonymes": [
   "Piquepoul"
  ],
  "aromes": [
   "Citron vert",
   "iode",
   "fleurs"
  ],
  "tanins": null,
  "acidite": "Très élevée",
  "corps": "Léger",
  "garde": "1-5 ans",
  "tempService": "8-10 °C",
  "accords": [
   "Huitres",
   "coquillages"
  ]
 },
 {
  "id": "CEP050",
  "nom": "Vermentino",
  "couleur": "Blanc",
  "origine": "Corse / Provence",
  "appellations": [
   "Patrimonio",
   "Corse",
   "Côtes de Provence"
  ],
  "synonymes": [
   "Rolle",
   "Malvoisie de Corse"
  ],
  "aromes": [
   "Poire",
   "amande",
   "anis",
   "iode"
  ],
  "tanins": null,
  "acidite": "Moyenne",
  "corps": "Moyen",
  "garde": "2-10 ans",
  "tempService": "10-12 °C",
  "accords": [
   "Poissons grillés",
   "aioli"
  ]
 },
 {
  "id": "CEP051",
  "nom": "Savagnin",
  "couleur": "Blanc",
  "origine": "Jura",
  "appellations": [
   "Château-Chalon",
   "Côtes du Jura",
   "Arbois"
  ],
  "synonymes": [
   "Naturé"
  ],
  "aromes": [
   "Noix",
   "curry",
   "pomme verte (oxydatif)"
  ],
  "tanins": null,
  "acidite": "Très élevée",
  "corps": "Corsé",
  "garde": "10-100 ans",
  "tempService": "14-16 °C",
  "accords": [
   "Comte",
   "volaille au vin jaune",
   "morilles"
  ]
 },
 {
  "id": "CEP052",
  "nom": "Jacquère",
  "couleur": "Blanc",
  "origine": "Savoie",
  "appellations": [
   "Apremont",
   "Abymes",
   "Chignin"
  ],
  "synonymes": [],
  "aromes": [
   "Silex",
   "pomme",
   "blancheur alpine"
  ],
  "tanins": null,
  "acidite": "Élevée",
  "corps": "Léger",
  "garde": "1-5 ans",
  "tempService": "9-10 °C",
  "accords": [
   "Fondue",
   "raclette",
   "poissons de lac"
  ]
 },
 {
  "id": "CEP053",
  "nom": "Altesse",
  "couleur": "Blanc",
  "origine": "Savoie",
  "appellations": [
   "Roussette de Savoie",
   "Seyssel"
  ],
  "synonymes": [
   "Roussette"
  ],
  "aromes": [
   "Miel",
   "bergamote",
   "amande"
  ],
  "tanins": null,
  "acidite": "Élevée",
  "corps": "Moyen",
  "garde": "3-15 ans",
  "tempService": "10-12 °C",
  "accords": [
   "Poissons de lac",
   "volaille"
  ]
 },
 {
  "id": "CEP054",
  "nom": "Roussanne de Savoie",
  "couleur": "Blanc",
  "origine": "Savoie",
  "appellations": [
   "Chignin-Bergeron"
  ],
  "synonymes": [
   "Bergeron"
  ],
  "aromes": [
   "Abricot",
   "miel",
   "fleurs"
  ],
  "tanins": null,
  "acidite": "Moyenne",
  "corps": "Corsé",
  "garde": "3-12 ans",
  "tempService": "11-12 °C",
  "accords": [
   "Poissons en sauce"
  ]
 },
 {
  "id": "CEP055",
  "nom": "Melon de Bourgogne",
  "couleur": "Blanc",
  "origine": "Loire",
  "appellations": [
   "Muscadet Sèvre-et-Maine",
   "Muscadet"
  ],
  "synonymes": [
   "Muscadet"
  ],
  "aromes": [
   "Iode",
   "citron",
   "levures (sur lie)"
  ],
  "tanins": null,
  "acidite": "Élevée",
  "corps": "Léger",
  "garde": "1-15 ans",
  "tempService": "8-10 °C",
  "accords": [
   "Huitres",
   "fruits de mer"
  ]
 },
 {
  "id": "CEP056",
  "nom": "Folle Blanche",
  "couleur": "Blanc",
  "origine": "Loire / Cognac",
  "appellations": [
   "Gros Plant du Pays Nantais"
  ],
  "synonymes": [
   "Gros Plant",
   "Picpoul"
  ],
  "aromes": [
   "Citron",
   "acidité vive"
  ],
  "tanins": null,
  "acidite": "Très élevée",
  "corps": "Très léger",
  "garde": "1-4 ans",
  "tempService": "8-9 °C",
  "accords": [
   "Coquillages"
  ]
 },
 {
  "id": "CEP057",
  "nom": "Romorantin",
  "couleur": "Blanc",
  "origine": "Loire",
  "appellations": [
   "Cour-Cheverny"
  ],
  "synonymes": [],
  "aromes": [
   "Citron",
   "miel",
   "minérale"
  ],
  "tanins": null,
  "acidite": "Très élevée",
  "corps": "Moyen",
  "garde": "5-30 ans",
  "tempService": "10-11 °C",
  "accords": [
   "Poissons",
   "fromages de chèvre"
  ]
 },
 {
  "id": "CEP058",
  "nom": "Menu Pineau",
  "couleur": "Blanc",
  "origine": "Loire",
  "appellations": [
   "Cheverny",
   "Valençay"
  ],
  "synonymes": [
   "Arbois blanc"
  ],
  "aromes": [
   "Fleurs",
   "agrume"
  ],
  "tanins": null,
  "acidite": "Élevée",
  "corps": "Léger",
  "garde": "2-6 ans",
  "tempService": "9-10 °C",
  "accords": [
   "Aperitif"
  ]
 },
 {
  "id": "CEP059",
  "nom": "Petit Manseng",
  "couleur": "Blanc",
  "origine": "Sud-Ouest",
  "appellations": [
   "Jurançon",
   "Pacherenc du Vic-Bilh"
  ],
  "synonymes": [],
  "aromes": [
   "Ananas",
   "mangue",
   "épices",
   "acidité vive"
  ],
  "tanins": null,
  "acidite": "Très élevée",
  "corps": "Corsé",
  "garde": "5-30 ans",
  "tempService": "9-11 °C",
  "accords": [
   "Foie gras",
   "desserts fruites"
  ]
 },
 {
  "id": "CEP060",
  "nom": "Gros Manseng",
  "couleur": "Blanc",
  "origine": "Sud-Ouest",
  "appellations": [
   "Jurançon Sec",
   "Pacherenc",
   "IGP Côtes de Gascogne"
  ],
  "synonymes": [],
  "aromes": [
   "Agrume",
   "fruit exotique",
   "vivacite"
  ],
  "tanins": null,
  "acidite": "Très élevée",
  "corps": "Moyen",
  "garde": "2-10 ans",
  "tempService": "9-11 °C",
  "accords": [
   "Poissons",
   "cuisine épicée"
  ]
 },
 {
  "id": "CEP061",
  "nom": "Mauzac",
  "couleur": "Blanc",
  "origine": "Sud-Ouest",
  "appellations": [
   "Gaillac",
   "Limoux",
   "Blanquette"
  ],
  "synonymes": [
   "Blanquette"
  ],
  "aromes": [
   "Pomme cuite",
   "poire"
  ],
  "tanins": null,
  "acidite": "Élevée",
  "corps": "Moyen",
  "garde": "2-10 ans",
  "tempService": "8-10 °C",
  "accords": [
   "Aperitif",
   "desserts pommes"
  ]
 },
 {
  "id": "CEP062",
  "nom": "Len de l'El",
  "couleur": "Blanc",
  "origine": "Sud-Ouest",
  "appellations": [
   "Gaillac"
  ],
  "synonymes": [
   "Loin de l'Oeil"
  ],
  "aromes": [
   "Fleurs",
   "poire",
   "miel"
  ],
  "tanins": null,
  "acidite": "Faible",
  "corps": "Moyen",
  "garde": "2-8 ans",
  "tempService": "10 °C",
  "accords": [
   "Volaille"
  ]
 },
 {
  "id": "CEP063",
  "nom": "Colombard",
  "couleur": "Blanc",
  "origine": "Sud-Ouest",
  "appellations": [
   "IGP Côtes de Gascogne"
  ],
  "synonymes": [],
  "aromes": [
   "Pamplemousse",
   "buis"
  ],
  "tanins": null,
  "acidite": "Très élevée",
  "corps": "Léger",
  "garde": "1-3 ans",
  "tempService": "8-9 °C",
  "accords": [
   "Aperitif",
   "salades"
  ]
 },
 {
  "id": "CEP064",
  "nom": "Ugni Blanc",
  "couleur": "Blanc",
  "origine": "Charentes / Sud",
  "appellations": [
   "Cognac",
   "IGP"
  ],
  "synonymes": [
   "Trebbiano",
   "St-Émilion des Charentes"
  ],
  "aromes": [
   "Neutre",
   "citron"
  ],
  "tanins": null,
  "acidite": "Très élevée",
  "corps": "Très léger",
  "garde": "1-3 ans",
  "tempService": "8-9 °C",
  "accords": [
   "Base distillation"
  ]
 },
 {
  "id": "CEP065",
  "nom": "Petit Courbu",
  "couleur": "Blanc",
  "origine": "Sud-Ouest",
  "appellations": [
   "Jurançon",
   "Béarn"
  ],
  "synonymes": [],
  "aromes": [
   "Fleurs",
   "agrume",
   "gras"
  ],
  "tanins": null,
  "acidite": "Moyenne",
  "corps": "Moyen",
  "garde": "3-10 ans",
  "tempService": "10-11 °C",
  "accords": [
   "Poissons"
  ]
 },
 {
  "id": "CEP066",
  "nom": "Muscat a Petits Grains",
  "couleur": "Blanc",
  "origine": "Rhône / Languedoc",
  "appellations": [
   "Beaumes-de-Venise",
   "Rivesaltes",
   "Frontignan"
  ],
  "synonymes": [
   "Muscat blanc"
  ],
  "aromes": [
   "Raisin",
   "rosé",
   "agrume confit"
  ],
  "tanins": null,
  "acidite": "Faible",
  "corps": "Corsé",
  "garde": "3-20 ans",
  "tempService": "8-10 °C",
  "accords": [
   "Desserts",
   "melon",
   "foie gras"
  ]
 },
 {
  "id": "CEP067",
  "nom": "Macabeu",
  "couleur": "Blanc",
  "origine": "Roussillon",
  "appellations": [
   "Rivesaltes",
   "Côtes du Roussillon"
  ],
  "synonymes": [
   "Viura",
   "Maccabeo"
  ],
  "aromes": [
   "Fleurs",
   "pomme",
   "rancio"
  ],
  "tanins": null,
  "acidite": "Faible",
  "corps": "Moyen",
  "garde": "3-30 ans",
  "tempService": "10-14 °C",
  "accords": [
   "Aperitif",
   "desserts"
  ]
 },
 {
  "id": "CEP068",
  "nom": "Grenache Gris",
  "couleur": "Rosé/Gris",
  "origine": "Roussillon",
  "appellations": [
   "Collioure",
   "Côtes Catalanes"
  ],
  "synonymes": [],
  "aromes": [
   "Agrume",
   "épices",
   "salinite"
  ],
  "tanins": "Faible",
  "acidite": "Moyenne",
  "corps": "Moyen",
  "garde": "3-15 ans",
  "tempService": "11-12 °C",
  "accords": [
   "Poissons grillés"
  ]
 },
 {
  "id": "CEP069",
  "nom": "Tibouren",
  "couleur": "Rouge",
  "origine": "Provence",
  "appellations": [
   "Côtes de Provence"
  ],
  "synonymes": [
   "Rossese"
  ],
  "aromes": [
   "Garrigue",
   "fruits rouges pales"
  ],
  "tanins": "Faible",
  "acidite": "Moyenne",
  "corps": "Léger",
  "garde": "2-8 ans",
  "tempService": "12-14 °C",
  "accords": [
   "Rosés de gastronomie"
  ]
 },
 {
  "id": "CEP070",
  "nom": "Braquet",
  "couleur": "Rouge",
  "origine": "Provence",
  "appellations": [
   "Bellet"
  ],
  "synonymes": [
   "Brachetto"
  ],
  "aromes": [
   "Rosé",
   "fruits rouges"
  ],
  "tanins": "Faible",
  "acidite": "Élevée",
  "corps": "Léger",
  "garde": "3-10 ans",
  "tempService": "14 °C",
  "accords": [
   "Cuisine nicoise"
  ]
 },
 {
  "id": "CEP071",
  "nom": "Folle Noire",
  "couleur": "Rouge",
  "origine": "Provence",
  "appellations": [
   "Bellet"
  ],
  "synonymes": [
   "Fuella Nera"
  ],
  "aromes": [
   "Poivre",
   "fruits noirs"
  ],
  "tanins": "Moyen",
  "acidite": "Moyenne",
  "corps": "Moyen",
  "garde": "5-15 ans",
  "tempService": "15-16 °C",
  "accords": [
   "Viandes mijotées"
  ]
 },
 {
  "id": "CEP072",
  "nom": "Rolle",
  "couleur": "Blanc",
  "origine": "Provence",
  "appellations": [
   "Bellet",
   "Côtes de Provence"
  ],
  "synonymes": [
   "Vermentino"
  ],
  "aromes": [
   "Poire",
   "fenouil",
   "iode"
  ],
  "tanins": null,
  "acidite": "Moyenne",
  "corps": "Moyen",
  "garde": "2-10 ans",
  "tempService": "10-12 °C",
  "accords": [
   "Poissons"
  ]
 },
 {
  "id": "CEP073",
  "nom": "Ugni Noir / Aubun",
  "couleur": "Rouge",
  "origine": "Rhône Sud",
  "appellations": [
   "Côtes du Rhône"
  ],
  "synonymes": [
   "Counoise noire"
  ],
  "aromes": [
   "Fruits rouges",
   "épices"
  ],
  "tanins": "Faible",
  "acidite": "Moyenne",
  "corps": "Léger",
  "garde": "2-8 ans",
  "tempService": "15 °C",
  "accords": [
   "Charcuterie"
  ]
 },
 {
  "id": "CEP074",
  "nom": "Muscardin",
  "couleur": "Rouge",
  "origine": "Rhône Sud",
  "appellations": [
   "Chateauneuf-du-Pape"
  ],
  "synonymes": [],
  "aromes": [
   "Floral",
   "fruits rouges frais"
  ],
  "tanins": "Faible",
  "acidite": "Élevée",
  "corps": "Léger",
  "garde": "3-10 ans",
  "tempService": "15 °C",
  "accords": [
   "Volaille"
  ]
 },
 {
  "id": "CEP075",
  "nom": "Vaccarese",
  "couleur": "Rouge",
  "origine": "Rhône Sud",
  "appellations": [
   "Chateauneuf-du-Pape"
  ],
  "synonymes": [
   "Brun Argente"
  ],
  "aromes": [
   "Poivre",
   "fruits rouges"
  ],
  "tanins": "Faible",
  "acidite": "Élevée",
  "corps": "Léger",
  "garde": "3-12 ans",
  "tempService": "15 °C",
  "accords": [
   "Charcuterie"
  ]
 },
 {
  "id": "CEP076",
  "nom": "Picardan",
  "couleur": "Blanc",
  "origine": "Rhône Sud",
  "appellations": [
   "Chateauneuf-du-Pape"
  ],
  "synonymes": [],
  "aromes": [
   "Neutre",
   "floral"
  ],
  "tanins": null,
  "acidite": "Moyenne",
  "corps": "Léger",
  "garde": "2-8 ans",
  "tempService": "10 °C",
  "accords": [
   "Aperitif"
  ]
 },
 {
  "id": "CEP077",
  "nom": "Lledoner Pelut",
  "couleur": "Rouge",
  "origine": "Roussillon",
  "appellations": [
   "Côtes du Roussillon"
  ],
  "synonymes": [
   "Grenache poilu"
  ],
  "aromes": [
   "Fruits rouges",
   "garrigue"
  ],
  "tanins": "Moyen",
  "acidite": "Faible",
  "corps": "Corsé",
  "garde": "5-15 ans",
  "tempService": "16 °C",
  "accords": [
   "Viandes mijotées"
  ]
 },
 {
  "id": "CEP078",
  "nom": "Chasselas",
  "couleur": "Blanc",
  "origine": "Savoie / Loire",
  "appellations": [
   "Crépy",
   "Pouilly-sur-Loire"
  ],
  "synonymes": [
   "Fendant"
  ],
  "aromes": [
   "Amande",
   "fleurs",
   "discret"
  ],
  "tanins": null,
  "acidite": "Faible",
  "corps": "Très léger",
  "garde": "1-4 ans",
  "tempService": "9-10 °C",
  "accords": [
   "Fondue",
   "poissons de lac"
  ]
 },
 {
  "id": "CEP079",
  "nom": "Gringet",
  "couleur": "Blanc",
  "origine": "Savoie",
  "appellations": [
   "Ayze"
  ],
  "synonymes": [],
  "aromes": [
   "Fleurs blanches",
   "poire",
   "fines bulles"
  ],
  "tanins": null,
  "acidite": "Élevée",
  "corps": "Léger",
  "garde": "3-15 ans",
  "tempService": "9-10 °C",
  "accords": [
   "Aperitif",
   "poissons"
  ]
 },
 {
  "id": "CEP080",
  "nom": "Molette",
  "couleur": "Blanc",
  "origine": "Savoie",
  "appellations": [
   "Seyssel Mousseux"
  ],
  "synonymes": [],
  "aromes": [
   "Neutre",
   "floral"
  ],
  "tanins": null,
  "acidite": "Élevée",
  "corps": "Léger",
  "garde": "1-4 ans",
  "tempService": "8-9 °C",
  "accords": [
   "Aperitif"
  ]
 },
 {
  "id": "CEP081",
  "nom": "Chardonnay du Jura",
  "couleur": "Blanc",
  "origine": "Jura",
  "appellations": [
   "Côtes du Jura",
   "Arbois",
   "Crémant du Jura"
  ],
  "synonymes": [
   "Melon d'Arbois"
  ],
  "aromes": [
   "Noisette",
   "pomme",
   "oxydatif possible"
  ],
  "tanins": null,
  "acidite": "Élevée",
  "corps": "Moyen",
  "garde": "5-25 ans",
  "tempService": "11-13 °C",
  "accords": [
   "Comte",
   "volaille"
  ]
 },
 {
  "id": "CEP082",
  "nom": "Arbane",
  "couleur": "Blanc",
  "origine": "Champagne",
  "appellations": [
   "Champagne (cépage rare)"
  ],
  "synonymes": [],
  "aromes": [
   "Floral",
   "acidité extrême"
  ],
  "tanins": null,
  "acidite": "Très élevée",
  "corps": "Léger",
  "garde": "5-20 ans",
  "tempService": "10-12 °C",
  "accords": [
   "Aperitif"
  ]
 },
 {
  "id": "CEP083",
  "nom": "Petit Meslier",
  "couleur": "Blanc",
  "origine": "Champagne",
  "appellations": [
   "Champagne (rare)"
  ],
  "synonymes": [],
  "aromes": [
   "Agrume",
   "herbes",
   "vif"
  ],
  "tanins": null,
  "acidite": "Très élevée",
  "corps": "Léger",
  "garde": "5-20 ans",
  "tempService": "10-12 °C",
  "accords": [
   "Fruits de mer"
  ]
 },
 {
  "id": "CEP084",
  "nom": "Pinot Blanc Champagne",
  "couleur": "Blanc",
  "origine": "Champagne",
  "appellations": [
   "Champagne (rare)"
  ],
  "synonymes": [
   "Blanc vrai"
  ],
  "aromes": [
   "Pomme",
   "amande"
  ],
  "tanins": null,
  "acidite": "Moyenne",
  "corps": "Léger",
  "garde": "3-12 ans",
  "tempService": "10-12 °C",
  "accords": [
   "Aperitif"
  ]
 },
 {
  "id": "CEP085",
  "nom": "Fromenteau",
  "couleur": "Blanc",
  "origine": "Champagne",
  "appellations": [
   "Champagne (rare)"
  ],
  "synonymes": [
   "Pinot Gris"
  ],
  "aromes": [
   "Fruits jaunes",
   "fumée"
  ],
  "tanins": null,
  "acidite": "Moyenne",
  "corps": "Moyen",
  "garde": "5-15 ans",
  "tempService": "10-12 °C",
  "accords": [
   "Volaille"
  ]
 },
 {
  "id": "CEP086",
  "nom": "Ondenc",
  "couleur": "Blanc",
  "origine": "Sud-Ouest",
  "appellations": [
   "Gaillac"
  ],
  "synonymes": [],
  "aromes": [
   "Fleurs",
   "poire",
   "doux"
  ],
  "tanins": null,
  "acidite": "Moyenne",
  "corps": "Moyen",
  "garde": "3-15 ans",
  "tempService": "9-10 °C",
  "accords": [
   "Desserts"
  ]
 },
 {
  "id": "CEP087",
  "nom": "Prunelard",
  "couleur": "Rouge",
  "origine": "Sud-Ouest",
  "appellations": [
   "Gaillac"
  ],
  "synonymes": [],
  "aromes": [
   "Prune",
   "violette"
  ],
  "tanins": "Élevé",
  "acidite": "Moyenne",
  "corps": "Corsé",
  "garde": "5-15 ans",
  "tempService": "16-17 °C",
  "accords": [
   "Viandes rouges"
  ]
 },
 {
  "id": "CEP088",
  "nom": "Abouriou",
  "couleur": "Rouge",
  "origine": "Sud-Ouest",
  "appellations": [
   "Côtes du Marmandais"
  ],
  "synonymes": [],
  "aromes": [
   "Fruits rouges",
   "épices"
  ],
  "tanins": "Moyen",
  "acidite": "Moyenne",
  "corps": "Moyen",
  "garde": "3-10 ans",
  "tempService": "15-16 °C",
  "accords": [
   "Grillades"
  ]
 },
 {
  "id": "CEP089",
  "nom": "Jurançon Noir",
  "couleur": "Rouge",
  "origine": "Sud-Ouest",
  "appellations": [
   "IGP"
  ],
  "synonymes": [
   "Folle Noire"
  ],
  "aromes": [
   "Fruits rouges simples"
  ],
  "tanins": "Faible",
  "acidite": "Moyenne",
  "corps": "Léger",
  "garde": "1-5 ans",
  "tempService": "14 °C",
  "accords": [
   "Charcuterie"
  ]
 },
 {
  "id": "CEP090",
  "nom": "Sciacarello blanc / Codivarta",
  "couleur": "Blanc",
  "origine": "Corse",
  "appellations": [
   "Patrimonio"
  ],
  "synonymes": [],
  "aromes": [
   "Fleurs",
   "amande"
  ],
  "tanins": null,
  "acidite": "Moyenne",
  "corps": "Léger",
  "garde": "2-8 ans",
  "tempService": "10 °C",
  "accords": [
   "Poissons"
  ]
 },
 {
  "id": "CEP091",
  "nom": "Biancu Gentile",
  "couleur": "Blanc",
  "origine": "Corse",
  "appellations": [
   "Corse (rare)"
  ],
  "synonymes": [],
  "aromes": [
   "Agrume",
   "maquis",
   "exotique"
  ],
  "tanins": null,
  "acidite": "Élevée",
  "corps": "Moyen",
  "garde": "2-10 ans",
  "tempService": "10-11 °C",
  "accords": [
   "Poissons",
   "fruits de mer"
  ]
 },
 {
  "id": "CEP092",
  "nom": "Barbarossa",
  "couleur": "Rosé",
  "origine": "Corse",
  "appellations": [
   "Corse (rare)"
  ],
  "synonymes": [],
  "aromes": [
   "Fruits rouges",
   "épices"
  ],
  "tanins": "Faible",
  "acidite": "Moyenne",
  "corps": "Léger",
  "garde": "2-6 ans",
  "tempService": "11 °C",
  "accords": [
   "Cuisine corse"
  ]
 }
]

// 100 domaines de référence : cuvées, style, statut.
export const DOMAINES_FR = [
 {
  "id": "DOM001",
  "nom": "Château Lafite Rothschild",
  "region": "Bordeaux",
  "appellation": "Pauillac",
  "cuvees": [
   "Lafite",
   "Carruades"
  ],
  "style": "Élégant, cèdre, très longue garde",
  "statut": "1er Cru Classé 1855",
  "note": "Référence mondiale"
 },
 {
  "id": "DOM002",
  "nom": "Château Latour",
  "region": "Bordeaux",
  "appellation": "Pauillac",
  "cuvees": [
   "Grand Vin",
   "Les Forts de Latour"
  ],
  "style": "Puissant, austère jeune",
  "statut": "1er Cru Classé 1855",
  "note": "Sorti du système primeurs"
 },
 {
  "id": "DOM003",
  "nom": "Château Mouton Rothschild",
  "region": "Bordeaux",
  "appellation": "Pauillac",
  "cuvees": [
   "Grand Vin",
   "Petit Mouton"
  ],
  "style": "Riche, exotique, étiquettes d'artistes",
  "statut": "1er Cru (1973)",
  "note": null
 },
 {
  "id": "DOM004",
  "nom": "Château Margaux",
  "region": "Bordeaux",
  "appellation": "Margaux",
  "cuvees": [
   "Grand Vin",
   "Pavillon Rouge",
   "Blanc"
  ],
  "style": "Floral, soyeux",
  "statut": "1er Cru Classé 1855",
  "note": null
 },
 {
  "id": "DOM005",
  "nom": "Château Haut-Brion",
  "region": "Bordeaux",
  "appellation": "Pessac-Léognan",
  "cuvees": [
   "Grand Vin",
   "Clarence",
   "Blanc"
  ],
  "style": "Fumé, tabac, terroir de graves",
  "statut": "1er Cru Classé 1855",
  "note": "Seul Graves classé 1855"
 },
 {
  "id": "DOM006",
  "nom": "Petrus",
  "region": "Bordeaux",
  "appellation": "Pomerol",
  "cuvees": [
   "Petrus"
  ],
  "style": "Merlot pur sur argile bleue",
  "statut": "Non classé",
  "note": "Vin le plus cher de Pomerol"
 },
 {
  "id": "DOM007",
  "nom": "Château Cheval Blanc",
  "region": "Bordeaux",
  "appellation": "Saint-Émilion",
  "cuvees": [
   "Grand Vin",
   "Petit Cheval"
  ],
  "style": "Cabernet Franc dominant, soyeux",
  "statut": "1er GCC A (hors classement 2022)",
  "note": null
 },
 {
  "id": "DOM008",
  "nom": "Château Ausone",
  "region": "Bordeaux",
  "appellation": "Saint-Émilion",
  "cuvees": [
   "Ausone",
   "Chapelle d'Ausone"
  ],
  "style": "Minérale, côtes calcaires",
  "statut": "1er GCC A (retiré)",
  "note": null
 },
 {
  "id": "DOM009",
  "nom": "Château d'Yquem",
  "region": "Bordeaux",
  "appellation": "Sauternes",
  "cuvees": [
   "Yquem",
   "Y (sec)"
  ],
  "style": "Liquoreux ultime, botrytis",
  "statut": "1er Cru Supérieur",
  "note": "Garde 100 ans+"
 },
 {
  "id": "DOM010",
  "nom": "Château Palmer",
  "region": "Bordeaux",
  "appellation": "Margaux",
  "cuvees": [
   "Palmer",
   "Alter Ego"
  ],
  "style": "Merlot élevé, parfume, biodynamie",
  "statut": "3e Cru Classé",
  "note": null
 },
 {
  "id": "DOM011",
  "nom": "Château Pichon Baron",
  "region": "Bordeaux",
  "appellation": "Pauillac",
  "cuvees": [
   "Grand Vin",
   "Griffons"
  ],
  "style": "Structure, classique",
  "statut": "2e Cru Classé",
  "note": null
 },
 {
  "id": "DOM012",
  "nom": "Château Leoville Las Cases",
  "region": "Bordeaux",
  "appellation": "Saint-Julien",
  "cuvees": [
   "Grand Vin",
   "Petit Lion"
  ],
  "style": "Précis, tendu, super-second",
  "statut": "2e Cru Classé",
  "note": null
 },
 {
  "id": "DOM013",
  "nom": "Château Montrose",
  "region": "Bordeaux",
  "appellation": "Saint-Estèphe",
  "cuvees": [
   "Montrose",
   "La Dame de Montrose"
  ],
  "style": "Puissant, longue garde",
  "statut": "2e Cru Classé",
  "note": null
 },
 {
  "id": "DOM014",
  "nom": "Château Angelus",
  "region": "Bordeaux",
  "appellation": "Saint-Émilion",
  "cuvees": [
   "Angelus",
   "Carillon"
  ],
  "style": "Merlot riche, boise",
  "statut": "Ex-1er GCC A",
  "note": null
 },
 {
  "id": "DOM015",
  "nom": "Château Figeac",
  "region": "Bordeaux",
  "appellation": "Saint-Émilion",
  "cuvees": [
   "Figeac",
   "Petit-Figeac"
  ],
  "style": "Graves, Cabernets dominants",
  "statut": "1er GCC A (2022)",
  "note": null
 },
 {
  "id": "DOM016",
  "nom": "Domaine de la Romanée-Conti",
  "region": "Bourgogne",
  "appellation": "Vosne-Romanée",
  "cuvees": [
   "Romanée-Conti",
   "La Tâche",
   "Richebourg",
   "Montrachet"
  ],
  "style": "Sommet mondial, biodynamie",
  "statut": "Grands Crus",
  "note": "Allocations rarissimes"
 },
 {
  "id": "DOM017",
  "nom": "Domaine Leroy",
  "region": "Bourgogne",
  "appellation": "Vosne-Romanée",
  "cuvees": [
   "Musigny",
   "Richebourg",
   "Chambertin"
  ],
  "style": "Biodynamie extrême, rendements minuscules",
  "statut": "Grands Crus",
  "note": null
 },
 {
  "id": "DOM018",
  "nom": "Domaine Armand Rousseau",
  "region": "Bourgogne",
  "appellation": "Gevrey-Chambertin",
  "cuvees": [
   "Chambertin",
   "Clos de Bèze",
   "Clos St-Jacques"
  ],
  "style": "Classicisme, finesse",
  "statut": "Grands Crus",
  "note": null
 },
 {
  "id": "DOM019",
  "nom": "Domaine Coche-Dury",
  "region": "Bourgogne",
  "appellation": "Meursault",
  "cuvees": [
   "Corton-Charlemagne",
   "Meursault Perrières"
  ],
  "style": "Réduction, tension, culte",
  "statut": "Blancs",
  "note": null
 },
 {
  "id": "DOM020",
  "nom": "Domaine Leflaive",
  "region": "Bourgogne",
  "appellation": "Puligny-Montrachet",
  "cuvees": [
   "Montrachet",
   "Chevalier",
   "Bâtard"
  ],
  "style": "Biodynamie pionnière",
  "statut": "Grands Crus blancs",
  "note": null
 },
 {
  "id": "DOM021",
  "nom": "Domaine Comte Georges de Vogue",
  "region": "Bourgogne",
  "appellation": "Chambolle-Musigny",
  "cuvees": [
   "Musigny VV",
   "Bonnes-Mares"
  ],
  "style": "Dentelle, garde",
  "statut": "Grands Crus",
  "note": null
 },
 {
  "id": "DOM022",
  "nom": "Domaine Dujac",
  "region": "Bourgogne",
  "appellation": "Morey-Saint-Denis",
  "cuvees": [
   "Clos de la Roche",
   "Clos St-Denis"
  ],
  "style": "Vendange entière, parfum",
  "statut": "Grands Crus",
  "note": null
 },
 {
  "id": "DOM023",
  "nom": "Domaine Meo-Camuzet",
  "region": "Bourgogne",
  "appellation": "Vosne-Romanée",
  "cuvees": [
   "Cros Parantoux",
   "Richebourg"
  ],
  "style": "Élégance, boise maitrise",
  "statut": "Grands Crus",
  "note": null
 },
 {
  "id": "DOM024",
  "nom": "Domaine Raveneau",
  "region": "Bourgogne",
  "appellation": "Chablis",
  "cuvees": [
   "Les Clos",
   "Blanchot",
   "Montée de Tonnerre"
  ],
  "style": "Minérale absolue, garde",
  "statut": "Grands Crus",
  "note": "Culte"
 },
 {
  "id": "DOM025",
  "nom": "Domaine Vincent Dauvissat",
  "region": "Bourgogne",
  "appellation": "Chablis",
  "cuvees": [
   "Les Clos",
   "Les Preuses"
  ],
  "style": "Tension, élevage foudre",
  "statut": "Grands Crus",
  "note": null
 },
 {
  "id": "DOM026",
  "nom": "Domaine Anne Gros",
  "region": "Bourgogne",
  "appellation": "Vosne-Romanée",
  "cuvees": [
   "Richebourg",
   "Clos Vougeot"
  ],
  "style": "Finesse feminine",
  "statut": "Grands Crus",
  "note": null
 },
 {
  "id": "DOM027",
  "nom": "Domaine Marquis d'Angerville",
  "region": "Bourgogne",
  "appellation": "Volnay",
  "cuvees": [
   "Clos des Ducs"
  ],
  "style": "Pureté, biodynamie",
  "statut": "1ers Crus",
  "note": null
 },
 {
  "id": "DOM028",
  "nom": "Maison Louis Jadot",
  "region": "Bourgogne",
  "appellation": "Beaune",
  "cuvees": [
   "Nombreuses"
  ],
  "style": "Negoce-domaine, qualite régulière",
  "statut": "Multi",
  "note": null
 },
 {
  "id": "DOM029",
  "nom": "Marcel Lapierre",
  "region": "Beaujolais",
  "appellation": "Morgon",
  "cuvees": [
   "Morgon",
   "Cuvée Camille"
  ],
  "style": "Nature, sans soufre, pionnier",
  "statut": "Cru",
  "note": "Gang of Four"
 },
 {
  "id": "DOM030",
  "nom": "Jean Foillard",
  "region": "Beaujolais",
  "appellation": "Morgon",
  "cuvees": [
   "Côte du Py",
   "3.14"
  ],
  "style": "Nature, élégance",
  "statut": "Cru",
  "note": null
 },
 {
  "id": "DOM031",
  "nom": "Château Thivin",
  "region": "Beaujolais",
  "appellation": "Côte de Brouilly",
  "cuvees": [
   "Cuvée Zaccharie"
  ],
  "style": "Classique, roche bleue",
  "statut": "Cru",
  "note": null
 },
 {
  "id": "DOM032",
  "nom": "Domaine Jean-Louis Chave",
  "region": "Rhône",
  "appellation": "Hermitage",
  "cuvees": [
   "Hermitage Rouge",
   "Blanc",
   "Cathelin"
  ],
  "style": "Assemblage de lieux-dits, référence",
  "statut": "AOC",
  "note": "Culte"
 },
 {
  "id": "DOM033",
  "nom": "E. Guigal",
  "region": "Rhône",
  "appellation": "Côte-Rôtie",
  "cuvees": [
   "La Mouline",
   "La Landonne",
   "La Turque"
  ],
  "style": "Boise neuf, opulence, LaLaLa",
  "statut": "AOC",
  "note": "Maison majeure"
 },
 {
  "id": "DOM034",
  "nom": "Chapoutier",
  "region": "Rhône",
  "appellation": "Hermitage",
  "cuvees": [
   "Le Pavillon",
   "L'Ermite"
  ],
  "style": "Biodynamie, selections parcellaires",
  "statut": "AOC",
  "note": "Étiquettes braille"
 },
 {
  "id": "DOM035",
  "nom": "Domaine Jamet",
  "region": "Rhône",
  "appellation": "Côte-Rôtie",
  "cuvees": [
   "Côte-Rôtie",
   "Côte Brune"
  ],
  "style": "Poivre, pureté Syrah",
  "statut": "AOC",
  "note": null
 },
 {
  "id": "DOM036",
  "nom": "Auguste Clape",
  "region": "Rhône",
  "appellation": "Cornas",
  "cuvees": [
   "Cornas",
   "Renaissance"
  ],
  "style": "Syrah brute, garde",
  "statut": "AOC",
  "note": "Référence Cornas"
 },
 {
  "id": "DOM037",
  "nom": "Château Rayas",
  "region": "Rhône",
  "appellation": "Chateauneuf-du-Pape",
  "cuvees": [
   "Rayas",
   "Pignan",
   "Fonsalette"
  ],
  "style": "Grenache pur, sable, culte",
  "statut": "AOC",
  "note": "Legende"
 },
 {
  "id": "DOM038",
  "nom": "Château de Beaucastel",
  "region": "Rhône",
  "appellation": "Chateauneuf-du-Pape",
  "cuvees": [
   "Grand Vin",
   "Hommage a Jacques Perrin"
  ],
  "style": "13 cépages, Mourvedre fort",
  "statut": "AOC",
  "note": "Biodynamie"
 },
 {
  "id": "DOM039",
  "nom": "Domaine du Vieux Telegraphe",
  "region": "Rhône",
  "appellation": "Chateauneuf-du-Pape",
  "cuvees": [
   "La Crau"
  ],
  "style": "Galets roules, classique",
  "statut": "AOC",
  "note": null
 },
 {
  "id": "DOM040",
  "nom": "Clos des Papes",
  "region": "Rhône",
  "appellation": "Chateauneuf-du-Pape",
  "cuvees": [
   "Clos des Papes"
  ],
  "style": "Équilibre, garde",
  "statut": "AOC",
  "note": null
 },
 {
  "id": "DOM041",
  "nom": "Domaine Georges Vernay",
  "region": "Rhône",
  "appellation": "Condrieu",
  "cuvees": [
   "Coteau de Vernon"
  ],
  "style": "Viognier de référence",
  "statut": "AOC",
  "note": "Sauveur du Condrieu"
 },
 {
  "id": "DOM042",
  "nom": "Domaine Didier Dagueneau",
  "region": "Loire",
  "appellation": "Pouilly-Fumé",
  "cuvees": [
   "Silex",
   "Pur Sang",
   "Buisson Renard"
  ],
  "style": "Sauvignon extrême, élevage bois",
  "statut": "AOC",
  "note": "Culte"
 },
 {
  "id": "DOM043",
  "nom": "Domaine Vacheron",
  "region": "Loire",
  "appellation": "Sancerre",
  "cuvees": [
   "Les Romains",
   "Guigne-Chevres"
  ],
  "style": "Biodynamie, terroirs",
  "statut": "AOC",
  "note": null
 },
 {
  "id": "DOM044",
  "nom": "Domaine Francois Cotat",
  "region": "Loire",
  "appellation": "Sancerre",
  "cuvees": [
   "Les Monts Damnes",
   "La Grande Côte"
  ],
  "style": "Vendange tardive, garde",
  "statut": "AOC",
  "note": null
 },
 {
  "id": "DOM045",
  "nom": "Nicolas Joly - Coulée de Serrant",
  "region": "Loire",
  "appellation": "Savennières",
  "cuvees": [
   "Coulée de Serrant"
  ],
  "style": "Biodynamie historique, oxydatif",
  "statut": "AOC monopole",
  "note": "Pionnier biodynamie"
 },
 {
  "id": "DOM046",
  "nom": "Domaine Huet",
  "region": "Loire",
  "appellation": "Vouvray",
  "cuvees": [
   "Le Mont",
   "Le Haut-Lieu",
   "Clos du Bourg"
  ],
  "style": "Chenin toutes gammes, biodynamie",
  "statut": "AOC",
  "note": "Référence"
 },
 {
  "id": "DOM047",
  "nom": "Domaine Charles Joguet",
  "region": "Loire",
  "appellation": "Chinon",
  "cuvees": [
   "Clos de la Dioterie"
  ],
  "style": "Parcellaire, Cabernet Franc",
  "statut": "AOC",
  "note": null
 },
 {
  "id": "DOM048",
  "nom": "Clos Rougeard",
  "region": "Loire",
  "appellation": "Saumur-Champigny",
  "cuvees": [
   "Le Bourg",
   "Les Poyeux"
  ],
  "style": "Culte, élevage long",
  "statut": "AOC",
  "note": "Frères Foucault"
 },
 {
  "id": "DOM049",
  "nom": "Domaine de la Pépière",
  "region": "Loire",
  "appellation": "Muscadet",
  "cuvees": [
   "Clos des Briords"
  ],
  "style": "Muscadet de garde, granit",
  "statut": "AOC",
  "note": null
 },
 {
  "id": "DOM050",
  "nom": "Domaine Zind-Humbrecht",
  "region": "Alsace",
  "appellation": "Alsace GC",
  "cuvees": [
   "Clos Windsbuhl",
   "Rangen",
   "Brand"
  ],
  "style": "Biodynamie, richesse",
  "statut": "Grands Crus",
  "note": null
 },
 {
  "id": "DOM051",
  "nom": "Domaine Weinbach",
  "region": "Alsace",
  "appellation": "Alsace GC",
  "cuvees": [
   "Schlossberg",
   "Furstentum"
  ],
  "style": "Élégance, Riesling",
  "statut": "Grands Crus",
  "note": null
 },
 {
  "id": "DOM052",
  "nom": "Domaine Trimbach",
  "region": "Alsace",
  "appellation": "Ribeauville",
  "cuvees": [
   "Clos Ste Hune",
   "Cuvée Frederic Emile"
  ],
  "style": "Riesling sec, tension",
  "statut": "Grands Crus",
  "note": "Clos Ste Hune legende"
 },
 {
  "id": "DOM053",
  "nom": "Domaine Marcel Deiss",
  "region": "Alsace",
  "appellation": "Bergheim",
  "cuvees": [
   "Altenberg",
   "Schoenenbourg"
  ],
  "style": "Complantation, terroir avant cépage",
  "statut": "Grands Crus",
  "note": null
 },
 {
  "id": "DOM054",
  "nom": "Domaine Ostertag",
  "region": "Alsace",
  "appellation": "Epfig",
  "cuvees": [
   "Muenchberg",
   "Fronholz"
  ],
  "style": "Biodynamie, élevage bois",
  "statut": "Grands Crus",
  "note": null
 },
 {
  "id": "DOM055",
  "nom": "Krug",
  "region": "Champagne",
  "appellation": "Reims",
  "cuvees": [
   "Grande Cuvée",
   "Clos du Mesnil",
   "Clos d'Ambonnay"
  ],
  "style": "Vinification fut, réservés perpetuelles",
  "statut": "Maison",
  "note": "Prestige"
 },
 {
  "id": "DOM056",
  "nom": "Salon",
  "region": "Champagne",
  "appellation": "Le Mesnil-sur-Oger",
  "cuvees": [
   "Cuvée S"
  ],
  "style": "Blanc de Blancs millésime uniquement",
  "statut": "Maison",
  "note": "Rareté"
 },
 {
  "id": "DOM057",
  "nom": "Bollinger",
  "region": "Champagne",
  "appellation": "Ay",
  "cuvees": [
   "Grande Année",
   "Vieilles Vignes Francaises"
  ],
  "style": "Pinot Noir, fut, vinosite",
  "statut": "Maison",
  "note": null
 },
 {
  "id": "DOM058",
  "nom": "Louis Roederer",
  "region": "Champagne",
  "appellation": "Reims",
  "cuvees": [
   "Cristal",
   "Collection"
  ],
  "style": "Précision, biodynamie",
  "statut": "Maison",
  "note": null
 },
 {
  "id": "DOM059",
  "nom": "Jacques Selosse",
  "region": "Champagne",
  "appellation": "Avize",
  "cuvees": [
   "Substance",
   "Initial",
   "Lieux-dits"
  ],
  "style": "Vigneron culte, solera, oxydatif",
  "statut": "RM",
  "note": null
 },
 {
  "id": "DOM060",
  "nom": "Egly-Ouriet",
  "region": "Champagne",
  "appellation": "Ambonnay",
  "cuvees": [
   "Grand Cru VP",
   "Les Crayères"
  ],
  "style": "Pinot Noir, maturité",
  "statut": "RM",
  "note": null
 },
 {
  "id": "DOM061",
  "nom": "Dom Pérignon",
  "region": "Champagne",
  "appellation": "Hautvillers",
  "cuvees": [
   "Vintage",
   "P2",
   "Rosé"
  ],
  "style": "Millésime uniquement, plenitudes",
  "statut": "Maison",
  "note": null
 },
 {
  "id": "DOM062",
  "nom": "Domaine Tempier",
  "region": "Provence",
  "appellation": "Bandol",
  "cuvees": [
   "La Tourtine",
   "Cabassaou",
   "Migoua"
  ],
  "style": "Mourvedre, garde longue",
  "statut": "AOC",
  "note": "Référence Bandol"
 },
 {
  "id": "DOM063",
  "nom": "Château Simone",
  "region": "Provence",
  "appellation": "Palette",
  "cuvees": [
   "Rouge",
   "Blanc",
   "Rosé"
  ],
  "style": "Traditionnel, garde exceptionnelle",
  "statut": "AOC",
  "note": "Quasi-monopole"
 },
 {
  "id": "DOM064",
  "nom": "Domaine Ott",
  "region": "Provence",
  "appellation": "Côtes de Provence",
  "cuvees": [
   "Clos Mireille",
   "Château Romassan"
  ],
  "style": "Rosés de gastronomie",
  "statut": "AOC",
  "note": null
 },
 {
  "id": "DOM065",
  "nom": "Château d'Esclans",
  "region": "Provence",
  "appellation": "Côtes de Provence",
  "cuvees": [
   "Whispering Angel",
   "Garrus"
  ],
  "style": "Rosé premium",
  "statut": "AOC",
  "note": null
 },
 {
  "id": "DOM066",
  "nom": "Domaine de Trevallon",
  "region": "Provence",
  "appellation": "IGP Alpilles",
  "cuvees": [
   "Rouge",
   "Blanc"
  ],
  "style": "Cabernet + Syrah, hors AOC",
  "statut": "IGP",
  "note": "Culte"
 },
 {
  "id": "DOM067",
  "nom": "Mas de Daumas Gassac",
  "region": "Languedoc",
  "appellation": "IGP Hérault",
  "cuvees": [
   "Rouge",
   "Blanc"
  ],
  "style": "Cabernet en Languedoc, garde",
  "statut": "IGP",
  "note": "Pionnier"
 },
 {
  "id": "DOM068",
  "nom": "Domaine de la Grange des Pères",
  "region": "Languedoc",
  "appellation": "IGP Hérault",
  "cuvees": [
   "Rouge",
   "Blanc"
  ],
  "style": "Assemblage, culte",
  "statut": "IGP",
  "note": "Rareté"
 },
 {
  "id": "DOM069",
  "nom": "Château de Pibarnon",
  "region": "Provence",
  "appellation": "Bandol",
  "cuvees": [
   "Rouge",
   "Rosé"
  ],
  "style": "Mourvedre altitude",
  "statut": "AOC",
  "note": null
 },
 {
  "id": "DOM070",
  "nom": "Domaine Peyre Rosé",
  "region": "Languedoc",
  "appellation": "Coteaux du Languedoc",
  "cuvees": [
   "Clos des Cistes",
   "Syrah Leone"
  ],
  "style": "Élevage très long",
  "statut": "AOC",
  "note": null
 },
 {
  "id": "DOM071",
  "nom": "Domaine Gauby",
  "region": "Roussillon",
  "appellation": "Côtes Catalanes",
  "cuvees": [
   "Muntada",
   "La Foun"
  ],
  "style": "Biodynamie, schistes",
  "statut": "IGP/AOC",
  "note": "Référence Roussillon"
 },
 {
  "id": "DOM072",
  "nom": "Domaine du Clos des Fees",
  "region": "Roussillon",
  "appellation": "Côtes du Roussillon",
  "cuvees": [
   "Petite Siberie",
   "Vieilles Vignes"
  ],
  "style": "Concentration",
  "statut": "AOC",
  "note": null
 },
 {
  "id": "DOM073",
  "nom": "Domaine de la Rectorie",
  "region": "Roussillon",
  "appellation": "Banyuls/Collioure",
  "cuvees": [
   "Côte Montagne",
   "Parce Frères"
  ],
  "style": "VDN et secs",
  "statut": "AOC",
  "note": null
 },
 {
  "id": "DOM074",
  "nom": "Château du Cèdre",
  "region": "Sud-Ouest",
  "appellation": "Cahors",
  "cuvees": [
   "Le Cèdre",
   "GC"
  ],
  "style": "Malbec haut de gamme",
  "statut": "AOC",
  "note": null
 },
 {
  "id": "DOM075",
  "nom": "Clos Triguedina",
  "region": "Sud-Ouest",
  "appellation": "Cahors",
  "cuvees": [
   "Probus",
   "New Black Wine"
  ],
  "style": "Malbec historique",
  "statut": "AOC",
  "note": null
 },
 {
  "id": "DOM076",
  "nom": "Château Montus",
  "region": "Sud-Ouest",
  "appellation": "Madiran",
  "cuvees": [
   "Cuvée Prestige",
   "XL"
  ],
  "style": "Tannat puissant, Brumont",
  "statut": "AOC",
  "note": null
 },
 {
  "id": "DOM077",
  "nom": "Domaine Cauhape",
  "region": "Sud-Ouest",
  "appellation": "Jurançon",
  "cuvees": [
   "Quintessence",
   "Symphonie"
  ],
  "style": "Petit Manseng moelleux",
  "statut": "AOC",
  "note": null
 },
 {
  "id": "DOM078",
  "nom": "Clos Uroulat",
  "region": "Sud-Ouest",
  "appellation": "Jurançon",
  "cuvees": [
   "Cuvée Marie",
   "Happy Hour"
  ],
  "style": "Équilibre sucre-acidité",
  "statut": "AOC",
  "note": null
 },
 {
  "id": "DOM079",
  "nom": "Domaine Plageoles",
  "region": "Sud-Ouest",
  "appellation": "Gaillac",
  "cuvees": [
   "Mauzac Nature",
   "Ondenc"
  ],
  "style": "Cépages autochtones sauves",
  "statut": "AOC",
  "note": "Conservatoire"
 },
 {
  "id": "DOM080",
  "nom": "Domaine du Cros",
  "region": "Sud-Ouest",
  "appellation": "Marcillac",
  "cuvees": [
   "Lo Sang del Pais"
  ],
  "style": "Fer Servadou, rougier",
  "statut": "AOC",
  "note": null
 },
 {
  "id": "DOM081",
  "nom": "Château Tirecul la Gravière",
  "region": "Sud-Ouest",
  "appellation": "Monbazillac",
  "cuvees": [
   "Cuvée Madame"
  ],
  "style": "Liquoreux d'exception",
  "statut": "AOC",
  "note": null
 },
 {
  "id": "DOM082",
  "nom": "Domaine Jean-Francois Ganevat",
  "region": "Jura",
  "appellation": "Côtes du Jura",
  "cuvees": [
   "Nombreuses micro-cuvées"
  ],
  "style": "Nature, cépages oublies",
  "statut": "AOC",
  "note": "Culte"
 },
 {
  "id": "DOM083",
  "nom": "Domaine Overnoy-Houillon",
  "region": "Jura",
  "appellation": "Arbois-Pupillin",
  "cuvees": [
   "Poulsard",
   "Savagnin"
  ],
  "style": "Nature historique, sans soufre",
  "statut": "AOC",
  "note": "Legende"
 },
 {
  "id": "DOM084",
  "nom": "Domaine Macle",
  "region": "Jura",
  "appellation": "Château-Chalon",
  "cuvees": [
   "Vin Jaune",
   "Côtes du Jura"
  ],
  "style": "Oxydatif de référence",
  "statut": "AOC",
  "note": null
 },
 {
  "id": "DOM085",
  "nom": "Domaine Tissot (Stephane)",
  "region": "Jura",
  "appellation": "Arbois",
  "cuvees": [
   "En Spois",
   "Vin Jaune",
   "Crémant"
  ],
  "style": "Biodynamie, parcellaire",
  "statut": "AOC",
  "note": null
 },
 {
  "id": "DOM086",
  "nom": "Domaine Berthet-Bondet",
  "region": "Jura",
  "appellation": "Château-Chalon",
  "cuvees": [
   "Vin Jaune",
   "Tradition"
  ],
  "style": "Classique jurassien",
  "statut": "AOC",
  "note": null
 },
 {
  "id": "DOM087",
  "nom": "Domaine Belluard",
  "region": "Savoie",
  "appellation": "Ayze",
  "cuvees": [
   "Le Feu",
   "Les Alpes"
  ],
  "style": "Gringet, biodynamie",
  "statut": "AOC",
  "note": "Rareté"
 },
 {
  "id": "DOM088",
  "nom": "Domaine Dupasquier",
  "region": "Savoie",
  "appellation": "Roussette de Savoie",
  "cuvees": [
   "Marestel",
   "Altesse"
  ],
  "style": "Garde longue, altitude",
  "statut": "AOC",
  "note": null
 },
 {
  "id": "DOM089",
  "nom": "Domaine Louis Magnin",
  "region": "Savoie",
  "appellation": "Arbin",
  "cuvees": [
   "Mondeuse La Rouge",
   "Chignin-Bergeron"
  ],
  "style": "Mondeuse de garde",
  "statut": "AOC",
  "note": null
 },
 {
  "id": "DOM090",
  "nom": "Domaine Antoine Arena",
  "region": "Corse",
  "appellation": "Patrimonio",
  "cuvees": [
   "Carco",
   "Grotte di Sole",
   "Morta Maio"
  ],
  "style": "Vermentino et Nielluccio de référence",
  "statut": "AOC",
  "note": "Culte"
 },
 {
  "id": "DOM091",
  "nom": "Clos Canarelli",
  "region": "Corse",
  "appellation": "Figari",
  "cuvees": [
   "Rouge",
   "Blanc",
   "Amphore"
  ],
  "style": "Cépages corses rares, biodynamie",
  "statut": "AOC",
  "note": null
 },
 {
  "id": "DOM092",
  "nom": "Domaine Comte Abbatucci",
  "region": "Corse",
  "appellation": "Ajaccio",
  "cuvees": [
   "Cuvée Collection",
   "Faustine"
  ],
  "style": "Biodynamie, cépages autochtones",
  "statut": "AOC",
  "note": null
 },
 {
  "id": "DOM093",
  "nom": "Domaine Yves Cuilleron",
  "region": "Rhône",
  "appellation": "Condrieu/Côte-Rôtie",
  "cuvees": [
   "Les Chaillets",
   "Terrasses du Empire"
  ],
  "style": "Viognier riche",
  "statut": "AOC",
  "note": null
 },
 {
  "id": "DOM094",
  "nom": "Domaine Alain Graillot",
  "region": "Rhône",
  "appellation": "Crozes-Hermitage",
  "cuvees": [
   "La Guiraude"
  ],
  "style": "Syrah pure, rapport Q/P",
  "statut": "AOC",
  "note": null
 },
 {
  "id": "DOM095",
  "nom": "Domaine Thierry Allemand",
  "region": "Rhône",
  "appellation": "Cornas",
  "cuvees": [
   "Chaillot",
   "Reynard"
  ],
  "style": "Nature, précision",
  "statut": "AOC",
  "note": "Culte"
 },
 {
  "id": "DOM096",
  "nom": "Château Rieussec",
  "region": "Bordeaux",
  "appellation": "Sauternes",
  "cuvees": [
   "Grand Vin",
   "R de Rieussec"
  ],
  "style": "Liquoreux puissant",
  "statut": "1er Cru Classé 1855",
  "note": null
 },
 {
  "id": "DOM097",
  "nom": "Château Climens",
  "region": "Bordeaux",
  "appellation": "Barsac",
  "cuvees": [
   "Climens",
   "Cypres"
  ],
  "style": "Semillon pur, biodynamie",
  "statut": "1er Cru Classé",
  "note": null
 },
 {
  "id": "DOM098",
  "nom": "Château Smith Haut Lafitte",
  "region": "Bordeaux",
  "appellation": "Pessac-Léognan",
  "cuvees": [
   "Rouge",
   "Blanc"
  ],
  "style": "Blanc de référence, environnement",
  "statut": "Cru Classé de Graves",
  "note": null
 },
 {
  "id": "DOM099",
  "nom": "Vega du Domaine Bruno Clair",
  "region": "Bourgogne",
  "appellation": "Marsannay/Gevrey",
  "cuvees": [
   "Clos St-Jacques",
   "Bonnes-Mares"
  ],
  "style": "Classicisme",
  "statut": "Multi",
  "note": null
 },
 {
  "id": "DOM100",
  "nom": "Domaine Guiberteau",
  "region": "Loire",
  "appellation": "Saumur",
  "cuvees": [
   "Breze",
   "Clos des Carmes"
  ],
  "style": "Chenin de terroir",
  "statut": "AOC",
  "note": null
 }
]

// 85 millésimes notés par région, avec apogée.
export const MILLESIMES_FR = [
 {
  "id": "MIL001",
  "annee": 2005,
  "region": "Bordeaux",
  "note": 19.0,
  "style": "Classique, structure",
  "apogee": "2015-2045",
  "commentaire": "Grand millésime homogène rive gauche et droite"
 },
 {
  "id": "MIL002",
  "annee": 2009,
  "region": "Bordeaux",
  "note": 18.5,
  "style": "Solaire, riche",
  "apogee": "2015-2040",
  "commentaire": "Maturité exubérante, tanins ronds"
 },
 {
  "id": "MIL003",
  "annee": 2010,
  "region": "Bordeaux",
  "note": 19.0,
  "style": "Structure, fraîcheur",
  "apogee": "2020-2050",
  "commentaire": "Concentration + acidité, très longue garde"
 },
 {
  "id": "MIL004",
  "annee": 2015,
  "region": "Bordeaux",
  "note": 17.5,
  "style": "Charmeur",
  "apogee": "2022-2040",
  "commentaire": "Rive droite excellente"
 },
 {
  "id": "MIL005",
  "annee": 2016,
  "region": "Bordeaux",
  "note": 18.5,
  "style": "Classique, tanins fins",
  "apogee": "2024-2050",
  "commentaire": "Été sec, pluies salvatrices, grande année"
 },
 {
  "id": "MIL006",
  "annee": 2018,
  "region": "Bordeaux",
  "note": 18.0,
  "style": "Puissant, solaire",
  "apogee": "2025-2050",
  "commentaire": "Mildiou puis canicule, volumes réduits"
 },
 {
  "id": "MIL007",
  "annee": 2019,
  "region": "Bordeaux",
  "note": 18.0,
  "style": "Équilibre",
  "apogee": "2025-2045",
  "commentaire": "Trio 2018-19-20 remarquable"
 },
 {
  "id": "MIL008",
  "annee": 2020,
  "region": "Bordeaux",
  "note": 18.0,
  "style": "Concentré",
  "apogee": "2026-2050",
  "commentaire": "Secheresse, petits rendements"
 },
 {
  "id": "MIL009",
  "annee": 2021,
  "region": "Bordeaux",
  "note": 15.0,
  "style": "Classique, léger",
  "apogee": "2024-2032",
  "commentaire": "Millésime frais, gel et mildiou"
 },
 {
  "id": "MIL010",
  "annee": 2022,
  "region": "Bordeaux",
  "note": 18.0,
  "style": "Solaire, surprenant",
  "apogee": "2028-2055",
  "commentaire": "Canicule mais fraîcheur préservée"
 },
 {
  "id": "MIL011",
  "annee": 2023,
  "region": "Bordeaux",
  "note": 16.5,
  "style": "Heterogene",
  "apogee": "2027-2042",
  "commentaire": "Pression mildiou, tri sévère"
 },
 {
  "id": "MIL012",
  "annee": 2000,
  "region": "Bordeaux",
  "note": 18.0,
  "style": "Mythique",
  "apogee": "2010-2035",
  "commentaire": "Millésime du siecle mediatique"
 },
 {
  "id": "MIL013",
  "annee": 1982,
  "region": "Bordeaux",
  "note": 19.0,
  "style": "Legendaire",
  "apogee": "1990-2030",
  "commentaire": "Maturité révolutionnaire, essor Parker"
 },
 {
  "id": "MIL014",
  "annee": 1989,
  "region": "Bordeaux",
  "note": 18.0,
  "style": "Solaire",
  "apogee": "1998-2025",
  "commentaire": "Sauternes exceptionnel"
 },
 {
  "id": "MIL015",
  "annee": 1990,
  "region": "Bordeaux",
  "note": 18.5,
  "style": "Riche",
  "apogee": "2000-2035",
  "commentaire": "Trio 88-89-90"
 },
 {
  "id": "MIL016",
  "annee": 2005,
  "region": "Bourgogne",
  "note": 18.5,
  "style": "Complet",
  "apogee": "2015-2040",
  "commentaire": "Rouges et blancs remarquables"
 },
 {
  "id": "MIL017",
  "annee": 2010,
  "region": "Bourgogne",
  "note": 18.5,
  "style": "Tension",
  "apogee": "2018-2040",
  "commentaire": "Petits rendements, pureté"
 },
 {
  "id": "MIL018",
  "annee": 2015,
  "region": "Bourgogne",
  "note": 18.0,
  "style": "Solaire rouges",
  "apogee": "2022-2040",
  "commentaire": "Rouges concentres, blancs plus lourds"
 },
 {
  "id": "MIL019",
  "annee": 2017,
  "region": "Bourgogne",
  "note": 17.0,
  "style": "Blancs excellents",
  "apogee": "2021-2032",
  "commentaire": "Volumes retrouvés"
 },
 {
  "id": "MIL020",
  "annee": 2019,
  "region": "Bourgogne",
  "note": 18.5,
  "style": "Riche + acide",
  "apogee": "2025-2045",
  "commentaire": "Concentration rare avec fraîcheur"
 },
 {
  "id": "MIL021",
  "annee": 2020,
  "region": "Bourgogne",
  "note": 18.0,
  "style": "Précoce, dense",
  "apogee": "2025-2042",
  "commentaire": "Vendanges très précoces"
 },
 {
  "id": "MIL022",
  "annee": 2021,
  "region": "Bourgogne",
  "note": 16.0,
  "style": "Classique, frais",
  "apogee": "2024-2035",
  "commentaire": "Gel sévère, volumes minuscules"
 },
 {
  "id": "MIL023",
  "annee": 2022,
  "region": "Bourgogne",
  "note": 17.5,
  "style": "Solaire genereux",
  "apogee": "2026-2042",
  "commentaire": "Rendements genereux, qualite bonne"
 },
 {
  "id": "MIL024",
  "annee": 2023,
  "region": "Bourgogne",
  "note": 17.0,
  "style": "Genereux",
  "apogee": "2026-2038",
  "commentaire": "Gros volumes, tri necessaire"
 },
 {
  "id": "MIL025",
  "annee": 1999,
  "region": "Bourgogne",
  "note": 18.0,
  "style": "Genereux",
  "apogee": "2008-2030",
  "commentaire": "Grande année rouges"
 },
 {
  "id": "MIL026",
  "annee": 1996,
  "region": "Bourgogne",
  "note": 17.5,
  "style": "Acidité haute",
  "apogee": "2006-2030",
  "commentaire": "Blancs sujets a oxydation prématurée"
 },
 {
  "id": "MIL027",
  "annee": 2009,
  "region": "Rhône Nord",
  "note": 18.0,
  "style": "Solaire",
  "apogee": "2016-2040",
  "commentaire": "Syrah mûre et genereuse"
 },
 {
  "id": "MIL028",
  "annee": 2010,
  "region": "Rhône Nord",
  "note": 19.0,
  "style": "Classique parfait",
  "apogee": "2018-2045",
  "commentaire": "Référence moderne"
 },
 {
  "id": "MIL029",
  "annee": 2015,
  "region": "Rhône Nord",
  "note": 18.5,
  "style": "Concentré",
  "apogee": "2022-2045",
  "commentaire": "Tanins puissants"
 },
 {
  "id": "MIL030",
  "annee": 2016,
  "region": "Rhône Nord",
  "note": 18.5,
  "style": "Équilibre",
  "apogee": "2023-2048",
  "commentaire": "Fraîcheur et maturité"
 },
 {
  "id": "MIL031",
  "annee": 2019,
  "region": "Rhône Nord",
  "note": 18.5,
  "style": "Solaire dense",
  "apogee": "2026-2050",
  "commentaire": "Grande année Syrah"
 },
 {
  "id": "MIL032",
  "annee": 2021,
  "region": "Rhône Nord",
  "note": 16.5,
  "style": "Frais, tendu",
  "apogee": "2025-2038",
  "commentaire": "Style ancien, faible degré"
 },
 {
  "id": "MIL033",
  "annee": 2007,
  "region": "Rhône Sud",
  "note": 18.5,
  "style": "Grenache exceptionnel",
  "apogee": "2013-2035",
  "commentaire": "CDP legendaire"
 },
 {
  "id": "MIL034",
  "annee": 2010,
  "region": "Rhône Sud",
  "note": 19.0,
  "style": "Équilibre parfait",
  "apogee": "2018-2045",
  "commentaire": "Meilleur du siecle pour beaucoup"
 },
 {
  "id": "MIL035",
  "annee": 2016,
  "region": "Rhône Sud",
  "note": 19.0,
  "style": "Complet",
  "apogee": "2023-2050",
  "commentaire": "Grande année CDP"
 },
 {
  "id": "MIL036",
  "annee": 2019,
  "region": "Rhône Sud",
  "note": 18.0,
  "style": "Solaire",
  "apogee": "2025-2045",
  "commentaire": "Degrés élevés"
 },
 {
  "id": "MIL037",
  "annee": 2020,
  "region": "Rhône Sud",
  "note": 17.5,
  "style": "Fruit, souplesse",
  "apogee": "2024-2040",
  "commentaire": "Acces précoce"
 },
 {
  "id": "MIL038",
  "annee": 2005,
  "region": "Loire",
  "note": 18.0,
  "style": "Chenin exceptionnel",
  "apogee": "2012-2045",
  "commentaire": "Liquoreux et secs de garde"
 },
 {
  "id": "MIL039",
  "annee": 2009,
  "region": "Loire",
  "note": 17.5,
  "style": "Solaire",
  "apogee": "2015-2035",
  "commentaire": "Rouges mûrs"
 },
 {
  "id": "MIL040",
  "annee": 2015,
  "region": "Loire",
  "note": 18.0,
  "style": "Concentré",
  "apogee": "2020-2040",
  "commentaire": "Cabernet Franc dense"
 },
 {
  "id": "MIL041",
  "annee": 2018,
  "region": "Loire",
  "note": 17.5,
  "style": "Solaire",
  "apogee": "2023-2040",
  "commentaire": "Volumes et maturité"
 },
 {
  "id": "MIL042",
  "annee": 2019,
  "region": "Loire",
  "note": 18.0,
  "style": "Équilibre",
  "apogee": "2024-2042",
  "commentaire": "Excellent partout"
 },
 {
  "id": "MIL043",
  "annee": 2021,
  "region": "Loire",
  "note": 15.5,
  "style": "Frais, difficile",
  "apogee": "2023-2032",
  "commentaire": "Gel avril, tri"
 },
 {
  "id": "MIL044",
  "annee": 2022,
  "region": "Loire",
  "note": 17.5,
  "style": "Solaire",
  "apogee": "2026-2040",
  "commentaire": "Secheresse mais équilibré"
 },
 {
  "id": "MIL045",
  "annee": 2008,
  "region": "Champagne",
  "note": 18.5,
  "style": "Acidité, garde",
  "apogee": "2018-2045",
  "commentaire": "Millésime de garde référence"
 },
 {
  "id": "MIL046",
  "annee": 2012,
  "region": "Champagne",
  "note": 18.5,
  "style": "Concentré",
  "apogee": "2020-2045",
  "commentaire": "Petits volumes, grande qualite"
 },
 {
  "id": "MIL047",
  "annee": 2015,
  "region": "Champagne",
  "note": 17.0,
  "style": "Solaire",
  "apogee": "2022-2035",
  "commentaire": "Style genereux"
 },
 {
  "id": "MIL048",
  "annee": 2018,
  "region": "Champagne",
  "note": 17.5,
  "style": "Mur, genereux",
  "apogee": "2025-2040",
  "commentaire": "Grosse récolte"
 },
 {
  "id": "MIL049",
  "annee": 2019,
  "region": "Champagne",
  "note": 18.0,
  "style": "Équilibre",
  "apogee": "2026-2042",
  "commentaire": "Concentration et fraîcheur"
 },
 {
  "id": "MIL050",
  "annee": 2002,
  "region": "Champagne",
  "note": 18.5,
  "style": "Classique",
  "apogee": "2010-2035",
  "commentaire": "Référence des années 2000"
 },
 {
  "id": "MIL051",
  "annee": 1996,
  "region": "Champagne",
  "note": 18.0,
  "style": "Acidité extrême",
  "apogee": "2006-2035",
  "commentaire": "Evolution débattue"
 },
 {
  "id": "MIL052",
  "annee": 2015,
  "region": "Alsace",
  "note": 17.5,
  "style": "Solaire",
  "apogee": "2020-2040",
  "commentaire": "Riesling mur"
 },
 {
  "id": "MIL053",
  "annee": 2017,
  "region": "Alsace",
  "note": 18.0,
  "style": "Équilibre",
  "apogee": "2022-2042",
  "commentaire": "Grande année secs"
 },
 {
  "id": "MIL054",
  "annee": 2019,
  "region": "Alsace",
  "note": 18.0,
  "style": "Concentré",
  "apogee": "2024-2045",
  "commentaire": "Excellents Grands Crus"
 },
 {
  "id": "MIL055",
  "annee": 2021,
  "region": "Alsace",
  "note": 16.5,
  "style": "Frais, sec",
  "apogee": "2024-2036",
  "commentaire": "Style tendu"
 },
 {
  "id": "MIL056",
  "annee": 2010,
  "region": "Jura",
  "note": 18.0,
  "style": "Tension",
  "apogee": "2018-2050",
  "commentaire": "Savagnin exceptionnel"
 },
 {
  "id": "MIL057",
  "annee": 2015,
  "region": "Jura",
  "note": 17.5,
  "style": "Solaire",
  "apogee": "2021-2045",
  "commentaire": "Riche"
 },
 {
  "id": "MIL058",
  "annee": 2020,
  "region": "Jura",
  "note": 17.5,
  "style": "Concentré",
  "apogee": "2025-2050",
  "commentaire": "Bonne année vin jaune"
 },
 {
  "id": "MIL059",
  "annee": 2016,
  "region": "Provence",
  "note": 17.0,
  "style": "Équilibre",
  "apogee": "2020-2035",
  "commentaire": "Bandol solide"
 },
 {
  "id": "MIL060",
  "annee": 2019,
  "region": "Provence",
  "note": 18.0,
  "style": "Concentré",
  "apogee": "2024-2045",
  "commentaire": "Mourvedre superbe"
 },
 {
  "id": "MIL061",
  "annee": 2015,
  "region": "Languedoc",
  "note": 18.0,
  "style": "Concentré",
  "apogee": "2020-2038",
  "commentaire": "Grande année rouges"
 },
 {
  "id": "MIL062",
  "annee": 2019,
  "region": "Languedoc",
  "note": 18.0,
  "style": "Solaire équilibré",
  "apogee": "2024-2042",
  "commentaire": "Excellent"
 },
 {
  "id": "MIL063",
  "annee": 2016,
  "region": "Roussillon",
  "note": 18.0,
  "style": "Dense",
  "apogee": "2022-2045",
  "commentaire": "Schistes expressifs"
 },
 {
  "id": "MIL064",
  "annee": 2015,
  "region": "Sud-Ouest",
  "note": 18.0,
  "style": "Tannat mur",
  "apogee": "2022-2045",
  "commentaire": "Madiran remarquable"
 },
 {
  "id": "MIL065",
  "annee": 2019,
  "region": "Sud-Ouest",
  "note": 18.0,
  "style": "Complet",
  "apogee": "2025-2045",
  "commentaire": "Cahors et Madiran"
 },
 {
  "id": "MIL066",
  "annee": 2018,
  "region": "Beaujolais",
  "note": 18.0,
  "style": "Solaire",
  "apogee": "2022-2035",
  "commentaire": "Crus de garde"
 },
 {
  "id": "MIL067",
  "annee": 2019,
  "region": "Beaujolais",
  "note": 18.5,
  "style": "Concentré",
  "apogee": "2023-2038",
  "commentaire": "Référence récente"
 },
 {
  "id": "MIL068",
  "annee": 2020,
  "region": "Beaujolais",
  "note": 18.0,
  "style": "Fruit dense",
  "apogee": "2023-2036",
  "commentaire": "Excellent"
 },
 {
  "id": "MIL069",
  "annee": 2015,
  "region": "Corse",
  "note": 17.5,
  "style": "Solaire",
  "apogee": "2019-2032",
  "commentaire": "Nielluccio mur"
 },
 {
  "id": "MIL070",
  "annee": 2019,
  "region": "Corse",
  "note": 18.0,
  "style": "Équilibre",
  "apogee": "2023-2038",
  "commentaire": "Belle année"
 },
 {
  "id": "MIL071",
  "annee": 2024,
  "region": "France (general)",
  "note": 15.5,
  "style": "Difficile",
  "apogee": "2027-2035",
  "commentaire": "Mildiou, pluies, volumes très bas"
 },
 {
  "id": "MIL072",
  "annee": 2011,
  "region": "Sauternes",
  "note": 18.5,
  "style": "Botrytis parfait",
  "apogee": "2018-2050",
  "commentaire": "Grande année liquoreux"
 },
 {
  "id": "MIL073",
  "annee": 2001,
  "region": "Sauternes",
  "note": 19.0,
  "style": "Référence",
  "apogee": "2010-2060",
  "commentaire": "Millésime mythique Sauternes"
 },
 {
  "id": "MIL074",
  "annee": 2017,
  "region": "Bordeaux",
  "note": 16.5,
  "style": "Heterogene",
  "apogee": "2022-2035",
  "commentaire": "Gel avril sévère"
 },
 {
  "id": "MIL075",
  "annee": 2014,
  "region": "Bordeaux",
  "note": 17.0,
  "style": "Classique",
  "apogee": "2022-2038",
  "commentaire": "Belle arrière-saison"
 },
 {
  "id": "MIL076",
  "annee": 2025,
  "region": "France (general)",
  "note": 17.5,
  "style": "Précoce, sain, concentré",
  "apogee": "2028-2050",
  "commentaire": "Vendanges jusqu'a 20 j d'avance ; ~37,4 Mhl (+3% vs 2024, -13% vs moyenne 5 ans) ; acidites préservées"
 },
 {
  "id": "MIL077",
  "annee": 2025,
  "region": "Bordeaux",
  "note": 18.0,
  "style": "Structure, tanins murs",
  "apogee": "2030-2055",
  "commentaire": "Vendanges des mi-aout ; etat sanitaire remarquable, pellicules epaisses, volumes en retrait"
 },
 {
  "id": "MIL078",
  "annee": 2025,
  "region": "Bourgogne",
  "note": 17.5,
  "style": "Qualite + volume retrouve",
  "apogee": "2029-2048",
  "commentaire": "Rendements +45% vs 2024 ; floraison précoce, chaos climatique géré"
 },
 {
  "id": "MIL079",
  "annee": 2025,
  "region": "Champagne",
  "note": 17.0,
  "style": "Exigeant mais équilibré",
  "apogee": "2032-2050",
  "commentaire": "Multiples controles de maturité ; etat sanitaire remarquable ; mise en réserve partielle"
 },
 {
  "id": "MIL080",
  "annee": 2025,
  "region": "Loire",
  "note": 18.0,
  "style": "Eclat, droiture",
  "apogee": "2028-2048",
  "commentaire": "Vendanges des fin aout ; blancs nets et acidité intégrée ; rouges souples et précis"
 },
 {
  "id": "MIL081",
  "annee": 2025,
  "region": "Jura",
  "note": 17.5,
  "style": "Volume x3",
  "apogee": "2030-2060",
  "commentaire": "Production multipliee par trois vs 2024"
 },
 {
  "id": "MIL082",
  "annee": 2024,
  "region": "France (general)",
  "note": 15.5,
  "style": "Difficile, heterogene",
  "apogee": "2027-2036",
  "commentaire": "Mildiou, pluies, gel ; l'une des plus faibles recoltes des dernieres decennies (~36 Mhl)"
 },
 {
  "id": "MIL083",
  "annee": 2024,
  "region": "Saint-Émilion",
  "note": 16.0,
  "style": "Frais, fruite, équilibré",
  "apogee": "2028-2040",
  "commentaire": "Profil frais et intense en fruit selon l'ODG"
 },
 {
  "id": "MIL084",
  "annee": 2023,
  "region": "Saint-Émilion",
  "note": 16.5,
  "style": "Frais, élégant, équilibré",
  "apogee": "2027-2042",
  "commentaire": "Profil ODG : fraîcheur et élégance"
 },
 {
  "id": "MIL085",
  "annee": 2022,
  "region": "Saint-Émilion",
  "note": 18.0,
  "style": "Genereux, concentré",
  "apogee": "2028-2050",
  "commentaire": "Profil ODG : generosite et concentration malgre la canicule"
 }
]

// 132 crus classés : 1855, Graves, Saint-Émilion 2022.
export const CLASSEMENTS_BORDEAUX = [
 {
  "id": "CL001",
  "classement": "Médoc 1855",
  "rang": "1er Cru Classé",
  "chateau": "Château Haut-Brion",
  "appellation": "Pessac-Léognan"
 },
 {
  "id": "CL002",
  "classement": "Médoc 1855",
  "rang": "1er Cru Classé",
  "chateau": "Château Lafite Rothschild",
  "appellation": "Pauillac"
 },
 {
  "id": "CL003",
  "classement": "Médoc 1855",
  "rang": "1er Cru Classé",
  "chateau": "Château Latour",
  "appellation": "Pauillac"
 },
 {
  "id": "CL004",
  "classement": "Médoc 1855",
  "rang": "1er Cru Classé",
  "chateau": "Château Margaux",
  "appellation": "Margaux"
 },
 {
  "id": "CL005",
  "classement": "Médoc 1855",
  "rang": "1er Cru Classé (1973)",
  "chateau": "Château Mouton Rothschild",
  "appellation": "Pauillac"
 },
 {
  "id": "CL006",
  "classement": "Médoc 1855",
  "rang": "2e Cru Classé",
  "chateau": "Château Brane-Cantenac",
  "appellation": "Margaux"
 },
 {
  "id": "CL007",
  "classement": "Médoc 1855",
  "rang": "2e Cru Classé",
  "chateau": "Château Cos d'Estournel",
  "appellation": "Saint-Estèphe"
 },
 {
  "id": "CL008",
  "classement": "Médoc 1855",
  "rang": "2e Cru Classé",
  "chateau": "Château Ducru-Beaucaillou",
  "appellation": "Saint-Julien"
 },
 {
  "id": "CL009",
  "classement": "Médoc 1855",
  "rang": "2e Cru Classé",
  "chateau": "Château Durfort-Vivens",
  "appellation": "Margaux"
 },
 {
  "id": "CL010",
  "classement": "Médoc 1855",
  "rang": "2e Cru Classé",
  "chateau": "Château Gruaud Larose",
  "appellation": "Saint-Julien"
 },
 {
  "id": "CL011",
  "classement": "Médoc 1855",
  "rang": "2e Cru Classé",
  "chateau": "Château Lascombes",
  "appellation": "Margaux"
 },
 {
  "id": "CL012",
  "classement": "Médoc 1855",
  "rang": "2e Cru Classé",
  "chateau": "Château Leoville Las Cases",
  "appellation": "Saint-Julien"
 },
 {
  "id": "CL013",
  "classement": "Médoc 1855",
  "rang": "2e Cru Classé",
  "chateau": "Château Leoville Poyferre",
  "appellation": "Saint-Julien"
 },
 {
  "id": "CL014",
  "classement": "Médoc 1855",
  "rang": "2e Cru Classé",
  "chateau": "Château Leoville Barton",
  "appellation": "Saint-Julien"
 },
 {
  "id": "CL015",
  "classement": "Médoc 1855",
  "rang": "2e Cru Classé",
  "chateau": "Château Montrose",
  "appellation": "Saint-Estèphe"
 },
 {
  "id": "CL016",
  "classement": "Médoc 1855",
  "rang": "2e Cru Classé",
  "chateau": "Château Pichon Longueville Baron",
  "appellation": "Pauillac"
 },
 {
  "id": "CL017",
  "classement": "Médoc 1855",
  "rang": "2e Cru Classé",
  "chateau": "Château Pichon Longueville Comtesse de Lalande",
  "appellation": "Pauillac"
 },
 {
  "id": "CL018",
  "classement": "Médoc 1855",
  "rang": "2e Cru Classé",
  "chateau": "Château Rausan-Segla",
  "appellation": "Margaux"
 },
 {
  "id": "CL019",
  "classement": "Médoc 1855",
  "rang": "2e Cru Classé",
  "chateau": "Château Rauzan-Gassies",
  "appellation": "Margaux"
 },
 {
  "id": "CL020",
  "classement": "Médoc 1855",
  "rang": "3e Cru Classé",
  "chateau": "Château Boyd-Cantenac",
  "appellation": "Margaux"
 },
 {
  "id": "CL021",
  "classement": "Médoc 1855",
  "rang": "3e Cru Classé",
  "chateau": "Château Calon-Ségur",
  "appellation": "Saint-Estèphe"
 },
 {
  "id": "CL022",
  "classement": "Médoc 1855",
  "rang": "3e Cru Classé",
  "chateau": "Château Cantenac Brown",
  "appellation": "Margaux"
 },
 {
  "id": "CL023",
  "classement": "Médoc 1855",
  "rang": "3e Cru Classé",
  "chateau": "Château Desmirail",
  "appellation": "Margaux"
 },
 {
  "id": "CL024",
  "classement": "Médoc 1855",
  "rang": "3e Cru Classé",
  "chateau": "Château Ferriere",
  "appellation": "Margaux"
 },
 {
  "id": "CL025",
  "classement": "Médoc 1855",
  "rang": "3e Cru Classé",
  "chateau": "Château Giscours",
  "appellation": "Margaux"
 },
 {
  "id": "CL026",
  "classement": "Médoc 1855",
  "rang": "3e Cru Classé",
  "chateau": "Château d'Issan",
  "appellation": "Margaux"
 },
 {
  "id": "CL027",
  "classement": "Médoc 1855",
  "rang": "3e Cru Classé",
  "chateau": "Château Kirwan",
  "appellation": "Margaux"
 },
 {
  "id": "CL028",
  "classement": "Médoc 1855",
  "rang": "3e Cru Classé",
  "chateau": "Château Lagrange",
  "appellation": "Saint-Julien"
 },
 {
  "id": "CL029",
  "classement": "Médoc 1855",
  "rang": "3e Cru Classé",
  "chateau": "Château La Lagune",
  "appellation": "Haut-Médoc"
 },
 {
  "id": "CL030",
  "classement": "Médoc 1855",
  "rang": "3e Cru Classé",
  "chateau": "Château Langoa Barton",
  "appellation": "Saint-Julien"
 },
 {
  "id": "CL031",
  "classement": "Médoc 1855",
  "rang": "3e Cru Classé",
  "chateau": "Château Malescot Saint-Exupery",
  "appellation": "Margaux"
 },
 {
  "id": "CL032",
  "classement": "Médoc 1855",
  "rang": "3e Cru Classé",
  "chateau": "Château Marquis d'Alesme Becker",
  "appellation": "Margaux"
 },
 {
  "id": "CL033",
  "classement": "Médoc 1855",
  "rang": "3e Cru Classé",
  "chateau": "Château Palmer",
  "appellation": "Margaux"
 },
 {
  "id": "CL034",
  "classement": "Médoc 1855",
  "rang": "4e Cru Classé",
  "chateau": "Château Beychevelle",
  "appellation": "Saint-Julien"
 },
 {
  "id": "CL035",
  "classement": "Médoc 1855",
  "rang": "4e Cru Classé",
  "chateau": "Château Branaire-Ducru",
  "appellation": "Saint-Julien"
 },
 {
  "id": "CL036",
  "classement": "Médoc 1855",
  "rang": "4e Cru Classé",
  "chateau": "Château Duhart-Milon-Rothschild",
  "appellation": "Pauillac"
 },
 {
  "id": "CL037",
  "classement": "Médoc 1855",
  "rang": "4e Cru Classé",
  "chateau": "Château Lafon-Rochet",
  "appellation": "Saint-Estèphe"
 },
 {
  "id": "CL038",
  "classement": "Médoc 1855",
  "rang": "4e Cru Classé",
  "chateau": "Château La Tour Carnet",
  "appellation": "Haut-Médoc"
 },
 {
  "id": "CL039",
  "classement": "Médoc 1855",
  "rang": "4e Cru Classé",
  "chateau": "Château Marquis de Terme",
  "appellation": "Margaux"
 },
 {
  "id": "CL040",
  "classement": "Médoc 1855",
  "rang": "4e Cru Classé",
  "chateau": "Château Pouget",
  "appellation": "Margaux"
 },
 {
  "id": "CL041",
  "classement": "Médoc 1855",
  "rang": "4e Cru Classé",
  "chateau": "Château Prieure-Lichine",
  "appellation": "Margaux"
 },
 {
  "id": "CL042",
  "classement": "Médoc 1855",
  "rang": "4e Cru Classé",
  "chateau": "Château Saint-Pierre",
  "appellation": "Saint-Julien"
 },
 {
  "id": "CL043",
  "classement": "Médoc 1855",
  "rang": "4e Cru Classé",
  "chateau": "Château Talbot",
  "appellation": "Saint-Julien"
 },
 {
  "id": "CL044",
  "classement": "Médoc 1855",
  "rang": "5e Cru Classé",
  "chateau": "Château d'Armailhac",
  "appellation": "Pauillac"
 },
 {
  "id": "CL045",
  "classement": "Médoc 1855",
  "rang": "5e Cru Classé",
  "chateau": "Château Batailley",
  "appellation": "Pauillac"
 },
 {
  "id": "CL046",
  "classement": "Médoc 1855",
  "rang": "5e Cru Classé",
  "chateau": "Château Belgrave",
  "appellation": "Haut-Médoc"
 },
 {
  "id": "CL047",
  "classement": "Médoc 1855",
  "rang": "5e Cru Classé",
  "chateau": "Château Camensac",
  "appellation": "Haut-Médoc"
 },
 {
  "id": "CL048",
  "classement": "Médoc 1855",
  "rang": "5e Cru Classé",
  "chateau": "Château Cantemerle",
  "appellation": "Haut-Médoc"
 },
 {
  "id": "CL049",
  "classement": "Médoc 1855",
  "rang": "5e Cru Classé",
  "chateau": "Château Clerc Milon",
  "appellation": "Pauillac"
 },
 {
  "id": "CL050",
  "classement": "Médoc 1855",
  "rang": "5e Cru Classé",
  "chateau": "Château Cos Labory",
  "appellation": "Saint-Estèphe"
 },
 {
  "id": "CL051",
  "classement": "Médoc 1855",
  "rang": "5e Cru Classé",
  "chateau": "Château Croizet-Bages",
  "appellation": "Pauillac"
 },
 {
  "id": "CL052",
  "classement": "Médoc 1855",
  "rang": "5e Cru Classé",
  "chateau": "Château Dauzac",
  "appellation": "Margaux"
 },
 {
  "id": "CL053",
  "classement": "Médoc 1855",
  "rang": "5e Cru Classé",
  "chateau": "Château Grand-Puy Ducasse",
  "appellation": "Pauillac"
 },
 {
  "id": "CL054",
  "classement": "Médoc 1855",
  "rang": "5e Cru Classé",
  "chateau": "Château Grand-Puy-Lacoste",
  "appellation": "Pauillac"
 },
 {
  "id": "CL055",
  "classement": "Médoc 1855",
  "rang": "5e Cru Classé",
  "chateau": "Château Haut-Bages Liberal",
  "appellation": "Pauillac"
 },
 {
  "id": "CL056",
  "classement": "Médoc 1855",
  "rang": "5e Cru Classé",
  "chateau": "Château Haut-Batailley",
  "appellation": "Pauillac"
 },
 {
  "id": "CL057",
  "classement": "Médoc 1855",
  "rang": "5e Cru Classé",
  "chateau": "Château Lynch-Bages",
  "appellation": "Pauillac"
 },
 {
  "id": "CL058",
  "classement": "Médoc 1855",
  "rang": "5e Cru Classé",
  "chateau": "Château Lynch-Moussas",
  "appellation": "Pauillac"
 },
 {
  "id": "CL059",
  "classement": "Médoc 1855",
  "rang": "5e Cru Classé",
  "chateau": "Château Pedesclaux",
  "appellation": "Pauillac"
 },
 {
  "id": "CL060",
  "classement": "Médoc 1855",
  "rang": "5e Cru Classé",
  "chateau": "Château Pontet-Canet",
  "appellation": "Pauillac"
 },
 {
  "id": "CL061",
  "classement": "Médoc 1855",
  "rang": "5e Cru Classé",
  "chateau": "Château du Tertre",
  "appellation": "Margaux"
 },
 {
  "id": "CL062",
  "classement": "Sauternes 1855",
  "rang": "1er Cru Supérieur",
  "chateau": "Château d'Yquem",
  "appellation": "Sauternes"
 },
 {
  "id": "CL063",
  "classement": "Sauternes 1855",
  "rang": "1er Cru",
  "chateau": "Château Climens",
  "appellation": "Barsac"
 },
 {
  "id": "CL064",
  "classement": "Sauternes 1855",
  "rang": "1er Cru",
  "chateau": "Château Clos Haut-Peyraguey",
  "appellation": "Sauternes"
 },
 {
  "id": "CL065",
  "classement": "Sauternes 1855",
  "rang": "1er Cru",
  "chateau": "Château Coutet",
  "appellation": "Barsac"
 },
 {
  "id": "CL066",
  "classement": "Sauternes 1855",
  "rang": "1er Cru",
  "chateau": "Château Guiraud",
  "appellation": "Sauternes"
 },
 {
  "id": "CL067",
  "classement": "Sauternes 1855",
  "rang": "1er Cru",
  "chateau": "Château Lafaurie-Peyraguey",
  "appellation": "Sauternes"
 },
 {
  "id": "CL068",
  "classement": "Sauternes 1855",
  "rang": "1er Cru",
  "chateau": "Château Rabaud-Promis",
  "appellation": "Sauternes"
 },
 {
  "id": "CL069",
  "classement": "Sauternes 1855",
  "rang": "1er Cru",
  "chateau": "Château Rayne Vigneau",
  "appellation": "Sauternes"
 },
 {
  "id": "CL070",
  "classement": "Sauternes 1855",
  "rang": "1er Cru",
  "chateau": "Château Rieussec",
  "appellation": "Sauternes"
 },
 {
  "id": "CL071",
  "classement": "Sauternes 1855",
  "rang": "1er Cru",
  "chateau": "Château Sigalas-Rabaud",
  "appellation": "Sauternes"
 },
 {
  "id": "CL072",
  "classement": "Sauternes 1855",
  "rang": "1er Cru",
  "chateau": "Château Suduiraut",
  "appellation": "Sauternes"
 },
 {
  "id": "CL073",
  "classement": "Sauternes 1855",
  "rang": "1er Cru",
  "chateau": "Château La Tour Blanche",
  "appellation": "Sauternes"
 },
 {
  "id": "CL074",
  "classement": "Sauternes 1855",
  "rang": "2e Cru",
  "chateau": "Château d'Arche",
  "appellation": "Sauternes"
 },
 {
  "id": "CL075",
  "classement": "Sauternes 1855",
  "rang": "2e Cru",
  "chateau": "Château Broustet",
  "appellation": "Barsac"
 },
 {
  "id": "CL076",
  "classement": "Sauternes 1855",
  "rang": "2e Cru",
  "chateau": "Château Caillou",
  "appellation": "Barsac"
 },
 {
  "id": "CL077",
  "classement": "Sauternes 1855",
  "rang": "2e Cru",
  "chateau": "Château Doisy-Daene",
  "appellation": "Barsac"
 },
 {
  "id": "CL078",
  "classement": "Sauternes 1855",
  "rang": "2e Cru",
  "chateau": "Château Doisy-Dubroca",
  "appellation": "Barsac"
 },
 {
  "id": "CL079",
  "classement": "Sauternes 1855",
  "rang": "2e Cru",
  "chateau": "Château Doisy-Vedrines",
  "appellation": "Barsac"
 },
 {
  "id": "CL080",
  "classement": "Sauternes 1855",
  "rang": "2e Cru",
  "chateau": "Château Filhot",
  "appellation": "Sauternes"
 },
 {
  "id": "CL081",
  "classement": "Sauternes 1855",
  "rang": "2e Cru",
  "chateau": "Château Lamothe",
  "appellation": "Sauternes"
 },
 {
  "id": "CL082",
  "classement": "Sauternes 1855",
  "rang": "2e Cru",
  "chateau": "Château Lamothe-Guignard",
  "appellation": "Sauternes"
 },
 {
  "id": "CL083",
  "classement": "Sauternes 1855",
  "rang": "2e Cru",
  "chateau": "Château de Myrat",
  "appellation": "Sauternes"
 },
 {
  "id": "CL084",
  "classement": "Sauternes 1855",
  "rang": "2e Cru",
  "chateau": "Château de Malle",
  "appellation": "Sauternes"
 },
 {
  "id": "CL085",
  "classement": "Sauternes 1855",
  "rang": "2e Cru",
  "chateau": "Château Nairac",
  "appellation": "Barsac"
 },
 {
  "id": "CL086",
  "classement": "Sauternes 1855",
  "rang": "2e Cru",
  "chateau": "Château Romer du Hayot",
  "appellation": "Sauternes"
 },
 {
  "id": "CL087",
  "classement": "Sauternes 1855",
  "rang": "2e Cru",
  "chateau": "Château Suau",
  "appellation": "Barsac"
 },
 {
  "id": "CL088",
  "classement": "Graves 1953/59",
  "rang": "Cru Classé (rouge + blanc)",
  "chateau": "Château Bouscaut",
  "appellation": "Pessac-Léognan"
 },
 {
  "id": "CL089",
  "classement": "Graves 1953/59",
  "rang": "Cru Classé (rouge + blanc)",
  "chateau": "Château Carbonnieux",
  "appellation": "Pessac-Léognan"
 },
 {
  "id": "CL090",
  "classement": "Graves 1953/59",
  "rang": "Cru Classé (blanc)",
  "chateau": "Château Couhins-Lurton",
  "appellation": "Pessac-Léognan"
 },
 {
  "id": "CL091",
  "classement": "Graves 1953/59",
  "rang": "Cru Classé (rouge)",
  "chateau": "Château de Fieuzal",
  "appellation": "Pessac-Léognan"
 },
 {
  "id": "CL092",
  "classement": "Graves 1953/59",
  "rang": "Cru Classé (rouge)",
  "chateau": "Château Haut-Bailly",
  "appellation": "Pessac-Léognan"
 },
 {
  "id": "CL093",
  "classement": "Graves 1953/59",
  "rang": "Cru Classé (rouge)",
  "chateau": "Château Haut-Brion",
  "appellation": "Pessac-Léognan"
 },
 {
  "id": "CL094",
  "classement": "Graves 1953/59",
  "rang": "Cru Classé (rouge)",
  "chateau": "Château La Tour Haut-Brion",
  "appellation": "Pessac-Léognan"
 },
 {
  "id": "CL095",
  "classement": "Graves 1953/59",
  "rang": "Cru Classé (rouge + blanc)",
  "chateau": "Château Latour-Martillac",
  "appellation": "Pessac-Léognan"
 },
 {
  "id": "CL096",
  "classement": "Graves 1953/59",
  "rang": "Cru Classé (rouge)",
  "chateau": "Château La Mission Haut-Brion",
  "appellation": "Pessac-Léognan"
 },
 {
  "id": "CL097",
  "classement": "Graves 1953/59",
  "rang": "Cru Classé (rouge + blanc)",
  "chateau": "Château Malartic-Lagraviere",
  "appellation": "Pessac-Léognan"
 },
 {
  "id": "CL098",
  "classement": "Graves 1953/59",
  "rang": "Cru Classé (rouge + blanc)",
  "chateau": "Château Olivier",
  "appellation": "Pessac-Léognan"
 },
 {
  "id": "CL099",
  "classement": "Graves 1953/59",
  "rang": "Cru Classé (rouge)",
  "chateau": "Château Pape Clement",
  "appellation": "Pessac-Léognan"
 },
 {
  "id": "CL100",
  "classement": "Graves 1953/59",
  "rang": "Cru Classé (rouge)",
  "chateau": "Château Smith Haut Lafitte",
  "appellation": "Pessac-Léognan"
 },
 {
  "id": "CL101",
  "classement": "Graves 1953/59",
  "rang": "Cru Classé (rouge + blanc)",
  "chateau": "Domaine de Chevalier",
  "appellation": "Pessac-Léognan"
 },
 {
  "id": "CL102",
  "classement": "Saint-Émilion 2022",
  "rang": "1er Grand Cru Classé A",
  "chateau": "Château Pavie",
  "appellation": "Saint-Émilion Grand Cru"
 },
 {
  "id": "CL103",
  "classement": "Saint-Émilion 2022",
  "rang": "1er Grand Cru Classé A",
  "chateau": "Château Figeac",
  "appellation": "Saint-Émilion Grand Cru"
 },
 {
  "id": "CL104",
  "classement": "Saint-Émilion 2022",
  "rang": "1er Grand Cru Classé B",
  "chateau": "Château Beau-Sejour Becot",
  "appellation": "Saint-Émilion Grand Cru"
 },
 {
  "id": "CL105",
  "classement": "Saint-Émilion 2022",
  "rang": "1er Grand Cru Classé B",
  "chateau": "Château Beausejour Duffau-Lagarrosse",
  "appellation": "Saint-Émilion Grand Cru"
 },
 {
  "id": "CL106",
  "classement": "Saint-Émilion 2022",
  "rang": "1er Grand Cru Classé B",
  "chateau": "Château Belair-Monange",
  "appellation": "Saint-Émilion Grand Cru"
 },
 {
  "id": "CL107",
  "classement": "Saint-Émilion 2022",
  "rang": "1er Grand Cru Classé B",
  "chateau": "Château Canon",
  "appellation": "Saint-Émilion Grand Cru"
 },
 {
  "id": "CL108",
  "classement": "Saint-Émilion 2022",
  "rang": "1er Grand Cru Classé B",
  "chateau": "Château Canon la Gaffeliere",
  "appellation": "Saint-Émilion Grand Cru"
 },
 {
  "id": "CL109",
  "classement": "Saint-Émilion 2022",
  "rang": "1er Grand Cru Classé B",
  "chateau": "Clos Fourtet",
  "appellation": "Saint-Émilion Grand Cru"
 },
 {
  "id": "CL110",
  "classement": "Saint-Émilion 2022",
  "rang": "1er Grand Cru Classé B",
  "chateau": "La Mondotte",
  "appellation": "Saint-Émilion Grand Cru"
 },
 {
  "id": "CL111",
  "classement": "Saint-Émilion 2022",
  "rang": "1er Grand Cru Classé B",
  "chateau": "Château Larcis Ducasse",
  "appellation": "Saint-Émilion Grand Cru"
 },
 {
  "id": "CL112",
  "classement": "Saint-Émilion 2022",
  "rang": "1er Grand Cru Classé B",
  "chateau": "Château Pavie Macquin",
  "appellation": "Saint-Émilion Grand Cru"
 },
 {
  "id": "CL113",
  "classement": "Saint-Émilion 2022",
  "rang": "1er Grand Cru Classé B",
  "chateau": "Château Troplong Mondot",
  "appellation": "Saint-Émilion Grand Cru"
 },
 {
  "id": "CL114",
  "classement": "Saint-Émilion 2022",
  "rang": "1er Grand Cru Classé B",
  "chateau": "Château Trottevieille",
  "appellation": "Saint-Émilion Grand Cru"
 },
 {
  "id": "CL115",
  "classement": "Saint-Émilion 2022",
  "rang": "1er Grand Cru Classé B",
  "chateau": "Château Valandraud",
  "appellation": "Saint-Émilion Grand Cru"
 },
 {
  "id": "CL116",
  "classement": "Saint-Émilion 2022",
  "rang": "Grand Cru Classé",
  "chateau": "Château Badette",
  "appellation": "Saint-Émilion Grand Cru"
 },
 {
  "id": "CL117",
  "classement": "Saint-Émilion 2022",
  "rang": "Grand Cru Classé",
  "chateau": "Château Balestard la Tonnelle",
  "appellation": "Saint-Émilion Grand Cru"
 },
 {
  "id": "CL118",
  "classement": "Saint-Émilion 2022",
  "rang": "Grand Cru Classé",
  "chateau": "Château Barde-Haut",
  "appellation": "Saint-Émilion Grand Cru"
 },
 {
  "id": "CL119",
  "classement": "Saint-Émilion 2022",
  "rang": "Grand Cru Classé",
  "chateau": "Château Bellefont-Belcier",
  "appellation": "Saint-Émilion Grand Cru"
 },
 {
  "id": "CL120",
  "classement": "Saint-Émilion 2022",
  "rang": "Grand Cru Classé",
  "chateau": "Château Bellevue",
  "appellation": "Saint-Émilion Grand Cru"
 },
 {
  "id": "CL121",
  "classement": "Saint-Émilion 2022",
  "rang": "Grand Cru Classé",
  "chateau": "Château Berliquet",
  "appellation": "Saint-Émilion Grand Cru"
 },
 {
  "id": "CL122",
  "classement": "Saint-Émilion 2022",
  "rang": "Grand Cru Classé",
  "chateau": "Château Boutisse",
  "appellation": "Saint-Émilion Grand Cru"
 },
 {
  "id": "CL123",
  "classement": "Saint-Émilion 2022",
  "rang": "Grand Cru Classé",
  "chateau": "Château Cadet-Bon",
  "appellation": "Saint-Émilion Grand Cru"
 },
 {
  "id": "CL124",
  "classement": "Saint-Émilion 2022",
  "rang": "Grand Cru Classé",
  "chateau": "Château Cap de Mourlin",
  "appellation": "Saint-Émilion Grand Cru"
 },
 {
  "id": "CL125",
  "classement": "Saint-Émilion 2022",
  "rang": "Grand Cru Classé",
  "chateau": "Château Chauvin",
  "appellation": "Saint-Émilion Grand Cru"
 },
 {
  "id": "CL126",
  "classement": "Saint-Émilion 2022",
  "rang": "Grand Cru Classé",
  "chateau": "Château Clos de Sarpe",
  "appellation": "Saint-Émilion Grand Cru"
 },
 {
  "id": "CL127",
  "classement": "Saint-Émilion 2022",
  "rang": "Grand Cru Classé",
  "chateau": "Château Corbin",
  "appellation": "Saint-Émilion Grand Cru"
 },
 {
  "id": "CL128",
  "classement": "Saint-Émilion 2022",
  "rang": "Grand Cru Classé",
  "chateau": "Château Corbin Michotte",
  "appellation": "Saint-Émilion Grand Cru"
 },
 {
  "id": "CL129",
  "classement": "Saint-Émilion 2022",
  "rang": "Grand Cru Classé",
  "chateau": "Château Côte de Baleau",
  "appellation": "Saint-Émilion Grand Cru"
 },
 {
  "id": "CL130",
  "classement": "Saint-Émilion 2022",
  "rang": "Grand Cru Classé",
  "chateau": "Château Croix de Labrie",
  "appellation": "Saint-Émilion Grand Cru"
 },
 {
  "id": "CL131",
  "classement": "Saint-Émilion 2022",
  "rang": "Grand Cru Classé",
  "chateau": "Château Dassault",
  "appellation": "Saint-Émilion Grand Cru"
 },
 {
  "id": "CL132",
  "classement": "Saint-Émilion 2022",
  "rang": "Grand Cru Classé",
  "chateau": "Château Destieux",
  "appellation": "Saint-Émilion Grand Cru"
 }
]

// 124 crus : Grands Crus d'Alsace et de Bourgogne, échelle Champagne.
export const CRUS_FR = [
 {
  "id": "AGC01",
  "nom": "Altenberg de Bergbieten",
  "type": "alsace_gc",
  "commune": "Bergbieten",
  "zone": "Bas-Rhin",
  "sol": "Argilo-marneux",
  "cepage": null
 },
 {
  "id": "AGC02",
  "nom": "Altenberg de Bergheim",
  "type": "alsace_gc",
  "commune": "Bergheim",
  "zone": "Haut-Rhin",
  "sol": "Marno-calcaire",
  "cepage": null
 },
 {
  "id": "AGC03",
  "nom": "Altenberg de Wolxheim",
  "type": "alsace_gc",
  "commune": "Wolxheim",
  "zone": "Bas-Rhin",
  "sol": "Marno-calcaire",
  "cepage": null
 },
 {
  "id": "AGC04",
  "nom": "Brand",
  "type": "alsace_gc",
  "commune": "Turckheim",
  "zone": "Haut-Rhin",
  "sol": "Granitique",
  "cepage": null
 },
 {
  "id": "AGC05",
  "nom": "Bruderthal",
  "type": "alsace_gc",
  "commune": "Molsheim",
  "zone": "Bas-Rhin",
  "sol": "Calcaire",
  "cepage": null
 },
 {
  "id": "AGC06",
  "nom": "Eichberg",
  "type": "alsace_gc",
  "commune": "Eguisheim",
  "zone": "Haut-Rhin",
  "sol": "Marno-calcaire",
  "cepage": null
 },
 {
  "id": "AGC07",
  "nom": "Engelberg",
  "type": "alsace_gc",
  "commune": "Dahlenheim",
  "zone": "Bas-Rhin",
  "sol": "Marno-calcaire",
  "cepage": null
 },
 {
  "id": "AGC08",
  "nom": "Florimont",
  "type": "alsace_gc",
  "commune": "Ingersheim",
  "zone": "Haut-Rhin",
  "sol": "Marno-calcaire",
  "cepage": null
 },
 {
  "id": "AGC09",
  "nom": "Frankstein",
  "type": "alsace_gc",
  "commune": "Dambach-la-Ville",
  "zone": "Bas-Rhin",
  "sol": "Granitique",
  "cepage": null
 },
 {
  "id": "AGC10",
  "nom": "Froehn",
  "type": "alsace_gc",
  "commune": "Zellenberg",
  "zone": "Haut-Rhin",
  "sol": "Argilo-marneux",
  "cepage": null
 },
 {
  "id": "AGC11",
  "nom": "Furstentum",
  "type": "alsace_gc",
  "commune": "Kientzheim",
  "zone": "Haut-Rhin",
  "sol": "Marno-greseux",
  "cepage": null
 },
 {
  "id": "AGC12",
  "nom": "Geisberg",
  "type": "alsace_gc",
  "commune": "Ribeauville",
  "zone": "Haut-Rhin",
  "sol": "Calcairo-greseux",
  "cepage": null
 },
 {
  "id": "AGC13",
  "nom": "Gloeckelberg",
  "type": "alsace_gc",
  "commune": "Rodern",
  "zone": "Haut-Rhin",
  "sol": "Granitique",
  "cepage": null
 },
 {
  "id": "AGC14",
  "nom": "Goldert",
  "type": "alsace_gc",
  "commune": "Gueberschwihr",
  "zone": "Haut-Rhin",
  "sol": "Marno-calcaire",
  "cepage": null
 },
 {
  "id": "AGC15",
  "nom": "Hatschbourg",
  "type": "alsace_gc",
  "commune": "Hattstatt",
  "zone": "Haut-Rhin",
  "sol": "Marno-calcaire",
  "cepage": null
 },
 {
  "id": "AGC16",
  "nom": "Hengst",
  "type": "alsace_gc",
  "commune": "Wintzenheim",
  "zone": "Haut-Rhin",
  "sol": "Marno-calcaire",
  "cepage": null
 },
 {
  "id": "AGC17",
  "nom": "Kaefferkopf",
  "type": "alsace_gc",
  "commune": "Ammerschwihr",
  "zone": "Haut-Rhin",
  "sol": "Granitique",
  "cepage": null
 },
 {
  "id": "AGC18",
  "nom": "Kanzlerberg",
  "type": "alsace_gc",
  "commune": "Bergheim",
  "zone": "Haut-Rhin",
  "sol": "Argilo-marneux",
  "cepage": null
 },
 {
  "id": "AGC19",
  "nom": "Kastelberg",
  "type": "alsace_gc",
  "commune": "Andlau",
  "zone": "Bas-Rhin",
  "sol": "Schisteux",
  "cepage": null
 },
 {
  "id": "AGC20",
  "nom": "Kessler",
  "type": "alsace_gc",
  "commune": "Guebwiller",
  "zone": "Haut-Rhin",
  "sol": "Greseux",
  "cepage": null
 },
 {
  "id": "AGC21",
  "nom": "Kirchberg de Barr",
  "type": "alsace_gc",
  "commune": "Barr",
  "zone": "Bas-Rhin",
  "sol": "Marno-calcaire",
  "cepage": null
 },
 {
  "id": "AGC22",
  "nom": "Kirchberg de Ribeauville",
  "type": "alsace_gc",
  "commune": "Ribeauville",
  "zone": "Haut-Rhin",
  "sol": "Marno-greseux",
  "cepage": null
 },
 {
  "id": "AGC23",
  "nom": "Kitterle",
  "type": "alsace_gc",
  "commune": "Guebwiller",
  "zone": "Haut-Rhin",
  "sol": "Greseux",
  "cepage": null
 },
 {
  "id": "AGC24",
  "nom": "Mambourg",
  "type": "alsace_gc",
  "commune": "Sigolsheim",
  "zone": "Haut-Rhin",
  "sol": "Marno-calcaire",
  "cepage": null
 },
 {
  "id": "AGC25",
  "nom": "Mandelberg",
  "type": "alsace_gc",
  "commune": "Mittelwihr",
  "zone": "Haut-Rhin",
  "sol": "Marno-calcaire",
  "cepage": null
 },
 {
  "id": "AGC26",
  "nom": "Marckrain",
  "type": "alsace_gc",
  "commune": "Bennwihr",
  "zone": "Haut-Rhin",
  "sol": "Marno-calcaire",
  "cepage": null
 },
 {
  "id": "AGC27",
  "nom": "Moenchberg",
  "type": "alsace_gc",
  "commune": "Andlau",
  "zone": "Bas-Rhin",
  "sol": "Marno-calcaire",
  "cepage": null
 },
 {
  "id": "AGC28",
  "nom": "Muenchberg",
  "type": "alsace_gc",
  "commune": "Nothalten",
  "zone": "Bas-Rhin",
  "sol": "Greso-volcanique",
  "cepage": null
 },
 {
  "id": "AGC29",
  "nom": "Ollwiller",
  "type": "alsace_gc",
  "commune": "Wuenheim",
  "zone": "Haut-Rhin",
  "sol": "Marno-greseux",
  "cepage": null
 },
 {
  "id": "AGC30",
  "nom": "Osterberg",
  "type": "alsace_gc",
  "commune": "Ribeauville",
  "zone": "Haut-Rhin",
  "sol": "Marno-calcaire",
  "cepage": null
 },
 {
  "id": "AGC31",
  "nom": "Pfersigberg",
  "type": "alsace_gc",
  "commune": "Eguisheim",
  "zone": "Haut-Rhin",
  "sol": "Marno-greseux",
  "cepage": null
 },
 {
  "id": "AGC32",
  "nom": "Pfingstberg",
  "type": "alsace_gc",
  "commune": "Orschwihr",
  "zone": "Haut-Rhin",
  "sol": "Calcairo-greseux",
  "cepage": null
 },
 {
  "id": "AGC33",
  "nom": "Praelatenberg",
  "type": "alsace_gc",
  "commune": "Kintzheim",
  "zone": "Bas-Rhin",
  "sol": "Granitique",
  "cepage": null
 },
 {
  "id": "AGC34",
  "nom": "Rangen",
  "type": "alsace_gc",
  "commune": "Thann",
  "zone": "Haut-Rhin",
  "sol": "Volcanique",
  "cepage": null
 },
 {
  "id": "AGC35",
  "nom": "Rosacker",
  "type": "alsace_gc",
  "commune": "Hunawihr",
  "zone": "Haut-Rhin",
  "sol": "Calcaire",
  "cepage": null
 },
 {
  "id": "AGC36",
  "nom": "Saering",
  "type": "alsace_gc",
  "commune": "Guebwiller",
  "zone": "Haut-Rhin",
  "sol": "Marno-greseux",
  "cepage": null
 },
 {
  "id": "AGC37",
  "nom": "Schlossberg",
  "type": "alsace_gc",
  "commune": "Kientzheim",
  "zone": "Haut-Rhin",
  "sol": "Granitique",
  "cepage": null
 },
 {
  "id": "AGC38",
  "nom": "Schoenenbourg",
  "type": "alsace_gc",
  "commune": "Riquewihr",
  "zone": "Haut-Rhin",
  "sol": "Argilo-marneux",
  "cepage": null
 },
 {
  "id": "AGC39",
  "nom": "Sommerberg",
  "type": "alsace_gc",
  "commune": "Niedermorschwihr",
  "zone": "Haut-Rhin",
  "sol": "Granitique",
  "cepage": null
 },
 {
  "id": "AGC40",
  "nom": "Sonnenglanz",
  "type": "alsace_gc",
  "commune": "Beblenheim",
  "zone": "Haut-Rhin",
  "sol": "Argilo-marneux",
  "cepage": null
 },
 {
  "id": "AGC41",
  "nom": "Spiegel",
  "type": "alsace_gc",
  "commune": "Bergholtz",
  "zone": "Haut-Rhin",
  "sol": "Marno-greseux",
  "cepage": null
 },
 {
  "id": "AGC42",
  "nom": "Sporen",
  "type": "alsace_gc",
  "commune": "Riquewihr",
  "zone": "Haut-Rhin",
  "sol": "Marno-calcaire",
  "cepage": null
 },
 {
  "id": "AGC43",
  "nom": "Steinert",
  "type": "alsace_gc",
  "commune": "Pfaffenheim",
  "zone": "Haut-Rhin",
  "sol": "Calcaire",
  "cepage": null
 },
 {
  "id": "AGC44",
  "nom": "Steingrubler",
  "type": "alsace_gc",
  "commune": "Wettolsheim",
  "zone": "Haut-Rhin",
  "sol": "Marno-calcaire",
  "cepage": null
 },
 {
  "id": "AGC45",
  "nom": "Steinklotz",
  "type": "alsace_gc",
  "commune": "Marlenheim",
  "zone": "Bas-Rhin",
  "sol": "Calcaire",
  "cepage": null
 },
 {
  "id": "AGC46",
  "nom": "Vorbourg",
  "type": "alsace_gc",
  "commune": "Rouffach",
  "zone": "Haut-Rhin",
  "sol": "Marno-greseux",
  "cepage": null
 },
 {
  "id": "AGC47",
  "nom": "Wiebelsberg",
  "type": "alsace_gc",
  "commune": "Andlau",
  "zone": "Bas-Rhin",
  "sol": "Greseux",
  "cepage": null
 },
 {
  "id": "AGC48",
  "nom": "Wineck-Schlossberg",
  "type": "alsace_gc",
  "commune": "Katzenthal",
  "zone": "Haut-Rhin",
  "sol": "Granitique",
  "cepage": null
 },
 {
  "id": "AGC49",
  "nom": "Winzenberg",
  "type": "alsace_gc",
  "commune": "Blienschwiller",
  "zone": "Bas-Rhin",
  "sol": "Granitique",
  "cepage": null
 },
 {
  "id": "AGC50",
  "nom": "Zinnkoepfle",
  "type": "alsace_gc",
  "commune": "Westhalten",
  "zone": "Haut-Rhin",
  "sol": "Calcairo-greseux",
  "cepage": null
 },
 {
  "id": "AGC51",
  "nom": "Zotzenberg",
  "type": "alsace_gc",
  "commune": "Mittelbergheim",
  "zone": "Bas-Rhin",
  "sol": "Marno-calcaire",
  "cepage": null
 },
 {
  "id": "BGC01",
  "nom": "Chablis Grand Cru",
  "type": "bourgogne_gc",
  "commune": "Chablis",
  "zone": "Chablisien",
  "sol": null,
  "cepage": "Chardonnay",
  "couleur": "Blanc",
  "note": "7 climats : Blanchot, Bougros, Les Clos, Grenouilles, Preuses, Valmur, Vaudesir"
 },
 {
  "id": "BGC02",
  "nom": "Chambertin",
  "type": "bourgogne_gc",
  "commune": "Gevrey-Chambertin",
  "zone": "Côte de Nuits",
  "sol": null,
  "cepage": "Pinot Noir",
  "couleur": "Rouge",
  "note": "Le plus puissant des Chambertin"
 },
 {
  "id": "BGC03",
  "nom": "Chambertin-Clos de Bèze",
  "type": "bourgogne_gc",
  "commune": "Gevrey-Chambertin",
  "zone": "Côte de Nuits",
  "sol": null,
  "cepage": "Pinot Noir",
  "couleur": "Rouge",
  "note": "Peut etre vendu sous le nom Chambertin"
 },
 {
  "id": "BGC04",
  "nom": "Chapelle-Chambertin",
  "type": "bourgogne_gc",
  "commune": "Gevrey-Chambertin",
  "zone": "Côte de Nuits",
  "sol": null,
  "cepage": "Pinot Noir",
  "couleur": "Rouge",
  "note": "Plus léger, floral"
 },
 {
  "id": "BGC05",
  "nom": "Charmes-Chambertin",
  "type": "bourgogne_gc",
  "commune": "Gevrey-Chambertin",
  "zone": "Côte de Nuits",
  "sol": null,
  "cepage": "Pinot Noir",
  "couleur": "Rouge",
  "note": "Souple, charnu ; englobe Mazoyères"
 },
 {
  "id": "BGC06",
  "nom": "Griotte-Chambertin",
  "type": "bourgogne_gc",
  "commune": "Gevrey-Chambertin",
  "zone": "Côte de Nuits",
  "sol": null,
  "cepage": "Pinot Noir",
  "couleur": "Rouge",
  "note": "Très petit, notes de cerise"
 },
 {
  "id": "BGC07",
  "nom": "Latricières-Chambertin",
  "type": "bourgogne_gc",
  "commune": "Gevrey-Chambertin",
  "zone": "Côte de Nuits",
  "sol": null,
  "cepage": "Pinot Noir",
  "couleur": "Rouge",
  "note": "Fin, minérale"
 },
 {
  "id": "BGC08",
  "nom": "Mazis-Chambertin",
  "type": "bourgogne_gc",
  "commune": "Gevrey-Chambertin",
  "zone": "Côte de Nuits",
  "sol": null,
  "cepage": "Pinot Noir",
  "couleur": "Rouge",
  "note": "Structure, garde"
 },
 {
  "id": "BGC09",
  "nom": "Mazoyères-Chambertin",
  "type": "bourgogne_gc",
  "commune": "Gevrey-Chambertin",
  "zone": "Côte de Nuits",
  "sol": null,
  "cepage": "Pinot Noir",
  "couleur": "Rouge",
  "note": "Souvent vendu en Charmes"
 },
 {
  "id": "BGC10",
  "nom": "Ruchottes-Chambertin",
  "type": "bourgogne_gc",
  "commune": "Gevrey-Chambertin",
  "zone": "Côte de Nuits",
  "sol": null,
  "cepage": "Pinot Noir",
  "couleur": "Rouge",
  "note": "Calcaire affleurant, tendu"
 },
 {
  "id": "BGC11",
  "nom": "Bonnes-Mares",
  "type": "bourgogne_gc",
  "commune": "Chambolle-Musigny / Morey-St-Denis",
  "zone": "Côte de Nuits",
  "sol": null,
  "cepage": "Pinot Noir",
  "couleur": "Rouge",
  "note": "A cheval sur 2 communes"
 },
 {
  "id": "BGC12",
  "nom": "Clos de la Roche",
  "type": "bourgogne_gc",
  "commune": "Morey-Saint-Denis",
  "zone": "Côte de Nuits",
  "sol": null,
  "cepage": "Pinot Noir",
  "couleur": "Rouge",
  "note": "Le plus vaste de Morey"
 },
 {
  "id": "BGC13",
  "nom": "Clos des Lambrays",
  "type": "bourgogne_gc",
  "commune": "Morey-Saint-Denis",
  "zone": "Côte de Nuits",
  "sol": null,
  "cepage": "Pinot Noir",
  "couleur": "Rouge",
  "note": "Quasi-monopole, GC depuis 1981"
 },
 {
  "id": "BGC14",
  "nom": "Clos de Tart",
  "type": "bourgogne_gc",
  "commune": "Morey-Saint-Denis",
  "zone": "Côte de Nuits",
  "sol": null,
  "cepage": "Pinot Noir",
  "couleur": "Rouge",
  "note": "Monopole"
 },
 {
  "id": "BGC15",
  "nom": "Clos Saint-Denis",
  "type": "bourgogne_gc",
  "commune": "Morey-Saint-Denis",
  "zone": "Côte de Nuits",
  "sol": null,
  "cepage": "Pinot Noir",
  "couleur": "Rouge",
  "note": "Delicat, parfume"
 },
 {
  "id": "BGC16",
  "nom": "Musigny",
  "type": "bourgogne_gc",
  "commune": "Chambolle-Musigny",
  "zone": "Côte de Nuits",
  "sol": null,
  "cepage": "Pinot Noir, Chardonnay",
  "couleur": "Rouge, Blanc",
  "note": "Seul GC rouge de Côte de Nuits produisant aussi du blanc"
 },
 {
  "id": "BGC17",
  "nom": "Clos de Vougeot",
  "type": "bourgogne_gc",
  "commune": "Vougeot",
  "zone": "Côte de Nuits",
  "sol": null,
  "cepage": "Pinot Noir",
  "couleur": "Rouge",
  "note": "~50 ha, 80+ proprietaires"
 },
 {
  "id": "BGC18",
  "nom": "Échezeaux",
  "type": "bourgogne_gc",
  "commune": "Flagey-Échezeaux",
  "zone": "Côte de Nuits",
  "sol": null,
  "cepage": "Pinot Noir",
  "couleur": "Rouge",
  "note": "11 climats"
 },
 {
  "id": "BGC19",
  "nom": "Grands Échezeaux",
  "type": "bourgogne_gc",
  "commune": "Flagey-Échezeaux",
  "zone": "Côte de Nuits",
  "sol": null,
  "cepage": "Pinot Noir",
  "couleur": "Rouge",
  "note": "Plus dense que Échezeaux"
 },
 {
  "id": "BGC20",
  "nom": "La Grande Rue",
  "type": "bourgogne_gc",
  "commune": "Vosne-Romanée",
  "zone": "Côte de Nuits",
  "sol": null,
  "cepage": "Pinot Noir",
  "couleur": "Rouge",
  "note": "Monopole Lamarche, GC depuis 1992"
 },
 {
  "id": "BGC21",
  "nom": "La Romanée",
  "type": "bourgogne_gc",
  "commune": "Vosne-Romanée",
  "zone": "Côte de Nuits",
  "sol": null,
  "cepage": "Pinot Noir",
  "couleur": "Rouge",
  "note": "Plus petite AOC de France (0,85 ha)"
 },
 {
  "id": "BGC22",
  "nom": "La Tâche",
  "type": "bourgogne_gc",
  "commune": "Vosne-Romanée",
  "zone": "Côte de Nuits",
  "sol": null,
  "cepage": "Pinot Noir",
  "couleur": "Rouge",
  "note": "Monopole DRC"
 },
 {
  "id": "BGC23",
  "nom": "Richebourg",
  "type": "bourgogne_gc",
  "commune": "Vosne-Romanée",
  "zone": "Côte de Nuits",
  "sol": null,
  "cepage": "Pinot Noir",
  "couleur": "Rouge",
  "note": "Opulent, puissant"
 },
 {
  "id": "BGC24",
  "nom": "Romanée-Conti",
  "type": "bourgogne_gc",
  "commune": "Vosne-Romanée",
  "zone": "Côte de Nuits",
  "sol": null,
  "cepage": "Pinot Noir",
  "couleur": "Rouge",
  "note": "Monopole DRC, 1,81 ha"
 },
 {
  "id": "BGC25",
  "nom": "Romanée-Saint-Vivant",
  "type": "bourgogne_gc",
  "commune": "Vosne-Romanée",
  "zone": "Côte de Nuits",
  "sol": null,
  "cepage": "Pinot Noir",
  "couleur": "Rouge",
  "note": "Dentelle, floral"
 },
 {
  "id": "BGC26",
  "nom": "Corton",
  "type": "bourgogne_gc",
  "commune": "Aloxe-Corton, Ladoix, Pernand",
  "zone": "Côte de Beaune",
  "sol": null,
  "cepage": "Pinot Noir, Chardonnay",
  "couleur": "Rouge, Blanc",
  "note": "Le plus vaste GC de Bourgogne"
 },
 {
  "id": "BGC27",
  "nom": "Corton-Charlemagne",
  "type": "bourgogne_gc",
  "commune": "Aloxe-Corton, Pernand-Vergelesses",
  "zone": "Côte de Beaune",
  "sol": null,
  "cepage": "Chardonnay",
  "couleur": "Blanc",
  "note": "Marnes blanches, grand blanc de garde"
 },
 {
  "id": "BGC28",
  "nom": "Charlemagne",
  "type": "bourgogne_gc",
  "commune": "Aloxe-Corton, Pernand-Vergelesses",
  "zone": "Côte de Beaune",
  "sol": null,
  "cepage": "Chardonnay",
  "couleur": "Blanc",
  "note": "AOC quasi inutilisee (revendiquee en Corton-Charlemagne)"
 },
 {
  "id": "BGC29",
  "nom": "Montrachet",
  "type": "bourgogne_gc",
  "commune": "Puligny / Chassagne",
  "zone": "Côte de Beaune",
  "sol": null,
  "cepage": "Chardonnay",
  "couleur": "Blanc",
  "note": "Sommet mondial du Chardonnay"
 },
 {
  "id": "BGC30",
  "nom": "Chevalier-Montrachet",
  "type": "bourgogne_gc",
  "commune": "Puligny-Montrachet",
  "zone": "Côte de Beaune",
  "sol": null,
  "cepage": "Chardonnay",
  "couleur": "Blanc",
  "note": "Plus aerien, minérale"
 },
 {
  "id": "BGC31",
  "nom": "Bâtard-Montrachet",
  "type": "bourgogne_gc",
  "commune": "Puligny / Chassagne",
  "zone": "Côte de Beaune",
  "sol": null,
  "cepage": "Chardonnay",
  "couleur": "Blanc",
  "note": "Plus gras, puissant"
 },
 {
  "id": "BGC32",
  "nom": "Bienvenues-Bâtard-Montrachet",
  "type": "bourgogne_gc",
  "commune": "Puligny-Montrachet",
  "zone": "Côte de Beaune",
  "sol": null,
  "cepage": "Chardonnay",
  "couleur": "Blanc",
  "note": "Petit, finesse"
 },
 {
  "id": "BGC33",
  "nom": "Criots-Bâtard-Montrachet",
  "type": "bourgogne_gc",
  "commune": "Chassagne-Montrachet",
  "zone": "Côte de Beaune",
  "sol": null,
  "cepage": "Chardonnay",
  "couleur": "Blanc",
  "note": "Le plus petit des Montrachet"
 },
 {
  "id": "CHC01",
  "nom": "Ambonnay",
  "type": "champagne",
  "commune": "Ambonnay",
  "zone": "Montagne de Reims",
  "sol": null,
  "cepage": "Pinot Noir",
  "niveau": "Grand Cru (100%)"
 },
 {
  "id": "CHC02",
  "nom": "Avize",
  "type": "champagne",
  "commune": "Avize",
  "zone": "Côte des Blancs",
  "sol": null,
  "cepage": "Chardonnay",
  "niveau": "Grand Cru (100%)"
 },
 {
  "id": "CHC03",
  "nom": "Ay",
  "type": "champagne",
  "commune": "Ay",
  "zone": "Vallée de la Marne",
  "sol": null,
  "cepage": "Pinot Noir",
  "niveau": "Grand Cru (100%)"
 },
 {
  "id": "CHC04",
  "nom": "Beaumont-sur-Vesle",
  "type": "champagne",
  "commune": "Beaumont-sur-Vesle",
  "zone": "Montagne de Reims",
  "sol": null,
  "cepage": "Pinot Noir",
  "niveau": "Grand Cru (100%)"
 },
 {
  "id": "CHC05",
  "nom": "Bouzy",
  "type": "champagne",
  "commune": "Bouzy",
  "zone": "Montagne de Reims",
  "sol": null,
  "cepage": "Pinot Noir",
  "niveau": "Grand Cru (100%)"
 },
 {
  "id": "CHC06",
  "nom": "Chouilly",
  "type": "champagne",
  "commune": "Chouilly",
  "zone": "Côte des Blancs",
  "sol": null,
  "cepage": "Chardonnay",
  "niveau": "Grand Cru (100%)"
 },
 {
  "id": "CHC07",
  "nom": "Cramant",
  "type": "champagne",
  "commune": "Cramant",
  "zone": "Côte des Blancs",
  "sol": null,
  "cepage": "Chardonnay",
  "niveau": "Grand Cru (100%)"
 },
 {
  "id": "CHC08",
  "nom": "Louvois",
  "type": "champagne",
  "commune": "Louvois",
  "zone": "Montagne de Reims",
  "sol": null,
  "cepage": "Pinot Noir",
  "niveau": "Grand Cru (100%)"
 },
 {
  "id": "CHC09",
  "nom": "Mailly-Champagne",
  "type": "champagne",
  "commune": "Mailly-Champagne",
  "zone": "Montagne de Reims",
  "sol": null,
  "cepage": "Pinot Noir",
  "niveau": "Grand Cru (100%)"
 },
 {
  "id": "CHC10",
  "nom": "Le Mesnil-sur-Oger",
  "type": "champagne",
  "commune": "Le Mesnil-sur-Oger",
  "zone": "Côte des Blancs",
  "sol": null,
  "cepage": "Chardonnay",
  "niveau": "Grand Cru (100%)"
 },
 {
  "id": "CHC11",
  "nom": "Oger",
  "type": "champagne",
  "commune": "Oger",
  "zone": "Côte des Blancs",
  "sol": null,
  "cepage": "Chardonnay",
  "niveau": "Grand Cru (100%)"
 },
 {
  "id": "CHC12",
  "nom": "Oiry",
  "type": "champagne",
  "commune": "Oiry",
  "zone": "Côte des Blancs",
  "sol": null,
  "cepage": "Chardonnay",
  "niveau": "Grand Cru (100%)"
 },
 {
  "id": "CHC13",
  "nom": "Puisieulx",
  "type": "champagne",
  "commune": "Puisieulx",
  "zone": "Montagne de Reims",
  "sol": null,
  "cepage": "Pinot Noir",
  "niveau": "Grand Cru (100%)"
 },
 {
  "id": "CHC14",
  "nom": "Sillery",
  "type": "champagne",
  "commune": "Sillery",
  "zone": "Montagne de Reims",
  "sol": null,
  "cepage": "Pinot Noir",
  "niveau": "Grand Cru (100%)"
 },
 {
  "id": "CHC15",
  "nom": "Tours-sur-Marne",
  "type": "champagne",
  "commune": "Tours-sur-Marne",
  "zone": "Vallée de la Marne",
  "sol": null,
  "cepage": "Pinot Noir",
  "niveau": "Grand Cru (100%)"
 },
 {
  "id": "CHC16",
  "nom": "Verzenay",
  "type": "champagne",
  "commune": "Verzenay",
  "zone": "Montagne de Reims",
  "sol": null,
  "cepage": "Pinot Noir",
  "niveau": "Grand Cru (100%)"
 },
 {
  "id": "CHC17",
  "nom": "Verzy",
  "type": "champagne",
  "commune": "Verzy",
  "zone": "Montagne de Reims",
  "sol": null,
  "cepage": "Pinot Noir",
  "niveau": "Grand Cru (100%)"
 },
 {
  "id": "CHC18",
  "nom": "Vertus",
  "type": "champagne",
  "commune": "Vertus",
  "zone": "Côte des Blancs",
  "sol": null,
  "cepage": "Chardonnay",
  "niveau": "Premier Cru (90-99%)"
 },
 {
  "id": "CHC19",
  "nom": "Cumieres",
  "type": "champagne",
  "commune": "Cumieres",
  "zone": "Vallée de la Marne",
  "sol": null,
  "cepage": "Pinot Noir / Meunier",
  "niveau": "Premier Cru (90-99%)"
 },
 {
  "id": "CHC20",
  "nom": "Hautvillers",
  "type": "champagne",
  "commune": "Hautvillers",
  "zone": "Vallée de la Marne",
  "sol": null,
  "cepage": "Meunier",
  "niveau": "Premier Cru (90-99%)"
 },
 {
  "id": "CHC21",
  "nom": "Mareuil-sur-Ay",
  "type": "champagne",
  "commune": "Mareuil-sur-Ay",
  "zone": "Vallée de la Marne",
  "sol": null,
  "cepage": "Pinot Noir",
  "niveau": "Premier Cru (90-99%)"
 },
 {
  "id": "CHC22",
  "nom": "Dizy",
  "type": "champagne",
  "commune": "Dizy",
  "zone": "Vallée de la Marne",
  "sol": null,
  "cepage": "Pinot Noir",
  "niveau": "Premier Cru (90-99%)"
 },
 {
  "id": "CHC23",
  "nom": "Rilly-la-Montagne",
  "type": "champagne",
  "commune": "Rilly-la-Montagne",
  "zone": "Montagne de Reims",
  "sol": null,
  "cepage": "Pinot Noir",
  "niveau": "Premier Cru (90-99%)"
 },
 {
  "id": "CHC24",
  "nom": "Chigny-les-Rosés",
  "type": "champagne",
  "commune": "Chigny-les-Rosés",
  "zone": "Montagne de Reims",
  "sol": null,
  "cepage": "Meunier",
  "niveau": "Premier Cru (90-99%)"
 },
 {
  "id": "CHC25",
  "nom": "Ludes",
  "type": "champagne",
  "commune": "Ludes",
  "zone": "Montagne de Reims",
  "sol": null,
  "cepage": "Pinot Noir",
  "niveau": "Premier Cru (90-99%)"
 },
 {
  "id": "CHC26",
  "nom": "Cuis",
  "type": "champagne",
  "commune": "Cuis",
  "zone": "Côte des Blancs",
  "sol": null,
  "cepage": "Chardonnay",
  "niveau": "Premier Cru (90-99%)"
 },
 {
  "id": "CHC27",
  "nom": "Grauves",
  "type": "champagne",
  "commune": "Grauves",
  "zone": "Côte des Blancs",
  "sol": null,
  "cepage": "Chardonnay",
  "niveau": "Premier Cru (90-99%)"
 },
 {
  "id": "CHC28",
  "nom": "Bergeres-les-Vertus",
  "type": "champagne",
  "commune": "Bergeres-les-Vertus",
  "zone": "Côte des Blancs",
  "sol": null,
  "cepage": "Chardonnay",
  "niveau": "Premier Cru (90-99%)"
 },
 {
  "id": "CHC29",
  "nom": "Pierry",
  "type": "champagne",
  "commune": "Pierry",
  "zone": "Coteaux Sud d'Epernay",
  "sol": null,
  "cepage": "Meunier",
  "niveau": "Premier Cru (90-99%)"
 },
 {
  "id": "CHC30",
  "nom": "Chamery",
  "type": "champagne",
  "commune": "Chamery",
  "zone": "Montagne de Reims",
  "sol": null,
  "cepage": "Meunier",
  "niveau": "Premier Cru (90-99%)"
 },
 {
  "id": "CHC31",
  "nom": "Ecueil",
  "type": "champagne",
  "commune": "Ecueil",
  "zone": "Montagne de Reims",
  "sol": null,
  "cepage": "Pinot Noir",
  "niveau": "Premier Cru (90-99%)"
 },
 {
  "id": "CHC32",
  "nom": "Villers-Marmery",
  "type": "champagne",
  "commune": "Villers-Marmery",
  "zone": "Montagne de Reims",
  "sol": null,
  "cepage": "Chardonnay",
  "niveau": "Premier Cru (90-99%)"
 },
 {
  "id": "CHC33",
  "nom": "Trepail",
  "type": "champagne",
  "commune": "Trepail",
  "zone": "Montagne de Reims",
  "sol": null,
  "cepage": "Chardonnay",
  "niveau": "Premier Cru (90-99%)"
 },
 {
  "id": "CHC34",
  "nom": "Champillon",
  "type": "champagne",
  "commune": "Champillon",
  "zone": "Vallée de la Marne",
  "sol": null,
  "cepage": "Pinot Noir",
  "niveau": "Premier Cru (90-99%)"
 },
 {
  "id": "CHC35",
  "nom": "Avenay-Val-d'Or",
  "type": "champagne",
  "commune": "Avenay-Val-d'Or",
  "zone": "Vallée de la Marne",
  "sol": null,
  "cepage": "Pinot Noir",
  "niveau": "Premier Cru (90-99%)"
 },
 {
  "id": "CHC36",
  "nom": "Mutigny",
  "type": "champagne",
  "commune": "Mutigny",
  "zone": "Vallée de la Marne",
  "sol": null,
  "cepage": "Pinot Noir",
  "niveau": "Premier Cru (90-99%)"
 },
 {
  "id": "CHC37",
  "nom": "Bisseuil",
  "type": "champagne",
  "commune": "Bisseuil",
  "zone": "Vallée de la Marne",
  "sol": null,
  "cepage": "Pinot Noir",
  "niveau": "Premier Cru (90-99%)"
 },
 {
  "id": "CHC38",
  "nom": "Tauxieres-Mutry",
  "type": "champagne",
  "commune": "Tauxieres-Mutry",
  "zone": "Montagne de Reims",
  "sol": null,
  "cepage": "Pinot Noir",
  "niveau": "Premier Cru (90-99%)"
 },
 {
  "id": "CHC39",
  "nom": "Villeneuve-Renneville-Chevigny",
  "type": "champagne",
  "commune": "Villeneuve-Renneville-Chevigny",
  "zone": "Côte des Blancs",
  "sol": null,
  "cepage": "Chardonnay",
  "niveau": "Premier Cru (90-99%)"
 },
 {
  "id": "CHC40",
  "nom": "Voipreux",
  "type": "champagne",
  "commune": "Voipreux",
  "zone": "Côte des Blancs",
  "sol": null,
  "cepage": "Chardonnay",
  "niveau": "Premier Cru (90-99%)"
 }
]

// 16 repères chiffrés (INAO, interprofessions).
export const REPERES_FR = [
 {
  "id": "REP01",
  "region": "Bourgogne",
  "sujet": "84 AOC au total",
  "donnee": "33 Grands Crus, 44 appellations Villages, 7 appellations Régionales",
  "source": "vins-bourgogne.fr"
 },
 {
  "id": "REP02",
  "region": "Bourgogne",
  "sujet": "Grands Crus",
  "donnee": "33 appellations, ~550 ha, moins de 2% du vignoble ; ~640 climats en Premier Cru",
  "source": "Cite des Climats / BIVB"
 },
 {
  "id": "REP03",
  "region": "Alsace",
  "sujet": "Grands Crus",
  "donnee": "51 terroirs sur 47 communes (décret 12/01/2007) ; 14 Bas-Rhin, 37 Haut-Rhin ; ~4-5% de la production",
  "source": "INAO / CIVA"
 },
 {
  "id": "REP04",
  "region": "Alsace",
  "sujet": "Cépages GC autorises",
  "donnee": "Riesling, Gewurztraminer, Pinot Gris, Muscat ; Sylvaner uniquement sur Zotzenberg ; Pinot Noir sur Kirchberg de Barr et Hengst",
  "source": "CIVA"
 },
 {
  "id": "REP05",
  "region": "Champagne",
  "sujet": "Echelle des crus",
  "donnee": "17 Grands Crus (100%), 44 Premiers Crus (90-99%), ~300 autres communes (80-89%) ; prix fixes abandonnes en 2004-2010",
  "source": "CIVC / Wikipedia"
 },
 {
  "id": "REP06",
  "region": "Bordeaux",
  "sujet": "Classement 1855 Médoc",
  "donnee": "61 crus classés, jamais révisé sauf 1973 (Mouton en 1er)",
  "source": "Classement 1855"
 },
 {
  "id": "REP07",
  "region": "Bordeaux",
  "sujet": "Classement 1855 Sauternes",
  "donnee": "27 crus : 1 Premier Cru Supérieur, 11 Premiers Crus, 15 Seconds Crus",
  "source": "Classement 1855"
 },
 {
  "id": "REP08",
  "region": "Bordeaux",
  "sujet": "Graves 1953/1959",
  "donnee": "16 mentions de cru classé (14 chateaux), tous en Pessac-Léognan (AOC créée en 1989)",
  "source": "Classement Graves"
 },
 {
  "id": "REP09",
  "region": "Bordeaux",
  "sujet": "Saint-Émilion 2022",
  "donnee": "85 propriétés : 2 Premiers GCC A, 12 Premiers GCC B, 71 GCC ; valable jusqu'a la récolte 2031",
  "source": "Arrete 15/12/2022"
 },
 {
  "id": "REP10",
  "region": "Saint-Émilion",
  "sujet": "Sorties du classement",
  "donnee": "Ausone et Cheval Blanc (2021), Angelus (2022) ont quitte le classement",
  "source": "Presse / ODG"
 },
 {
  "id": "REP11",
  "region": "France",
  "sujet": "Récolte 2025",
  "donnee": "~37,4 Mhl estimes (Agreste, 1er sept.), +3% vs 2024, -13% vs moyenne quinquennale",
  "source": "Agreste"
 },
 {
  "id": "REP12",
  "region": "France",
  "sujet": "Arrachages",
  "donnee": "Plus de 20 000 ha arraches en France, dont 8 000 dans le Bordelais",
  "source": "Agreste / presse"
 },
 {
  "id": "REP13",
  "region": "France",
  "sujet": "AOC/AOP viticoles",
  "donnee": "386 AOC/AOP viticoles + 77 IG viticoles annoncees par l'INAO (2023)",
  "source": "INAO / Wikipedia"
 },
 {
  "id": "REP14",
  "region": "France",
  "sujet": "Premières AOC",
  "donnee": "76 appellations reconnues en 1936 ; les 6 premières au décret du 15 mai 1936 : Arbois, Cassis, Chateauneuf-du-Pape, Cognac, Monbazillac, Tavel",
  "source": "INAO / Vitisphere"
 },
 {
  "id": "REP15",
  "region": "France",
  "sujet": "Reforme 2009",
  "donnee": "Les Vins de Pays sont devenus des IGP ; les AOVDQS ont disparu en 2011",
  "source": "Reglementation UE / INAO"
 },
 {
  "id": "REP16",
  "region": "France",
  "sujet": "Prix (methode)",
  "donnee": "Fourchettes estimees prix caviste TTC 2026 : 225 appellations en référence nominative, 355 par modèle régional/IGP",
  "source": "Estimation Oeno"
 }
]

