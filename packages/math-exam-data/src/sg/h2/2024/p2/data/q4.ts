import { Polynomial } from "mathlify";

export const parameters = {
	T: new Polynomial([2, -8, -4, 0], { variable: "n" }),
	u: new Polynomial([50, -204], { variable: "n" }),
	v: new Polynomial([3, 16], { variable: "n" }),
	cBound: 100,
	w: new Polynomial([3, -5, 7], { variable: "n" }),
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
