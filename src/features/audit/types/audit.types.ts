export interface AuditInsights {
  executiveSummary?: string;
  swotAnalysis: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  pricingAnalysis?: string;
  marketGaps?: string[];
  risks?: string[];
  recommendations: string[];
}

export interface Audit {
  _id: string;
  title: string;
  fileName: string;
  fileType: string;
  rawTextExtract: string;
  insights: AuditInsights;
  createdBy: string | { _id: string; name: string };
  createdAt: string;
  updatedAt: string;
}
