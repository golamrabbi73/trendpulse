'use client';

import * as React from 'react';
import {
  FiFileText,
  FiCalendar,
  FiTarget,
  FiEdit3,
  FiBookOpen,
  FiBarChart2,
  FiAlertTriangle,
  FiCopy,
  FiCheck,
  FiDownload,
} from 'react-icons/fi';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';
import { StrategyContent } from '../types/strategy.types';

interface StrategyContentDisplayProps {
  content: StrategyContent;
  onExportMarkdown?: () => void;
  onExportPdf?: () => void;
}

interface SectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  accentColor?: string;
}

function Section({ icon, title, children, accentColor = 'text-primary' }: SectionProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2.5 text-base">
          <span className={cn('shrink-0', accentColor)}>{icon}</span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function ListItems({ items, ordered = false }: { items: string[]; ordered?: boolean }) {
  if (!items || items.length === 0) {
    return <p className="text-sm text-muted-foreground italic">No items available.</p>;
  }

  const Tag = ordered ? 'ol' : 'ul';
  return (
    <Tag className={cn('space-y-2', ordered ? 'list-decimal pl-5' : 'list-none')}>
      {items.map((item, i) => (
        <li key={i} className="text-sm leading-relaxed text-foreground/90">
          {!ordered && (
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-primary/60 align-middle" />
          )}
          {item}
        </li>
      ))}
    </Tag>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className="gap-1.5"
    >
      {copied ? (
        <>
          <FiCheck className="h-3.5 w-3.5 text-emerald-500" />
          Copied!
        </>
      ) : (
        <>
          <FiCopy className="h-3.5 w-3.5" />
          Copy All
        </>
      )}
    </Button>
  );
}

function contentToMarkdown(content: StrategyContent): string {
  const lines: string[] = [];

  lines.push('# Executive Summary\n');
  lines.push(content.executiveSummary || '');
  lines.push('');

  lines.push('# 30-Day Action Plan\n');
  content.thirtyDayActionPlan?.forEach((item, i) => {
    lines.push(`${i + 1}. ${item}`);
  });
  lines.push('');

  lines.push('# Marketing Campaign Ideas\n');
  content.marketingCampaignIdeas?.forEach((item) => {
    lines.push(`- ${item}`);
  });
  lines.push('');

  lines.push('# Content Strategy\n');
  lines.push(content.contentStrategy || '');
  lines.push('');

  lines.push('# Ad Copy Suggestions\n');
  content.adCopySuggestions?.forEach((item) => {
    lines.push(`- ${item}`);
  });
  lines.push('');

  lines.push('# KPI Recommendations\n');
  content.kpiRecommendations?.forEach((item) => {
    lines.push(`- ${item}`);
  });
  lines.push('');

  lines.push('# Risk Analysis\n');
  content.riskAnalysis?.forEach((item) => {
    lines.push(`- ${item}`);
  });

  return lines.join('\n');
}

function contentToPlainText(content: StrategyContent): string {
  return contentToMarkdown(content);
}

export function StrategyContentDisplay({
  content,
  onExportMarkdown,
  onExportPdf,
}: StrategyContentDisplayProps) {
  const fullText = contentToPlainText(content);

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <CopyButton text={fullText} />
        {onExportMarkdown && (
          <Button variant="outline" size="sm" onClick={onExportMarkdown} className="gap-1.5">
            <FiDownload className="h-3.5 w-3.5" />
            Export MD
          </Button>
        )}
        {onExportPdf && (
          <Button variant="outline" size="sm" onClick={onExportPdf} className="gap-1.5">
            <FiDownload className="h-3.5 w-3.5" />
            Export PDF
          </Button>
        )}
      </div>

      {/* Sections */}
      <div className="grid gap-4">
        {/* Executive Summary */}
        <Section
          icon={<FiFileText className="h-5 w-5" />}
          title="Executive Summary"
          accentColor="text-blue-500"
        >
          <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
            {content.executiveSummary || 'No summary available.'}
          </p>
        </Section>

        {/* 30-Day Action Plan */}
        <Section
          icon={<FiCalendar className="h-5 w-5" />}
          title="30-Day Action Plan"
          accentColor="text-emerald-500"
        >
          <ListItems items={content.thirtyDayActionPlan} ordered />
        </Section>

        {/* Marketing Campaign Ideas */}
        <Section
          icon={<FiTarget className="h-5 w-5" />}
          title="Marketing Campaign Ideas"
          accentColor="text-purple-500"
        >
          <ListItems items={content.marketingCampaignIdeas} />
        </Section>

        {/* Content Strategy */}
        <Section
          icon={<FiBookOpen className="h-5 w-5" />}
          title="Content Strategy"
          accentColor="text-amber-500"
        >
          <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
            {content.contentStrategy || 'No content strategy available.'}
          </p>
        </Section>

        {/* Ad Copy Suggestions */}
        <Section
          icon={<FiEdit3 className="h-5 w-5" />}
          title="Ad Copy Suggestions"
          accentColor="text-rose-500"
        >
          <ListItems items={content.adCopySuggestions} />
        </Section>

        {/* KPI Recommendations */}
        <Section
          icon={<FiBarChart2 className="h-5 w-5" />}
          title="KPI Recommendations"
          accentColor="text-cyan-500"
        >
          <ListItems items={content.kpiRecommendations} />
        </Section>

        {/* Risk Analysis */}
        <Section
          icon={<FiAlertTriangle className="h-5 w-5" />}
          title="Risk Analysis"
          accentColor="text-orange-500"
        >
          <ListItems items={content.riskAnalysis} />
        </Section>
      </div>
    </div>
  );
}

export { contentToMarkdown };
