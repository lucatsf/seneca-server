import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class RequestTrackIdDTO {
	@IsString()
	@IsNotEmpty()
	@IsUUID()
	trackId!: string;

	constructor(data: Partial<RequestTrackIdDTO>) {
		Object.assign(this, data);
	}
}
