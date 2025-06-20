import type { Expression } from "mathlify";
import { Abs } from "mathlify/fns";
import { Vector } from "mathlify/vectors";

export function simplifyVectorMagnitude(exp: Expression): Expression {
	if (exp.node instanceof Abs && exp.node.argument instanceof Vector) {
		return exp.node.argument.magnitude();
	}
	return exp;
}
