'use client';

import { ReactNode } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { cn } from '@/utils';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { sidebarCollapsed } = useSelector((s: RootState) => s.ui);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className={cn('flex flex-col transition-all duration-300', sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64')}>
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
