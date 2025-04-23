export const isValidCNPJ = (cnpj: string): boolean => {
	// Remove caracteres não numéricos
	cnpj = cnpj.replace(/\D/g, "");

	// Verifica se tem 14 dígitos
	if (cnpj.length !== 14) {
		return false;
	}

	// Calcula os dígitos verificadores
	let soma = 0;
	let pesos = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

	for (let i = 0; i < 12; i++) {
		soma += parseInt(cnpj[i]) * pesos[i];
	}

	let digito1 = soma % 11 < 2 ? 0 : 11 - (soma % 11);

	soma = 0;
	pesos = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

	for (let i = 0; i < 13; i++) {
		soma += parseInt(cnpj[i]) * pesos[i];
	}

	let digito2 = soma % 11 < 2 ? 0 : 11 - (soma % 11);

	// Compara os dígitos verificadores
	if (parseInt(cnpj[12]) !== digito1 || parseInt(cnpj[13]) !== digito2) {
		return false;
	}

	return true;
};
