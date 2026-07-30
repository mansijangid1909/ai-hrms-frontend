import { Role } from '@/types';

export const ROUTES = {
  // Landing
  HOME: '/',
  FEATURES: '/features',
  SOLUTIONS: '/solutions',
  TECHNOLOGY: '/technology',
  ABOUT: '/about',
  CONTACT: '/contact',
  PRICING: '/pricing',
  DOCS: '/docs',

  // Auth
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  VERIFY_EMAIL: '/verify-email',
  OTP: '/otp',
  CHANGE_PASSWORD: '/change-password',
  SESSION_EXPIRED: '/session-expired',

  // Errors
  NOT_FOUND: '/404',
  FORBIDDEN: '/403',

  // Dashboard
  DASHBOARD: '/dashboard',
  DASHBOARD_ADMIN: '/dashboard/admin',
  DASHBOARD_HR: '/dashboard/hr',
  DASHBOARD_RECRUITMENT: '/dashboard/recruitment',
  DASHBOARD_MANAGER: '/dashboard/manager',
  DASHBOARD_EMPLOYEE: '/dashboard/employee',
  DASHBOARD_CANDIDATE: '/dashboard/candidate',

  // Modules
  RECRUITMENT: '/recruitment',
  EMPLOYEES: '/employees',
  PAYROLL: '/payroll',
  ATTENDANCE: '/attendance',
  PERFORMANCE: '/performance',
  LEARNING: '/learning',
  ANALYTICS: '/analytics',
  CHATBOT: '/chatbot',
  SETTINGS: '/settings',
} as const;

export const ROLE_DASHBOARD: Record<Role, string> = {
  SUPER_ADMIN: ROUTES.DASHBOARD_ADMIN,
  HR_ADMIN: ROUTES.DASHBOARD_HR,
  RECRUITER: ROUTES.DASHBOARD_RECRUITMENT,
  MANAGER: ROUTES.DASHBOARD_MANAGER,
  EMPLOYEE: ROUTES.DASHBOARD_EMPLOYEE,
  CANDIDATE: ROUTES.DASHBOARD_CANDIDATE,
};

export const ROLES: { value: Role; label: string; description: string }[] = [
  { value: 'SUPER_ADMIN', label: 'Super Admin', description: 'Full system access with all permissions' },
  { value: 'HR_ADMIN', label: 'HR Admin', description: 'Manage employees, payroll, and HR operations' },
  { value: 'RECRUITER', label: 'Recruiter', description: 'Manage candidates and recruitment pipeline' },
  { value: 'MANAGER', label: 'Manager', description: 'Manage team performance and approvals' },
  { value: 'EMPLOYEE', label: 'Employee', description: 'View personal info, attendance, and payslips' },
  { value: 'CANDIDATE', label: 'Candidate', description: 'Apply for jobs and track application status' },
];

export const PERMISSIONS = {
  // Employee
  EMPLOYEE_VIEW: 'employee:view',
  EMPLOYEE_CREATE: 'employee:create',
  EMPLOYEE_EDIT: 'employee:edit',
  EMPLOYEE_DELETE: 'employee:delete',
  // Recruitment
  RECRUITMENT_VIEW: 'recruitment:view',
  RECRUITMENT_MANAGE: 'recruitment:manage',
  // Payroll
  PAYROLL_VIEW: 'payroll:view',
  PAYROLL_MANAGE: 'payroll:manage',
  // Analytics
  ANALYTICS_VIEW: 'analytics:view',
  // Settings
  SETTINGS_MANAGE: 'settings:manage',
} as const;

export const ROLE_PERMISSIONS: Record<Role, string[]> = {
  SUPER_ADMIN: Object.values(PERMISSIONS),
  HR_ADMIN: [
    PERMISSIONS.EMPLOYEE_VIEW,
    PERMISSIONS.EMPLOYEE_CREATE,
    PERMISSIONS.EMPLOYEE_EDIT,
    PERMISSIONS.PAYROLL_VIEW,
    PERMISSIONS.PAYROLL_MANAGE,
    PERMISSIONS.ANALYTICS_VIEW,
  ],
  RECRUITER: [PERMISSIONS.RECRUITMENT_VIEW, PERMISSIONS.RECRUITMENT_MANAGE],
  MANAGER: [PERMISSIONS.EMPLOYEE_VIEW, PERMISSIONS.ANALYTICS_VIEW],
  EMPLOYEE: [PERMISSIONS.EMPLOYEE_VIEW],
  CANDIDATE: [],
};

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || '/api',
  TIMEOUT: 30000,
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      REFRESH: '/auth/refresh',
      LOGOUT: '/auth/logout',
      FORGOT_PASSWORD: '/auth/forgot-password',
      RESET_PASSWORD: '/auth/reset-password',
      VERIFY_EMAIL: '/auth/verify-email',
      ME: '/auth/me',
    },
    EMPLOYEES: '/employees',
    CANDIDATES: '/candidates',
    PAYROLL: '/payroll',
    ATTENDANCE: '/attendance',
    ANALYTICS: '/analytics',
    CHATBOT: '/chatbot',
  },
} as const;

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'aihrms_access_token',
  REFRESH_TOKEN: 'aihrms_refresh_token',
  USER: 'aihrms_user',
  THEME: 'aihrms_theme',
  SIDEBAR_COLLAPSED: 'aihrms_sidebar_collapsed',
} as const;

export const THEME_CONFIG = {
  defaultTheme: 'dark',
  themes: ['light', 'dark'] as const,
};
