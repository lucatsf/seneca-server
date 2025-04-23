import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
): void {
	const token = req.header("Authorization")?.replace("Bearer ", "");

	if (!token) {
		res.status(403).json({ error: "Access denied. No token provided." });
		return;
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!);
		(req as any).user = decoded;
		next();
	} catch (error) {
		res.status(403).json({ error: "Invalid token." });
	}
}
