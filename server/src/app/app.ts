// import express, { Application, Request, Response } from 'express';
import Fastify from 'fastify';
import cors from '@fastify/cors';
// import postController from 'controllers/postController';
// import bodyParser from 'body-parser';
import postRoutes from '../routes/post-routes';
// import recipeRoutes from '../routes/recipe-routes';
// import { setCache } from '../middleware/postCache';
import helmet from '@fastify/helmet';

const app = Fastify({
  logger: true
});

const allowedOrigins = ['http://localhost:5173', 'http://kwamsc.com', 'https://kwamsc.com/', 'http://localhost:8080'];

app.register(cors, { origin: allowedOrigins });
app.register(helmet);
// app.register(import('@fastify/rate-limit'), {
//   max: 100,
//   timeWindow: '1 minute'
// });

// app.register(fastifyHelmet);

// app.addHook('preHandler', setCache);
// // app.use(setCache);

// // Routes
// app.route({
//   method: 'GET',
//   url: '/api/v1',
//   schema: {
//     querystring: {
//       name: { type: 'string' },
//       excitement: { type: 'integer' }
//     },
//     response: {
//       200: {
//         type: 'object',
//         properties: {
//           hello: { type: 'string' }
//         }
//       }
//     }
//   },
//   handler: function (request, reply) {
//     reply.send({ hello: 'world' });
//   }
// });
app.register(postRoutes, { prefix: '/api/v1' });
// app.register(postRoutes, { prefix: '/api/v1' });
// app.register(recipeRoutes, { prefix: '/api/v1' });

// app.register(postRoutes, '/api/v1', postRoutes);
// app.use('/api/v1', recipeRoutes);

// app.get('/', (req: Request, res: Response) => {
//   res.send('Starting Server');
// });

app.get('/', async (request, reply) => {
  return 'Starting Server';
});

// app.listen(3000, (err, address) => {
//   if (err) {
//     console.error(err);
//     process.exit(1);
//   }
//   console.log(`Server listening on ${address}`);
// });

export default app;
