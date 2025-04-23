import { Router } from "express";

export interface IRoute {
	getPrefix(): string; // Retorna o prefixo da rota (ex: "/mail")
	register(router: Router): void; // Registra as rotas
}
