import { pi, powerTerm, product, quotient, sum } from "mathlify";

export const parameters = {
	circle: [sum(powerTerm('x',2), powerTerm('y',2)), powerTerm('r',2)],
	line: sum('r',[-1, 'h']),
	V: product(
		quotient(1,3),
		pi,
		powerTerm('h',2),
		sum([3,'r'],[-1,'h'])
	),
	r: 15,
	heights: ['p', product(3,'p')],
	vol: product(3402, 'pi')
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
