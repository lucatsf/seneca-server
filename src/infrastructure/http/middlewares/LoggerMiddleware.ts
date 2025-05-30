import { Request, Response, NextFunction } from "express";

export function loggerMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	console.log(`${req.method} ${req.url} - ${new Date()}`);
	next();
}
