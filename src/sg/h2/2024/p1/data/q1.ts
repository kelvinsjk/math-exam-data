import { quotient, Polynomial } from "mathlify";

export const parameters = {
	y: quotient(new Polynomial([1, 1]), new Polynomial(["a", "b", "c"])),
	xAsymptote: quotient(-1, 2),
	turningPt: [-2, quotient(-1, 9)],
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
