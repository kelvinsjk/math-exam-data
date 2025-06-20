import { noBreak, QED } from "$lib/utils/typesetting";
import { half } from "$lib/utils/typesetting/math";
import { x } from "mathlifier";
import {
	type Expression,
	e,
	expressionToPolynomial,
	productVerbatim,
	sum,
} from "mathlify";
import { Integral, simplifyIntegral } from "mathlify/calculus";
import { EquationWorking, ExpressionWorking } from "mathlify/working";
import { StackedQn } from "sveltexam/helpers";
import { data } from "./data";

export const soln = new StackedQn();
const parameters = data.q6;

const { y, xT, lineX } = parameters;

const verbatim = true;
const hide = true;
const working1 = new EquationWorking("y", y, { aligned: true });
working1.differentiate();
const working2 = new EquationWorking("y", y.subIn({ x: xT }), {
	aligned: true,
});
const working3 = new EquationWorking(
	working1.eqn.lhs,
	working1.eqn.rhs.subIn({ x: xT }),
	{ aligned: true },
);
const yT = working2.eqn.rhs;
const working4 = new EquationWorking(sum("y", [-1, yT]), [
	working3.eqn.rhs,
	sum("x", -xT),
]);
working4.moveTerms(1).expand();
// workaround to factorize first few guys
// - remove the a
// - factorize
// - get terms, multiple the coeff into second factor
// move back the a
working4
	.moveTerms(2, { fromRight: true, hide })
	.factorize.commonFactor({ targetRight: true, hide })
	.massage(
		(exp: Expression) => {
			const [coeff, factors] = exp._getProductTerms();
			return productVerbatim(
				factors[0],
				factors[1].times(coeff, { expand: true }),
			);
		},
		{ targetRight: true, hide: true },
	)
	.moveTerms(1);
const rhs = working4.eqn.rhs;
const [t1, t2] = rhs._getSumTerms();
const r = t2.node.type === "variable" ? 1 : t2._getProductTerms()[0];
const poly = expressionToPolynomial(t1.divide(e));
const [q, p] = poly.coeffs;
export const ansB = { p, q, r };

// a
soln.addPart(
	x`${noBreak("p=", p, ",")}
${noBreak("q=", q, ",")}
${noBreak("r=", r, ".")}`,
	x`#${"align*"} ${working1}

When ${noBreak("x=", xT, ",")}
#${"align*"} ${working2} \\\\ ${working3}

Equation of tangent:
#${"gather*"} ${working4} \\; ${QED}

`,
);

// b
soln.addPart();
// b i
const working5 = new EquationWorking(0, rhs.subIn({ x: 0 }));
working5.swapSides({ hide }).isolate("a");
export const a = working5.eqn.rhs;
soln.addSubpart(
	x`${noBreak("a=", a, ".")}`,
	x`Since the tangent to $C$ at $T$ passes through the origin,
#${"gather*"} ${working5} \\; ${QED}`,
);
// b ii
const yTVal = yT.subIn({ a });
const triangle = "\\text{area of triangle}";
const working6 = new ExpressionWorking(
	sum(new Integral(y.subIn({ a }), "x", [lineX, xT]), [-1, triangle]),
	{ leadingEqual: true },
);
working6.subIn({ [triangle]: productVerbatim(half, xT, yTVal) }, { verbatim });
ExpressionWorking.RegisterCustomSimplifier(simplifyIntegral("x", "numerical"));
working6.simplify({ hide });
ExpressionWorking.DeregisterCustomSimplifier();
working6.toFixed(1);
export const area = working6.expression;
soln.addSubpart(
	x`${area} \\text{ units}^2.`,

	x`Since ${noBreak("a=", a, ",")}
coordinates of ${noBreak("T=\\left(", xT, ",", yTVal, "\\right)")}

![graph](/imgs/2024/solns/24p1q06.svg)

#${"align*"} &\\text{Area required}
\\\\ ${working6} \\text{ units}^2 \\; ${QED}`,
);
