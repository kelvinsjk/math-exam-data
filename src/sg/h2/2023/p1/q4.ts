import { pi, product, quotient } from "mathlify";
import { absTerm, trigTerm } from "mathlify/fns";

const xCosNx = product("x", trigTerm("cos", ["n", "x"]));
export const parameters = {
	integrands: [
		product(trigTerm("cos", ["p", "x"]), trigTerm("cos", ["q", "x"])),
		xCosNx,
		absTerm(xCosNx.subIn({ n: 2 })),
	],
	limitsC: [0, pi],
	limitsD: [0, quotient(pi, 2)],
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
