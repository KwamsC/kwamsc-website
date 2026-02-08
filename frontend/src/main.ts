import './assets/main.css'

import { createApp } from 'vue'

import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'
import { vImageFade } from './directives/vImageFade'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)
app.use(router)

// Register custom directives
app.directive('image-fade', vImageFade)

// Initialize auth store to track authentication state
const authStore = useAuthStore()
authStore.init()

app.mount('#app')
