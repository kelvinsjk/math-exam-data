import { x } from "mathlifier";
import { EquationWorking } from "mathlify/working";
import { StackedQn } from "sveltexam/helpers";
import { data } from "./data";

export const soln = new StackedQn();
const parameters = data.q2;

import { noBreak, QED } from "$lib/utils/typesetting";
import { theta, vec } from "$lib/utils/typesetting/math";
import { absTerm, trigTerm } from "mathlify/fns";

const { crossMagnitude, bDotB } = parameters;

// a
const b = vec("b");
const a = vec("a");
const modB = absTerm(b);
const modA = absTerm(a);
const bDotBString = `${b} \\cdot ${b}`;
const working1 = new EquationWorking(bDotBString, bDotB);
working1.subIn({ [bDotBString]: [modB, "^", 2] });
working1.sqrt();
const modBVal = working1.eqn.rhs;
const crossMagnitudeString = `\\left\\lvert ${a} \\cross ${b} \\right\\rvert`;
const working2 = new EquationWorking(crossMagnitudeString, crossMagnitude);
const sinTheta = trigTerm("sin", theta);
working2.subIn({ [crossMagnitudeString]: [modA, modB, sinTheta] });
working2.subIn(
	{
		[modA.toString()]: 1,
		[modB.toString()]: modBVal,
	},
	{ verbatim: true },
);
working2
	.simplify({ hide: true })
	._makeSubjectFromProduct(theta)
	.inverse({ units: "deg" });
export const angle = working2.eqn.rhs;
soln.addBody(
	x`${noBreak("\\sin \\theta = 1.")}`,
	x`${a}
is a unit vector ${{}} \\Rightarrow ${noBreak(modA, "=1")}

#${"align*"} ${working1}

Let ${theta}
be the angle between ${a}
and ${b}.
#${"gather*"} ${working2}^\\circ

Hence ${a}
and ${b}
are perpendicular ${QED}`,
);
