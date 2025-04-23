import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCompanyDTO {
	@IsNotEmpty()
	@IsString()
	name!: string;

	@IsNotEmpty()
	@IsString()
	cnpj!: string;

	@IsNotEmpty()
	@IsString()
	phone!: string;

	@IsNotEmpty()
	@IsEmail()
	email!: string;

	@IsNotEmpty()
	@IsString()
	address!: string;

	constructor(data: Partial<CreateCompanyDTO>) {
		Object.assign(this, data);
	}
}
