import { z } from 'zod';
export const RecipeSchema = z.object({
  title: z
    .string({
      required_error: 'title is required',
    })
    .min(1, 'title cannot be empty'),
  ingredients: z.array(
    z.object({
      name: z.string(),
      quantity: z.string(),
    })
  ),
  instructions: z.array(z.string()),
  servings: z.number(),
  prepTime: z.string(),
  cookTime: z.string(),
  totalTime: z.string(),
  difficulty: z.string(),
  cuisine: z.string(),
  mealType: z.string(),
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
export type RecipeDTO = z.infer<typeof RecipeWithMetaData>;
export type CreateRecipeDTO = z.infer<typeof RecipeSchema>;

// infer UpdateRecipe from RecipeWithMetaData
export const PartialRecipeSchema = RecipeSchema.partial();
export type UpdateRecipeDTO = z.infer<typeof PartialRecipeSchema>;
