import { LoggedUser } from "../entities/LoggedUser";

export class UserContextProvider {
	private static instance: UserContextProvider;
	private loggedUser: LoggedUser | null = null;

	private constructor() {} // Construtor privado para evitar instanciação externa

	public static getInstance(): UserContextProvider {
		if (!UserContextProvider.instance) {
			UserContextProvider.instance = new UserContextProvider();
		}
		return UserContextProvider.instance;
	}

	public setLoggedUser(user: LoggedUser): void {
		this.loggedUser = user;
	}

	public getLoggedUser(): LoggedUser | null {
		return this.loggedUser;
	}

	public clearLoggedUser(): void {
		this.loggedUser = null;
	}
}

export const userContextProvider = UserContextProvider.getInstance();
