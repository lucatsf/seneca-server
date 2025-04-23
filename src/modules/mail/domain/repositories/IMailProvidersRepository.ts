import { Email } from "../entities/Email";

export interface IMailProvidersRepository {
	send(email: Email): Promise<any>;
}
