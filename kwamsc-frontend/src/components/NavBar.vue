<script setup lang="ts">
import { RouterLink } from 'vue-router'
import IconKc from './icons/IconKc.vue'
</script>

<template>
  <nav class="flex items-center justify-between">
    <a href="/">
      <icon-kc />
    </a>
    <ul class="flex flex-1 items-center justify-end gap-16 max-lg:hidden">
      <li>
        <router-link to="/about">About me</router-link>
      </li>
      <li>
        <router-link to="/blog">Blog</router-link>
      </li>
      <li>
        <router-link to="/recipes">Recipes</router-link>
      </li>
    </ul>
  </nav>
</template>
