'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: 'AI-HRMS reduced our time-to-hire by 60%. The AI resume parser alone saves my team 20 hours a week.',
    name: 'Sarah Chen',
    role: 'VP of People, Acme Corp',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
  },
  {
    quote: 'We replaced 7 different HR tools with AI-HRMS. Payroll, attendance, performance — all in one place.',
    name: 'Marcus Johnson',
    role: 'Head of HR, Globex',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
  },
  {
    quote: 'The attrition prediction feature caught 3 flight risks early. We saved $200K in turnover costs.',
    name: 'Priya Nair',
    role: 'CHRO, Initech',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
  },
  {
    quote: 'Onboarding that used to take 2 weeks now takes 2 hours. Our new hires are productive from day one.',
    name: 'David Kim',
    role: 'Talent Director, Hooli',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
  },
  {
    quote: 'The AI chatbot handles 80% of HR queries automatically. My team finally focuses on strategy.',
    name: 'Emily Rodriguez',
    role: 'People Ops Lead, Vandelay',
    avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
  },
  {
    quote: 'Best HR platform we have used. The analytics and insights are genuinely game-changing.',
    name: 'James Wilson',
    role: 'CEO, Pied Piper',
    avatar: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
  },
];

export function Testimonials() {
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
            Testimonials
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Loved by HR teams worldwide
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Don't just take our word for it. Here's what our customers say.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-card-hover"
            >
              <Quote className="h-8 w-8 text-blue-500/30" />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground">{t.quote}</p>
              <div className="mt-4 flex items-center gap-1">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
