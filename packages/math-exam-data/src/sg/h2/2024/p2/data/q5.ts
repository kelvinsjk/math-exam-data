import { Polynomial } from "mathlify";

export const parameters = {
	scaleFactor: 2,
	translateX: 1,
	tDomain: [-4, 4],
	x: Polynomial.ofDegree(2, { variable: "t" }),
	y: new Polynomial([2, 3], { variable: "t" }),
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
