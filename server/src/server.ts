import { serve } from "@hono/node-server";
import app from "./app.ts";
import config from "./config/config.ts";

const port = Number(config.port) || 8080;

const server = serve(
	{
		fetch: app.fetch,
		port,
	},
	(info) => {
		console.log(`App is listening on port ${info.port}`);
	},
);

// graceful shutdown
process.on("SIGINT", () => {
	server.close();
	process.exit(0);
});
process.on("SIGTERM", () => {
	server.close((err) => {
		if (err) {
			console.error(err);
			process.exit(1);
		}
		process.exit(0);
	});
});
