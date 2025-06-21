import { pi, powerTerm, product, quotient } from "mathlify";
import { Differential } from "mathlify/calculus";
import { trigTerm } from "mathlify/fns";

export const parameters = {
	aEqn: [new Differential('\\cot x')],
	bEqn: [product(trigTerm('sin', [2,'x']), trigTerm('tan', 'x')), product(2, powerTerm(trigTerm('sin', 'x'), 2))],
	integrand: '',
	limits: [
		quotient(pi, 18),
		quotient(pi, 9)
	]
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
