import { HeroImageForm } from '@/components/hero-image-form';
import { PageHeader } from '@/components/page-header';
import { getHeroImageById } from '@/lib/data';
import { notFound } from 'next/navigation';

export default async function EditHeroImagePage({ params }: { params: { id: string } }) {
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
}
