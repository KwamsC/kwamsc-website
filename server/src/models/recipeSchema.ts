import { z } from 'zod';
export const RecipeSchema = z.object({
  title: z.string({
    required_error: 'title is required'
  })
  .min(1, 'title cannot be empty'),
  content: z.string(),
  author: z.string({
    required_error: 'name is required',
  }).min(1, 'author cannot be empty'),
  tags: z.array(z.string()),
  published: z.boolean(),
  imageUrl: z.string().optional(),
});

// define a schema for Post with metadata
const HasRecipeMetaData = z.object({ 
  id: z.string(),
  updatedAt: z.number(),
  createdAt: z.number(),
});


// merge HasRecipeMetaData with RecipeSchema
const RecipeWithMetaData = RecipeSchema.merge(HasRecipeMetaData);

// infer CreateRecipe from RecipeWithMetaData
export type Recipe = z.infer<typeof RecipeWithMetaData>;
export type CreateRecipeDTO = z.infer<typeof RecipeSchema>;

// infer UpdateRecipe from RecipeWithMetaData
export const PartialRecipeSchema = RecipeSchema.partial();
export type UpdateRecipeDTO = z.infer<typeof PartialRecipeSchema>;