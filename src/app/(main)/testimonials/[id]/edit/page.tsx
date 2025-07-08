import { TestimonialForm } from '@/components/testimonial-form';
import { PageHeader } from '@/components/page-header';
import { getTestimonialById } from '@/lib/data';
import { notFound } from 'next/navigation';

export default async function EditTestimonialPage({ params }: { params: { id: string } }) {
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
}
