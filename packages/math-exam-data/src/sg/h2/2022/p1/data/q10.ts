import { Polynomial, product, quotient, sum } from "mathlify";

const y = sum(
	new Polynomial(['a','b']),
	quotient(sum('a',[2,'b']), new Polynomial([1,-2])),
);

export const parameters = {
	y,
	b: product(-2,'a'),
	line: new Polynomial(['a',[-1, 'a']]),
	a: 1,
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
