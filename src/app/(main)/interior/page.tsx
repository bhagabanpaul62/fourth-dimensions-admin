import { getCategories } from '@/lib/data';
import { PageHeader, PageHeaderAction } from '@/components/page-header';
import { CategoriesDataTable } from '@/components/categories-data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DbErrorAlert } from '@/components/db-error-alert';

export default async function InteriorPage() {
  let data = [];
  let dbError = null;

  try {
    data = await getCategories('INTERIOR');
  } catch (error) {
    dbError = error;
  }
  
  return (
    <div>
      <PageHeader title="Interior Categories">
        <PageHeaderAction label="Add New Category" href="/interior/new" />
      </PageHeader>
      {dbError && <DbErrorAlert error={dbError} />}
      <Card>
        <CardHeader>
          <CardTitle>Manage Interior Services</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoriesDataTable data={data} categoryType="INTERIOR" />
        </CardContent>
      </Card>
    </div>
  );
}
