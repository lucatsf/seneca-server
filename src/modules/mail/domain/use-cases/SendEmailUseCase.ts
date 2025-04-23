import { inject, injectable } from "inversify";
import { Email } from "../entities/Email";
import { IMailRepository } from "../repositories/IMailRepository";
import { TYPES } from "../../../../di/types";
import { generateUUID } from "../../../../shared/utils/generateUUID";
import { SendEmailDTO } from "../../presentation/dtos/SendEmailDTO";
import { IMailProvidersRepository } from "../repositories/IMailProvidersRepository";
import { ResponseSendEmail } from "../../../../infrastructure/providers/NodemailerMailProvider";

@injectable()
export class SendEmailUseCase {
	constructor(
		@inject(TYPES.MailRepository)
		private readonly mailRepository: IMailRepository,
		@inject(TYPES.MailProvidersRepository)
		private readonly mailProvidersRepository: IMailProvidersRepository,
	) {}

	async execute({
		to,
		subject,
		body,
		sender,
		attachments,
	}: SendEmailDTO): Promise<void> {
		const email = new Email(
			generateUUID(),
			to,
			sender,
			subject,
			body,
			attachments,
		);

		const result: ResponseSendEmail =
			await this.mailProvidersRepository.send(email);
		await this.mailRepository.save(result);
	}
}
