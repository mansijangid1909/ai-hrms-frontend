'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Clock, Star } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { cn } from '@/utils';

const courses = [
  { id: 'C1', title: 'Leadership Essentials', category: 'Management', duration: '8 hours', level: 'BEGINNER', enrolled: 124, completed: 89, rating: 4.7 },
  { id: 'C2', title: 'Advanced React Patterns', category: 'Engineering', duration: '12 hours', level: 'ADVANCED', enrolled: 78, completed: 45, rating: 4.9 },
  { id: 'C3', title: 'Effective Communication', category: 'Soft Skills', duration: '6 hours', level: 'BEGINNER', enrolled: 215, completed: 180, rating: 4.6 },
  { id: 'C4', title: 'Data Analytics with Python', category: 'Data', duration: '15 hours', level: 'INTERMEDIATE', enrolled: 92, completed: 51, rating: 4.8 },
  { id: 'C5', title: 'Project Management Pro', category: 'Management', duration: '10 hours', level: 'INTERMEDIATE', enrolled: 156, completed: 102, rating: 4.5 },
  { id: 'C6', title: 'UX Design Fundamentals', category: 'Design', duration: '9 hours', level: 'BEGINNER', enrolled: 67, completed: 38, rating: 4.7 },
];

const levelBadge: Record<string, string> = {
  BEGINNER: 'badge-active',
  INTERMEDIATE: 'badge-info',
  ADVANCED: 'badge-warning',
};

export default function LearningPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader title="Learning" description="Manage training courses and learning paths" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -4 }} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 hover:border-white/10 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-gradient shadow-glow-sm">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <span className={cn(levelBadge[c.level])}>{c.level}</span>
            </div>
            <h3 className="text-base font-semibold text-white">{c.title}</h3>
            <p className="text-xs text-white/40 mt-1">{c.category}</p>
            <div className="mt-3 flex items-center gap-4 text-xs text-white/50">
              <div className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {c.duration}</div>
              <div className="flex items-center gap-1"><Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" /> {c.rating}</div>
            </div>
            <div className="mt-3 pt-3 border-t border-white/5">
              <div className="flex justify-between text-xs text-white/50">
                <span>Completion</span>
                <span className="text-white font-medium">{c.completed}/{c.enrolled}</span>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full rounded-full bg-indigo-gradient" style={{ width: `${(c.completed / c.enrolled) * 100}%` }} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
