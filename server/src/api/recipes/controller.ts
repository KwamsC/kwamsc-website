import Controller from "../../controllers/controller.ts";
import type { CreateRecipeDTO, RecipeDTO, UpdateRecipeDTO } from "./model.ts";

const recipeController = new Controller<RecipeDTO, CreateRecipeDTO, UpdateRecipeDTO>("recipes");

export default recipeController;
