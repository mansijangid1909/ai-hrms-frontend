'use client';

import { motion } from 'framer-motion';
import {
  Sparkles, Users, TrendingDown, Wallet, CalendarDays, GraduationCap,
  Brain, Zap, Target, AlertTriangle, Lightbulb,
} from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { mockAdminAIInsights } from '@/services/mock/admin-data';
import { cn } from '@/utils';

const iconMap: Record<string, React.ElementType> = {
  Users, TrendingDown, Wallet, CalendarDays, GraduationCap,
};

const severityStyles: Record<string, string> = {
  info: 'border-indigo-500/20 bg-indigo-600/5',
  success: 'border-emerald-500/20 bg-emerald-600/5',
  warning: 'border-amber-500/20 bg-amber-600/5',
  danger: 'border-rose-500/20 bg-rose-600/5',
};

const severityIconBg: Record<string, string> = {
  info: 'text-indigo-400 bg-indigo-500/15',
  success: 'text-emerald-400 bg-emerald-500/15',
  warning: 'text-amber-400 bg-amber-500/15',
  danger: 'text-rose-400 bg-rose-500/15',
};

const aiTools = [
  { icon: Brain, title: 'Resume Parser', desc: 'AI-powered resume analysis', color: 'bg-indigo-gradient' },
  { icon: Target, title: 'Candidate Matching', desc: 'Match candidates to roles', color: 'bg-purple-gradient' },
  { icon: TrendingDown, title: 'Attrition Prediction', desc: 'Predict employee churn risk', color: 'bg-rose-gradient' },
  { icon: Lightbulb, title: 'Career Coach', desc: 'AI career path recommendations', color: 'bg-orange-gradient' },
  { icon: Zap, title: 'Policy Chatbot', desc: 'Instant HR policy answers', color: 'bg-teal-gradient' },
  { icon: Sparkles, title: 'Employee Insights', desc: 'Sentiment & engagement analysis', color: 'bg-green-gradient' },
];

export default function AIInsightsPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader title="AI Insights" description="AI-powered analytics and recommendations" />

      {/* AI Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {aiTools.map((tool, i) => (
          <motion.div
            key={tool.title}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className="group rounded-2xl border border-white/5 bg-white/[0.02] p-5 hover:border-white/10 transition-all cursor-pointer"
          >
            <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl shadow-glow-sm mb-4', tool.color)}>
              <tool.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-base font-semibold text-white">{tool.title}</h3>
            <p className="text-xs text-white/40 mt-1">{tool.desc}</p>
            <div className="mt-3 text-xs text-indigo-400 group-hover:text-indigo-300 flex items-center gap-1">
              Launch <Sparkles className="h-3 w-3" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI Insight Cards */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-gradient">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <h3 className="text-base font-semibold text-white">Active Insights</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {mockAdminAIInsights.map((insight, i) => {
            const Icon = iconMap[insight.icon] || Sparkles;
            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                className={cn('rounded-2xl border p-5', severityStyles[insight.severity])}
              >
                <div className="flex items-start gap-3">
                  <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl shrink-0', severityIconBg[insight.severity])}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-white">{insight.title}</div>
                      <span className="text-[10px] text-white/40 uppercase tracking-wider">{insight.category}</span>
                    </div>
                    <p className="text-sm text-white/60 mt-1">{insight.message}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
