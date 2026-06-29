import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'bot/data/jobs.json');

export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      if (!fs.existsSync(DATA_FILE)) return res.status(404).json({ error: 'No data' });
      const { jobs } = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
      const job = jobs.find(j => j.id === id);
      if (!job) return res.status(404).json({ error: 'Not found' });
      return res.json(job);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  res.status(405).end();
}
