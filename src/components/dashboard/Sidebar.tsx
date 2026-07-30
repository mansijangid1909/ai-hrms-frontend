'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Brain, LayoutDashboard, Users, UserPlus, DollarSign, CalendarCheck, BarChart3, GraduationCap, Bot, Settings, ChevronLeft, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@//store';
import { toggleSidebar, setMobileSidebar } from '@//store/slices/uiSlice';
import { ROUTES } from '@//constants';
import { cn } from '@//utils';

const navItems = [
  { href: ROUTES.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
  { href: ROUTES.RECRUITMENT, label: 'Recruitment', icon: UserPlus },
  { href: ROUTES.EMPLOYEES, label: 'Employees', icon: Users },
  { href: ROUTES.PAYROLL, label: 'Payroll', icon: DollarSign },
  { href: ROUTES.ATTENDANCE, label: 'Attendance', icon: CalendarCheck },
  { href: ROUTES.PERFORMANCE, label: 'Performance', icon: BarChart3 },
  { href: ROUTES.LEARNING, label: 'Learning', icon: GraduationCap },
  { href: ROUTES.ANALYTICS, label: 'Analytics', icon: BarChart3 },
  { href: ROUTES.CHATBOT, label: 'AI Chatbot', icon: Bot },
  { href: ROUTES.SETTINGS, label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { sidebarCollapsed, mobileSidebarOpen } = useSelector((s: RootState) => s.ui);

  return (
    <>
      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => dispatch(setMobileSidebar(false))}
        />
      )}

      <aside
        className={cn(
          'fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all duration-300',
          sidebarCollapsed ? 'w-20' : 'w-64',
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          <Link href={ROUTES.HOME} className="flex items-center gap-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-glow-sm">
              <Brain className="h-5 w-5 text-white" />
            </div>
            {!sidebarCollapsed && <span className="text-lg font-bold">AI<span className="text-blue-400">-HRMS</span></span>}
          </Link>
          <button
            onClick={() => dispatch(setMobileSidebar(false))}
            className="rounded-lg p-1 hover:bg-sidebar-accent lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const active = pathname === item.href || (item.href !== ROUTES.DASHBOARD && pathname.startsWith(item.href));
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                      active
                        ? 'bg-blue-600 text-white shadow-glow-sm'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-white'
                    )}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {!sidebarCollapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-sidebar-border p-3">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="hidden w-full items-center justify-center rounded-xl px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent lg:flex"
          >
            <ChevronLeft className={cn('h-5 w-5 transition-transform', sidebarCollapsed && 'rotate-180')} />
            {!sidebarCollapsed && <span className="ml-2">Collapse</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
