import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import postRoutes from "./routes/post-routes";
import { setCache } from "./middleWare/postCache";

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(setCache);
app.use("/api/v1", postRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Starting Server");
});

export default app;