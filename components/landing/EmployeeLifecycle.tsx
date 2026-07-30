'use client';

import { motion } from 'framer-motion';
import { UserPlus, Search, FileCheck, TrendingUp, Award, LogOut } from 'lucide-react';

const stages = [
  { icon: Search, title: 'Attract', description: 'AI-powered job postings reach the right candidates.' },
  { icon: UserPlus, title: 'Recruit', description: 'Smart resume parsing and candidate matching.' },
  { icon: FileCheck, title: 'Onboard', description: 'Automated onboarding workflows in minutes.' },
  { icon: TrendingUp, title: 'Develop', description: 'Learning paths and performance tracking.' },
  { icon: Award, title: 'Retain', description: 'Engagement tools and attrition prediction.' },
  { icon: LogOut, title: 'Offboard', description: 'Smooth exits with knowledge transfer.' },
];

export function EmployeeLifecycle() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950/50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Employee Lifecycle
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            From hire to retire, all in one place
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Every stage of the employee journey, intelligently connected.
          </p>
        </motion.div>

        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent lg:block" />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6">
            {stages.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative text-center"
              >
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl border border-border bg-card shadow-card transition-all hover:shadow-glow-sm">
                  <s.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="mt-4 font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
