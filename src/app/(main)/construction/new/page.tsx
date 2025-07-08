import { CategoryForm } from '@/components/category-form';
import { PageHeader } from '@/components/page-header';

export default function NewConstructionCategoryPage() {
  return (
    <div>
      <PageHeader title="New Construction Category" />
      <CategoryForm categoryType="construction" />
    </div>
  );
}
