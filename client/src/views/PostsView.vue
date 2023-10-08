<script setup lang="ts">
import PostItem from '@/components/PostItem.vue'
import axios from 'axios'
import { Ref, onMounted, ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import type { Post } from '@/types/post'

const store = useAuthStore()
const { user } = storeToRefs(store)
let posts: Ref<Post[] | undefined> = ref()

const fetchData = async (token: string) => {
  console.log('token ' + token)
  const res = await axios.get('http://localhost:8080/api/posts', {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  posts.value = res.data
}

watch(user.value, async () => {
  console.log('logged out watcher' + user.value.token)
  if (user.value.token) {
    fetchData(user.value.token)
  } else {
    posts.value = []
  }
})

onMounted(() => {
  console.log('logged out mounted' + user.value.token)

  if (user.value.token) {
    fetchData(user.value.token)
  } else {
    posts.value = []
  }
})
</script>

<template>
  <PostItem v-for="post in posts" :key="post.id" :post="post" />
</template>
