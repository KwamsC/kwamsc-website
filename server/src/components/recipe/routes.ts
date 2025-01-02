import { Router } from "express";
import {
	addRecipe,
	deleteRecipe,
	getAllRecipes,
	getRecipeById,
	updateRecipe,
} from "./controller.js";
import { PartialRecipeSchema, RecipeSchema } from "./model.js";
import { authenticateJWT } from "#middleware/authenticateJWT.js";
import { validate } from "#middleware/validator.js";

const router: Router = Router();

router.post("/recipes", [authenticateJWT, validate(RecipeSchema)], addRecipe);
router.put(
	"/recipes/:id",
	[authenticateJWT, validate(PartialRecipeSchema)],
	updateRecipe,
);
router.get("/recipes/:id", getRecipeById);
router.get("/recipes", getAllRecipes);
router.delete("/recipes/:id", authenticateJWT, deleteRecipe);

export default router;
