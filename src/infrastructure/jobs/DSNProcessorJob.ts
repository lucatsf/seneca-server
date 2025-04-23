import https from "https";
import { TypeORMMailRepository } from "../database/typeorm/repositories/TypeORMMailRepository";

export class DSNProcessorJob {
	private typeORMMailRepository: TypeORMMailRepository;
	constructor() {
		this.typeORMMailRepository = new TypeORMMailRepository();
	}

	async execute(): Promise<void> {
		const options = {
			hostname: "mail.nomus.cloud",
			port: 443,
			path: "/api/v1/get/logs/postfix/500",
			method: "GET",
			headers: {
				"X-API-Key": "",
			},
		};

		const req = https.request(options, (res) => {
			let data = "";

			res.on("data", (chunk) => {
				data += chunk;
			});

			res.on("end", async () => {
				try {
					const logs = JSON.parse(data);
					await this.processLogs(logs);
				} catch (error) {
					console.error("Error processing logs:", error);
				}
			});
		});

		req.on("error", (error) => {
			console.error("Error fetching logs:", error);
		});

		req.end();
	}

	private async processLogs(logs: any[]): Promise<void> {
		for (const log of logs) {
			if (log.message.includes("Received: from [127.0.0.1]")) {
				const messageId = this.extractMessageId(log.message);
				if (messageId) {
					await this.updateEmailStatus(messageId, log.message);
				}
			}
		}
	}

	private extractMessageId(message: string): string | null {
		const regex = /^([A-Z0-9]+):/;
		const match = message.match(regex);
		return match ? match[1] : null;
	}

	private extractDeliveryTime(message: string): Date | null {
		const regex =
			/([A-Za-z]{3},\s+\d{1,2}\s+[A-Za-z]{3}\s+\d{4}\s+\d{2}:\d{2}:\d{2}\s+[+-]\d{4})/;
		const match = message.match(regex);

		if (match && match[1]) {
			try {
				return new Date(match[1]);
			} catch (error) {
				console.error("Error parsing date:", error);
				return null;
			}
		}
		return null;
	}

	private async updateEmailStatus(
		messageId: string,
		message: string,
	): Promise<void> {
		try {
			const email = await this.typeORMMailRepository.findByCodeQueue(messageId);
			if (email) {
				const deliveryTime = this.extractDeliveryTime(message);
				if (deliveryTime) {
					email.delivered_at = deliveryTime;
				}
				await this.typeORMMailRepository.update(email);
			}
		} catch (error) {
			console.error(
				`Error updating email with code_queue ${messageId}:`,
				error,
			);
		}
	}
}
