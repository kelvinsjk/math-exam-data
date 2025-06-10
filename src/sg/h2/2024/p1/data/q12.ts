import { quotient, greek } from "mathlify";
import { Line, Vector } from "mathlify/vectors";

export const parameters = {
	aircraft: new Line([4, 3, 1], [1, -1, 2]),
	z: 0.1,
	radius: 4,
	drone: new Line([quotient(3, 2), -1, "k"], [quotient(3, 2), 1, -1], {
		parameter: greek("mu"),
	}),
	k: 2,
	pts: [new Vector(4, 3, 1), new Vector(4.2, 0.8, 0.2)],
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
