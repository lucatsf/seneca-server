import { inject, injectable } from "inversify";
import { TYPES } from "../../../../di/types";
import { ICompanyRepository } from "../repositories/ICompanyRepository";
import { SendError } from "../../../../shared/errors/SendError";
import { DeleteCompanyDTO } from "../../presentation/dtos/DeleteCompanyDTO";

@injectable()
export class DeleteCompanyUseCase {
	constructor(
		@inject(TYPES.CompanyRepository)
		private readonly companyRepository: ICompanyRepository,
	) {}

	public async execute(deletedData: DeleteCompanyDTO): Promise<void> {
		const { id } = deletedData;
		if (!id) {
			throw new SendError("Company ID is required", 400);
		}
		await this.companyRepository.delete(id);
	}
}
