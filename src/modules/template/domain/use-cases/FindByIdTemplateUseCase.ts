import { inject, injectable } from "inversify";
import { ITemplateRepository } from "../repositories/ITemplateRepository";
import { TYPES } from "../../../../di/types";
import { Template } from "../entities/Template";
import { FindByIdTemplateDTO } from "../../presentation/dtos/FindByIdTemplateDTO";
import { SendError } from "../../../../shared/errors/SendError";

@injectable()
export class FindByIdTemplateUseCase {
	constructor(
		@inject(TYPES.TemplateRepository)
		private readonly templateRepository: ITemplateRepository,
	) {}

	public async execute(
		findByIdTemplateDTO: FindByIdTemplateDTO,
	): Promise<Template | null> {
		const { id } = findByIdTemplateDTO;
		if (!id) {
			throw new SendError("Template ID is required", 400);
		}

		const template = await this.templateRepository.findById(id);

		if (!template) {
			throw new SendError("Template not found", 404);
		}

		return template;
	}
}
