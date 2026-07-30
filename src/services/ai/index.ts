// AI service — in production, this would proxy to an LLM endpoint.
import { mockRequest } from '../mock/helper';

export const aiService = {
  parseResume: (file: string) => mockRequest({
    skills: ['React', 'TypeScript', 'Node.js'],
    experience: 5,
    education: 'B.S. Computer Science',
    matchScore: 87,
  }, 800),

  matchCandidate: (candidateId: string, jobId: string) => mockRequest({
    candidateId,
    jobId,
    matchScore: 92,
    reasons: ['Skills match 95%', 'Experience exceeds requirement', 'Location match'],
  }, 600),

  predictAttrition: (employeeId: string) => mockRequest({
    employeeId,
    riskLevel: 'MEDIUM',
    riskScore: 42,
    factors: ['No promotion in 2 years', 'Compensation below market median'],
  }, 700),

  generateInterviewQuestions: (position: string) => mockRequest({
    position,
    questions: [
      'Tell me about your experience with React.',
      'How do you handle state management in large applications?',
      'Describe a challenging bug you solved recently.',
    ],
  }, 500),
};
