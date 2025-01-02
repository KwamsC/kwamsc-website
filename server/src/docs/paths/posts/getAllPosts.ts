import { PostResponseSchema } from "../../responses/PostResponseSchema.js";

export const getAllPosts = {
	tags: ["Posts"],
	description: "Get all posts",
	operationId: "getAllPosts",
	parameters: [
		{
			name: "count",
			in: "query",
			required: false,
			schema: {
				type: "integer",
				default: 10,
			},
			description: "Number of posts to retrieve",
		},
	],
	responses: {
		200: {
			description: "Posts retrieved successfully",
			content: {
				"application/json": {
					schema: {
						type: "array",
						items: PostResponseSchema,
					},
				},
			},
		},
		500: {
			description: "Failed to get posts",
			content: {
				"application/json": {
					schema: {
						type: "object",
						properties: {
							error: {
								type: "string",
								example: "Failed to get posts",
							},
						},
					},
				},
			},
		},
	},
};
