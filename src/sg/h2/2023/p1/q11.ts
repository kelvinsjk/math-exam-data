import { Expression, expTerm, product, sum } from "mathlify";

const powTerm = new Expression([1.001, "^", "n"]);
export const parameters = {
	targe: 50_000,
	startDate: "31 January 2021",
	initial: new Expression("a"),
	d: 50,
	endDate: "31 December 2023",
	loan: 400_000,
	datesB: ["1 January 2024, 31 January 2024"],
	percentage: 0.1,
	// times workaround
	showB: sum(product(400_000, "\\times ", powTerm), [
		-1000,
		"x",
		sum(powTerm, -1),
	]),
	repayments: 360,
	payment: 1600,
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
