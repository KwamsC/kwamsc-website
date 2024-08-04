export const PartialPostSchema = {
  type: 'object',
  properties: {
    title: { type: 'string', example: 'My New Post' },
    content: { type: 'string', example: 'This is the content of the post.' },
    author: { type: 'string', example: 'Author Name' },
    tags: {
      type: 'array',
      items: { type: 'string' },
      example: ['tag1', 'tag2'],
    },
    published: { type: 'boolean', example: true },
    imageUrl: { type: 'string', example: 'http://example.com/image.jpg' },
  },
};
