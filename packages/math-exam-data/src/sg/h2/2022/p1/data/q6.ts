import { Polynomial, quotient } from "mathlify";

export const parameters = {
	fx: quotient(
		new Polynomial(['a','k']),
		new Polynomial([1,[-1,'a']])
	),
	curve: quotient(1,'x'),
	n: 2023,
	x: 1
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
