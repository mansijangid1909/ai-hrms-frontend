'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Brain, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const schema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((d) => d.newPassword === d.confirmPassword, { message: 'Passwords do not match', path: ['confirmPassword'] });

type FormInput = z.infer<typeof schema>;

export default function ChangePasswordPage() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormInput>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormInput) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success('Password changed successfully');
    setLoading(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-glass">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-glow">
            <Brain className="h-7 w-7 text-white" />
          </div>
          <h1 className="mt-6 text-2xl font-bold">Change password</h1>
          <p className="mt-2 text-sm text-slate-400">Update your password to keep your account secure.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-200">Current password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input type={show ? 'text' : 'password'} {...register('currentPassword')} placeholder="••••••••" className="border-white/10 bg-white/5 pl-10 text-white placeholder:text-slate-500 focus:border-blue-500" />
            </div>
            {errors.currentPassword && <p className="mt-1 text-xs text-red-400">{errors.currentPassword.message}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-200">New password</label>
            <Input type={show ? 'text' : 'password'} {...register('newPassword')} placeholder="••••••••" className="border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:border-blue-500" />
            {errors.newPassword && <p className="mt-1 text-xs text-red-400">{errors.newPassword.message}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-200">Confirm new password</label>
            <Input type={show ? 'text' : 'password'} {...register('confirmPassword')} placeholder="••••••••" className="border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:border-blue-500" />
            {errors.confirmPassword && <p className="mt-1 text-xs text-red-400">{errors.confirmPassword.message}</p>}
          </div>
          <button type="button" onClick={() => setShow((o) => !o)} className="text-xs text-blue-400 hover:text-blue-300">
            {show ? 'Hide' : 'Show'} passwords
          </button>
          <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700">
            {loading ? 'Updating...' : 'Update password'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </div>
    </motion.div>
  );
}
