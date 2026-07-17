import { Audit } from '@/features/audit/types/audit.types';
import { Strategy } from '@/features/strategy/types/strategy.types';

export interface DashboardStats {
  totalCompetitors: number;
  totalAudits: number;
  totalStrategies: number;
  recentAudits: Audit[];
  recentStrategies: Strategy[];
  industryDistribution: { _id: string; count: number }[];
  riskLevelDistribution: { _id: string; count: number }[];
  auditTrends: { _id: string; count: number }[];
  strategyTrends: { _id: string; count: number }[];
}
