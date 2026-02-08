//services/index.ts
import recipeController from "./recipes";
import postsController from "./posts";

export const API = {
	recipes: recipeController,
	posts: postsController,
};
