export class Company {
	constructor(
		public readonly id: string,
		public readonly name: string,
		public readonly phone: string,
		public readonly address: string,
		public readonly email: string,
		public readonly cnpj: string,
		public readonly status: string,
	) {}
}
