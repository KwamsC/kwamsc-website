import fastify from "fastify";
import cors from "@fastify/cors";
import postRoutes from "./api/posts/routes";
import recipeRoutes from "./api/recipes/routes";
import fastifyHelmet from "@fastify/helmet";
import fastifyRateLimit from "@fastify/rate-limit";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

const envToLogger = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
  production: true,
  test: false,
};

const app = fastify({ logger: envToLogger[process.env.NODE_ENV ?? "default"] ?? true });

const swaggerOptions = {
  openapi: {
    openapi: "3.0.0",
    info: {
      title: "KwamsC website",
      description: "KwamsC API",
      version: "0.1.0",
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "Development server",
      },
    ],
    tags: [
      { name: "recipes", description: "User related end-points" },
      { name: "posts", description: "Code related end-points" },
    ],
  },
};

const swaggerUiOptions = {
  routePrefix: "/docs",
  exposeRoute: true,
};

const allowedOrigins = ["http://localhost:5173", "http://kwamsc.com", "https://kwamsc.com/"];

app.register(cors, { origin: allowedOrigins });
app.register(fastifyRateLimit, {
  max: 100,
  timeWindow: "1 minute",
});

app.register(fastifySwagger, swaggerOptions);
app.register(fastifySwaggerUi, swaggerUiOptions);

app.register(fastifyHelmet, {
  contentSecurityPolicy: {
    directives: {
      upgradeInsecureRequests: null,
    },
  },
});

// Routes
app.register(postRoutes, { prefix: "/api/v1/posts" });
app.register(recipeRoutes, { prefix: "/api/v1/recipes" });

app.get("/", async (_request, reply) => {
  return reply.send("Starting Server");
});

export default app;
