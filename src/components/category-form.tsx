"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { saveCategory } from "@/lib/actions";
import { categorySchema } from "@/lib/schemas";
import type { Category, CategoryType } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { AiDescriptionGenerator } from "./ai-description-generator";
import { PlusCircle, Trash2 } from "lucide-react";

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
    defaultValues: initialData
      ? {
          ...initialData,
          type: initialData.type.toUpperCase() as "INTERIOR" | "CONSTRUCTION",
        }
      : {
          title: "",
          description: "",
          images: [""],
          category: "",
          type: categoryType,
        },
  });

  // No need for useFieldArray since we're handling images as a simple array

  const onSubmit = (values: CategoryFormValues) => {
    startTransition(async () => {
      try {
        const payload = {
          ...values,
          type: categoryType.toUpperCase() as "INTERIOR" | "CONSTRUCTION",
        };
        await saveCategory(categoryType, payload);
        toast({
          title: "Success",
          description: `Category ${
            initialData ? "updated" : "created"
          } successfully.`,
        });
        router.push(`/${categoryType.toLowerCase()}`);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: `Error ${initialData ? "updating" : "creating"} category`,
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
            <CardTitle>
              {initialData ? "Edit" : "Create"} {categoryType}
            </CardTitle>
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
                      onGenerate={(desc) =>
                        form.setValue("description", desc, {
                          shouldValidate: true,
                        })
                      }
                      disabled={isPending}
                    />
                  </div>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the category..."
                      {...field}
                      className="min-h-[120px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub Category</FormLabel>
                  <FormControl>
                    <select
                      className="border px-3 py-2 rounded-md text-sm bg-white"
                      {...field}
                    >
                      <option value="">Select a category</option>
                      <option value="HOUSES">Houses</option>
                      <option value="APARTMENT">Apartment</option>
                      <option value="RESTAURANT">Restaurant</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <div className="space-y-4">
                    <div className="flex flex-col gap-4">
                      {field.value.map((image, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <img
                            src={image || "https://placehold.co/100x100.png"}
                            alt={`Image ${index + 1} preview`}
                            width={64}
                            height={64}
                            className="rounded-md object-cover h-16 w-16"
                            data-ai-hint="interior design"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = "https://placehold.co/100x100.png";
                            }}
                          />
                          <FormControl>
                            <Input
                              placeholder="https://example.com/image.png"
                              value={image}
                              onChange={(e) => {
                                const newImages = [...field.value];
                                newImages[index] = e.target.value;
                                field.onChange(newImages);
                              }}
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const newImages = [...field.value];
                              newImages.splice(index, 1);
                              field.onChange(newImages);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove image</span>
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => field.onChange([...field.value, ""])}
                      >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Image URL
                      </Button>
                    </div>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending
              ? initialData
                ? "Saving..."
                : "Creating..."
              : initialData
              ? "Save Changes"
              : "Create Category"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
