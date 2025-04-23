import { inject, injectable } from "inversify";
import { Client } from "../entities/Client";
import { IClientRepository } from "../repositories/IClientRepository";
import { TYPES } from "../../../../di/types";
import { CreateClientDTO } from "../../presentation/dtos/CreateClientDTO";
import { generateUUID } from "../../../../shared/utils/generateUUID";
import { SendError } from "../../../../shared/errors/SendError";

@injectable()
export class CreateClientUseCase {
	constructor(
		@inject(TYPES.ClientRepository)
		private readonly clientRepository: IClientRepository,
	) {}

	async execute(createClientDTO: CreateClientDTO): Promise<Client> {
		const { email, name, phone } = createClientDTO;

		if (!email) {
			throw new SendError("Email is required", 400);
		}

		if (!name) {
			throw new SendError("Name is required", 400);
		}

		const client = new Client(generateUUID(), email, name, phone);
		return await this.clientRepository.save(client);
	}
}
