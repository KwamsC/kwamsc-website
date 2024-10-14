<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { Badge } from '@/components/ui/badge'
import { useRoute } from 'vue-router'
import axios from 'axios'
import type { RecipeDTO } from '@/types/recipe'

const route = useRoute()

const state = reactive<{
  recipe: Partial<RecipeDTO>
  isLoading: boolean
}>({
  recipe: {},
  isLoading: true,
})

const recepeId = route.params.id

onMounted(async () => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/recipes/${recepeId}`,
    )
    state.recipe = response.data
  } catch (error) {
    console.error('Error fetching job', error)
  } finally {
    state.isLoading = false
  }
})
</script>

<template>
  <section v-if="!state.isLoading" class="container">
    <div class="py-8 relative">
      <h1
        class="text-4xl absolute z-10 top-1/2 -left-3.5 font-bold tracking-tight text-zinc-800 sm:text-6xl dark:text-zinc-100"
      >
        <span class="bg-white">{{ state.recipe.title }}</span>
      </h1>
      <div class="overflow-hidden md:h-96 rounded-xl sm:rounded-2xl">
        <img src="../assets/spaghetti-bake.jpg" />
      </div>
    </div>
    <div id="preparation" class="grid grid-cols-3 gap-4 py-8">
      <div class="instructions col-span-3 md:col-span-2 py-6">
        <h3 class="text-3xl font-serif font-bold mb-4">Instructions</h3>
        <ol
          v-for="(item, index) in state.recipe.instructions"
          :key="index"
          class="instructions text-sm font-semibold leading-6 text-gray-900"
        >
          <li>
            <Badge variant="outline">{{ index + 1 }}</Badge> {{ item }}
          </li>
        </ol>
      </div>
      <div class="Ingredients col-span-3 md:col-span-1 bg-orange-100 p-6">
        <h3 class="text-3xl font-serif font-bold mb-4">Ingredients</h3>
        <ol
          v-for="(item, index) in state.recipe.ingredients"
          :key="index"
          class="instructions text-sm font-semibold leading-6 text-gray-900"
        >
          <li class="content-between">{{ item.name }} {{ item.quantity }}</li>
        </ol>
      </div>
    </div>
  </section>
  <div class="container" v-else>Loading</div>
</template>
