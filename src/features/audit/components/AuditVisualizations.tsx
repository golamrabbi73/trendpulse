'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { AuditInsights } from '../types/audit.types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';

interface AuditVisualizationsProps {
  insights: AuditInsights;
}

export function AuditVisualizations({ insights }: AuditVisualizationsProps) {
  const { swotAnalysis } = insights;

  const data = [
    {
      name: 'Strengths',
      count: swotAnalysis.strengths.length,
      color: 'hsl(var(--primary))',
    },
    {
      name: 'Weaknesses',
      count: swotAnalysis.weaknesses.length,
      color: 'hsl(var(--destructive))',
    },
    {
      name: 'Opportunities',
      count: swotAnalysis.opportunities.length,
      color: '#10b981', // Emerald
    },
    {
      name: 'Threats',
      count: swotAnalysis.threats.length,
      color: '#f59e0b', // Amber
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>SWOT Distribution</CardTitle>
        <CardDescription>
          Overview of identified items across Strengths, Weaknesses, Opportunities, and Threats.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                allowDecimals={false}
              />
              <Tooltip
                cursor={{ fill: 'hsl(var(--muted)/0.5)' }}
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '0.5rem',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={50}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
