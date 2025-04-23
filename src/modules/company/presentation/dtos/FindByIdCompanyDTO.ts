import { IsNotEmpty, IsString } from "class-validator";

export class FindByIdCompanyDTO {
	@IsNotEmpty()
	@IsString()
	id!: string;

	constructor(data: Partial<FindByIdCompanyDTO>) {
		Object.assign(this, data);
	}
}
