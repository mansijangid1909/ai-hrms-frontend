export type Role =
  | 'SUPER_ADMIN'
  | 'HR_ADMIN'
  | 'RECRUITER'
  | 'MANAGER'
  | 'EMPLOYEE'
  | 'CANDIDATE';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatar?: string;
  department?: string;
  position?: string;
  phone?: string;
  joinDate?: string;
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  department: string;
  position: string;
  employmentType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERN';
  status: 'ACTIVE' | 'ON_LEAVE' | 'PROBATION' | 'TERMINATED';
  joinDate: string;
  salary: number;
  avatar?: string;
  manager?: string;
  address?: string;
  dateOfBirth?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
}

export interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  position: string;
  stage: 'APPLIED' | 'SCREENING' | 'INTERVIEW' | 'OFFER' | 'HIRED' | 'REJECTED';
  source: string;
  rating: number;
  resumeUrl?: string;
  skills: string[];
  experience: number;
  appliedAt: string;
  avatar?: string;
}

export interface Department {
  id: string;
  name: string;
  head: string;
  employeeCount: number;
  budget: number;
  description?: string;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  month: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  tax: number;
  netPay: number;
  status: 'PENDING' | 'PROCESSED' | 'PAID';
  payDate?: string;
}

export interface AttendanceRecord {
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

export interface LeaveRequest {
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

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface JobPosting {
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

export interface Interview {
  id: string;
  candidateId: string;
  candidateName: string;
  position: string;
  date: string;
  time: string;
  interviewer: string;
  round: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  type: 'PHONE' | 'VIDEO' | 'ONSITE';
}

export interface PerformanceReview {
  id: string;
  employeeId: string;
  employeeName: string;
  period: string;
  rating: number;
  goals: number;
  completedGoals: number;
  reviewer: string;
  status: 'DRAFT' | 'IN_PROGRESS' | 'COMPLETED';
}

export interface Course {
  id: string;
  title: string;
  category: string;
  description: string;
  duration: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  enrolled: number;
  completed: number;
  rating: number;
  thumbnail?: string;
}

export interface AnalyticsData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    color?: string;
  }[];
}

export interface ApiError {
  message: string;
  statusCode: number;
  details?: Record<string, string>;
}
