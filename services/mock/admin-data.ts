import {
  AdminEmployee, AdminDepartment, AdminJobPosting, AdminLeaveRequest,
  AdminAttendanceRecord, AdminNotification, AdminActivity, AdminAIInsight,
  AdminStats, EmployeeGrowthData, MonthlyHiringData, DepartmentDistributionData,
  AttendanceOverviewData, LeaveRequestChartData, RecruitmentPipelineData,
} from '@/types/admin';

const firstNames = ['Alex','Maya','Jordan','Sam','Priya','Riley','Chris','Taylor','Jamie','Dana','Marcus','Aisha','Liam','Nora','Ethan','Zara','Olivia','Noah','Ava','Lucas','Mia','Leo','Sophia','Kai','Yuki','Arjun','Sofia','Hiro','Layla','Omar','Chloe','Ravi','Emma','Nico','Anya','Diego','Hana','Felix','Iris','Karl','Lina','Oscar','Rosa','Tariq','Uma','Vera','Wade','Xena','Yara'];
const lastNames = ['Chen','Patel','Lee','Rivera','Nair','Kim','Morgan','Brooks','Wong','Schmidt','Johnson','Khan','OConnor','Sato','Brown','Garcia','Martinez','Davis','Wilson','Anderson','Taylor','Thomas','Jackson','White','Harris','Martin','Thompson','Robinson','Clark','Lewis','Walker','Hall','Allen','Young','Hernandez','King','Wright','Lopez','Hill','Scott','Green','Adams','Baker','Nelson','Carter','Mitchell','Roberts','Turner','Phillips'];
const departments = ['Engineering','Human Resources','Sales','Marketing','Finance','Design','Product','Operations','Customer Success','Legal','IT','Data Science'];
const designations: Record<string, string[]> = {
  Engineering: ['Senior Engineer','Staff Engineer','VP Engineering','Engineering Manager','Junior Developer'],
  'Human Resources': ['HR Director','HR Business Partner','HR Specialist','Talent Acquisition Lead'],
  Sales: ['Head of Sales','Account Executive','Sales Manager','SDR','Account Manager'],
  Marketing: ['Marketing Manager','Content Strategist','Brand Designer','Growth Lead'],
  Finance: ['Finance Lead','Senior Accountant','Financial Analyst','CFO'],
  Design: ['Design Lead','Product Designer','UX Researcher','Visual Designer'],
  Product: ['Product Manager','Senior PM','Product Lead','Associate PM'],
  Operations: ['Ops Manager','Operations Analyst','COO','Operations Lead'],
  'Customer Success': ['CS Manager','Success Specialist','CS Lead','Onboarding Manager'],
  Legal: ['Legal Counsel','Compliance Officer','General Counsel'],
  IT: ['IT Manager','Systems Admin','DevOps Engineer','Security Lead'],
  'Data Science': ['Data Scientist','ML Engineer','Data Analyst','Head of Data'],
};
const workModes = ['REMOTE','HYBRID','ONSITE'];
const statuses: AdminEmployee['status'][] = ['ACTIVE','ON_LEAVE','PROBATION','TERMINATED'];
const genders: AdminEmployee['gender'][] = ['MALE','FEMALE','OTHER'];
const employmentTypes: AdminEmployee['employmentType'][] = ['FULL_TIME','PART_TIME','CONTRACT','INTERN'];
const countries = ['United States','United Kingdom','Canada','India','Germany','Australia','Singapore'];
const cities: Record<string, string[]> = {
  'United States': ['San Francisco','New York','Austin','Seattle','Boston','Chicago'],
  'United Kingdom': ['London','Manchester','Edinburgh'],
  Canada: ['Toronto','Vancouver','Montreal'],
  India: ['Bangalore','Mumbai','Delhi','Hyderabad','Pune'],
  Germany: ['Berlin','Munich','Frankfurt'],
  Australia: ['Sydney','Melbourne'],
  Singapore: ['Singapore'],
};

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function pick<T>(arr: T[], seed: number): T {
  return arr[Math.floor(seededRandom(seed) * arr.length)];
}

