import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { swaggerUI } from '@hono/swagger-ui'
import { apiDocumentation } from "./docs/apidoc.ts";
import postRoutes from "./components/post/routes.ts";
import recipeRoutes from "./components/recipe/routes.ts";

const app = new Hono();

// Trust proxy for rate limiting
app.use("*", async (c, next) => {
  c.req.raw.headers.set("x-forwarded-for", c.req.header("x-forwarded-for") || "");
  await next();
});

// CORS
const allowedOrigins = [
  "http://localhost:5173",
  "http://kwamsc.com",
  "https://kwamsc.com",
];

app.use(
  "*",
  cors({
    origin: allowedOrigins,
  })
);

// Pretty JSON for development
app.use("*", prettyJSON());

// Logger
app.use("*", logger());

// Routes
app.get("/robots.txt", (c) => {
  return c.text("User-agent: *\nDisallow: /");
});

app.get("/ip", (c) => {
  return c.text(c.req.header("x-forwarded-for") || c.req.header("x-real-ip") || "unknown");
});

// Serve the OpenAPI document
app.get('/open-api-doc', (c) => c.json(apiDocumentation))

// Use the middleware to serve Swagger UI at /ui
app.get('/docs', swaggerUI({ url: '/open-api-doc' }))

app.get('/health', (c) => c.text('OK'))
app.get("/", (c) => {
  return c.text("Starting Server");
});

// API Routes
app.route("/api/v1", postRoutes);
app.route("/api/v1", recipeRoutes);

export default app;
