import { noBreak, QED } from "$lib/utils/typesetting";
import { xAxis } from "$lib/utils/typesetting/math";
import { x as m } from "mathlifier";
import { quotient } from "mathlify";
import { Differential } from "mathlify/calculus";
import { simplifySurd, Tan } from "mathlify/fns";
import { EquationWorking } from "mathlify/working";
import { StackedQn } from "sveltexam/helpers";
import { data } from "./data";

export const soln = new StackedQn();
const parameters = data.q9;

const { y, x, angle } = parameters;

const working1 = new EquationWorking("x", x, { aligned: true });
const working2 = new EquationWorking("y", y, { aligned: true });
working1.differentiate("t", ["x", "y"]);
working2.differentiate("t", ["x", "y"]);
const dxdt = working1.eqn.rhs;
const dydt = working2.eqn.rhs;

const dydxString = new Differential();
const dydxWorking = new EquationWorking(
	dydxString,
	`${working1.eqn.lhs} \\div ${working2.eqn.lhs}`,
	{ aligned: true },
);
dydxWorking
	.addCustomStep(dydxString, quotient(dydt, dxdt))
	.factorize.fraction("rhs")
	.simplify();
const dydx = dydxWorking.eqn.rhs;
export const k = dydx.divide("t");

// a
soln.addPart(
	m`${noBreak("k=", k, ".")}`,
	m`#${"align*"} ${working1} \\\\ ${working2}

#${"align*"} ${dydxWorking}	\\; ${QED}`,
);

// b
const working3 = new EquationWorking(dydxString, new Tan([angle, "^\\circ"]), {
	aligned: true,
});
working3.subIn({ [dydxString.toString()]: dydx }).simplify();
const t = working3.eqn.rhs;
const working4 = new EquationWorking("x", x, { aligned: true }).subIn(
	{ t },
	{ hide: true },
);
EquationWorking.RegisterCustomSimplifier(simplifySurd);
working4.simplify();
const working5 = new EquationWorking("y", y, { aligned: true }).subIn({ t });
EquationWorking.DeregisterCustomSimplifier();
export const xP = working4.eqn.rhs;
export const yP = working5.eqn.rhs;

soln.addPart(
	m`${{}} \\left( ${xP}, ${yP} \\right).`,
	m`Since the tangent makes an angle of ${angle}^\\circ
with the ${xAxis},
#${"align*"} ${working3}

#${"align*"} ${working4} \\\\ ${working5}

Coordinates of $P$:
$${{}} \\left( ${xP}, ${yP} \\right) \\; ${QED}
`,
);

// c
soln.addPart(m`Out of syllabus.`, m`Out of syllabus.`);
