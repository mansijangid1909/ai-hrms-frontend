'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Book, Code, Key, Zap, Database, Webhook } from 'lucide-react';
import { PageHeader } from '@/components/common/SectionTitle';

const docs = [
  { icon: Zap, title: 'Quickstart', description: 'Get up and running with AI-HRMS in 5 minutes.', href: '#' },
  { icon: Key, title: 'Authentication', description: 'JWT, OAuth, and API key authentication.', href: '#' },
  { icon: Database, title: 'API Reference', description: 'Complete REST API documentation.', href: '#' },
  { icon: Webhook, title: 'Webhooks', description: 'Subscribe to HR events in real time.', href: '#' },
  { icon: Code, title: 'SDKs', description: 'Official SDKs for JavaScript, Python, and Go.', href: '#' },
  { icon: Book, title: 'Guides', description: 'Step-by-step tutorials for common use cases.', href: '#' },
];

export default function DocsPage() {
  return (
    <>
      <PageHeader title="Documentation" description="Everything you need to build with AI-HRMS." />
      <section className="py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {docs.map((d, i) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={d.href} className="block h-full rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-card-hover">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                    <d.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-semibold">{d.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{d.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
