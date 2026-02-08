import { type FirebaseApp, initializeApp } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  databaseUrl: import.meta.env.VITE_DATABASE_URL,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
}

export const firebaseApp: FirebaseApp = initializeApp(firebaseConfig)

export const auth = getAuth(firebaseApp)

// Connect to Firebase Auth Emulator in development
if (
  import.meta.env.VITE_NODE_ENV === 'development' &&
  import.meta.env.VITE_USE_EMULATOR === 'true'
) {
  const emulatorHost =
    import.meta.env.VITE_AUTH_EMULATOR_HOST || '127.0.0.1:9099'
  connectAuthEmulator(auth, `http://${emulatorHost}`, { disableWarnings: true })
  console.log('🔥 Firebase Auth Emulator connected at', emulatorHost)
}
