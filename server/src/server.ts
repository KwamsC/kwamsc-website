import app from "./app.ts";
import config from "./config/config.ts";

app.listen(config.port, () =>
  console.log(`App is listening on port ${config.port}`)
);

// log unhandled rejections
process.on("unhandledRejection", (err) => {
  console.log(err);
});

process.on("uncaughtException", (error) => {
  console.log(error);
});
