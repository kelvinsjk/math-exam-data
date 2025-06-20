import { sumVerbatim } from "mathlify";
import type { Vector } from "mathlify/vectors";
import { ExpressionWorking } from "mathlify/working";

export function dotWorking(
	v1: Vector,
	v2: Vector,
	options?: ConstructorParameters<typeof ExpressionWorking>[1],
) {
	v1.stringMode = "column";
	v2.stringMode = "column";
	const working = new ExpressionWorking(`${v1} \\cdot ${v2}`, options);
	working.addCustomStep(
		sumVerbatim([1, v1.x, v2.x], [1, v1.y, v2.y], [1, v1.z, v2.z]),
		// workaround to force "coeff" in product to be 1
	);
	working.simplify();
	return working;
}
