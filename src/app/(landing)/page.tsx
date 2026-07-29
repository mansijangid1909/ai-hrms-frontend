import { Hero } from '@/components/landing/Hero';
import { TrustedCompanies } from '@/components/landing/TrustedCompanies';
import { ProblemStatement } from '@/components/landing/ProblemStatement';
import { EmployeeLifecycle } from '@/components/landing/EmployeeLifecycle';
import { CoreFeatures } from '@/components/landing/CoreFeatures';
import { AIFeatures } from '@/components/landing/AIFeatures';
import { TechnologyStack } from '@/components/landing/TechnologyStack';
import { BusinessBenefits } from '@/components/landing/BusinessBenefits';
import { WorkflowTimeline } from '@/components/landing/WorkflowTimeline';
import { Testimonials } from '@/components/landing/Testimonials';
import { Pricing } from '@/components/landing/Pricing';
import { FAQ } from '@/components/landing/FAQ';
import { CTA } from '@/components/landing/CTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedCompanies />
      <ProblemStatement />
      <EmployeeLifecycle />
      <CoreFeatures />
      <AIFeatures />
      <TechnologyStack />
      <BusinessBenefits />
      <WorkflowTimeline />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
    </>
  );
}
