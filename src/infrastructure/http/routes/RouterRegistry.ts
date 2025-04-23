import { Router } from "express";
import { container } from "../../../di/inversify.config";
import { TYPES } from "../../../di/types";
import { IRoute } from "./IRoute";

export class RouterRegistry {
	private static routes: IRoute[] = [];

	static registerRoutes(): Router {
		const router: Router = Router();

		// Adicione aqui os controllers que implementam IRoute
		this.routes.push(container.get<IRoute>(TYPES.MailController));
		this.routes.push(container.get<IRoute>(TYPES.ClientController));
		this.routes.push(container.get<IRoute>(TYPES.TemplateController));
		this.routes.push(container.get<IRoute>(TYPES.AuthController));
		this.routes.push(container.get<IRoute>(TYPES.CompanyController));

		// Registra as rotas de cada módulo com seus prefixos
		this.routes.forEach((route: IRoute): void => {
			const prefix: string = route.getPrefix(); // Obtém o prefixo do controller
			const routeRouter: Router = Router(); // Cria um novo router para o controller
			route.register(routeRouter); // Registra as rotas do controller no router específico
			router.use(prefix, routeRouter); // Adiciona o router do controller ao router principal
		});

		return router;
	}
}
