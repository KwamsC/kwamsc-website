<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from './components/shared/AppHeader.vue'
import AppFooter from './components/shared/AppFooter.vue'
import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth'

const store = useAuthStore()

onMounted(async () => {
  store.init()
})
</script>

<template>
  <app-header />
  <RouterView />
  <app-footer />
</template>

<style scoped></style>
