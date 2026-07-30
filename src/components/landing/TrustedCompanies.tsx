'use client';

import { motion } from 'framer-motion';

const companies = [
  'Acme Corp', 'Globex', 'Initech', 'Umbrella', 'Hooli', 'Pied Piper', 'Vandelay', 'Stark Industries',
];

export function TrustedCompanies() {
  return (
    <section className="border-y border-border bg-slate-50 dark:bg-slate-950/50 py-12">
      <div className="container-custom">
        <p className="text-center text-sm font-medium text-muted-foreground">
          Trusted by 500+ companies worldwide
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {companies.map((c, i) => (
            <motion.span
              key={c}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="text-xl font-bold text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
            >
              {c}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
