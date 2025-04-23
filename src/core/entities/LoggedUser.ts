export class LoggedUser {
	constructor(
		public readonly id: string,
		public readonly name: string,
		public readonly email: string,
		public readonly credentials: string[], // Ex: ["admin", "user"]
		public readonly companyId?: string,
	) {}
}
