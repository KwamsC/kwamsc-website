import { addPost } from "./paths/posts/addPost.ts";
import { deletePost } from "./paths/posts/deletePost.ts";
import { getAllPosts } from "./paths/posts/getAllPosts.ts";
import { getPostById } from "./paths/posts/getPostById.ts";
import { updatePost } from "./paths/posts/updatePost.ts";
import { addRecipe } from "./paths/recipes/addRecipe.ts";
import { deleteRecipe } from "./paths/recipes/deleteRecipe.ts";
import { getAllRecipes } from "./paths/recipes/getAllRecipes.ts";
import { getRecipeById } from "./paths/recipes/getRecipeById.ts";
import { updateRecipe } from "./paths/recipes/updateRecipe.ts";
import { PartialPostSchema } from "./requests/PartialPostSchema.ts";
import { PartialRecipeSchema } from "./requests/PartialRecipeSchema.ts";
import { PostSchema } from "./requests/PostSchema.ts";
import { RecipeSchema } from "./requests/RecipeSchema.ts";

const apiDocumentation = {
  openapi: "3.1.0",
  info: {
    title: "KwamsC API Docs",
    version: "1.0.0",
    description: "Backend API application for the kwamsc.com website",
    contact: {
      name: "Kwame Carr",
      url: "https://kwamsc.com",
    },
  },
  servers: [
    {
      url: "http://localhost:8080/api/v1",
      description: "Local Server",
    },
    {
      url: "https://api.kwamsc.com/api/v1",
      description: "Production Server",
    },
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
