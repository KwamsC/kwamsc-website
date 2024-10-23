import Controller from "../../controllers/controller";
import { Recipe, CreateRecipeDTO, UpdateRecipeDTO } from "./model";

const recipeController = new Controller<Recipe, CreateRecipeDTO, UpdateRecipeDTO>("recipes");

export default recipeController;
