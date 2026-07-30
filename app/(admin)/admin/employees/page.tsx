'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Search, Download, Upload, Eye, Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { EmployeeFormDrawer } from '@/components/admin/EmployeeFormDrawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockAdminEmployees } from '@/services/mock/admin-data';
import { AdminEmployee, AdminEmployeeForm } from '@/types/admin';
import { ADMIN_DEPARTMENTS, ADMIN_STATUSES, ADMIN_WORK_MODES } from '@/constants/admin';
import { getInitials, formatDate, exportCSV, cn } from '@/utils';

const statusBadge: Record<string, string> = {
  ACTIVE: 'badge-active',
  ON_LEAVE: 'badge-warning',
  PROBATION: 'badge-info',
  TERMINATED: 'badge-danger',
};

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<AdminEmployee[]>(mockAdminEmployees);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [workModeFilter, setWorkModeFilter] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filtered = useMemo(() => {
    return employees.filter((e) => {
      const matchesSearch = !search ||
        `${e.firstName} ${e.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
        e.email.toLowerCase().includes(search.toLowerCase()) ||
        e.id.toLowerCase().includes(search.toLowerCase());
      const matchesDept = !deptFilter || e.department === deptFilter;
      const matchesStatus = !statusFilter || e.status === statusFilter;
      const matchesWorkMode = !workModeFilter || e.workMode === workModeFilter;
      return matchesSearch && matchesDept && matchesStatus && matchesWorkMode;
    });
  }, [employees, search, deptFilter, statusFilter, workModeFilter]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleAdd = (data: AdminEmployeeForm) => {
    const newEmp: AdminEmployee = {
      id: `EMP-${String(employees.length + 1).padStart(4, '0')}`,
      ...data,
      salary: 60000,
      avatar: `https://i.pravatar.cc/150?img=${employees.length + 1}`,
      skills: data.skills?.split(',').map(s => s.trim()) || [],
    };
    setEmployees([newEmp, ...employees]);
    toast.success(`${newEmp.firstName} ${newEmp.lastName} added successfully`);
    if (data.sendInvitation) toast.info(`Invitation sent to ${newEmp.email}`);
  };

  const handleExport = () => {
    exportCSV(
      ['ID', 'Name', 'Email', 'Department', 'Designation', 'Status', 'Join Date'],
      filtered.map((e) => [e.id, `${e.firstName} ${e.lastName}`, e.email, e.department, e.designation, e.status, e.joinDate]),
      'employees.csv'
    );
    toast.success('Employees exported to CSV');
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Employees"
        description="Manage all employees across your organization"
        action={
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleExport} className="border-white/10 bg-white/5 text-white hover:bg-white/10">
              <Download className="h-4 w-4 mr-2" /> Export
            </Button>
            <Button variant="outline" onClick={() => toast.info('Import feature coming soon')} className="border-white/10 bg-white/5 text-white hover:bg-white/10">
              <Upload className="h-4 w-4 mr-2" /> Import
            </Button>
            <Button onClick={() => setDrawerOpen(true)} className="bg-indigo-gradient hover:opacity-90">
              <UserPlus className="h-4 w-4 mr-2" /> Add Employee
            </Button>
          </div>
        }
      />

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
          <Input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by name, email, or ID..."
            className="bg-white/[0.03] border-white/5 text-white placeholder:text-white/30 pl-10"
          />
        </div>
        <select value={deptFilter} onChange={(e) => { setDeptFilter(e.target.value); setPage(1); }} className="rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50">
          <option value="" className="bg-slate-900">All Departments</option>
          {ADMIN_DEPARTMENTS.map((d) => <option key={d} value={d} className="bg-slate-900">{d}</option>)}
        </select>
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }} className="rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50">
          <option value="" className="bg-slate-900">All Status</option>
          {ADMIN_STATUSES.map((s) => <option key={s} value={s} className="bg-slate-900">{s.replace('_', ' ')}</option>)}
        </select>
        <select value={workModeFilter} onChange={(e) => { setWorkModeFilter(e.target.value); setPage(1); }} className="rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50">
          <option value="" className="bg-slate-900">All Work Modes</option>
          {ADMIN_WORK_MODES.map((m) => <option key={m} value={m} className="bg-slate-900">{m}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-white/5 bg-white/[0.02]">
              <tr>
                {['Photo', 'Employee ID', 'Name', 'Department', 'Designation', 'Email', 'Phone', 'Join Date', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/40 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {paginated.map((e, i) => (
                <motion.tr
                  key={e.id}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-gradient text-xs font-bold text-white overflow-hidden">
                      {e.avatar ? <img src={e.avatar} alt="" className="h-full w-full object-cover" /> : getInitials(`${e.firstName} ${e.lastName}`)}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-white/60 font-mono">{e.id}</td>
                  <td className="px-4 py-3 text-sm font-medium text-white whitespace-nowrap">{e.firstName} {e.lastName}</td>
                  <td className="px-4 py-3 text-sm text-white/60 whitespace-nowrap">{e.department}</td>
                  <td className="px-4 py-3 text-sm text-white/60 whitespace-nowrap">{e.designation}</td>
                  <td className="px-4 py-3 text-sm text-white/60 whitespace-nowrap">{e.email}</td>
                  <td className="px-4 py-3 text-sm text-white/60 whitespace-nowrap">{e.phone}</td>
                  <td className="px-4 py-3 text-sm text-white/60 whitespace-nowrap">{formatDate(e.joinDate)}</td>
                  <td className="px-4 py-3"><span className={cn(statusBadge[e.status])}>{e.status.replace('_', ' ')}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white"><Eye className="h-4 w-4" /></button>
                      <button className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white"><Pencil className="h-4 w-4" /></button>
                      <button onClick={() => { setEmployees(employees.filter(x => x.id !== e.id)); toast.success('Employee removed'); }} className="p-1.5 rounded-lg hover:bg-rose-500/10 text-white/40 hover:text-rose-400"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-white/40 text-sm">No employees found matching your filters.</p>
          </div>
        )}

        {filtered.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/5">
            <span className="text-xs text-white/40">Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filtered.length)} of {filtered.length}</span>
            <div className="flex items-center gap-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-1.5 rounded-lg border border-white/5 bg-white/[0.02] text-white/60 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed"><ChevronLeft className="h-4 w-4" /></button>
              <span className="text-xs text-white/60 px-2">{page} / {totalPages}</span>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-1.5 rounded-lg border border-white/5 bg-white/[0.02] text-white/60 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
        )}
      </div>

      <EmployeeFormDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        title="Add Employee"
        description="Create a new employee record and send an invitation."
        onSubmit={handleAdd}
      />
    </div>
  );
}
