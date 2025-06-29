import { quotient, Polynomial, expTerm, sum, product } from "mathlify";
import { Differential } from "mathlify/calculus";
import { absTerm, sqrtTerm } from "mathlify/fns";
import { trigTerm } from "mathlify/trigo";

const e2x = expTerm([2, "x"]);

export const parameters = {
	integrand: quotient(
		new Polynomial([2,-1]),
		new Polynomial([1,2,1]),
	),
	integrand2: quotient(
		absTerm(new Polynomial([2,-1])),
		new Polynomial([1,2,1]),
	),
	limits: [0, 2],
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
