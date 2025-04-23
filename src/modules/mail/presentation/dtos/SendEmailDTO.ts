import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SendEmailDTO {
	@IsEmail()
	@IsNotEmpty()
	to!: string;

	@IsNotEmpty()
	sender!: string;

	@IsString()
	@IsNotEmpty()
	subject!: string;

	@IsString()
	@IsNotEmpty()
	body!: string;

	@IsOptional()
	attachments?: Array<{ filename: string; content: string; path?: string }>;

	constructor(data: Partial<SendEmailDTO>) {
		Object.assign(this, data);
	}
}
