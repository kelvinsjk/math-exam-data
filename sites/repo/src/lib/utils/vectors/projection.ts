import { type Expression, product, quotient, sumVerbatim } from "mathlify";
import { absTerm, Brackets } from "mathlify/fns";
import { simplifyVector, Vector } from "mathlify/vectors";
import { ExpressionWorking } from "mathlify/working";

export function projectionWorking(
	A: Vector,
	aName: string,
	B: Vector,
	bName: string,
	options: ConstructorParameters<typeof ExpressionWorking>[1] & {
		floatWorkaround?: boolean;
		returnVector: true;
	},
): ExpressionWorking & { result: Vector };
export function projectionWorking(
	A: Vector,
	aName: string,
	B: Vector,
	bName: string,
	options: ConstructorParameters<typeof ExpressionWorking>[1] & {
		floatWorkaround?: boolean;
		returnVector?: boolean;
	},
): ExpressionWorking & { result: Vector | Expression };
export function projectionWorking(
	A: Vector,
	aName: string,
	B: Vector,
	bName: string,
	options: ConstructorParameters<typeof ExpressionWorking>[1] & {
		floatWorkaround?: boolean;
		returnVector?: boolean;
	},
): ExpressionWorking & { result: Vector | Expression } {
	const bHat = `\\hat{${bName}}`;
	const working: ExpressionWorking & { result?: Vector | Expression } =
		new ExpressionWorking(
			[new Brackets([aName, "\\cdot", bHat]), bHat],
			options,
		);
	working.subIn(
		{ [aName]: A, [bHat]: quotient(B, absTerm(B)) },
		{ verbatim: true },
	);
	working.addCustomStep([
		quotient(
			sumVerbatim([1, A.x, B.x], [1, A.y, B.y], [1, A.z, B.z]),
			B.dot(B),
			{ verbatim: true },
		),
		B,
	]);
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
		working.expression = product(
			quotient(
				sumVerbatim(
					[1, ints[0], ints[1]],
					[1, ints[2], ints[3]],
					[1, ints[4], ints[5]],
				),
				B.dot(B),
			),
			B,
		);
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
