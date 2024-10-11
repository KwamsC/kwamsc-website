import { addPost } from "./paths/posts/addPost";
import { deletePost } from "./paths/posts/deletePost";
import { getAllPosts } from "./paths/posts/getAllPosts";
import { getPostById } from "./paths/posts/getPostById";
import { updatePost } from "./paths/posts/updatePost";
import { addRecipe } from "./paths/recipes/addRecipe";
import { deleteRecipe } from "./paths/recipes/deleteRecipe";
import { getAllRecipes } from "./paths/recipes/getAllRecipes";
import { getRecipeById } from "./paths/recipes/getRecipeById";
import { updateRecipe } from "./paths/recipes/updateRecipe";
import { PartialPostSchema } from "./requests/PartialPostSchema";
import { PartialRecipeSchema } from "./requests/PartialRecipeSchema";
import { PostSchema } from "./requests/PostSchema";
import { RecipeSchema } from "./requests/RecipeSchema";

const apiDocumentation = {
	openapi: "3.1.0",
	info: {
		title: "KwamsC API Docs",
		version: "1.0.0",
		description: "Backend API application for the kwamsc.com website",
		contact: {
			name: "Kwame Carr",
			email: "kwamsc91@gmail.com",
			url: "https://kwamsc.com",
		},
	},
	servers: [
		{
			url: "http://localhost:8080/api/v1",
			description: "Local Server",
		},
		// {
		//   url: 'https://api.mysite.com',
		//   description: 'Production Server',
		// },
	],
	tags: [
		{
			name: "Recipes",
		},
		{
			name: "Posts",
		},
	],
	paths: {
		"/posts": {
			post: addPost,
			get: getAllPosts,
		},
		"/posts/{id}": {
			get: getPostById,
			put: updatePost,
			delete: deletePost,
		},
		"/recipes": {
			post: addRecipe,
			get: getAllRecipes,
		},
		"/recipes/{id}": {
			get: getRecipeById,
			put: updateRecipe,
			delete: deleteRecipe,
		},
	},
	components: {
		securitySchemes: {
			bearerAuth: {
				type: "http",
				scheme: "bearer",
				bearerFormat: "JWT",
			},
		},
		schemas: {
			PostSchema,
			PartialPostSchema,
			RecipeSchema,
			PartialRecipeSchema,
		},
	},
};

export { apiDocumentation };
