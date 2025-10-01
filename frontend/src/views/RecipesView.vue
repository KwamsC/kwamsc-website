<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { Skeleton } from '@/components/ui/skeleton'
import AnimatedTitle from '@/components/AnimatedTitle.vue'
import { useRecipeStore } from '@/stores/recipe'

const recipeStore = useRecipeStore()
const state = reactive<{ isLoading: boolean }>({
  isLoading: true,
})

onMounted(async () => {
  const { success, status } = await recipeStore.dispatchGetRecipes()

  if (!success) {
    // alert('Ups, something happened 🙂')
    console.log('Api status ->', status)
  } else {
    state.isLoading = false
    console.log('Api status ->', status, success)
  }
})
</script>

<template>
  <section class="container mt-40">
    <div class="relative pb-20 pt-9">
      <AnimatedTitle title="Explore my selection of curated recipes" />
    </div>
  </section>
  <section class="container min-h-screen">
    <div v-if="!state.isLoading">
      <div v-for="recipe in recipeStore.recipes" :key="recipe?.id">
        <RouterLink :to="`/recipes/${recipe.id}`">
          <div>
            <span class="text-sm uppercase tracking-widest text-yellow-600">{{
              recipe.cuisine
            }}</span>
            •
            <span class="text-slate-500">{{ recipe.cookTime }} </span>
          </div>
          <div class="my-2 font-serif text-2xl font-bold">
            {{ recipe?.title }}
          </div>
          <div class="text-xs">Read More</div>
        </RouterLink>
      </div>
    </div>
    <div class="container" v-else>
      <div class="flex items-center space-x-4">
        <Skeleton class="h-12 w-12 rounded-full bg-stone-400" />
        <div class="space-y-2">
          <Skeleton class="h-4 w-[250px] bg-stone-400" />
          <Skeleton class="h-4 w-[180px] bg-stone-400" />
        </div>
      </div>
    </div>
  </section>
</template>
