import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateClientDTO {
	@IsNotEmpty()
	@IsString()
	id!: string;

	@IsOptional()
	@IsEmail()
	email?: string;

	@IsNotEmpty()
	@IsString()
	name?: string;

	@IsOptional()
	@IsString()
	phone?: string;

	constructor(data: Partial<UpdateClientDTO>) {
		Object.assign(this, data);
	}
}
