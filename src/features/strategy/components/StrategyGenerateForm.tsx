'use client';

import * as React from 'react';
import {
  FiZap,
  FiShield,
  FiTrendingUp,
  FiStar,
  FiTarget,
  FiCpu,
} from 'react-icons/fi';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { cn } from '@/utils/cn';
import { Audit } from '@/features/audit/types/audit.types';
import {
  StrategyTone,
  OutputLength,
  STRATEGY_TONES,
  OUTPUT_LENGTHS,
} from '../types/strategy.types';

interface StrategyGenerateFormProps {
  audits: Audit[];
  onSubmit: (data: {
    title: string;
    auditId: string;
    tone: StrategyTone;
    outputLength: OutputLength;
  }) => void;
  isPending: boolean;
}

const toneIcons: Record<StrategyTone, React.ElementType> = {
  Aggressive: FiZap,
  Defensive: FiShield,
  Growth: FiTrendingUp,
  Creative: FiStar,
  Balanced: FiTarget,
};

const toneStyles: Record<StrategyTone, string> = {
  Aggressive:
    'border-red-300 bg-red-50 text-red-700 dark:border-red-700 dark:bg-red-950/40 dark:text-red-300',
  Defensive:
    'border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-700 dark:bg-blue-950/40 dark:text-blue-300',
  Growth:
    'border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300',
  Creative:
    'border-purple-300 bg-purple-50 text-purple-700 dark:border-purple-700 dark:bg-purple-950/40 dark:text-purple-300',
  Balanced:
    'border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-300',
};

export function StrategyGenerateForm({
  audits,
  onSubmit,
  isPending,
}: StrategyGenerateFormProps) {
  const [title, setTitle] = React.useState('');
  const [auditId, setAuditId] = React.useState('');
  const [tone, setTone] = React.useState<StrategyTone>('Balanced');
  const [outputLength, setOutputLength] = React.useState<OutputLength>('Medium');
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!title.trim()) newErrors.title = 'Strategy title is required';
    if (title.trim().length > 120) newErrors.title = 'Title cannot exceed 120 characters';
    if (!auditId) newErrors.auditId = 'Please select an audit';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit({ title: title.trim(), auditId, tone, outputLength });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <label
          htmlFor="strategy-title"
          className="text-sm font-medium leading-none"
        >
          Strategy Title
        </label>
        <input
          id="strategy-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="e.g. Q3 Growth Strategy for Nike Market"
          disabled={isPending}
        />
        {errors.title && (
          <p className="text-[0.8rem] font-medium text-destructive">
            {errors.title}
          </p>
        )}
      </div>

      {/* Audit Selection */}
      <div className="space-y-2">
        <label
          htmlFor="audit-select"
          className="text-sm font-medium leading-none"
        >
          Select Competitor Audit
        </label>
        <Select
          id="audit-select"
          value={auditId}
          onChange={(e) => setAuditId(e.target.value)}
          error={!!errors.auditId}
          disabled={isPending}
        >
          <option value="">Choose an audit...</option>
          {audits.map((audit) => (
            <option key={audit._id} value={audit._id}>
              {audit.title}
            </option>
          ))}
        </Select>
        {errors.auditId && (
          <p className="text-[0.8rem] font-medium text-destructive">
            {errors.auditId}
          </p>
        )}
      </div>

      {/* Strategy Tone */}
      <div className="space-y-3">
        <label className="text-sm font-medium leading-none">Strategy Tone</label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {STRATEGY_TONES.map((t) => {
            const Icon = toneIcons[t.value];
            const isSelected = tone === t.value;
            return (
              <button
                key={t.value}
                type="button"
                disabled={isPending}
                onClick={() => setTone(t.value)}
                className={cn(
                  'flex flex-col items-center gap-1.5 rounded-lg border-2 p-3 text-center transition-all disabled:opacity-50',
                  isSelected
                    ? toneStyles[t.value]
                    : 'border-transparent bg-muted/50 text-muted-foreground hover:border-border hover:bg-muted',
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-semibold">{t.label}</span>
                <span className="text-[10px] leading-tight opacity-75">
                  {t.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Output Length */}
      <div className="space-y-3">
        <label className="text-sm font-medium leading-none">Output Length</label>
        <div className="grid grid-cols-3 gap-2">
          {OUTPUT_LENGTHS.map((l) => {
            const isSelected = outputLength === l.value;
            return (
              <button
                key={l.value}
                type="button"
                disabled={isPending}
                onClick={() => setOutputLength(l.value)}
                className={cn(
                  'flex flex-col items-center gap-1 rounded-lg border-2 p-3 text-center transition-all disabled:opacity-50',
                  isSelected
                    ? 'border-primary bg-primary/5 text-primary dark:bg-primary/10'
                    : 'border-transparent bg-muted/50 text-muted-foreground hover:border-border hover:bg-muted',
                )}
              >
                <span className="text-sm font-semibold">{l.label}</span>
                <span className="text-[10px] leading-tight opacity-75">
                  {l.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit */}
      <div className="pt-2">
        {isPending ? (
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-3 rounded-lg border bg-primary/5 p-4">
              <div className="relative">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
                <FiZap className="absolute inset-0 m-auto h-3.5 w-3.5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-primary">
                  Generating your strategy...
                </p>
                <p className="text-xs text-muted-foreground">
                  This may take 30-60 seconds while our AI analyzes your audit
                  data.
                </p>
              </div>
            </div>
            {/* Animated progress bar */}
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div className="h-full w-1/3 animate-pulse rounded-full bg-primary" 
                   style={{ animation: 'indeterminate 1.5s ease-in-out infinite' }} />
            </div>
          </div>
        ) : (
          <Button type="submit" className="w-full gap-2" disabled={isPending}>
            <FiCpu className="h-4 w-4" />
            Generate AI Strategy
          </Button>
        )}
      </div>
    </form>
  );
}
