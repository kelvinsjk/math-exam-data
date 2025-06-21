import { greek, Polynomial, product } from "mathlify";

const lambda = greek('lambda');
export const parameters = {
	P0: 50,
	condition: [10, 100],
	dPdt: product(lambda, 'P', new Polynomial([500,-1],{ascending: true, variable: 'P'}))
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
