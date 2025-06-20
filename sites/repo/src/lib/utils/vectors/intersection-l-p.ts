import { type Expression, sumVerbatim } from "mathlify";
import { type Line, type Plane, Vector } from "mathlify/vectors";
import { EquationWorking, ExpressionWorking } from "mathlify/working";

export function intersectionWorkingLP(
	l: Line,
	p: Plane,
	options?: ConstructorParameters<typeof EquationWorking>[2],
): EquationWorking & {
	intersection: Vector;
	lambda: Expression;
	positionVectorWorking: ExpressionWorking;
} {
	l.stringMode = "column";
	const n = p.normal;
	const working: EquationWorking & {
		intersection?: Vector;
		lambda?: Expression;
		positionVectorWorking?: ExpressionWorking;
	} = new EquationWorking(`${l.toVectorString()} \\cdot ${n}`, p.rhs, options);
	working.addCustomStep(sumVerbatim([n.x, l.x], [n.y, l.y], [n.z, l.z]));
	working.expand();
	const { root: lambda } = working.solve.linear(l.parameter);
	working.lambda = lambda;
	const lambdaString =
		typeof l.parameter === "string" ? l.parameter : l.parameter.name;
	const positionVectorWorking = new ExpressionWorking(
		l.subIn({ [lambdaString]: lambda }, { verbatim: true }),
		{ leadingEqual: true },
	);
	positionVectorWorking.simplify();
	working.positionVectorWorking = positionVectorWorking;
	const exp = positionVectorWorking.expression;
	const intersection = getIntersection(exp);
	working.intersection = intersection;
	return working as EquationWorking & {
		intersection: Vector;
		lambda: Expression;
		positionVectorWorking: ExpressionWorking;
	};
}

function getIntersection(exp: Expression): Vector {
	if (exp instanceof Vector) return exp;
	if (
		exp.node.type === "product" &&
		exp.node.factors.length === 1 &&
		exp.node.factors[0] instanceof Vector
	) {
		return exp.node.factors[0].times(exp.node.coeff);
	}
	throw new Error("Intersection not found");
}
