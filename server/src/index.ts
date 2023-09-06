import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import config from "../config";
import postRoutes from "./routes/post-routes";
import { setCache } from "./middleWare/postCache";

const app = express()

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use("/api", postRoutes.routes)
app.use(setCache)

app.get("/", (req, res) => {
  res.send("Started App");
});

app.listen(config.port, () =>
  console.log("App is listening on port " + config.port)
);
