<script setup lang="ts">
import gsap from 'gsap'
import { onMounted } from 'vue'

defineProps({
  title: {
    type: String,
  },
})

onMounted(async () => {
  const tl = gsap.timeline({ delay: 0.7 })
  tl.to('#new', { duration: 0.5, y: 0, stagger: 0.3 })
})
</script>

<template>
  <h1
    class="overflow-hidden text-4xl font-serif font-bold tracking-tight text-zinc-800 sm:text-6xl text-center dark:text-zinc-100"
  >
    <div class="translate-y-full" id="new">
      Explore my selection of curated recipes
    </div>
  </h1>
</template>
