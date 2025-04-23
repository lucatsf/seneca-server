export class Client {
	constructor(
		public readonly id: string,
		public readonly email: string,
		public readonly name?: string,
		public readonly phone?: string,
	) {}

	public isValid(): boolean {
		return !!this.id && !!this.email && !!this.name;
	}
}
