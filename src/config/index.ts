import { API_CONFIG, STORAGE_KEYS, THEME_CONFIG } from '@//constants';

export const appConfig = {
  name: 'AI-HRMS',
  description: 'AI-Powered Human Resource Management System',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  api: API_CONFIG,
  storage: STORAGE_KEYS,
  theme: THEME_CONFIG,
  features: {
    aiChatbot: true,
    analytics: true,
    recruitment: true,
    payroll: true,
    learning: true,
  },
} as const;

export default appConfig;
