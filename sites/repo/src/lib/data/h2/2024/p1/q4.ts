import { QED } from "$lib/utils/typesetting";
import { x } from "mathlifier";
import { Expression } from "mathlify";
import { EquationWorking, solve } from "mathlify/working";
import { StackedQn } from "sveltexam/helpers";
import { data } from "./data";

export const soln = new StackedQn();
const parameters = data.q4;

const { lhs, rhs, sign } = parameters;

const verbatim = true;
const working = new EquationWorking(lhs, rhs, { sign });
working
	.makeRhsZero()
	.combineFraction({ verbatim })
	.expand({ numeratorOnly: true })
	.negative({ expand: "numeratorOnly", hide: true })
	.rearrangeQuotient([1, 0, 2])
	.factorize.fraction();

const { answers, roots } = solve.rationalInequality(working.eqn);
export const ineqsA = answers;

// a
soln.addPart(
	x`${answers[0]}
	or ${answers[1]}.`,
	x`#${"gather*"} ${working}

![number-line](/imgs/2024/solns/24p1q04.svg)

$${{}} ${answers.map((x) => x.toString()).join(`\\; ${QED} \\; \\text{ or } \\; `)} \\; ${QED}	`,
);
// b
const finalRoot = new Expression(roots[roots.length - 1]);
export const ineqsB = [
	`${finalRoot.negative()} \\leq x < 0`,
	`0 < x \\leq ${finalRoot}`,
];

soln.addPart(
	x`${ineqsB[0]}
	or ${ineqsB[1]}.`,
	x`Replacing $x$
from part (a) with $|x|$,

$${{}} ${answers.map((x) => x.toString().replace("x", "|x|")).join("\\; \\text{ or } \\;")}

Not that ${answers[0].toString().replace("x", "|x|")}
is not applicable as $ |x| \\geq 0$ for all real values of $x$

![abs-graph](/imgs/2024/solns/24p1q04b.svg)

From the graph, solution to the inequality is

$${ineqsB.map((x) => x.toString()).join(`\\; ${QED} \\; \\text{ or } \\; `)} \\; ${QED}`,
);
