// import { ref, onMounted } from 'vue'
import { auth } from '@/config/firebaseConfig'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// import { app, auth } from '@/config/firebaseConfig'

const router = useRouter()
const errMsg = ref()

// export const getCurrentUser = () =>
//   new Promise((resolve, reject) => {
//     const unsubscribe = onAuthStateChanged(
//       auth,
//       (user) => {
//         unsubscribe()
//         resolve(user)
//       },
//       reject
//     )
//   })

export const login = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      if (userCredentials) {
        console.log(userCredentials)
        console.log('Successfully logged in!')
      }
    })
    .catch((error) => {
      switch (error.code) {
        case 'auth/invalid-email':
          errMsg.value = 'Invalid email'
          break
        case 'auth/user-not-found':
          errMsg.value = 'No account with that email was found'
          break
        case 'auth/wrong-password':
          errMsg.value = 'Incorrect password'
          break
        default:
          errMsg.value = 'Email or password was incorrect'
          break
      }
      console.log(errMsg.value)
    })
}

// onMounted(() => {
//   onAuthStateChanged((userCred) => {
//     console.log(userCred)
//   })
// })

export const logout = async () => {
  console.log('Logging out...')
  await signOut(auth)
}

// const user = await getCurrentUser()
