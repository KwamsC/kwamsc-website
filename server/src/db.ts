import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import config from "./config/config";

const app = initializeApp(config.firebaseConfig);
const db = getFirestore(app);

export { db };
