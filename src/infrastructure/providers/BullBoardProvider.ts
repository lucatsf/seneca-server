import { ExpressAdapter } from "@bull-board/express";
import { createBullBoard } from "@bull-board/api";
import { BullAdapter } from "@bull-board/api/bullAdapter";
import { mailQueue } from "../queue/queues/mailQueue"; // Importe as filas que deseja monitorar

export class BullBoardProvider {
	private serverAdapter: ExpressAdapter;

	constructor() {
		this.serverAdapter = new ExpressAdapter();
		this.setupBullBoard();
	}

	private setupBullBoard(): void {
		const bullBoard = createBullBoard({
			queues: [new BullAdapter(mailQueue)], // Adicione todas as filas aqui
			serverAdapter: this.serverAdapter,
		});

		this.serverAdapter.setBasePath("/api/admin/queues");
	}

	public getRouter(): any {
		return this.serverAdapter.getRouter();
	}
}

export const bullBoardProvider = new BullBoardProvider();
