export class Template {
	constructor(
		public readonly id: string,
		public readonly name: string,
		public readonly subject: string,
		public readonly body: string,
		public readonly status?: string,
		public readonly companyId?: string,
	) {}
}
