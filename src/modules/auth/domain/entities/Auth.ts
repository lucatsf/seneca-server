export class Auth {
	constructor(
		public readonly id: string,
		public readonly email: string,
		public readonly password: string,
		public readonly name: string,
		public readonly status: string,
		public readonly companyId?: string,
	) {}
}
