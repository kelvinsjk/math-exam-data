import { x } from "mathlifier";
import { StackedQn } from "sveltexam/helpers";
import { data as qnData } from "./data";

export const soln = new StackedQn();
const parameters = qnData.q11;
import { noBreak, QED } from "$lib/utils/typesetting";
import { Regression } from "mathlify/stats";
import { logTerm, sqrtTerm } from "mathlify/fns";
import { EquationWorking, ExpressionWorking } from "mathlify/working";
import { Expression, sumVerbatim, powerTerm } from "mathlify";
const { data, data2, m, line, altLine } = parameters;

const hide = true;
const verbatim = true;

// a
soln.part("", "");
// a i
soln.addSubpart(
	x`The scatter diagram shows that, as $m$ increases,
$p$ increases at a decreasing rate on average. This indicate
a likely non-linear relationship between $m$ and $p$ ${QED}
`,
	x`The scatter diagram shows that, as $m$ increases,
$p$ increases at a decreasing rate on average. This indicate
a likely non-linear relationship between $m$ and $p$.`,
);

// a ii
const ms = data[0];
const lnModel = new Regression(
	ms.map((x) => Math.log(x)),
	data[1],
	{ x: logTerm("m") },
);
const sqrtModel = new Regression(
	ms.map((x) => Math.sqrt(x)),
	data[1],
	{ x: sqrtTerm("m") },
);
const lnModelString = "{p = a + b \\ln m}";
const sqrtModelString = "p = d + e \\sqrt{m}";
const [r, otherR, model, modelString, otherString] =
	lnModel.r > sqrtModel.r
		? [lnModel.r, sqrtModel.r, lnModel, lnModelString, sqrtModelString]
		: [sqrtModel.r, lnModel.r, sqrtModel, sqrtModelString, lnModelString];
export const rAns = r.toPrecision(3);
const [d, t2] = model._getSumTerms();
const e = t2._getProductTerms()[0].valueOf();
export const constants = { d, e };
soln.addSubpart(
	x`The ${modelString}
model gives a better fit to the data as it has an $r\\text{-value}$
of ${rAns} \\; ${QED}
which is closer to $1$ than the $r\\text{-value}$
of ${otherR.toPrecision(3)}
for the ${otherString}
model

$${{}} p = ${model} 

#${"align*"} d &= ${d.toPrecision(3)} \\text{ (3 s.f.)} \\; ${QED}
\\\\ e &= ${e.toPrecision(3)} \\text{ (3 s.f.)} \\; ${QED}`,
	x`${modelString}
\\
${noBreak("r=", rAns, ".")}`,
);

// a iii
const working1 = new EquationWorking("p", model.subIn({ m }, { verbatim }), {
	aligned: true,
}).toFloat();
export const pAns = Math.round(working1.eqn.rhs.valueOf() / 10) * 10;
soln.addSubpart(
	x`When ${noBreak("m=", m, ",")}

#${"align*"} ${working1} \\\\ &= ${pAns} \\text{ cents (nearest 10 cents)} \\; ${QED}

Since ${noBreak("m=", m)}
is within the given data range ${{}} ${ms[0]} \\leq m \\leq ${ms[ms.length - 1]},
and the ${noBreak("r\\text{-value}=", rAns)}
is close to $1$, our estimate is reliable ${QED}`,
	x`${pAns} \\text{ cents}.

Since ${noBreak("m=", m)}
is within the given data range ${{}} ${ms[0]} \\leq m \\leq ${ms[ms.length - 1]},
and the ${noBreak("r\\text{-value}=", rAns)}
is close to $1$, our estimate is reliable.`,
);

// b
soln.addPart("", "");
// b i
soln.addSubpart(x`![scatter-plot](/imgs/2024/solns/24p2q11bi.svg)`, "Sketch.");

// b ii
const [ns, ys] = data2;
const fAs = ns.map((n) => line.evaluate(n));
const residuals = ys.map((y, i) => new Expression(y).minus(fAs[i]));
const squaresArr = residuals.map((x) => powerTerm(x, 2, { verbatim }));
const working2 = new ExpressionWorking(sumVerbatim(...squaresArr), {
	leadingEqual: true,
}).expand();
export const sumOfSquares = working2.expression;
const table = `|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| $n$ ${ns.reduce((prev, x) => `${prev} | ${x} `, "")} |
| $y$ ${ys.reduce((prev, x) => `${prev} | ${x} `, "")} |
| $f(n)=${line}$ ${fAs.reduce((prev, x) => `${prev} | $${x}$ `, "")} |
| $\\text{Residuals }=y-f(n)$ ${residuals.reduce((prev, x) => `${prev} | $${x}$ `, "")} |`;
soln.addSubpart(
	x`(A) ![residuals](/imgs/2024/solns/24p2q11bii.svg)



(B) The residuals can be negative or positive depending
on whether the point is above or below the regression line.
Hence, using the sum of the squares of the residuals ensure the error
values used in assessing the fit of the model are positive ${QED}

(C)

@${table}

#${"align*"} & \\text{Sum of squares} \\\\ ${working2} \\; ${QED}
`,
	x`(B) The residuals can be negative or positive depending
on whether the point is above or below the regression line.
Hence, using the sum of the squares of the residuals ensure the error
values used in assessing the fit of the model are positive.

(C) Sum of squares = ${sumOfSquares}.`,
);
// b iii
soln.addSubpart(
	x`For a line that is a better fit for the data,
the sum of the squares of the residuals will be smaller ${QED}`,
	x`For a line that is a better fit for the data,
the sum of the squares of the residuals will be smaller.`,
);
// b iv
const fA2s = ns.map((n) => altLine.subIn({ n }));
const residuals2 = ys.map((y, i) => new Expression(y).minus(fA2s[i]).expand());
const squaresArr2 = residuals2.map((x) => powerTerm(x, 2, { verbatim }));
const table2 = `|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| $n$ ${ns.reduce((prev, x) => `${prev} | ${x} `, "")} |
| $y$ ${ys.reduce((prev, x) => `${prev} | ${x} `, "")} |
| $f(n)=${altLine}$ ${fA2s.reduce((prev, x) => `${prev} | $${x}$ `, "")} |
| $\\text{Residuals }=y-f(n)$ ${residuals2.reduce((prev, x) => `${prev} | $${x}$ `, "")} |`;
const working3 = new EquationWorking(
	sumVerbatim(...squaresArr2),
	sumOfSquares,
	{ sign: "<" },
)
	.expand({ hide })
	.rearrange([2, 1, 0])
	.makeRhsZero();
const { answers } = working3.solve.quadraticInequality("c");
export const ansBIV = answers[0];
soln.addSubpart(
	x`@${table2}

Considering the sum of squares,
#${"gather*"} ${working3} \\\\ ${answers[0]} \\; ${QED}	`,
	x`${answers[0]}.`,
);
