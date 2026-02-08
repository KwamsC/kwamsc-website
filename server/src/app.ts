import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { swaggerUI } from "@hono/swagger-ui";
import { apiDocumentation } from "./docs/apidoc.ts";
import postRoutes from "./components/post/routes.ts";
import recipeRoutes from "./components/recipe/routes.ts";
// import uploadRoutes from "./components/upload/routes.ts";

const app = new Hono();

// Trust proxy for rate limiting
app.use("*", async (c, next) => {
  c.req.raw.headers.set(
    "x-forwarded-for",
    c.req.header("x-forwarded-for") || "",
  );
  await next();
});

// CORS
const allowedOrigins = [
  "http://localhost:5173",
  "http://kwamsc.com",
  "https://kwamsc.com",
];

app.use("/api/*", cors({ origin: allowedOrigins }));

// Pretty JSON and logger for development
if (process.env.NODE_ENV !== "production") {
  app.use("*", prettyJSON());
  app.use("*", logger());
}

app.get("/ip", (c) => {
  return c.text(
    c.req.header("x-forwarded-for") || c.req.header("x-real-ip") || "unknown",
  );
});

// app.get("/signed-url", async (c) => {
//   c.header("Cache-Control", "no-store");
//   // Lazy-load heavy AWS SDK imports to improve cold-start performance
//   const { PutObjectCommand } = await import("@aws-sdk/client-s3");
//   const { getSignedUrl } = await import("@aws-sdk/s3-request-presigner");
//   const { R2 } = await import("#services/r2.ts");

//   const filename = c.req.query("filename");
//   const contentType = c.req.query("contentType");

//   if (!filename || !contentType) {
//     return c.json({ error: "Missing filename or contentType" }, 400);
//   }

//   const key = `uploads/${Date.now()}-${filename}`;
//   const command = new PutObjectCommand({
//     Bucket: process.env.CLOUDFLARE_BUCKET!,
//     Key: key,
//     ContentType: contentType,
//   });

//   const signedUrl = await getSignedUrl(R2, command, { expiresIn: 60 }); // 1 min

//   const publicUrl = `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com/${process.env.CLOUDFLARE_BUCKET}/${key}`;

//   return c.json({ signedUrl, publicUrl });
// });

// Serve the OpenAPI document
app.get("/open-api-doc", (c) => c.json(apiDocumentation));

// Use the middleware to serve Swagger UI at /ui
app.get("/docs", swaggerUI({ url: "/open-api-doc" }));

app.get("/health", (c) => c.text("OK"));
app.get("/", (c) => {
  return c.text("Starting Server");
});

// API Routes
app.route("/api/v1", postRoutes);
app.route("/api/v1", recipeRoutes);
// app.route("/api/v1/upload", uploadRoutes);

export default app;
