import { Template } from "../../../../modules/template/domain/entities/Template";
import { ITemplateRepository } from "../../../../modules/template/domain/repositories/ITemplateRepository";
import { AppDataSource } from "../../data-source";
import { TemplateEntity } from "../../entities/TemplateEntity";

export class TypeORMTemplateRepository implements ITemplateRepository {
	private templateRepository = AppDataSource.getRepository(TemplateEntity);

	async save(template: Template): Promise<Template> {
		const templateEntity = this.templateRepository.create({
			id: template.id,
			name: template.name,
			subject: template.subject,
			body: template.body,
			companyId: template.companyId,
			status: template.status,
		});
		return await this.templateRepository.save(templateEntity);
	}

	async findById(id: string): Promise<Template | null> {
		const template = await this.templateRepository.findOneBy({ id });
		if (!template) {
			return null;
		}
		return new Template(
			template.id,
			template.name,
			template.subject,
			template.body,
			template.status,
		);
	}

	async delete(id: string): Promise<void> {
		await this.templateRepository.delete(id);
	}

	async update(template: Template): Promise<void> {
		await this.templateRepository.update(template.id, {
			subject: template.subject,
			name: template.name,
			body: template.body,
			status: template.status,
		});
	}

	async findAll(page: number): Promise<Template[]> {
		const templates = await this.templateRepository.find({
			skip: (page - 1) * 10,
			take: 10,
		});
		return templates.map(
			(template) =>
				new Template(
					template.id,
					template.name,
					template.subject,
					template.body,
					template.status,
				),
		);
	}
}
