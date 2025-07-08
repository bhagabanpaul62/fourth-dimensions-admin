import { getCategories } from '@/lib/data';
import { PageHeader, PageHeaderAction } from '@/components/page-header';
import { CategoriesDataTable } from '@/components/categories-data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function InteriorPage() {
  const data = await getCategories('interior');

  return (
    <div>
      <PageHeader title="Interior Categories">
        <PageHeaderAction label="Add New Category" href="/interior/new" />
      </PageHeader>
      <Card>
        <CardHeader>
          <CardTitle>Manage Interior Services</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoriesDataTable data={data} categoryType="interior" />
        </CardContent>
      </Card>
    </div>
  );
}
