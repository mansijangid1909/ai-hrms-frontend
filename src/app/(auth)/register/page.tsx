'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Brain, Mail, Lock, User, Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
import { registerSchema, RegisterInput, getPasswordStrength } from '@//utils/validators';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@//hooks';
import { ROUTES } from '@//constants';
import { toast } from 'sonner';

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });
  const password = watch('password', '');
  const strength = getPasswordStrength(password);

  const onSubmit = async (data: RegisterInput) => {
    setLoading(true);
    try {
      await registerUser({ firstName: data.firstName, lastName: data.lastName, email: data.email, password: data.password });
      toast.success('Account created! Welcome to AI-HRMS.');
      router.push(ROUTES.DASHBOARD);
    } catch {
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-glass">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-glow">
            <Brain className="h-7 w-7 text-white" />
          </div>
          <h1 className="mt-6 text-2xl font-bold">Create your account</h1>
          <p className="mt-2 text-sm text-slate-400">Start your 14-day free trial. No credit card required.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-200">First name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input {...register('firstName')} placeholder="Jane" className="border-white/10 bg-white/5 pl-10 text-white placeholder:text-slate-500 focus:border-blue-500" />
              </div>
              {errors.firstName && <p className="mt-1 text-xs text-red-400">{errors.firstName.message}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-200">Last name</label>
              <Input {...register('lastName')} placeholder="Doe" className="border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:border-blue-500" />
              {errors.lastName && <p className="mt-1 text-xs text-red-400">{errors.lastName.message}</p>}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-200">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input type="email" {...register('email')} placeholder="you@company.com" className="border-white/10 bg-white/5 pl-10 text-white placeholder:text-slate-500 focus:border-blue-500" />
            </div>
            {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-200">Password</label>
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

          <div className="flex items-start gap-2">
            <Checkbox id="terms" {...register('acceptTerms')} />
            <label htmlFor="terms" className="text-sm text-slate-300">
              I agree to the <Link href="#" className="text-blue-400 hover:text-blue-300">Terms</Link> and <Link href="#" className="text-blue-400 hover:text-blue-300">Privacy Policy</Link>
            </label>
          </div>
          {errors.acceptTerms && <p className="text-xs text-red-400">{errors.acceptTerms.message}</p>}

          <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 shadow-glow">
            {loading ? 'Creating account...' : 'Create account'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link href={ROUTES.LOGIN} className="font-medium text-blue-400 hover:text-blue-300">Sign in</Link>
        </p>
      </div>
    </motion.div>
  );
}
