import { inject, injectable } from "inversify";
import { ITemplateRepository } from "../repositories/ITemplateRepository";
import { TYPES } from "../../../../di/types";
import { Template } from "../entities/Template";
import { UpdateTemplateDTO } from "../../presentation/dtos/UpdateTemplateDTO";
import { SendError } from "../../../../shared/errors/SendError";

@injectable()
export class UpdateTemplateUseCase {
	constructor(
		@inject(TYPES.TemplateRepository)
		private readonly templateRepository: ITemplateRepository,
	) {}

	public async execute(updateTemplateDTO: UpdateTemplateDTO): Promise<void> {
		const { id, subject, name, body, status } = updateTemplateDTO;
		if (!id) {
			throw new SendError("Template ID is required", 400);
		}

		const template = new Template(id, name, subject, body, status);
		await this.templateRepository.update(template);
	}
}
