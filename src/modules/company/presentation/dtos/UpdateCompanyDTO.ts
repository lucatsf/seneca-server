import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UpdateCompanyDTO {
	@IsNotEmpty()
	@IsString()
	id!: string;

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

	@IsNotEmpty()
	@IsString()
	status!: string;

	constructor(data: Partial<UpdateCompanyDTO>) {
		Object.assign(this, data);
	}
}
