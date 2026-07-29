import { PageHeader } from '@/components/common/SectionTitle';
import { Contact } from '@/components/landing/Contact';

export const metadata = { title: 'Contact — AI-HRMS' };

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Get in touch"
        description="Have a question? Want a demo? Need a custom plan? We'd love to hear from you."
      />
      <Contact />
    </>
  );
}
