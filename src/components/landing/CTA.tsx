'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants';

export function CTA() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-slate-950 px-8 py-16 text-center text-white sm:px-16 sm:py-24"
        >
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="absolute -top-20 left-1/2 h-72 w-[600px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />

          <div className="relative">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm backdrop-blur">
              <Sparkles className="h-4 w-4 text-blue-400" />
              <span className="text-blue-200">Get started in minutes</span>
            </div>
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
              Transform your HR today with AI
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">
              Join 500+ companies using AI-HRMS to hire faster, manage smarter, and retain longer.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href={ROUTES.REGISTER}>
                <Button size="lg" className="group bg-blue-600 hover:bg-blue-700 shadow-glow">
                  Start free trial
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href={ROUTES.CONTACT}>
                <Button size="lg" variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
                  Talk to sales
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-slate-400">No credit card required • 14-day free trial</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
