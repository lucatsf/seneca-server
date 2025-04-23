import { inject, injectable } from "inversify";
import { TYPES } from "../../../../di/types";
import { IClientRepository } from "../repositories/IClientRepository";
import { DeleteClientDTO } from "../../presentation/dtos/DeleteClientDTO";
import { SendError } from "../../../../shared/errors/SendError";

@injectable()
export class DeleteClientUseCase {
	constructor(
		@inject(TYPES.ClientRepository)
		private readonly clientRepository: IClientRepository,
	) {}

	async execute(deleteClientDTO: DeleteClientDTO): Promise<void> {
		const { id } = deleteClientDTO;

		if (!id) {
			throw new SendError("Client ID is required", 400);
		}

		await this.clientRepository.delete(id);
	}
}
