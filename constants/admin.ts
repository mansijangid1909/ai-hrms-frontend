export const ADMIN_ROUTES = {
  DASHBOARD: '/admin/dashboard',
  HR_MANAGERS: '/admin/hr-managers',
  EMPLOYEES: '/admin/employees',
  DEPARTMENTS: '/admin/departments',
  RECRUITMENT: '/admin/recruitment',
  ATTENDANCE: '/admin/attendance',
  LEAVE: '/admin/leave',
  PAYROLL: '/admin/payroll',
  PERFORMANCE: '/admin/performance',
  LEARNING: '/admin/learning',
  REPORTS: '/admin/reports',
  ANALYTICS: '/admin/analytics',
  AI_INSIGHTS: '/admin/ai-insights',
  SETTINGS: '/admin/settings',
} as const;

export const ADMIN_NAV_ITEMS = [
  { label: 'Dashboard', href: ADMIN_ROUTES.DASHBOARD, icon: 'LayoutDashboard' },
  { label: 'HR Managers', href: ADMIN_ROUTES.HR_MANAGERS, icon: 'UsersRound' },
  { label: 'Employees', href: ADMIN_ROUTES.EMPLOYEES, icon: 'Users' },
  { label: 'Departments', href: ADMIN_ROUTES.DEPARTMENTS, icon: 'Building2' },
  { label: 'Recruitment', href: ADMIN_ROUTES.RECRUITMENT, icon: 'Briefcase' },
  { label: 'Attendance', href: ADMIN_ROUTES.ATTENDANCE, icon: 'Clock' },
  { label: 'Leave Management', href: ADMIN_ROUTES.LEAVE, icon: 'CalendarDays' },
  { label: 'Payroll', href: ADMIN_ROUTES.PAYROLL, icon: 'Wallet' },
  { label: 'Performance', href: ADMIN_ROUTES.PERFORMANCE, icon: 'TrendingUp' },
  { label: 'Learning', href: ADMIN_ROUTES.LEARNING, icon: 'GraduationCap' },
  { label: 'Reports', href: ADMIN_ROUTES.REPORTS, icon: 'FileText' },
  { label: 'Analytics', href: ADMIN_ROUTES.ANALYTICS, icon: 'BarChart3' },
  { label: 'AI Insights', href: ADMIN_ROUTES.AI_INSIGHTS, icon: 'Sparkles' },
  { label: 'Settings', href: ADMIN_ROUTES.SETTINGS, icon: 'Settings' },
] as const;

export const ADMIN_DEPARTMENTS = [
  'Engineering', 'Human Resources', 'Sales', 'Marketing', 'Finance',
  'Design', 'Product', 'Operations', 'Customer Success', 'Legal', 'IT', 'Data Science',
];

export const ADMIN_DESIGNATIONS = [
  'Senior Engineer', 'Staff Engineer', 'Engineering Manager', 'VP Engineering',
  'HR Director', 'HR Business Partner', 'HR Specialist', 'Talent Acquisition Lead',
  'Head of Sales', 'Account Executive', 'Sales Manager',
  'Marketing Manager', 'Content Strategist', 'Brand Designer',
  'Finance Lead', 'Senior Accountant', 'Financial Analyst',
  'Design Lead', 'Product Designer', 'UX Researcher',
  'Product Manager', 'Senior PM', 'Product Lead',
  'Ops Manager', 'Operations Analyst',
  'Data Scientist', 'ML Engineer', 'Data Analyst',
];

export const ADMIN_EMPLOYMENT_TYPES = ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERN'] as const;
export const ADMIN_WORK_MODES = ['REMOTE', 'HYBRID', 'ONSITE'] as const;
export const ADMIN_STATUSES = ['ACTIVE', 'ON_LEAVE', 'PROBATION', 'TERMINATED'] as const;
export const ADMIN_COUNTRIES = ['United States', 'United Kingdom', 'Canada', 'India', 'Germany', 'Australia', 'Singapore'] as const;

export const ADMIN_REPORT_TYPES = [
  { id: 'attendance', label: 'Attendance Report', icon: 'Clock', description: 'Monthly attendance summary' },
  { id: 'payroll', label: 'Payroll Report', icon: 'Wallet', description: 'Payroll breakdown by department' },
  { id: 'employees', label: 'Employee Report', icon: 'Users', description: 'Complete employee directory' },
  { id: 'recruitment', label: 'Recruitment Report', icon: 'Briefcase', description: 'Hiring pipeline analytics' },
  { id: 'performance', label: 'Performance Report', icon: 'TrendingUp', description: 'Review cycle results' },
] as const;

export const ADMIN_EXPORT_FORMATS = [
  { id: 'csv', label: 'CSV', icon: 'FileSpreadsheet' },
  { id: 'excel', label: 'Excel', icon: 'Sheet' },
  { id: 'pdf', label: 'PDF', icon: 'FileText' },
] as const;
