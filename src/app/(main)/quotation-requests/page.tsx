import { getQuotationRequests } from '@/lib/data';
import { PageHeader } from '@/components/page-header';
import { QuotationRequestsDataTable } from './data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function QuotationRequestsPage() {
  const data = await getQuotationRequests();

  return (
    <div>
      <PageHeader title="Quotation Requests" />
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
