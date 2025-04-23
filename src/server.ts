import "reflect-metadata";
import { AppDataSource } from "./infrastructure/database/data-source";
import { ExpressServer } from "./infrastructure/http/express/ExpressServer";
import "./infrastructure/queue/workers/mailWorker";

AppDataSource.initialize()
	.then(() => {
		const port = parseInt(process.env.PORT || "3000");
		const server = new ExpressServer();
		server.start(port);
	})
	.catch((err) => {
		console.error("Error during Data Source initialization:", err);
	});
