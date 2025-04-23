import { inject, injectable } from "inversify";
import { IUserRepository } from "../repositories/IUserRepository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TYPES } from "../../../../di/types";
import { SendError } from "../../../../shared/errors/SendError";
import { LoggedUser } from "../../../../core/entities/LoggedUser";
import { userContextProvider } from "../../../../core/providers/UserContextProvider";

type AuthenticateUserResponse = {
	user: {
		id: string;
		email: string;
		name: string;
		companyId?: string;
	};
	token: string;
};

@injectable()
export class AuthenticateUserUseCase {
	constructor(
		@inject(TYPES.UserRepository)
		private readonly userRepository: IUserRepository,
	) {}

	async execute(
		email: string,
		password: string,
	): Promise<AuthenticateUserResponse> {
		const user = await this.userRepository.findByEmail(email);
		if (!user) {
			throw new SendError("Invalid email or password", 401);
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			throw new SendError("Invalid email or password", 401);
		}

		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
			expiresIn: "1h",
		});

		const loggedUser = new LoggedUser(
			user.id,
			user.name,
			user.email,
			[],
			user.companyId,
		);

		userContextProvider.setLoggedUser(loggedUser);

		return {
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
				companyId: user.companyId,
			},
			token,
		};
	}
}
