'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Brain, Mail, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ROUTES } from '@//constants';
import { toast } from 'sonner';

export default function VerifyEmailPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleResend = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSent(true);
    toast.success('Verification email sent');
    setLoading(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-glass text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-glow">
          <Mail className="h-7 w-7 text-white" />
        </div>
        <h1 className="mt-6 text-2xl font-bold">Verify your email</h1>
        <p className="mt-2 text-sm text-slate-400">
          We sent a verification link to your email. Click it to activate your account.
        </p>

        {sent ? (
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-green-400">
            <CheckCircle className="h-4 w-4" /> Verification email sent
          </div>
        ) : null}

        <div className="mt-6 space-y-3">
          <Button onClick={handleResend} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700">
            {loading ? 'Sending...' : 'Resend verification email'}
          </Button>
          <Link href={ROUTES.OTP}>
            <Button variant="outline" className="w-full border-white/10 bg-white/5 text-white hover:bg-white/10">
              Enter code manually
            </Button>
          </Link>
        </div>

        <p className="mt-6 text-sm text-slate-400">
          <Link href={ROUTES.LOGIN} className="font-medium text-blue-400 hover:text-blue-300">Back to sign in</Link>
        </p>
      </div>
    </motion.div>
  );
}
