import { Hono } from "hono";
import {
  PartialRecipeSchema,
  RecipeSchema,
  type CreateRecipeDTO,
  type RecipeDTO,
  type UpdateRecipeDTO,
} from "./model.ts";
import { authenticateJWT } from "../../middleware/authenticateJWT.ts";
import { zValidator } from "@hono/zod-validator";
import RecipeService from "./service.ts";
import { FirebaseError } from "../../services/firestore-error.ts";

const recipeService = new RecipeService("recipes");
const router = new Hono();

router.post(
  "/recipes",
  authenticateJWT,
  zValidator("json", RecipeSchema),
  async (c) => {
    c.header("Cache-Control", "no-store");
    const recipeData: CreateRecipeDTO = c.req.valid("json");
    try {
      await recipeService.addRecipe(recipeData);
      return c.json({ message: "Recipe created successfully" }, 201);
    } catch (error) {
      return c.json({ error: "Failed to create recipe" }, 500);
    }
  },
);
router.put(
  "/recipes/:id",
  authenticateJWT,
  zValidator("json", PartialRecipeSchema),
  async (c) => {
    c.header("Cache-Control", "no-store");
    const recipeId = c.req.param("id");
    const recipeData: UpdateRecipeDTO = c.req.valid("json");
    try {
      await recipeService.updateRecipe(recipeId, recipeData);
      return c.json({ message: "Recipe updated successfully" }, 200);
    } catch (error) {
      return c.json({ error: "Failed to update recipe" }, 500);
    }
  },
);
router.get("/recipes/:id", async (c) => {
  c.header(
    "Cache-Control",
    "public, max-age=600, s-maxage=3600, stale-while-revalidate=86400",
  );
  const recipeId = c.req.param("id");

  try {
    const result = await recipeService.getRecipeById(recipeId);
    if (result) {
      return c.json(result, 200);
    } else {
      return c.json({ message: "Recipe with given ID not found" }, 404);
    }
  } catch (error) {
    return c.json({ error: "Failed to get recipe" }, 500);
  }
});
router.get("/recipes", async (c) => {
  c.header(
    "Cache-Control",
    "public, max-age=600, s-maxage=3600, stale-while-revalidate=86400",
  );
  const count: number = Number.parseInt(c.req.query("count") || "10", 10); // Default to 10 if count is not provided
  try {
    const entities: RecipeDTO[] = await recipeService.getAllRecipes(count);
    return c.json(entities, 200);
  } catch (error) {
    return c.json({ error: "Failed to get recipes" }, 500);
  }
});
router.delete("/recipes/:id", authenticateJWT, async (c) => {
  c.header("Cache-Control", "no-store");
  const recipeId = c.req.param("id");

  try {
    await recipeService.deleteRecipe(recipeId);
    return c.json({ message: "Recipe deleted successfully" }, 200);
  } catch (error) {
    if (error instanceof FirebaseError && error.code === 404) {
      return c.json({ error: "Recipe not found" }, 404);
    } else {
      return c.json({ error: "Failed to delete recipe" }, 500);
    }
  }
});

export default router;
