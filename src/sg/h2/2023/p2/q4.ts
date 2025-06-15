import { Polynomial, product, quotient } from "mathlify";

export const parameters = {
	x: new Polynomial([2, 0, 3], { variable: "t" }),
	y: new Polynomial([5, -1], { variable: "t" }),
	tMin: quotient(1, 5),
	lineX: 21,
	x2: product(5, "u"),
	y2: quotient(4, "u"),
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
