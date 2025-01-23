import Controller from "#controllers/controller.js";
import { CreateRecipeDTO, Recipe, UpdateRecipeDTO } from "./model.js";

const recipeController = new Controller<Recipe, CreateRecipeDTO, UpdateRecipeDTO>("recipes");

export default recipeController;
