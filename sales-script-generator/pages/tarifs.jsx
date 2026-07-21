import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import { getPlan, setPlan } from "../lib/store";
import { Check } from "lucide-react";

const PLANS = [
  {
    id: "free",
    name: "Gratuit",
    price: "0€",
    period: "",
    tagline: "Pour tester",
    features: [
      "5 scripts par jour",
      "8 secteurs, 7 étapes",
      "3 variantes par script",
      "Copier / coller",
    ],
    cta: "Plan actuel",
  },
  {
    id: "pro",
    name: "Pro",
    price: "15€",
    period: "/ mois",
    tagline: "Pour les commerciaux actifs",
    highlight: true,
    features: [
      "Scripts illimités",
      "Historique sauvegardé",
      "Traitement d'objections complet",
      "Tous les tons & variantes",
      "Nouveaux packs secteur inclus",
    ],
    cta: "Passer au Pro",
  },
  {
    id: "team",
    name: "Équipe",
    price: "49€",
    period: "/ mois",
    tagline: "Jusqu'à 5 commerciaux",
    features: [
      "Tout le plan Pro",
      "5 utilisateurs",
      "Bibliothèque d'équipe partagée",
      "Scripts de marque personnalisés",
      "Support prioritaire",
    ],
    cta: "Contacter",
  },
];

export default function Tarifs() {
  const router = useRouter();
  const [plan, setPlanState] = useState("free");

  useEffect(() => setPlanState(getPlan()), []);

  function choose(id) {
    if (id === "free") return;
    if (id === "team") {
      window.location.href = "mailto:contact@scriptvente.app?subject=Plan%20Equipe";
      return;
    }
    // Démo : bascule le plan localement. En production, brancher Stripe Checkout ici.
    setPlan("pro");
    setPlanState("pro");
    router.push("/generateur");
  }

  return (
    <>
      <Head>
        <title>Tarifs — ScriptVente</title>
      </Head>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-extrabold text-slate-900">
            Un tarif simple, une seule promesse : convertir plus.
          </h1>
          <p className="mt-3 text-slate-600">
            Sans engagement. Résiliable en un clic.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {PLANS.map((p) => {
            const current = plan === p.id;
            return (
              <div
                key={p.id}
                className={`relative rounded-2xl border bg-white p-6 ${
                  p.highlight
                    ? "border-brand-500 shadow-xl shadow-brand-600/10"
                    : "border-slate-200"
                }`}
              >
                {p.highlight && (
                  <span className="absolute -top-3 left-6 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
                    Le plus populaire
                  </span>
                )}
                <h3 className="text-lg font-bold text-slate-900">{p.name}</h3>
                <p className="text-sm text-slate-500">{p.tagline}</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900">{p.price}</span>
                  <span className="text-slate-500">{p.period}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                      <Check size={18} className="mt-0.5 shrink-0 text-brand-600" /> {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => choose(p.id)}
                  disabled={current}
                  className={`mt-8 w-full rounded-xl px-4 py-3 font-semibold ${
                    current
                      ? "cursor-default bg-slate-100 text-slate-500"
                      : p.highlight
                      ? "bg-brand-600 text-white hover:bg-brand-700"
                      : "border border-slate-300 text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  {current ? "Plan actuel" : p.cta}
                </button>
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-10 max-w-xl text-center text-xs text-slate-400">
          Démo : le bouton « Passer au Pro » active le plan localement. En
          production, branchez Stripe Checkout dans <code>pages/tarifs.jsx</code>.
        </p>
      </main>
    </>
  );
}
