import { mock } from "node:test";
import { getAuth } from "firebase-admin/auth";
import { app } from "../src/config/firebase-config.ts";

export const setupAuthMock = {
  success: () => {
    mock.method(getAuth(app), "verifyIdToken", async () => ({
      uid: "test-user-id",
      email: "test@example.com",
    }));
  },
  failure: () => {
    mock.method(getAuth(app), "verifyIdToken", async () => {
      throw new Error("Invalid token");
    });
  },
};
