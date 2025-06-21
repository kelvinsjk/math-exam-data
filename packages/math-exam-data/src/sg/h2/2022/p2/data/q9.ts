import { powerTerm, product, quotient, sum } from "mathlify";

export const parameters = {
	endpoints: 6,
	showP: sum(
		product(2, powerTerm('p',3), 'q'),
		product(quotient(1,2),powerTerm('p',4))
	),
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
