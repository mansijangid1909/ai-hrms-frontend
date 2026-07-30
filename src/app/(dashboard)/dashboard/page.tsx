'use client';

import { motion } from 'framer-motion';
import { Users, UserPlus, DollarSign, CalendarCheck, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Bot, FileText, UserCog, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { dashboardStats, hiringTrendData, departmentDistribution, attendanceTrendData, mockNotifications, mockInterviews, mockLeaveRequests } from '@//services/mock/data';
import { formatCurrency, formatRelativeTime, getInitials } from '@//utils';
import Link from 'next/link';
import { ROUTES } from '@//constants';
import { useAuth } from '@//hooks';

const statCards = [
  { title: 'Total Employees', value: 214, change: '+12', trend: 'up', icon: Users, color: 'from-blue-500 to-blue-600' },
  { title: 'Open Positions', value: 12, change: '+3', trend: 'up', icon: UserPlus, color: 'from-cyan-500 to-cyan-600' },
  { title: 'Monthly Payroll', value: '$2.84M', change: '+4%', trend: 'up', icon: DollarSign, color: 'from-emerald-500 to-emerald-600' },
  { title: 'Attendance Rate', value: '94.2%', change: '-1.2%', trend: 'down', icon: CalendarCheck, color: 'from-orange-500 to-orange-600' },
];

const quickActions = [
  { label: 'Add Employee', icon: UserCog, href: ROUTES.EMPLOYEES, color: 'bg-blue-500' },
  { label: 'Post a Job', icon: FileText, href: ROUTES.RECRUITMENT, color: 'bg-cyan-500' },
  { label: 'Run Payroll', icon: DollarSign, href: ROUTES.PAYROLL, color: 'bg-emerald-500' },
  { label: 'Schedule Interview', icon: Calendar, href: ROUTES.RECRUITMENT, color: 'bg-orange-500' },
  { label: 'Ask AI', icon: Bot, href: ROUTES.CHATBOT, color: 'bg-violet-500' },
];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Welcome back, {user?.name?.split(' ')[0] || 'Admin'} 👋
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">Here's what's happening at your organization today.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Export</Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Quick Action</Button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-sm`}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="mt-1 flex items-center gap-1 text-xs">
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="h-3 w-3 text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-red-500" />
                  )}
                  <span className={stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}>{stat.change}</span>
                  <span className="text-muted-foreground">vs last month</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Hiring Trends</CardTitle>
            <CardDescription>Applicants, interviews, and hires over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <div className="flex h-full items-end gap-3">
                {hiringTrendData.map((d) => (
                  <div key={d.month} className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex w-full flex-col items-center gap-1" style={{ height: '85%' }}>
                      <div className="w-full rounded-t-md bg-blue-500/80" style={{ height: `${(d.applied / 250) * 100}%` }} title={`${d.applied} applied`} />
                      <div className="w-full rounded-t-md bg-cyan-400/80" style={{ height: `${(d.interviewed / 250) * 100}%` }} title={`${d.interviewed} interviewed`} />
                      <div className="w-full rounded-t-md bg-emerald-400/80" style={{ height: `${(d.hired / 250) * 100}%` }} title={`${d.hired} hired`} />
                    </div>
                    <span className="text-xs text-muted-foreground">{d.month}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-center gap-4 text-xs">
                <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-blue-500" /> Applied</div>
                <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-cyan-400" /> Interviewed</div>
                <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-emerald-400" /> Hired</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
            <CardDescription>Employees by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {departmentDistribution.map((d) => (
                <div key={d.name}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span>{d.name}</span>
                    <span className="text-muted-foreground">{d.value}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full" style={{ width: `${(d.value / 84) * 100}%`, backgroundColor: d.color }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {quickActions.map((a) => (
              <Link key={a.label} href={a.href}>
                <div className="group flex flex-col items-center gap-3 rounded-xl border border-border p-4 transition-all hover:-translate-y-1 hover:shadow-card-hover">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${a.color} text-white shadow-sm`}>
                    <a.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium">{a.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity + Interviews + Leave */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockNotifications.map((n) => (
              <div key={n.id} className="flex items-start gap-3">
                <div className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.type === 'success' ? 'bg-green-500' : n.type === 'warning' ? 'bg-yellow-500' : n.type === 'error' ? 'bg-red-500' : 'bg-blue-500'}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{n.title}</p>
                    <span className="text-xs text-muted-foreground">{formatRelativeTime(n.createdAt)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{n.message}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Interviews</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockInterviews.map((iv) => (
              <div key={iv.id} className="rounded-xl border border-border p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{iv.candidateName}</span>
                  <Badge variant="outline">{iv.type}</Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{iv.position}</p>
                <p className="mt-2 text-xs text-muted-foreground">{iv.date} at {iv.time}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Leave Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Leave Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockLeaveRequests.filter((l) => l.status === 'PENDING').map((l) => (
              <div key={l.id} className="flex items-center justify-between rounded-xl border border-border p-3">
                <div className="flex items-center gap-3">
                  <Avatar><AvatarFallback>{getInitials(l.employeeName)}</AvatarFallback></Avatar>
                  <div>
                    <p className="text-sm font-medium">{l.employeeName}</p>
                    <p className="text-xs text-muted-foreground">{l.type} • {l.days} day(s) • {l.startDate}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Reject</Button>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Approve</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
