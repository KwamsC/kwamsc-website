import { FastifyRequest, FastifyReply } from 'fastify';
import { app } from '../config/firebase-config';

export const authenticateJWT = async (req: FastifyRequest, reply: FastifyReply, done) => {
  const authHeader = req.headers['authorization'];

  if (authHeader) {
    const idToken = authHeader.split(' ')[1];
    app
      .auth()
      .verifyIdToken(idToken)
      .then(() => {
        return done();
      })
      .catch((error) => {
        console.log(`Catch ${ error}`);
        return reply.status(403).send();
      });
  } else {
    reply.status(401).send();
  }
};