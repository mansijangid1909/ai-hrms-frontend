import { ReactNode } from 'react';
import Link from 'next/link';
import { Brain, Sparkles } from 'lucide-react';
import { ThemeToggle } from '@/components/common/ThemeToggle';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute -top-40 left-1/2 h-96 w-[800px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="absolute top-40 -right-40 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute bottom-0 -left-40 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

      <header className="relative z-10 flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold">AI<span className="text-blue-500">-HRMS</span></span>
        </Link>
        <ThemeToggle />
      </header>

      <main className="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-8">
        {children}
      </main>
    </div>
  );
}
