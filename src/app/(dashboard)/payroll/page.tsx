'use client';

import { motion } from 'framer-motion';
import { Plus, Download, DollarSign, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { mockPayroll, payrollTrendData } from '@//services/mock/data';
import { formatCurrency, formatDate } from '@//utils';

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-300',
  PROCESSED: 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300',
  PAID: 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300',
};

export default function PayrollPage() {
  const totalNet = mockPayroll.reduce((sum, p) => sum + p.netPay, 0);
  const paid = mockPayroll.filter((p) => p.status === 'PAID').reduce((s, p) => s + p.netPay, 0);
  const pending = mockPayroll.filter((p) => p.status !== 'PAID').reduce((s, p) => s + p.netPay, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Payroll"
        description="Manage payroll, payslips, and compensation."
        action={
          <div className="flex gap-2">
            <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export</Button>
            <Button className="bg-blue-600 hover:bg-blue-700"><Plus className="mr-2 h-4 w-4" /> Run Payroll</Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Payroll', value: formatCurrency(totalNet), icon: DollarSign, color: 'bg-blue-500' },
          { label: 'Paid', value: formatCurrency(paid), icon: CheckCircle, color: 'bg-green-500' },
          { label: 'Pending', value: formatCurrency(pending), icon: Clock, color: 'bg-yellow-500' },
          { label: 'Monthly Trend', value: '+4.2%', icon: TrendingUp, color: 'bg-emerald-500' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card>
              <CardContent className="flex items-center gap-3 pt-6">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.color} text-white`}>
                  <s.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xl font-bold">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payroll Trend</CardTitle>
          <CardDescription>Monthly net payroll over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-48 items-end gap-3">
            {payrollTrendData.map((d) => (
              <div key={d.month} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded-t-md bg-gradient-to-t from-blue-600 to-blue-400" style={{ height: `${(d.amount / 3000000) * 100}%` }} />
                <span className="text-xs text-muted-foreground">{d.month}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>November 2024 Payroll</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Basic</TableHead>
                  <TableHead>Allowances</TableHead>
                  <TableHead>Deductions</TableHead>
                  <TableHead>Tax</TableHead>
                  <TableHead>Net Pay</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Pay Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPayroll.map((p) => (
                  <TableRow key={p.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{p.employeeName}</TableCell>
                    <TableCell>{formatCurrency(p.basicSalary)}</TableCell>
                    <TableCell className="text-green-600">{formatCurrency(p.allowances)}</TableCell>
                    <TableCell className="text-red-600">-{formatCurrency(p.deductions)}</TableCell>
                    <TableCell className="text-red-600">-{formatCurrency(p.tax)}</TableCell>
                    <TableCell className="font-bold">{formatCurrency(p.netPay)}</TableCell>
                    <TableCell><Badge className={statusColors[p.status]} variant="secondary">{p.status}</Badge></TableCell>
                    <TableCell className="text-sm text-muted-foreground">{p.payDate ? formatDate(p.payDate) : '—'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
