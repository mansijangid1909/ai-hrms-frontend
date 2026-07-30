'use client';

import { motion } from 'framer-motion';
import { Users, Calendar, DollarSign, BarChart3, GraduationCap, MessageSquare, Target, Settings } from 'lucide-react';

const features = [
  { icon: Users, title: 'Employee Directory', description: 'Centralized employee database with profiles, org charts, and documents.' },
  { icon: Calendar, title: 'Attendance & Leave', description: 'Track time-off, automate approvals, and manage shifts effortlessly.' },
  { icon: DollarSign, title: 'Payroll Management', description: 'Run payroll in clicks with tax compliance and payslip automation.' },
  { icon: BarChart3, title: 'Performance', description: 'Goals, OKRs, 360-degree reviews, and continuous feedback.' },
  { icon: GraduationCap, title: 'Learning & Development', description: 'Course catalogs, certifications, and skill tracking.' },
  { icon: MessageSquare, title: 'Engagement', description: 'Surveys, recognition, and pulse checks to keep teams connected.' },
  { icon: Target, title: 'Goal Tracking', description: 'Align individual goals with company objectives in real time.' },
  { icon: Settings, title: 'Custom Workflows', description: 'Build custom approval flows for any HR process.' },
];

export function CoreFeatures() {
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
            Core Features
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything HR needs, nothing it doesn't
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A complete suite of HR tools designed for modern, distributed teams.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-500/5 transition-transform group-hover:scale-150" />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
