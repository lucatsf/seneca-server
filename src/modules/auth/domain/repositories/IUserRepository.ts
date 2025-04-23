import { Auth } from "../entities/Auth";

export interface IUserRepository {
	findByEmail(email: string): Promise<Auth | null>;
	save(user: Auth): Promise<void>;
	update(user: Auth): Promise<void>;
	delete(user: Auth): Promise<void>;
}
