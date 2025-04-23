import { IsNotEmpty, IsString } from "class-validator";

export class TemplateFindSinglePaginateDTO {
	@IsNotEmpty()
	@IsString()
	page!: number;

	constructor(data: Partial<TemplateFindSinglePaginateDTO>) {
		Object.assign(this, data);
	}
}
