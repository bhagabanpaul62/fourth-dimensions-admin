import { getTestimonials } from '@/lib/data';
import { PageHeader, PageHeaderAction } from '@/components/page-header';
import { TestimonialsDataTable } from './data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function TestimonialsPage() {
  const data = await getTestimonials();

  return (
    <div>
      <PageHeader title="Testimonials">
        <PageHeaderAction label="Add New Testimonial" href="/testimonials/new" />
      </PageHeader>
      <Card>
        <CardHeader>
            <CardTitle>Manage Client Testimonials</CardTitle>
        </CardHeader>
        <CardContent>
            <TestimonialsDataTable data={data} />
        </CardContent>
      </Card>
    </div>
  );
}
