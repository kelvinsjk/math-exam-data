import { Polynomial, quotient } from "mathlify";
import { absTerm } from "mathlify/fns";

const pole = 3;
export const parameters = {
	pole,
	f: absTerm(
		quotient(
			new Polynomial([2, 4]),
			new Polynomial([pole, -1], { ascending: true }),
		),
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
