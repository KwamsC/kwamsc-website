import fastify from 'fastify';
import cors from '@fastify/cors';
import postRoutes from '../routes/post-routes';
import recipeRoutes from '../routes/recipe-routes';
import helmet from '@fastify/helmet';

const app = fastify({
  logger: true
});

const allowedOrigins = ['http://localhost:5173', 'http://kwamsc.com', 'https://kwamsc.com/', 'http://localhost:8080'];

app.register(cors, { origin: allowedOrigins });
app.register(helmet);
app.register(import('@fastify/rate-limit'), {
  max: 100,
  timeWindow: '1 minute'
});

// Routes
app.register(postRoutes, { prefix: '/api/v1/posts' });
app.register(recipeRoutes, { prefix: '/api/v1/recipes' });


app.get('/', async (_request, reply) => {
  return reply.send('Starting Server');
});

export default app;
