import { ICompanyRepository } from "../../../../modules/company/domain/repositories/ICompanyRepository";
import { AppDataSource } from "../../data-source";
import { CompanyEntity } from "../../entities/CompanyEntity";

export class TypeORMCompanyRepository implements ICompanyRepository {
	private clientRepository = AppDataSource.getRepository(CompanyEntity);

	async findById(id: string): Promise<CompanyEntity | null> {
		return await this.clientRepository.findOneBy({ id });
	}

	async save(companyData: Partial<CompanyEntity>): Promise<CompanyEntity> {
		const company = this.clientRepository.create(companyData);
		return await this.clientRepository.save(company);
	}

	async update(companyData: CompanyEntity): Promise<void> {
		await this.clientRepository.update(companyData.id, companyData);
	}

	async delete(id: string): Promise<void> {
		await this.clientRepository.delete(id);
	}

	async findByCNPJ(cnpj: string): Promise<CompanyEntity | null> {
		return await this.clientRepository.findOneBy({ cnpj });
	}
}
