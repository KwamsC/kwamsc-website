export interface PostDTO {
  id: string; // Unique identifier for the blog post
  title: string; // Title of the blog post
  content: string; // Main content of the blog post (HTML or Markdown)
  author: string; // Information about the author
  tags: string[]; // Array of tags associated with the blog post
  imageUrl?: string; // URL for the blog post cover image (optional)
  published: boolean;
  updatedAt: number; // Date when the blog post was updated
  createdAt: number; // Date when the blog post was published
}

export interface CreatePostDTO {
  title: string; // Title of the blog post
  content: string; // Main content of the blog post (HTML or Markdown)
  author: string; // Information about the author
  tags: string[]; // Array of tags associated with the blog post
  imageUrl?: string; // URL for the blog post cover image (optional)
  published: boolean;
}

export type UpdatePostDTO = Partial<CreatePostDTO>;

// const myBlogPost: Post = {
//   id: '1',
//   title: 'Introduction to TypeScript',
//   content: 'TypeScript is a superset of JavaScript that adds static typing...',
//   author: 'John Doe',
//   published: true,
//   createdAt: new Date('2024-01-18T12:00:00Z'),
//   tags: ['TypeScript', 'JavaScript', 'Programming'],
//   updatedAt: new Date('2024-01-18T12:00:00Z'),
//   imageUrl: 'https://example.com/typescript-intro.jpg',
// };
