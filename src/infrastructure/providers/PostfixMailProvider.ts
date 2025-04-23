import { injectable } from "inversify";
import { Email } from "../../modules/mail/domain/entities/Email";
import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import fs from "fs";
import path from "path";

type EmailPostfix = Email & {
	attachments: Array<any>;
};

@injectable()
export class PostfixMailProvider {
	async send(email: EmailPostfix): Promise<void> {
		return new Promise<void>(
			(
				resolve: (value: void | PromiseLike<void>) => void,
				reject: (reason?: any) => void,
			): void => {
				const sendmail: ChildProcessWithoutNullStreams = spawn(
					"/usr/sbin/sendmail",
					[email.destination],
				);

				sendmail.on("error", (err: Error): void => {
					reject(err);
				});

				sendmail.on("close", (code: number | null): void => {
					if (code === 0) {
						resolve();
					} else {
						reject(new Error(`sendmail returned error code ${code}`));
					}
				});

				let mimeMessage: string = `From: ${email.sender}\n`;
				mimeMessage += `Subject: ${email.subject}\n`;
				mimeMessage += "MIME-Version: 1.0\n";

				if (email.attachments && email.attachments.length > 0) {
					mimeMessage +=
						'Content-Type: multipart/mixed; boundary="boundary_string"\n\n';
					mimeMessage += "--boundary_string\n";
					mimeMessage += email.body
						? 'Content-Type: text/html; charset="UTF-8"\n\n'
						: 'Content-Type: text/plain; charset="UTF-8"\n\n';
					mimeMessage += email.body ? `${email.body}\n\n` : `\n\n`;

					for (const attachment of email.attachments) {
						try {
							const tmpDir: string = path.join("tmp/attachments");
							if (!fs.existsSync(tmpDir)) {
								fs.mkdirSync(tmpDir);
							}
							const tmpFile = path.join(
								tmpDir,
								path.basename(attachment.filename),
							);
							fs.writeFileSync(
								tmpFile,
								Buffer.from(attachment.content, "base64"),
							);
							const filename: string = path.basename(attachment.filename);
							const attachmentContent: string = fs
								.readFileSync(tmpFile)
								.toString("base64");
							mimeMessage += "--boundary_string\n";
							mimeMessage += `Content-Type: application/octet-stream; name="${filename}"\n`;
							mimeMessage += `Content-Disposition: attachment; filename="${filename}"\n`;
							mimeMessage += "Content-Transfer-Encoding: base64\n\n";
							mimeMessage += `${attachmentContent}\n\n`;
						} catch (e) {
							reject(e);
							return;
						}
					}
					mimeMessage += "--boundary_string--";
				} else {
					mimeMessage += email.body
						? 'Content-Type: text/html; charset="UTF-8"\n\n'
						: 'Content-Type: text/plain; charset="UTF-8"\n\n';
					mimeMessage += email.body ? `${email.body}\n\n` : `\n\n`;
				}

				mimeMessage = this.trackOpen(mimeMessage, email.id);

				sendmail.stdin.write(mimeMessage);
				sendmail.stdin.end();
				if (email.attachments && email.attachments.length > 0) {
					const tmpDir: string = path.join("tmp/attachments");
					if (fs.existsSync(tmpDir)) {
						fs.rmdirSync(tmpDir, { recursive: true });
					}
				}
			},
		);
	}

	private trackOpen(mimeMessage: string, trackId: string): string {
		const pixel = `<img
       src="${process.env.SERVER_HOST}/api/email/track/open/${trackId}"
       width="1"
       height="1"
       style="display:none"
       id="track-id-${trackId}"
       alt="Track For Email Open"
    />`;
		if (mimeMessage && mimeMessage.includes("</body>")) {
			return mimeMessage.replace("</body>", `${pixel}</body>`) || "";
		}
		return mimeMessage.concat(pixel);
	}
}
