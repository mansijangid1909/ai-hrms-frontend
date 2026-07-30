import { z } from 'zod';

export const adminEmployeeSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(7, 'Phone number is required'),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER'], { required_error: 'Please select gender' }),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  department: z.string().min(1, 'Please select a department'),
  designation: z.string().min(1, 'Designation is required'),
  employmentType: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERN'], { required_error: 'Please select employment type' }),
  joinDate: z.string().min(1, 'Joining date is required'),
  reportingManager: z.string().min(1, 'Reporting manager is required'),
  workMode: z.enum(['REMOTE', 'HYBRID', 'ONSITE'], { required_error: 'Please select work mode' }),
  country: z.string().min(1, 'Country is required'),
  state: z.string().min(1, 'State is required'),
  city: z.string().min(1, 'City is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  address: z.string().min(5, 'Address is required'),
  skills: z.string().optional(),
  emergencyContact: z.string().optional(),
  sendInvitation: z.boolean().optional(),
});

export type AdminEmployeeForm = z.infer<typeof adminEmployeeSchema>;

export const adminDepartmentSchema = z.object({
  name: z.string().min(2, 'Department name is required'),
  head: z.string().min(2, 'Department head is required'),
  description: z.string().optional(),
  budget: z.number().min(0, 'Budget must be positive'),
});

export type AdminDepartmentForm = z.infer<typeof adminDepartmentSchema>;
