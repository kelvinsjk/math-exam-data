import { Polynomial } from "mathlify";

const variable = "t";

export const parameters = {
	x: new Polynomial([3, 2, 0], { variable }),
	y: new Polynomial([0, 0, 1, 2], { variable, ascending: true }),
	angle: 60,
	q: [16, 20],
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
