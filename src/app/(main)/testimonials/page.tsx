import { getTestimonials } from '@/lib/data';
import { PageHeader, PageHeaderAction } from '@/components/page-header';
import { TestimonialsDataTable } from './data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DbErrorAlert } from '@/components/db-error-alert';

export default async function TestimonialsPage() {
  let data = [];
  let dbError = null;

  try {
    data = await getTestimonials();
  } catch (error) {
    dbError = error;
  }

  return (
    <div>
      <PageHeader title="Testimonials">
        <PageHeaderAction label="Add New Testimonial" href="/testimonials/new" />
      </PageHeader>
      {dbError && <DbErrorAlert error={dbError} />}
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
