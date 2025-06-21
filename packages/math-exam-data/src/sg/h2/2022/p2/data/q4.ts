import { Polynomial, product, quotient } from "mathlify";

const frac = quotient(1, new Polynomial([9,3,-2],{variable:'b'}));
export const parameters = {
	frac,
	limitsB: ['m', product(3,'m')],
	limitsC: [1, '\\infty'],
	limitsD: [1, 'n'],
	ineqD: ['less than', 0.004]
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
