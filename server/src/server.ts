import app from "#app.js";
import config from "#config/config.js";

app.listen(config.port, () =>
	console.log(`App is listening on port ${config.port}`),
);

// log unhandled rejections
process.on("unhandledRejection", (err) => {
	console.log(err);
});

process.on("uncaughtException", (error) => {
	console.log(error);
});
