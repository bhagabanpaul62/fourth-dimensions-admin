import { HeroImageForm } from '@/components/hero-image-form';
import { PageHeader } from '@/components/page-header';
import { getHeroImageById } from '@/lib/data';
import { notFound } from 'next/navigation';
import { DbErrorAlert } from '@/components/db-error-alert';

export default async function EditHeroImagePage({ params }: { params: { id: string } }) {
  try {
    const heroImage = await getHeroImageById(params.id);

    if (!heroImage) {
      notFound();
    }

    return (
      <div>
        <PageHeader title="Edit Hero Image" />
        <HeroImageForm initialData={heroImage} />
      </div>
    );
  } catch (error) {
    return (
      <div>
        <PageHeader title="Edit Hero Image" />
        <DbErrorAlert error={error} context="load hero image data" />
      </div>
    );
  }
}
