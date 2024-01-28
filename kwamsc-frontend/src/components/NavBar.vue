<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="flex items-center justify-between">
    <h1>KwamsC</h1>
    <ul class="flex-1 flex justify-end items-center gap-16 max-lg:hidden">
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
