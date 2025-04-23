export class Email {
	constructor(
		public readonly id: string,
		public readonly destination: string,
		public readonly sender: string,
		public readonly subject: string,
		public readonly body: string,
		public readonly attachments?: Array<{
			filename: string;
			content: string;
			path?: string;
		}>,
		public readonly status?: string,
		public readonly sent_at?: Date,
		public readonly delivered_at?: Date,
		public readonly opened_at?: Date,
		public readonly created_at?: Date,
		public readonly error?: string,
		public readonly code_queue?: string,
		public readonly message_id?: string,
	) {}
}
