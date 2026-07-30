import { ROUTES } from '@/constants';
import { Role } from '@/types';

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  roles?: Role[];
  children?: NavItem[];
}

export const landingNav: NavItem[] = [
  { label: 'Features', href: ROUTES.FEATURES },
  { label: 'Solutions', href: ROUTES.SOLUTIONS },
  { label: 'Technology', href: ROUTES.TECHNOLOGY },
  { label: 'Pricing', href: ROUTES.PRICING },
  { label: 'Docs', href: ROUTES.DOCS },
];

export const dashboardNav: NavItem[] = [
  { label: 'Dashboard', href: ROUTES.DASHBOARD },
  { label: 'Recruitment', href: ROUTES.RECRUITMENT },
  { label: 'Employees', href: ROUTES.EMPLOYEES },
  { label: 'Payroll', href: ROUTES.PAYROLL },
  { label: 'Attendance', href: ROUTES.ATTENDANCE },
  { label: 'Performance', href: ROUTES.PERFORMANCE },
  { label: 'Learning', href: ROUTES.LEARNING },
  { label: 'Analytics', href: ROUTES.ANALYTICS },
  { label: 'AI Chatbot', href: ROUTES.CHATBOT },
  { label: 'Settings', href: ROUTES.SETTINGS },
];

export const authNav: NavItem[] = [
  { label: 'Sign in', href: ROUTES.LOGIN },
  { label: 'Sign up', href: ROUTES.REGISTER },
];

export const footerNav: Record<string, NavItem[]> = {
  Product: [
    { label: 'Features', href: ROUTES.FEATURES },
    { label: 'Solutions', href: ROUTES.SOLUTIONS },
    { label: 'Pricing', href: ROUTES.PRICING },
    { label: 'Technology', href: ROUTES.TECHNOLOGY },
    { label: 'Docs', href: ROUTES.DOCS },
  ],
  Company: [
    { label: 'About', href: ROUTES.ABOUT },
    { label: 'Contact', href: ROUTES.CONTACT },
    { label: 'Careers', href: '#' },
    { label: 'Blog', href: '#' },
  ],
  Resources: [
    { label: 'Documentation', href: ROUTES.DOCS },
    { label: 'Help Center', href: '#' },
    { label: 'API Reference', href: '#' },
    { label: 'Community', href: '#' },
  ],
  Legal: [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Security', href: '#' },
    { label: 'Cookies', href: '#' },
  ],
};
