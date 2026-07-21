import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { SECTORS, STAGES } from "../data/templates";
import {
  ArrowRight,
  Check,
  Clock,
  Target,
  Layers,
  ShieldCheck,
} from "lucide-react";

const FEATURES = [
  {
    icon: Target,
    title: "Adapté à chaque prospect",
    desc: "Renseignez le prénom, l'entreprise, le rôle et la douleur — le script se personnalise en un clic.",
  },
  {
    icon: Layers,
    title: "8 secteurs, 7 étapes de vente",
    desc: "De l'appel à froid au closing, avec un vocabulaire et des preuves propres à votre marché.",
  },
  {
    icon: Clock,
    title: "Prêt en 10 secondes",
    desc: "Fini la page blanche. Générez, copiez, appelez. Trois variantes à chaque fois.",
  },
  {
    icon: ShieldCheck,
    title: "Traitement d'objections",
    desc: "Prix, temps, concurrent, budget… une réponse cadrée pour chaque objection classique.",
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>ScriptVente — Générateur de scripts de vente personnalisés</title>
      </Head>
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700">
            Pour les commerciaux qui veulent convertir plus
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
            Le bon script de vente,{" "}
            <span className="text-brand-600">pour chaque prospect</span>.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            Générez des scripts d'appel, d'e-mail et de LinkedIn adaptés à votre
            secteur et à la situation exacte de votre prospect. Sans page
            blanche, sans y passer la journée.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/generateur"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white shadow-lg shadow-brand-600/20 hover:bg-brand-700"
            >
              Générer mon premier script <ArrowRight size={18} />
            </Link>
            <Link
              href="/tarifs"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Voir les tarifs
            </Link>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            5 scripts gratuits par jour · aucune carte requise
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-slate-200 bg-white py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-2xl border border-slate-200 p-6">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <f.icon size={22} />
              </div>
              <h3 className="mt-4 font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sectors + stages */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Votre secteur, votre langage
            </h2>
            <p className="mt-2 text-slate-600">
              Chaque script parle le langage de votre marché.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {SECTORS.map((s) => (
                <span
                  key={s.id}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700"
                >
                  {s.label}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Couvre tout le cycle
            </h2>
            <p className="mt-2 text-slate-600">
              Un script pour chaque moment clé de la vente.
            </p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {STAGES.map((st) => (
                <li key={st.id} className="flex items-center gap-2 text-slate-700">
                  <Check size={18} className="text-brand-600" /> {st.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-600 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center text-white">
          <h2 className="text-3xl font-bold">Arrêtez d'improviser vos appels.</h2>
          <p className="mt-3 text-brand-100">
            Testez gratuitement — votre prochain script est à 10 secondes.
          </p>
          <Link
            href="/generateur"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-brand-700 hover:bg-brand-50"
          >
            Commencer maintenant <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} ScriptVente — Générateur de scripts de
          vente personnalisés.
        </div>
      </footer>
    </>
  );
}
