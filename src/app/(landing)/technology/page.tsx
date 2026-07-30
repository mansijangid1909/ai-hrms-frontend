import { PageHeader } from '@/components/common/SectionTitle';
import { TechnologyStack } from '@/components/landing/TechnologyStack';
import { CTA } from '@/components/landing/CTA';

export const metadata = { title: 'Technology — AI-HRMS' };

export default function TechnologyPage() {
  return (
    <>
      <PageHeader
        title="Built on a modern, scalable foundation"
        description="Enterprise-grade architecture with Next.js, TypeScript, AI models, and bank-grade security."
      />
      <TechnologyStack />
      <CTA />
    </>
  );
}
