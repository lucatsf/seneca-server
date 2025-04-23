import { inject, injectable } from "inversify";
import { TYPES } from "../../../../di/types";
import { IClientRepository } from "../repositories/IClientRepository";
import { FindSinglePaginateDTO } from "../../presentation/dtos/FindSinglePaginateDTO";
import { Client } from "../entities/Client";

@injectable()
export class FindSinglePaginateUseCase {
	constructor(
		@inject(TYPES.ClientRepository)
		private readonly clientRepository: IClientRepository,
	) {}

	async execute(
		findSinglePaginateDTO: FindSinglePaginateDTO,
	): Promise<Client[]> {
		const page = findSinglePaginateDTO.page;
		return this.clientRepository.findAll(page);
	}
}
