export interface AdminEmployee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  employmentType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERN';
  status: 'ACTIVE' | 'ON_LEAVE' | 'PROBATION' | 'TERMINATED';
  joinDate: string;
  salary: number;
  manager?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  dateOfBirth?: string;
  workMode: 'REMOTE' | 'HYBRID' | 'ONSITE';
  country?: string;
  state?: string;
  city?: string;
  postalCode?: string;
  address?: string;
  skills?: string[];
  emergencyContact?: string;
  avatar?: string;
}

export interface AdminDepartment {
  id: string;
  name: string;
  head: string;
  employeeCount: number;
  openPositions: number;
  budget: number;
  status: 'ACTIVE' | 'INACTIVE';
  description?: string;
}

export interface AdminJobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT';
  status: 'OPEN' | 'CLOSED' | 'DRAFT';
  applicants: number;
  postedDate: string;
  description: string;
}

export interface AdminLeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'ANNUAL' | 'SICK' | 'PERSONAL' | 'MATERNITY' | 'UNPAID';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  approver?: string;
}

export interface AdminAttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'HALF_DAY' | 'REMOTE';
  hoursWorked: number;
  overtime: number;
}

export interface AdminNotification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface AdminActivity {
  id: string;
  type: 'employee_joined' | 'leave_approved' | 'payroll_generated' | 'hr_added' | 'department_created' | 'system_log';
  title: string;
  description: string;
  timestamp: string;
  user: string;
}

export interface AdminAIInsight {
  id: string;
  icon: string;
  title: string;
  message: string;
  severity: 'info' | 'success' | 'warning' | 'danger';
  category: string;
}

export interface AdminStats {
  totalEmployees: number;
  totalHRManagers: number;
  departments: number;
  openJobs: number;
  pendingLeaveRequests: number;
  monthlyHiring: number;
  attendanceRate: number;
  employeeSatisfaction: number;
  attritionRate: number;
}

export interface EmployeeGrowthData {
  month: string;
  employees: number;
  newHires: number;
}

export interface MonthlyHiringData {
  month: string;
  hired: number;
  target: number;
}

export interface DepartmentDistributionData {
  name: string;
  value: number;
  color: string;
}

export interface AttendanceOverviewData {
  day: string;
  present: number;
  absent: number;
  remote: number;
}

export interface LeaveRequestChartData {
  name: string;
  value: number;
  color: string;
}

export interface RecruitmentPipelineData {
  stage: string;
  count: number;
}

export type AdminRoute =
  | 'dashboard'
  | 'hr-managers'
  | 'employees'
  | 'departments'
  | 'recruitment'
  | 'attendance'
  | 'leave'
  | 'payroll'
  | 'performance'
  | 'learning'
  | 'reports'
  | 'analytics'
  | 'ai-insights'
  | 'settings';
