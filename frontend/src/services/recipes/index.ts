import http from "../api";
import type { APIResponse } from "../types";
import type { RecipeDTO, createRecipeDTO } from "./types";

async function getRecipes() {
	return await http.get<RecipeDTO[]>("recipes");
}

async function getRecipe(id: string) {
	return await http.get<RecipeDTO>(`recipes/${id}`);
}

async function deleteRecipes(id: number) {
	return await http.delete<APIResponse<boolean>>(`recipes/${id}`);
}

async function createRecipes(input: createRecipeDTO) {
	return await http.post<APIResponse<RecipeDTO>>("recipes", input);
}

async function updateRecipes(input: Partial<createRecipeDTO>) {
	return await http.put<APIResponse<boolean>>("recipes", input);
}

export default {
	getRecipes,
	getRecipe,
	deleteRecipes,
	createRecipes,
	updateRecipes,
};
