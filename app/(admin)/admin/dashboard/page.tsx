'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts';
import {
  Users, UsersRound, Building2, Briefcase, CalendarDays, UserPlus,
  Wallet, Clock, TrendingUp, TrendingDown, GraduationCap, FileText, Sparkles,
  ArrowRight, ChevronRight, CheckCircle2, AlertCircle, Bell,
  Cake, Award, Zap,
} from 'lucide-react';
import { StatCard } from '@/components/admin/StatCard';
import { AdminChartTooltip } from '@/components/admin/AdminChartTooltip';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { ADMIN_ROUTES } from '@/constants/admin';
import {
  mockAdminStats, mockEmployeeGrowthData, mockMonthlyHiringData,
  mockDepartmentDistribution, mockAttendanceOverview, mockLeaveRequestChart,
  mockRecruitmentPipeline, mockAdminActivities, mockAdminAIInsights,
} from '@/services/mock/admin-data';
import { formatRelativeTime, cn } from '@/utils';

const stats = [
  { label: 'Total Employees', value: 214, icon: Users, gradient: 'bg-indigo-gradient', trend: 8.2, trendUp: true },
  { label: 'Total HR Managers', value: 8, icon: UsersRound, gradient: 'bg-blue-gradient', trend: 3.1, trendUp: true },
  { label: 'Departments', value: 12, icon: Building2, gradient: 'bg-teal-gradient', trend: 9.0, trendUp: true },
  { label: 'Open Jobs', value: 5, icon: Briefcase, gradient: 'bg-purple-gradient', trend: 2.0, trendUp: true },
  { label: 'Pending Leaves', value: 3, icon: CalendarDays, gradient: 'bg-orange-gradient', trend: 1.4, trendUp: false },
  { label: 'Monthly Hiring', value: 22, icon: UserPlus, gradient: 'bg-green-gradient', trend: 5.7, trendUp: true },
  { label: 'Attendance %', value: 94.2, suffix: '%', icon: Clock, gradient: 'bg-rose-gradient', trend: 1.4, trendUp: false },
  { label: 'Satisfaction', value: 87, suffix: '%', icon: TrendingUp, gradient: 'bg-indigo-gradient', trend: 3.5, trendUp: true },
];

const quickActions = [
  { label: 'Add HR Manager', icon: UsersRound, href: ADMIN_ROUTES.HR_MANAGERS, color: 'bg-indigo-gradient' },
  { label: 'Add Employee', icon: UserPlus, href: ADMIN_ROUTES.EMPLOYEES, color: 'bg-blue-gradient' },
  { label: 'Create Department', icon: Building2, href: ADMIN_ROUTES.DEPARTMENTS, color: 'bg-teal-gradient' },
  { label: 'Post Job', icon: Briefcase, href: ADMIN_ROUTES.RECRUITMENT, color: 'bg-purple-gradient' },
  { label: 'Generate Payroll', icon: Wallet, href: ADMIN_ROUTES.PAYROLL, color: 'bg-orange-gradient' },
  { label: 'AI Resume Parser', icon: Sparkles, href: ADMIN_ROUTES.AI_INSIGHTS, color: 'bg-rose-gradient' },
  { label: 'Generate Reports', icon: FileText, href: ADMIN_ROUTES.REPORTS, color: 'bg-green-gradient' },
];

const activityIcons: Record<string, React.ElementType> = {
  employee_joined: CheckCircle2,
  leave_approved: CheckCircle2,
  payroll_generated: Wallet,
  hr_added: UsersRound,
  department_created: Building2,
  system_log: Bell,
};

const activityColors: Record<string, string> = {
  employee_joined: 'bg-emerald-500/15 text-emerald-400',
  leave_approved: 'bg-emerald-500/15 text-emerald-400',
  payroll_generated: 'bg-amber-500/15 text-amber-400',
  hr_added: 'bg-indigo-500/15 text-indigo-400',
  department_created: 'bg-purple-500/15 text-purple-400',
  system_log: 'bg-slate-500/15 text-slate-400',
};

const aiInsightIcons: Record<string, React.ElementType> = {
  Users, TrendingDown, Wallet, CalendarDays, GraduationCap,
};

const aiInsightColors: Record<string, string> = {
  info: 'border-indigo-500/20 bg-indigo-600/5',
  success: 'border-emerald-500/20 bg-emerald-600/5',
  warning: 'border-amber-500/20 bg-amber-600/5',
  danger: 'border-rose-500/20 bg-rose-600/5',
};

