'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants';

export default function SessionExpiredPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-yellow-500/10 text-yellow-500">
          <Clock className="h-10 w-10" />
        </div>
        <h1 className="mt-6 text-3xl font-bold">Session Expired</h1>
        <p className="mt-2 max-w-md text-slate-400">Your session has expired for security reasons. Please sign in again to continue.</p>
        <Link href={ROUTES.LOGIN}>
          <Button className="mt-6 bg-blue-600 hover:bg-blue-700">
            <ArrowLeft className="mr-2 h-4 w-4" /> Sign in again
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
