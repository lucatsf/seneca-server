import { AppDataSource } from "../../data-source";
import { Repository, IsNull } from "typeorm";
import { MailEntity } from "../../entities/MailEntity";
import { IMailRepository } from "../../../../modules/mail/domain/repositories/IMailRepository";

export class TypeORMMailRepository implements IMailRepository {
	private mailRepository: Repository<MailEntity> =
		AppDataSource.getRepository(MailEntity);

	async save(email: MailEntity): Promise<MailEntity> {
		return await this.mailRepository.save(email);
	}

	async update(email: MailEntity): Promise<void> {
		await this.mailRepository.update(email.id, email);
	}

	async findByCodeQueue(code_queue: string): Promise<MailEntity | null> {
		return await this.mailRepository.findOne({
			where: {
				code_queue,
				delivered_at: IsNull(),
			},
		});
	}

	async findByTrackId(id: string): Promise<MailEntity | null> {
		return await this.mailRepository.findOneBy({ id });
	}
}
