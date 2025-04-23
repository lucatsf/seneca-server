import { IsNotEmpty, IsString } from "class-validator";

export class DeleteCompanyDTO {
	@IsNotEmpty()
	@IsString()
	id!: string;

	constructor(data: Partial<DeleteCompanyDTO>) {
		Object.assign(this, data);
	}
}
