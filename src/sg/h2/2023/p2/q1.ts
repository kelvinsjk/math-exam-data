import { Expression, Polynomial, product, quotient, sum } from "mathlify";
import { logTerm } from "mathlify/calculus";
import { absTerm } from "mathlify/fns";

const rational = quotient(new Polynomial([1, 25]), new Polynomial([1, -4, -5]));
const t2 = 3;
export const parameters = {
	ineqA: [
		product(3, absTerm(new Polynomial([1, -2]))),
		"<",
		absTerm(new Polynomial([5, -2], { ascending: true })),
	],
	exp: sum(rational, t2),
	ineqB: [rational, ">", -t2],
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
