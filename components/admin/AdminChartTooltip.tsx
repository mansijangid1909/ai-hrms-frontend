'use client';

import { formatNumber } from '@/utils';

export function AdminChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-white/10 bg-[#0f172a]/95 backdrop-blur-xl px-3 py-2 shadow-premium">
      {label && <div className="text-xs font-medium text-white mb-1">{label}</div>}
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center gap-2 text-xs">
          <div className="h-2 w-2 rounded-full" style={{ background: p.color || p.payload?.color }} />
          <span className="text-white/60 capitalize">{p.name}:</span>
          <span className="text-white font-medium">{typeof p.value === 'number' ? formatNumber(p.value) : p.value}</span>
        </div>
      ))}
    </div>
  );
}
