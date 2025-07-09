import { CategoryForm } from '@/components/category-form';
import { PageHeader } from '@/components/page-header';
import { getCategoryById } from '@/lib/data';
import { notFound } from 'next/navigation';
import { DbErrorAlert } from '@/components/db-error-alert';

export default async function EditInteriorCategoryPage({ params }: { params: { id: string } }) {
  try {
    const category = await getCategoryById('INTERIOR', params.id);

    if (!category) {
      notFound();
    }

    return (
      <div>
        <PageHeader title="Edit Interior Category" />
        <CategoryForm categoryType="interior" initialData={category} />
      </div>
    );
  } catch (error) {
    return (
      <div>
        <PageHeader title="Edit Interior Category" />
        <DbErrorAlert error={error} context="load category data" />
      </div>
    );
  }
}
