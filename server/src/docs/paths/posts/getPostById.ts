import { PostResponseSchema } from "../../responses/PostResponseSchema.js";

export const getPostById = {
	tags: ["Posts"],
	description: "Get a post by ID",
	operationId: "getPostById",
	parameters: [
		{
			name: "id",
			in: "path",
			required: true,
			schema: {
				type: "string",
			},
			description: "ID of the post to retrieve",
		},
	],
	responses: {
		200: {
			description: "Successful response",
			content: {
				"application/json": {
					schema: PostResponseSchema,
				},
			},
		},
		404: {
			description: "Post with given ID not found",
			content: {
				"application/json": {
					schema: {
						type: "object",
						properties: {
							message: {
								type: "string",
								example: "Post with given ID not found",
							},
						},
					},
				},
			},
		},
		500: {
			description: "Failed to get post",
			content: {
				"application/json": {
					schema: {
						type: "object",
						properties: {
							error: {
								type: "string",
								example: "Failed to get post",
							},
						},
					},
				},
			},
		},
	},
};
