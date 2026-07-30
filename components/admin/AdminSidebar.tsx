'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, UsersRound, Users, Building2, Briefcase, Clock,
  CalendarDays, Wallet, TrendingUp, GraduationCap, FileText, BarChart3,
  Sparkles, Settings, LogOut, ChevronLeft, X, Zap,
} from 'lucide-react';
import { ADMIN_NAV_ITEMS, ADMIN_ROUTES } from '@/constants/admin';
import { cn } from '@/utils';

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard, UsersRound, Users, Building2, Briefcase, Clock,
  CalendarDays, Wallet, TrendingUp, GraduationCap, FileText, BarChart3,
  Sparkles, Settings,
};

interface AdminSidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export function AdminSidebar({ collapsed, onToggleCollapse, mobileOpen, onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  const SidebarContent = (
    <>
      <div className={cn('flex h-16 items-center border-b border-white/5 px-4', collapsed && 'justify-center px-2')}>
        <Link href={ADMIN_ROUTES.DASHBOARD} className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-gradient shadow-glow-sm"
          >
            <Zap className="h-5 w-5 text-white" fill="white" />
          </motion.div>
          {!collapsed && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col">
              <span className="text-base font-bold text-white tracking-tight">Nexus HR</span>
              <span className="text-[10px] text-white/40 font-medium tracking-wider uppercase">Admin Panel</span>
            </motion.div>
          )}
        </Link>
        {mobileOpen && (
          <button onClick={onCloseMobile} className="ml-auto lg:hidden p-2 rounded-lg hover:bg-white/5 text-white/60">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 custom-scroll">
        <div className="space-y-1">
          {ADMIN_NAV_ITEMS.map((item) => {
            const Icon = iconMap[item.icon] || LayoutDashboard;
            const active = isActive(item.href);
            return (
              <Link key={item.href} href={item.href} onClick={mobileOpen ? onCloseMobile : undefined}>
                <motion.div
                  whileHover={{ x: collapsed ? 0 : 2 }}
                  className={cn(
                    'relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                    collapsed && 'justify-center',
                    active
                      ? 'bg-indigo-gradient text-white shadow-glow-sm'
                      : 'text-white/60 hover:text-white hover:bg-white/5',
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  {active && !collapsed && (
                    <motion.div layoutId="admin-sidebar-active" className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-indigo-gradient" />
                  )}
                  <Icon className="h-5 w-5 shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </motion.div>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-white/5 p-3">
        <Link
          href="/"
          className={cn(
            'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/50 hover:bg-rose-500/10 hover:text-rose-400 transition-colors',
            collapsed && 'justify-center',
          )}
          title="Logout"
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span>Logout</span>}
        </Link>
        <button
          onClick={onToggleCollapse}
          className={cn(
            'mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/50 hover:bg-white/5 hover:text-white/80 transition-colors',
            collapsed && 'justify-center',
          )}
        >
          <ChevronLeft className={cn('h-5 w-5 transition-transform', collapsed && 'rotate-180')} />
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </>
  );

  return (
    <>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onCloseMobile}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        animate={{ width: collapsed ? 80 : 260 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="fixed left-0 top-0 z-50 hidden h-screen lg:flex flex-col bg-sidebar-gradient border-r border-white/5"
      >
        {SidebarContent}
      </motion.aside>

      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed left-0 top-0 z-50 h-screen w-[260px] flex flex-col bg-sidebar-gradient border-r border-white/5 lg:hidden"
          >
            {SidebarContent}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
