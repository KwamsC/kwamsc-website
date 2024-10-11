import { PostSchema } from "../../requests/PostSchema";

export const addPost = {
	tags: ["Posts"],
	description: "Add a new post",
	operationId: "addPost",
	security: [
		{
			bearerAuth: [],
		},
	],
	requestBody: {
		content: {
			"application/json": {
				schema: PostSchema,
			},
		},
		required: true,
	},
	responses: {
		"201": {
			description: "Post created successfully",
			content: {
				"application/json": {
					schema: {
						type: "object",
						properties: {
							message: {
								type: "string",
								example: "Post created successfully",
							},
						},
					},
				},
			},
		},
		"500": {
			description: "Failed to create post",
			content: {
				"application/json": {
					schema: {
						type: "object",
						properties: {
							error: {
								type: "string",
								example: "Failed to create post",
							},
						},
					},
				},
			},
		},
	},
};
