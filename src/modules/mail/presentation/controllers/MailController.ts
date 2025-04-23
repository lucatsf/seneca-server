import { Request, Response, Router } from "express";
import { SendEmailUseCase } from "../../domain/use-cases/SendEmailUseCase";
import { TrackEmailOpenUseCase } from "../../domain/use-cases/TrackEmailOpenUseCase";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../../di/types";
import { IRoute } from "../../../../infrastructure/http/routes/IRoute";
import { SendEmailDTO } from "../dtos/SendEmailDTO";
import { validateOrReject } from "class-validator";
import { authMiddleware } from "../../../../infrastructure/http/middlewares/AuthMiddleware";
import { ResponseError } from "../../../../shared/errors/ResponseError";
import multer from "multer";
import { RequestTrackIdDTO } from "../dtos/RequestTrackIdDTO";

type IAttachment = {
	filename: string;
	content: string;
	path?: string;
};

// Configure multer to handle file uploads
const storage: any = multer.memoryStorage(); // Store files in memory
const upload: any = multer({ storage: storage });

@injectable()
export class MailController implements IRoute {
	public router: Router;

	constructor(
		@inject(TYPES.SendEmailUseCase)
		private sendEmailUseCase: SendEmailUseCase,
		@inject(TYPES.TrackEmailOpenUseCase)
		private trackEmailOpenUseCase: TrackEmailOpenUseCase,
	) {
		this.router = Router();
		this.register(this.router); // Registra as rotas ao criar o controller
	}

	getPrefix(): string {
		return "/mail"; // Prefixo para o módulo de email
	}

	register(router: Router): void {
		router.post("/send", authMiddleware, this.sendEmail.bind(this));
		router.get("/track/open/:trackId", this.trackOpen.bind(this));
	}

	private async sendEmail(req: Request, res: Response): Promise<void> {
		upload.array("attachments")(req, res, async (err: any): Promise<any> => {
			if (err) {
				return ResponseError(res, err);
			}

			try {
				const { to, subject, body, sender } = req.body;

				const attachments: IAttachment[] =
					Array.isArray(req.files) && req.files.length > 0
						? req.files.map(
								(file: Express.Multer.File): IAttachment => ({
									filename: file.originalname,
									content: file.buffer.toString("base64"),
									path: file.path,
								}),
							)
						: [];

				const sendEmailDTO = new SendEmailDTO({
					to,
					subject,
					body,
					sender,
					attachments,
				});

				await validateOrReject(sendEmailDTO);
				await this.sendEmailUseCase.execute(sendEmailDTO);

				res.status(200).json({ message: "Email sent successfully" });
			} catch (error: any) {
				ResponseError(res, error);
			}
		});
	}

	private async trackOpen(req: Request, res: Response): Promise<void> {
		try {
			const { trackId } = req.params;
			const requestTrackIdDTO = new RequestTrackIdDTO({ trackId });
			await validateOrReject(requestTrackIdDTO);
			await this.trackEmailOpenUseCase.execute(requestTrackIdDTO.trackId);
			res.status(200).json({ message: trackId });
		} catch (error: any) {
			ResponseError(res, error);
		}
	}
}
