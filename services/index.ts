import { mockRequest } from './mock/helper';
import { mockEmployees, mockCandidates, mockPayroll, mockAttendance, mockLeaveRequests, mockNotifications, mockInterviews, mockJobs, mockPerformanceReviews, mockCourses, mockDepartments, dashboardStats, hiringTrendData, departmentDistribution, attendanceTrendData, payrollTrendData } from './mock/data';
import { Employee, Candidate, PayrollRecord, AttendanceRecord, LeaveRequest, Notification, Interview, JobPosting, PerformanceReview, Course, Department } from '@/types';

export const employeeService = {
  getAll: () => mockRequest(mockEmployees),
  getById: (id: string) => mockRequest(mockEmployees.find((e) => e.id === id) || mockEmployees[0]),
  create: (data: Partial<Employee>) => mockRequest({ ...data, id: 'e' + Date.now() }),
  update: (id: string, data: Partial<Employee>) => mockRequest({ ...mockEmployees[0], ...data, id }),
  delete: (id: string) => mockRequest({ success: true, id }),
};

export const candidateService = {
  getAll: () => mockRequest(mockCandidates),
  getById: (id: string) => mockRequest(mockCandidates.find((c) => c.id === id) || mockCandidates[0]),
  create: (data: Partial<Candidate>) => mockRequest({ ...data, id: 'c' + Date.now() }),
  update: (id: string, data: Partial<Candidate>) => mockRequest({ ...mockCandidates[0], ...data, id }),
};

export const payrollService = {
  getAll: () => mockRequest(mockPayroll),
  getById: (id: string) => mockRequest(mockPayroll.find((p) => p.id === id) || mockPayroll[0]),
  process: (id: string) => mockRequest({ ...mockPayroll[0], id, status: 'PROCESSED' }),
};

export const attendanceService = {
  getAll: () => mockRequest(mockAttendance),
  getLeaveRequests: () => mockRequest(mockLeaveRequests),
  approveLeave: (id: string) => mockRequest({ ...mockLeaveRequests[0], id, status: 'APPROVED' }),
  rejectLeave: (id: string) => mockRequest({ ...mockLeaveRequests[0], id, status: 'REJECTED' }),
};

export const analyticsService = {
  getDashboardStats: () => mockRequest(dashboardStats),
  getHiringTrends: () => mockRequest(hiringTrendData),
  getDepartmentDistribution: () => mockRequest(departmentDistribution),
  getAttendanceTrends: () => mockRequest(attendanceTrendData),
  getPayrollTrends: () => mockRequest(payrollTrendData),
};

export const chatbotService = {
  sendMessage: (message: string) =>
    mockRequest({
      response: `I understand you're asking about "${message}". Based on company policy, here's what I found: This is a simulated AI response from the HR assistant. In production, this would connect to an LLM with access to your employee handbook, policies, and HR knowledge base.`,
      suggestions: ['How many vacation days do I have?', 'What is the remote work policy?', 'How do I request leave?'],
    }, 600),
};

export const notificationService = {
  getAll: () => mockRequest(mockNotifications),
  markAsRead: (id: string) => mockRequest({ success: true, id }),
};

export const interviewService = {
  getAll: () => mockRequest(mockInterviews),
  create: (data: Partial<Interview>) => mockRequest({ ...data, id: 'i' + Date.now() }),
};

export const jobService = {
  getAll: () => mockRequest(mockJobs),
  create: (data: Partial<JobPosting>) => mockRequest({ ...data, id: 'j' + Date.now() }),
};

export const performanceService = {
  getAll: () => mockRequest(mockPerformanceReviews),
};

export const learningService = {
  getCourses: () => mockRequest(mockCourses),
};

export const departmentService = {
  getAll: () => mockRequest(mockDepartments),
};
