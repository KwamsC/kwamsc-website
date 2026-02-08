import { applicationDefault, initializeApp } from "firebase-admin/app";

// Connect to Firebase Auth Emulator in development
if (process.env.NODE_ENV === "development") {
  // Use service name when running in Docker, localhost otherwise
  const authEmulatorHost =
    process.env.FIREBASE_AUTH_EMULATOR_HOST || "firebase-tools:9099";
  process.env.FIREBASE_AUTH_EMULATOR_HOST = authEmulatorHost;
  // Set project ID for emulator
  process.env.GCLOUD_PROJECT = process.env.PROJECT_ID || "kwame-website";
  console.log(`🔥 Firebase Auth Emulator enabled: ${authEmulatorHost}`);
}

// Production: Uses Application Default Credentials (ADC) from Cloud Run
// Development: Uses emulators (FIREBASE_AUTH_EMULATOR_HOST set above)
// export const app = initializeApp({
//   credential:
//     process.env.NODE_ENV === "production"
//       ? applicationDefault() // Cloud Run service account
//       : undefined, // Emulator doesn't need credentials
//   projectId: process.env.PROJECT_ID || "kwame-website",
// });

export const app =
  process.env.NODE_ENV === "production"
    ? initializeApp({
        credential: applicationDefault(),
        projectId: process.env.PROJECT_ID || "kwame-website",
        databaseURL: "https://kwame-website.firebaseio.com",
      })
    : initializeApp({
        projectId: process.env.PROJECT_ID || "kwame-website",
      });
