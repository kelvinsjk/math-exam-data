import { Polynomial, quotient } from "mathlify";

export const parameters = {
	lhs: quotient(4, new Polynomial([1, 2])),
	rhs: quotient(new Polynomial([1, -3]), new Polynomial("x")),
	sign: "\\geq",
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
