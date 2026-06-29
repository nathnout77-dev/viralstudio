import { useState, useEffect, useCallback } from 'react';

const PLATFORM_COLORS = {
  linkedin: 'bg-blue-100 text-blue-800',
  indeed: 'bg-orange-100 text-orange-800',
  francetravail: 'bg-purple-100 text-purple-800',
  wttj: 'bg-green-100 text-green-800',
};

const STATUS_CONFIG = {
  found: { label: 'Nouveau', color: 'bg-gray-100 text-gray-700', emoji: '🔵' },
  applied: { label: 'Envoyée', color: 'bg-green-100 text-green-700', emoji: '✅' },
  manual_required: { label: 'Manuelle', color: 'bg-yellow-100 text-yellow-700', emoji: '⚠️' },
  error: { label: 'Erreur', color: 'bg-red-100 text-red-700', emoji: '❌' },
  replied: { label: 'Réponse', color: 'bg-blue-100 text-blue-700', emoji: '📬' },
  interview: { label: 'Entretien', color: 'bg-indigo-100 text-indigo-700', emoji: '⭐' },
  rejected: { label: 'Refus', color: 'bg-red-100 text-red-600', emoji: '🔴' },
  accepted: { label: 'Acceptée', color: 'bg-emerald-100 text-emerald-700', emoji: '🏆' },
};

const ALL_STATUSES = Object.keys(STATUS_CONFIG);

function StatCard({ label, value, emoji, highlight }) {
  return (
    <div className={`rounded-xl p-4 ${highlight ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200'}`}>
      <div className="text-2xl mb-1">{emoji}</div>
      <div className={`text-3xl font-bold ${highlight ? 'text-white' : 'text-gray-900'}`}>{value}</div>
      <div className={`text-sm mt-1 ${highlight ? 'text-indigo-200' : 'text-gray-500'}`}>{label}</div>
    </div>
  );
}

