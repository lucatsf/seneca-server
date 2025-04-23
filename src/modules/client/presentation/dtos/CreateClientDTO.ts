import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateClientDTO {
	@IsNotEmpty()
	@IsString()
	name!: string;

	@IsOptional()
	@IsEmail()
	email?: string;

	@IsOptional()
	@IsString()
	phone?: string;

	constructor(data: Partial<CreateClientDTO>) {
		Object.assign(this, data);
	}
}
