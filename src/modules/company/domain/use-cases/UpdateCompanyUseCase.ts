import { inject, injectable } from "inversify";
import { TYPES } from "../../../../di/types";
import { ICompanyRepository } from "../repositories/ICompanyRepository";
import { UpdateCompanyDTO } from "../../presentation/dtos/UpdateCompanyDTO";
import { SendError } from "../../../../shared/errors/SendError";
import { Company } from "../entities/Company";

@injectable()
export class UpdateCompanyUseCase {
	constructor(
		@inject(TYPES.CompanyRepository)
		private readonly companyRepository: ICompanyRepository,
	) {}

	public async execute(pdatedData: UpdateCompanyDTO): Promise<void> {
		const { id, name, cnpj, phone, email, address, status } = pdatedData;
		if (!id) {
			throw new SendError("Company ID is required", 400);
		}
		if (!name || !cnpj || !phone || !email || !address) {
			throw new SendError("All fields are required", 400);
		}

		const company = new Company(id, name, phone, address, email, cnpj, status);
		await this.companyRepository.update(company);
	}
}
