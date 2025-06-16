import { Polynomial } from "mathlify";
import { Complex } from "mathlify/complex";

export const parameters = {
	poly: new Polynomial([1, "a", "b", "c"], { variable: "z" }),
	realRoot: 3,
	w: new Complex(-1, 2),
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
