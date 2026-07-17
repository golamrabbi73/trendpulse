'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { DashboardStats } from '../types/dashboard.types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { Skeleton } from '@/components/ui/Skeleton';

interface DashboardChartsProps {
  stats?: DashboardStats;
  isLoading: boolean;
}

const COLORS = ['#2563eb', '#16a34a', '#ea580c', '#e11d48', '#8b5cf6', '#06b6d4'];

export function DashboardCharts({ stats, isLoading }: DashboardChartsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-5 w-1/3" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[300px] w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Format data for trends
  const auditTrendsData = stats?.auditTrends?.map(item => ({
    date: item._id,
    count: item.count
  })) || [];

  const strategyTrendsData = stats?.strategyTrends?.map(item => ({
    date: item._id,
    count: item.count
  })) || [];

  // Format data for distributions
  const industryData = stats?.industryDistribution?.map(item => ({
    name: item._id || 'Unknown',
    value: item.count
  })) || [];

  const riskData = stats?.riskLevelDistribution?.map(item => ({
    name: item._id || 'Unknown',
    value: item.count
  })) || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {/* Audit Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Trends (Last 7 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            {auditTrendsData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={auditTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                No audit data available
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Strategy Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Strategy Generation Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            {strategyTrendsData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={strategyTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Line type="monotone" dataKey="count" stroke="#16a34a" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                No strategy data available
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Industry Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Competitors by Industry</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            {industryData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={industryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {industryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                No industry data available
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Risk Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Risk Levels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            {riskData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                  >
                    {riskData.map((entry, index) => {
                      // Custom colors based on risk level if possible
                      const name = entry.name.toLowerCase();
                      let color = COLORS[index % COLORS.length];
                      if (name.includes('high')) color = '#e11d48'; // red
                      else if (name.includes('medium') || name.includes('moderate')) color = '#ea580c'; // orange
                      else if (name.includes('low')) color = '#16a34a'; // green
                      
                      return <Cell key={`cell-${index}`} fill={color} />;
                    })}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                No risk data available
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
