import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import postRoutes from '../routes/post-routes';
import recipeRoutes from '../routes/recipe-routes';
import { setCache } from '../middleware/postCache';
import { rateLimit } from 'express-rate-limit';

const app: Application = express();

const allowedOrigins = ['http://localhost:5173', 'http://kwamsc.com', 'https://kwamsc.com/'];
const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

// Apply the rate limiting middleware to all requests.
app.use(limiter);
app.use(cors(corsOptions));
app.use(express.json({ limit: '300kb' }));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(setCache);

// Routes
app.use('/api/v1', postRoutes);
app.use('/api/v1', recipeRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Starting Server');
});

export default app;
