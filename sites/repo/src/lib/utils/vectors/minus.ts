import { type Expression, quotient, sum } from "mathlify";
import { simplifyVector, Vector } from "mathlify/vectors";
import { ExpressionWorking } from "mathlify/working";

export function minusWorking(
	A: Vector,
	aName: string,
	B: Vector,
	bName: string,
	options: ConstructorParameters<typeof ExpressionWorking>[1] & {
		returnVector: true;
		floatWorkaround?: boolean;
	},
): ExpressionWorking & { result: Vector };
export function minusWorking(
	A: Vector,
	aName: string,
	B: Vector,
	bName: string,
	options: ConstructorParameters<typeof ExpressionWorking>[1] & {
		floatWorkaround?: boolean;
		returnVector?: boolean;
	},
): ExpressionWorking & { result: Vector | Expression };
export function minusWorking(
	A: Vector,
	aName: string,
	B: Vector,
	bName: string,
	options: ConstructorParameters<typeof ExpressionWorking>[1] & {
		floatWorkaround?: boolean;
		returnVector?: boolean;
	},
): ExpressionWorking & { result: Vector | Expression } {
	const working: ExpressionWorking & { result?: Vector | Expression } =
		new ExpressionWorking(sum(bName, [-1, aName]), options);
	working.subIn({ [aName]: A, [bName]: B }, { verbatim: true });
	if (options?.floatWorkaround) {
		const floats = [A.x, B.x, A.y, B.y, A.z, B.z];
		const ints = floats.map((float) => {
			if (
				(float.node.type === "numeral" &&
					float.node.number.type === "fraction") ||
				Number.isInteger(float.valueOf())
			) {
				return float;
			}
			let i = 1;
			let num = float.valueOf();
			while (!Number.isInteger(num)) {
				num *= 10;
				i *= 10;
			}
			return quotient(num, i);
		});
		working.expression = sum(new Vector(ints[0], ints[2], ints[4]), [
			-1,
			new Vector(ints[1], ints[3], ints[5]),
		]);
	}
	ExpressionWorking.RegisterCustomSimplifier(simplifyVector);
	working.simplify();
	ExpressionWorking.DeregisterCustomSimplifier();
	const exp = working.expression;
	if (options?.returnVector) {
		if (!(exp instanceof Vector)) {
			const [coeff, vectors] = exp._getProductTerms();
			const vector = vectors[0];
			if (!(vector instanceof Vector))
				throw new Error("vector must be a Vector");
			working.result = vector.times(coeff);
			working.expressions = working.expressions.slice(0, -1);
			working.expressions.push(working.result);
			return working as ExpressionWorking & { result: Vector };
		}
	}
	working.result = exp;
	return working as ExpressionWorking & { result: Vector | Expression };
}
