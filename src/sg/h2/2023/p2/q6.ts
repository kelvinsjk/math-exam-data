import {
	Expression,
	greek,
	Polynomial,
	product,
	quotient,
	sum,
} from "mathlify";
import { trigTerm } from "mathlify/fns";

const theta = greek("theta");
export const parameters = {
	total: 12,
	reds: [4, 3],
	show: [new Polynomial([9, 5], { variable: "r" }), product(4, "b")],
	redsB: [3, 2],
	multiple: quotient(5, 3),
	xB: 1,
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
