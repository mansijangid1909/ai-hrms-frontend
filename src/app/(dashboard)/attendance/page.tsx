'use client';

import { motion } from 'framer-motion';
import { Plus, CalendarCheck, Clock, Check, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { mockAttendance, mockLeaveRequests, attendanceTrendData } from '@//services/mock/data';
import { getInitials, formatDate } from '@//utils';

const statusColors: Record<string, string> = {
  PRESENT: 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300',
  ABSENT: 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300',
  LATE: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-300',
  REMOTE: 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300',
  HALF_DAY: 'bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300',
};

const leaveColors: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-300',
  APPROVED: 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300',
  REJECTED: 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300',
};

export default function AttendancePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Attendance & Leave"
        description="Track attendance, manage leave requests, and monitor time-off."
        action={<Button className="bg-blue-600 hover:bg-blue-700"><Plus className="mr-2 h-4 w-4" /> Request Leave</Button>}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: 'Present Today', value: 194, icon: Check, color: 'bg-green-500' },
          { label: 'Absent', value: 12, icon: X, color: 'bg-red-500' },
          { label: 'Late', value: 8, icon: Clock, color: 'bg-yellow-500' },
          { label: 'Remote', value: 10, icon: CalendarCheck, color: 'bg-blue-500' },
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
          <CardTitle>Weekly Attendance</CardTitle>
          <CardDescription>Present, absent, and remote over the last week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-48 items-end gap-4">
            {attendanceTrendData.map((d) => (
              <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex w-full flex-col gap-1" style={{ height: '85%' }}>
                  <div className="w-full rounded-t-md bg-green-500/80" style={{ height: `${(d.present / 220) * 100}%` }} />
                  <div className="w-full bg-yellow-500/80" style={{ height: `${(d.absent / 220) * 100}%` }} />
                  <div className="w-full bg-blue-500/80" style={{ height: `${(d.remote / 220) * 100}%` }} />
                </div>
                <span className="text-xs text-muted-foreground">{d.day}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Today's Attendance</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Check In</TableHead>
                  <TableHead>Check Out</TableHead>
                  <TableHead>Hours</TableHead>
                  <TableHead>Overtime</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAttendance.map((a) => (
                  <TableRow key={a.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8"><AvatarFallback>{getInitials(a.employeeName)}</AvatarFallback></Avatar>
                        <span className="font-medium">{a.employeeName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{formatDate(a.date)}</TableCell>
                    <TableCell>{a.checkIn || '—'}</TableCell>
                    <TableCell>{a.checkOut || '—'}</TableCell>
                    <TableCell>{a.hoursWorked}h</TableCell>
                    <TableCell>{a.overtime > 0 ? `${a.overtime}h` : '—'}</TableCell>
                    <TableCell><Badge className={statusColors[a.status]} variant="secondary">{a.status.replace('_', ' ')}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Leave Requests</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {mockLeaveRequests.map((l) => (
            <div key={l.id} className="flex flex-col gap-3 rounded-xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <Avatar><AvatarFallback>{getInitials(l.employeeName)}</AvatarFallback></Avatar>
                <div>
                  <p className="font-medium">{l.employeeName}</p>
                  <p className="text-sm text-muted-foreground">{l.type} • {l.days} day(s) • {formatDate(l.startDate)} → {formatDate(l.endDate)}</p>
                  <p className="text-xs text-muted-foreground">{l.reason}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={leaveColors[l.status]} variant="secondary">{l.status}</Badge>
                {l.status === 'PENDING' && (
                  <>
                    <Button size="sm" variant="outline"><X className="h-4 w-4" /></Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700"><Check className="h-4 w-4" /></Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
