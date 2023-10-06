// import { ref, onMounted } from 'vue'
// import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
// import { app, auth } from '@/config/firebaseConfig'

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

// export const login = async (email: string, password: string) => {
//   await signInWithEmailAndPassword(auth, email, password).then((userCredentials) => {
//     if (userCredentials) console.log(userCredentials)
//   })
// }

// onMounted(() => {
//   onAuthStateChanged((userCred) => {
//     console.log(userCred)
//   })
// })

// export const logout = async () => {
//   await signOut(auth)
// }

// // const user = await getCurrentUser()
