import { sum } from "mathlify";
import { sqrtTerm } from "mathlify/fns";
import { ATan } from "mathlify/trigo";

export const parameters = {
	fx: new ATan(sum(sqrtTerm(2), 'x'))
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
