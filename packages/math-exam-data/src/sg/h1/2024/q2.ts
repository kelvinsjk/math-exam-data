import { expTerm, Polynomial, product, quotient } from "mathlify";
import { logTerm, sqrtTerm } from "mathlify/fns";

export const parameters = {
	exp1: product(4, logTerm([new Polynomial([2, 7]), "^", 2])),
	exp2: sqrtTerm(expTerm(new Polynomial([1, 4]))),
	integrand: quotient(3, sqrtTerm(new Polynomial([5, 1]))),
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
