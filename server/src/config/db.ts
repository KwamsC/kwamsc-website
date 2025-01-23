import { initializeApp } from "firebase/app";
import { Firestore, connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import config from "./config.js";

const app = initializeApp(config.firebaseConfig);
let db: Firestore;

if (process.env.NODE_ENV === "development") {
  db = getFirestore();
  connectFirestoreEmulator(db, "host.docker.internal", 8081);
} else {
  db = getFirestore(app);
}

export { db };
