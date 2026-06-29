import Database from 'better-sqlite3';
import path from 'path';
import { randomUUID } from 'crypto';
import fs from 'fs';
import type { Job, SavedJob, JobStatus, Stats } from './types';

const DATA_DIR = path.join(__dirname, '../../data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const db = new Database(path.join(DATA_DIR, 'jobs.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS jobs (
    id TEXT PRIMARY KEY,
    platform TEXT NOT NULL,
    title TEXT NOT NULL,
    company TEXT DEFAULT '',
    location TEXT DEFAULT '',
    salary TEXT,
    salary_min INTEGER,
    contract TEXT DEFAULT 'CDI',
    description TEXT DEFAULT '',
    url TEXT UNIQUE NOT NULL,
    easy_apply INTEGER DEFAULT 0,
    remote INTEGER DEFAULT 0,
    sectors TEXT DEFAULT '[]',
    posted_at TEXT,
    found_at TEXT DEFAULT (datetime('now')),
    status TEXT DEFAULT 'found',
    applied_at TEXT,
    cover_letter TEXT,
    notes TEXT
  );
`);

function toJob(row: any): SavedJob {
  return {
    id: row.id,
    platform: row.platform,
    title: row.title,
    company: row.company,
    location: row.location,
    salary: row.salary,
    salaryMin: row.salary_min,
    contract: row.contract,
    description: row.description,
    url: row.url,
    easyApply: Boolean(row.easy_apply),
    remote: Boolean(row.remote),
    sectors: JSON.parse(row.sectors || '[]'),
    postedAt: row.posted_at,
    status: row.status,
    foundAt: row.found_at,
    appliedAt: row.applied_at,
    coverLetter: row.cover_letter,
    notes: row.notes,
  };
}

export const jobDb = {
  saveJob(job: Job): boolean {
    const existing = db.prepare('SELECT id FROM jobs WHERE url = ?').get(job.url);
    if (existing) return false;

    db.prepare(`
      INSERT INTO jobs (id, platform, title, company, location, salary, salary_min, contract, description, url, easy_apply, remote, sectors, posted_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      randomUUID(),
      job.platform,
      job.title,
      job.company || '',
      job.location || '',
      job.salary || null,
      job.salaryMin || null,
      job.contract,
      (job.description || '').slice(0, 5000),
      job.url,
      job.easyApply ? 1 : 0,
      job.remote ? 1 : 0,
      JSON.stringify(job.sectors || []),
      job.postedAt || null,
    );
    return true;
  },

  getJobsByStatus(status: JobStatus): SavedJob[] {
    return db.prepare('SELECT * FROM jobs WHERE status = ? ORDER BY found_at DESC').all(status).map(toJob);
  },

  getAllJobs(limit = 200, offset = 0): SavedJob[] {
    return db.prepare('SELECT * FROM jobs ORDER BY found_at DESC LIMIT ? OFFSET ?').all(limit, offset).map(toJob);
  },

  getJob(id: string): SavedJob | null {
    const row = db.prepare('SELECT * FROM jobs WHERE id = ?').get(id);
    return row ? toJob(row) : null;
  },

  updateStatus(id: string, status: JobStatus) {
    const appliedAt = status === 'applied' ? new Date().toISOString() : null;
    db.prepare('UPDATE jobs SET status = ?, applied_at = COALESCE(?, applied_at) WHERE id = ?').run(status, appliedAt, id);
  },

  updateCoverLetter(id: string, coverLetter: string) {
    db.prepare('UPDATE jobs SET cover_letter = ? WHERE id = ?').run(coverLetter, id);
  },

  addNote(id: string, note: string) {
    db.prepare('UPDATE jobs SET notes = ? WHERE id = ?').run(note, id);
  },

  getStats(): Stats {
    return db.prepare(`
      SELECT
        COUNT(*) as total,
        SUM(CASE WHEN status='found' THEN 1 ELSE 0 END) as found,
        SUM(CASE WHEN status='applied' THEN 1 ELSE 0 END) as applied,
        SUM(CASE WHEN status='manual_required' THEN 1 ELSE 0 END) as manual_required,
        SUM(CASE WHEN status='replied' THEN 1 ELSE 0 END) as replied,
        SUM(CASE WHEN status='interview' THEN 1 ELSE 0 END) as interview,
        SUM(CASE WHEN status='rejected' THEN 1 ELSE 0 END) as rejected,
        SUM(CASE WHEN status='accepted' THEN 1 ELSE 0 END) as accepted
      FROM jobs
    `).get() as Stats;
  },

  exportJson(filePath: string) {
    const jobs = this.getAllJobs(1000);
    const stats = this.getStats();
    fs.writeFileSync(filePath, JSON.stringify({ jobs, stats, exportedAt: new Date().toISOString() }, null, 2));
  },
};
