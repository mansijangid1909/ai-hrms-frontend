'use client';

import { motion } from 'framer-motion';
import { Users, TrendingUp, DollarSign, CalendarCheck, Brain, Sparkles, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { dashboardStats, hiringTrendData, departmentDistribution, attendanceTrendData, payrollTrendData } from '@/services/mock/data';
import { formatCurrency } from '@/utils';

const aiInsights = [
  { title: 'Attrition Risk Alert', description: '3 employees in Engineering show high flight-risk signals. Schedule check-ins.', type: 'warning', icon: Brain },
  { title: 'Hiring Bottleneck', description: 'Screening stage takes 2x longer than industry average. Consider AI screening.', type: 'info', icon: Sparkles },
  { title: 'Payroll Anomaly', description: 'Overtime costs up 18% in Sales. Review shift scheduling.', type: 'warning', icon: DollarSign },
  { title: 'Engagement Opportunity', description: 'Design team engagement scores 22% above company average. Share best practices.', type: 'success', icon: TrendingUp },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Analytics & Insights" description="AI-powered insights into your organization." />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: 'Total Employees', value: dashboardStats.totalEmployees, change: '+12%', trend: 'up', icon: Users, color: 'bg-blue-500' },
          { label: 'Attendance Rate', value: `${dashboardStats.attendanceRate}%`, change: '-1.2%', trend: 'down', icon: CalendarCheck, color: 'bg-cyan-500' },
          { label: 'Monthly Payroll', value: formatCurrency(dashboardStats.monthlyPayroll), change: '+4.2%', trend: 'up', icon: DollarSign, color: 'bg-emerald-500' },
          { label: 'Attrition Rate', value: `${dashboardStats.attritionRate}%`, change: '-0.5%', trend: 'up', icon: TrendingUp, color: 'bg-orange-500' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${s.color} text-white`}>
                  <s.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="mt-1 flex items-center gap-1 text-xs">
                  {s.trend === 'up' ? <ArrowUpRight className="h-3 w-3 text-green-500" /> : <ArrowDownRight className="h-3 w-3 text-red-500" />}
                  <span className={s.trend === 'up' ? 'text-green-500' : 'text-red-500'}>{s.change}</span>
                  <span className="text-muted-foreground">vs last month</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Hiring Funnel</CardTitle><CardDescription>Last 6 months</CardDescription></CardHeader>
          <CardContent>
            <div className="flex h-56 items-end gap-3">
              {hiringTrendData.map((d) => (
                <div key={d.month} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex w-full flex-col items-center gap-1" style={{ height: '85%' }}>
                    <div className="w-full rounded-t-md bg-blue-500/80" style={{ height: `${(d.applied / 250) * 100}%` }} />
                    <div className="w-full bg-cyan-400/80" style={{ height: `${(d.interviewed / 250) * 100}%` }} />
                    <div className="w-full bg-emerald-400/80" style={{ height: `${(d.hired / 250) * 100}%` }} />
                  </div>
                  <span className="text-xs text-muted-foreground">{d.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Department Headcount</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {departmentDistribution.map((d) => (
              <div key={d.name}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>{d.name}</span><span className="text-muted-foreground">{d.value}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full" style={{ width: `${(d.value / 84) * 100}%`, backgroundColor: d.color }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Attendance Trend</CardTitle></CardHeader>
          <CardContent>
            <div className="flex h-48 items-end gap-4">
              {attendanceTrendData.map((d) => (
                <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex w-full flex-col gap-1" style={{ height: '85%' }}>
                    <div className="w-full rounded-t-md bg-green-500/80" style={{ height: `${(d.present / 220) * 100}%` }} />
                    <div className="w-full bg-yellow-500/80" style={{ height: `${(d.absent / 220) * 100}%` }} />
                    <div className="w-full bg-blue-500/80" style={{ height: `${(d.remote / 220) * 100}%` }} />
                  </div>
                  <span className="text-xs text-muted-foreground">{d.day}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Payroll Spend</CardTitle></CardHeader>
          <CardContent>
            <div className="flex h-48 items-end gap-3">
              {payrollTrendData.map((d) => (
                <div key={d.month} className="flex flex-1 flex-col items-center gap-2">
                  <div className="w-full rounded-t-md bg-gradient-to-t from-blue-600 to-blue-400" style={{ height: `${(d.amount / 3000000) * 100}%` }} />
                  <span className="text-xs text-muted-foreground">{d.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-500" />
            <CardTitle>AI Insights</CardTitle>
          </div>
          <CardDescription>Generated by AI from your organization data</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {aiInsights.map((insight, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-xl border border-border p-4">
              <div className="flex items-start gap-3">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${insight.type === 'warning' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-950/40 dark:text-yellow-400' : insight.type === 'success' ? 'bg-green-100 text-green-600 dark:bg-green-950/40 dark:text-green-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400'}`}>
                  <insight.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{insight.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{insight.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
