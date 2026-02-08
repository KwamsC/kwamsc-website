import { auth } from '@/config/firebaseConfig'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { defineStore } from 'pinia'
// Import axios to make HTTP requests
// import axios from 'axios'

export const useAuthStore = defineStore('user', {
  state: () => {
    return {
      user: {
        loggedIn: false || window.localStorage.getItem('auth') === 'true',
        token: null as string | null,
      },
    }
  },
  getters: {
    getUser: state => state.user,
  },
  actions: {
    async login(email: string, password: string) {
      await signInWithEmailAndPassword(auth, email, password).then(
        userCredentials => {
          if (userCredentials) {
            this.user.loggedIn = true
            window.localStorage.setItem('auth', 'true')
          }
        },
      )
    },

    async logout() {
      await signOut(auth)
      this.user.loggedIn = false
      window.localStorage.removeItem('auth')
    },

    init() {
      onAuthStateChanged(auth, userCredentials => {
        if (userCredentials) {
          userCredentials.getIdToken().then(idToken => {
            window.localStorage.setItem('auth', 'true')
            this.user.token = idToken
          })
          this.user.loggedIn = true
          window.localStorage.setItem('auth', 'true')
        } else {
          this.user.loggedIn = false
          this.user.token = null
          window.localStorage.removeItem('auth')
        }
      })
    },
  },
})
