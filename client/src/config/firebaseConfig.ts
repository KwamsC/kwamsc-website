import { FirebaseApp, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
}

export const app: FirebaseApp = initializeApp(firebaseConfig)

export const auth = getAuth(app)

// export const getCurrentUser = () => new Promise((resolve, reject) => {
//   const unsubscribe = onAuthStateChanged(auth, (user) => {
//         unsubscribe()
//     resolve(user)
//   }, reject)
// })

// export const login = async (email: string, password: string) => {
//   await signInWithEmailAndPassword(auth, email, password).then((userCredentials) => {
//     if (userCredentials)
//     console.log(userCredentials)
//   })
// }

// export const logout = async () => {
//   await signOut(auth)
// }

// const user = await getCurrentUser()

// export default {
//   app
// }
