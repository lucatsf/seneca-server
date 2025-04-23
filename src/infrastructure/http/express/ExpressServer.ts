import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { RouterRegistry } from "../routes/RouterRegistry";
import { loggerMiddleware } from "../middlewares/LoggerMiddleware";
import { bullBoardProvider } from "../../providers/BullBoardProvider";
import { startAllSchedulers } from "../../jobs/schedulers/Schedulers";

export class ExpressServer {
	private app: express.Application;

	constructor() {
		this.app = express();
		this.setupMiddlewares();
		this.setupRoutes();
		this.setupBullBoard();
	}

	private setupMiddlewares(): void {
		this.app.use(cors());
		this.app.use(bodyParser.json());
		this.app.use(loggerMiddleware);
		// Adicione outros middlewares globais aqui
	}

	private setupRoutes(): void {
		const router = RouterRegistry.registerRoutes();
		this.app.use("/api", router); // Prefixo para todas as rotas (ex: /api/mail/send)
	}

	private setupBullBoard(): void {
		this.app.use("/api/admin/queues", bullBoardProvider.getRouter()); // Rota do Bull Board
	}

	public start(port: number): void {
		startAllSchedulers();
		this.app.listen(port, () => {
			console.log(`Server running on port ${port}`);
			console.log(
				`Bull Board available at http://localhost:${port}/api/admin/queues`,
			);
		});
	}
}
