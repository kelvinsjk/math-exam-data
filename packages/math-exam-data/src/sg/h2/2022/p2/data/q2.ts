import { product, sum } from "mathlify";

export const parameters = {
	area: 0.9,
	time: 72,
	k: product(12.5, 'h'),
	rate1: product('k','t'),
	rate2: sum(product('k','t'),25),
	time2: 10
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
