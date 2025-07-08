import { TestimonialForm } from '@/components/testimonial-form';
import { PageHeader } from '@/components/page-header';

export default function NewTestimonialPage() {
  return (
    <div>
      <PageHeader title="New Testimonial" />
      <TestimonialForm />
    </div>
  );
}
