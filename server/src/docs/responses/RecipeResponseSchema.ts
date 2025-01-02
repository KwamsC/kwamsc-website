export const RecipeResponseSchema = {
	type: "object",
	properties: {
		id: { type: "string", example: "12345" },
		title: { type: "string", example: "A Delicious Recipe" },
		ingredients: { type: "string", example: "Ingredients of the recipe." },
		instructions: { type: "string", example: "Step by step instructions." },
		author: { type: "string", example: "Chef Doe" },
		published: { type: "boolean", example: true },
		createdAt: { type: "integer", format: "int64", example: 1627893600000 },
		tags: {
			type: "array",
			items: { type: "string" },
			example: ["easy", "vegetarian"],
		},
		updatedAt: {
			type: "integer",
			format: "int64",
			nullable: true,
			example: 1627893600000,
		},
		imageUrl: {
			type: "string",
			nullable: true,
			example: "https://example.com/image.jpg",
		},
	},
};
