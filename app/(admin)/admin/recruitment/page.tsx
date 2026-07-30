'use client';

import { motion } from 'framer-motion';
import { Briefcase, Users, MapPin, Calendar } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { Button } from '@/components/ui/button';
import { mockAdminJobs } from '@/services/mock/admin-data';
import { formatDate, cn } from '@/utils';

const statusBadge: Record<string, string> = {
  OPEN: 'badge-active',
  CLOSED: 'badge-danger',
  DRAFT: 'badge-info',
};

export default function RecruitmentPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Recruitment"
        description="Manage job postings and recruitment pipeline"
        action={<Button className="bg-indigo-gradient hover:opacity-90"><Briefcase className="h-4 w-4 mr-2" /> Post Job</Button>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockAdminJobs.map((job, i) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 hover:border-white/10 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-gradient shadow-glow-sm">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <span className={cn(statusBadge[job.status])}>{job.status}</span>
            </div>
            <h3 className="text-base font-semibold text-white">{job.title}</h3>
            <div className="mt-2 space-y-1 text-xs text-white/50">
              <div className="flex items-center gap-2"><Users className="h-3.5 w-3.5" /> {job.department}</div>
              <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> {job.location}</div>
              <div className="flex items-center gap-2"><Calendar className="h-3.5 w-3.5" /> {formatDate(job.postedDate)}</div>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
              <span className="text-sm text-white/60">{job.applicants} applicants</span>
              <button className="text-xs text-indigo-400 hover:text-indigo-300">View candidates</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
