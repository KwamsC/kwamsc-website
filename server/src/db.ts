import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import config from "./config/config";

const app = initializeApp(config.firebaseConfig);
const db = getFirestore(app);

// if (process.env.APP_ENV === 'development') {
//   connectFirestoreEmulator(db, '127.0.0.1', 8081);
// }

export { db };
