import { Polynomial, quotient } from "mathlify";

export const parameters = {
	data: [
		[24, 250, 550, 1000, 2000, 5000],
		[100, 300, 400, 600, 900, 1200]
	],
	m: 750,
	data2: [
		[2,5,6,7,11],
		[6,10,16,20,25]
	],
	line: new Polynomial([quotient(5,2),1],{variable:'n'}),
	altLine: new Polynomial([quotient(5,2),'c'],{variable:'n'}),
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
