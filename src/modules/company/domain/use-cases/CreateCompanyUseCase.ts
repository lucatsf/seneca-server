import { inject, injectable } from "inversify";
import { TYPES } from "../../../../di/types";
import { ICompanyRepository } from "../repositories/ICompanyRepository";
import { Company } from "../entities/Company";
import { generateUUID } from "../../../../shared/utils/generateUUID";
import { isValidCNPJ } from "../../../../shared/utils/isValidCNPJ";
import { SendError } from "../../../../shared/errors/SendError";

@injectable()
export class CreateCompanyUseCase {
	constructor(
		@inject(TYPES.CompanyRepository)
		private readonly companyRepository: ICompanyRepository,
	) {}

	async execute({
		name,
		cnpj,
		phone,
		email,
		address,
	}: {
		name: string;
		cnpj: string;
		phone?: string;
		email?: string;
		address?: string;
	}): Promise<Company> {
		if (!name) {
			throw new SendError("Name is required", 400);
		}

		if (!cnpj) {
			throw new SendError("CNPJ is required", 400);
		}

		if (!isValidCNPJ(cnpj)) {
			throw new SendError("CNPJ is invalid", 400);
		}

		if (!phone) {
			throw new SendError("Phone is required", 400);
		}

		if (!email) {
			throw new SendError("Email is required", 400);
		}

		if (!address) {
			throw new SendError("Address is required", 400);
		}

		if (phone && !/^\+?\d{1,14}$/.test(phone)) {
			throw new SendError("Phone format is invalid", 400);
		}

		const companyExists = await this.companyRepository.findByCNPJ(cnpj);

		if (companyExists) {
			throw new SendError("Company with this CNPJ already exists", 400);
		}

		const status = "available";

		const company = new Company(
			generateUUID(),
			name,
			phone,
			address,
			email,
			cnpj,
			status,
		);

		return await this.companyRepository.save(company);
	}
}
