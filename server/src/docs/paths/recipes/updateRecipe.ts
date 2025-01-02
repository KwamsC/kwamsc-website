import { PartialRecipeSchema } from "../../requests/PartialRecipeSchema.js";

export const updateRecipe = {
	tags: ["Recipes"],
	description: "Update an existing recipe",
	operationId: "updateRecipe",
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
			description: "ID of the recipe to update",
		},
	],
	requestBody: {
		content: {
			"application/json": {
				schema: PartialRecipeSchema,
			},
		},
	},
	responses: {
		200: {
			description: "Recipe updated successfully",
			content: {
				"application/json": {
					schema: {
						type: "object",
						properties: {
							message: {
								type: "string",
								example: "Recipe updated successfully",
							},
						},
					},
				},
			},
		},
		500: {
			description: "Failed to update recipe",
			content: {
				"application/json": {
					schema: {
						type: "object",
						properties: {
							error: {
								type: "string",
								example: "Failed to update recipe",
							},
						},
					},
				},
			},
		},
	},
};
