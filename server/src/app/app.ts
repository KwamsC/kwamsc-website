// import express, { Application, Request, Response } from 'express';
import fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyExpress from '@fastify/express'; 
import postRoutes from '../routes/post-routes';
// import recipeRoutes from '../routes/recipe-routes';
// import { setCache } from '../middleware/postCache';
import helmet from '@fastify/helmet';

const app = fastify({
  logger: true
});

const allowedOrigins = ['http://localhost:5173', 'http://kwamsc.com', 'https://kwamsc.com/', 'http://localhost:8080'];

app.register(cors, { origin: allowedOrigins });
app.register(fastifyExpress);
app.register(helmet);

// app.register(import('@fastify/rate-limit'), {
//   max: 100,
//   timeWindow: '1 minute'
// });
app.register(postRoutes, { prefix: '/api/v1' });
// app.register(recipeRoutes, { prefix: '/api/v1' });


app.get('/', async (request, reply) => {
  return 'Starting Server';
});

export default app;
