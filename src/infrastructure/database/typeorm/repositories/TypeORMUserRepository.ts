import { UserEntity } from "../../entities/UserEntity";
import { IUserRepository } from "../../../../modules/auth/domain/repositories/IUserRepository";
import { AppDataSource } from "../../data-source";

export class TypeORMUserRepository implements IUserRepository {
	private userRepository = AppDataSource.getRepository(UserEntity);

	async findByEmail(email: string): Promise<UserEntity | null> {
		return this.userRepository.findOne({ where: { email } });
	}

	async save(user: UserEntity): Promise<void> {
		await this.userRepository.save(user);
	}

	async update(user: UserEntity): Promise<void> {
		await this.userRepository.save(user);
	}

	async delete(user: UserEntity): Promise<void> {
		await this.userRepository.remove(user);
	}
}
