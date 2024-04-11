interface Ingredient {
  name: string; // Name of the ingredient
  quantity: string; // Quantity of the ingredient (e.g., "1 cup", "2 tablespoons")
}

enum DifficultyLevel {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}

export interface Recipe {
  id: string; // Unique identifier for the recipe
  title: string; // Title of the recipe
  description: string; // Brief description of the recipe
  ingredients: Ingredient[]; // Array of ingredients
  instructions: string[]; // Array of cooking instructions
  servings: number; // Number of servings the recipe yields
  prepTime: string; // Preparation time (e.g., "30 minutes")
  cookTime: string; // Cooking time (e.g., "1 hour")
  totalTime: string; // Total time (prepTime + cookTime)
  difficulty: DifficultyLevel; // Difficulty level of the recipe
  cuisine: string; // Cuisine type (e.g., "Italian", "Mexican")
  mealType: string; // Meal type (e.g., "Breakfast", "Dinner")
  updatedAt?: number | null;
  createdAt: number;
  imageUrl?: string; // URL for the recipe image (optional)
}

export interface CreateRecipeDTO {
  title: string; // Title of the recipe
  description: string; // Brief description of the recipe
  ingredients: Ingredient[]; // Array of ingredients
  instructions: string[]; // Array of cooking instructions
  servings: number; // Number of servings the recipe yields
  prepTime: string; // Preparation time (e.g., "30 minutes")
  cookTime: string; // Cooking time (e.g., "1 hour")
  totalTime: string; // Total time (prepTime + cookTime)
  difficulty: DifficultyLevel; // Difficulty level of the recipe
  cuisine: string; // Cuisine type (e.g., "Italian", "Mexican")
  mealType: string; // Meal type (e.g., "Breakfast", "Dinner")
  imageUrl: string; // URL for the recipe image (optional)
}

export interface UpdateRecipeDTO {
  title?: string; // Title of the recipe
  description?: string; // Brief description of the recipe
  ingredients?: Ingredient[]; // Array of ingredients
  instructions?: string[]; // Array of cooking instructions
  servings?: number; // Number of servings the recipe yields
  prepTime?: string; // Preparation time (e.g., "30 minutes")
  cookTime?: string; // Cooking time (e.g., "1 hour")
  totalTime?: string; // Total time (prepTime + cookTime)
  difficulty?: DifficultyLevel; // Difficulty level of the recipe
  cuisine?: string; // Cuisine type (e.g., "Italian", "Mexican")
  mealType?: string; // Meal type (e.g., "Breakfast", "Dinner")
  imageUrl?: string; // URL for the recipe image (optional)
}
