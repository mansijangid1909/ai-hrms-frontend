import { PageHeader } from '@/components/common/SectionTitle';
import { EmployeeLifecycle } from '@/components/landing/EmployeeLifecycle';
import { BusinessBenefits } from '@/components/landing/BusinessBenefits';
import { WorkflowTimeline } from '@/components/landing/WorkflowTimeline';
import { CTA } from '@/components/landing/CTA';

export const metadata = { title: 'Solutions — AI-HRMS' };

export default function SolutionsPage() {
  return (
    <>
      <PageHeader
        title="Solutions for every HR challenge"
        description="From recruitment bottlenecks to compliance headaches, AI-HRMS solves the hardest HR problems."
      />
      <EmployeeLifecycle />
      <WorkflowTimeline />
      <BusinessBenefits />
      <CTA />
    </>
  );
}
