import { Polynomial, quotient } from "mathlify";
import { sqrtTerm } from "mathlify/fns";

const half = quotient(1, 2);
export const parameters = {
	curve: sqrtTerm(new Polynomial([1, -2])),
	line: new Polynomial([half, -1]),
	lineM: new Polynomial([half, "k"]),
};

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
