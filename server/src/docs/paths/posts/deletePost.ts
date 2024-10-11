export const deletePost = {
	tags: ["Posts"],
	description: "Delete a post",
	operationId: "deletePost",
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
			description: "ID of the post to delete",
		},
	],
	responses: {
		"200": {
			description: "Post deleted successfully",
			content: {
				"application/json": {
					schema: {
						type: "object",
						properties: {
							message: {
								type: "string",
								example: "Post deleted successfully",
							},
						},
					},
				},
			},
		},
		"404": {
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
		"500": {
			description: "Failed to delete post",
			content: {
				"application/json": {
					schema: {
						type: "object",
						properties: {
							error: {
								type: "string",
								example: "Failed to delete post",
							},
						},
					},
				},
			},
		},
	},
};
