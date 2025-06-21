import { pi, product, quotient } from "mathlify";
import { Complex } from "mathlify/complex";
import { sqrtTerm } from "mathlify/fns";

export const parameters = {
	z1: new Complex(3, [-1, sqrtTerm(3)]),
	z2: new Complex(quotient(1,2), quotient([2,pi],3), {polar: true}),
	z3: product('z_1', 'z_2'),
	condition: 'purely imaginary'
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
