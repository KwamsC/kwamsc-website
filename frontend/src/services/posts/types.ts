export type PostDTO = {
	id?: string;
	title: string;
	content: string;
	author: string;
	tags: string[];
	published: boolean;
	imageUrl?: string;
	createdAt?: number;
	updatedAt?: number | null;
};

export type CreatePostDTO = {
	title: string;
	content: string;
	author: string;
	tags: string[];
	published: boolean;
	imageUrl?: string;
};

export type UpdatePostDTO = Partial<CreatePostDTO>;
