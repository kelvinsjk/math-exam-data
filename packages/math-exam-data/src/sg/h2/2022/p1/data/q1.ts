import { i, sum } from "mathlify";

export const parameters = {
	eqns: [
		[sum([i,'z'],[2,'w']), -1],
		[sum(
			[sum(2,-i), 'z'],
			[i,'w']
		)],
		6
	]
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
