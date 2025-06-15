import { Expression, expTerm, Polynomial, quotient, sum } from "mathlify";
import { sqrtTerm } from "mathlify/fns";

export const parameters = {
	expA: expTerm(new Polynomial([5, -4], { ascending: true })),
	expB: quotient(new Polynomial([3, -2, 0]), Polynomial.ofDegree(4).times(4)),
	expC: new Expression([
		sum(quotient(1, [2, "x"]), [-1, sqrtTerm("x")]),
		"^",
		2,
	]),
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
