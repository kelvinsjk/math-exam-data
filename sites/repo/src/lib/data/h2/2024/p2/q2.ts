import { EquationWorking, ExpressionWorking } from "mathlify/working";
import { x } from "mathlifier";
import { StackedQn } from "sveltexam/helpers";
import { data } from "./data";

export const soln = new StackedQn();
const parameters = data.q2;

import { product, quotient, sum, sumVerbatim } from "mathlify";
import { half } from "$lib/utils/typesetting/math";
import { Brackets, trigTerm } from "mathlify/fns";
import { noBreak, QED } from "$lib/utils/typesetting";
const { perimeter } = parameters;

const verbatim = true;
const hide = true;
const working1 = new EquationWorking(sum([3, "a"], [2, "b"]), perimeter, {
	aligned: true,
});
working1.isolate("b")._makeSubjectFromProduct("b");
const b = working1.eqn.rhs;
const working2 = new EquationWorking(
	"A",
	sumVerbatim(
		["a", "b"],
		[half, ["a", "^", 2], trigTerm("sin", [60, "^\\circ"])],
	),
	{
		aligned: true,
	},
)
	.simplify({ hide })
	.massage(
		(exp) => {
			const [t1, t2] = exp._getSumTerms();
			const [num, den] = t2._getQuotientTerms();
			const [coeff, factors] = num._getProductTerms();
			const [a2, sqrt2] = factors;
			return sumVerbatim(t1, quotient([coeff, sqrt2, a2], den));
		},
		{ targetRight: true },
	)
	.subIn({ b: new Brackets(b) }, { verbatim })
	.expand({ hide })
	.expand();
const AExp = working2.eqn.rhs;
working2.differentiate("a", ["A"]);
const dAda = working2.eqn.rhs;
const dAdaString = working2.eqn.lhs;
const working3 = new EquationWorking(dAdaString, 0);
working3
	.subIn({ [dAdaString.toString()]: dAda })
	.isolate("a")
	.massage((exp) => {
		const [t1, t2] = exp._getSumTerms();
		return product("a", sum(t1.divide("a"), t2.divide("a")));
	})
	._makeSubjectFromProduct("a", { hide })
	.toFloat();
const a = working3.eqn.rhs;
const working4 = new ExpressionWorking("A", { startOnFirstLine: true })
	.subIn(
		{
			A: AExp,
		},
		{ hide },
	)
	.subIn({ a }, { verbatim })
	.toPrecision(4);
export const A = working4.expression;
const working5 = new EquationWorking(dAdaString, dAda, {
	hideFirstStep: true,
	aligned: true,
})
	.differentiate("a", ["A"])
	.toFloat();
const d2Val = working5.eqn.rhs.valueOf();
const [sign, max] = d2Val < 0 ? ["<", "maximum"] : [">", "minimum"];
export const maxOrMin = max;
soln.addBody(
	x`Since the total perimeter is ${perimeter} \\text{ m},
#${"align*"} ${working1}

#${"align*"} ${working2}

At maximum $A$,
#${"gather*"} ${working3}

#${"align*"} ${working4} \\text{ m}^2 \\text{(4 s.f.)} \\; ${QED}

#${"align*"} ${working5} \\\\ &${sign} 0

Hence ${noBreak("A=", A)}
is a @${max} ${QED}
`,
	x`${A} \\text{ m}^2.`,
);
