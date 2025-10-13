import type { Context, Next } from "hono";
import { app } from "../config/firebase-config.ts";
import { getAuth } from "firebase-admin/auth";

export const authenticateJWT = async (c: Context, next: Next) => {
  const authHeader = c.req.header("authorization");

  if (!authHeader) {
    console.log("No authorization header provided");
    return c.text("Unauthorized", 401);
  }

  const idToken = authHeader.split(" ")[1];

  if (!idToken) {
    console.log("No token provided");
    return c.text("Unauthorized", 401);
  }

  try {
    await getAuth(app).verifyIdToken(idToken);
    await next();
  } catch (error) {
    console.log(`Catch ${error}`);
    return c.text("Forbidden", 403);
  }
};
