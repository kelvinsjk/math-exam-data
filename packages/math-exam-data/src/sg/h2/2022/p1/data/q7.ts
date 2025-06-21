import {
	quotient,
	product,
	powerTerm,
	sum,
} from "mathlify";
import { logTerm } from "mathlify/fns";

export const parameters = {
	y: product(powerTerm('x',-3), logTerm('x')),
	dydx: quotient(sum(1, [-3, logTerm('x')]), powerTerm('x',4)),
	lineX: 3
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