const aiSeverityColors: Record<string, string> = {
  info: 'text-indigo-400 bg-indigo-500/15',
  success: 'text-emerald-400 bg-emerald-500/15',
  warning: 'text-amber-400 bg-amber-500/15',
  danger: 'text-rose-400 bg-rose-500/15',
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [greeting, setGreeting] = useState('Good morning');

  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening');
  }, []);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={`${greeting}, Admin!`}
        description="Here's what's happening at your organization today."
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <StatCard key={s.label} {...s} index={i} />
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="rounded-2xl border border-white/5 bg-white/[0.02] p-5"
      >
        <h3 className="text-sm font-semibold text-white/80 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          {quickActions.map((a) => (
            <button key={a.label} onClick={() => router.push(a.href)} className="group flex flex-col items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] p-4 hover:bg-white/5 hover:border-white/10 transition-all">
              <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl transition-transform group-hover:scale-110', a.color)}>
                <a.icon className="h-5 w-5 text-white" />
              </div>
              <span className="text-xs font-medium text-white/70 group-hover:text-white text-center">{a.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Employee Growth - Bar Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
          <h3 className="text-base font-semibold text-white mb-1">Employee Growth</h3>
          <p className="text-xs text-white/40 mb-4">Total employees and new hires over 6 months</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={mockEmployeeGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" fontSize={12} />
              <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} />
              <Tooltip content={<AdminChartTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="employees" fill="#4361ee" radius={[4,4,0,0]} />
              <Bar dataKey="newHires" fill="#7048e8" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Monthly Hiring - Line Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
          <h3 className="text-base font-semibold text-white mb-1">Monthly Hiring</h3>
          <p className="text-xs text-white/40 mb-4">Hired vs target over 6 months</p>
          <ResponsiveContainer width="100%" height={280}>
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
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Department Distribution - Pie Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
          <h3 className="text-base font-semibold text-white mb-1">Department Distribution</h3>
          <p className="text-xs text-white/40 mb-4">Headcount across departments</p>
          <ResponsiveContainer width="100%" height={280}>
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

        {/* Attendance Overview - Area Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
          <h3 className="text-base font-semibold text-white mb-1">Attendance Overview</h3>
          <p className="text-xs text-white/40 mb-4">Present, remote & absent this week</p>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={mockAttendanceOverview}>
              <defs>
                <linearGradient id="aPresent" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#4361ee" stopOpacity={0.4} /><stop offset="95%" stopColor="#4361ee" stopOpacity={0} /></linearGradient>
                <linearGradient id="aRemote" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#7048e8" stopOpacity={0.4} /><stop offset="95%" stopColor="#7048e8" stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" stroke="rgba(255,255,255,0.4)" fontSize={12} />
              <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} />
              <Tooltip content={<AdminChartTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Area type="monotone" dataKey="present" stroke="#4361ee" fill="url(#aPresent)" strokeWidth={2} />
              <Area type="monotone" dataKey="remote" stroke="#7048e8" fill="url(#aRemote)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Charts Row 3 + AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Leave Requests - Donut */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
          <h3 className="text-base font-semibold text-white mb-1">Leave Requests</h3>
          <p className="text-xs text-white/40 mb-4">Approval status breakdown</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={mockLeaveRequestChart} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3}>
                {mockLeaveRequestChart.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip content={<AdminChartTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-3">
            {mockLeaveRequestChart.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
                  <span className="text-white/60">{d.name}</span>
                </div>
                <span className="text-white/40 font-medium">{d.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recruitment Pipeline - Funnel */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="lg:col-span-2 rounded-2xl border border-white/5 bg-white/[0.02] p-5">
          <h3 className="text-base font-semibold text-white mb-1">Recruitment Pipeline</h3>
          <p className="text-xs text-white/40 mb-4">Candidate flow through hiring stages</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={mockRecruitmentPipeline} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
              <XAxis type="number" stroke="rgba(255,255,255,0.4)" fontSize={12} />
              <YAxis type="category" dataKey="stage" stroke="rgba(255,255,255,0.4)" fontSize={12} width={80} />
              <Tooltip content={<AdminChartTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
              <Bar dataKey="count" radius={[0,4,4,0]}>
                {mockRecruitmentPipeline.map((_, idx) => (
                  <Cell key={idx} fill={['#4361ee','#5046e8','#5d4be8','#7048e8','#9333ea'][idx]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Activity + AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Activity */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
          <h3 className="text-base font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {mockAdminActivities.map((a, idx) => {
              const Icon = activityIcons[a.type] || Bell;
              return (
                <div key={a.id} className="flex items-start gap-3">
                  <div className="relative flex flex-col items-center">
                    <div className={cn('flex h-9 w-9 items-center justify-center rounded-full', activityColors[a.type])}>
                      <Icon className="h-4 w-4" />
                    </div>
                    {idx < mockAdminActivities.length - 1 && <div className="w-px h-8 bg-white/10 mt-1" />}
                  </div>
                  <div className="flex-1 min-w-0 pb-2">
                    <div className="text-sm font-medium text-white">{a.title}</div>
                    <div className="text-xs text-white/50">{a.description}</div>
                    <div className="text-[10px] text-white/30 mt-1">{formatRelativeTime(a.timestamp)} · {a.user}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* AI Insights */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-gradient">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <h3 className="text-base font-semibold text-white">AI Insights</h3>
          </div>
          {mockAdminAIInsights.map((insight, i) => {
            const Icon = aiInsightIcons[insight.icon] || Sparkles;
            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + i * 0.1 }}
                className={cn('rounded-2xl border p-4', aiInsightColors[insight.severity])}
              >
                <div className="flex items-start gap-3">
                  <div className={cn('flex h-9 w-9 items-center justify-center rounded-xl', aiSeverityColors[insight.severity])}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-white">{insight.title}</div>
                      <span className="text-[10px] text-white/40 uppercase tracking-wider">{insight.category}</span>
                    </div>
                    <p className="text-xs text-white/60 mt-1">{insight.message}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
