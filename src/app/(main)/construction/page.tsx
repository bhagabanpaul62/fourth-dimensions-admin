import { getCategories } from '@/lib/data';
import { PageHeader, PageHeaderAction } from '@/components/page-header';
import { CategoriesDataTable } from '@/components/categories-data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DbErrorAlert } from '@/components/db-error-alert';

export default async function ConstructionPage() {
  let data = [];
  let dbError = null;

  try {
    data = await getCategories('construction');
  } catch (error) {
    dbError = error;
  }

  return (
    <div>
      <PageHeader title="Construction Categories">
        <PageHeaderAction label="Add New Category" href="/construction/new" />
      </PageHeader>
      {dbError && <DbErrorAlert error={dbError} />}
      <Card>
        <CardHeader>
            <CardTitle>Manage Construction Services</CardTitle>
        </CardHeader>
        <CardContent>
            <CategoriesDataTable data={data} categoryType="construction" />
        </CardContent>
      </Card>
    </div>
  );
}
