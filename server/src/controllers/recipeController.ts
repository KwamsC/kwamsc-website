import Controller from './controller';
import { Recipe, CreateRecipeDTO, UpdateRecipeDTO } from '../models/recipe';

const recipeController = new Controller<Recipe, CreateRecipeDTO, UpdateRecipeDTO>('recipes');

export default recipeController;
