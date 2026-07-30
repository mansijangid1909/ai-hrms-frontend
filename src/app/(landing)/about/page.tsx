'use client';

import { PageHeader } from '@/components/common/SectionTitle';
import { motion } from 'framer-motion';
import { Target, Heart, Zap, Users } from 'lucide-react';

const values = [
  { icon: Heart, title: 'People first', description: 'We build products that make work better for everyone.' },
  { icon: Zap, title: 'Move fast', description: 'Ship quickly, iterate constantly, never settle.' },
  { icon: Target, title: 'Customer obsessed', description: 'Our customers success is our success.' },
  { icon: Users, title: 'Diverse & inclusive', description: 'Different perspectives build better products.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="We're on a mission to make HR human again"
        description="AI-HRMS was founded in 2023 with a simple belief: HR should empower people, not bury them in paperwork."
      />

      <section className="py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold tracking-tight">Our story</h2>
              <p className="mt-4 text-muted-foreground">
                We started AI-HRMS after watching too many HR teams drown in spreadsheets, email chains,
                and disconnected tools. We believed AI could change that — not by replacing humans, but
                by automating the busywork so HR professionals could focus on what matters: people.
              </p>
              <p className="mt-4 text-muted-foreground">
                Today, AI-HRMS powers 500+ companies and manages over 2 million employees worldwide.
                But we're just getting started.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid grid-cols-2 gap-6">
              {[{ v: '500+', l: 'Companies' }, { v: '2M+', l: 'Employees' }, { v: '50+', l: 'Countries' }, { v: '99.9%', l: 'Uptime' }].map((s) => (
                <div key={s.l} className="rounded-2xl border border-border bg-card p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{s.v}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="mt-24">
            <h2 className="text-center text-3xl font-bold tracking-tight">Our values</h2>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl border border-border bg-card p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                    <v.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-semibold">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{v.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
