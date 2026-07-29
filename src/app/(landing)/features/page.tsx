import { PageHeader } from '@/components/common/SectionTitle';
import { CoreFeatures } from '@/components/landing/CoreFeatures';
import { AIFeatures } from '@/components/landing/AIFeatures';
import { CTA } from '@/components/landing/CTA';

export const metadata = { title: 'Features — AI-HRMS' };

export default function FeaturesPage() {
  return (
    <>
      <PageHeader
        title="Everything you need to manage your people"
        description="A complete HR platform with AI built into every workflow — from hiring to retiring."
      />
      <CoreFeatures />
      <AIFeatures />
      <CTA />
    </>
  );
}
