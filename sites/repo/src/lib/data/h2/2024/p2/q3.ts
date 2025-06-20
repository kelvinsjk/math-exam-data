import { x as m } from "mathlifier";
import { StackedQn } from "sveltexam/helpers";
import { data } from "./data";

export const soln = new StackedQn();
const parameters = data.q3;

import { noBreak, QED } from "$lib/utils/typesetting";
import { range } from "$lib/utils/functions/range";
import {
	EquationWorking,
	ExpressionWorking,
	quadraticFormulaWorking,
} from "mathlify/working";
import { fnTerm } from "mathlify";
const { f, g, x } = parameters;

const hide = true;
const verbatim = true;

// a
export const Rf = range.quadratic(f);
soln.addPart(
	m`From the graph of $f$,

$${{}} R_f = ${Rf.toSet()} \\; ${QED}`,
	m`${noBreak("R_f=", Rf.toSet(), ".")}`,
);

// b
const working1 = new EquationWorking(
	"y",
	f.subIn({ x: 0 }, { verbatim: true }),
	{ aligned: true },
).simplify();
const { working, roots } = quadraticFormulaWorking(f);
export const xIntercepts = roots;
soln.addPart(
	m`When ${noBreak("x=0,")}
#${"align*"} ${working1}

When ${noBreak("y=0,")}
#${"align*"} ${working}

![graph](/imgs/2024/solns/24p2q03.svg)
`,
	m`Sketch.`,
);

// c
const inverseExist = `All horizontal lines $ {y=k,}$ $ {k \\in \\mathbb{R},} $
cuts the graph of $ {y=g(x)}$ at most once. Hence $g$ is a one-to-one function
and $g^{-1}$ exists`;
soln.addPart(m`All @${inverseExist} ${QED}`, m`@${inverseExist}.`);

// d
const working2 = new EquationWorking("y", g, { aligned: true });
working2
	.moveTerms(1, { fromRight: true })
	.reciprocal({ hide })
	.swapSides({ hide })
	.times(2, { expand: true });
const gInv = working2.eqn.rhs.subIn({ y: "x" });
working2.addCustomStep("\\therefore \\; g^{-1}(x)", gInv);
const working3 = new ExpressionWorking(fnTerm("fg^{-1}", x));
working3
	.addCustomStep(fnTerm("f", gInv.subIn({ x }, { verbatim }), { verbatim }))
	.simplify()
	.subIn({ f }, { verbatim })
	.simplify();
export const ansD = working3.expression;
soln.addPart(
	m`#${"align*"} ${working2}

#${"align*"} ${working3} \\; ${QED}`,
	m`${noBreak("fg^{-1}(", x, ")=", ansD, ".")}`,
);
