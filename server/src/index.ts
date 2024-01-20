import app from "./app";
import config from "./config/config";

app.listen(config.port, () =>
  console.log("App is listening on port " + config.port)
);

// log unhandled rejections
process.on('unhandledRejection', (err) => {
  console.log(err);
});