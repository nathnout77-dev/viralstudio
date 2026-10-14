# ADR-001: Mesure d'audience via Umami Cloud (offre gratuite)

**Status:** Proposed
**Date:** 2026-10-14
**Feature:** mesure
**Author:** 10x-Team (Architect + Staff Engineer)

## Context
Aucune mesure d'usage. Décision de prix indéfendable sans rétention. Contraintes : gratuit, RGPD simple, local d'abord (l'app marche sans tiers), pas de domaine possédé.

## Decision
Umami Cloud gratuit, script chargé conditionnellement, wrapper unique `lib/mesure.js` (no-op sans config ou en Do-Not-Track).

## Alternatives Considered
| Alternative | Pros | Cons | Why Not |
|-------------|------|------|---------|
| Umami VPS Docker | Gratuit, maîtrisé | Exige HTTPS donc un domaine, maintenance | Pas de domaine |
| Plausible Cloud | Simple | ~9 €/mois | Gratuit demandé |
| Table événements Supabase | Aucun tiers | Code de dashboard à écrire, charge DB | Repli si limites Umami atteintes |

## Consequences
### Positive
- Zéro serveur, mise en place rapide, dashboard prêt.
### Negative
- Tiers à déclarer dans `/confidentialite` ; limite 100k événements/mois ; rétention 6 mois.
### Risks
- Dépassement du quota : n'échantillonner que les événements clés, repli Supabase.
- Offre gratuite modifiée : wrapper unique, changement de fournisseur en un fichier.

## Dependencies
Aucune. Contraint : vocabulaire des événements (stable, car lié aux KPI J30).
