export const deleteRecipe = {
  tags: ['Recipes'],
  description: 'Delete a recipe by ID',
  operationId: 'deleteRecipes',
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: 'id',
      in: 'path',
      required: true,
      schema: {
        type: 'string',
      },
      description: 'ID of the recipe to delete',
    },
  ],
  responses: {
    200: {
      description: 'Recipe deleted successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Recipe deleted successfully',
              },
            },
          },
        },
      },
    },
    404: {
      description: 'Recipe not found',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Recipe not found',
              },
            },
          },
        },
      },
    },
    500: {
      description: 'Failed to delete recipe',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: {
                type: 'string',
                example: 'Failed to delete recipe',
              },
            },
          },
        },
      },
    },
  },
};