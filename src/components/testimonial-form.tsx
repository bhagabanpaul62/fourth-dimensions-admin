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
import { Textarea } from '@/components/ui/textarea';
import { saveTestimonial } from '@/lib/actions';
import { testimonialSchema } from '@/lib/schemas';
import type { Testimonial } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type TestimonialFormValues = z.infer<typeof testimonialSchema>;

interface TestimonialFormProps {
  initialData?: Testimonial;
}

export function TestimonialForm({ initialData }: TestimonialFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          mediaUrl: initialData.mediaUrl || '',
        }
      : {
          clientName: '',
          location: '',
          content: '',
          mediaType: undefined,
          mediaUrl: '',
          displayOrder: 0,
          isActive: true,
        },
  });

  const onSubmit = (values: TestimonialFormValues) => {
    startTransition(async () => {
      try {
        await saveTestimonial(values);
        toast({
          title: 'Success',
          description: `Testimonial ${initialData ? 'updated' : 'created'} successfully.`,
        });
        router.push(`/testimonials`);
      } catch (error: any) {
        toast({
          variant: 'destructive',
          title: `Error ${initialData ? 'updating' : 'creating'} testimonial`,
          description: error.message,
        });
      }
    });
  };

  const mediaUrl = form.watch('mediaUrl');
  const mediaType = form.watch('mediaType');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{initialData ? 'Edit' : 'Create'} Testimonial</CardTitle>
                <CardDescription>Fill in the details for the client testimonial.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="clientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location / Project</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Plutus Residence, Chennai" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Write the testimonial content here..." {...field} className="min-h-[120px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="space-y-4 rounded-md border p-4">
                  <FormLabel>Media (Optional)</FormLabel>
                  {mediaType === 'image' && mediaUrl && (
                     <img
                        src={mediaUrl}
                        alt="Image preview"
                        width={100}
                        height={100}
                        className="rounded-md object-cover h-24 w-24"
                        data-ai-hint="person avatar"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                        }}
                        onLoad={(e) => {
                            e.currentTarget.style.display = 'block';
                        }}
                        />
                  )}
                  <FormField
                    control={form.control}
                    name="mediaType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Media Type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="image" />
                              </FormControl>
                              <FormLabel className="font-normal">Image</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="video" />
                              </FormControl>
                              <FormLabel className="font-normal">Video</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mediaUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Media URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/media.png" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
             <Card>
                <CardHeader>
                    <CardTitle>Display Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
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
                                    Show this testimonial on the website.
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
          </div>
        </div>

        <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit" disabled={isPending}>
                {isPending ? (initialData ? 'Saving...' : 'Creating...') : (initialData ? 'Save Changes' : 'Create Testimonial')}
            </Button>
        </div>
      </form>
    </Form>
  );
}
