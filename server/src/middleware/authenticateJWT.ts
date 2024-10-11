import { FastifyRequest, FastifyReply } from "fastify";
import { app } from "../config/firebase-config";

export const authenticateJWT = async (req: FastifyRequest, reply: FastifyReply) => {
  const authHeader = req.headers["authorization"];

  try {
    if (authHeader) {
      const idToken = authHeader.split(" ")[1];

      return await app.auth().verifyIdToken(idToken);
    } else {
      return reply.status(401).send();
    }
  } catch (error) {
    console.error(`Error verifying token: ${error}`);

    return reply.status(403).send();
  }
};
