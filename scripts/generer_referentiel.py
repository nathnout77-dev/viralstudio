#!/usr/bin/env python3
"""Génère data/referentielFrance.js depuis le classeur Excel de la base viticole.

    python3 scripts/generer_referentiel.py <chemin-du-xlsx>

La source Excel est en texte non accentué. Œno étant une app française soignée,
on ré-accentue via un dictionnaire explicite de termes viticoles
(scripts/accents_viticoles.py) : chaque entrée est vérifiable, aucune heuristique.
"""
import json
import re
import sys
from pathlib import Path

import openpyxl

sys.path.insert(0, str(Path(__file__).parent))
from accents_viticoles import ACCENTS

MOT = re.compile(r"[A-Za-zÀ-ÿ]+")


def reaccentuer(s):
    if not isinstance(s, str):
        return s
    return MOT.sub(lambda m: ACCENTS.get(m.group(0), m.group(0)), s)


def nz(v):
    """Valeur nettoyée, ou None si vide / tiret."""
    if v is None:
        return None
    s = str(v).strip()
    return s if s and s != "-" else None


def liste(v):
    """Découpe « a, b / c » en liste, en ré-accentuant chaque élément."""
    s = nz(v)
    if not s:
        return []
    return [reaccentuer(x.strip()) for x in re.split(r"\s*[,/]\s*", s) if x.strip()]


def texte(v):
    s = nz(v)
    return reaccentuer(s) if s else None


def corps(v):
    """Colonne « Corps » des cépages : ici « Corse » désigne le corps du vin
    (corsé), pas l'île. Le dictionnaire global ne peut pas trancher — la
    région Corse est bien plus fréquente — donc on le fait localement."""
    s = texte(v)
    if not s:
        return None
    return re.sub(r"\bCorse\b", "Corsé", re.sub(r"\bcorse\b", "corsé", s))


def entier(v):
    try:
        return int(float(v))
    except (TypeError, ValueError):
        return None


def lignes(wb, feuille):
    """Lignes de données d'une feuille, en-tête exclue."""
    ws = wb[feuille]
    it = ws.iter_rows(values_only=True)
    next(it, None)
    return [r for r in it if r and any(c is not None for c in r)]


def bloc(nom, arr, commentaire):
    return f"// {commentaire}\nexport const {nom} = {json.dumps(arr, ensure_ascii=False, indent=1)}\n"


