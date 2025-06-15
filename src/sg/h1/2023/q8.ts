import { product, quotient } from "mathlify";

const [pACapB, pAPrimeCapB] = [
	"\\textrm{P} \\left( A \\cap B \\right)",
	"\\textrm{P} \\left( A' \\cap B \\right)",
];
export const parameters = {
	aUnionB: quotient(13, 24),
	bGivenA: quotient(3, 5),
	pACapB,
	pAPrimeCapB,
	eqn: [pACapB, product(2, pAPrimeCapB)],
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
