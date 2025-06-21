import { expTerm, product, quotient, sum } from "mathlify";
import { logTerm } from "mathlify/fns";

const half = quotient(1,2);
const e3t = expTerm([3,'t']);
const eMinus3t = expTerm([-3,'t']);
export const parameters = {
	x: product(half, sum(e3t, [2, eMinus3t])),
	y: product(half, sum(e3t, [-2, eMinus3t])),
	t0: product(quotient(1,3), logTerm(2))
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
