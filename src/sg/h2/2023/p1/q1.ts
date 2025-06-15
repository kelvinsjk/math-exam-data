import { Expression, Polynomial } from "mathlify";
import { logTerm } from "mathlify/calculus";

export const parameters = {
	curve: [
		logTerm("y"),
		new Expression([new Polynomial([11, -5], { ascending: true }), "^", 2]),
	],
	x0: 2,
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
