import express, { Application, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import postRoutes from "./routes/post-routes";
import { limiter } from "./middleWare/rateLimiter";
// import { setCache } from "./middleWare/postCache";

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(limiter)
// app.use(setCache);
app.use("/api/posts", postRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Starting Server");
});

// // Below route is trigerred when any error is is thrown
// app.use((err: Error, req: Request, res:Response) => {
//   res.status(500).json({message: err.message});
// });

export default app;