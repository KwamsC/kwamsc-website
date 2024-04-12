import { Router } from 'express';
import { addRecipe, deleteRecipe, getAllRecipes, getRecipeById, updateRecipe } from './controller';
import { authenticateJWT } from '../../middleware/authenticateJWT';
import { PartialRecipeSchema, RecipeSchema} from './model';
import { validate } from '../../middleware/validator';

const router: Router = Router();

router.post('/recipes', [authenticateJWT, validate(RecipeSchema)], addRecipe);
router.put('/recipes/:id', [authenticateJWT, validate(PartialRecipeSchema)], updateRecipe);
router.get('/recipes/:id', getRecipeById);
router.get('/recipes', getAllRecipes);
router.delete('/recipes/:id', authenticateJWT, deleteRecipe);

export default router;
