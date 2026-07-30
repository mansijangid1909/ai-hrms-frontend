'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Bell, Menu, Sun, Moon, ChevronDown, Settings, LogOut,
  UserCircle,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { mockAdminNotifications } from '@/services/mock/admin-data';
import { getInitials, formatRelativeTime, cn } from '@/utils';

interface AdminNavbarProps {
  onToggleMobile: () => void;
}

export function AdminNavbar({ onToggleMobile }: AdminNavbarProps) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const unreadCount = mockAdminNotifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-white/5 bg-[#0b1120]/80 backdrop-blur-xl px-4 lg:px-6">
      <button onClick={onToggleMobile} className="lg:hidden p-2 rounded-lg hover:bg-white/5 text-white/70">
        <Menu className="h-5 w-5" />
      </button>

      <div className="relative flex-1 max-w-md hidden sm:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && searchValue.trim()) router.push(`/admin/employees?q=${encodeURIComponent(searchValue)}`); }}
          placeholder="Search employees..."
          className="w-full rounded-xl border border-white/5 bg-white/[0.03] py-2 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all"
        />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
          className="p-2 rounded-xl border border-white/5 bg-white/[0.03] text-white/70 hover:bg-white/5 hover:text-white transition-colors"
        >
          {mounted && theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </button>

        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            aria-label="Notifications"
            className="relative p-2 rounded-xl border border-white/5 bg-white/[0.03] text-white/70 hover:bg-white/5 hover:text-white transition-colors"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>
          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-80 rounded-2xl border border-white/10 bg-[#0f172a]/95 backdrop-blur-xl shadow-premium overflow-hidden z-50"
              >
                <div className="p-3 border-b border-white/5 flex items-center justify-between">
                  <span className="font-semibold text-white">Notifications</span>
                  <button className="text-xs text-indigo-400 hover:text-indigo-300">Mark all read</button>
                </div>
                <div className="max-h-80 overflow-y-auto custom-scroll">
                  {mockAdminNotifications.map((n) => (
                    <div key={n.id} className={cn('flex items-start gap-3 p-3 hover:bg-white/5 cursor-pointer border-b border-white/5', !n.read && 'bg-indigo-500/5')}>
                      <div className={cn('mt-1.5 h-2 w-2 shrink-0 rounded-full', n.read ? 'bg-white/20' : 'bg-indigo-500')} />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-white">{n.title}</div>
                        <div className="text-xs text-white/50">{n.message}</div>
                        <div className="text-[10px] text-white/30 mt-1">{formatRelativeTime(n.createdAt)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.03] py-1.5 pl-1.5 pr-3 hover:bg-white/5 transition-colors"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-gradient text-xs font-bold text-white">
              AD
            </div>
            <div className="hidden md:block text-left">
              <div className="text-xs font-medium text-white leading-tight">Admin User</div>
              <div className="text-[10px] text-white/40">Super Admin</div>
            </div>
            <ChevronDown className={cn('h-4 w-4 text-white/40 transition-transform', profileOpen && 'rotate-180')} />
          </button>
          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-white/10 bg-[#0f172a]/95 backdrop-blur-xl shadow-premium overflow-hidden z-50"
              >
                <div className="p-3 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-gradient text-sm font-bold text-white">AD</div>
                    <div>
                      <div className="text-sm font-semibold text-white">Admin User</div>
                      <div className="text-xs text-white/40">admin@acmecorp.com</div>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <button className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white transition-colors">
                    <UserCircle className="h-4 w-4" /> My Profile
                  </button>
                  <button onClick={() => router.push('/admin/settings')} className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white transition-colors">
                    <Settings className="h-4 w-4" /> Settings
                  </button>
                  <div className="my-1 h-px bg-white/5" />
                  <Link href="/" className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm text-rose-400 hover:bg-rose-500/10 transition-colors">
                    <LogOut className="h-4 w-4" /> Sign out
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
