<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { Badge } from '@/components/ui/badge'
import { useRoute } from 'vue-router'
import axios from 'axios'
import type { RecipeDTO } from '@/services/recipes/types'

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
      `${import.meta.env.VITE_API_ENDPOINT}/recipes/${recepeId}`,
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
    <div class="relative py-8">
      <h1
        class="absolute -left-3.5 top-1/2 z-10 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-6xl"
      >
        <span class="bg-white">{{ state.recipe.title }}</span>
      </h1>
      <div class="overflow-hidden rounded-xl sm:rounded-2xl md:h-96">
        <img src="../assets/spaghetti-bake.webp" />
      </div>
    </div>
    <div id="preparation" class="grid grid-cols-3 gap-4 py-8">
      <div class="instructions col-span-3 py-6 md:col-span-2">
        <h3 class="mb-4 font-serif text-3xl font-bold">Instructions</h3>
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
      <div
        class="Ingredients col-span-3 rounded-xl bg-orange-100 p-6 md:col-span-1"
      >
        <h3 class="mb-4 font-serif text-3xl font-bold">Ingredients</h3>
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
  <div class="container flex flex-col space-y-3" v-else>
    <Skeleton class="h-[125px] w-[250px] rounded-xl" />
    <div class="space-y-2">
      <Skeleton class="h-4 w-[250px]" />
      <Skeleton class="h-4 w-[200px]" />
    </div>
  </div>
</template>
