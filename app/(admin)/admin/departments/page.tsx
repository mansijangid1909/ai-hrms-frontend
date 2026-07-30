'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Plus, Users, Briefcase, Wallet, Pencil, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockAdminDepartments } from '@/services/mock/admin-data';
import { AdminDepartment } from '@/types/admin';
import { formatCurrency, cn } from '@/utils';

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<AdminDepartment[]>(mockAdminDepartments);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AdminDepartment | null>(null);
  const [form, setForm] = useState({ name: '', head: '', description: '', budget: '0' });

  const openCreate = () => {
    setEditing(null);
    setForm({ name: '', head: '', description: '', budget: '0' });
    setModalOpen(true);
  };

  const openEdit = (dept: AdminDepartment) => {
    setEditing(dept);
    setForm({ name: dept.name, head: dept.head, description: dept.description || '', budget: String(dept.budget) });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.head) {
      toast.error('Name and head are required');
      return;
    }
    if (editing) {
      setDepartments(departments.map(d => d.id === editing.id ? { ...d, ...form, budget: Number(form.budget) } : d));
      toast.success(`${form.name} updated`);
    } else {
      const newDept: AdminDepartment = {
        id: `DEPT-${String(departments.length + 1).padStart(3, '0')}`,
        name: form.name,
        head: form.head,
        employeeCount: 0,
        openPositions: 0,
        budget: Number(form.budget),
        status: 'ACTIVE',
        description: form.description,
      };
      setDepartments([newDept, ...departments]);
      toast.success(`${form.name} department created`);
    }
    setModalOpen(false);
  };

  const handleDelete = (dept: AdminDepartment) => {
    setDepartments(departments.filter(d => d.id !== dept.id));
    toast.success(`${dept.name} department deleted`);
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Departments"
        description="Manage your organization's departments"
        action={
          <Button onClick={openCreate} className="bg-indigo-gradient hover:opacity-90">
            <Plus className="h-4 w-4 mr-2" /> Create Department
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {departments.map((dept, i) => (
          <motion.div
            key={dept.id}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className="group rounded-2xl border border-white/5 bg-white/[0.02] p-5 hover:border-white/10 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-gradient shadow-glow-sm">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(dept)} className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white"><Pencil className="h-4 w-4" /></button>
                <button onClick={() => handleDelete(dept)} className="p-1.5 rounded-lg hover:bg-rose-500/10 text-white/40 hover:text-rose-400"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
            <h3 className="text-lg font-bold text-white">{dept.name}</h3>
            <p className="text-xs text-white/40 mt-1">Head: {dept.head}</p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-white/50"><Users className="h-4 w-4" /> Employees</div>
                <span className="text-white font-medium">{dept.employeeCount}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-white/50"><Briefcase className="h-4 w-4" /> Open Positions</div>
                <span className="text-white font-medium">{dept.openPositions}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-white/50"><Wallet className="h-4 w-4" /> Budget</div>
                <span className="text-white font-medium">{formatCurrency(dept.budget)}</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5">
              <span className={cn('text-xs', dept.status === 'ACTIVE' ? 'text-emerald-400' : 'text-rose-400')}>{dept.status}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModalOpen(false)} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-[#0f172a] p-6 shadow-premium"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white">{editing ? 'Edit Department' : 'Create Department'}</h2>
                <button onClick={() => setModalOpen(false)} className="p-1.5 rounded-lg hover:bg-white/5 text-white/40"><X className="h-5 w-5" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="text-white/70 mb-1.5 block text-xs">Department Name</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Engineering" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
                </div>
                <div>
                  <Label className="text-white/70 mb-1.5 block text-xs">Department Head</Label>
                  <Input value={form.head} onChange={(e) => setForm({ ...form, head: e.target.value })} placeholder="John Doe" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
                </div>
                <div>
                  <Label className="text-white/70 mb-1.5 block text-xs">Budget (USD)</Label>
                  <Input type="number" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} placeholder="1000000" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
                </div>
                <div>
                  <Label className="text-white/70 mb-1.5 block text-xs">Description</Label>
                  <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Department description" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline" onClick={() => setModalOpen(false)} className="border-white/10 bg-white/5 text-white hover:bg-white/10">Cancel</Button>
                  <Button onClick={handleSave} className="bg-indigo-gradient hover:opacity-90">{editing ? 'Update' : 'Create'}</Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
