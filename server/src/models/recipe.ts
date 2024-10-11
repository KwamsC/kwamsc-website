interface Ingredient {
  name: string; // Name of the ingredient
  quantity: string; // Quantity of the ingredient (e.g., "1 cup", "2 tablespoons")
}

enum DifficultyLevel {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
}

export interface Recipe {
  id: string; // Unique identifier for the recipe
  title: string; // Title of the recipe
  author: string; // Author of the recipe
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
  published: boolean; // Whether the recipe is published
  createdAt: number; // Date when the recipe was created
  updatedAt: number; // Date when the recipe was updated
  imageUrl?: string; // URL for the recipe image (optional)
}

export interface CreateRecipeDTO {
  id: string; // Unique identifier for the recipe
  title: string; // Title of the recipe
  author: string; // Author of the recipe
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
  published: boolean; // Whether the recipe is published
  imageUrl?: string; // URL for the recipe image (optional)
}

export type UpdateRecipeDTO = Partial<CreateRecipeDTO>;

// const myRecipe: Recipe = {
//   id: '1',
//   title: 'Spaghetti Bolognese',
//   description: 'Classic Italian pasta dish with a rich meat sauce.',
//   ingredients: [
//     { name: 'Spaghetti', quantity: '200g' },
//     { name: 'Ground beef', quantity: '500g' },
//     { name: 'Tomato sauce', quantity: '2 cups' },
//     // Add more ingredients as needed
//   ],
//   instructions: [
//     'Boil water and cook spaghetti according to package instructions.',
//     'In a pan, brown the ground beef.',
//     'Add tomato sauce to the beef and simmer.',
//     // Add more instructions as needed
//   ],
//   servings: 4,
//   prepTime: '15 minutes',
//   cookTime: '30 minutes',
//   totalTime: '45 minutes',
//   difficulty: DifficultyLevel.Medium,
//   cuisine: 'Italian',
//   mealType: 'Dinner',
//   imageUrl: 'https://example.com/spaghetti-bolognese.jpg',
// };
