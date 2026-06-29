export type JobStatus =
  | 'found'
  | 'applied'
  | 'manual_required'
  | 'error'
  | 'replied'
  | 'interview'
  | 'rejected'
  | 'accepted';

export type ContractType = 'CDI' | 'CDD' | 'Intérim' | 'Freelance' | 'Autre';

export type Platform = 'indeed' | 'linkedin' | 'francetravail' | 'wttj';

export interface Job {
  id: string;
  platform: Platform;
  title: string;
  company: string;
  location: string;
  salary?: string;
  salaryMin?: number;
  contract: ContractType;
  description: string;
  url: string;
  easyApply: boolean;
  remote?: boolean;
  sectors: string[];
  postedAt?: string;
}

export interface SavedJob extends Job {
  status: JobStatus;
  foundAt: string;
  appliedAt?: string;
  coverLetter?: string;
  notes?: string;
}

export interface SearchResult {
  jobs: Job[];
  platform: Platform;
  totalFound: number;
  errors?: string[];
}

export interface Stats {
  total: number;
  found: number;
  applied: number;
  manual_required: number;
  replied: number;
  interview: number;
  rejected: number;
  accepted: number;
}
