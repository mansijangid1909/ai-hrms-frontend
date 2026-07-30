'use client';

import { ReactNode } from 'react';
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Upload, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { adminEmployeeSchema, AdminEmployeeForm } from '@/utils/admin-validators';
import { ADMIN_DEPARTMENTS, ADMIN_DESIGNATIONS, ADMIN_EMPLOYMENT_TYPES, ADMIN_WORK_MODES, ADMIN_COUNTRIES } from '@/constants/admin';
import { AdminEmployee } from '@/types/admin';

interface EmployeeFormDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onSubmit: (data: AdminEmployeeForm) => void;
  initialData?: AdminEmployee | null;
}

export function EmployeeFormDrawer({ open, onOpenChange, title, description, onSubmit, initialData }: EmployeeFormDrawerProps) {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<AdminEmployeeForm>({
    resolver: zodResolver(adminEmployeeSchema),
    defaultValues: {
      gender: 'MALE',
      employmentType: 'FULL_TIME',
      workMode: 'ONSITE',
      country: 'United States',
      sendInvitation: false,
    },
  });

  const handleFormSubmit = (data: AdminEmployeeForm) => {
    onSubmit(data);
    reset();
    onOpenChange(false);
  };

  const handleCancel = () => {
    reset();
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto custom-scroll bg-[#0f172a] border-white/10 text-white p-6">
        <SheetHeader>
          <SheetTitle className="text-white">{title}</SheetTitle>
          <SheetDescription className="text-white/50">{description}</SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-6 space-y-4">
          {/* Profile Image Upload */}
          <div>
            <Label className="text-white/70 mb-2 block">Profile Image</Label>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.02]">
                <Upload className="h-6 w-6 text-white/30" />
              </div>
              <div>
                <button type="button" className="text-xs text-indigo-400 hover:text-indigo-300">Upload photo</button>
                <p className="text-[10px] text-white/30 mt-1">PNG, JPG up to 5MB</p>
              </div>
            </div>
          </div>

          {/* Name */}
          <div className="grid grid-cols-2 gap-3">
            <FormField label="First Name" error={errors.firstName?.message}>
              <Input {...register('firstName')} placeholder="John" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
            </FormField>
            <FormField label="Last Name" error={errors.lastName?.message}>
              <Input {...register('lastName')} placeholder="Doe" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
            </FormField>
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Email" error={errors.email?.message}>
              <Input type="email" {...register('email')} placeholder="john@acmecorp.com" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
            </FormField>
            <FormField label="Phone" error={errors.phone?.message}>
              <Input {...register('phone')} placeholder="+1 555-0100" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
            </FormField>
          </div>

          {/* Gender + DOB */}
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Gender" error={errors.gender?.message}>
              <select {...register('gender')} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50">
                <option value="MALE" className="bg-slate-900">Male</option>
                <option value="FEMALE" className="bg-slate-900">Female</option>
                <option value="OTHER" className="bg-slate-900">Other</option>
              </select>
            </FormField>
            <FormField label="Date of Birth" error={errors.dateOfBirth?.message}>
              <Input type="date" {...register('dateOfBirth')} className="bg-white/5 border-white/10 text-white" />
            </FormField>
          </div>

          {/* Department + Designation */}
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Department" error={errors.department?.message}>
              <select {...register('department')} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50">
                <option value="" className="bg-slate-900">Select department</option>
                {ADMIN_DEPARTMENTS.map((d) => <option key={d} value={d} className="bg-slate-900">{d}</option>)}
              </select>
            </FormField>
            <FormField label="Designation" error={errors.designation?.message}>
              <select {...register('designation')} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50">
                <option value="" className="bg-slate-900">Select designation</option>
                {ADMIN_DESIGNATIONS.map((d) => <option key={d} value={d} className="bg-slate-900">{d}</option>)}
              </select>
            </FormField>
          </div>

          {/* Employment Type + Join Date */}
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Employment Type" error={errors.employmentType?.message}>
              <select {...register('employmentType')} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50">
                {ADMIN_EMPLOYMENT_TYPES.map((t) => <option key={t} value={t} className="bg-slate-900">{t.replace('_', ' ')}</option>)}
              </select>
            </FormField>
            <FormField label="Joining Date" error={errors.joinDate?.message}>
              <Input type="date" {...register('joinDate')} className="bg-white/5 border-white/10 text-white" />
            </FormField>
          </div>

          {/* Reporting Manager + Work Mode */}
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Reporting Manager" error={errors.reportingManager?.message}>
              <Input {...register('reportingManager')} placeholder="Manager name" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
            </FormField>
            <FormField label="Work Mode" error={errors.workMode?.message}>
              <select {...register('workMode')} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50">
                {ADMIN_WORK_MODES.map((m) => <option key={m} value={m} className="bg-slate-900">{m}</option>)}
              </select>
            </FormField>
          </div>

          {/* Country + State */}
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Country" error={errors.country?.message}>
              <select {...register('country')} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50">
                {ADMIN_COUNTRIES.map((c) => <option key={c} value={c} className="bg-slate-900">{c}</option>)}
              </select>
            </FormField>
            <FormField label="State" error={errors.state?.message}>
              <Input {...register('state')} placeholder="State" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
            </FormField>
          </div>

          {/* City + Postal */}
          <div className="grid grid-cols-2 gap-3">
            <FormField label="City" error={errors.city?.message}>
              <Input {...register('city')} placeholder="City" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
            </FormField>
            <FormField label="Postal Code" error={errors.postalCode?.message}>
              <Input {...register('postalCode')} placeholder="12345" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
            </FormField>
          </div>

          {/* Address */}
          <FormField label="Address" error={errors.address?.message}>
            <Input {...register('address')} placeholder="Street address" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
          </FormField>

          {/* Skills + Emergency Contact */}
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Skills (comma separated)">
              <Input {...register('skills')} placeholder="React, Node.js, SQL" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
            </FormField>
            <FormField label="Emergency Contact">
              <Input {...register('emergencyContact')} placeholder="Name — Phone" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
            </FormField>
          </div>

          {/* Send Invitation */}
          <div className="flex items-center gap-2 pt-2">
            <Checkbox id="send-invitation" {...register('sendInvitation')} />
            <label htmlFor="send-invitation" className="text-sm text-white/70">Send invitation email to the employee</label>
          </div>

          <SheetFooter className="pt-4">
            <Button type="button" variant="outline" onClick={handleCancel} className="border-white/10 bg-white/5 text-white hover:bg-white/10">
              Cancel
            </Button>
            <Button type="submit" className="bg-indigo-gradient hover:opacity-90">Save</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}

function FormField({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <Label className="text-white/70 mb-1.5 block text-xs">{label}</Label>
      {children}
      {error && <p className="mt-1 text-xs text-rose-400">{error}</p>}
    </div>
  );
}
