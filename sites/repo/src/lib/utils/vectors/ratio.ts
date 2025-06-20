import { quotient, sum, sumVerbatim } from "mathlify";
import type { Vector } from "mathlify/vectors";
import { ExpressionWorking } from "mathlify/working";

export function ratioWorking(
	v1: Vector,
	v1Name: string,
	v2: Vector,
	v2Name: string,
	ratio: [number, number] | Readonly<[number, number]>,
	options?: ConstructorParameters<typeof ExpressionWorking>[1],
) {
	v1.stringMode = "column";
	v2.stringMode = "column";
	const working = new ExpressionWorking(
		quotient(
			sum([ratio[1], v1Name], [ratio[0], v2Name]),
			sumVerbatim(ratio[0], ratio[1]),
		),
		options,
	);
	const den = sum(ratio[0], ratio[1]);
	working.addCustomStep(quotient(sum([ratio[1], v1], [ratio[0], v2]), den));
	const numerator = v1.times(ratio[1]).plus(v2.times(ratio[0]));
	working.addCustomStep([quotient(1, den), `${numerator}`]);
	return working;
}
