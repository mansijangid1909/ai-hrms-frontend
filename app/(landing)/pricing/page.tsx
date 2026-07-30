import { PageHeader } from '@/components/common/SectionTitle';
import { Pricing } from '@/components/landing/Pricing';
import { FAQ } from '@/components/landing/FAQ';
import { CTA } from '@/components/landing/CTA';

export const metadata = { title: 'Pricing — AI-HRMS' };

export default function PricingPage() {
  return (
    <>
      <PageHeader
        title="Pricing that scales with you"
        description="Start free. Upgrade when you grow. No hidden fees, no surprises."
      />
      <Pricing />
      <FAQ />
      <CTA />
    </>
  );
}
