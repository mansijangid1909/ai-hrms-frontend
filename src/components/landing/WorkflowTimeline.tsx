'use client';

import { motion } from 'framer-motion';

const steps = [
  { phase: 'Phase 01', title: 'Discover & Attract', description: 'Post jobs, source candidates, and build talent pools with AI-powered sourcing.', items: ['AI job description generator', 'Multi-channel posting', 'Talent pool CRM'] },
  { phase: 'Phase 02', title: 'Screen & Match', description: 'Parse resumes and rank candidates by AI match score in seconds.', items: ['Resume parsing', 'Skill extraction', 'Match scoring'] },
  { phase: 'Phase 03', title: 'Interview & Offer', description: 'Schedule interviews, generate questions, and manage offers.', items: ['Auto-scheduling', 'AI interview assistant', 'Offer management'] },
  { phase: 'Phase 04', title: 'Onboard & Engage', description: 'Automate onboarding and keep employees engaged from day one.', items: ['Onboarding workflows', 'Task automation', 'Welcome kits'] },
  { phase: 'Phase 05', title: 'Develop & Retain', description: 'Track performance, learning, and predict attrition with AI.', items: ['Performance reviews', 'Learning paths', 'Attrition prediction'] },
];

export function WorkflowTimeline() {
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
            Workflow
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            The complete HR workflow, automated
          </h2>
        </motion.div>

        <div className="relative mt-16">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-blue-500 via-blue-500/50 to-transparent sm:left-1/2" />
          <div className="space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.phase}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`relative flex ${i % 2 === 0 ? 'sm:justify-end' : ''}`}
              >
                <div className={`w-full sm:w-5/12 ${i % 2 === 0 ? 'sm:text-right sm:pr-12' : 'sm:pl-12'}`}>
                  <div className="rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-card-hover">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      {step.phase}
                    </span>
                    <h3 className="mt-2 text-xl font-bold">{step.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                    <ul className={`mt-4 space-y-1.5 ${i % 2 === 0 ? 'sm:text-right' : ''}`}>
                      {step.items.map((item) => (
                        <li key={item} className="text-sm text-muted-foreground">
                          <span className="text-blue-500">•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="absolute left-4 top-6 -translate-x-1/2 sm:left-1/2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-500 bg-background text-xs font-bold text-blue-600 dark:text-blue-400">
                    {i + 1}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
