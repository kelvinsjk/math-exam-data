import { Polynomial, quotient } from "mathlify";
import { sqrtTerm } from "mathlify/fns";

const u = sqrtTerm(new Polynomial([4, 1]));
export const parameters = {
	u,
	y: quotient(u, new Polynomial([1, -2])),
	integrand: quotient(
		[2, Polynomial.ofDegree(2, { variable: "u" })],
		new Polynomial([1, 0, -9], { variable: "u" }),
	),
	xs: [6, 12],
	lineY: 0.5,
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
