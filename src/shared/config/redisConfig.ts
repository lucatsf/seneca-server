import { env } from "./env";

export const redisConfig = {
	host: env.REDIS_HOST,
	port: env.REDIS_PORT,
};
