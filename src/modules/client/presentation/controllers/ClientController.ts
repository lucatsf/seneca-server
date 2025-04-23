import { Request, Response, Router } from "express";
import { CreateClientUseCase } from "../../domain/use-cases/CreateClientUseCase";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../../di/types";
import { CreateClientDTO } from "../dtos/CreateClientDTO";
import { UpdateClientDTO } from "../dtos/UpdateClientDTO";
import { UpdateClientUseCase } from "../../domain/use-cases/UpdateClientUseCase";
import { DeleteClientDTO } from "../dtos/DeleteClientDTO";
import { DeleteClientUseCase } from "../../domain/use-cases/DeleteClientUseCase";
import { FindSinglePaginateUseCase } from "../../domain/use-cases/FindSinglePaginateUseCase";
import { validateOrReject } from "class-validator";
import { authMiddleware } from "../../../../infrastructure/http/middlewares/AuthMiddleware";
import { ResponseError } from "../../../../shared/errors/ResponseError";

@injectable()
export class ClientController {
	public router: Router;

	constructor(
		@inject(TYPES.CreateClientUseCase)
		private createClientUseCase: CreateClientUseCase,
		@inject(TYPES.UpdateClientUseCase)
		private updateClientUseCase: UpdateClientUseCase,
		@inject(TYPES.DeleteClientUseCase)
		private deleteClientUseCase: DeleteClientUseCase,
		@inject(TYPES.FindSinglePaginateUseCase)
		private findSinglePaginateUseCase: FindSinglePaginateUseCase,
	) {
		this.router = Router();
		this.register(this.router);
	}

	getPrefix(): string {
		return "/client";
	}

	register(router: Router): void {
		router.post("/create", authMiddleware, this.createClient.bind(this));
		router.put("/update", authMiddleware, this.updateClient.bind(this));
		router.get(
			"/find-single-paginate",
			authMiddleware,
			this.findSinglePaginate.bind(this),
		);
		router.delete("/delete/:id", authMiddleware, this.deleteClient.bind(this));
	}

	private async createClient(req: Request, res: Response): Promise<void> {
		const createClientDTO = new CreateClientDTO(req.body);

		try {
			await validateOrReject(createClientDTO);
			const client = await this.createClientUseCase.execute(createClientDTO);
			res.status(201).json({ message: "Client created successfully", client });
		} catch (error: any) {
			ResponseError(res, error);
		}
	}

	private async updateClient(req: Request, res: Response): Promise<void> {
		const updateClientDTO = new UpdateClientDTO(req.body);

		try {
			await validateOrReject(updateClientDTO);
			await this.updateClientUseCase.execute(updateClientDTO);
			res.status(200).json({ message: "Client updated successfully" });
		} catch (error: any) {
			ResponseError(res, error);
		}
	}

	private async deleteClient(req: Request, res: Response): Promise<void> {
		const deleteClientDTO = new DeleteClientDTO({ id: req.params.id });

		try {
			await this.deleteClientUseCase.execute(deleteClientDTO);
			res.status(200).json({ message: "Client deleted successfully" });
		} catch (error: any) {
			ResponseError(res, error);
		}
	}

	private async findSinglePaginate(req: Request, res: Response): Promise<void> {
		const page = Number(req.query.page);

		try {
			const clients = await this.findSinglePaginateUseCase.execute({ page });
			res.status(200).json(clients);
		} catch (error: any) {
			ResponseError(res, error);
		}
	}
}
