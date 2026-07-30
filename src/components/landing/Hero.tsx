'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, PlayCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants';

const stats = [
  { value: '500+', label: 'Companies' },
  { value: '2M+', label: 'Employees managed' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '4.9/5', label: 'Customer rating' },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute -top-40 left-1/2 h-96 w-[800px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="absolute top-20 -right-40 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute bottom-0 -left-40 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="container-custom relative py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm backdrop-blur">
            <Sparkles className="h-4 w-4 text-blue-400" />
            <span className="text-blue-200">Introducing AI-HRMS 2.0 — now with AI Copilot</span>
          </div>

          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl">
            The AI-powered HR platform for{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
              modern teams
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-slate-300 sm:text-xl">
            Hire faster, onboard seamlessly, manage payroll, and empower your people — all in one
            intelligent platform powered by AI.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href={ROUTES.REGISTER}>
              <Button size="lg" className="group bg-blue-600 hover:bg-blue-700 shadow-glow">
                Start free trial
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href={ROUTES.DOCS}>
              <Button size="lg" variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
                <PlayCircle className="mr-2 h-4 w-4" />
                Watch demo
              </Button>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-white sm:text-4xl">{s.value}</div>
                <div className="mt-1 text-sm text-slate-400">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="relative mx-auto mt-16 max-w-5xl"
        >
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>
              <div className="ml-4 text-xs text-slate-400">app.aihrms.com/dashboard</div>
            </div>
            <div className="grid grid-cols-12 gap-0">
              <div className="col-span-3 hidden border-r border-white/10 p-4 md:block">
                <div className="space-y-2">
                  {['Dashboard', 'Recruitment', 'Employees', 'Payroll', 'Attendance', 'Analytics'].map((item, i) => (
                    <div
                      key={item}
                      className={`rounded-lg px-3 py-2 text-xs ${i === 0 ? 'bg-blue-600/20 text-blue-300' : 'text-slate-400'}`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-span-12 md:col-span-9 p-6">
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="h-2 w-16 rounded bg-white/20" />
                      <div className="mt-2 h-6 w-20 rounded bg-white/10" />
                      <div className="mt-3 h-12 rounded bg-gradient-to-br from-blue-500/20 to-cyan-500/10" />
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 h-32">
                    <div className="h-2 w-12 rounded bg-white/20" />
                    <div className="mt-3 flex h-20 items-end gap-2">
                      {[40, 65, 50, 80, 60, 90, 70].map((h, i) => (
                        <div key={i} className="flex-1 rounded-t bg-blue-500/40" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 h-32">
                    <div className="h-2 w-12 rounded bg-white/20" />
                    <div className="mt-3 flex items-center justify-center h-20">
                      <div className="h-16 w-16 rounded-full border-4 border-blue-500/40 border-t-cyan-400 animate-spin" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-blue-600/20 blur-2xl" />
        </motion.div>
      </div>
    </section>
  );
}
