import { getFirestore } from "firebase-admin/firestore";
import { app } from "./firebase-config.ts";

// Get Firestore instance from Firebase Admin SDK
const db = getFirestore(app);

// Connect to Firestore Emulator in development
if (process.env.NODE_ENV === "development") {
  console.log(
    `🔥 Firestore Emulator enabled: ${process.env.FIRESTORE_EMULATOR_HOST}`,
  );
}

export { db };
