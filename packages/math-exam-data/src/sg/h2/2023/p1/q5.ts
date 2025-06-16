import { Polynomial, product, quotient } from "mathlify";
import { logTerm, trigTerm } from "mathlify/fns";

const xCosNx = product("x", trigTerm("cos", ["n", "x"]));
export const parameters = {
	summand: logTerm(
		quotient(
			product(
				new Polynomial([1, -1], { variable: "r" }),
				new Polynomial([1, 1], { variable: "r" }),
			),
			["r", "^", 2],
		),
	),
	lower: 2,
	limits: [10, 20],
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
