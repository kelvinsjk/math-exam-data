import { EquationWorking, ExpressionWorking } from "mathlify/working";
import { x } from "mathlifier";
import { StackedQn } from "sveltexam/helpers";
import { data } from "./data";

export const soln = new StackedQn();
const parameters = data.q1;

import { noBreak, QED } from "$lib/utils/typesetting";
import { simplifyComplex } from "mathlify/complex";
const { z, rhs, w, exp } = parameters;

const hide = true;
const verbatim = true;
// a
const working1 = new EquationWorking("z", rhs);
working1
	.subIn({ z, "z^*": z.conjugate() })
	.expand({ hide })
	.rearrange([0, 2, 1], { targetRight: true });
const working2 = working1.compare
	.imag()
	.swapSides({ hide })
	._makeSubjectFromProduct("a");
working2.aligned = true;
export const a = working2.eqn.rhs;
const working3 = working1.compare
	.real()
	.subIn({ a }, { verbatim })
	.swapSides({ hide })
	.isolate("b");
working3.aligned = true;
export const b = working3.eqn.rhs;
soln.addPart(
	x`#${"gather*"} ${working1}

Comparing imaginary parts,
#${"align*"} ${working2} \\; ${QED}

Comparing real parts,
#${"align*"} ${working3} \\; ${QED}
`,
	x`${noBreak("a=", a, ",")}
${noBreak("b=", b, ".")}`,
);
// b
const working4 = new ExpressionWorking(exp);
working4
	.subIn({ w, z }, { verbatim })
	.rationalize()
	.expand()
	.simplify({ simplifiers: simplifyComplex })
	.expand();
export const ansB = working4.expression;
soln.addPart(x`#${"align*"}${working4} \\; ${QED}`, x`${ansB}.`);
