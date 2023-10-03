// import express from "express";
// import cors from "cors";
// import bodyParser from "body-parser";
// import config from "../config";
// import postRoutes from "./routes/post-routes";
// import { setCache } from "./middleWare/postCache";

// const app = express()

// app.use(express.json())
// app.use(cors())
// app.use(bodyParser.json())
// app.use("/api", postRoutes.routes)
// app.use(setCache)

// app.get("/", (req, res) => {
//   res.send("Started App");
// });

// app.listen(config.port, () =>
//   console.log("App is listening on port " + config.port)
// );

import express, { Application, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import config from "../config";
import postRoutes from "./routes/post-routes";
// import { setCache } from "./middleWare/postCache";
// import creteHttpError from 'http-errors'

// var admin = require("firebase-admin");

// var serviceAccount = require("path/to/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://kwame-website.firebaseio.com"
// });

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use("/api", postRoutes.routes);
// app.use(setCache);
// app.use((req, res, next)=>{
//   next(new createHttpError.notFound())
// })

app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

app.listen(config.port, () =>
  console.log("App is listening on port " + config.port)
);
