import { inject, injectable } from "inversify";
import { Template } from "../entities/Template";
import { ITemplateRepository } from "../repositories/ITemplateRepository";
import { TYPES } from "../../../../di/types";
import { CreateTemplateDTO } from "../../presentation/dtos/CreateTemplateDTO";
import { generateUUID } from "../../../../shared/utils/generateUUID";
import { SendError } from "../../../../shared/errors/SendError";

@injectable()
export class CreateTemplateUseCase {
	constructor(
		@inject(TYPES.TemplateRepository)
		private readonly templateRepository: ITemplateRepository,
	) {}

	async execute({
		subject,
		name,
		body,
		companyId,
	}: CreateTemplateDTO): Promise<Template> {
		const template = new Template(
			generateUUID(),
			name,
			subject,
			body,
			"pending",
			companyId,
		);
		return await this.templateRepository.save(template);
	}
}
