import { inject, injectable } from "inversify";
import { TYPES } from "../../../../di/types";
import { ICompanyRepository } from "../repositories/ICompanyRepository";
import { SendError } from "../../../../shared/errors/SendError";
import { Company } from "../entities/Company";
import { FindByIdCompanyDTO } from "../../presentation/dtos/FindByIdCompanyDTO";

@injectable()
export class FindByIdCompanyUseCase {
	constructor(
		@inject(TYPES.CompanyRepository)
		private readonly companyRepository: ICompanyRepository,
	) {}

	public async execute(
		findByIdCompanyDTO: FindByIdCompanyDTO,
	): Promise<Company> {
		const { id } = findByIdCompanyDTO;
		if (!id) {
			throw new SendError("Company ID is required", 400);
		}
		const company = await this.companyRepository.findById(id);
		if (!company) {
			throw new SendError("Company not found", 404);
		}
		return company;
	}
}
