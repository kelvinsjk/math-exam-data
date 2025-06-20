import { x } from "mathlifier";
import { StackedQn } from "sveltexam/helpers";
import { data } from "./data";

export const soln = new StackedQn();
const parameters = data.q10;
import { noBreak, QED } from "$lib/utils/typesetting";
import { Binomial, distSumString, Normal } from "mathlify/stats";
import { Expression } from "mathlify";
import { P } from "$lib/utils/typesetting/math";
const {
	plates,
	xA,
	reduction,
	nB,
	xB,
	bounds,
	nC,
	xC,
	screws,
	bolts,
	percentage,
} = parameters;

// a
const X = new Normal(plates[0], plates[1]);
const { working, p: pA1 } = X.cdfWorking(xA);
export const pA = pA1.toPrecision(3);
soln.addPart(
	x`Let $X$ be the random variable of the masses, in grams, of a randomly chosen plate

$${X}

#${"align*"} ${working} \\\\ &= ${pA} \\text{ (3 s.f.)} \\; ${QED}
`,
	x`${pA}.`,
);

// b
const multiple = (100 - reduction) / 100;
const { nX: Y, distribution } = X.times(multiple, { newSymbol: "Y" });
const { working: working2, p: pBetween } = Y.cdfWorking(bounds[0], bounds[1]);
const N = new Binomial(nB, pBetween, { symbol: "N" });
const { working: working3, p: pB1 } = N.cdfWorking(xB, { sign: "\\geq" });
export const pB = pB1.toPrecision(3);
soln.addPart(
	x`Let ${noBreak("Y=", multiple, "X")}

#${"align*"} ${distribution}

#${"align*"} ${working2}

Let $N$ be the random variable of the number of plates with masses between ${bounds[0]} \\text{ grams}
and ${bounds[1]} \\text{ grams}
out of 8

$${N}

#${"align*"} ${working3} \\\\ &= ${pB} \\text{ (3 s.f.)} \\; ${QED}
`,
	x`${pB}.`,
);

// c
const sumPlates = distSumString(nC, "Y");
const { sum: T, distribution: distT } = Y.sum(nC, { newSymbol: "T_p" });
const { working: working4, p: pC1 } = T.cdfWorking(
	Number.NEGATIVE_INFINITY,
	xC,
);
export const pC = pC1.toPrecision(3);
soln.addPart(
	x`Let ${noBreak("T_p=", sumPlates)}

#${"align*"} ${distT}

#${"align*"} ${working4} \\\\ &= ${pC} \\text{ (3 s.f.)} \\; ${QED}
`,
	x`${pC}.`,
);

// d
const S = new Normal(screws[0], screws[1], { symbol: "S" });
const B = new Normal(bolts[0], bolts[1], { symbol: "B" });
const sumScrews = distSumString(nC * 4, "S");
const sumBolts = distSumString(nC * 2, "B");
const { sum: TS, distribution: distTS } = S.sum(nC * 4, { newSymbol: "T_s" });
const { sum: TB, distribution: distTB } = B.sum(nC * 2, { newSymbol: "T_b" });
TS.variance = new Expression(Number(TS.variance.toFixed(1)));
TB.variance = new Expression(Number(TB.variance.toFixed(1)));
const { sum, distribution: distTotal } = T.plus([TS, TB]);
const prob = percentage / 100;
export const m = sum.invNorm(prob, "r").toFixed(0);
soln.addPart(
	x`Let $S$ and $B$ be the random variable of the mass of a randomly
chosen screw and bolt, in grams, respectively

#${"gather*"} ${S} \\\\ ${B}

Each pack consists of ${nC}
plates, ${nC * 4}
screws, and ${nC * 2}
bolts

Let ${noBreak("T_s=", sumScrews)}
and \\
${noBreak("T_b=", sumBolts)}

#${"align*"} ${distTS.replace("7.2000", "7.2")}

#${"align*"} ${distTB.replace("48.400", "48.4")}

#${"align*"} ${distTotal}

Let $m$ denote the mass exceeded by ${percentage}\\%
of the Value packs

#${"align*"} 
${P(`${sum.symbol} > m`)} &= ${prob} \\\\ 
m &= ${m} \\text{ g (nearest gram)} \\; ${QED}
`,
	x`${m} \\text{ g}.`,
);
