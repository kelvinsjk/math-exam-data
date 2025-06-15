import { expTerm, pi, product, quotient, sum } from "mathlify";

export const parameters = {
	A: sum([4, "x"], [quotient(-1, 2), ["x", "^", 2], sum(pi, 4)]),
	side: product(2, "z"),
	perimeter: 4,
	costs: [
		[product("C"), 103],
		[product(0.8, "C"), 83],
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
