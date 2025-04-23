import { inject, injectable } from "inversify";
import { MailEntity } from "../../../../infrastructure/database/entities/MailEntity";
import { IMailRepository } from "../repositories/IMailRepository";
import { TYPES } from "../../../../di/types";

@injectable()
export class TrackEmailOpenUseCase {
	constructor(
		@inject(TYPES.MailRepository)
		private readonly mailRepository: IMailRepository,
	) {}

	async execute(trackId: string): Promise<void> {
		const email: MailEntity | null =
			await this.mailRepository.findByTrackId(trackId);
		if (email && !email.opened_at) {
			email.opened_at = new Date();
			if (!email.delivered_at) {
				email.delivered_at = new Date();
			}
			await this.mailRepository.update(email);
		}
	}
}
