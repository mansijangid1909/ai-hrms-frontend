import { Employee, Candidate, Department, PayrollRecord, AttendanceRecord, LeaveRequest, Notification, Interview, JobPosting, PerformanceReview, Course } from '@//types';

export const mockDepartments: Department[] = [
  { id: 'd1', name: 'Engineering', head: 'Alex Chen', employeeCount: 84, budget: 12000000, description: 'Software engineering and infrastructure' },
  { id: 'd2', name: 'Human Resources', head: 'Maya Patel', employeeCount: 18, budget: 2200000, description: 'People operations and culture' },
  { id: 'd3', name: 'Sales', head: 'Jordan Lee', employeeCount: 52, budget: 4800000, description: 'Revenue and customer acquisition' },
  { id: 'd4', name: 'Marketing', head: 'Sam Rivera', employeeCount: 27, budget: 3100000, description: 'Brand, content, and demand generation' },
  { id: 'd5', name: 'Finance', head: 'Priya Nair', employeeCount: 14, budget: 1900000, description: 'Accounting, FP&A, and treasury' },
  { id: 'd6', name: 'Design', head: 'Riley Kim', employeeCount: 19, budget: 2400000, description: 'Product and brand design' },
];

export const mockEmployees: Employee[] = [
  { id: 'e1', firstName: 'Alex', lastName: 'Chen', email: 'alex.chen@aihrms.com', phone: '+1 555-0101', department: 'Engineering', position: 'VP Engineering', employmentType: 'FULL_TIME', status: 'ACTIVE', joinDate: '2021-03-15', salary: 220000, avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150', manager: 'CEO', gender: 'MALE' },
  { id: 'e2', firstName: 'Maya', lastName: 'Patel', email: 'maya.patel@aihrms.com', phone: '+1 555-0102', department: 'Human Resources', position: 'HR Director', employmentType: 'FULL_TIME', status: 'ACTIVE', joinDate: '2020-07-01', salary: 165000, avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150', manager: 'CEO', gender: 'FEMALE' },
  { id: 'e3', firstName: 'Jordan', lastName: 'Lee', email: 'jordan.lee@aihrms.com', phone: '+1 555-0103', department: 'Sales', position: 'Head of Sales', employmentType: 'FULL_TIME', status: 'ACTIVE', joinDate: '2022-01-10', salary: 180000, avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150', manager: 'CEO', gender: 'MALE' },
  { id: 'e4', firstName: 'Sam', lastName: 'Rivera', email: 'sam.rivera@aihrms.com', phone: '+1 555-0104', department: 'Marketing', position: 'Marketing Manager', employmentType: 'FULL_TIME', status: 'ACTIVE', joinDate: '2022-04-20', salary: 145000, avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150', manager: 'CEO', gender: 'OTHER' },
  { id: 'e5', firstName: 'Priya', lastName: 'Nair', email: 'priya.nair@aihrms.com', phone: '+1 555-0105', department: 'Finance', position: 'Finance Lead', employmentType: 'FULL_TIME', status: 'ON_LEAVE', joinDate: '2021-11-05', salary: 155000, avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150', manager: 'CEO', gender: 'FEMALE' },
  { id: 'e6', firstName: 'Riley', lastName: 'Kim', email: 'riley.kim@aihrms.com', phone: '+1 555-0106', department: 'Design', position: 'Design Lead', employmentType: 'FULL_TIME', status: 'ACTIVE', joinDate: '2022-09-12', salary: 140000, avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150', manager: 'CEO', gender: 'OTHER' },
  { id: 'e7', firstName: 'Chris', lastName: 'Morgan', email: 'chris.morgan@aihrms.com', phone: '+1 555-0107', department: 'Engineering', position: 'Senior Engineer', employmentType: 'FULL_TIME', status: 'ACTIVE', joinDate: '2023-02-01', salary: 165000, avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150', manager: 'Alex Chen', gender: 'MALE' },
  { id: 'e8', firstName: 'Taylor', lastName: 'Brooks', email: 'taylor.brooks@aihrms.com', phone: '+1 555-0108', department: 'Sales', position: 'Account Executive', employmentType: 'FULL_TIME', status: 'PROBATION', joinDate: '2024-01-15', salary: 95000, avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150', manager: 'Jordan Lee', gender: 'FEMALE' },
];

export const mockCandidates: Candidate[] = [
  { id: 'c1', firstName: 'Jamie', lastName: 'Wong', email: 'jamie.wong@email.com', phone: '+1 555-0201', position: 'Senior Frontend Engineer', stage: 'INTERVIEW', source: 'LinkedIn', rating: 4.5, skills: ['React', 'TypeScript', 'Next.js', 'GraphQL'], experience: 6, appliedAt: '2024-11-01', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150' },
  { id: 'c2', firstName: 'Dana', lastName: 'Schmidt', email: 'dana.schmidt@email.com', phone: '+1 555-0202', position: 'Product Designer', stage: 'OFFER', source: 'Referral', rating: 4.8, skills: ['Figma', 'UX Research', 'Prototyping', 'Design Systems'], experience: 5, appliedAt: '2024-10-20', avatar: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=150' },
  { id: 'c3', firstName: 'Marcus', lastName: 'Johnson', email: 'marcus.j@email.com', phone: '+1 555-0203', position: 'DevOps Engineer', stage: 'SCREENING', source: 'Job Board', rating: 3.8, skills: ['AWS', 'Kubernetes', 'Terraform', 'Docker'], experience: 4, appliedAt: '2024-11-05', avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150' },
  { id: 'c4', firstName: 'Aisha', lastName: 'Khan', email: 'aisha.khan@email.com', phone: '+1 555-0204', position: 'Data Scientist', stage: 'APPLIED', source: 'Company Website', rating: 4.2, skills: ['Python', 'ML', 'TensorFlow', 'SQL'], experience: 3, appliedAt: '2024-11-08', avatar: 'https://images.pexels.com/photos/3786630/pexels-photo-3786630.jpeg?auto=compress&cs=tinysrgb&w=150' },
  { id: 'c5', firstName: 'Liam', lastName: 'OConnor', email: 'liam.oc@email.com', phone: '+1 555-0205', position: 'Sales Manager', stage: 'HIRED', source: 'LinkedIn', rating: 4.6, skills: ['Salesforce', 'Negotiation', 'Strategy', 'Team Management'], experience: 8, appliedAt: '2024-09-15', avatar: 'https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=150' },
  { id: 'c6', firstName: 'Nora', lastName: 'Sato', email: 'nora.sato@email.com', phone: '+1 555-0206', position: 'HR Business Partner', stage: 'INTERVIEW', source: 'Referral', rating: 4.4, skills: ['Employee Relations', 'Onboarding', 'Policy', 'Compliance'], experience: 7, appliedAt: '2024-11-03', avatar: 'https://images.pexels.com/photos/5905911/pexels-photo-5905911.jpeg?auto=compress&cs=tinysrgb&w=150' },
];

export const mockPayroll: PayrollRecord[] = [
  { id: 'p1', employeeId: 'e1', employeeName: 'Alex Chen', month: 'November 2024', basicSalary: 18000, allowances: 2000, deductions: 800, tax: 4200, netPay: 15000, status: 'PAID', payDate: '2024-11-30' },
  { id: 'p2', employeeId: 'e2', employeeName: 'Maya Patel', month: 'November 2024', basicSalary: 13500, allowances: 1500, deductions: 600, tax: 3100, netPay: 11300, status: 'PAID', payDate: '2024-11-30' },
  { id: 'p3', employeeId: 'e3', employeeName: 'Jordan Lee', month: 'November 2024', basicSalary: 15000, allowances: 1800, deductions: 700, tax: 3500, netPay: 12600, status: 'PAID', payDate: '2024-11-30' },
  { id: 'p4', employeeId: 'e7', employeeName: 'Chris Morgan', month: 'November 2024', basicSalary: 13750, allowances: 1200, deductions: 500, tax: 2800, netPay: 11650, status: 'PROCESSED' },
  { id: 'p5', employeeId: 'e8', employeeName: 'Taylor Brooks', month: 'November 2024', basicSalary: 7900, allowances: 800, deductions: 300, tax: 1200, netPay: 7200, status: 'PENDING' },
];

export const mockAttendance: AttendanceRecord[] = [
  { id: 'a1', employeeId: 'e1', employeeName: 'Alex Chen', date: '2024-11-22', checkIn: '08:55', checkOut: '17:30', status: 'PRESENT', hoursWorked: 8.5, overtime: 0.5 },
  { id: 'a2', employeeId: 'e2', employeeName: 'Maya Patel', date: '2024-11-22', checkIn: '09:10', checkOut: '17:15', status: 'LATE', hoursWorked: 8, overtime: 0 },
  { id: 'a3', employeeId: 'e3', employeeName: 'Jordan Lee', date: '2024-11-22', checkIn: '08:45', checkOut: '17:30', status: 'PRESENT', hoursWorked: 8.75, overtime: 0.75 },
  { id: 'a4', employeeId: 'e5', employeeName: 'Priya Nair', date: '2024-11-22', status: 'ABSENT', hoursWorked: 0, overtime: 0 },
  { id: 'a5', employeeId: 'e7', employeeName: 'Chris Morgan', date: '2024-11-22', checkIn: '09:00', checkOut: '17:00', status: 'REMOTE', hoursWorked: 8, overtime: 0 },
];

export const mockLeaveRequests: LeaveRequest[] = [
  { id: 'l1', employeeId: 'e5', employeeName: 'Priya Nair', type: 'ANNUAL', startDate: '2024-11-25', endDate: '2024-11-29', days: 5, reason: 'Family vacation', status: 'APPROVED', approver: 'Maya Patel' },
  { id: 'l2', employeeId: 'e7', employeeName: 'Chris Morgan', type: 'SICK', startDate: '2024-11-24', endDate: '2024-11-24', days: 1, reason: 'Medical appointment', status: 'PENDING' },
  { id: 'l3', employeeId: 'e8', employeeName: 'Taylor Brooks', type: 'PERSONAL', startDate: '2024-11-28', endDate: '2024-11-28', days: 1, reason: 'Personal matter', status: 'PENDING' },
  { id: 'l4', employeeId: 'e4', employeeName: 'Sam Rivera', type: 'ANNUAL', startDate: '2024-12-02', endDate: '2024-12-06', days: 5, reason: 'Annual leave', status: 'PENDING' },
];

export const mockNotifications: Notification[] = [
  { id: 'n1', type: 'info', title: 'New application received', message: 'Aisha Khan applied for Data Scientist', read: false, createdAt: '2024-11-22T10:30:00', link: '/recruitment' },
  { id: 'n2', type: 'warning', title: 'Leave request pending', message: 'Chris Morgan requested sick leave', read: false, createdAt: '2024-11-22T09:15:00', link: '/attendance' },
  { id: 'n3', type: 'success', title: 'Payroll processed', message: 'November payroll has been processed', read: false, createdAt: '2024-11-21T16:45:00', link: '/payroll' },
  { id: 'n4', type: 'info', title: 'Interview scheduled', message: 'Jamie Wong interview on Nov 25', read: true, createdAt: '2024-11-21T14:20:00', link: '/recruitment' },
  { id: 'n5', type: 'error', title: 'Policy violation detected', message: 'Unusual check-in pattern detected for 2 employees', read: true, createdAt: '2024-11-20T11:00:00' },
];

export const mockInterviews: Interview[] = [
  { id: 'i1', candidateId: 'c1', candidateName: 'Jamie Wong', position: 'Senior Frontend Engineer', date: '2024-11-25', time: '10:00', interviewer: 'Alex Chen', round: 'Technical', status: 'SCHEDULED', type: 'VIDEO' },
  { id: 'i2', candidateId: 'c2', candidateName: 'Dana Schmidt', position: 'Product Designer', date: '2024-11-26', time: '14:00', interviewer: 'Riley Kim', round: 'Portfolio Review', status: 'SCHEDULED', type: 'ONSITE' },
  { id: 'i3', candidateId: 'c6', candidateName: 'Nora Sato', position: 'HR Business Partner', date: '2024-11-27', time: '11:30', interviewer: 'Maya Patel', round: 'Culture Fit', status: 'SCHEDULED', type: 'VIDEO' },
];

export const mockJobs: JobPosting[] = [
  { id: 'j1', title: 'Senior Frontend Engineer', department: 'Engineering', location: 'San Francisco, CA', type: 'FULL_TIME', status: 'OPEN', applicants: 47, postedDate: '2024-10-15', description: 'Build delightful user experiences with React and Next.js.' },
  { id: 'j2', title: 'Product Designer', department: 'Design', location: 'Remote', type: 'FULL_TIME', status: 'OPEN', applicants: 32, postedDate: '2024-10-20', description: 'Design beautiful, accessible product interfaces.' },
  { id: 'j3', title: 'DevOps Engineer', department: 'Engineering', location: 'Austin, TX', type: 'FULL_TIME', status: 'OPEN', applicants: 28, postedDate: '2024-10-25', description: 'Scale our cloud infrastructure and CI/CD pipelines.' },
  { id: 'j4', title: 'Data Scientist', department: 'Engineering', location: 'Remote', type: 'FULL_TIME', status: 'OPEN', applicants: 19, postedDate: '2024-11-01', description: 'Build ML models that power our AI features.' },
  { id: 'j5', title: 'Sales Manager', department: 'Sales', location: 'New York, NY', type: 'FULL_TIME', status: 'CLOSED', applicants: 24, postedDate: '2024-08-10', description: 'Lead enterprise sales team to new heights.' },
];

export const mockPerformanceReviews: PerformanceReview[] = [
  { id: 'pr1', employeeId: 'e1', employeeName: 'Alex Chen', period: 'H2 2024', rating: 4.7, goals: 8, completedGoals: 7, reviewer: 'CEO', status: 'COMPLETED' },
  { id: 'pr2', employeeId: 'e3', employeeName: 'Jordan Lee', period: 'H2 2024', rating: 4.5, goals: 6, completedGoals: 5, reviewer: 'CEO', status: 'COMPLETED' },
  { id: 'pr3', employeeId: 'e7', employeeName: 'Chris Morgan', period: 'H2 2024', rating: 4.2, goals: 5, completedGoals: 3, reviewer: 'Alex Chen', status: 'IN_PROGRESS' },
  { id: 'pr4', employeeId: 'e8', employeeName: 'Taylor Brooks', period: 'H2 2024', rating: 0, goals: 4, completedGoals: 0, reviewer: 'Jordan Lee', status: 'DRAFT' },
];

export const mockCourses: Course[] = [
  { id: 'co1', title: 'Leadership Essentials', category: 'Management', description: 'Develop core leadership skills for new managers.', duration: '8 hours', level: 'BEGINNER', enrolled: 124, completed: 89, rating: 4.7 },
  { id: 'co2', title: 'Advanced React Patterns', category: 'Engineering', description: 'Master advanced React patterns and performance.', duration: '12 hours', level: 'ADVANCED', enrolled: 78, completed: 45, rating: 4.9 },
  { id: 'co3', title: 'Effective Communication', category: 'Soft Skills', description: 'Communicate clearly and confidently in any setting.', duration: '6 hours', level: 'BEGINNER', enrolled: 215, completed: 180, rating: 4.6 },
  { id: 'co4', title: 'Data Analytics with Python', category: 'Data', description: 'Analyze data and build dashboards with Python.', duration: '15 hours', level: 'INTERMEDIATE', enrolled: 92, completed: 51, rating: 4.8 },
  { id: 'co5', title: 'Project Management Pro', category: 'Management', description: 'Lead projects from kickoff to launch with confidence.', duration: '10 hours', level: 'INTERMEDIATE', enrolled: 156, completed: 102, rating: 4.5 },
];

export const dashboardStats = {
  totalEmployees: 214,
  activeEmployees: 198,
  openPositions: 12,
  pendingLeaves: 8,
  upcomingInterviews: 3,
  monthlyPayroll: 2840000,
  attendanceRate: 94.2,
  attritionRate: 6.8,
  avgTimeToHire: 18,
  offerAcceptanceRate: 78,
};

export const hiringTrendData = [
  { month: 'Jun', applied: 120, interviewed: 45, hired: 8 },
  { month: 'Jul', applied: 145, interviewed: 52, hired: 12 },
  { month: 'Aug', applied: 180, interviewed: 68, hired: 15 },
  { month: 'Sep', applied: 165, interviewed: 60, hired: 10 },
  { month: 'Oct', applied: 210, interviewed: 75, hired: 18 },
  { month: 'Nov', applied: 240, interviewed: 82, hired: 22 },
];

export const departmentDistribution = [
  { name: 'Engineering', value: 84, color: '#3b82f6' },
  { name: 'Sales', value: 52, color: '#10b981' },
  { name: 'Marketing', value: 27, color: '#f59e0b' },
  { name: 'Design', value: 19, color: '#8b5cf6' },
  { name: 'HR', value: 18, color: '#ec4899' },
  { name: 'Finance', value: 14, color: '#06b6d4' },
];

export const attendanceTrendData = [
  { day: 'Mon', present: 192, absent: 12, remote: 10 },
  { day: 'Tue', present: 196, absent: 8, remote: 10 },
  { day: 'Wed', present: 188, absent: 14, remote: 12 },
  { day: 'Thu', present: 194, absent: 10, remote: 10 },
  { day: 'Fri', present: 180, absent: 18, remote: 16 },
];

export const payrollTrendData = [
  { month: 'Jun', amount: 2650000 },
  { month: 'Jul', amount: 2680000 },
  { month: 'Aug', amount: 2720000 },
  { month: 'Sep', amount: 2750000 },
  { month: 'Oct', amount: 2790000 },
  { month: 'Nov', amount: 2840000 },
];
