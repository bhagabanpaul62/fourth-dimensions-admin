'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { saveHeroImage } from '@/lib/actions';
import { heroImageSchema } from '@/lib/schemas';
import type { HeroImage } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';

type HeroImageFormValues = z.infer<typeof heroImageSchema>;

interface HeroImageFormProps {
  initialData?: HeroImage;
}

export function HeroImageForm({ initialData }: HeroImageFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<HeroImageFormValues>({
    resolver: zodResolver(heroImageSchema),
    defaultValues: initialData || {
        title: '',
        imageUrl: '',
        displayOrder: 0,
        isActive: true,
      },
  });

  const onSubmit = (values: HeroImageFormValues) => {
    startTransition(async () => {
      await saveHeroImage(values);
      toast({
        title: 'Success',
        description: `Hero Image ${initialData ? 'updated' : 'created'} successfully.`,
      });
      router.push(`/hero-images`);
      router.refresh();
    });
  };

  const imageUrl = form.watch('imageUrl');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>{initialData ? 'Edit' : 'Add'} Hero Image</CardTitle>
            <CardDescription>Upload and manage images for the website's hero section.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Main Banner" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.png" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {imageUrl && (
                <div className="space-y-2">
                    <FormLabel>Image Preview</FormLabel>
                    <img
                        src={imageUrl}
                        alt="Image preview"
                        className="rounded-md object-cover w-full max-w-sm"
                        data-ai-hint="website banner"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                        }}
                        onLoad={(e) => {
                            e.currentTarget.style.display = 'block';
                        }}
                    />
                </div>
            )}
            
            <FormField
              control={form.control}
              name="displayOrder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Order</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                        <FormLabel>Active</FormLabel>
                        <CardDescription>
                            Show this image in the hero section.
                        </CardDescription>
                    </div>
                    <FormControl>
                        <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        />
                    </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit" disabled={isPending}>
                {isPending ? (initialData ? 'Saving...' : 'Creating...') : (initialData ? 'Save Changes' : 'Create Image')}
            </Button>
        </div>
      </form>
    </Form>
  );
}
