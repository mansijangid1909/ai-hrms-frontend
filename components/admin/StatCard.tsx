'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/utils';

interface StatCardProps {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  icon: React.ElementType;
  gradient: string;
  trend: number;
  trendUp: boolean;
  index?: number;
}

export function StatCard({ label, value, suffix, prefix, icon: Icon, gradient, trend, trendUp, index = 0 }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const step = (ts: number, startTs: number) => {
      const progress = Math.min((ts - startTs) / duration, 1);
      setDisplayValue(Math.floor(progress * value * 10) / 10);
      if (progress < 1) requestAnimationFrame((t) => step(t, startTs));
      else setDisplayValue(value);
    };
    requestAnimationFrame((t) => step(t, t));
  }, [value]);

  const formatted = prefix === '$' && suffix === 'M'
    ? `$${displayValue.toFixed(2)}M`
    : `${prefix || ''}${suffix === '%' ? displayValue.toFixed(1) : Math.floor(displayValue)}${suffix || ''}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-5 hover:border-white/10 transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={cn('flex h-11 w-11 items-center justify-center rounded-xl shadow-glow-sm', gradient)}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div className={cn(
          'flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium',
          trendUp ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400',
        )}>
          {trendUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {Math.abs(trend)}%
        </div>
      </div>
      <div className="text-2xl font-bold text-white">{formatted}</div>
      <div className="text-xs text-white/40 mt-1">{label}</div>
    </motion.div>
  );
}
