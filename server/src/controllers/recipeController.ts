import Controller from './controller';
import { Recipe, CreateRecipeDTO, UpdateRecipeDTO } from '../models/recipeSchema';

const recipeController = new Controller<Recipe, CreateRecipeDTO, UpdateRecipeDTO>('recipes');

export default recipeController;
