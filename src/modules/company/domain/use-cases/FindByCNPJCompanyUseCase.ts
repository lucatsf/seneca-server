import { inject, injectable } from "inversify";
import { TYPES } from "../../../../di/types";
import { ICompanyRepository } from "../repositories/ICompanyRepository";
import { SendError } from "../../../../shared/errors/SendError";
import { Company } from "../entities/Company";
import { FindByCNPJCompanyDTO } from "../../presentation/dtos/FindByCNPJCompanyDTO";

@injectable()
export class FindByCNPJCompanyUseCase {
	constructor(
		@inject(TYPES.CompanyRepository)
		private readonly companyRepository: ICompanyRepository,
	) {}

	public async execute(
		findByCNPJCompanyDTO: FindByCNPJCompanyDTO,
	): Promise<Company> {
		const { cnpj } = findByCNPJCompanyDTO;
		if (!cnpj) {
			throw new SendError("Company CNPJ is required", 400);
		}
		const company = await this.companyRepository.findByCNPJ(cnpj);
		if (!company) {
			throw new SendError("Company not found", 404);
		}
		return company;
	}
}
