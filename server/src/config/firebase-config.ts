import { initializeApp } from "firebase-admin/app";

// Connect to Firebase Auth Emulator in development
if (process.env.NODE_ENV === "development") {
  console.log(
    `🔥 Firebase Auth Emulator enabled: ${process.env.FIREBASE_AUTH_EMULATOR_HOST}`,
  );
}

export const app = initializeApp();
