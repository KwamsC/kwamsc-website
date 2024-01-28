<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from './components/shared/AppHeader.vue'
import AppFooter from './components/shared/AppFooter.vue'
</script>

<template>
  <app-header />
  <RouterView />
  <app-footer />
</template>

<style scoped></style>
