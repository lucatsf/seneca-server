import { Response } from "express";
import { formatError } from "../utils/errorFormatter";
import { SendError } from "./SendError";

export const ResponseError = (res: Response, error: SendError): any => {
	let message;
	let code;

	const formattedError = formatError(error);

	if (formattedError.statusCode) {
		code = parseInt(formattedError.statusCode);
	} else {
		code = 500;
	}

	if (formattedError.message) {
		message = formattedError.message;
	} else {
		message = "An unexpected error occurred";
	}

	if (formattedError?.details) {
		return res.status(code).json({
			message,
			details: formattedError.details,
		});
	}

	console.error("Error", message);
	return res.status(code).json({
		message,
	});
};
