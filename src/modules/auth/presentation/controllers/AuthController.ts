import { Request, Response, Router } from "express";
import { RegisterUserUseCase } from "../../domain/use-cases/RegisterUserUseCase";
import { AuthenticateUserUseCase } from "../../domain/use-cases/AuthenticateUserUseCase";
import { TYPES } from "../../../../di/types";
import { inject, injectable } from "inversify";
import { RegisterAuthDTO } from "../dtos/RegisterAuthDTO";
import { validateOrReject } from "class-validator";
import { LoginDTO } from "../dtos/LoginDTO";
import { ResponseError } from "../../../../shared/errors/ResponseError";

@injectable()
export class AuthController {
	public router: Router;

	constructor(
		@inject(TYPES.RegisterUserUseCase)
		private registerUserUseCase: RegisterUserUseCase,
		@inject(TYPES.AuthenticateUserUseCase)
		private authenticateUserUseCase: AuthenticateUserUseCase,
	) {
		this.router = Router();
		this.register(this.router);
	}

	getPrefix(): string {
		return "/auth";
	}

	register(router: Router): void {
		router.post("/register", this.registerAuth.bind(this));
		router.post("/login", this.login.bind(this));
	}

	private async registerAuth(req: Request, res: Response): Promise<void> {
		const registerAuthDTO = new RegisterAuthDTO(req.body);
		const { email, password, name } = registerAuthDTO;

		try {
			await validateOrReject(registerAuthDTO);
			await this.registerUserUseCase.execute(email, password, name);
			res.status(201).json({ message: "User registered successfully" });
		} catch (error: any) {
			ResponseError(res, error);
		}
	}

	private async login(req: Request, res: Response): Promise<void> {
		const loginDTO = new LoginDTO(req.body);
		const { email, password } = loginDTO;

		try {
			await validateOrReject(loginDTO);
			const result = await this.authenticateUserUseCase.execute(
				email,
				password,
			);
			res.status(200).json(result);
		} catch (error: any) {
			ResponseError(res, error);
		}
	}
}
