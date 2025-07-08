import { getCategories } from '@/lib/data';
import { PageHeader, PageHeaderAction } from '@/components/page-header';
import { CategoriesDataTable } from '@/components/categories-data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function ConstructionPage() {
  const data = await getCategories('construction');

  return (
    <div>
      <PageHeader title="Construction Categories">
        <PageHeaderAction label="Add New Category" href="/construction/new" />
      </PageHeader>
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
