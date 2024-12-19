<script setup lang="ts">
import gsap from 'gsap'
import { onMounted, useTemplateRef } from 'vue'

defineProps({
  title: {
    type: String,
  },
})

const titleRef = useTemplateRef('title')

onMounted(async () => {
  const tl = gsap.timeline({ delay: 0.3 })
  tl.to(titleRef.value, {
    duration: 0.5,
    y: 0,
    stagger: 0.3,
  })
})
</script>

<template>
  <h1
    class="overflow-hidden text-center font-serif text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-6xl"
  >
    <div ref="title" class="translate-y-full">
      Explore my selection of curated recipes
    </div>
  </h1>
</template>
