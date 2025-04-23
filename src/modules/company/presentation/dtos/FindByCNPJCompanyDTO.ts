import { IsNotEmpty, IsString } from "class-validator";

export class FindByCNPJCompanyDTO {
	@IsNotEmpty()
	@IsString()
	cnpj!: string;

	constructor(data: Partial<FindByCNPJCompanyDTO>) {
		Object.assign(this, data);
	}
}
