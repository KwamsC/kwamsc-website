<script setup lang="ts">
import { ref, type Ref } from 'vue'
import router from '@/router'
import firebaseService from '@/services/firebase';
const errorMessage = ref('')

const email: Ref<string> = ref('')
const password: Ref<string> = ref('')

const handleLogin = (mail: string, pw: string) => {
  firebaseService.logUserIn(mail, pw)
    .then(() => {
      router.push('/')
    })
    .catch((error) => {
      errorMessage.value = error.message
    })
}
</script>

<template>
  <main>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to KwamsC
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form @submit.prevent="handleLogin(email, password)" class="space-y-4 md:space-y-6">
          <div>
            <label for="email" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >Your email</label
            >
            <input
              type="email"
              name="email"
              id="email"
              v-model="email"
              class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="email@kwamsc.com"
              required
            />
          </div>
          <div>
            <label
              for="password"
              class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >Password</label
            >
            <input
              type="password"
              name="password"
              id="password"
              autocomplete="on"
              v-model="password"
              placeholder="••••••••"
              class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              required
            />
            <div>{{ errorMessage }}</div>
          </div>
          <div class="flex items-center justify-end">
            <a
              href="#"
              class="text-primary-600 dark:text-primary-500 text-sm font-medium hover:underline"
              >Forgot password?</a
            >
          </div>
          <button
            type="submit"
            class="dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg bg-indigo-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:bg-indigo-300 focus:outline-none focus:ring-4"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  </main>
</template>
