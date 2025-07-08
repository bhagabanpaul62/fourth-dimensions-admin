import { getQuotationRequests } from '@/lib/data';
import { PageHeader } from '@/components/page-header';
import { QuotationRequestsDataTable } from './data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DbErrorAlert } from '@/components/db-error-alert';

export default async function QuotationRequestsPage() {
  let data = [];
  let dbError = null;
  
  try {
    data = await getQuotationRequests();
  } catch (error) {
    dbError = error;
  }

  return (
    <div>
      <PageHeader title="Quotation Requests" />
      {dbError && <DbErrorAlert error={dbError} />}
      <Card>
        <CardHeader>
          <CardTitle>View and manage quotation form submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <QuotationRequestsDataTable data={data} />
        </CardContent>
      </Card>
    </div>
  );
}
