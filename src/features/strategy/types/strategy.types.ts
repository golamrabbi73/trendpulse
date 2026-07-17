export type StrategyTone = 'Aggressive' | 'Defensive' | 'Growth' | 'Creative' | 'Balanced';
export type OutputLength = 'Short' | 'Medium' | 'Long';

export interface StrategyContent {
  executiveSummary: string;
  thirtyDayActionPlan: string[];
  marketingCampaignIdeas: string[];
  contentStrategy: string;
  adCopySuggestions: string[];
  kpiRecommendations: string[];
  riskAnalysis: string[];
}

export interface StrategyVersion {
  versionNumber: number;
  tone: StrategyTone;
  outputLength: OutputLength;
  content: StrategyContent;
  generatedAt: string;
}

export interface Strategy {
  _id: string;
  title: string;
  auditId: string;
  createdBy: string;
  tone: StrategyTone;
  outputLength: OutputLength;
  currentVersion: number;
  versions: StrategyVersion[];
  currentContent: StrategyContent;
  createdAt: string;
  updatedAt: string;
}

export interface GenerateStrategyPayload {
  title: string;
  auditId: string;
  tone: StrategyTone;
  outputLength: OutputLength;
}

export interface UpdateStrategyPayload {
  title?: string;
  currentContent?: StrategyContent;
}

export const STRATEGY_TONES: { value: StrategyTone; label: string; description: string }[] = [
  { value: 'Aggressive', label: 'Aggressive', description: 'Bold moves, market dominance' },
  { value: 'Defensive', label: 'Defensive', description: 'Protect market share, mitigate risks' },
  { value: 'Growth', label: 'Growth', description: 'Expand reach, scale operations' },
  { value: 'Creative', label: 'Creative', description: 'Innovative, unconventional tactics' },
  { value: 'Balanced', label: 'Balanced', description: 'Measured approach, steady progress' },
];

export const OUTPUT_LENGTHS: { value: OutputLength; label: string; description: string }[] = [
  { value: 'Short', label: 'Short', description: 'Quick overview, key points' },
  { value: 'Medium', label: 'Medium', description: 'Detailed analysis with action items' },
  { value: 'Long', label: 'Long', description: 'Comprehensive deep-dive strategy' },
];
