'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { saveCategory } from '@/lib/actions';
import { categorySchema } from '@/lib/schemas';
import type { Category, CategoryType } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { AiDescriptionGenerator } from './ai-description-generator';
import { PlusCircle, Trash2 } from 'lucide-react';

type CategoryFormValues = z.infer<typeof categorySchema>;

interface CategoryFormProps {
  categoryType: CategoryType;
  initialData?: Category;
}

export function CategoryForm({ categoryType, initialData }: CategoryFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData || {
      title: '',
      description: '',
      images: [''],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'images',
  });

  const onSubmit = (values: CategoryFormValues) => {
    startTransition(async () => {
      try {
        await saveCategory(categoryType, values);
        toast({
          title: 'Success',
          description: `Category ${initialData ? 'updated' : 'created'} successfully.`,
        });
        router.push(`/${categoryType}`);
      } catch (error: any) {
        toast({
          variant: 'destructive',
          title: `Error ${initialData ? 'updating' : 'creating'} category`,
          description: error.message,
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>{initialData ? 'Edit' : 'Create'} {categoryType}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Modular Kitchen" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Description</FormLabel>
                    <AiDescriptionGenerator
                      onGenerate={(desc) => form.setValue('description', desc, { shouldValidate: true })}
                      disabled={isPending}
                    />
                  </div>
                  <FormControl>
                    <Textarea placeholder="Describe the category..." {...field} className="min-h-[120px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Images</FormLabel>
              <div className="space-y-4 pt-2">
                {fields.map((field, index) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`images.${index}`}
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <img
                            src={field.value || "https://placehold.co/100x100.png"}
                            alt={`Image ${index + 1} preview`}
                            width={64}
                            height={64}
                            className="rounded-md object-cover h-16 w-16"
                            data-ai-hint="interior design"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = 'https://placehold.co/100x100.png';
                            }}
                          />
                          <FormControl>
                            <Input placeholder="https://example.com/image.png" {...field} />
                          </FormControl>
                          <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => append('')}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Image URL
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit" disabled={isPending}>
                {isPending ? (initialData ? 'Saving...' : 'Creating...') : (initialData ? 'Save Changes' : 'Create Category')}
            </Button>
        </div>
      </form>
    </Form>
  );
}
