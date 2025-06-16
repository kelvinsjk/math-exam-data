import { expTerm, product, sum } from "mathlify";

export const parameters = {
	expenditure: 30,
	dMdt: product("k", sum("C", [-30, "M"])),
	M0: 110,
	percentage: 80,
	showM: sum(88, [22, expTerm([-30, "k", "t"])]),
	conditions: [75, 100],
	xD: 96,
	xE: 80,
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