function generateEmployees(count: number): AdminEmployee[] {
  const result: AdminEmployee[] = [];
  for (let i = 0; i < count; i++) {
    const firstName = pick(firstNames, i * 3 + 1);
    const lastName = pick(lastNames, i * 3 + 2);
    const dept = pick(departments, i * 5 + 3);
    const desigs = designations[dept] || ['Specialist'];
    const country = pick(countries, i * 7 + 1);
    const city = pick(cities[country] || ['Unknown'], i * 11 + 2);
    const joinYear = 2019 + Math.floor(seededRandom(i * 13) * 6);
    const joinMonth = 1 + Math.floor(seededRandom(i * 17) * 12);
    const joinDay = 1 + Math.floor(seededRandom(i * 19) * 28);
    result.push({
      id: `EMP-${String(i + 1).padStart(4, '0')}`,
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@acmecorp.com`,
      phone: `+1 555-${String(1000 + i).slice(-4)}`,
      department: dept,
      designation: pick(desigs, i * 23 + 5),
      employmentType: pick(employmentTypes, i * 29 + 1),
      status: i % 9 === 0 ? 'ON_LEAVE' : i % 15 === 0 ? 'PROBATION' : i % 25 === 0 ? 'TERMINATED' : 'ACTIVE',
      joinDate: `${joinYear}-${String(joinMonth).padStart(2,'0')}-${String(joinDay).padStart(2,'0')}`,
      salary: 60000 + Math.floor(seededRandom(i * 31) * 180000),
      manager: pick(firstNames, i * 37) + ' ' + pick(lastNames, i * 41),
      gender: pick(genders, i * 43),
      dateOfBirth: `${1985 + Math.floor(seededRandom(i * 47) * 15)}-${1 + Math.floor(seededRandom(i * 53) * 12)}-${1 + Math.floor(seededRandom(i * 59) * 28)}`,
      workMode: pick(workModes, i * 61),
      country,
      state: city,
      city,
      postalCode: String(10000 + Math.floor(seededRandom(i * 67) * 89999)),
      address: `${100 + i} ${pick(['Main','Oak','Maple','Pine','Cedar'], i * 71)} St`,
      skills: ['Communication','Leadership','Strategy','Analysis'].slice(0, 2 + Math.floor(seededRandom(i * 73) * 3)),
      emergencyContact: `${pick(firstNames, i * 79)} ${pick(lastNames, i * 83)} — +1 555-${String(2000 + i).slice(-4)}`,
      avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
    });
  }
  return result;
}

export const mockAdminEmployees: AdminEmployee[] = generateEmployees(50);

const hrDesignations = ['HR Director','HR Business Partner','HR Specialist','Talent Acquisition Lead','People Operations Manager'];
export const mockHRManagers: AdminEmployee[] = Array.from({ length: 8 }, (_, i) => {
  const firstName = pick(firstNames, i * 97 + 11);
  const lastName = pick(lastNames, i * 101 + 13);
  const country = pick(countries, i * 103 + 7);
  const city = pick(cities[country] || ['Unknown'], i * 107 + 9);
  return {
    id: `HRM-${String(i + 1).padStart(3, '0')}`,
    firstName,
    lastName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@acmecorp.com`,
    phone: `+1 555-${String(5000 + i).slice(-4)}`,
    department: 'Human Resources',
    designation: hrDesignations[i % hrDesignations.length],
    employmentType: 'FULL_TIME',
    status: 'ACTIVE',
    joinDate: `${2020 + Math.floor(i / 3)}-${String((i % 12) + 1).padStart(2,'0')}-${String((i % 28) + 1).padStart(2,'0')}`,
    salary: 90000 + i * 12000,
    manager: 'CEO',
    gender: pick(genders, i * 109),
    dateOfBirth: `${1980 + (i % 10)}-${String((i % 12) + 1).padStart(2,'0')}-${String((i % 28) + 1).padStart(2,'0')}`,
    workMode: pick(workModes, i * 113),
    country,
    state: city,
    city,
    postalCode: String(10000 + i * 111),
    address: `${200 + i} ${pick(['Main','Oak','Maple'], i)} St`,
    skills: ['Employee Relations','Onboarding','Policy','Compliance','Recruitment'],
    emergencyContact: `${pick(firstNames, i * 127)} ${pick(lastNames, i * 131)}`,
    avatar: `https://i.pravatar.cc/150?img=${(i % 30) + 40}`,
  };
});

const deptHeads = ['Alex Chen','Maya Patel','Jordan Lee','Sam Rivera','Priya Nair','Riley Kim','Chris Morgan','Taylor Brooks','Jamie Wong','Dana Schmidt','Marcus Johnson','Aisha Khan'];
export const mockAdminDepartments: AdminDepartment[] = departments.map((name, i) => ({
  id: `DEPT-${String(i + 1).padStart(3, '0')}`,
  name,
  head: deptHeads[i],
  employeeCount: 8 + Math.floor(seededRandom(i * 137) * 80),
  openPositions: Math.floor(seededRandom(i * 139) * 6),
  budget: 1000000 + Math.floor(seededRandom(i * 149) * 10000000),
  status: i % 7 === 0 ? 'INACTIVE' : 'ACTIVE',
  description: `${name} department managing ${name.toLowerCase()} operations`,
}));

export const mockAdminJobs: AdminJobPosting[] = [
  { id: 'JOB-001', title: 'Senior Frontend Engineer', department: 'Engineering', location: 'San Francisco, CA', type: 'FULL_TIME', status: 'OPEN', applicants: 47, postedDate: '2025-01-15', description: 'Build delightful user experiences with React and Next.js.' },
  { id: 'JOB-002', title: 'Product Designer', department: 'Design', location: 'Remote', type: 'FULL_TIME', status: 'OPEN', applicants: 32, postedDate: '2025-01-10', description: 'Design beautiful, accessible product interfaces.' },
  { id: 'JOB-003', title: 'DevOps Engineer', department: 'IT', location: 'Austin, TX', type: 'FULL_TIME', status: 'OPEN', applicants: 28, postedDate: '2025-01-08', description: 'Scale our cloud infrastructure and CI/CD pipelines.' },
  { id: 'JOB-004', title: 'Data Scientist', department: 'Data Science', location: 'Remote', type: 'FULL_TIME', status: 'OPEN', applicants: 19, postedDate: '2025-01-05', description: 'Build ML models that power our AI features.' },
  { id: 'JOB-005', title: 'Sales Manager', department: 'Sales', location: 'New York, NY', type: 'FULL_TIME', status: 'OPEN', applicants: 24, postedDate: '2025-01-02', description: 'Lead enterprise sales team to new heights.' },
];

export const mockAdminLeaveRequests: AdminLeaveRequest[] = [
  { id: 'LR-001', employeeId: 'EMP-0005', employeeName: 'Priya Nair', type: 'ANNUAL', startDate: '2025-01-25', endDate: '2025-01-29', days: 5, reason: 'Family vacation', status: 'PENDING' },
  { id: 'LR-002', employeeId: 'EMP-0007', employeeName: 'Chris Morgan', type: 'SICK', startDate: '2025-01-24', endDate: '2025-01-24', days: 1, reason: 'Medical appointment', status: 'PENDING' },
  { id: 'LR-003', employeeId: 'EMP-0008', employeeName: 'Taylor Brooks', type: 'PERSONAL', startDate: '2025-01-28', endDate: '2025-01-28', days: 1, reason: 'Personal matter', status: 'PENDING' },
  { id: 'LR-004', employeeId: 'EMP-0004', employeeName: 'Sam Rivera', type: 'ANNUAL', startDate: '2025-02-02', endDate: '2025-02-06', days: 5, reason: 'Annual leave', status: 'APPROVED', approver: 'Maya Patel' },
  { id: 'LR-005', employeeId: 'EMP-0012', employeeName: 'Jamie Wong', type: 'SICK', startDate: '2025-01-20', endDate: '2025-01-22', days: 3, reason: 'Flu recovery', status: 'APPROVED', approver: 'Maya Patel' },
  { id: 'LR-006', employeeId: 'EMP-0019', employeeName: 'Marcus Johnson', type: 'UNPAID', startDate: '2025-02-10', endDate: '2025-02-14', days: 5, reason: 'Extended personal break', status: 'REJECTED', approver: 'Maya Patel' },
];

export const mockAdminAttendance: AdminAttendanceRecord[] = Array.from({ length: 20 }, (_, i) => {
  const emp = mockAdminEmployees[i];
  const present = i % 8 !== 0;
  return {
    id: `ATT-${String(i + 1).padStart(3, '0')}`,
    employeeId: emp.id,
    employeeName: `${emp.firstName} ${emp.lastName}`,
    date: '2025-01-23',
    checkIn: present ? (i % 5 === 0 ? '09:10' : '08:5' + (i % 9)) : undefined,
    checkOut: present ? '17:30' : undefined,
    status: present ? (i % 5 === 0 ? 'LATE' : i % 3 === 0 ? 'REMOTE' : 'PRESENT') : 'ABSENT',
    hoursWorked: present ? 8 + (i % 3) * 0.5 : 0,
    overtime: i % 4 === 0 ? 0.5 : 0,
  };
});

export const mockAdminNotifications: AdminNotification[] = [
  { id: 'N-001', type: 'info', title: 'New application received', message: 'Aisha Khan applied for Data Scientist', read: false, createdAt: '2025-01-23T10:30:00' },
  { id: 'N-002', type: 'warning', title: 'Leave request pending', message: 'Chris Morgan requested sick leave', read: false, createdAt: '2025-01-23T09:15:00' },
  { id: 'N-003', type: 'success', title: 'Payroll processed', message: 'January payroll has been processed', read: false, createdAt: '2025-01-22T16:45:00' },
  { id: 'N-004', type: 'info', title: 'Interview scheduled', message: 'Jamie Wong interview on Jan 25', read: true, createdAt: '2025-01-22T14:20:00' },
  { id: 'N-005', type: 'error', title: 'Policy violation detected', message: 'Unusual check-in pattern detected for 2 employees', read: true, createdAt: '2025-01-21T11:00:00' },
  { id: 'N-006', type: 'success', title: 'New employee onboarded', message: 'Taylor Brooks joined Sales team', read: true, createdAt: '2025-01-20T09:00:00' },
];

export const mockAdminActivities: AdminActivity[] = [
  { id: 'A-001', type: 'employee_joined', title: 'Employee Joined', description: 'Taylor Brooks joined as Account Executive', timestamp: '2025-01-23T09:30:00', user: 'System' },
  { id: 'A-002', type: 'leave_approved', title: 'Leave Approved', description: 'Sam Rivera annual leave approved', timestamp: '2025-01-23T08:15:00', user: 'Maya Patel' },
  { id: 'A-003', type: 'payroll_generated', title: 'Payroll Generated', description: 'January 2025 payroll processed for 214 employees', timestamp: '2025-01-22T17:00:00', user: 'Priya Nair' },
  { id: 'A-004', type: 'hr_added', title: 'HR Manager Added', description: 'Nora Sato added as HR Business Partner', timestamp: '2025-01-22T14:30:00', user: 'Admin' },
  { id: 'A-005', type: 'department_created', title: 'Department Created', description: 'Data Science department created', timestamp: '2025-01-21T11:00:00', user: 'Admin' },
  { id: 'A-006', type: 'system_log', title: 'System Log', description: 'Automated backup completed successfully', timestamp: '2025-01-21T02:00:00', user: 'System' },
];

export const mockAdminAIInsights: AdminAIInsight[] = [
  { id: 'AI-001', icon: 'Users', title: 'Engineering needs more developers', message: 'AI analysis shows the Engineering department requires 4 more developers to meet Q1 project demands.', severity: 'warning', category: 'Hiring' },
  { id: 'AI-002', icon: 'TrendingDown', title: 'Attrition risk increased by 5%', message: '3 employees in Engineering show signs of potential attrition. Consider scheduling check-ins.', severity: 'danger', category: 'Retention' },
  { id: 'AI-003', icon: 'Wallet', title: 'Payroll anomaly detected', message: 'Overtime costs in Sales are 23% above the 3-month average. Review recommended.', severity: 'warning', category: 'Payroll' },
  { id: 'AI-004', icon: 'Calendar', title: 'Upcoming interviews', message: '5 interviews scheduled this week. 2 candidates have high match scores (>85%).', severity: 'info', category: 'Recruitment' },
  { id: 'AI-005', icon: 'GraduationCap', title: 'Learning recommendation', message: 'Advanced React Patterns course has 92% completion rate. Recommend for 8 engineers.', severity: 'success', category: 'Learning' },
];

export const mockAdminStats: AdminStats = {
  totalEmployees: 214,
  totalHRManagers: 8,
  departments: 12,
  openJobs: 5,
  pendingLeaveRequests: 3,
  monthlyHiring: 22,
  attendanceRate: 94.2,
  employeeSatisfaction: 87,
  attritionRate: 6.8,
};

export const mockEmployeeGrowthData: EmployeeGrowthData[] = [
  { month: 'Aug', employees: 180, newHires: 8 },
  { month: 'Sep', employees: 188, newHires: 12 },
  { month: 'Oct', employees: 198, newHires: 15 },
  { month: 'Nov', employees: 206, newHires: 10 },
  { month: 'Dec', employees: 210, newHires: 18 },
  { month: 'Jan', employees: 214, newHires: 22 },
];

export const mockMonthlyHiringData: MonthlyHiringData[] = [
  { month: 'Aug', hired: 8, target: 10 },
  { month: 'Sep', hired: 12, target: 12 },
  { month: 'Oct', hired: 15, target: 14 },
  { month: 'Nov', hired: 10, target: 12 },
  { month: 'Dec', hired: 18, target: 15 },
  { month: 'Jan', hired: 22, target: 18 },
];

export const mockDepartmentDistribution: DepartmentDistributionData[] = [
  { name: 'Engineering', value: 84, color: '#4361ee' },
  { name: 'Sales', value: 52, color: '#10b981' },
  { name: 'Marketing', value: 27, color: '#f59e0b' },
  { name: 'Design', value: 19, color: '#8b5cf6' },
  { name: 'HR', value: 18, color: '#ec4899' },
  { name: 'Finance', value: 14, color: '#06b6d4' },
];

export const mockAttendanceOverview: AttendanceOverviewData[] = [
  { day: 'Mon', present: 192, absent: 12, remote: 10 },
  { day: 'Tue', present: 196, absent: 8, remote: 10 },
  { day: 'Wed', present: 188, absent: 14, remote: 12 },
  { day: 'Thu', present: 194, absent: 10, remote: 10 },
  { day: 'Fri', present: 180, absent: 18, remote: 16 },
];

export const mockLeaveRequestChart: LeaveRequestChartData[] = [
  { name: 'Approved', value: 45, color: '#10b981' },
  { name: 'Pending', value: 18, color: '#f59e0b' },
  { name: 'Rejected', value: 7, color: '#e11d48' },
];

export const mockRecruitmentPipeline: RecruitmentPipelineData[] = [
  { stage: 'Applied', count: 240 },
  { stage: 'Screening', count: 120 },
  { stage: 'Interview', count: 60 },
  { stage: 'Offer', count: 25 },
  { stage: 'Hired', count: 22 },
];
