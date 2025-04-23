import { DataSource } from "typeorm";
import { ClientEntity } from "./entities/ClientEntity";
import { TemplateEntity } from "./entities/TemplateEntity";
import { env } from "./../../shared/config/env";
import { UserEntity } from "./entities/UserEntity";
import { CompanyEntity } from "./entities/CompanyEntity";
import { MailEntity } from "./entities/MailEntity";

let migrations = ["src/infrastructure/database/migrations/*.ts"];
if (process.env.NODE_ENV === "development") {
	migrations = ["dist/infrastructure/database/migrations/*.js"];
}

export const AppDataSource = new DataSource({
	type: "postgres",
	host: env.POSTGRES_HOST,
	port: env.POSTGRES_PORT,
	username: env.POSTGRES_USER,
	password: env.POSTGRES_PASSWORD,
	database: env.POSTGRES_DB,
	synchronize: env.POSTGRES_SYNCHRONIZE,
	logging: env.POSTGRES_LOGGING,
	entities: [
		ClientEntity,
		TemplateEntity,
		UserEntity,
		CompanyEntity,
		MailEntity,
	],
	migrations: migrations,
	subscribers: [],
});
