import { mock } from "node:test";
import { getAuth } from "firebase-admin/auth";
import { app } from "#config/firebase-config.ts";

export const mockSuccessfulAuth = () => {
  // Mock successful authentication
  mock.method(getAuth(app), "verifyIdToken", async () => ({
    uid: "test-user-id",
    email: "test@example.com",
  }));
};

// export const mockFailedAuth = () => {
//   // Mock failed authentication
//   mock.method(getAuth(app), 'verifyIdToken', async () => {
//     throw new Error('Invalid token');
//   });
// };

// export const mockMissingToken = () => {
//   // Mock missing token scenario
//   mock.method(getAuth(app), 'verifyIdToken', async () => {
//     throw new Error('No token provided');
//   });
// };
