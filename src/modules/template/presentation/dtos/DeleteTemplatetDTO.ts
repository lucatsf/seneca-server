import { IsNotEmpty, IsString } from "class-validator";

export class DeleteTemplatetDTO {
	@IsNotEmpty()
	@IsString()
	id!: string;

	constructor(data: Partial<DeleteTemplatetDTO>) {
		Object.assign(this, data);
	}
}
