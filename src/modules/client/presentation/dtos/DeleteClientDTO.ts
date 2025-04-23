import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class DeleteClientDTO {
	@IsNotEmpty()
	@IsString()
	id!: string;

	constructor(data: Partial<DeleteClientDTO>) {
		Object.assign(this, data);
	}
}
