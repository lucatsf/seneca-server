import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterAuthDTO {
	@IsNotEmpty()
	@IsEmail()
	email!: string;

	@IsNotEmpty()
	@IsString()
	password!: string;

	@IsNotEmpty()
	@IsString()
	name!: string;

	constructor(data: Partial<RegisterAuthDTO>) {
		Object.assign(this, data);
	}
}
