'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants';
import { cn } from '@/utils';

const plans = [
  {
    name: 'Starter',
    description: 'For small teams getting started with HR automation.',
    monthlyPrice: 0,
    annualPrice: 0,
    features: ['Up to 25 employees', 'Employee directory', 'Basic attendance', 'Email support', 'Community access'],
    cta: 'Start free',
    highlight: false,
  },
  {
    name: 'Growth',
    description: 'For growing companies that need the full HR suite.',
    monthlyPrice: 8,
    annualPrice: 6,
    features: ['Up to 250 employees', 'All Core features', 'AI resume parser', 'Payroll automation', 'Performance reviews', 'Priority support', 'Analytics dashboard'],
    cta: 'Start free trial',
    highlight: true,
  },
  {
    name: 'Enterprise',
    description: 'For large organizations with advanced needs.',
    monthlyPrice: null,
    annualPrice: null,
    features: ['Unlimited employees', 'All AI features', 'Custom workflows', 'SSO & SAML', 'Dedicated CSM', '99.9% uptime SLA', 'Custom integrations', 'On-premise option'],
    cta: 'Contact sales',
    highlight: false,
  },
];

export function Pricing() {
  const [annual, setAnnual] = useState(true);

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
            Pricing
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start free. Upgrade when you grow. Cancel anytime.
          </p>

          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-border bg-card p-1">
            <button
              onClick={() => setAnnual(false)}
              className={cn('rounded-full px-4 py-1.5 text-sm font-medium transition-all', !annual ? 'bg-blue-600 text-white' : 'text-muted-foreground')}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={cn('rounded-full px-4 py-1.5 text-sm font-medium transition-all', annual ? 'bg-blue-600 text-white' : 'text-muted-foreground')}
            >
              Annual <span className="text-xs opacity-80">-25%</span>
            </button>
          </div>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                'relative rounded-2xl border bg-card p-8 transition-all',
                plan.highlight
                  ? 'border-blue-500 shadow-glow scale-105'
                  : 'border-border hover:shadow-card-hover'
              )}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                    <Sparkles className="h-3 w-3" /> Most Popular
                  </div>
                </div>
              )}
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              <div className="mt-6">
                {plan.monthlyPrice === null ? (
                  <div className="text-4xl font-bold">Custom</div>
                ) : plan.monthlyPrice === 0 ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="text-sm text-muted-foreground">/forever</span>
                  </div>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">${annual ? plan.annualPrice : plan.monthlyPrice}</span>
                    <span className="text-sm text-muted-foreground">/user/mo</span>
                  </div>
                )}
              </div>
              <Link href={plan.monthlyPrice === null ? ROUTES.CONTACT : ROUTES.REGISTER}>
                <Button className="mt-6 w-full" variant={plan.highlight ? 'default' : 'outline'}>
                  {plan.cta}
                </Button>
              </Link>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
