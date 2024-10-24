import app from "./app";
import config from "./config/config";

app.listen({ host: config.address, port: parseInt(config.port, 10) }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});

app.addHook("onClose", (instance, done) => {
  instance.log.info("Server is shutting down...");
  // Perform any necessary cleanup tasks here
  done();
});

process.on("SIGINT", () => {
  app.close(() => {
    app.log.info("Server has been shut down");
    process.exit(0);
  });
});
