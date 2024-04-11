import { Router } from 'express';
import recipeController from '../controllers/recipeController';
import { authenticateJWT } from '../middleware/authenticateJWT';
import { validate } from '../middleware/validator';
import { PartialRecipeSchema, RecipeSchema } from '../models/recipeSchema';

const router = Router();

router
  .route('/recipes')
  .get(recipeController.getAllEntities)
  .post([authenticateJWT, validate(RecipeSchema)], recipeController.addEntity);

router
  .route('/recipes/:id')
  .get(recipeController.getEntity)
  .put([authenticateJWT, validate(PartialRecipeSchema)], recipeController.updateEntity)
  .delete(authenticateJWT, recipeController.deleteEntity);

export default router;
