'use client';

import { motion } from 'framer-motion';
import { Clock, Wallet, Users, Briefcase, TrendingUp, FileSpreadsheet, Sheet, FileText, Download } from 'lucide-react';
import { toast } from 'sonner';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { Button } from '@/components/ui/button';
import { ADMIN_REPORT_TYPES, ADMIN_EXPORT_FORMATS } from '@/constants/admin';
import { cn } from '@/utils';

const iconMap: Record<string, React.ElementType> = {
  Clock, Wallet, Users, Briefcase, TrendingUp,
};
const exportIconMap: Record<string, React.ElementType> = {
  FileSpreadsheet, Sheet, FileText,
};

export default function ReportsPage() {
  const handleGenerate = (report: typeof ADMIN_REPORT_TYPES[number]) => {
    toast.success(`${report.label} generated successfully`);
  };

  const handleExport = (format: typeof ADMIN_EXPORT_FORMATS[number]) => {
    toast.success(`Exported as ${format.label}`);
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Reports" description="Generate and export organizational reports" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ADMIN_REPORT_TYPES.map((report, i) => {
          const Icon = iconMap[report.icon] || FileText;
          return (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 hover:border-white/10 transition-all"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-gradient shadow-glow-sm mb-4">
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-base font-semibold text-white">{report.label}</h3>
              <p className="text-xs text-white/40 mt-1">{report.description}</p>
              <Button onClick={() => handleGenerate(report)} className="w-full mt-4 bg-indigo-gradient hover:opacity-90" size="sm">
                <Download className="h-3.5 w-3.5 mr-2" /> Generate
              </Button>
            </motion.div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
        <h3 className="text-base font-semibold text-white mb-4">Export Options</h3>
        <div className="flex flex-wrap gap-3">
          {ADMIN_EXPORT_FORMATS.map((fmt) => {
            const Icon = exportIconMap[fmt.icon] || FileText;
            return (
              <button
                key={fmt.id}
                onClick={() => handleExport(fmt)}
                className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-white transition-colors"
              >
                <Icon className="h-4 w-4" /> Export as {fmt.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
