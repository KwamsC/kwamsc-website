<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50 px-4">
    <div class="w-full max-w-md space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Admin Login
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Sign in to access the admin panel
        </p>
      </div>

      <form @submit.prevent="handleLogin" class="mt-8 space-y-6">
        <!-- Error Message -->
        <div v-if="error" class="rounded-md bg-red-50 p-4">
          <div class="flex">
            <div class="ml-3">
              <p class="text-sm font-medium text-red-800">
                {{ error }}
              </p>
            </div>
          </div>
        </div>

        <!-- Success Message -->
        <div v-if="success" class="rounded-md bg-green-50 p-4">
          <div class="flex">
            <div class="ml-3">
              <p class="text-sm font-medium text-green-800">
                {{ success }}
              </p>
            </div>
          </div>
        </div>

        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label for="email" class="sr-only">Email address</label>
            <input
              id="email"
              v-model="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="Email address"
              :style="{ fontSize: '16px' }"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="Password"
              :style="{ fontSize: '16px' }"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            :style="{ fontSize: '16px' }"
          >
            <span v-if="loading">Signing in...</span>
            <span v-else>Sign in</span>
          </button>
        </div>
      </form>

      <!-- Redirect info -->
      <div class="text-center">
        <p class="text-xs text-gray-500">
          After signing in, you'll be redirected to the admin panel
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import type { FirebaseError } from 'firebase/app'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const success = ref('')

// Check if user is already logged in
onMounted(() => {
  authStore.init()
  if (authStore.user.loggedIn) {
    // Already logged in, redirect to admin or return URL
    const returnTo = (route.query.returnTo as string) || '/admin/blog'
    router.push(returnTo)
  }
})

async function handleLogin() {
  loading.value = true
  error.value = ''
  success.value = ''

  try {
    await authStore.login(email.value, password.value)

    // Get fresh token
    const { auth } = await import('@/config/firebaseConfig')
    const user = auth.currentUser
    if (user) {
      const token = await user.getIdToken()
      authStore.user.token = token
    }

    success.value = 'Login successful! Redirecting...'

    // Redirect to admin panel or return URL
    const returnTo = (route.query.returnTo as string) || '/admin/blog'
    setTimeout(() => {
      router.push(returnTo)
    }, 500)
  } catch (err) {
    console.error('Login error:', err)

    // Handle Firebase Auth errors
    let errorMessage = 'Failed to sign in. Please check your credentials.'

    if ((err as FirebaseError).code === 'auth/user-not-found') {
      errorMessage = 'No account found with this email address.'
    } else if ((err as FirebaseError).code === 'auth/wrong-password') {
      errorMessage = 'Incorrect password. Please try again.'
    } else if ((err as FirebaseError).code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address.'
    } else if ((err as FirebaseError).code === 'auth/user-disabled') {
      errorMessage = 'This account has been disabled.'
    } else if ((err as FirebaseError).code === 'auth/too-many-requests') {
      errorMessage = 'Too many failed login attempts. Please try again later.'
    } else if ((err as FirebaseError).message) {
      errorMessage = (err as FirebaseError).message
    }

    error.value = errorMessage
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Ensure inputs don't zoom on iOS */
input[type='email'],
input[type='password'] {
  font-size: 16px;
}
</style>
