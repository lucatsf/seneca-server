import { inject, injectable } from "inversify";
import { TYPES } from "../../../../di/types";
import { IClientRepository } from "../repositories/IClientRepository";
import { UpdateClientDTO } from "../../presentation/dtos/UpdateClientDTO";
import { Client } from "../entities/Client";
import { SendError } from "../../../../shared/errors/SendError";

@injectable()
export class UpdateClientUseCase {
	constructor(
		@inject(TYPES.ClientRepository)
		private readonly clientRepository: IClientRepository,
	) {}

	async execute(updateClientDTO: UpdateClientDTO): Promise<void> {
		const { id, email, name, phone } = updateClientDTO;

		if (!id) {
			throw new SendError("Client ID is required", 400);
		}

		if (!email) {
			throw new SendError("Email is required", 400);
		}

		const client = new Client(id, email, name, phone);
		await this.clientRepository.update(client);
	}
}
