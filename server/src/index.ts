import app from "./app";
import config from "./config/config";

app.listen({ host: config.address, port: parseInt(config.port, 10) }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
