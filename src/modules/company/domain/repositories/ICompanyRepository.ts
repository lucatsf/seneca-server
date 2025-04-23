import { Company } from "../entities/Company";

export interface ICompanyRepository {
	save(company: Company): Promise<Company>;
	update(company: Company): Promise<void>;
	delete(id: string): Promise<void>;
	findById(id: string): Promise<Company | null>;
	findByCNPJ(cnpj: string): Promise<Company | null>;
}
