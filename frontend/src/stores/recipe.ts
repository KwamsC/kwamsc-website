import type { AxiosError } from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { API } from "../services";
import type { RecipeDTO } from "../services/recipes/types";
import type { APIResponse } from "../services/types";

export const useRecipeStore = defineStore("recipeStore", () => {
	// State
	const recipes = ref<RecipeDTO[]>([]);

	// Getters
	function getRecipeById(recipeId: string) {
		return recipes.value.find((p) => p.id === recipeId);
	}

	// Actions
	function initRecipes(data: RecipeDTO[]) {
		recipes.value = data;
	}

	function addRecipe(recipe: RecipeDTO) {
		recipes.value.push(recipe);
	}

	function updateRecipe(recipe: RecipeDTO) {
		const idx = recipes.value.findIndex((p) => p.id === recipe.id);
		if (idx === -1) return;

		recipes.value[idx] = recipe;
	}

	function removeRecipe(id: string) {
		const idx = recipes.value.findIndex((r) => r.id === id);
		if (idx === -1) return;
		recipes.value.splice(idx, 1);
	}

	async function dispatchGetRecipes(): Promise<APIResponse<null>> {
		try {
			const { status, data } = await API.recipes.getRecipes();
			if (status === 200) {
				initRecipes(data);
				return {
					status: 200,
					success: true,
					content: null,
				};
			}
		} catch (error) {
			const _error = error as AxiosError<string>;
			return {
				success: false,
				status: _error.response?.status,
				content: null,
			};
		}
		return {
			success: false,
			content: null,
			status: 400,
		};
	}

	async function dispatchGetRecipe(id: string): Promise<APIResponse<null>> {
		try {
			const { status, data } = await API.recipes.getRecipe(id);
			if (status === 200) {
				// You can either add the recipe to the store, or handle it as needed
				const existingRecipe = recipes.value.find((r) => r.id === data.id);
				if (!existingRecipe) {
					addRecipe(data);
				}
				return {
					status: status,
					success: true,
					content: null,
				};
			}
		} catch (error) {
			const _error = error as AxiosError<string>;
			return {
				success: false,
				status: _error.response?.status,
				content: null,
			};
		}
		return {
			success: false,
			content: null,
			status: 400,
		};
	}

	return {
		recipes,
		initRecipes,
		updateRecipe,
		removeRecipe,
		getRecipeById,
		dispatchGetRecipe,
		dispatchGetRecipes,
	};
});
