import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@//providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'AI-HRMS — AI-Powered Human Resource Management System',
  description:
    'Transform your HR operations with AI-powered recruitment, onboarding, payroll, performance, and analytics. The complete enterprise HR platform.',
  keywords: [
    'HRMS', 'HR Software', 'AI HR', 'Recruitment', 'Payroll', 'Attendance', 'Performance Management',
  ],
  authors: [{ name: 'AI-HRMS' }],
  openGraph: {
    title: 'AI-HRMS — AI-Powered HR Management System',
    description: 'Transform your HR operations with AI-powered recruitment, onboarding, payroll, performance, and analytics.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI-HRMS',
    description: 'AI-Powered Human Resource Management System',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
