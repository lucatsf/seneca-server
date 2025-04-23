import { inject, injectable } from "inversify";
import { TYPES } from "../../../../di/types";
import { ITemplateRepository } from "../repositories/ITemplateRepository";
import { DeleteTemplatetDTO } from "../../presentation/dtos/DeleteTemplatetDTO";
import { SendError } from "../../../../shared/errors/SendError";

@injectable()
export class DeleteTemplateUseCase {
	constructor(
		@inject(TYPES.TemplateRepository)
		private readonly templateRepository: ITemplateRepository,
	) {}

	async execute(deleteTemplatetDTO: DeleteTemplatetDTO): Promise<void> {
		const { id } = deleteTemplatetDTO;
		if (!id) {
			throw new SendError("Template id must be provided", 400);
		}
		await this.templateRepository.delete(id);
	}
}
