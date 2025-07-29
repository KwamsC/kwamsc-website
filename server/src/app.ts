import fastify from "fastify";
import cors from "@fastify/cors";
import postRoutes from "./api/posts/routes.ts";
import recipeRoutes from "./api/recipes/routes.ts";
import fastifyHelmet from "@fastify/helmet";
import fastifyRateLimit from "@fastify/rate-limit";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

const envToLogger: Record<"development" | "production" | "test", any> = {
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

function build(opts = {}) {
  const nodeEnv = (process.env.NODE_ENV as "development" | "production" | "test") ?? "development";
  const app = fastify({ logger: envToLogger[nodeEnv] ?? true });

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
          url:
            process.env.NODE_ENV === "production"
              ? "https://api.kwamsc.com"
              : "http://127.0.0.1:8080",
          description:
            process.env.NODE_ENV === "production" ? "Production server" : "Development server",
        },
      ],
      tags: [
        { name: "recipes", description: "recipes related end-points" },
        { name: "posts", description: "posts related end-points" },
      ],
    },
  };

  const swaggerUiOptions = {
    routePrefix: "/docs",
    exposeRoute: true,
  };

  const allowedOrigins = [
    "http://localhost:5173",
    "http://kwamsc.com",
    "https://kwamsc.com/",
    "https://www.kwamsc.com/",
  ];

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

  return app;
}

export default build;
