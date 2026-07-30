'use client';

import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts';
import { BarChart3 } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminChartTooltip } from '@/components/admin/AdminChartTooltip';
import {
  mockEmployeeGrowthData, mockMonthlyHiringData, mockDepartmentDistribution,
  mockAttendanceOverview, mockLeaveRequestChart,
} from '@/services/mock/admin-data';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader title="Analytics" description="Deep-dive insights into your organization's metrics" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
          <h3 className="text-base font-semibold text-white mb-1">Employee Growth</h3>
          <p className="text-xs text-white/40 mb-4">6-month trend</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={mockEmployeeGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" fontSize={12} />
              <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} />
              <Tooltip content={<AdminChartTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="employees" fill="#4361ee" radius={[4,4,0,0]} />
              <Bar dataKey="newHires" fill="#7048e8" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
          <h3 className="text-base font-semibold text-white mb-1">Hiring vs Target</h3>
          <p className="text-xs text-white/40 mb-4">Monthly comparison</p>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={mockMonthlyHiringData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" fontSize={12} />
              <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} />
              <Tooltip content={<AdminChartTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="hired" stroke="#4361ee" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="target" stroke="#7048e8" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
          <h3 className="text-base font-semibold text-white mb-1">Department Distribution</h3>
          <p className="text-xs text-white/40 mb-4">Headcount breakdown</p>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={mockDepartmentDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                {mockDepartmentDistribution.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip content={<AdminChartTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
          <h3 className="text-base font-semibold text-white mb-1">Attendance Overview</h3>
          <p className="text-xs text-white/40 mb-4">Weekly trends</p>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={mockAttendanceOverview}>
              <defs>
                <linearGradient id="aPresent2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#4361ee" stopOpacity={0.4} /><stop offset="95%" stopColor="#4361ee" stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" stroke="rgba(255,255,255,0.4)" fontSize={12} />
              <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} />
              <Tooltip content={<AdminChartTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Area type="monotone" dataKey="present" stroke="#4361ee" fill="url(#aPresent2)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
