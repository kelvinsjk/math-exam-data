import { pi, product, productVerbatim, quotient } from "mathlify";
import { Differential, logTerm } from "mathlify/calculus";
import { Brackets, trigTerm } from "mathlify/fns";

export const parameters = {
	y: logTerm(trigTerm("sec", "x")),
	show: [
		new Differential("y", "x", 3),
		productVerbatim(
			2,
			new Brackets(new Differential("y", "x", 2)),
			new Brackets(new Differential("y", "x")),
		),
	],
	higherPower: 4,
	x: product(quotient(1, 4), pi),
	approxTerm: logTerm(2),
	limits: [0, product(quotient(1, 10), pi)],
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
