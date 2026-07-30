'use client';

import { motion } from 'framer-motion';
import { Code2, Database, Cloud, Shield, GitBranch, Cpu } from 'lucide-react';

const techStack = [
  { icon: Code2, name: 'Next.js 15', category: 'Framework' },
  { icon: Database, name: 'PostgreSQL', category: 'Database' },
  { icon: Cloud, name: 'Edge Functions', category: 'Backend' },
  { icon: Shield, name: 'JWT + RBAC', category: 'Security' },
  { icon: GitBranch, name: 'Clean Architecture', category: 'Architecture' },
  { icon: Cpu, name: 'OpenAI / LLMs', category: 'AI Engine' },
];

export function TechnologyStack() {
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
            Technology Stack
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Built on a modern, scalable foundation
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Enterprise-grade architecture designed for performance, security, and scale.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {techStack.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center transition-all hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                <t.icon className="h-7 w-7" />
              </div>
              <div className="mt-3 font-semibold">{t.name}</div>
              <div className="mt-1 text-xs text-muted-foreground">{t.category}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
