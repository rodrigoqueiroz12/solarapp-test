import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const fetcher = (url: string) =>
	fetch(url)
		.then(r => {
			if (!r.ok) {
				throw new Error(`${r.status} - ${r.statusText}`)
			}
			return r.json()
		})
		.catch(error => {
			console.error(error)
		})

export function getState(uf: string): string {
	const states: { [key: string]: string } = {
		AC: "Acre",
		AL: "Alagoas",
		AP: "Amapá",
		AM: "Amazonas",
		BA: "Bahia",
		CE: "Ceará",
		DF: "Distrito Federal",
		ES: "Espírito Santo",
		GO: "Goiás",
		MA: "Maranhão",
		MT: "Mato Grosso",
		MS: "Mato Grosso do Sul",
		MG: "Minas Gerais",
		PA: "Pará",
		PB: "Paraíba",
		PR: "Paraná",
		PE: "Pernambuco",
		PI: "Piauí",
		RJ: "Rio de Janeiro",
		RN: "Rio Grande do Norte",
		RS: "Rio Grande do Sul",
		RO: "Rondônia",
		RR: "Roraima",
		SC: "Santa Catarina",
		SP: "São Paulo",
		SE: "Sergipe",
		TO: "Tocantins",
	}

	if (states.hasOwnProperty(uf.toLocaleUpperCase())) {
		return states[uf]
	}

	return ""
}
