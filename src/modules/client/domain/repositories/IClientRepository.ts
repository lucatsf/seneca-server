import { Client } from "../entities/Client";

export interface IClientRepository {
	save(client: Client): Promise<Client>;
	findAll(page: number): Promise<Client[]>;
	update(client: Client): Promise<void>;
	delete(id: string): Promise<void>;
}
