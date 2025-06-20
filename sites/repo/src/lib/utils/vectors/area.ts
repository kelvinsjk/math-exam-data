import { half } from "$lib/utils/typesetting/math";
import { product, productVerbatim, sumVerbatim } from "mathlify";
import { absTerm } from "mathlify/fns";
import { Vector } from "mathlify/vectors";
import { ExpressionWorking } from "mathlify/working";
import { simplifyVectorMagnitude } from "./magnitude";

export function areaWorking(
	v1: Vector,
	v1Name: string,
	v2: Vector,
	v2Name: string,
	options?: ConstructorParameters<typeof ExpressionWorking>[1] & {
		parallelogram?: boolean;
	},
) {
	const k = options?.parallelogram ? 1 : half;
	v1.stringMode = "column";
	v2.stringMode = "column";
	const working = new ExpressionWorking(
		product(k, absTerm(`${v1Name} \\times ${v2Name}`)),
		options,
	)
		.addCustomStep(product(k, absTerm(`${v1} \\times ${v2}`)))
		.addCustomStep(
			productVerbatim(
				k,
				absTerm(
					new Vector(
						sumVerbatim([1, v1.y, v2.z], [-1, v1.z, v2.y]),
						[-1, sumVerbatim([1, v1.x, v2.z], [-1, v1.z, v2.x])],
						sumVerbatim([1, v1.x, v2.y], [-1, v1.y, v2.x]),
					),
				),
			),
		);
	const cross = v1.cross(v2);
	working.addCustomStep(productVerbatim(k, absTerm(cross)));
	working.simplify();
	ExpressionWorking.RegisterCustomSimplifier(simplifyVectorMagnitude);
	working.simplify();
	ExpressionWorking.DeregisterCustomSimplifier();
	return working;
}
