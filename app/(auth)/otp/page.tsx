'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Brain, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { ROUTES } from '@/constants';
import { toast } from 'sonner';

export default function OtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast.error('Please enter the 6-digit code');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success('Email verified successfully');
    router.push(ROUTES.DASHBOARD);
    setLoading(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-glass text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-glow">
          <Brain className="h-7 w-7 text-white" />
        </div>
        <h1 className="mt-6 text-2xl font-bold">Enter verification code</h1>
        <p className="mt-2 text-sm text-slate-400">We sent a 6-digit code to your email.</p>

        <div className="mt-8 flex justify-center">
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              <InputOTPSlot index={0} className="border-white/10 bg-white/5 text-white" />
              <InputOTPSlot index={1} className="border-white/10 bg-white/5 text-white" />
              <InputOTPSlot index={2} className="border-white/10 bg-white/5 text-white" />
              <InputOTPSlot index={3} className="border-white/10 bg-white/5 text-white" />
              <InputOTPSlot index={4} className="border-white/10 bg-white/5 text-white" />
              <InputOTPSlot index={5} className="border-white/10 bg-white/5 text-white" />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button onClick={handleVerify} disabled={loading} className="mt-8 w-full bg-blue-600 hover:bg-blue-700">
          {loading ? 'Verifying...' : 'Verify'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>

        <p className="mt-6 text-sm text-slate-400">
          Didn't receive a code?{' '}
          <button onClick={() => toast.success('Code resent')} className="font-medium text-blue-400 hover:text-blue-300">
            Resend
          </button>
        </p>
      </div>
    </motion.div>
  );
}
