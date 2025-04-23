import { Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../../di/types";
import { CreateCompanyUseCase } from "../../domain/use-cases/CreateCompanyUseCase";
import { CreateCompanyDTO } from "../dtos/CreateCompanyDTO";
import { validateOrReject } from "class-validator";
import { ResponseError } from "../../../../shared/errors/ResponseError";
import { FindByCNPJCompanyDTO } from "../dtos/FindByCNPJCompanyDTO";
import { FindByCNPJCompanyUseCase } from "../../domain/use-cases/FindByCNPJCompanyUseCase";
import { UpdateCompanyUseCase } from "../../domain/use-cases/UpdateCompanyUseCase";
import { DeleteCompanyUseCase } from "../../domain/use-cases/DeleteCompanyUseCase";
import { FindByIdCompanyUseCase } from "../../domain/use-cases/FindByIdCompanyUseCase";
import { UpdateCompanyDTO } from "../dtos/UpdateCompanyDTO";
import { DeleteCompanyDTO } from "../dtos/DeleteCompanyDTO";
import { FindByIdCompanyDTO } from "../dtos/FindByIdCompanyDTO";

@injectable()
export class CompanyController {
	public router: Router;

	constructor(
		@inject(TYPES.CreateCompanyUseCase)
		private createCompanyUseCase: CreateCompanyUseCase,
		@inject(TYPES.FindByCNPJCompanyUseCase)
		private findByCNPJCompanyUseCase: FindByCNPJCompanyUseCase,
		@inject(TYPES.UpdateCompanyUseCase)
		private updateCompanyUseCase: UpdateCompanyUseCase,
		@inject(TYPES.DeleteCompanyUseCase)
		private deleteCompanyUseCase: DeleteCompanyUseCase,
		@inject(TYPES.FindByIdCompanyUseCase)
		private findByIdCompanyUseCase: FindByIdCompanyUseCase,
	) {
		this.router = Router();
		this.register(this.router);
	}

	getPrefix(): string {
		return "/company";
	}

	private register(router: Router): void {
		router.post("/create", this.createCompany.bind(this));
		router.put("/update", this.updateCompany.bind(this));
		router.get("/:id", this.findById.bind(this));
		router.get("/find-by-cnpj/:cnpj", this.findByCNPJ.bind(this));
		router.delete("/delete/:id", this.deleteCompany.bind(this));
	}

	private async createCompany(req: Request, res: Response): Promise<void> {
		const createCompanyDTO = new CreateCompanyDTO(req.body);

		try {
			await validateOrReject(createCompanyDTO);
			const result = await this.createCompanyUseCase.execute(createCompanyDTO);
			res.status(201).json({ message: "Company created successfully", result });
		} catch (error: any) {
			ResponseError(res, error);
		}
	}

	private async findByCNPJ(req: Request, res: Response): Promise<void> {
		const findByCNPJCompanyDTO = new FindByCNPJCompanyDTO({
			cnpj: req.params.cnpj,
		});
		const { cnpj } = findByCNPJCompanyDTO;

		try {
			await validateOrReject(findByCNPJCompanyDTO);
			const result = await this.findByCNPJCompanyUseCase.execute({ cnpj });
			res.status(200).json(result);
		} catch (error: any) {
			ResponseError(res, error);
		}
	}

	private async findById(req: Request, res: Response): Promise<void> {
		const findByIdCompanyDTO = new FindByIdCompanyDTO({ id: req.params.id });
		const { id } = findByIdCompanyDTO;

		try {
			await validateOrReject(findByIdCompanyDTO);
			const result = await this.findByIdCompanyUseCase.execute({ id });
			res.status(200).json(result);
		} catch (error: any) {
			ResponseError(res, error);
		}
	}

	private async updateCompany(req: Request, res: Response): Promise<void> {
		const updateCompanyDTO = new UpdateCompanyDTO(req.body);

		try {
			await validateOrReject(updateCompanyDTO);
			await this.updateCompanyUseCase.execute(updateCompanyDTO);
			res.status(200).json({ message: "Company updated successfully" });
		} catch (error: any) {
			ResponseError(res, error);
		}
	}

	private async deleteCompany(req: Request, res: Response): Promise<void> {
		const deleteCompanyDTO = new DeleteCompanyDTO({ id: req.params.id });
		const { id } = deleteCompanyDTO;

		try {
			await this.deleteCompanyUseCase.execute({ id });
			res.status(200).json({ message: "Company deleted successfully" });
		} catch (error: any) {
			ResponseError(res, error);
		}
	}
}
