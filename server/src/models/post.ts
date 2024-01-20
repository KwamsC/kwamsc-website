// class Post {
//   id: number;
//   author: string;
//   title: string;
//   slug: string;
//   tags: string[];
//   published: boolean;
//   content: String;
//   createdAt: Date;

//   constructor(
//     c_id: number,
//     c_author: string,
//     c_title: string,
//     c_slug: string,
//     c_content: string,
//     c_createdAt: Date,
//     c_published: boolean
//   ) {
//     this.id = c_id;
//     this.author = c_author;
//     this.title = c_title;
//     this.slug = c_slug;
//     this.published = c_published;
//     this.content = c_content;
//     this.createdAt = c_createdAt;
//   }
// }
// export class Todo {
//   constructor(
//     public id: string, 
//     public author: string,
//     public title: string,
//     public slug: string,
//     public tags: string[],
//     public published: boolean,
//     public content: string,
//     public createdAt: Date
//   ) 
//     {}
// }
// export class Todo {
//   id: string;
//   text: string;
//   constructor(id:string, text: string) {
//     this.id = id;
//     this.text = text;
//   }
// }

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
