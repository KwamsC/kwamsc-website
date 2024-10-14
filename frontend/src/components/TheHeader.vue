<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Button } from '@/components/ui/button'

const navigation = [
  { name: 'Blog', href: '/blog' },
  { name: 'Recipes', href: '/recipes' },
  { name: 'About', href: '/about' },
]
</script>

<template>
  <header class="container inset-x-0 top-0 z-50">
    <nav class="flex items-center justify-between py-8">
      <router-link to="/" class="">
        <img src="../assets/kwamsc.svg" width="64px" alt="Vite logo" />
      </router-link>
      <div class="flex lg:flex-1"></div>
      <div class="lg:flex lg:gap-x-12">
        <router-link
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          class="text-sm font-semibold leading-6 text-gray-900"
        >
          <Button variant="link">
            {{ item.name }}
          </Button>
        </router-link>
      </div>
    </nav>
  </header>
</template>
