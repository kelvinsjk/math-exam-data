export const match = (param: string): param is Year => {
	return param.length === 2 && Number(param) >= 7 && Number(param) <= 24;
};

export type Year =
	| "07"
	| "08"
	| "09"
	| "10"
	| "11"
	| "12"
	| "13"
	| "14"
	| "15"
	| "16"
	| "17"
	| "18"
	| "19"
	| "20"
	| "21"
	| "22"
	| "23"
	| "24";
