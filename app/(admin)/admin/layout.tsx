'use client';

import { useState, ReactNode } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminNavbar } from '@/components/admin/AdminNavbar';
import { cn } from '@/utils';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b1120] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" />
        <div className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />
      </div>

      <AdminSidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className={cn('relative flex min-h-screen flex-col transition-all duration-300', collapsed ? 'lg:pl-20' : 'lg:pl-64')}>
        <AdminNavbar onToggleMobile={() => setMobileOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
        <footer className="border-t border-white/5 px-6 py-4 text-center text-xs text-white/30">
          &copy; {new Date().getFullYear()} Nexus HR AI Platform · Admin Panel. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
