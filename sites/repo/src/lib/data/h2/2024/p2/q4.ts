import { x } from "mathlifier";
import { StackedQn } from "sveltexam/helpers";
import { data } from "./data";

export const soln = new StackedQn();
const parameters = data.q4;
import { EquationWorking } from "mathlify/working";
import { Polynomial, sum, sumVerbatim } from "mathlify";
import { noBreak, QED } from "$lib/utils/typesetting";
const { T, u, v, w, cBound } = parameters;

const verbatim = true;
const hide = true;
const [Sn, SnMinus1] = ["S_n", "S_{n-1}"];

// a
const working1 = new EquationWorking("t_n", sum(Sn, [-1, SnMinus1]), {
	aligned: true,
});
const nMinus1 = new Polynomial([1, -1], { variable: "n" });
working1
	.subIn(
		{ [Sn]: T, [SnMinus1]: T.subIn({ n: nMinus1 }, { verbatim }) },
		{ verbatim },
	)
	.massage(
		(exp) => {
			const [t1, t2, t3, t4] = exp.simplify()._getSumTerms();
			const [neg, s] = t4._getProductTerms();
			const [t4a, t4b, t4c] = s[0]._getSumTerms();
			return sumVerbatim(
				t1,
				t2,
				t3,
				t4a.times(neg),
				t4b.times(neg),
				t4c.times(neg, { expand: true }),
			);
		},
		{ targetRight: true },
	)
	.simplify()
	.massage(
		(exp) => {
			const [t1, t2, t3, t4, t5] = exp.simplify()._getSumTerms();
			const [coeff3, s3] = t3._getProductTerms();
			const [coeff4, s4] = t4._getProductTerms();
			return sumVerbatim(
				t1,
				t2,
				[coeff3, s3[0].expand()],
				[coeff4, s4[0].expand()],
				t5,
			);
		},
		{ targetRight: true },
	)
	.expand({ verbatim })
	.simplify();
export const tN = working1.eqn.rhs;
soln.addPart(x`#${"align*"} ${working1}`, x`${noBreak("t_n=", tN, ".")}`);

// b
const working2 = new EquationWorking("u_n", "t_n");
working2.subIn({ u_n: u, t_n: tN }).swapSides({ hide }).makeRhsZero().divide(6);
const { roots } = working2.solve.quadratic("n");
export const ansB = roots;
soln.addPart(
	x`#${"gather*"} ${working2} \\\\ n=${roots[0]} \\; ${QED} \\; \\text{ or } n=${roots[1]} \\; ${QED}`,
	x`${noBreak("n=", roots[0])}
or ${noBreak("n=", roots[1], ".")}`,
);

// c
const working3 = new EquationWorking("u_n", "v_m", { aligned: true });
working3
	.subIn({ u_n: u, v_m: v.subIn({ n: "m" }) })
	.swapSides({ hide })
	.isolate("m")
	._makeSubjectFromProduct("m");

let n = 1;
let m = working3.eqn.rhs.subIn({ n }).valueOf();
let uN = u.subIn({ n }).valueOf();
while (!Number.isInteger(m) || m < 0 || uN <= cBound) {
	n++;
	m = working3.eqn.rhs.subIn({ n }).valueOf();
	uN = u.subIn({ n }).valueOf();
}
const vM = v.subIn({ n: m });
export const ansC = [uN, vM];
soln.addPart(
	x`#${"align*"} ${working3}

We want both $m$ and $n$ to be positive integers, and ${{}} u_n > ${cBound}

Using the table in the GC, 

| $n$ | $ m = @${working3.eqn.rhs} $ | $ u_n = @${u} $ |
|:---:|:---:|:---:|
| @${n - 3} | $ @${working3.eqn.rhs.subIn({ n: n - 3 })} $ ✅ | $ @${u.subIn({ n: n - 3 })} $ ❌ | 
| @${n - 2} | $ @${working3.eqn.rhs.subIn({ n: n - 2 })} $ ❌ | $ @${u.subIn({ n: n - 2 })} $ ❌ | 
| @${n - 1} | $ @${working3.eqn.rhs.subIn({ n: n - 1 })} $ ❌ | $ @${u.subIn({ n: n - 1 })} $ ✅ | 
| @${n} | @${m} ✅ | @${uN} ✅ |

The smallest number greater than ${cBound}
that is in both series $U$ and $V$ is
$${{}} u_{${n}} = v_{${m}} = ${uN} \\; ${QED}
`,
	x`${uN}.`,
);

// d
soln.addPart("", "");
// d i
const [t1, t2] = w._getSumTerms();
soln.addSubpart(
	x`If $n$ is even, then ${t1}
and ${t2}
are even so ${noBreak("w_n=", w)}
is odd

If $n$ is odd, then ${t1}
and ${t2}
are odd so ${noBreak("w_n=", w)}
is odd

Hence all the terms in series $W$ are odd ${QED}`,
	x`If $n$ is even, then ${t1}
and ${t2}
are even so ${noBreak("w_n=", w)}
is odd.
\\
If $n$ is odd, then ${t1}
and ${t2}
are odd so ${noBreak("w_n=", w)}
is odd.
\\
Hence all the terms in series $W$ are odd.`,
);
// d ii
soln.addSubpart(
	x`We observe that all the terms in 

#${"align*"} u_n &= ${u} \\\\ &= ${u.factorize.commonFactor()}

are even. Hence series $U$ and $W$ do not have any terms in common ${QED}`,
	x`All the terms in ${noBreak("u_n=", u.factorize.commonFactor())}
are even. Hence series $U$ and $W$ do not have any terms in common.`,
);
