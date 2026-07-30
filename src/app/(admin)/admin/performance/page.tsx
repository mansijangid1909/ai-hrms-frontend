'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Star } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { mockAdminEmployees } from '@//services/mock/admin-data';
import { cn } from '@//utils';

const statusBadge: Record<string, string> = {
  COMPLETED: 'badge-active',
  IN_PROGRESS: 'badge-info',
  DRAFT: 'badge-warning',
};

export default function PerformancePage() {
  const reviews = mockAdminEmployees.slice(0, 8).map((e, i) => ({
    id: `REV-${String(i + 1).padStart(3, '0')}`,
    employeeName: `${e.firstName} ${e.lastName}`,
    department: e.department,
    rating: 3.5 + (i % 3) * 0.5,
    goals: 5 + (i % 3),
    completedGoals: 3 + (i % 3),
    status: i % 3 === 0 ? 'DRAFT' : i % 3 === 1 ? 'IN_PROGRESS' : 'COMPLETED',
  }));

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Performance" description="Track employee performance reviews and goals" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((r, i) => (
          <motion.div key={r.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -4 }} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 hover:border-white/10 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-gradient shadow-glow-sm">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <span className={cn(statusBadge[r.status])}>{r.status.replace('_', ' ')}</span>
            </div>
            <h3 className="text-sm font-semibold text-white">{r.employeeName}</h3>
            <p className="text-xs text-white/40">{r.department}</p>
            <div className="mt-3 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star key={idx} className={cn('h-4 w-4', idx < Math.floor(r.rating) ? 'text-amber-400 fill-amber-400' : 'text-white/15')} />
              ))}
              <span className="text-xs text-white/50 ml-1">{r.rating.toFixed(1)}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-white/5">
              <div className="flex justify-between text-xs text-white/50">
                <span>Goals Completed</span>
                <span className="text-white font-medium">{r.completedGoals}/{r.goals}</span>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full rounded-full bg-indigo-gradient" style={{ width: `${(r.completedGoals / r.goals) * 100}%` }} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
