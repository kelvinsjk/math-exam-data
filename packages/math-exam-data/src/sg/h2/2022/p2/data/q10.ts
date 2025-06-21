import { quotient } from "mathlify";

export const parameters = {
	data: [
		[14588, 8954, 24030, 37551, 45452, 30100, 5055],
		[12450, 15200, 11900, 10700, 10600, 10900, 22500]
	],
	r: -0.78,
	mileToKm: 1.6,
	poundToDollar: 1.7,
	l3: quotient(100000,'d')	
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
