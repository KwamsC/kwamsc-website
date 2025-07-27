import type { NextFunction, Request, Response } from "express";
import { app } from "../config/firebase-config.ts";
import { getAuth } from "firebase-admin/auth";

export const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.log("No authorization header provided");
    res.sendStatus(401);
    return;
  }

  const idToken = authHeader.split(" ")[1];

  try {
    await getAuth(app).verifyIdToken(idToken);
    next();
    return;
  } catch (error) {
    console.log(`Catch ${error}`);
    res.sendStatus(403);
    return;
  }
};
