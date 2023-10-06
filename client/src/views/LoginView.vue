<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { Ref, ref } from 'vue'
// import { login } from '@/services/loginService'

const store = useAuthStore()
const email: Ref<string> = ref('')
const password: Ref<string> = ref('')

const handleLogin = (mail: string, pw: string) => {
  store.login(mail, pw)
}

const { user } = storeToRefs(store)
</script>

<template>
  <div v-if="!user.loggedIn" class="login">
    <h1 class="text-xl">Login</h1>
    <form class="form" action="#" @submit.prevent="handleLogin(email, password)">
      <label for="email">email</label>
      <input class="text-black" v-model="email" type="email" />

      <label>password</label>
      <input type="password" v-model="password" class="text-black" />

      <div class="">
        <button type="submit" class="btn btn-primary">Login</button>
      </div>
    </form>
  </div>
  <div v-else>
    {{ user.data }}
  </div>
</template>
