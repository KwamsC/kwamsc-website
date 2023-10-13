import app from "./app";
import config from "./config/config";

// app.get("/", (req: Request, res: Response) => {
//   res.send("Starting Server");
// });

app.listen(config.port, () =>
  console.log("App is listening on port " + config.port)
);
