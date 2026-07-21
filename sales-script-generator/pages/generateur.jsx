import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";
import {
  SECTORS,
  STAGES,
  TONES,
  OBJECTIONS,
} from "../data/templates";
import { generateVariants } from "../lib/engine";
import {
  canGenerate,
  incrementUsage,
  remaining,
  saveToHistory,
  getPlan,
} from "../lib/store";
import { Copy, Check, RefreshCw, Save, Sparkles, Lock } from "lucide-react";

const FIELD =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100";
const LABEL = "block text-sm font-medium text-slate-700 mb-1";

export default function Generateur() {
  const [input, setInput] = useState({
    sectorId: "generic",
    stageId: "cold_call",
    toneId: "consultatif",
    objectionId: "prix",
    prospect: "",
    company: "",
    role: "",
    product: "",
    pain: "",
    value: "",
    proof: "",
    sender: "",
    senderCompany: "",
  });
  const [variants, setVariants] = useState([]);
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [left, setLeft] = useState(null);
  const [blocked, setBlocked] = useState(false);
  const [plan, setPlanState] = useState("free");

  useEffect(() => {
    setLeft(remaining());
    setPlanState(getPlan());
  }, []);

  const set = (key) => (e) =>
    setInput((prev) => ({ ...prev, [key]: e.target.value }));

  function handleGenerate() {
    if (!canGenerate()) {
      setBlocked(true);
      return;
    }
    const v = generateVariants(input, 3);
    setVariants(v);
    setActive(0);
    setCopied(false);
    setSaved(false);
    incrementUsage();
    setLeft(remaining());
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(variants[active]);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function handleSave() {
    const stageLabel = STAGES.find((s) => s.id === input.stageId)?.label;
    const sectorLabel = SECTORS.find((s) => s.id === input.sectorId)?.label;
    saveToHistory({
      title: `${stageLabel} · ${input.prospect || sectorLabel}`,
      text: variants[active],
      sectorLabel,
      stageLabel,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  const isObjection = input.stageId === "objection";

  return (
    <>
      <Head>
        <title>Générateur — ScriptVente</title>
      </Head>
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Générateur de script
            </h1>
            <p className="text-sm text-slate-500">
              Renseignez le prospect, choisissez l'étape, générez.
            </p>
          </div>
          {plan === "pro" ? (
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
              Plan Pro · illimité
            </span>
          ) : (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
              {left ?? "—"} script(s) gratuit(s) restant(s) aujourd'hui
            </span>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          {/* ---- Formulaire ---- */}
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={LABEL}>Secteur</label>
                <select className={FIELD} value={input.sectorId} onChange={set("sectorId")}>
                  {SECTORS.map((s) => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={LABEL}>Étape</label>
                <select className={FIELD} value={input.stageId} onChange={set("stageId")}>
                  {STAGES.map((s) => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={LABEL}>Ton</label>
                <select className={FIELD} value={input.toneId} onChange={set("toneId")}>
                  {TONES.map((t) => (
                    <option key={t.id} value={t.id}>{t.label}</option>
                  ))}
                </select>
              </div>
              {isObjection && (
                <div>
                  <label className={LABEL}>Objection</label>
                  <select className={FIELD} value={input.objectionId} onChange={set("objectionId")}>
                    {OBJECTIONS.map((o) => (
                      <option key={o.id} value={o.id}>{o.label}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <hr className="border-slate-100" />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={LABEL}>Prénom prospect</label>
                <input className={FIELD} placeholder="Julie" value={input.prospect} onChange={set("prospect")} />
              </div>
              <div>
                <label className={LABEL}>Entreprise</label>
                <input className={FIELD} placeholder="Acme" value={input.company} onChange={set("company")} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={LABEL}>Rôle</label>
                <input className={FIELD} placeholder="Directrice" value={input.role} onChange={set("role")} />
              </div>
              <div>
                <label className={LABEL}>Votre offre</label>
                <input className={FIELD} placeholder="notre solution" value={input.product} onChange={set("product")} />
              </div>
            </div>

            <div>
              <label className={LABEL}>
                Douleur du prospect <span className="text-slate-400">(optionnel)</span>
              </label>
              <input className={FIELD} placeholder="laisser vide = auto selon le secteur" value={input.pain} onChange={set("pain")} />
            </div>
            <div>
              <label className={LABEL}>
                Bénéfice / promesse <span className="text-slate-400">(optionnel)</span>
              </label>
              <input className={FIELD} placeholder="laisser vide = auto selon le secteur" value={input.value} onChange={set("value")} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={LABEL}>Votre prénom</label>
                <input className={FIELD} placeholder="Marc" value={input.sender} onChange={set("sender")} />
              </div>
              <div>
                <label className={LABEL}>Votre société</label>
                <input className={FIELD} placeholder="ScriptVente" value={input.senderCompany} onChange={set("senderCompany")} />
              </div>
            </div>

            <button
              onClick={handleGenerate}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 font-semibold text-white hover:bg-brand-700"
            >
              <Sparkles size={18} /> Générer le script
            </button>
          </div>

          {/* ---- Résultat ---- */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            {blocked ? (
              <div className="flex h-full flex-col items-center justify-center py-16 text-center">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                  <Lock size={26} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  Limite quotidienne atteinte
                </h3>
                <p className="mt-1 max-w-sm text-sm text-slate-600">
                  Vous avez utilisé vos scripts gratuits du jour. Passez au plan
                  Pro pour générer sans limite.
                </p>
                <Link href="/tarifs" className="mt-5 rounded-xl bg-brand-600 px-5 py-2.5 font-semibold text-white hover:bg-brand-700">
                  Passer au Pro
                </Link>
              </div>
            ) : variants.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center py-16 text-center text-slate-400">
                <Sparkles size={40} />
                <p className="mt-3 max-w-xs text-sm">
                  Remplissez le formulaire et cliquez sur « Générer ». Votre
                  script personnalisé apparaîtra ici, en 3 variantes.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex gap-1.5">
                    {variants.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActive(i)}
                        className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                          active === i
                            ? "bg-brand-600 text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        Variante {i + 1}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={handleGenerate} className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50">
                      <RefreshCw size={15} /> Régénérer
                    </button>
                    <button onClick={handleSave} className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50">
                      {saved ? <Check size={15} className="text-emerald-600" /> : <Save size={15} />}
                      {saved ? "Enregistré" : "Enregistrer"}
                    </button>
                    <button onClick={handleCopy} className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-800">
                      {copied ? <Check size={15} /> : <Copy size={15} />}
                      {copied ? "Copié" : "Copier"}
                    </button>
                  </div>
                </div>
                <pre className="whitespace-pre-wrap rounded-xl bg-slate-50 p-4 font-sans text-sm leading-relaxed text-slate-800">
                  {variants[active]}
                </pre>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
