import type { FastifyRequest, FastifyReply } from "fastify";
import { app } from "../config/firebase-config.ts";

export const authenticateJWT = async (req: FastifyRequest, reply: FastifyReply) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    reply.status(401).send();
    return;
  }

  try {
    const idToken = authHeader.split(" ")[1];

    return await app.auth().verifyIdToken(idToken);
  } catch (error) {
    console.error(`Error verifying token: ${error}`);

    return reply.status(403).send();
  }
};
