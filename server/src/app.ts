import { apiDocumentation } from "./docs/apidoc.ts";
import { setCache } from "./middleware/postCache.ts";
import cors, { type CorsOptions } from "cors";
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { rateLimit } from "express-rate-limit";

import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import postRoutes from "./components/post/routes.ts";
import recipeRoutes from "./components/recipe/routes.ts";

const app: Application = express();
app.set("trust proxy", 1);

// CORS
const allowedOrigins = ["http://localhost:5173"];
const corsOptions: CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(corsOptions));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

// Apply the rate limiting middleware to all requests.
app.use(limiter);
app.use(express.json({ limit: "300kb" }));
app.use(express.urlencoded({ extended: false }));
app.use(setCache);

// Routes
app.use("/docs", swaggerUi.serve, swaggerUi.setup(apiDocumentation));
app.use("/api/v1", postRoutes);
app.use("/api/v1", recipeRoutes);
app.use(helmet());

app.get("/ip", (request, response) => response.send(request.ip));
app.get("/", (req: Request, res: Response) => {
  res.send("Starting Server");
});

export default app;
