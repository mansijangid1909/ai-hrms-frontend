'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Brain, Mail, Lock, Eye, EyeOff, ArrowRight, Github, Chrome } from 'lucide-react';
import { loginSchema, LoginInput, getPasswordStrength } from '@/utils/validators';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/hooks';
import { ROUTES, ROLE_DASHBOARD } from '@/constants';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: 'admin@aihrms.com', password: 'password123', remember: true },
  });
  const password = watch('password', '');

  const onSubmit = async (data: LoginInput) => {
    setLoading(true);
    try {
      await login(data.email, data.password);
      toast.success('Welcome back!');
      router.push('/admin/dashboard');
    } catch {
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const strength = getPasswordStrength(password);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md"
    >
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-glass">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-glow">
            <Brain className="h-7 w-7 text-white" />
          </div>
          <h1 className="mt-6 text-2xl font-bold">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-400">Sign in to your AI-HRMS account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-200">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                type="email"
                {...register('email')}
                placeholder="you@company.com"
                className="border-white/10 bg-white/5 pl-10 text-white placeholder:text-slate-500 focus:border-blue-500"
              />
            </div>
            {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="block text-sm font-medium text-slate-200">Password</label>
              <Link href={ROUTES.FORGOT_PASSWORD} className="text-xs text-blue-400 hover:text-blue-300">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                placeholder="••••••••"
                className="border-white/10 bg-white/5 pl-10 pr-10 text-white placeholder:text-slate-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword((o) => !o)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>}
            {password && (
              <div className="mt-2 flex items-center gap-2">
                <div className="flex h-1 flex-1 gap-1">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-full transition-all ${i < strength.score ? strength.color : 'bg-white/10'}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-slate-400">{strength.label}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Checkbox id="remember" {...register('remember')} />
            <label htmlFor="remember" className="text-sm text-slate-300">Remember me for 30 days</label>
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 shadow-glow">
            {loading ? 'Signing in...' : 'Sign in'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-slate-950 px-2 text-slate-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button type="button" variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10">
              <Chrome className="mr-2 h-4 w-4" /> Google
            </Button>
            <Button type="button" variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10">
              <Github className="mr-2 h-4 w-4" /> GitHub
            </Button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Don't have an account?{' '}
          <Link href={ROUTES.REGISTER} className="font-medium text-blue-400 hover:text-blue-300">
            Sign up free
          </Link>
        </p>

        <div className="mt-6 rounded-xl border border-white/10 bg-blue-500/5 p-3 text-xs text-slate-400">
          <p className="font-medium text-blue-300">Demo accounts:</p>
          <p>admin@aihrms.com • hr@aihrms.com • recruit@aihrms.com</p>
          <p>manager@aihrms.com • employee@aihrms.com • candidate@aihrms.com</p>
          <p className="mt-1">Password: any (mock auth)</p>
        </div>
      </div>
    </motion.div>
  );
}
