<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  title: {
    type: String,
    default: 'The Best',
  },
})
</script>

<template>
  <h1 class="text-2xl">
    {{ title }}
  </h1>
</template>
