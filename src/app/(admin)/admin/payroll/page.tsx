'use client';

import { motion } from 'framer-motion';
import { Wallet, Download } from 'lucide-react';
import { toast } from 'sonner';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { Button } from '@/components/ui/button';
import { mockAdminEmployees } from '@//services/mock/admin-data';
import { formatCurrency, cn } from '@//utils';

const statusBadge: Record<string, string> = {
  PAID: 'badge-active',
  PROCESSED: 'badge-info',
  PENDING: 'badge-warning',
};

export default function PayrollPage() {
  const payroll = mockAdminEmployees.slice(0, 10).map((e, i) => ({
    id: `PR-${String(i + 1).padStart(3, '0')}`,
    employeeId: e.id,
    employeeName: `${e.firstName} ${e.lastName}`,
    department: e.department,
    basicSalary: Math.round(e.salary / 12),
    allowances: Math.round(e.salary / 24),
    deductions: Math.round(e.salary / 50),
    netPay: Math.round(e.salary / 12 + e.salary / 24 - e.salary / 50),
    status: i % 3 === 0 ? 'PENDING' : i % 3 === 1 ? 'PROCESSED' : 'PAID',
  }));

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Payroll"
        description="Manage monthly payroll and salary disbursements"
        action={<Button onClick={() => toast.success('Payroll generated for all employees')} className="bg-indigo-gradient hover:opacity-90"><Wallet className="h-4 w-4 mr-2" /> Generate Payroll</Button>}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Payroll', value: formatCurrency(2840000) },
          { label: 'Paid', value: formatCurrency(2100000) },
          { label: 'Pending', value: formatCurrency(540000) },
          { label: 'Employees', value: '214' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
            <div className="text-xl font-bold text-white">{s.value}</div>
            <div className="text-xs text-white/40 mt-1">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-white/5 bg-white/[0.02]">
              <tr>
                {['ID', 'Employee', 'Department', 'Basic', 'Allowances', 'Deductions', 'Net Pay', 'Status'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/40 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {payroll.map((p, i) => (
                <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-sm text-white/60 font-mono">{p.id}</td>
                  <td className="px-4 py-3 text-sm font-medium text-white">{p.employeeName}</td>
                  <td className="px-4 py-3 text-sm text-white/60">{p.department}</td>
                  <td className="px-4 py-3 text-sm text-white/60">{formatCurrency(p.basicSalary)}</td>
                  <td className="px-4 py-3 text-sm text-white/60">{formatCurrency(p.allowances)}</td>
                  <td className="px-4 py-3 text-sm text-rose-400">{formatCurrency(p.deductions)}</td>
                  <td className="px-4 py-3 text-sm font-medium text-white">{formatCurrency(p.netPay)}</td>
                  <td className="px-4 py-3"><span className={cn(statusBadge[p.status])}>{p.status}</span></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
