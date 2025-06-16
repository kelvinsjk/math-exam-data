import { quotient, Polynomial, expTerm, sum, product } from "mathlify";
import { Differential } from "mathlify/calculus";
import { sqrtTerm } from "mathlify/fns";
import { trigTerm } from "mathlify/trigo";

const e2x = expTerm([2, "x"]);

export const parameters = {
	y: trigTerm("cos", sum(1, e2x.negative())),
	d2: product("k", sum(new Differential(), [-2, "y", expTerm([4, "x"])])),
	binom: quotient(
		1,
		sqrtTerm(new Polynomial(["a", 0, "b"], { ascending: true })),
	),
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
