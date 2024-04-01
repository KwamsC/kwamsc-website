// import { NextFunction, Request, Response } from 'express';
// import { app } from '../config/firebase-config';

// export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
//   const authHeader = req.headers.authorization;

//   if (authHeader) {
//     const idToken = authHeader.split(' ')[1];
//     // console.log(authHeader)
//     app
//       .auth()
//       .verifyIdToken(idToken)
//       .then(() => {
//         return next();
//       })
//       .catch((error) => {
//         console.log(`Catch ${ error}`);
//         return res.sendStatus(403);
//       });
//   } else {
//     res.sendStatus(401);
//   }
// };


import { FastifyRequest, FastifyReply } from 'fastify';
import { app } from '../config/firebase-config';

export const authenticateJWT = async (req: FastifyRequest, reply: FastifyReply) => {
  const authHeader = req.headers['authorization'];

  if (authHeader) {
    const idToken = authHeader.split(' ')[1];
    try {
      await app.auth().verifyIdToken(idToken);
    } catch (error) {
      console.error(`Error verifying ID token: ${error}`);
      reply.code(403).send('Forbidden');
    }
  } else {
    reply.code(401).send('Unauthorized');
  }
};