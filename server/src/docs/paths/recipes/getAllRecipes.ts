import { RecipeResponseSchema } from '../../responses/RecipeResponseSchema';

export const getAllRecipes = {
  tags: ['Recipes'],
  description: 'Get all recipes',
  operationId: 'getAllRecipes',
  parameters: [
    {
      name: 'count',
      in: 'query',
      required: false,
      schema: {
        type: 'integer',
        default: 10,
      },
      description: 'Number of recipes to retrieve',
    },
  ],
  responses: {
    200: {
      description: 'Successful response',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: RecipeResponseSchema,
          },
        },
      },
    },
    500: {
      description: 'Failed to get recipes',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: {
                type: 'string',
                example: 'Failed to get recipes',
              },
            },
          },
        },
      },
    },
  },
};
