import { inject, injectable } from "inversify";
import { IRoute } from "../../../../infrastructure/http/routes/IRoute";
import { Router, Request, Response } from "express";
import { TYPES } from "../../../../di/types";
import { CreateTemplateUseCase } from "../../domain/use-cases/CreateTemplateUseCase";
import { CreateTemplateDTO } from "../dtos/CreateTemplateDTO";
import { formatError } from "../../../../shared/utils/errorFormatter";
import { FindByIdTemplateDTO } from "../dtos/FindByIdTemplateDTO";
import { FindByIdTemplateUseCase } from "../../domain/use-cases/FindByIdTemplateUseCase";
import { UpdateTemplateDTO } from "../dtos/UpdateTemplateDTO";
import { UpdateTemplateUseCase } from "../../domain/use-cases/UpdateTemplateUseCase";
import { validateOrReject } from "class-validator";
import { TemplateFindSinglePaginateUseCase } from "../../domain/use-cases/TemplateFindSinglePaginateUseCase";
import { DeleteTemplatetDTO } from "../dtos/DeleteTemplatetDTO";
import { DeleteTemplateUseCase } from "../../domain/use-cases/DeleteTemplateUseCase";
import { authMiddleware } from "../../../../infrastructure/http/middlewares/AuthMiddleware";
import { ResponseError } from "../../../../shared/errors/ResponseError";

@injectable()
export class TemplateController implements IRoute {
	public router: Router;

	constructor(
		@inject(TYPES.CreateTemplateUseCase)
		private createTemplateUseCase: CreateTemplateUseCase,
		@inject(TYPES.FindByIdTemplateUseCase)
		private findByIdTemplateUseCase: FindByIdTemplateUseCase,
		@inject(TYPES.UpdateTemplateUseCase)
		private updateTemplateUseCase: UpdateTemplateUseCase,
		@inject(TYPES.TemplateFindSinglePaginateUseCase)
		private templateFindSinglePaginateUseCase: TemplateFindSinglePaginateUseCase,
		@inject(TYPES.DeleteTemplateUseCase)
		private deleteTemplateUseCase: DeleteTemplateUseCase,
	) {
		this.router = Router();
		this.register(this.router);
	}

	getPrefix(): string {
		return "/template";
	}

	register(router: Router): void {
		router.post("/create", authMiddleware, this.createTemplate.bind(this));
		router.put("/update", authMiddleware, this.updateTemplate.bind(this));
		router.get(
			"/find-single-paginate",
			authMiddleware,
			this.findAll.bind(this),
		);
		router.get("/:id", authMiddleware, this.findByIdTemplate.bind(this));
		router.delete("/delete/:id", authMiddleware, this.delete.bind(this));
	}

	private async createTemplate(req: Request, res: Response): Promise<void> {
		const createTemplateDTO = new CreateTemplateDTO(req.body);

		try {
			await validateOrReject(createTemplateDTO);
			const template =
				await this.createTemplateUseCase.execute(createTemplateDTO);
			res
				.status(201)
				.json({ message: "Template created successfully", template });
		} catch (error: any) {
			ResponseError(res, error);
		}
	}

	private async findByIdTemplate(req: Request, res: Response): Promise<void> {
		const findByIdTemplateDTO = new FindByIdTemplateDTO({ id: req.params.id });

		try {
			const template =
				await this.findByIdTemplateUseCase.execute(findByIdTemplateDTO);
			res.status(200).json(template);
		} catch (error: any) {
			ResponseError(res, error);
		}
	}

	private async updateTemplate(req: Request, res: Response): Promise<void> {
		const updateTemplateDTO = new UpdateTemplateDTO(req.body);

		try {
			await validateOrReject(updateTemplateDTO);
			await this.updateTemplateUseCase.execute(updateTemplateDTO);
			res.status(200).json({ message: "Template updated successfully" });
		} catch (error: any) {
			ResponseError(res, error);
		}
	}

	private async findAll(req: Request, res: Response): Promise<void> {
		const page = Number(req.query.page);
		try {
			const templates = await this.templateFindSinglePaginateUseCase.execute({
				page,
			});
			res.status(200).json(templates);
		} catch (error: any) {
			ResponseError(res, error);
		}
	}

	private async delete(req: Request, res: Response): Promise<void> {
		const deleteTemplateDTO = new DeleteTemplatetDTO({ id: req.params.id });

		try {
			await this.deleteTemplateUseCase.execute(deleteTemplateDTO);
			res.status(200).json({ message: "Template deleted successfully" });
		} catch (error: any) {
			ResponseError(res, error);
		}
	}
}
