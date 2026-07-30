import { mockRequest } from '../mock/helper';
import { User, Role } from '@/types';

const mockUser: User = {
  id: 'u1',
  email: 'admin@aihrms.com',
  name: 'Alex Morgan',
  role: 'HR_ADMIN',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
  department: 'Human Resources',
  position: 'HR Director',
};

export const authService = {
  login: async (email: string, _password: string) => {
    const role: Role = email.includes('admin') ? 'SUPER_ADMIN' : email.includes('recruit') ? 'RECRUITER' : email.includes('manager') ? 'MANAGER' : email.includes('candidate') ? 'CANDIDATE' : email.includes('employee') ? 'EMPLOYEE' : 'HR_ADMIN';
    const user = { ...mockUser, email, role };
    return mockRequest({
      user,
      accessToken: 'mock-access-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now(),
    });
  },
  register: (data: { firstName: string; lastName: string; email: string; password: string }) =>
    mockRequest({
      user: { ...mockUser, ...data, name: `${data.firstName} ${data.lastName}`, role: 'EMPLOYEE' as Role },
      accessToken: 'mock-access-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now(),
    }),
  forgotPassword: (email: string) => mockRequest({ success: true, email }),
  resetPassword: (_password: string) => mockRequest({ success: true }),
  verifyEmail: (token: string) => mockRequest({ success: true, token }),
  verifyOtp: (otp: string) => mockRequest({ success: true, otp }),
  me: () => mockRequest(mockUser),
  logout: () => mockRequest({ success: true }),
};
