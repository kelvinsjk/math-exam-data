import { x } from "mathlifier";
import { StackedQn } from "sveltexam/helpers";
import { data } from "./data";

export const soln = new StackedQn();
const parameters = data.q7;
import { noBreak, QED } from "$lib/utils/typesetting";
import { EquationWorking, ExpressionWorking } from "mathlify/working";
import { sumVerbatim, productVerbatim, quotient, sum, product } from "mathlify";
import { P } from "$lib/utils/typesetting/math";
import { combineFraction } from "mathlify/algebra";
import { Brackets } from "mathlify/fns";
const { multiple, qCapRPrime, qCupRPrime } = parameters;

const verbatim = true;
const hide = true;

// a
soln.addPart("", "");
// a i
const working1 = new ExpressionWorking(
	sumVerbatim(
		quotient(1, "n"),
		productVerbatim(quotient(sum("n", -1), "n"), quotient(1, sum("n", -1))),
	),
	{ leadingEqual: true },
).simplify();
export const pA = working1.expression;
soln.addSubpart(
	x`#${"align*"} & ${P("A \\text{ finds the prize}")} \\\\ ${working1} \\; ${QED}`,
	x`${pA}.`,
);

// a ii
const working2 = new ExpressionWorking(
	sumVerbatim(
		productVerbatim(sumVerbatim(1, pA.negative()), quotient(1, sum("n", -2))),
		productVerbatim(
			sumVerbatim(1, pA.negative()),
			quotient(sum("n", -3), sum("n", -2)),
			quotient(1, sum("n", -3)),
		),
	),
	{ leadingEqual: true },
)
	.massage((exp) => {
		const [t1, t2] = exp._getSumTerms();
		const [coeff1, factors1] = t1._getProductTerms();
		const [coeff2, factors2] = t2._getProductTerms();
		return sumVerbatim(
			productVerbatim(coeff1, combineFraction(factors1[0]), factors1[1]),
			productVerbatim(
				coeff2,
				combineFraction(factors2[0]),
				product(...factors2.slice(1)),
			),
		);
	})
	.simplify();
export const pB = working2.expression;
soln.subpart(
	x`#${"align*"} & ${P("B \\text{ finds the prize}")} \\\\ ${working2} \\; ${QED}`,
	x`${pB}.`,
);

// a iii
const cString = P("C \\text{ finds the prize}");
const rightString = P("A \\text{ or } B \\text{ finds the prize}");
const working3 = new EquationWorking(cString, product(multiple, rightString), {
	sign: ">",
	aligned: true,
})
	.subIn(
		{
			[cString]: sumVerbatim(1, pA.negative(), pB.negative()),
			[rightString]: sumVerbatim(pA, pB),
		},
		{ verbatim },
	)
	.simplify()
	.moveTerms(1, { hide })
	.swapSides()
	.combineFraction()
	.crossMultiply({ hide })
	.swapSides();
const openBound = working3.eqn.rhs;
export const nBound = openBound.valueOf() + 1;
soln.subpart(
	x`#${"align*"} ${working3}

Since $n$ is an integer, the range of values of $n$ is:
$${{}} n \\in \\mathbb{Z}, \\; n \\geq ${nBound} \\; ${QED}
  `,
	x`${{}} n \\in \\mathbb{Z}, n \\geq ${nBound}.`,
);

// c iii
const [pQString, pRString] = [P("Q"), P("R")];
const working4 = new EquationWorking(P("Q \\cap R'"), pQString, {
	aligned: true,
}).subIn({ [pQString]: sum("x", qCapRPrime) });
const pQ = working4.eqn.rhs;
const pQCapRPrime = working4.eqn.rhs;
const pOut = sumVerbatim(1, -qCapRPrime, [-1, "x"], pQCapRPrime.negative());
const cupString = P("(Q \\cup R)'");
const working5 = new EquationWorking(
	cupString,
	qCupRPrime.subIn({ q: pQString, r: pRString }),
	{ aligned: true },
)
	.subIn(
		{
			[cupString]: pOut,
			[pQString]: new Brackets(pQ),
			[pRString]: sumVerbatim("x", pQ),
		},
		{ verbatim },
	)
	.expand({ hide })
	.massage(
		// float handling
		(exp) => {
			const [t1, t2] = exp._getSumTerms();
			return sum(t1, Math.round(t2.valueOf() * 10) / 10);
		},
		{ targetRight: true },
	)
	.isolate("x")
	.massage(
		(exp) => {
			return quotient(exp.valueOf() * 10, 10);
		},
		{ targetRight: true, hide },
	)
	._makeSubjectFromProduct("x");
export const xAns = working5.eqn.rhs;
soln.subpart(
	x`#${"align*"} ${working4}

![venn-diagram](/imgs/2024/solns/24p2q07.svg)

#${"align*"} ${working5} \\; ${QED}
  `,
	x`${noBreak("x=", xAns, ".")} `,
);
