import type { RequestHandler } from "express";
import { FirebaseError } from "../../services/firestore-error";
import type { CreateRecipeDTO, RecipeDTO, UpdateRecipeDTO } from "./model";
import RecipeService from "./service";

const recipeService = new RecipeService("recipes");

const addRecipe: RequestHandler = async (req, res) => {
	const recipeData: CreateRecipeDTO = req.body;
	try {
		await recipeService.addRecipe(recipeData);
		res.status(201).json({ message: "Recipe created successfully" });
	} catch (error) {
		res.status(500).json({ error: "Failed to create recipe" });
	}
};

const updateRecipe: RequestHandler = async (req, res) => {
	const recipeId = req.params.id;
	const recipeData: UpdateRecipeDTO = req.body;
	try {
		await recipeService.updateRecipe(recipeId, recipeData);
		res.status(200).json({ message: "Recipe updated successfully" });
	} catch (error) {
		res.status(500).json({ error: "Failed to update recipe" });
	}
};

const getRecipeById: RequestHandler = async (req, res) => {
	const recipeId = req.params.id;

	try {
		const result = await recipeService.getRecipeById(recipeId);
		if (result) {
			res.status(200).json(result);
		} else {
			res.status(404).json({ message: "Recipe with given ID not found" });
		}
	} catch (error) {
		res.status(500).json({ error: "Failed to get recipe" });
	}
};

const getAllRecipes: RequestHandler = async (req, res) => {
	const count: number = Number.parseInt(req.query.count as string, 10) || 10; // Default to 10 if count is not provided
	try {
		const entities: RecipeDTO[] = await recipeService.getAllRecipes(count);
		res.status(200).json(entities);
	} catch (error) {
		res.status(500).json({ error: "Failed to get recipes" });
	}
};

const deleteRecipe: RequestHandler = async (req, res) => {
	const recipeId = req.params.id;

	try {
		await recipeService.deleteRecipe(recipeId);
		res.status(200).json({ message: "Recipe deleted successfully" });
	} catch (error) {
		if (error instanceof FirebaseError && error.code === 404) {
			res.status(404).json({ error: "Recipe not found" });
		} else {
			res.status(500).json({ error: "Failed to delete recipe" });
		}
	}
};

export { addRecipe, updateRecipe, getRecipeById, getAllRecipes, deleteRecipe };
