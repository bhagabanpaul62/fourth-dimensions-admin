import { getHeroImages } from '@/lib/data';
import { PageHeader, PageHeaderAction } from '@/components/page-header';
import { HeroImagesDataTable } from './data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function HeroImagesPage() {
  const data = await getHeroImages();

  return (
    <div>
      <PageHeader title="Hero Images">
        <PageHeaderAction label="Add New Image" href="/hero-images/new" />
      </PageHeader>
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
