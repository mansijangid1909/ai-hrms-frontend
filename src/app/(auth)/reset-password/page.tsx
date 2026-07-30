'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Brain, Lock, Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
import { resetPasswordSchema, ResetPasswordInput, getPasswordStrength } from '@//utils/validators';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ROUTES } from '@//constants';
import { toast } from 'sonner';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });
  const password = watch('password', '');
  const strength = getPasswordStrength(password);

  const onSubmit = async (data: ResetPasswordInput) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success('Password reset successfully');
    router.push(ROUTES.LOGIN);
    setLoading(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-glass">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-glow">
            <Brain className="h-7 w-7 text-white" />
          </div>
          <h1 className="mt-6 text-2xl font-bold">Reset your password</h1>
          <p className="mt-2 text-sm text-slate-400">Enter your new password below.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-200">New password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input type={showPassword ? 'text' : 'password'} {...register('password')} placeholder="••••••••" className="border-white/10 bg-white/5 pl-10 pr-10 text-white placeholder:text-slate-500 focus:border-blue-500" />
              <button type="button" onClick={() => setShowPassword((o) => !o)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>}
            {password && (
              <div className="mt-2 flex items-center gap-2">
                <div className="flex h-1 flex-1 gap-1">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className={`flex-1 rounded-full transition-all ${i < strength.score ? strength.color : 'bg-white/10'}`} />
                  ))}
                </div>
                <span className="text-xs text-slate-400">{strength.label}</span>
              </div>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-200">Confirm password</label>
            <Input type={showPassword ? 'text' : 'password'} {...register('confirmPassword')} placeholder="••••••••" className="border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:border-blue-500" />
            {errors.confirmPassword && <p className="mt-1 text-xs text-red-400">{errors.confirmPassword.message}</p>}
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700">
            {loading ? 'Resetting...' : 'Reset password'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          <Link href={ROUTES.LOGIN} className="font-medium text-blue-400 hover:text-blue-300">Back to sign in</Link>
        </p>
      </div>
    </motion.div>
  );
}
