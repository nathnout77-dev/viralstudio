import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'bot/data/jobs.json');

export default function handler(req, res) {
  if (req.method === 'GET') {
    try {
      if (!fs.existsSync(DATA_FILE)) {
        return res.json({ jobs: [], stats: { total: 0, found: 0, applied: 0, manual_required: 0, replied: 0, interview: 0, rejected: 0, accepted: 0 }, exportedAt: null });
      }
      const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
      const { status, platform, limit = 100, offset = 0 } = req.query;

      let jobs = data.jobs || [];
      if (status) jobs = jobs.filter(j => j.status === status);
      if (platform) jobs = jobs.filter(j => j.platform === platform);
      jobs = jobs.slice(Number(offset), Number(offset) + Number(limit));

      return res.json({ jobs, stats: data.stats, exportedAt: data.exportedAt });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  if (req.method === 'PATCH') {
    // Update job status (manual update from dashboard)
    try {
      const { id, status, notes } = req.body;
      if (!fs.existsSync(DATA_FILE)) return res.status(404).json({ error: 'No data file' });

      const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
      const job = data.jobs.find(j => j.id === id);
      if (!job) return res.status(404).json({ error: 'Job not found' });

      if (status) job.status = status;
      if (notes) job.notes = notes;
      if (status === 'applied') job.appliedAt = new Date().toISOString();

      // Recalculate stats
      const statKeys = ['found', 'applied', 'manual_required', 'replied', 'interview', 'rejected', 'accepted'];
      const stats = { total: data.jobs.length };
      for (const k of statKeys) stats[k] = data.jobs.filter(j => j.status === k).length;
      data.stats = stats;

      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
      return res.json({ ok: true, job });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  res.status(405).end();
}
