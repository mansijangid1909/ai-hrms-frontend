'use client';

import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { mockAdminAttendance } from '@/services/mock/admin-data';
import { cn } from '@/utils';

const statusBadge: Record<string, string> = {
  PRESENT: 'badge-active',
  ABSENT: 'badge-danger',
  LATE: 'badge-warning',
  REMOTE: 'badge-info',
  HALF_DAY: 'badge-warning',
};

export default function AttendancePage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader title="Attendance" description="Track daily attendance and check-in records" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Present Today', value: 192, color: 'text-emerald-400' },
          { label: 'Absent', value: 12, color: 'text-rose-400' },
          { label: 'Late Arrivals', value: 8, color: 'text-amber-400' },
          { label: 'Remote', value: 10, color: 'text-indigo-400' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
            <div className="text-2xl font-bold text-white">{s.value}</div>
            <div className={cn('text-xs mt-1', s.color)}>{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-white/5 bg-white/[0.02]">
              <tr>
                {['Employee ID', 'Name', 'Date', 'Check In', 'Check Out', 'Status', 'Hours'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/40 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockAdminAttendance.map((a, i) => (
                <motion.tr key={a.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-sm text-white/60 font-mono">{a.employeeId}</td>
                  <td className="px-4 py-3 text-sm font-medium text-white">{a.employeeName}</td>
                  <td className="px-4 py-3 text-sm text-white/60">{a.date}</td>
                  <td className="px-4 py-3 text-sm text-white/60">{a.checkIn || '—'}</td>
                  <td className="px-4 py-3 text-sm text-white/60">{a.checkOut || '—'}</td>
                  <td className="px-4 py-3"><span className={cn(statusBadge[a.status])}>{a.status}</span></td>
                  <td className="px-4 py-3 text-sm text-white/60">{a.hoursWorked}h</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
