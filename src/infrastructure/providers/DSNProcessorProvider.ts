import { simpleParser } from "mailparser";
import imap from "imap";
import { injectable } from "inversify";

@injectable()
export class DSNProcessorProvider {
	private imapConfig = {
		user: process.env.DSN_EMAIL_USER || "",
		password: process.env.DSN_EMAIL_PASS || "",
		host: process.env.DSN_EMAIL_HOST || "",
		port: 993,
		tls: true,
		tlsOptions: {
			rejectUnauthorized: false, // Desabilita a validação do certificado TLS
		},
	};

	private connectIMAP() {
		return new imap(this.imapConfig);
	}

	public async execute(): Promise<void> {
		try {
			const client = this.connectIMAP();

			client.once("ready", () => {
				client.openBox("INBOX", false, (err, box) => {
					if (err) throw err;

					client.search(["UNSEEN"], (searchErr, results) => {
						if (searchErr) throw searchErr;

						const f = client.fetch(results, { bodies: "" });
						f.on("message", (msg) => {
							msg.on("body", async (stream) => {
								const parsed = await simpleParser(stream as any);
								this.extractDSNDetails(parsed);
							});
						});

						f.once("end", () => {
							client.end();
						});
					});
				});
			});

			client.connect();
		} catch (err: any) {
			console.error("Erro ao processar JOB DSNs: ", err.message || err);
		}
	}

	private extractDSNDetails(parsedEmail: any): void {
		let trackId = null;
		console.log(parsedEmail);
		// Extraindo o trackId da tag <img> no corpo do email
		if (parsedEmail.html) {
			const regex =
				/track-id-([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i;
			const match = regex.exec(parsedEmail.html);
			if (match && match[1]) {
				trackId = match[1];
			}
		}

		const dsnInfo = {
			date: parsedEmail?.date,
			text: parsedEmail?.text,
			status: "",
			trackId: trackId,
			from:
				parsedEmail.from?.value[0]?.address ||
				parsedEmail.from?.text ||
				"Desconhecido",
			to:
				parsedEmail.to?.value[0]?.address ||
				parsedEmail.to?.text ||
				"Desconhecido",
			subject: parsedEmail?.subject || "Desconhecido",
		};

		const regex = /Status: (\d\.\d\.\d)/;
		const statusMatch = regex.exec(parsedEmail.text);
		if (statusMatch) {
			dsnInfo.status = statusMatch[1];
		} else {
			// Lógica para lidar com casos onde o status não é encontrado
			// Pode ser útil registrar um aviso ou tentar extrair o status de outra forma
			console.warn("Status não encontrado no email DSN:", parsedEmail.text);
			dsnInfo.status = "Desconhecido";
		}

		// Save dsnInfo to the database
	}
}
