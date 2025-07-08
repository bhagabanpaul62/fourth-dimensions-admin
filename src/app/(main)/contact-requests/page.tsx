import { getContactRequests } from '@/lib/data';
import { PageHeader } from '@/components/page-header';
import { ContactRequestsDataTable } from './data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function ContactRequestsPage() {
  const data = await getContactRequests();

  return (
    <div>
      <PageHeader title="Contact Requests" />
      <Card>
        <CardHeader>
          <CardTitle>View and manage contact form submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <ContactRequestsDataTable data={data} />
        </CardContent>
      </Card>
    </div>
  );
}
