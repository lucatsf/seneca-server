import { IClientRepository } from "../../../../modules/client/domain/repositories/IClientRepository";
import { Client } from "../../../../modules/client/domain/entities/Client";
import { AppDataSource } from "../../data-source";
import { ClientEntity } from "../../entities/ClientEntity";

export class TypeORMClientRepository implements IClientRepository {
	private clientRepository = AppDataSource.getRepository(ClientEntity);

	async save(client: Client): Promise<Client> {
		const clientEntity = this.clientRepository.create({
			id: client.id,
			email: client.email,
			name: client.name,
			phone: client.phone,
		});
		return await this.clientRepository.save(clientEntity);
	}

	async findAll(page: number): Promise<Client[]> {
		const clients = await this.clientRepository.find({
			skip: (page - 1) * 10,
			take: 10,
		});
		return clients.map(
			(client: Client) =>
				new Client(client.id, client.email, client.name, client.phone),
		);
	}

	async update(client: Client): Promise<void> {
		await this.clientRepository.update(client.id, {
			email: client.email,
			name: client.name,
			phone: client.phone,
		});
	}

	async delete(id: string): Promise<void> {
		await this.clientRepository.delete(id);
	}
}
