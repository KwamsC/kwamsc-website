import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import cors, { CorsOptions } from 'cors';
import { setCache } from './middleware/postCache';
import { rateLimit } from 'express-rate-limit';
import recipeRoutes from './components/recipe/routes';
import postRoutes from './components/post/routes';

const app: Application = express();
app.set('trust proxy', 1);

// CORS
const allowedOrigins = ['http://localhost:5173', 'http://kwamsc.com', 'https://kwamsc.com/'];
const corsOptions: CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(corsOptions));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

// Apply the rate limiting middleware to all requests.
app.use(limiter);
app.use(express.json({ limit: '300kb' }));
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(setCache);

// Routes
app.use('/api/v1', postRoutes);
app.use('/api/v1', recipeRoutes);

app.get('/ip', (request, response) => response.send(request.ip));
app.get('/', (req: Request, res: Response) => {
  res.send('Starting Server');
});

export default app;
