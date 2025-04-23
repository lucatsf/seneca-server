import { IsNotEmpty, IsString } from "class-validator";

export class UpdateTemplateDTO {
	@IsNotEmpty()
	@IsString()
	id!: string;

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
	status!: string;

	constructor(data: Partial<UpdateTemplateDTO>) {
		Object.assign(this, data);
	}
}
