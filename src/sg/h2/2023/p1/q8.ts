import { i, quotient, sum } from "mathlify";
import { Complex } from "mathlify/complex";
import { absTerm, sqrtTerm } from "mathlify/fns";

export const parameters = {
	z: new Complex(-1, sqrtTerm(3)),
	exp: quotient(["z", "^", "n"], [i, "z^*"]),
	condition: "purely imaginary",
	eqns: [
		[sum([2, "v"], absTerm("w")), 1],
		[sum([3, "v"], [-1, i, "w"]), new Complex(-3, 4)],
	],
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
