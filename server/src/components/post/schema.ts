import { z } from 'zod';

export const PostSchema = z.object({
  title: z
    .string({
      required_error: 'title is required',
    })
    .min(1, 'title cannot be empty'),
  content: z.string(),
  author: z
    .string({
      required_error: 'name is required',
    })
    .min(1, 'author cannot be empty'),
  tags: z.array(z.string()),
  published: z.boolean(),
  imageUrl: z.string().optional(),
});

// define a schema for Post with metadata
const HasPostMetaData = z.object({
  id: z.string(),
  updatedAt: z.number(),
  createdAt: z.number(),
});

// merge HasPostMetaData with PostSchema
const PostWithMetaData = PostSchema.merge(HasPostMetaData);

// infer CreatePost from PostWithMetaData
export type Post = z.infer<typeof PostWithMetaData>;
export type CreatePostDTO = z.infer<typeof PostSchema>;

// infer UpdatePost from PostWithMetaData
export const PartialPostSchema = PostWithMetaData.partial();
export type UpdatePostDTO = z.infer<typeof PartialPostSchema>;
