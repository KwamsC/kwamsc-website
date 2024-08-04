export const RecipeSchema = {
  type: 'object',
  properties: {
    title: { type: 'string', example: 'Delicious Recipe' },
    ingredients: { type: 'string', example: 'Ingredients of the recipe.' },
    instructions: { type: 'string', example: 'Step by step instructions.' },
    author: { type: 'string', example: 'Chef Name' },
    tags: {
      type: 'array',
      items: { type: 'string' },
      example: ['easy', 'vegetarian'],
    },
    published: { type: 'boolean', example: true },
    imageUrl: { type: 'string', example: 'http://example.com/image.jpg' },
  },
  required: ['title', 'ingredients', 'instructions', 'author', 'published'],
};
