export const PostResponseSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', example: '12345' },
    title: { type: 'string', example: 'An Interesting Post' },
    content: { type: 'string', example: 'This is the content of the post.' },
    author: { type: 'string', example: 'John Doe' },
    published: { type: 'boolean', example: true },
    createdAt: { type: 'integer', format: 'int64', example: 1627893600000 },
    tags: {
      type: 'array',
      items: { type: 'string' },
      example: ['tag1', 'tag2'],
    },
    updatedAt: {
      type: 'integer',
      format: 'int64',
      nullable: true,
      example: 1627893600000,
    },
    imageUrl: {
      type: 'string',
      nullable: true,
      example: 'https://example.com/image.jpg',
    },
  },
};