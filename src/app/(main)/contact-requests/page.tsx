import { getContactRequests } from '@/lib/data';
import { PageHeader } from '@/components/page-header';
import { ContactRequestsDataTable } from './data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DbErrorAlert } from '@/components/db-error-alert';

export default async function ContactRequestsPage() {
  let data = [];
  let dbError = null;

  try {
    data = await getContactRequests();
  } catch (error) {
    dbError = error;
  }

  return (
    <div>
      <PageHeader title="Contact Requests" />
      {dbError && <DbErrorAlert error={dbError} />}
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
