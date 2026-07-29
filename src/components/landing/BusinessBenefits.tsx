'use client';

import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Clock, Users, Shield, Zap } from 'lucide-react';

const benefits = [
  { icon: Clock, title: '60% faster hiring', description: 'AI screening reduces time-to-hire from 45 to 18 days.', value: '60%' },
  { icon: DollarSign, title: '40% cost savings', description: 'Eliminate redundant tools and manual admin work.', value: '40%' },
  { icon: Users, title: '2x employee engagement', description: 'Continuous feedback and recognition tools.', value: '2x' },
  { icon: Shield, title: '100% compliance', description: 'Automated compliance with labor laws and regulations.', value: '100%' },
  { icon: Zap, title: '3x productivity', description: 'Automate repetitive HR workflows and approvals.', value: '3x' },
  { icon: TrendingUp, title: '85% retention prediction', description: 'Catch flight risks early with AI attrition models.', value: '85%' },
];

export function BusinessBenefits() {
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
            Business Benefits
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Measurable impact from day one
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Real outcomes that move your business forward.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-card-hover"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                <b.icon className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{b.value}</span>
                  <h3 className="font-semibold">{b.title.replace(b.value, '').trim()}</h3>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{b.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
