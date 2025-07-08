'use server';

/**
 * @fileOverview AI-powered content generation for category descriptions.
 *
 * - generateCategoryDescription - A function that generates content for category descriptions using AI.
 * - GenerateCategoryDescriptionInput - The input type for the generateCategoryDescription function.
 * - GenerateCategoryDescriptionOutput - The return type for the generateCategoryDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCategoryDescriptionInputSchema = z.object({
  keywords: z
    .string()
    .describe('Keywords to guide the content generation for the category description.'),
});
export type GenerateCategoryDescriptionInput = z.infer<
  typeof GenerateCategoryDescriptionInputSchema
>;

const GenerateCategoryDescriptionOutputSchema = z.object({
  description: z
    .string()
    .describe('The generated content for the category description.'),
});
export type GenerateCategoryDescriptionOutput = z.infer<
  typeof GenerateCategoryDescriptionOutputSchema
>;

export async function generateCategoryDescription(
  input: GenerateCategoryDescriptionInput
): Promise<GenerateCategoryDescriptionOutput> {
  return generateCategoryDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCategoryDescriptionPrompt',
  input: {schema: GenerateCategoryDescriptionInputSchema},
  output: {schema: GenerateCategoryDescriptionOutputSchema},
  prompt: `You are an expert content writer specializing in creating engaging descriptions for interior design and construction service categories.

  Based on the provided keywords, generate a compelling and informative description for the category.  Make a determination of how to integrate them naturally into the description.

  Keywords: {{{keywords}}}`,
});

const generateCategoryDescriptionFlow = ai.defineFlow(
  {
    name: 'generateCategoryDescriptionFlow',
    inputSchema: GenerateCategoryDescriptionInputSchema,
    outputSchema: GenerateCategoryDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
