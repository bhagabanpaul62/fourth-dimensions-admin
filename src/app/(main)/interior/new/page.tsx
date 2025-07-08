import { CategoryForm } from '@/components/category-form';
import { PageHeader } from '@/components/page-header';

export default function NewInteriorCategoryPage() {
  return (
    <div>
      <PageHeader title="New Interior Category" />
      <CategoryForm categoryType="interior" />
    </div>
  );
}
