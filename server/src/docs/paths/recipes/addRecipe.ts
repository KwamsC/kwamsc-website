import { RecipeSchema } from "../../requests/RecipeSchema.ts";

export const addRecipe = {
  tags: ["Recipes"],
  description: "Add a new recipe",
  operationId: "addRecipe",
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: RecipeSchema,
      },
    },
  },
  responses: {
    201: {
      description: "Recipe created successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Recipe created successfully",
              },
            },
          },
        },
      },
    },
    500: {
      description: "Failed to create recipe",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              error: {
                type: "string",
                example: "Failed to create recipe",
              },
            },
          },
        },
      },
    },
  },
};
