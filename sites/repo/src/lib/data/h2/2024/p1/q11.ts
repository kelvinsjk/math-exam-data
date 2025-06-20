import { noBreak, QED } from "$lib/utils/typesetting";
import { x as m } from "mathlifier";
import { Expression, greek, product, sum } from "mathlify";
import { Differential } from "mathlify/calculus";
import { bisection } from "mathlify/numerical";
import { EquationWorking } from "mathlify/working";
import { StackedQn } from "sveltexam/helpers";
import { data } from "./data";

export const soln = new StackedQn();
const parameters = data.q11;

const { lhs, rhs, initialConditions, h } = parameters;

const hide = true;
const verbatim = true;
const v = "v";
const dxdt = new Differential("x", "t");
const working1 = new EquationWorking(v, dxdt, { aligned: true }).differentiate(
	"t",
	["v", "x"],
);
const dvdt = working1.eqn.lhs;
const d2x = working1.eqn.rhs;
const working2 = new EquationWorking(lhs, rhs, {
	aligned: true,
	hideFirstStep: true,
});
working2.subIn({ [d2x.toString()]: dvdt, [dxdt.toString()]: v });
export const de = working2.eqn.toString().replace("&", "");

// a
soln.part("", "");
soln.addSubpart(
	m`${de}.`,
	m`#${"align"} ${working1}

Substituting $(1)$ and $(2)$ into the given differential equation,
#${"align*"}	${working2} \\; ${QED}

`,
);

// a ii
const alpha = greek("alpha");
const working3 = new EquationWorking(
	working2.eqn.subIn({
		v: initialConditions[0],
		[dvdt.toString()]: initialConditions[1],
	}),
	0,
	{ aligned: true },
)
	.isolate(alpha, { hide: true })
	.massage(
		(exp) => {
			return new Expression(Number(Math.round(exp.valueOf() * 10)) / 10);
		},
		{ targetRight: true },
	)
	._makeSubjectFromProduct(alpha);
export const alphaVal = working3.eqn.rhs.valueOf();
soln.addSubpart(
	m`${noBreak(alpha, "=", alphaVal, ".")}`,
	m`Since ${noBreak(dvdt, "=", initialConditions[1])}
when  ${noBreak("v=", initialConditions[0], ",")}
#${"align*"} ${working3} \\; ${QED}`,
);

// b
const working4 = new EquationWorking(
	working2.eqn.subIn({ [alpha.toString()]: alphaVal }).lhs,
	working2.eqn.rhs,
	{
		aligned: true,
	},
).moveTerms(1);
working4
	.divideIntoCoeff(working4.eqn.rhs)
	.setUpSeparableDE()
	.integrate({ rhsOptions: { c: true } })
	.crossMultiply({ hide })
	.negative({ expand: true, hide })
	.subIn({ "- 2C": "C'" })
	.removeLogarithm()
	.deCtoA();
export const BAns = working4.eqn.rhs
	._getProductTerms()[1][1]
	._getExponentTerms()[1]
	.divide("t")
	.simplify();
const working5 = new EquationWorking(
	working4.eqn.rhs.subIn({ t: 0 }),
	working4.eqn.lhs.subIn({ v: 0 }),
	{ aligned: true },
);
const A = working5.eqn.rhs;
const working6 = new EquationWorking(
	working4.eqn.lhs,
	working4.eqn.rhs.subIn({ A }),
	{ aligned: true },
);
working6
	.moveTerms(1, { hide })
	.swapSides({ hide })
	.moveTerms(0)
	.divideIntoSum(working6.eqn.lhs._getProductTerms()[0], { hide })
	.massage(
		(exp) => {
			const [t1, t2] = exp._getSumTerms();
			const [neg, f] = t2._getProductTerms();
			const [num, den] = f[0]._getQuotientTerms();
			const [coeff, e] = num._getProductTerms();
			if (t1.toString() !== coeff.divide(den.valueOf()).toString())
				throw new Error("error in custom factorization");
			return product(t1, sum(1, [neg, e]));
		},
		{ targetRight: true },
	);
export const AAns = working6.eqn.rhs._getProductTerms()[0];
soln.addPart(
	m`${noBreak("A=", AAns, ",")}
${noBreak("B=", BAns, ".")}`,
	m`#${"align*"} ${working4}

When ${noBreak("t=", 0, ",")}
${noBreak("v=", 0)}
#${"align*"} ${working5}

#${"align*"} ${working6} \\; ${QED}`,
);

// c
const working7 = new EquationWorking(dxdt, working6.eqn.rhs, {
	aligned: true,
})
	.setUpSeparableDE()
	.integrate({ rhsOptions: { c: true } });
const working8 = new EquationWorking(
	working7.eqn.lhs.subIn({ x: 0 }),
	working7.eqn.rhs.subIn({ t: 0 }, { verbatim }),
)
	.simplify({ hide })
	.swapSides({ hide })
	.isolate("C");
const C = working8.eqn.rhs;
const eqn = working7.eqn.subIn({ C, x: h });
export const t = bisection(
	(t: number) => eqn.rhs.fn(t, "t") - eqn.lhs.valueOf(),
	0,
	2000,
	1,
).toPrecision(3);

soln.addPart(
	m`${t} \\text{ s}.`,
	m`Since ${noBreak("v=", dxdt, ",")}

#${"align*"} ${working7}

When ${noBreak("t=0,")}
${noBreak("x=", 0)}

#${"gather*"} ${working8}

$${working7.eqn.subIn({ C }).toString().replace("&", "")}

When ${noBreak("x=", h, ",")}
$${eqn.toString().replace("&", "")}

Solving with a GC,
$${{}} t = ${t} \\text{ s} \\; ${QED}
`,
);
