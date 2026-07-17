'use client';

import * as React from 'react';
import { FiSave, FiX } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { StrategyContent } from '../types/strategy.types';

interface StrategyEditorProps {
  content: StrategyContent;
  onSave: (content: StrategyContent) => void;
  onCancel: () => void;
  isSaving: boolean;
}

interface EditableSectionProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'list';
}

function EditableSection({ label, value, onChange, type = 'text' }: EditableSectionProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none">{label}</label>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[100px] resize-y"
        placeholder={
          type === 'list'
            ? 'Enter items, one per line...'
            : 'Enter content...'
        }
      />
      {type === 'list' && (
        <p className="text-[10px] text-muted-foreground">
          Enter each item on a new line.
        </p>
      )}
    </div>
  );
}

function splitLines(text: string): string[] {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

function joinLines(items: string[]): string {
  return items.join('\n');
}

export function StrategyEditor({
  content,
  onSave,
  onCancel,
  isSaving,
}: StrategyEditorProps) {
  const [draft, setDraft] = React.useState({
    executiveSummary: content.executiveSummary || '',
    thirtyDayActionPlan: joinLines(content.thirtyDayActionPlan || []),
    marketingCampaignIdeas: joinLines(content.marketingCampaignIdeas || []),
    contentStrategy: content.contentStrategy || '',
    adCopySuggestions: joinLines(content.adCopySuggestions || []),
    kpiRecommendations: joinLines(content.kpiRecommendations || []),
    riskAnalysis: joinLines(content.riskAnalysis || []),
  });

  const update = (key: keyof typeof draft, value: string) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    const parsed: StrategyContent = {
      executiveSummary: draft.executiveSummary,
      thirtyDayActionPlan: splitLines(draft.thirtyDayActionPlan),
      marketingCampaignIdeas: splitLines(draft.marketingCampaignIdeas),
      contentStrategy: draft.contentStrategy,
      adCopySuggestions: splitLines(draft.adCopySuggestions),
      kpiRecommendations: splitLines(draft.kpiRecommendations),
      riskAnalysis: splitLines(draft.riskAnalysis),
    };
    onSave(parsed);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 rounded-lg border border-amber-200 bg-amber-50/50 p-3 dark:border-amber-800 dark:bg-amber-950/30">
        <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
          You are editing this strategy. Changes will overwrite the current content.
        </p>
        <div className="flex gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={onCancel}
            disabled={isSaving}
            className="gap-1.5"
          >
            <FiX className="h-3.5 w-3.5" />
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            disabled={isSaving}
            className="gap-1.5"
          >
            <FiSave className="h-3.5 w-3.5" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <div className="grid gap-5">
        <EditableSection
          label="Executive Summary"
          value={draft.executiveSummary}
          onChange={(v) => update('executiveSummary', v)}
        />
        <EditableSection
          label="30-Day Action Plan"
          value={draft.thirtyDayActionPlan}
          onChange={(v) => update('thirtyDayActionPlan', v)}
          type="list"
        />
        <EditableSection
          label="Marketing Campaign Ideas"
          value={draft.marketingCampaignIdeas}
          onChange={(v) => update('marketingCampaignIdeas', v)}
          type="list"
        />
        <EditableSection
          label="Content Strategy"
          value={draft.contentStrategy}
          onChange={(v) => update('contentStrategy', v)}
        />
        <EditableSection
          label="Ad Copy Suggestions"
          value={draft.adCopySuggestions}
          onChange={(v) => update('adCopySuggestions', v)}
          type="list"
        />
        <EditableSection
          label="KPI Recommendations"
          value={draft.kpiRecommendations}
          onChange={(v) => update('kpiRecommendations', v)}
          type="list"
        />
        <EditableSection
          label="Risk Analysis"
          value={draft.riskAnalysis}
          onChange={(v) => update('riskAnalysis', v)}
          type="list"
        />
      </div>
    </div>
  );
}
