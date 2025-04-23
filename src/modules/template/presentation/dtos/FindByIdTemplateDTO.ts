import { IsNotEmpty, IsString } from "class-validator";

export class FindByIdTemplateDTO {
	@IsNotEmpty()
	@IsString()
	id!: string;

	constructor(data: Partial<FindByIdTemplateDTO>) {
		Object.assign(this, data);
	}
}
