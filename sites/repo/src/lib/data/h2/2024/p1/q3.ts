import { x } from "mathlifier";
import { ExpressionWorking } from "mathlify/working";
import { StackedQn } from "sveltexam/helpers";
import { data } from "./data";

export const soln = new StackedQn();
const parameters = data.q3;

import { noBreak, QED } from "$lib/utils/typesetting";
import {
	expressionToPolynomial,
	i,
	Polynomial,
	product,
	sum,
	sumVerbatim,
} from "mathlify";
import { simplifyComplex } from "mathlify/complex";

const { realRoot, w, poly } = parameters;

// a
soln.addPart(
	x`$a, b$ and $c$ must be real.`,
	x`$a, b$ and $c$ must be real ${QED}`,
);

// b
const wStar = w.conjugate();
const variable = "z";
const factor1 = Polynomial.fromRoot(realRoot, { variable });
const factor2 = sumVerbatim(variable, [-1, w]);
const factor3 = sumVerbatim(variable, [-1, wStar]);
const working1 = new ExpressionWorking(poly);
working1
	.subIn({ [poly.toString()]: [factor1, factor2, factor3] }, { verbatim: true })
	.subIn({
		[factor2.toString()]: factor2.expand(),
		[factor3.toString()]: factor3.expand(),
	});
working1.addCustomStep(
	product(
		factor1,
		sum(
			[new Polynomial([1, w.real.negative()], { variable }), "^", 2],
			[-1, [[w.imag.abs(), i], "^", 2]],
		),
	),
);
ExpressionWorking.RegisterCustomSimplifier(simplifyComplex);
working1.addCustomStep(
	product(
		factor1,
		sum(
			[new Polynomial([1, w.real.negative()], { variable }), "^", 2],
			[-1, [[w.imag.abs(), i], "^", 2]],
		).expand(),
	),
);
ExpressionWorking.DeregisterCustomSimplifier();
working1.expand();

const polyAns = expressionToPolynomial(working1.expression, "z");
export const a = polyAns.coeffs[2];
export const b = polyAns.coeffs[1];
export const c = polyAns.coeffs[0];

soln.addPart(
	x`${noBreak("a=", a, ",")}
	${noBreak("b=", b, ",")}
	${noBreak("c=", c, ".")}`,
	x`Since all coefficients are real, the conjugate ${noBreak("w^*=", wStar)}
is the third root of the equation.

#${"align*"} ${working1}

Comparing coefficients,
$${{}} a = ${a}, \\quad b = ${b}, \\quad c = ${c} \\; ${QED}
`,
);
