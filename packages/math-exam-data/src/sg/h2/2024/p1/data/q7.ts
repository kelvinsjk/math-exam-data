import {
	quotient,
	greek,
	Polynomial,
	pi,
	productVerbatim,
	sumVerbatim,
} from "mathlify";
import { Brackets } from "mathlify/fns";
import { trigTerm } from "mathlify/trigo";

const variable = "r";
const theta = greek("theta");
const sin2RTheta = trigTerm("sin", new Brackets([2, "r", theta]));
const sinTheta = trigTerm("sin", theta);
const piROver6 = quotient([pi, "r"], 6);
export const parameters = {
	fR: trigTerm("cos", new Brackets(["r", theta])),
	xs: [
		new Polynomial([2, -1], { variable }),
		new Polynomial([2, 1], { variable }),
	],
	rhsA: productVerbatim(2, sinTheta, sin2RTheta),
	summandB: sin2RTheta,
	rhsB: quotient(
		sumVerbatim(trigTerm("cos", theta), [
			-1,
			new Brackets([new Polynomial([2, 1], { variable: "n" }), theta], {
				size: "Big",
			}),
		]),
		[2, sinTheta],
		{ verbatim: true },
	),
	summandC: productVerbatim(
		trigTerm("sin", new Brackets(piROver6)),
		trigTerm("cos", new Brackets(piROver6)),
	),
} as const;

/*
The original question is the copyright of 
- Singapore Examinations and Assessment Board
- Cambridge Assessment International Education
- Ministry of Education, Singapore
- Government of Singapore

We have extracted the relevant mathematical content from the question
and provided it here under fair use for educational and archival purposes.

Please purchase from authorized publishers and/or distributors
for the full question.
*/
