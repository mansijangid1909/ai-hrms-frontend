'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants';

export default function ForbiddenPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
          <ShieldAlert className="h-10 w-10" />
        </div>
        <h1 className="mt-6 text-7xl font-bold">403</h1>
        <p className="mt-2 text-xl font-semibold">Access Denied</p>
        <p className="mt-2 max-w-md text-slate-400">You don't have permission to access this page. Contact your administrator if you believe this is an error.</p>
        <Link href={ROUTES.DASHBOARD}>
          <Button className="mt-6 bg-blue-600 hover:bg-blue-700">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
