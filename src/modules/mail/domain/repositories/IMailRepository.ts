import { MailEntity } from "../../../../infrastructure/database/entities/MailEntity";

export interface IMailRepository {
	save(email: MailEntity): Promise<MailEntity>;
	update(email: MailEntity): Promise<void>;
	findByCodeQueue(code_queue: string): Promise<MailEntity | null>;
	findByTrackId(id: string): Promise<MailEntity | null>;
}
