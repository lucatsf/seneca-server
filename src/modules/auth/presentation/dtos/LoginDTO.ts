import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDTO {
	@IsNotEmpty()
	@IsEmail()
	email!: string;

	@IsNotEmpty()
	@IsString()
	password!: string;

	constructor(data: Partial<LoginDTO>) {
		Object.assign(this, data);
	}
}
