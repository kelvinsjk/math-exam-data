import { noBreak, QED } from "$lib/utils/typesetting";
import { x as m } from "mathlifier";
import {
	Expression,
	expressionToPolynomial,
	pi,
	product,
	productVerbatim,
	quotient,
	sum,
	sumVerbatim,
} from "mathlify";
import { Integral, integrate } from "mathlify/calculus";
import { Brackets, logTerm, simplifySurd } from "mathlify/fns";
import { EquationWorking, ExpressionWorking } from "mathlify/working";
import { StackedQn } from "sveltexam/helpers";
import { data } from "./data";

export const soln = new StackedQn();
const parameters = data.q10;

const { y, u, integrand, xs, lineY } = parameters;

import { Logarithm } from "mathlify/fns";

const hide = true;
const working1 = new EquationWorking("u", u, { aligned: true });
const working2 = new EquationWorking("u", u, { aligned: true });
working1.differentiate("x", ["u"]).subIn({ [u.toString()]: "u" });
EquationWorking.RegisterCustomSimplifier(simplifySurd);
working2.square().swapSides({ hide }).isolate("x")._makeSubjectFromProduct("x");
EquationWorking.DeregisterCustomSimplifier();
const x = working2.eqn.rhs;
const working3 = new ExpressionWorking(new Integral(y))
	.uSubstitute(
		u,
		"u",
		{
			[u.toString()]: "u",
			x,
		},
		{ verbatim: true },
	)
	.simplify({ hide })
	.expand()
	.massage((exp) => {
		const clone = exp.clone();
		if (clone.node.type !== "fn") throw new Error("Expected an integral");
		const [num, den] = clone.node.argument._getQuotientTerms();
		clone.node.argument = quotient([2, num], product(2, den).expand());
		return clone;
	});
export const aShow = working3.expression;
// a
soln.addPart(
	m`${{}} \\displaystyle ${aShow}.`,
	m`#${"align*"} ${working1}

#${"align*"}	${working2}

#${"align*"}	${working3} \\; ${QED}
`,
);

// b
soln.addPart("", "");
soln.addSubpart(
	m`Sketch.`,
	m`
![graph](/imgs/2024/solns/24p1q10.svg)
`,
);
// b ii
const us = xs.map((x) => u.subIn({ x }));
const working4 = new ExpressionWorking(new Integral(y, "x", [xs[0], xs[1]]), {
	leadingEqual: true,
})
	.uSubstitute(
		u,
		"u",
		{
			[u.toString()]: "u",
			x,
		},
		{ hide },
	)
	.massage((exp) => {
		const clone = exp.clone();
		if (clone.node.type !== "fn") throw new Error("Expected an integral");
		clone.node.argument = integrand;
		return clone;
	})
	.massage((exp) => {
		const clone = exp.clone();
		if (clone.node.type !== "fn") throw new Error("Expected an integral");
		const [num, den] = clone.node.argument._getQuotientTerms();
		clone.node.argument = expressionToPolynomial(num, "u").longDivide(
			expressionToPolynomial(den, "u"),
		).result;
		return clone;
	})
	.integrate({ method: ["standard", "formulaLn"] })
	.evaluate({ verbatim: true })
	.expand()
	.massage((exp) => {
		const [t1, t2, t3] = exp._getSumTerms();
		const [c1, lnTerm1] = t2._getProductTerms();
		const [c2, lnTerm2] = t3._getProductTerms();
		if (c1.toString() !== c2.negative().toString())
			throw new Error("Expected equal constants");
		if (
			!(lnTerm1[0].node instanceof Logarithm) ||
			!(lnTerm2[0].node instanceof Logarithm)
		) {
			throw new Error("Expected ln terms");
		}
		const arg1 = lnTerm1[0].node.argument;
		const arg2 = lnTerm2[0].node.argument;
		return sum(t1, [c1, logTerm(arg1.divide(arg2))]);
	});
const integral = working4.expression;
const areaRectangle = productVerbatim(sumVerbatim(xs[1], -xs[0]), lineY);
const areaUnderCurveString = "\\text{Area under curve}";
const areaRectangleString = "\\text{area of rectangle}";
const working5 = new ExpressionWorking(
	sum(areaUnderCurveString, [-1, areaRectangleString]),
	{ leadingEqual: true },
)
	.subIn(
		{
			[areaRectangleString]: areaRectangle,
			[areaUnderCurveString]: integral,
		},
		{ verbatim: true },
	)
	.simplify();
const [a, t2] = working5.expression._getSumTerms();
const [b, lnTerm] = t2._getProductTerms();
if (!(lnTerm[0].node instanceof Logarithm)) throw new Error("Expected ln term");
const c = lnTerm[0].node.argument;
export const partBIIAns = { a, b, c };
soln.addSubpart(
	m`${working5.expression}.`,
	m`When ${noBreak("x=", xs[0], ",")}
${noBreak("u=", us[0])}
\\
When ${noBreak("x=", xs[1], ",")}
${noBreak("u=", us[1])}

#${"align*"} &\\text{Area under curve} \\\\ ${working4}

#${"align*"} &\\text{Area of } R \\\\ ${working5} \\; ${QED}`,
);

// b iii
const volCylinder = productVerbatim(
	pi,
	[lineY, "^", 2],
	sumVerbatim(xs[1], -xs[0]),
);
const volCylinderString = "\\text{volume of cylinder}";
const exp = new Expression([new Brackets(y), "^", 2]);
const int = productVerbatim(pi, new Integral(exp, "x", [xs[0], xs[1]]));
export const vol = (
	integrate.numerical(exp, xs[0], xs[1]).valueOf() * Math.PI -
	volCylinder.simplify().valueOf()
).toFixed(2);
const working6 = new ExpressionWorking(
	sumVerbatim(int, [-1, volCylinderString]),
)
	.subIn({ [volCylinderString]: volCylinder }, { verbatim: true })
	.addCustomStep(`${vol} \\text{ units}^2 \\text{ (2 d.p.)}`);
soln.addSubpart(
	m`${vol} \\text{ units}^2`,
	m`#${"align*"} &\\text{Volume required} \\\\ ${working6} \\; ${QED}`,
);
