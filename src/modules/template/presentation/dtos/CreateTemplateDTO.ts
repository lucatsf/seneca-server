import { IsNotEmpty, IsString } from "class-validator";

export class CreateTemplateDTO {
	@IsNotEmpty()
	@IsString()
	name!: string;

	@IsNotEmpty()
	@IsString()
	subject!: string;

	@IsNotEmpty()
	@IsString()
	body!: string;

	@IsNotEmpty()
	@IsString()
	companyId!: string;

	constructor(data: Partial<CreateTemplateDTO>) {
		Object.assign(this, data);
	}
}
