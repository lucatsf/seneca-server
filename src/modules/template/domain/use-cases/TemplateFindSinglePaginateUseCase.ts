import { inject, injectable } from "inversify";
import { TYPES } from "../../../../di/types";
import { Template } from "../entities/Template";
import { ITemplateRepository } from "../repositories/ITemplateRepository";
import { TemplateFindSinglePaginateDTO } from "../../presentation/dtos/TemplateFindSinglePaginateDTO";

@injectable()
export class TemplateFindSinglePaginateUseCase {
	constructor(
		@inject(TYPES.TemplateRepository)
		private readonly templateRepository: ITemplateRepository,
	) {}

	async execute(
		findSinglePaginateDTO: TemplateFindSinglePaginateDTO,
	): Promise<Template[]> {
		const page = findSinglePaginateDTO.page;
		return this.templateRepository.findAll(page);
	}
}
