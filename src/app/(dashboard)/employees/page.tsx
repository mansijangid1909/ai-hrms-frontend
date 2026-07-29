'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Mail, Phone, MoreVertical, Users, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { mockEmployees, mockDepartments } from '@//services/mock/data';
import { useDebounce } from '@//hooks';
import { getInitials, formatDate, formatCurrency, exportCSV } from '@//utils';

const statusColors: Record<string, string> = {
  ACTIVE: 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300',
  ON_LEAVE: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-300',
  PROBATION: 'bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300',
  TERMINATED: 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300',
};

export default function EmployeesPage() {
  const [search, setSearch] = useState('');
  const [dept, setDept] = useState('all');
  const debouncedSearch = useDebounce(search);

  const filtered = mockEmployees.filter((e) => {
    const matchesSearch = `${e.firstName} ${e.lastName} ${e.email} ${e.position}`
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());
    const matchesDept = dept === 'all' || e.department === dept;
    return matchesSearch && matchesDept;
  });

  const handleExport = () => {
    exportCSV(
      ['ID', 'Name', 'Email', 'Department', 'Position', 'Status', 'Join Date', 'Salary'],
      filtered.map((e) => [e.id, `${e.firstName} ${e.lastName}`, e.email, e.department, e.position, e.status, e.joinDate, e.salary]),
      'employees.csv'
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Employees"
        description={`${mockEmployees.length} employees across ${mockDepartments.length} departments`}
        action={
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport}><Download className="mr-2 h-4 w-4" /> Export</Button>
            <Button className="bg-blue-600 hover:bg-blue-700"><Plus className="mr-2 h-4 w-4" /> Add Employee</Button>
          </div>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: 'Total', value: mockEmployees.length, icon: Users, color: 'bg-blue-500' },
          { label: 'Active', value: mockEmployees.filter((e) => e.status === 'ACTIVE').length, icon: Users, color: 'bg-green-500' },
          { label: 'On Leave', value: mockEmployees.filter((e) => e.status === 'ON_LEAVE').length, icon: Users, color: 'bg-yellow-500' },
          { label: 'Probation', value: mockEmployees.filter((e) => e.status === 'PROBATION').length, icon: Users, color: 'bg-orange-500' },
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

      {/* Filters + Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>All Employees</CardTitle>
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 sm:w-48" />
              </div>
              <select value={dept} onChange={(e) => setDept(e.target.value)} className="rounded-xl border border-border bg-background px-3 py-2 text-sm">
                <option value="all">All Departments</option>
                {mockDepartments.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Salary</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((e) => (
                  <TableRow key={e.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={e.avatar} />
                          <AvatarFallback>{getInitials(`${e.firstName} ${e.lastName}`)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{e.firstName} {e.lastName}</div>
                          <div className="text-xs text-muted-foreground">{e.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{e.department}</TableCell>
                    <TableCell>{e.position}</TableCell>
                    <TableCell><Badge className={statusColors[e.status]} variant="secondary">{e.status.replace('_', ' ')}</Badge></TableCell>
                    <TableCell className="text-sm">{formatDate(e.joinDate)}</TableCell>
                    <TableCell className="font-medium">{formatCurrency(e.salary)}</TableCell>
                    <TableCell><Button size="sm" variant="ghost"><MoreVertical className="h-4 w-4" /></Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filtered.length === 0 && (
              <div className="py-12 text-center text-sm text-muted-foreground">No employees found.</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
