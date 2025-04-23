import { inject, injectable } from "inversify";
import { UserEntity } from "../../../../infrastructure/database/entities/UserEntity";
import { IUserRepository } from "../repositories/IUserRepository";
import bcrypt from "bcryptjs";
import { TYPES } from "../../../../di/types";
import { SendError } from "../../../../shared/errors/SendError";

@injectable()
export class RegisterUserUseCase {
	constructor(
		@inject(TYPES.UserRepository)
		private readonly userRepository: IUserRepository,
	) {}

	async execute(email: string, password: string, name: string): Promise<void> {
		const existingUser = await this.userRepository.findByEmail(email);
		if (existingUser) {
			throw new SendError("User already exists", 400);
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const user = new UserEntity();
		user.email = email;
		user.password = hashedPassword;
		user.name = name;
		user.status = "available";

		await this.userRepository.save(user);
	}
}
