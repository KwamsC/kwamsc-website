import { getFirestore } from "firebase-admin/firestore";
import { app } from "./firebase-config.ts";

// Get Firestore instance from Firebase Admin SDK
const db = getFirestore(app);

// Connect to Firestore Emulator in development
if (process.env.NODE_ENV === "development") {
  const firestoreEmulatorHost =
    process.env.FIRESTORE_EMULATOR_HOST || "firebase-tools:8081";
  // Set the emulator host for Admin SDK
  process.env.FIRESTORE_EMULATOR_HOST = firestoreEmulatorHost;
  console.log(`🔥 Firestore Emulator enabled: ${firestoreEmulatorHost}`);
}

export { db };
