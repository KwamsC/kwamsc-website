<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="bg-orange-50 min-h-screen">
    <component :is="$route.meta.layout || 'div'">
      <RouterView />
    </component>
  </main>
</template>

<style scoped></style>
