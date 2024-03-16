// import app from "firebase/app"
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, createUserWithEmailAndPassword} from 'firebase/auth'
import { auth } from '@/config/firebaseConfig'

// const signUpUser = async (email: string, password:string) => {
//   try {
//     await createUserWithEmailAndPassword(auth, email, password)
//   } catch (err) {
//     console.error(err)
//     throw new Error(err.message)
//   }
// }

const logUserIn = async (email: string, password: string) => {
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
            throw new Error('Invalid email')
        //   errMsg.value = 'Invalid email'
        case 'auth/user-not-found':
            throw new Error('No account with that email was found')
        //   errMsg.value = 'No account with that email was found'
        case 'auth/wrong-password':
            throw new Error('Incorrect password')
        default:
            throw new Error('No account with that email was found')
        //   errMsg.value = 'Email or password was incorrect'
      }
    })
//   try {
//     await signInWithEmailAndPassword(auth, email, password)
//   } catch (error) {
//     switch (error.code) {
//         case 'auth/invalid-email':
//           errMsg.value = 'Invalid email'
//           break
//         case 'auth/user-not-found':
//           errMsg.value = 'No account with that email was found'
//           break
//         case 'auth/wrong-password':
//           errMsg.value = 'Incorrect password'
//           break
//         default:
//           errMsg.value = 'Email or password was incorrect'
//           break
//       }
//     console.error(err)
//     throw new Error(err.message)
//   }
}

const logUserOut = async () => {
    await signOut(auth).catch(err => {
        throw new Error(err.message)
    })
}

const getAuthToken = async () => {
    await auth.currentUser?.getIdToken(true).then(token => {
        return token;
    }).catch(err => {
        throw new Error(err)
    });
}

const firebaseService = {logUserIn, logUserOut, getAuthToken }

export default firebaseService