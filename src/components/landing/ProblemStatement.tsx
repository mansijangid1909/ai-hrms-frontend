'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Clock, FileText, Users } from 'lucide-react';

const problems = [
  {
    icon: Clock,
    title: 'Slow hiring cycles',
    description: 'Manual resume screening and scheduling drag time-to-hire to 45+ days.',
    stat: '45 days',
    statLabel: 'avg. time to hire',
  },
  {
    icon: FileText,
    title: 'Paperwork overload',
    description: 'HR teams spend 60% of their time on admin instead of people.',
    stat: '60%',
    statLabel: 'time on admin',
  },
  {
    icon: Users,
    title: 'Disjointed systems',
    description: 'Payroll, attendance, and performance live in siloed tools.',
    stat: '7+',
    statLabel: 'tools to manage',
  },
  {
    icon: AlertTriangle,
    title: 'Compliance risk',
    description: 'Manual processes lead to costly compliance errors.',
    stat: '$50k+',
    statLabel: 'avg. compliance cost',
  },
];

export function ProblemStatement() {
  return (
    <section className="py-24">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            The Problem
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            HR is broken. Legacy tools make it worse.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Companies waste millions on fragmented HR systems that frustrate employees and slow growth.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400">
                <p.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
              <div className="mt-4 border-t border-border pt-4">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">{p.stat}</div>
                <div className="text-xs text-muted-foreground">{p.statLabel}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
