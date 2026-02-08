<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainLayout from '@/layout/MainLayout.vue'
</script>

<template>
  <main>
    <component
      v-if="$route.meta.layout !== null"
      :is="$route.meta.layout || MainLayout"
    >
      <RouterView />
    </component>
    <RouterView v-else />
  </main>
</template>
