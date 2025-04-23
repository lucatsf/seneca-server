import Queue from "bull";
import { redisConfig } from "../../shared/config/redisConfig";

export class QueueProvider {
	private queues: { [key: string]: Queue.Queue } = {};

	constructor() {
		this.setupQueues();
	}

	private setupQueues(): void {
		// Cria uma fila para emails
		this.queues["mail"] = new Queue("mail", {
			redis: redisConfig,
		});
	}

	public getQueue(name: string): Queue.Queue {
		return this.queues[name];
	}
}

export const queueProvider = new QueueProvider();
