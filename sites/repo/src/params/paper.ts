export const match = (param: string): param is "p1" | "p2" => {
	return param === "p1" || param === "p2";
};
