import fastify from "fastify";
import cors from "@fastify/cors";
import postRoutes from "./api/posts/routes";
import recipeRoutes from "./api/recipes/routes";
import helmet from "@fastify/helmet";
import fastifyRateLimit from "@fastify/rate-limit";

const app = fastify({ logger: true });

const allowedOrigins = [
  "http://localhost:5173",
  "http://kwamsc.com",
  "https://kwamsc.com/",
  "http://localhost:8080",
];

app.register(cors, { origin: allowedOrigins });
app.register(helmet);
app.register(fastifyRateLimit, {
  max: 100,
  timeWindow: "1 minute",
});

// Routes
app.register(postRoutes, { prefix: "/api/v1/posts" });
app.register(recipeRoutes, { prefix: "/api/v1/recipes" });

app.get("/", async (_request, reply) => {
  return reply.send("Starting Server");
});

export default app;
