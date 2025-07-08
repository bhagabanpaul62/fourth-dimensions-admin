import { CategoryForm } from '@/components/category-form';
import { PageHeader } from '@/components/page-header';
import { getCategoryById } from '@/lib/data';
import { notFound } from 'next/navigation';

export default async function EditInteriorCategoryPage({ params }: { params: { id: string } }) {
  const category = await getCategoryById('interior', params.id);

  if (!category) {
    notFound();
  }

  return (
    <div>
      <PageHeader title="Edit Interior Category" />
      <CategoryForm categoryType="interior" initialData={category} />
    </div>
  );
}
