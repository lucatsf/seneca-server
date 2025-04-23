import cron from "node-cron";
import { DSNProcessorJob } from "../DSNProcessorJob";

export class DSNProcessorScheduler {
	schedule(): void {
		// Executa a cada 2 minuto
		cron.schedule("*/2 * * * *", async () => {
			const job = new DSNProcessorJob();
			await job.execute();
		});
	}
}
