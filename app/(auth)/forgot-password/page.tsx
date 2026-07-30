'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Brain, Mail, ArrowRight, CheckCircle } from 'lucide-react';
import { forgotPasswordSchema, ForgotPasswordInput } from '@/utils/validators';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ROUTES } from '@/constants';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSent(true);
    toast.success('Reset link sent to your email');
    setLoading(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-glass">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-glow">
            <Brain className="h-7 w-7 text-white" />
          </div>
          <h1 className="mt-6 text-2xl font-bold">Forgot password?</h1>
          <p className="mt-2 text-sm text-slate-400">Enter your email and we'll send you a reset link.</p>
        </div>

        {sent ? (
          <div className="mt-8 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <p className="mt-4 text-sm text-slate-300">Check your inbox for the reset link.</p>
            <Link href={ROUTES.LOGIN}>
              <Button variant="outline" className="mt-6 border-white/10 bg-white/5 text-white hover:bg-white/10">Back to sign in</Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-200">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input type="email" {...register('email')} placeholder="you@company.com" className="border-white/10 bg-white/5 pl-10 text-white placeholder:text-slate-500 focus:border-blue-500" />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700">
              {loading ? 'Sending...' : 'Send reset link'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-slate-400">
          Remembered your password?{' '}
          <Link href={ROUTES.LOGIN} className="font-medium text-blue-400 hover:text-blue-300">Sign in</Link>
        </p>
      </div>
    </motion.div>
  );
}
