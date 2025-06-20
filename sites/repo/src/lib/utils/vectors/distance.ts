import { vec } from "$lib/utils/typesetting/math";
import { type Expression, quotient, sumVerbatim } from "mathlify";
import { absTerm } from "mathlify/fns";
import { Line, type Plane, Vector } from "mathlify/vectors";
import { ExpressionWorking } from "mathlify/working";
import { simplifyVectorMagnitude } from "./magnitude";

export function distanceWorking(
	v: Vector,
	vName: string,
	o: Line | Plane,
	options: ConstructorParameters<typeof ExpressionWorking>[1],
): ExpressionWorking & { distance: Expression } {
	const [times, vector, name] =
		o instanceof Line
			? ["\\times ", o.direction, vec("d")]
			: ["\\cdot ", o.normal, vec("n")];
	const hat = `\\hat{${name}}`;
	const working: ExpressionWorking & { distance?: Expression } =
		new ExpressionWorking(absTerm(`${vName} ${times} ${hat}`), options);
	working.addCustomStep(
		quotient(absTerm(`${v} ${times} ${vector}`), absTerm(vector)),
	);
	const timesWorking =
		times === "\\times "
			? new Vector(
					sumVerbatim([1, v.y, vector.z], [-1, v.z, vector.y]),
					[-1, sumVerbatim([1, v.x, vector.z], [-1, v.z, vector.x])],
					sumVerbatim([1, v.x, vector.y], [-1, v.y, vector.x]),
				)
			: sumVerbatim([1, v.x, vector.x], [1, v.y, vector.y], [1, v.z, vector.z]);
	working.addCustomStep(
		quotient(absTerm(timesWorking), absTerm(vector), { verbatim: true }),
	);
	ExpressionWorking.RegisterCustomSimplifier(simplifyVectorMagnitude);
	working.simplify();
	ExpressionWorking.DeregisterCustomSimplifier();
	working.distance = working.expression;
	return working as ExpressionWorking & { distance: Expression };
}
