import { HeroImageForm } from '@/components/hero-image-form';
import { PageHeader } from '@/components/page-header';

export default function NewHeroImagePage() {
  return (
    <div>
      <PageHeader title="New Hero Image" />
      <HeroImageForm />
    </div>
  );
}
