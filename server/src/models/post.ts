export interface Post {
  id: string; // Unique identifier for the blog post
  title: string; // Title of the blog post
  content: string; // Main content of the blog post (HTML or Markdown)
  author: string; // Information about the author
  tags: string[]; // Array of tags associated with the blog post
  imageUrl?: string; // URL for the blog post cover image (optional)
  published: boolean
  updatedAt: Date // Date when the blog post was updated
  createdAt: Date // Date when the blog post was published
}

const myBlogPost: Post = {
  id: '1',
  title: 'Introduction to TypeScript',
  content: 'TypeScript is a superset of JavaScript that adds static typing...',
  author: 'John Doe',
  published: true,
  createdAt: new Date('2024-01-18T12:00:00Z'),
  tags: ['TypeScript', 'JavaScript', 'Programming'],
  updatedAt: new Date('2024-01-18T12:00:00Z'),
  imageUrl: 'https://example.com/typescript-intro.jpg',
};

export const postSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    content: { type: 'string' },
    author: { type: 'string'},
    published: { type: 'boolean' },
    createdAt: { type: 'number'},
    tags: { type: 'array'},
    updatedAt: { type: 'number', nullable: true },
    imageUrl: { type: 'string' },
  },
  required: ['title', 'content', 'published', 'author', 'tags'],
} as const; // don't forget to use const !

export const { required, ...putSchema} = postSchema;
