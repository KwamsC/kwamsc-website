import { afterEach, describe, expect, it, jest } from "@jest/globals";
import sinon from "sinon";
import request, { type Request, type Response } from "supertest";
import app from "../src/app";
import type {
	CreateRecipeDTO,
	RecipeDTO,
	UpdateRecipeDTO,
} from "../src/components/recipe/model";
import RecipeService from "../src/components/recipe/service";
import { FirebaseError } from "../src/services/firestore-error";

// Mock the authenticateJWT middleware
jest.mock("../src/middleware/authenticateJWT", () => ({
	authenticateJWT: (_req: Request, _res: Response, next) => next(),
}));

afterEach(() => {
	sinon.restore();
});

describe("POST /api/v1/recipes", () => {
	it("should create a new recipe", async () => {
		const recipeData: CreateRecipeDTO = {
			ingredients: [
				{ name: "Spaghetti", quantity: "200g" },
				{ quantity: "500g", name: "Ground beef" },
				{ quantity: "2 cups", name: "Tomato sauce" },
			],
			mealType: "Dinner",
			title: "Spaghetti Bolognese",
			cookTime: "30 minutes",
			servings: 4,
			difficulty: "Medium",
			imageUrl: "https://example.com/spaghetti-bolognese.jpg",
			totalTime: "45 minutes",
			prepTime: "15 minutes",
			cuisine: "Italian",
			instructions: [
				"Boil water and cook spaghetti according to package instructions.",
				"In a pan, brown the ground beef.",
				"Add tomato sauce to the beef and simmer.",
			],
			description: "Classic Italian pasta dish with a rich meat sauce.",
		};

		const createRecipeStub = sinon
			.stub(RecipeService.prototype, "addRecipe")
			.resolves();

		const response = await request(app)
			.post("/api/v1/recipes")
			.send(recipeData);

		expect(createRecipeStub.calledOnce).toBe(true);
		expect(response.status).toBe(201);
		expect(response.body.message).toBe("Recipe created successfully");
	});

	it("should handle validation errors", async () => {
		const recipeData: Omit<CreateRecipeDTO, "title"> = {
			ingredients: [
				{ name: "Spaghetti", quantity: "200g" },
				{ quantity: "500g", name: "Ground beef" },
				{ quantity: "2 cups", name: "Tomato sauce" },
			],
			mealType: "Dinner",
			cookTime: "30 minutes",
			servings: 4,
			difficulty: "Medium",
			imageUrl: "https://example.com/spaghetti-bolognese.jpg",
			totalTime: "45 minutes",
			prepTime: "15 minutes",
			cuisine: "Italian",
			instructions: [
				"Boil water and cook spaghetti according to package instructions.",
				"In a pan, brown the ground beef.",
				"Add tomato sauce to the beef and simmer.",
			],
			description: "Classic Italian pasta dish with a rich meat sauce.",
		};

		const response = await request(app)
			.post("/api/v1/recipes")
			.send(recipeData);

		expect(response.status).toBe(409);
		expect(response.body.error[0]).toEqual({
			message: "title is required",
			path: "title",
		});
	});

	it("should handle server errors", async () => {
		const recipeData: CreateRecipeDTO = {
			ingredients: [
				{ name: "Spaghetti", quantity: "200g" },
				{ quantity: "500g", name: "Ground beef" },
				{ quantity: "2 cups", name: "Tomato sauce" },
			],
			mealType: "Dinner",
			title: "Spaghetti Bolognese",
			cookTime: "30 minutes",
			servings: 4,
			difficulty: "Medium",
			imageUrl: "https://example.com/spaghetti-bolognese.jpg",
			totalTime: "45 minutes",
			prepTime: "15 minutes",
			cuisine: "Italian",
			instructions: [
				"Boil water and cook spaghetti according to package instructions.",
				"In a pan, brown the ground beef.",
				"Add tomato sauce to the beef and simmer.",
			],
			description: "Classic Italian pasta dish with a rich meat sauce.",
		};

		const createRecipeStub = sinon
			.stub(RecipeService.prototype, "addRecipe")
			.throws(new Error("Database Error"));

		const response = await request(app)
			.post("/api/v1/recipes")
			.send(recipeData);

		expect(response.status).toBe(500);
		expect(response.body).toEqual({ error: "Failed to create recipe" });
		expect(createRecipeStub.calledOnce).toBe(true);
	});
});

