import { Polynomial, quotient, sum } from "mathlify";

export const parameters = {
	cost: new Polynomial([
		quotient(3,4),
		350,
		300
	]),
	sellingPrice: 590,
	P: sum(150, [quotient(-3,4), 'x'], [-1, quotient(300,'x')]),
	profitBound: ['at least', 100],
	machines: 220
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
