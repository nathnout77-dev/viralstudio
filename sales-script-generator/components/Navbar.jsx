import Link from "next/link";
import { Zap } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-900">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white">
            <Zap size={18} />
          </span>
          ScriptVente
        </Link>
        <nav className="flex items-center gap-1 text-sm sm:gap-3">
          <Link href="/generateur" className="rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100">
            Générateur
          </Link>
          <Link href="/tarifs" className="rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100">
            Tarifs
          </Link>
          <Link
            href="/generateur"
            className="rounded-lg bg-brand-600 px-4 py-2 font-medium text-white hover:bg-brand-700"
          >
            Essayer gratuitement
          </Link>
        </nav>
      </div>
    </header>
  );
}
