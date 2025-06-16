import { Polynomial, quotient, sum } from "mathlify";

export const parameters = {
	f: new Polynomial([-1,4,7]),
	g: sum(quotient(2,'x'),1),
	x: 1.5,
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
