import { CategoryForm } from '@/components/category-form';
import { PageHeader } from '@/components/page-header';
import { getCategoryById } from '@/lib/data';
import { notFound } from 'next/navigation';

export default async function EditConstructionCategoryPage({ params }: { params: { id: string } }) {
  const category = await getCategoryById('construction', params.id);

  if (!category) {
    notFound();
  }

  return (
    <div>
      <PageHeader title="Edit Construction Category" />
      <CategoryForm categoryType="construction" initialData={category} />
    </div>
  );
}
