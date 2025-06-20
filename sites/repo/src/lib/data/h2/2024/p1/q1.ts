import { x } from "mathlifier";
import { EquationWorking } from "mathlify/working";
import { StackedQn } from "sveltexam/helpers";
import { data } from "./data";

export const soln = new StackedQn();
const parameters = data.q1;

import { noBreak, QED } from "$lib/utils/typesetting";
import { sle } from "mathlify/numerical";

const { y, xAsymptote, turningPt } = parameters;

// a
const den = y._getQuotientTerms()[1];

const working1 = new EquationWorking(
	den.subIn({ x: xAsymptote }, { verbatim: true }),
	0,
);
working1.simplify();
const working2 = new EquationWorking(
	y.subIn({ x: turningPt[0] }, { verbatim: true }),
	turningPt[1],
);
working2
	.simplify()
	.times(-1, { expand: true, hide: true })
	.crossMultiply({ hide: true, expand: true })
	.swapSides();
const working3 = new EquationWorking("y", y, { aligned: true });
working3.differentiate("x", ["y"]);
const dydx = working3.eqn.lhs;
const working4 = new EquationWorking(dydx, 0);
working4.subIn(
	{
		[dydx.toString()]: working3.eqn.rhs._getQuotientTerms()[0],
	},
	{ verbatim: true },
);
working4.subIn({ x: turningPt[0] }, { verbatim: true });
working4.simplify();
const roots = sle(["a", "b", "c"], working1.eqn, working2.eqn, working4.eqn);
export const a = roots[0];
export const b = roots[1];
export const c = roots[2];

soln.addBody(
	x`${{}} a=${a},
${{}} b=${b},
${{}} c=${c}.`,
	x`Since the graph has a vertical asymptote ${noBreak("x=", xAsymptote, ",")}
#${"gather"} ${working1}

Since the graph passes through ${{}} \\left( ${turningPt[0]}, ${turningPt[1]} \\right),
#${"gather"} ${working2}

#${"align*"} ${working3}

Since ${{}} \\left( ${turningPt[0]}, ${turningPt[1]} \\right)
is a turning point,
#${"gather"} ${working4}

Solving $(2), (5)$ and $(9)$ simultaneously,
$${{}} a=${a}, \\quad b=${b}, \\quad c=${c} \\; ${QED}`,
);