function Badge({ text, className }) {
  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${className}`}>{text}</span>;
}

export default function JobsDashboard() {
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState(null);
  const [exportedAt, setExportedAt] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPlatform, setFilterPlatform] = useState('');
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterStatus) params.set('status', filterStatus);
      if (filterPlatform) params.set('platform', filterPlatform);
      params.set('limit', '200');
      const res = await fetch(`/api/jobs?${params}`);
      const data = await res.json();
      setJobs(data.jobs || []);
      setStats(data.stats);
      setExportedAt(data.exportedAt);
    } finally {
      setLoading(false);
    }
  }, [filterStatus, filterPlatform]);

  useEffect(() => { load(); }, [load]);

  async function updateStatus(id, status) {
    setUpdatingId(id);
    await fetch('/api/jobs', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    await load();
    if (selected?.id === id) setSelected(prev => ({ ...prev, status }));
    setUpdatingId(null);
  }

  const formatDate = (iso) => iso ? new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }) : '—';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">🤖 Job Bot — Dashboard</h1>
            <p className="text-sm text-gray-500 mt-0.5">Commercial · Automobile · Industrie · Vente · Beaumont-du-Gâtinais +30km</p>
          </div>
          <div className="text-right">
            {exportedAt && <p className="text-xs text-gray-400">Màj {new Date(exportedAt).toLocaleString('fr-FR')}</p>}
            <button onClick={load} className="mt-1 text-sm text-indigo-600 hover:text-indigo-800 font-medium">↻ Rafraîchir</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-4 gap-4 mb-6 sm:grid-cols-8">
            <StatCard label="Total" value={stats.total} emoji="📋" />
            <StatCard label="Nouvelles" value={stats.found} emoji="🔵" />
            <StatCard label="Envoyées" value={stats.applied} emoji="✅" highlight />
            <StatCard label="Manuelles" value={stats.manual_required} emoji="⚠️" />
            <StatCard label="Réponses" value={stats.replied} emoji="📬" />
            <StatCard label="Entretiens" value={stats.interview} emoji="⭐" />
            <StatCard label="Refus" value={stats.rejected} emoji="🔴" />
            <StatCard label="Acceptées" value={stats.accepted} emoji="🏆" />
          </div>
        )}

        {/* Filters */}
        <div className="flex gap-3 mb-4">
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Tous les statuts</option>
            {ALL_STATUSES.map(s => (
              <option key={s} value={s}>{STATUS_CONFIG[s].emoji} {STATUS_CONFIG[s].label}</option>
            ))}
          </select>
          <select
            value={filterPlatform}
            onChange={e => setFilterPlatform(e.target.value)}
            className="text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Toutes les plateformes</option>
            {['linkedin', 'indeed', 'francetravail', 'wttj'].map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <span className="text-sm text-gray-500 self-center">{jobs.length} offre{jobs.length !== 1 ? 's' : ''}</span>
        </div>

        <div className="flex gap-6">
          {/* Job list */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="text-center py-20 text-gray-400">Chargement...</div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
                <p className="text-gray-400 text-lg">Aucune offre trouvée</p>
                <p className="text-gray-300 text-sm mt-2">Lancez le bot avec <code className="bg-gray-100 px-1 rounded">npm start</code> dans le dossier <code className="bg-gray-100 px-1 rounded">bot/</code></p>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Poste</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Entreprise</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Plateforme</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Statut</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Date</th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((job, i) => {
                      const statusCfg = STATUS_CONFIG[job.status] || STATUS_CONFIG.found;
                      const isSelected = selected?.id === job.id;
                      return (
                        <tr
                          key={job.id}
                          className={`border-b border-gray-50 cursor-pointer transition-colors ${isSelected ? 'bg-indigo-50' : i % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50/50 hover:bg-gray-100'}`}
                          onClick={() => setSelected(isSelected ? null : job)}
                        >
                          <td className="px-4 py-3">
                            <span className="font-medium text-gray-900 line-clamp-1">{job.title}</span>
                            {job.salary && <span className="text-xs text-gray-400 block">{job.salary}</span>}
                          </td>
                          <td className="px-4 py-3 text-gray-600 truncate max-w-[150px]">{job.company || '—'}</td>
                          <td className="px-4 py-3">
                            <Badge text={job.platform} className={PLATFORM_COLORS[job.platform] || 'bg-gray-100 text-gray-600'} />
                          </td>
                          <td className="px-4 py-3">
                            <Badge text={`${statusCfg.emoji} ${statusCfg.label}`} className={statusCfg.color} />
                          </td>
                          <td className="px-4 py-3 text-gray-400 text-xs">{formatDate(job.foundAt)}</td>
                          <td className="px-4 py-3">
                            <a
                              href={job.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={e => e.stopPropagation()}
                              className="text-indigo-500 hover:text-indigo-700 text-xs"
                            >
                              Voir →
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Detail panel */}
          {selected && (
            <div className="w-80 shrink-0">
              <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 text-sm leading-snug pr-2">{selected.title}</h3>
                  <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 shrink-0">✕</button>
                </div>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p><span className="font-medium">Entreprise:</span> {selected.company || '—'}</p>
                  <p><span className="font-medium">Lieu:</span> {selected.location || '—'}</p>
                  <p><span className="font-medium">Salaire:</span> {selected.salary || 'Non précisé'}</p>
                  <p><span className="font-medium">Contrat:</span> {selected.contract}</p>
                  <p><span className="font-medium">Easy Apply:</span> {selected.easyApply ? '✅ Oui' : '❌ Non'}</p>
                  {selected.appliedAt && <p><span className="font-medium">Candidaté le:</span> {formatDate(selected.appliedAt)}</p>}
                </div>

                {/* Status buttons */}
                <div className="border-t border-gray-100 pt-4 mb-4">
                  <p className="text-xs font-medium text-gray-500 mb-2">Changer le statut:</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {['applied', 'replied', 'interview', 'rejected', 'accepted', 'manual_required'].map(s => {
                      const cfg = STATUS_CONFIG[s];
                      return (
                        <button
                          key={s}
                          disabled={updatingId === selected.id || selected.status === s}
                          onClick={() => updateStatus(selected.id, s)}
                          className={`text-xs px-2 py-1.5 rounded-lg transition-colors ${selected.status === s ? cfg.color + ' cursor-default' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} disabled:opacity-50`}
                        >
                          {cfg.emoji} {cfg.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <a
                  href={selected.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-indigo-600 text-white text-sm py-2 rounded-lg hover:bg-indigo-700 transition-colors mb-3"
                >
                  Ouvrir l'offre →
                </a>

                {selected.coverLetter && (
                  <details className="mt-3">
                    <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">Voir la lettre de motivation</summary>
                    <div className="mt-2 p-3 bg-gray-50 rounded-lg text-xs text-gray-600 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
                      {selected.coverLetter}
                    </div>
                  </details>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
