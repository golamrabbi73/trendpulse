export type MarketPosition = 'Leader' | 'Challenger' | 'Niche Player' | 'Visionary' | 'Unknown';

export interface CompetitorCreatedBy {
  _id: string;
  name: string;
  email: string;
}

export interface Competitor {
  _id: string;
  name: string;
  website: string;
  description?: string;
  industry?: string;
  logoUrl?: string;
  strengths?: string[];
  weaknesses?: string[];
  marketPosition?: MarketPosition;
  createdBy: CompetitorCreatedBy | string;
  createdAt: string;
  updatedAt: string;
}

export interface CompetitorPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CompetitorListResponse {
  results: Competitor[];
  pagination: CompetitorPagination;
}

export interface GetCompetitorsParams {
  page?: number;
  limit?: number;
  search?: string;
  industry?: string;
  marketPosition?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CreateCompetitorPayload {
  name: string;
  website: string;
  description?: string;
  industry?: string;
  logoUrl?: string;
  strengths?: string[];
  weaknesses?: string[];
  marketPosition?: MarketPosition;
}

export type UpdateCompetitorPayload = Partial<CreateCompetitorPayload>;
