import { getHeroImages } from '@/lib/data';
import { PageHeader, PageHeaderAction } from '@/components/page-header';
import { HeroImagesDataTable } from './data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DbErrorAlert } from '@/components/db-error-alert';

export default async function HeroImagesPage() {
  let data = [];
  let dbError = null;

  try {
    data = await getHeroImages();
  } catch (error) {
    dbError = error;
  }

  return (
    <div>
      <PageHeader title="Hero Images">
        <PageHeaderAction label="Add New Image" href="/hero-images/new" />
      </PageHeader>
      {dbError && <DbErrorAlert error={dbError} />}
      <Card>
        <CardHeader>
            <CardTitle>Manage Hero Section Images</CardTitle>
        </CardHeader>
        <CardContent>
            <HeroImagesDataTable data={data} />
        </CardContent>
      </Card>
    </div>
  );
}