describe("PUT /api/v1/recipes/:id", () => {
	it("should update an existing recipe", async () => {
		const recipeId = "1";
		const recipeData: UpdateRecipeDTO = {
			title: "Ghanaian Spaghetti Bolognese",
		};

		const updateRecipeStub = sinon
			.stub(RecipeService.prototype, "updateRecipe")
			.resolves();

		const response = await request(app)
			.put(`/api/v1/recipes/${recipeId}`)
			.send(recipeData);

		expect(updateRecipeStub.calledOnce).toBe(true);
		expect(updateRecipeStub.calledWith(recipeId, recipeData)).toBe(true);
		expect(response.status).toBe(200);
		expect(response.body.message).toBe("Recipe updated successfully");
	});

	it("should handle server errors", async () => {
		const recipeId = "1";
		const recipeData: UpdateRecipeDTO = {
			title: "Ghanaian Spaghetti Bolognese",
		};

		const updateRecipeStub = sinon
			.stub(RecipeService.prototype, "updateRecipe")
			.throws(new Error("Database Error"));

		const response = await request(app)
			.put(`/api/v1/recipes/${recipeId}`)
			.send(recipeData);

		expect(response.status).toBe(500);
		expect(response.body).toEqual({ error: "Failed to update recipe" });
		expect(updateRecipeStub.calledOnce).toBe(true);
	});
});

describe("GET /api/v1/recipes", () => {
	it("should return a list of recipes", async () => {
		const mockRecipes: RecipeDTO[] = [
			{
				id: "1",
				title: "Cornflakes and milk",
				ingredients: [
					{ name: "Cornflakes", quantity: "100g" },
					{ name: "Milk", quantity: "200ml" },
				],
				mealType: "Breakfast",
				cookTime: "5 minutes",
				servings: 1,
				difficulty: "Easy",
				imageUrl: "https://example.com/frosties.jpg",
				totalTime: "6 minutes",
				prepTime: "1 minute",
				updatedAt: null,
				createdAt: 1234567,
				cuisine: "World",
				instructions: [
					"Pour 100 gram of Cornflakes Cereal in a bowl",
					"In a pan, brown the ground beef.",
					"Add tomato sauce to the beef and simmer.",
				],
				description: "Cornflakes Cereal with milk",
			},
			{
				id: "2",
				ingredients: [
					{ name: "Spaghetti", quantity: "200g" },
					{ quantity: "500g", name: "Ground beef" },
					{ quantity: "2 cups", name: "Tomato sauce" },
				],
				mealType: "Dinner",
				title: "Spaghetti Bolognese",
				cookTime: "30 minutes",
				servings: 4,
				difficulty: "Medium",
				imageUrl: "https://example.com/spaghetti-bolognese.jpg",
				totalTime: "45 minutes",
				prepTime: "15 minutes",
				updatedAt: null,
				createdAt: 1234567,
				cuisine: "Italian",
				instructions: [
					"Boil water and cook spaghetti according to package instructions.",
					"In a pan, brown the ground beef.",
					"Add tomato sauce to the beef and simmer.",
				],
				description: "Classic Italian pasta dish with a rich meat sauce.",
			},
		];

		sinon.stub(RecipeService.prototype, "getAllRecipes").resolves(mockRecipes);

		const response = await request(app).get("/api/v1/recipes");

		expect(response.status).toBe(200);
		expect(response.body).toStrictEqual(mockRecipes);
		expect(response.body).toHaveLength(2);
	});

	it("should handle server errors", async () => {
		sinon
			.stub(RecipeService.prototype, "getAllRecipes")
			.throws(new Error("Database Error"));

		const response = await request(app).get("/api/v1/recipes");

		expect(response.status).toBe(500);
		expect(response.body).toStrictEqual({ error: "Failed to get recipes" });
	});
});

