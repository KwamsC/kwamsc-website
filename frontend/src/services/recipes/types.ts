export type RecipeDTO = {
	id: string;
	title: string;
	ingredients: {
		name: string;
		quantity: string;
	}[];
	instructions: string[];
	servings: number;
	prepTime: string;
	cookTime: string;
	totalTime: string;
	difficulty: string;
	cuisine: string;
	mealType: string;
	description: string;
	updatedAt?: string;
	createdAt: string;
};

export type createRecipeDTO = {
	title: string;
	ingredients: {
		name: string;
		quantity: string;
	}[];
	instructions: string[];
	servings: number;
	prepTime: string;
	cookTime: string;
	totalTime: string;
	difficulty: string;
	cuisine: string;
	mealType: string;
	description: string;
	imageUrl?: string | undefined;
};