def main():
    if len(sys.argv) < 2:
        sys.exit("usage: python3 scripts/generer_referentiel.py <xlsx>")
    wb = openpyxl.load_workbook(sys.argv[1], read_only=True, data_only=True)

    # ── Appellations : AOC + IGP ────────────────────────────────────────────
    appellations = [
        {"id": r[0], "nom": texte(r[1]), "region": texte(r[2]),
         "sousRegion": texte(r[3]), "type": "AOC"}
        for r in lignes(wb, "Appellations FR (toutes)")
    ] + [
        {"id": r[0], "nom": texte(r[1]), "region": texte(r[2]),
         "sousRegion": texte(r[3]), "type": "IGP"}
        for r in lignes(wb, "IGP - Vins de Pays")
    ]

    details = [
        {"id": r[0], "nom": texte(r[1]), "region": texte(r[2]), "sousRegion": texte(r[3]),
         "couleurs": liste(r[4]), "cepages": liste(r[5]),
         "sol": texte(r[6]), "garde": nz(r[7]), "hierarchie": texte(r[8])}
        for r in lignes(wb, "Appellations detaillees")
    ]

    cepages = [
        {"id": r[0], "nom": texte(r[1]), "couleur": texte(r[2]), "origine": texte(r[3]),
         "appellations": liste(r[4]), "synonymes": liste(r[5]), "aromes": liste(r[6]),
         "tanins": texte(r[7]), "acidite": texte(r[8]), "corps": corps(r[9]),
         "garde": nz(r[10]),
         "tempService": (nz(r[11]) or "").replace("C", " °C").strip() or None,
         "accords": liste(r[12])}
        for r in lignes(wb, "Cepages")
    ]

    domaines = [
        {"id": r[0], "nom": texte(r[1]), "region": texte(r[2]), "appellation": texte(r[3]),
         "cuvees": liste(r[4]), "style": texte(r[5]), "statut": texte(r[6]), "note": texte(r[7])}
        for r in lignes(wb, "Domaines")
    ]

    millesimes = [
        {"id": r[0], "annee": entier(r[1]), "region": texte(r[2]),
         "note": float(r[3]) if r[3] is not None else None,
         "style": texte(r[4]), "apogee": nz(r[5]), "commentaire": texte(r[6])}
        for r in lignes(wb, "Millesimes")
    ]

    classements = [
        {"id": r[0], "classement": texte(r[1]), "rang": texte(r[2]),
         "chateau": texte(r[3]), "appellation": texte(r[4])}
        for r in lignes(wb, "Classements Bordeaux")
    ]

    crus = [
        {"id": r[0], "nom": texte(r[1]), "type": "alsace_gc", "commune": texte(r[2]),
         "zone": texte(r[3]), "sol": texte(r[4]), "cepage": None}
        for r in lignes(wb, "Grands Crus Alsace")
    ] + [
        {"id": r[0], "nom": texte(r[1]), "type": "bourgogne_gc", "commune": texte(r[3]),
         "zone": texte(r[2]), "sol": None, "cepage": texte(r[5]),
         "couleur": texte(r[4]), "note": texte(r[6])}
        for r in lignes(wb, "Grands Crus Bourgogne")
    ] + [
        {"id": r[0], "nom": texte(r[1]), "type": "champagne", "commune": texte(r[1]),
         "zone": texte(r[3]), "sol": None, "cepage": texte(r[4]), "niveau": texte(r[2])}
        for r in lignes(wb, "Crus Champagne")
    ]

    reperes = [
        {"id": r[0], "region": texte(r[1]), "sujet": texte(r[2]),
         "donnee": texte(r[3]), "source": nz(r[4])}
        for r in lignes(wb, "Reperes")
    ]

    # ── Profils : la table qui rend chaque appellation recommandable ────────
    profils = [
        {"id": r[0], "appellation": texte(r[1]), "type": nz(r[2]), "region": texte(r[3]),
         "couleur": texte(r[4]),
         "puissance": entier(r[5]), "acidite": entier(r[6]), "tanin": entier(r[7]),
         "sucrosite": entier(r[8]), "intensite": entier(r[9]), "garde": entier(r[10]),
         "profil": texte(r[11]),
         "aromes": liste(r[12]),
         "accords": liste(r[13]),
         "prixEntree": entier(r[14]), "prixCoeur": entier(r[15]), "prixHaut": entier(r[16]),
         "fiabilitePrix": texte(r[17])}
        for r in lignes(wb, "Profils, gout & prix")
    ]

    sortie = f"""// ═══════════════════════════════════════════════════════════════════════════
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

{bloc('APPELLATIONS_FR', appellations, f'{len(appellations)} appellations : AOC/AOP et IGP, toutes régions.')}
{bloc('APPELLATIONS_DETAIL', details, f'{len(details)} appellations détaillées : cépages, sol, garde, hiérarchie.')}
{bloc('PROFILS_GOUT', profils, f'{len(profils)} profils : jauges /5, arômes, accords, prix, fiabilité du prix.')}
{bloc('CEPAGES_FR', cepages, f'{len(cepages)} cépages : arômes, structure, garde, température, accords.')}
{bloc('DOMAINES_FR', domaines, f'{len(domaines)} domaines de référence : cuvées, style, statut.')}
{bloc('MILLESIMES_FR', millesimes, f'{len(millesimes)} millésimes notés par région, avec apogée.')}
{bloc('CLASSEMENTS_BORDEAUX', classements, f'{len(classements)} crus classés : 1855, Graves, Saint-Émilion 2022.')}
{bloc('CRUS_FR', crus, f"{len(crus)} crus : Grands Crus d'Alsace et de Bourgogne, échelle Champagne.")}
{bloc('REPERES_FR', reperes, f'{len(reperes)} repères chiffrés (INAO, interprofessions).')}
"""

    Path("data/referentielFrance.js").write_text(sortie, encoding="utf8")

    total = sum(map(len, [appellations, details, profils, cepages, domaines,
                          millesimes, classements, crus, reperes]))
    for nom, arr in [("appellations", appellations), ("détails", details), ("profils", profils),
                     ("cépages", cepages), ("domaines", domaines), ("millésimes", millesimes),
                     ("classements", classements), ("crus", crus), ("repères", reperes)]:
        print(f"{nom:14} {len(arr):5}")
    print(f"{'TOTAL':14} {total:5}")


if __name__ == "__main__":
    main()
