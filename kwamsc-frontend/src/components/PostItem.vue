<script setup lang="ts">
import type { PropType } from 'vue'
import type { Post } from '@/types/post'

defineProps({
  post: Object as PropType<Post>
})
</script>

<template>
  <div v-if="post">
    <h1>{{ post.title }}</h1>
    <p>{{ post.content }}</p>
  </div>
</template>
