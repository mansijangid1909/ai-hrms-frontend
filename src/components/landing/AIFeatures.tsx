'use client';

import { motion } from 'framer-motion';
import { Brain, FileSearch, MessagesSquare, GraduationCap, TrendingDown, Network, Sparkles, Bot } from 'lucide-react';

const aiFeatures = [
  {
    icon: FileSearch,
    title: 'AI Resume Parser',
    description: 'Extract skills, experience, and match scores from any resume in seconds.',
    gradient: 'from-blue-500 to-cyan-400',
  },
  {
    icon: Network,
    title: 'Candidate Matching',
    description: 'ML-powered matching ranks candidates by fit score using job requirements.',
    gradient: 'from-cyan-500 to-teal-400',
  },
  {
    icon: Bot,
    title: 'AI Interview Assistant',
    description: 'Generate interview questions and score responses automatically.',
    gradient: 'from-blue-600 to-indigo-500',
  },
  {
    icon: MessagesSquare,
    title: 'AI HR Chatbot',
    description: '24/7 assistant answers policy, leave, and benefits questions instantly.',
    gradient: 'from-teal-500 to-emerald-400',
  },
  {
    icon: GraduationCap,
    title: 'Career Coach',
    description: 'Personalized learning paths and career growth recommendations.',
    gradient: 'from-sky-500 to-blue-500',
  },
  {
    icon: TrendingDown,
    title: 'Attrition Prediction',
    description: 'Predict flight risk with 85% accuracy and take action early.',
    gradient: 'from-indigo-500 to-blue-600',
  },
  {
    icon: Sparkles,
    title: 'Talent Marketplace',
    description: 'Match internal talent to opportunities and projects automatically.',
    gradient: 'from-cyan-400 to-blue-500',
  },
  {
    icon: Brain,
    title: 'Organization Insights',
    description: 'AI-generated insights on team health, diversity, and gaps.',
    gradient: 'from-blue-500 to-indigo-500',
  },
];

export function AIFeatures() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-0 left-1/2 h-96 w-[600px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm backdrop-blur">
            <Sparkles className="h-4 w-4 text-blue-400" />
            <span className="text-blue-200">Powered by AI</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            AI that does the heavy lifting
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            From resume parsing to attrition prediction, AI-HRMS brings intelligence to every HR workflow.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {aiFeatures.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-blue-500/30 hover:bg-white/10"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${f.gradient} shadow-glow-sm`}>
                <f.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
