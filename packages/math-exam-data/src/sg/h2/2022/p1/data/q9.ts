import { greek, pi, quotient } from "mathlify";
import { trigTerm } from "mathlify/fns";

const theta = greek('theta');

export const parameters = {
	terms: [1, 3, 15],
	r: trigTerm('cos', theta).negative(),
	sInf: trigTerm('tan', ['k', theta]),
	theta: quotient(pi,3),
	n: 7
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
