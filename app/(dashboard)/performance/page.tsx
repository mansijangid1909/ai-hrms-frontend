'use client';

import { motion } from 'framer-motion';
import { Plus, Star, Target, TrendingUp, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { mockPerformanceReviews } from '@/services/mock/data';
import { getInitials } from '@/utils';

const reviewColors: Record<string, string> = {
  DRAFT: 'bg-slate-100 text-slate-700 dark:bg-slate-900/40 dark:text-slate-300',
  IN_PROGRESS: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-300',
  COMPLETED: 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300',
};

export default function PerformancePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Performance"
        description="Track goals, OKRs, and performance reviews."
        action={<Button className="bg-blue-600 hover:bg-blue-700"><Plus className="mr-2 h-4 w-4" /> New Review</Button>}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: 'Avg Rating', value: '4.4/5', icon: Star, color: 'bg-yellow-500' },
          { label: 'Goals Set', value: 23, icon: Target, color: 'bg-blue-500' },
          { label: 'Completed', value: 15, icon: TrendingUp, color: 'bg-green-500' },
          { label: 'Top Performers', value: 8, icon: Award, color: 'bg-orange-500' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card>
              <CardContent className="flex items-center gap-3 pt-6">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.color} text-white`}>
                  <s.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Reviews</CardTitle>
          <CardDescription>H2 2024 review cycle</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockPerformanceReviews.map((r) => (
            <div key={r.id} className="rounded-xl border border-border p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <Avatar><AvatarFallback>{getInitials(r.employeeName)}</AvatarFallback></Avatar>
                  <div>
                    <p className="font-medium">{r.employeeName}</p>
                    <p className="text-xs text-muted-foreground">Reviewer: {r.reviewer} • {r.period}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={reviewColors[r.status]} variant="secondary">{r.status.replace('_', ' ')}</Badge>
                  {r.rating > 0 && (
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{r.rating}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-3">
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Goals: {r.completedGoals}/{r.goals}</span>
                  <span className="text-muted-foreground">{Math.round((r.completedGoals / r.goals) * 100)}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-blue-500" style={{ width: `${(r.completedGoals / r.goals) * 100}%` }} /></div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
