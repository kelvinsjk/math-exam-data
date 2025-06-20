import { expTerm, Polynomial } from "mathlify";
import { logTerm } from "mathlify/fns";

export const parameters = {
	expA: logTerm(new Polynomial([4,0,-5],{ascending: true})).times(3),
	y: expTerm(new Polynomial([2,-3],{ascending: true})).times(4),
	x0: 1,
	m: -2
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
