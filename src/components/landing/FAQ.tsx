'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'How does the AI resume parser work?', a: 'Our AI parser uses NLP to extract skills, experience, education, and contact info from any resume format (PDF, DOCX, images). It then scores candidates against job requirements using a proprietary matching algorithm.' },
  { q: 'Is my data secure?', a: 'Yes. We use bank-grade AES-256 encryption, SOC 2 Type II compliance, and GDPR compliance. All data is stored in encrypted databases with role-based access control.' },
  { q: 'Can I integrate with existing tools?', a: 'AI-HRMS integrates with Slack, Google Workspace, Microsoft 365, QuickBooks, and 50+ other tools via our REST API and webhooks.' },
  { q: 'How long does onboarding take?', a: 'Most teams are up and running in under 24 hours. Our AI-assisted import tool migrates your existing employee data automatically.' },
  { q: 'Do you offer a free trial?', a: 'Yes! The Starter plan is free forever for up to 25 employees. The Growth plan offers a 14-day free trial with no credit card required.' },
  { q: 'What makes AI-HRMS different?', a: 'Unlike legacy HRIS tools, AI-HRMS has AI built into every workflow — from resume screening to attrition prediction — not bolted on as an afterthought.' },
  { q: 'Can I customize the platform?', a: 'Yes. Build custom workflows, approval chains, fields, and reports. Enterprise plans include custom integrations and white-labeling.' },
  { q: 'What support do you offer?', a: 'Free plan gets community support. Growth plan includes priority email and chat support. Enterprise gets a dedicated Customer Success Manager and 24/7 phone support.' },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

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
            FAQ
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
        </motion.div>

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="overflow-hidden rounded-xl border border-border bg-card"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <span className="font-medium">{faq.q}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-muted-foreground">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
