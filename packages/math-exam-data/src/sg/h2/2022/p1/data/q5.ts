import { Polynomial, powerTerm, sum } from "mathlify";

export const parameters = {
	line: new Polynomial(['m',0]),
	eqn: [
		sum(
			powerTerm(new Polynomial([1,8]),2),
			powerTerm(new Polynomial([1,-14],{variable: 'y'}),2),
		),
		52
	],
	showPoly: new Polynomial([3,56,36],{variable:'m'})
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
