import * as dotenv from "dotenv";

dotenv.config();

export const env = {
	NODE_ENV: process.env.NODE_ENV || "development",
	EMAIL_HOST: process.env.EMAIL_HOST || "localhost",
	EMAIL_PORT: parseInt(process.env.EMAIL_PORT || "2500"),
	EMAIL_SECURE: process.env.EMAIL_SECURE === "true",
	EMAIL_AUTH_USER: process.env.EMAIL_AUTH_USER,
	EMAIL_AUTH_PASS: process.env.EMAIL_AUTH_PASS,
	REDIS_HOST: process.env.REDIS_HOST,
	REDIS_PORT: parseInt(process.env.REDIS_PORT || "6379"),
	POSTGRES_HOST: process.env.POSTGRES_HOST || "localhost",
	POSTGRES_USER: process.env.POSTGRES_USER,
	POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
	POSTGRES_DB: process.env.POSTGRES_DB,
	POSTGRES_PORT: parseInt(process.env.POSTGRES_PORT || "5432"),
	POSTGRES_SYNCHRONIZE: process.env.POSTGRES_SYNCHRONIZE === "true",
	POSTGRES_LOGGING: process.env.POSTGRES_LOGGING === "true",
};
