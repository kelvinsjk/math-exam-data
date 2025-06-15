import { vec } from "../../utils/vectors";
import { Vector } from "mathlify/vectors";

const [a, b] = [vec("a"), vec("b")];
const aCrossB = `${a} \\times ${b}`;
export const parameters = {
	A: new Vector(-1, 2, 5),
	B: new Vector(1, -2, 8),
	multiple: 2,
	D: new Vector(1, 2, "d"),
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
