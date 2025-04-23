import { injectable } from "inversify";
import { Email } from "../../modules/mail/domain/entities/Email";
import * as nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
import { IMailProvidersRepository } from "../../modules/mail/domain/repositories/IMailProvidersRepository";

export type ResponseSendEmail = {
	id: string;
	destination: string;
	sender: string;
	message_id?: string;
	code_queue?: string;
	status: string;
	sent_at?: Date;
	error?: string;
};

@injectable()
export class NodemailerMailProvider implements IMailProvidersRepository {
	private transporter: nodemailer.Transporter;

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.EMAIL_HOST || "",
			port: Number(process.env.EMAIL_PORT),
			secure: process.env.EMAIL_SECURE === "true",
			auth: {
				user: process.env.EMAIL_AUTH_USER,
				pass: process.env.EMAIL_AUTH_PASS,
			},
		} as nodemailer.TransportOptions);
		this.setupListeners();
	}

	async send(email: Email): Promise<ResponseSendEmail> {
		try {
			const attachments = [];
			if (email?.attachments && email.attachments.length > 0) {
				for (const attachment of email.attachments) {
					const tmpDir: string = path.join("tmp/attachments");
					if (!fs.existsSync(tmpDir)) {
						fs.mkdirSync(tmpDir);
					}
					const tmpFile: string = path.join(
						tmpDir,
						path.basename(attachment.filename),
					);
					fs.writeFileSync(tmpFile, Buffer.from(attachment.content, "base64"));
					const filename: string = path.basename(attachment.filename);
					const attachmentContent: string = fs
						.readFileSync(tmpFile)
						.toString("base64");

					attachments.push({
						filename,
						content: attachmentContent,
					});
				}
			}
			const result = await this.transporter.sendMail({
				to: email.destination,
				from: email.sender,
				subject: email.subject,
				html: this.trackOpen(email.body, email.id),
				attachments: email.attachments,
			});

			return {
				id: email.id,
				destination: email.destination,
				sender: email.sender,
				message_id: result.messageId,
				code_queue: this.extractCodeQueue(result.response),
				status: "SENT",
				sent_at: new Date(),
			};
		} catch (error: any) {
			console.error("Error sending email: ", error?.message);
			return {
				id: email.id,
				destination: email.destination,
				sender: email.sender,
				status: "ERROR",
				error: error?.message || "Error sending email",
			};
		}
	}

	private trackOpen(body: string, trackId: string): string {
		const pixel = `<img
       src="http://82.25.76.190:3000/api/mail/track/open/${trackId}"
       width="1"
       height="1"
       style="display:none"
       id="track-id-${trackId}"
       track-id="track-id-${trackId}"
       alt="Track For Email Open"
    />`;
		if (body && body.includes("</body>")) {
			return body.replace("</body>", `${pixel}</body>`) || "";
		}
		return body.concat(pixel);
	}

	private setupListeners(): void {
		this.transporter.on("error", (error: Error): void => {
			console.error("Error sending email:", error);
		});
	}

	private extractCodeQueue(response: string): string {
		const regex = /queued as (\w+)/;
		const match = response.match(regex);
		return match ? match[1] : "";
	}
}
