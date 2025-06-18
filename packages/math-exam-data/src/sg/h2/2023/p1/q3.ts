import { sum } from "mathlify";
import { vec } from "../../utils/vectors.js";

const [a, b] = [vec("a"), vec("b")];
const aCrossB = `${a} \\times ${b}`;
export const parameters = {
	dot: -1,
	vecStrings: {
		a,
		b,
		aCrossB,
	},
	vectors: [sum(aCrossB, a), sum(aCrossB, b)],
	showVal: 1,
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
