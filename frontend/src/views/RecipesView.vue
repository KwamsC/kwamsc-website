<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import AnimatedTitle from '@/components/AnimatedTitle.vue'
import { useRecipeStore } from '@/stores/recipes'

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
    console.log('Api status ->', status, success, recipeStore.recipes)
  }
})
</script>

<template>
  <section class="container">
    <div class="relative py-8">
      <AnimatedTitle title="Explore my selection of curated recipes" />
    </div>
  </section>
  <section v-if="!state.isLoading" class="container">
    <div>
      <div v-for="recipe in recipeStore.recipes" :key="recipe?.id">
        <div>{{ recipe?.title }}</div>
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
