import { noBreak, QED } from "$lib/utils/typesetting";
import { x } from "mathlifier";
import { Expression, expTerm, quotient, sum } from "mathlify";
import { Differential, maclaurin } from "mathlify/calculus";
import { EquationWorking, ExpressionWorking } from "mathlify/working";
import { StackedQn } from "sveltexam/helpers";
import { data } from "./data";

export const soln = new StackedQn();
const parameters = data.q8;

const { y, binom } = parameters;

// a
const dydxString = new Differential();
const d2String = new Differential("y", "x", 2);
const working = new EquationWorking("y", y, { aligned: true });
working.differentiate();
const dydx = working.eqn.rhs;
working.differentiate();
working.massage(
	(exp) => {
		const [t1, t2] = exp._getSumTerms();
		const k1 = quotient(t1, dydx);
		const e4x = expTerm([4, "x"]);
		const k2 = quotient(t2, [y, e4x]);
		return sum([k1, dydxString], [k2, "y", e4x]);
	},
	{ targetRight: true },
);
working.factorize.commonFactor({ targetRight: true });
const d2Ans = working.eqn.rhs;
export const k = d2Ans._getProductTerms()[0];
soln.addPart(
	x`${noBreak("k=", k, ".")}`,
	x`#${"align*"} ${working} \\; ${QED}`,
);

// b
const furtherDiffWorking = working.continueFromLastLine().differentiate();
const d3 = furtherDiffWorking.eqn.rhs;
const workingY = new EquationWorking(
	"y",
	y.subIn({ x: 0 }, { verbatim: true }),
	{ aligned: true },
).simplify();
const y0 = workingY.eqn.rhs;
const dydxWorking = new EquationWorking(
	dydxString,
	dydx.subIn({ x: 0 }, { verbatim: true }),
	{ aligned: true },
).simplify();
const dydx0 = dydxWorking.eqn.rhs;
const d2Working = new EquationWorking(
	d2String,
	d2Ans.subIn(
		{ x: 0, y: y0, [dydxString.toString()]: dydx0 },
		{ verbatim: true },
	),
	{ aligned: true },
).simplify();
const d2ydx20 = d2Working.eqn.rhs;
const d3Working = new EquationWorking(
	new Differential("y", "x", 3),
	d3.subIn(
		{
			x: 0,
			y: y0,
			[dydxString.toString()]: dydx0,
			[d2String.toString()]: d2ydx20,
		},
		{ verbatim: true },
	),
	{ aligned: true },
).simplify();
const d3ydx30 = d3Working.eqn.rhs;
const macWorking = new ExpressionWorking(
	`\\text{Maclaurin expansion of } ${y}`,
);
macWorking
	.addCustomStep(maclaurin.f(3))
	.subIn(
		{
			"f(0)": y0,
			"f'(0)": dydx0,
			"f''(0)": d2ydx20,
			"f'''(0)": d3ydx30,
			"2!": 2,
			"3!": 6,
		},
		{ verbatim: true },
	)
	.simplify();
export const mac = macWorking.expression;
soln.addPart(
	x`${mac}`,
	x`#${"align*"} ${furtherDiffWorking}
  
When ${noBreak("x=0,")}
#${"align*"} ${workingY} \\\\ ${dydxWorking} \\\\ ${d2Working} \\\\ ${d3Working}

#${"align*"} ${macWorking}`,
);

// c
const binomWorking = new ExpressionWorking(binom)
	._expressAsPower()
	.factorize.fromExpTerm("a")
	.massage((exp) => {
		const [, factors] = exp._getProductTerms();
		const [coeff, factor] = factors;
		const [base, pow] = factor._getExponentTerms();
		const xTerm = base._getSumTerms()[1];
		return new Expression([
			coeff,
			maclaurin.binomial(1, pow).subIn({ x: xTerm }, { verbatim: true }),
		]);
	})
	.simplify()
	.expand({ hide: true })
	.massage((exp) => {
		const [t1, t2] = exp._getSumTerms();
		return sum(t1, t2, "\\dotsb");
	});
const [coeffB, termB] = mac._getSumTerms();
const [coeffA, termA] = binomWorking.expression._getSumTerms();
const aWorking = new EquationWorking(coeffA, coeffB, { aligned: true });
const pow = coeffA._getExponentTerms()[1];
aWorking.pow(pow.reciprocal());
export const a = aWorking.eqn.rhs;
const x2 = new Expression(["x", "^", 2]);
const x2CoeffA = termA.divide(x2);
const x2CoeffB = termB.divide(x2).simplify();
const x2Working = new EquationWorking(x2CoeffA, x2CoeffB, {
	aligned: true,
})
	.subIn({ a })
	.crossMultiply({ hide: true })
	._makeSubjectFromProduct("b");
export const b = x2Working.eqn.rhs;

soln.addPart(
	x`${noBreak("a=", a, ",")}
${noBreak("b=", b, ".")}`,
	x`#${"align*"} ${binomWorking}

Comparing constant terms,
#${"align*"} ${aWorking} \\; ${QED}

Comparing coefficient of $x^2$,
#${"align*"} ${x2Working} \\; ${QED}
`,
);
