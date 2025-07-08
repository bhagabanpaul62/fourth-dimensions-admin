import { TestimonialForm } from '@/components/testimonial-form';
import { PageHeader } from '@/components/page-header';
import { getTestimonialById } from '@/lib/data';
import { notFound } from 'next/navigation';
import { DbErrorAlert } from '@/components/db-error-alert';

export default async function EditTestimonialPage({ params }: { params: { id: string } }) {
  try {
    const testimonial = await getTestimonialById(params.id);

    if (!testimonial) {
      notFound();
    }

    return (
      <div>
        <PageHeader title="Edit Testimonial" />
        <TestimonialForm initialData={testimonial} />
      </div>
    );
  } catch (error) {
    return (
      <div>
        <PageHeader title="Edit Testimonial" />
        <DbErrorAlert error={error} context="load testimonial data" />
      </div>
    );
  }
}
