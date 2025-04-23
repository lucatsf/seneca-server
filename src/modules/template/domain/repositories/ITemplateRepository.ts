import { Template } from "../entities/Template";

export interface ITemplateRepository {
	save(template: Template): Promise<Template>;
	findById(id: string): Promise<Template | null>;
	findAll(page: number): Promise<Template[]>;
	delete(id: string): Promise<void>;
	update(template: Template): Promise<void>;
}
