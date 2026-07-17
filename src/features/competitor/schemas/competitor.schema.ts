import { z } from 'zod';

export const MARKET_POSITIONS = ['Leader', 'Challenger', 'Niche Player', 'Visionary', 'Unknown'] as const;

export const competitorSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  website: z.string().url('Please enter a valid URL (e.g. https://example.com)'),
  description: z.string().optional(),
  industry: z.string().optional(),
  logoUrl: z
    .string()
    .url('Please enter a valid logo URL')
    .optional()
    .or(z.literal('')),
  strengths: z.array(z.string()).optional(),
  weaknesses: z.array(z.string()).optional(),
  marketPosition: z.enum(MARKET_POSITIONS).optional(),
});

export type CompetitorFormInput = z.infer<typeof competitorSchema>;
