export interface Post {
    id: string;
    title: string;
    content: string;
    author: string;
    published: boolean;
    createdAt: number;
    tags: string[];
    updatedAt?: number | null;
    imageUrl?: string;
  }
  
export interface CreatePostDTO {
    title: string;
    content: string;
    author: string;
    published: boolean;
    tags: string[];
  }
  
export interface UpdatePostDTO {
    title?: string;
    content?: string;
    author?: string;
    published?: boolean;
    tags?: string[];
    imageUrl?: string;
}
