import { CategoryForm } from '@/components/category-form';
import { PageHeader } from '@/components/page-header';
import { getCategoryById } from '@/lib/data';
import { notFound } from 'next/navigation';
import { DbErrorAlert } from '@/components/db-error-alert';

export default async function EditConstructionCategoryPage({ params }: { params: { id: string } }) {
  try {
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
  } catch (error) {
    return (
      <div>
        <PageHeader title="Edit Construction Category" />
        <DbErrorAlert error={error} context="load category data" />
      </div>
    );
  }
}
