export function formatError(error: any): {
	message: string;
	statusCode?: string;
	details?: any;
} {
	if (Array.isArray(error) && error[0]?.constraints) {
		// Erro de validação do class-validator
		const validationErrors = error.map((err) => ({
			field: err.property,
			constraints: err.constraints,
			code: err?.statusCode,
		}));

		return {
			message: "Validation failed",
			details: validationErrors,
			statusCode: error.find((err) => err?.statusCode)?.statusCode,
		};
	}

	if (error instanceof Error) {
		return {
			message: error.message,
			statusCode:
				"statusCode" in error ? (error.statusCode as string) : undefined,
			details: "details" in error ? error.details : undefined,
		};
	}

	return {
		message: "An unexpected error occurred",
		details: error,
		statusCode: "500",
	};
}
