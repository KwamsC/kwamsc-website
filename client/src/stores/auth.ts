// import type { CityWeather } from '@/types/CityWeather'
import { auth } from '@/config/firebaseConfig'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { defineStore } from 'pinia'
// Import axios to make HTTP requests
// import axios from 'axios'

export const useAuthStore = defineStore('user', {
  state: () => {
    return {
      // for initially empty lists
      // cityList: [] as CityWeather[]
      user: {
        loggedIn: false,
        data: {},
        token: ''
      }
    }
  },
  getters: {
    getUser: (state) => state.user
    // getCities: (state) => state.cityList,
    // getNumberOfCities: (state) => state.cityList.length
  },
  actions: {
    async login(email: string, password: string) {
      await signInWithEmailAndPassword(auth, email, password).then((userCredentials) => {
        if (userCredentials) {
          this.user.data = userCredentials
          this.user.loggedIn = true
          console.log(userCredentials)
        }
      })
    },

    async logout() {
      await signOut(auth)
      this.user.loggedIn = false
      this.user.data = {}
    },

    init() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          user.getIdToken().then((idToken) => {
            this.user.token = idToken
            console.log(idToken)
          })
          this.user.data = user
          this.user.loggedIn = true
        } else {
          this.user.data = {}
          this.user.loggedIn = false
        }
      })
    }
    // addCity(city: CityWeather) {
    //   if (this.cityList.find(({ id }) => id === city.id) === undefined) {
    //     this.cityList.push(city)
    //   } else {
    //     console.log('already added to the list')
    //   }
    // },
    // deleteCity(itemID: string) {
    //   this.cityList = this.cityList.filter((city) => {
    //     return city.id !== itemID
    //   })
    // }
  }
})
