import { RecipeResponseSchema } from "../../responses/RecipeResponseSchema.ts";

export const getRecipeById = {
  tags: ["Recipes"],
  description: "Get a recipe by ID",
  operationId: "getRecipeById",
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: {
        type: "string",
      },
      description: "ID of the recipe to retrieve",
    },
  ],
  responses: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          schema: RecipeResponseSchema,
        },
      },
    },
    404: {
      description: "Recipe with given ID not found",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Recipe with given ID not found",
              },
            },
          },
        },
      },
    },
    500: {
      description: "Failed to get recipe",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              error: {
                type: "string",
                example: "Failed to get recipe",
              },
            },
          },
        },
      },
    },
  },
};
