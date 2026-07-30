'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { mockAdminLeaveRequests } from '@/services/mock/admin-data';
import { cn } from '@/utils';

const statusBadge: Record<string, string> = {
  PENDING: 'badge-warning',
  APPROVED: 'badge-active',
  REJECTED: 'badge-danger',
};

export default function LeavePage() {
  const handleApprove = (id: string) => toast.success('Leave request approved');
  const handleReject = (id: string) => toast.success('Leave request rejected');

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Leave Management" description="Review and manage employee leave requests" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Pending', value: mockAdminLeaveRequests.filter(l => l.status === 'PENDING').length, color: 'text-amber-400' },
          { label: 'Approved', value: mockAdminLeaveRequests.filter(l => l.status === 'APPROVED').length, color: 'text-emerald-400' },
          { label: 'Rejected', value: mockAdminLeaveRequests.filter(l => l.status === 'REJECTED').length, color: 'text-rose-400' },
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
                {['Employee', 'Type', 'Start', 'End', 'Days', 'Reason', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/40 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockAdminLeaveRequests.map((l, i) => (
                <motion.tr key={l.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-white">{l.employeeName}</td>
                  <td className="px-4 py-3 text-sm text-white/60">{l.type}</td>
                  <td className="px-4 py-3 text-sm text-white/60">{l.startDate}</td>
                  <td className="px-4 py-3 text-sm text-white/60">{l.endDate}</td>
                  <td className="px-4 py-3 text-sm text-white/60">{l.days}</td>
                  <td className="px-4 py-3 text-sm text-white/60 max-w-[200px] truncate">{l.reason}</td>
                  <td className="px-4 py-3"><span className={cn(statusBadge[l.status])}>{l.status}</span></td>
                  <td className="px-4 py-3">
                    {l.status === 'PENDING' && (
                      <div className="flex gap-1">
                        <button onClick={() => handleApprove(l.id)} className="p-1.5 rounded-lg hover:bg-emerald-500/10 text-emerald-400"><CheckCircle2 className="h-4 w-4" /></button>
                        <button onClick={() => handleReject(l.id)} className="p-1.5 rounded-lg hover:bg-rose-500/10 text-rose-400"><XCircle className="h-4 w-4" /></button>
                      </div>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
