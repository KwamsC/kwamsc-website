import { PartialPostSchema } from "../../requests/PartialPostSchema";

export const updatePost = {
	tags: ["Posts"],
	description: "Update an existing post",
	operationId: "updatePost",
	security: [
		{
			bearerAuth: [],
		},
	],
	parameters: [
		{
			name: "id",
			in: "path",
			required: true,
			schema: {
				type: "string",
			},
			description: "ID of the post to update",
		},
	],
	requestBody: {
		content: {
			"application/json": {
				schema: PartialPostSchema,
			},
		},
	},
	responses: {
		200: {
			description: "Post updated successfully",
			content: {
				"application/json": {
					schema: {
						type: "object",
						properties: {
							message: {
								type: "string",
								example: "Post updated successfully",
							},
						},
					},
				},
			},
		},
		404: {
			description: "Post not found",
			content: {
				"application/json": {
					schema: {
						type: "object",
						properties: {
							message: {
								type: "string",
								example: "Post not found",
							},
						},
					},
				},
			},
		},
		500: {
			description: "Failed to update post",
			content: {
				"application/json": {
					schema: {
						type: "object",
						properties: {
							error: {
								type: "string",
								example: "Failed to update post",
							},
						},
					},
				},
			},
		},
	},
};
