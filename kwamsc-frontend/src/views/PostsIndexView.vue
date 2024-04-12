<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import type { Post } from '@/types/post'

const store = useAuthStore()
let posts: Ref<Post[] | undefined> = ref()
const fetchData = async () => {
  // console.log('token ' + token)
  const res = await axios.get('http://localhost:8080/api/v1/posts').catch((error) => {
    // store.logout()
  })
  posts.value = res?.data
}

onMounted(() => {
  fetchData()
})
</script>

<!-- <template>
  <main class>
    <h1>Blogs</h1>
    <div v-for="post in posts" :key="post.id">
      <h2>{{ post.title }}</h2>
      <p>{{ post.id }}</p>
    </div>
  </main>
</template> -->

<template>
  <div class="bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
        <p class="mt-2 text-lg leading-8 text-gray-600">
          Learn how to grow your business with our expert advice.
        </p>
      </div>
      <div
        class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3"
      >
        <article
          v-for="post in posts"
          :key="post.id"
          class="flex max-w-xl flex-col items-start justify-between"
        >
          <!-- <div class="flex items-center gap-x-4 text-xs">
            <time :datetime="post.createdAt" class="text-gray-500">{{ post.createdAt }}</time>
            <a :href="post.tags" class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">{{ post.category.title }}</a>
          </div> -->
          <div class="group relative">
            <h3
              class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600"
            >
              <a :href="post.id">
                <span class="absolute inset-0" />
                {{ post.title }}
              </a>
            </h3>
            <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{{ post.content }}</p>
          </div>
          <div class="relative mt-8 flex items-center gap-x-4">
            <img :src="post.author" alt="" class="h-10 w-10 rounded-full bg-gray-50" />
            <div class="text-sm leading-6">
              <p class="font-semibold text-gray-900">
                <a :href="post.id">
                  <span class="absolute inset-0" />
                  {{ post.author }}
                </a>
              </p>
              <p class="text-gray-600">{{ post.content }}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>
