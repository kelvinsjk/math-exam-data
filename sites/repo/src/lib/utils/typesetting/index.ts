export const QED = "\\QED ";
export function capitalizeFirstLetter(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export const modified =
	"[This question has been adapted from the original for the new syllabus]";
export const noGC =
	"**Do not use a graphic calculator in answering this question.**";
export const noCalc = "**Do not use a calculator in answering this question.**";

export function noBreak(...args: unknown[]) {
	return "{" + args.join(" ") + "}";
}
export const display = "\\displaystyle ";
