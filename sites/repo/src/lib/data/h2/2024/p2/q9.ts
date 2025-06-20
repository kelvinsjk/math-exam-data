import { x as m } from "mathlifier";
import { StackedQn } from "sveltexam/helpers";
import { data } from "./data";

export const soln = new StackedQn();
const parameters = data.q9;
import { noBreak, QED } from "$lib/utils/typesetting";
import { EquationWorking } from "mathlify/working";
import { Expression, productVerbatim, quotient } from "mathlify";
import { E } from "$lib/utils/typesetting/math";
import { binomialAssumptions } from "$lib/utils/typesetting/explanations";
import { Binomial } from "mathlify/stats";
const { tableData, nB, nC, pC, xC, nCIII, xCIII } = parameters;

const verbatim = true;
const hide = true;

// a
soln.addPart(
	m`![binomial-distribution](/imgs/2024/solns/24p2q09.svg)`,
	m`Sketch.`,
);

// b
const sumWString = "\\sum fw";
const sumFString = "\\sum f";
const working1 = new EquationWorking(
	["n", "p"],
	quotient(sumWString, sumFString),
);
const [numbers, fs] = tableData;
const total = fs.reduce<number>((prev, x) => prev + x, 0);
const numArray: number[] = numbers.map((x) => (typeof x === "number" ? x : 0));
const sumW = numArray
	.slice(1, numArray.length - 1)
	.reduce(
		(prev, x, i) =>
			prev.plus(productVerbatim(1, x, fs[i + 1]), { verbatim: true }),
		new Expression(0),
	);
working1
	.subIn({ n: nB, [sumWString]: sumW, [sumFString]: total }, { verbatim })
	.simplify()
	._makeSubjectFromProduct("p", { hide })
	.toPrecision(3);
export const pB = working1.eqn.rhs;
soln.addPart(
	m`Let $W$ be the random variable of the number of pies that are
unsatisfactory out of ${nB}
and let $p$ be the probability that a randomly chosen
pie is unsatisfactory

$${{}} W \\sim \\mathrm{B} (${nB}, p )

By considering ${E("W")},

#${"gather*"} ${working1.toString().replaceAll("=", "\\approx ")} \\; ${QED}
`,
	m`${{}} ${pB}.`,
);

// c
soln.addPart("", "");
// c i
const assumptions = binomialAssumptions(
	"burger",
	"found to have insufficient cheese in them",
);

soln.addSubpart(
	m`@${assumptions[0]} ${QED}
\\
@${assumptions[1]} ${QED}`,
	m`@${assumptions[0]}.
\\
@${assumptions[1]}.`,
);

// c ii
const Y = new Binomial(nC, pC, { symbol: "Y" });
const { working, p: pII } = Y.cdfWorking(xC, { sign: "<" });
export const pCII = pII.toPrecision(3);
soln.addSubpart(
	m`$${Y}

#${"align*"} ${working} \\\\ &= ${pCII} \\text{ (3 s.f.)} \\; ${QED}	`,
	m`${pCII}.`,
);

// c iii
const D = new Binomial(nCIII, pII, { symbol: "D" });
const { working: working2, eX } = D.expectationWorking();
export const eXAns = eX.toPrecision(3);
soln.addSubpart(
	m`Let $D$ denote the random variable of the number of days in which
fewer than 3 burgers have insufficient cheese in them out of ${nCIII}

$${D}

#${"align*"} ${working2} \\\\ &= ${eXAns} \\text{ days (3 s.f.)} \\; ${QED}	`,
	m`${eXAns} \\text{ days}.`,
);

// c iv
const nIV = nC * nCIII;
const T = new Binomial(nIV, pC, { symbol: "T" });
const { working: working3, p: pIV } = T.cdfWorking(xCIII, { sign: ">" });
export const pCIV = pIV.toPrecision(3);
soln.addSubpart(
	m`Let $T$ denote the random variable of the number of burgers
found to have insufficient cheese in them out of ${noBreak(nC, "\\times ", nCIII, "=", nIV)}
burgers in ${nCIII}
days

$${T}

#${"align*"} ${working3} \\\\ &= ${pCIV} \\text{ (3 s.f.)} \\; ${QED}	`,
	m`${pCIV}.`,
);