describe("GET /api/v1/recipes/:id", () => {
	it("should return a recipe by ID", async () => {
		const mockRecipe: RecipeDTO = {
			id: "1",
			ingredients: [
				{ name: "Spaghetti", quantity: "200g" },
				{ quantity: "500g", name: "Ground beef" },
				{ quantity: "2 cups", name: "Tomato sauce" },
			],
			mealType: "Dinner",
			title: "Spaghetti Bolognese",
			cookTime: "30 minutes",
			servings: 4,
			difficulty: "Medium",
			imageUrl: "https://example.com/spaghetti-bolognese.jpg",
			totalTime: "45 minutes",
			prepTime: "15 minutes",
			cuisine: "Italian",
			instructions: [
				"Boil water and cook spaghetti according to package instructions.",
				"In a pan, brown the ground beef.",
				"Add tomato sauce to the beef and simmer.",
			],
			description: "Classic Italian pasta dish with a rich meat sauce.",
			createdAt: Date.now(),
			updatedAt: null,
		};

		const getRecipeByIdStub = sinon
			.stub(RecipeService.prototype, "getRecipeById")
			.resolves(mockRecipe);

		const response = await request(app).get("/api/v1/recipes/1");

		expect(getRecipeByIdStub.calledOnce).toBe(true);
		expect(response.status).toBe(200);
		expect(response.body).toStrictEqual(mockRecipe);
	});

	it("should return 404 if recipe not found", async () => {
		sinon.stub(RecipeService.prototype, "getRecipeById").resolves(null);

		const response = await request(app).get("/api/v1/recipes/1");

		expect(response.status).toBe(404);
		expect(response.body).toEqual({
			message: "Recipe with given ID not found",
		});
	});

	it("should handle server errors", async () => {
		sinon
			.stub(RecipeService.prototype, "getRecipeById")
			.throws(new Error("Failed to get recipe"));

		const response = await request(app).get("/api/v1/recipes/1");

		expect(response.status).toBe(500);
		expect(response.body).toEqual({ error: "Failed to get recipe" });
	});
});

describe("DELETE /api/v1/recipes/:id", () => {
	it("should delete a recipe", async () => {
		const recipeId = "1";

		const deleteRecipeStub = sinon
			.stub(RecipeService.prototype, "deleteRecipe")
			.resolves();

		const response = await request(app).delete(`/api/v1/recipes/${recipeId}`);

		expect(deleteRecipeStub.calledOnce).toBe(true);
		expect(deleteRecipeStub.calledWith(recipeId)).toBe(true);
		expect(response.status).toBe(200);
		expect(response.body.message).toBe("Recipe deleted successfully");
	});

	it("should return 404 if recipe not found", async () => {
		const recipeId = "nonexistent-id";

		const deleteRecipeStub = sinon
			.stub(RecipeService.prototype, "deleteRecipe")
			.throws(new FirebaseError("Recipe does not exist", 404));

		const response = await request(app).delete(`/api/v1/recipes/${recipeId}`);

		expect(deleteRecipeStub.calledOnce).toBe(true);
		expect(response.status).toBe(404);
		expect(response.body).toEqual({ error: "Recipe not found" });
	});

	it("should handle server errors", async () => {
		const recipeId = "1";

		const deleteRecipeStub = sinon
			.stub(RecipeService.prototype, "deleteRecipe")
			.throws(new Error("Database Error"));

		const response = await request(app).delete(`/api/v1/recipes/${recipeId}`);

		expect(deleteRecipeStub.calledOnce).toBe(true);
		expect(response.status).toBe(500);
		expect(response.body).toEqual({ error: "Failed to delete recipe" });
	});
});
