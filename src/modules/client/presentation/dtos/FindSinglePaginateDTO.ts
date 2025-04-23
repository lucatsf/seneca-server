import { IsNotEmpty, IsString } from "class-validator";

export class FindSinglePaginateDTO {
	@IsNotEmpty()
	@IsString()
	page!: number;

	constructor(data: Partial<FindSinglePaginateDTO>) {
		Object.assign(this, data);
	}
}
