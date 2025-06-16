import { Polynomial, sum } from "mathlify";

export const parameters = {
	line: new Polynomial(['k','k']),
	curve: new Polynomial([sum('k',-1),[3,'k'],-1],{ascending: true})
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
