'use server';

/**
 * @fileOverview AI-powered content suggestion for category descriptions.
 *
 * - suggestCategoryDescription - A function that suggests content for category descriptions using AI.
 * - SuggestCategoryDescriptionInput - The input type for the suggestCategoryDescription function.
 * - SuggestCategoryDescriptionOutput - The return type for the suggestCategoryDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestCategoryDescriptionInputSchema = z.object({
  keywords: z
    .string()
    .describe(
      'Keywords to guide the content suggestion for the category description.'
    ),
});
export type SuggestCategoryDescriptionInput = z.infer<
  typeof SuggestCategoryDescriptionInputSchema
>;

const SuggestCategoryDescriptionOutputSchema = z.object({
  description: z
    .string()
    .describe('The suggested content for the category description.'),
});
export type SuggestCategoryDescriptionOutput = z.infer<
  typeof SuggestCategoryDescriptionOutputSchema
>;

export async function suggestCategoryDescription(
  input: SuggestCategoryDescriptionInput
): Promise<SuggestCategoryDescriptionOutput> {
  return suggestCategoryDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestCategoryDescriptionPrompt',
  input: {schema: SuggestCategoryDescriptionInputSchema},
  output: {schema: SuggestCategoryDescriptionOutputSchema},
  prompt: `You are an expert content writer specializing in creating engaging descriptions for interior design and construction service categories.

  Based on the provided keywords, suggest compelling and informative content for the category description. Make a determination of how to integrate them naturally into the description. The tool will determine whether and how to integrate them. Limit the description to 150 words.

  Keywords: {{{keywords}}}`,
});

const suggestCategoryDescriptionFlow = ai.defineFlow(
  {
    name: 'suggestCategoryDescriptionFlow',
    inputSchema: SuggestCategoryDescriptionInputSchema,
    outputSchema: SuggestCategoryDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
