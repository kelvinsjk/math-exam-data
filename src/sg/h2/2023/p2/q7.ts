import { expTerm, Polynomial } from "mathlify";

const pole = 3;
export const parameters = {
	base: 2000,
	data: [
		[4, 6, 8, 10, 12, 14, 16, 18],
		[3.99, 4.79, 6.41, 7.38, 8.07, 8.1, 8.46, 8.39],
	],
	models: [
		["y", new Polynomial(["a", "b"])],
		[expTerm("y"), new Polynomial(["c", "d"])],
	],
	year: 2024,
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
