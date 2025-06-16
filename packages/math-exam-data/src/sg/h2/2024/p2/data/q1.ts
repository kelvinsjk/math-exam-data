import { quotient, sum } from "mathlify";
import { Complex } from "mathlify/complex";

export const parameters = {
	z: new Complex(-2,1),
	rhs: sum(['a','z^*'], 'b'),
	w: new Complex(1,-3),
	exp: sum(['w','z'],[-1, quotient('w','z')])
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
