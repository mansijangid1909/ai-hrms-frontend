'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
}

export function SectionTitle({ eyebrow, title, description, center = true }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}
    >
      {eyebrow && (
        <span className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-lg text-muted-foreground">{description}</p>}
    </motion.div>
  );
}

export function PageHeader({ title, description, children }: { title: string; description?: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute -top-20 left-1/2 h-72 w-[600px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
          {description && <p className="mt-6 text-lg text-slate-300 sm:text-xl">{description}</p>}
          {children}
        </motion.div>
      </div>
    </section>
  );
}
