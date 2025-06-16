import { quotient, sum } from "mathlify";

export const parameters = {
	showP: quotient(2,'n'),
	multiple: 8,
	qCapRPrime: 0.1,
	qCupRPrime: sum('q',[2,'r'])
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
