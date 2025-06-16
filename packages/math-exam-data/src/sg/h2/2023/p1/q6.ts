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
	theta,
	show: [
		new Expression([trigTerm("cos", theta), "^", 4]),
		product(
			quotient(1, 8),
			sum(trigTerm("cos", [4, theta]), [4, trigTerm("cos", [2, theta])], 3),
		),
	],
	curve: [
		new Expression(["y", "^", 4]),
		new Expression([new Polynomial([9, 0, -1], { ascending: true }), "^", 3]),
	],
	bounds: [1.5, 3],
	x: product(3, trigTerm("sin", theta)),
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
