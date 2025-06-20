import { expect, it } from "vitest";
import { soln as q1, a, b, ansB } from "./q1";
import { soln as q2, A, maxOrMin } from "./q2";
//import { a as a3, b as b3, c as c3 } from "./q3";
//import { ineqsA, ineqsB } from "./q4";
//import { poly, rVal, aVal, kVal } from "./q5";
//import { a as a6, area } from "./q6";
//import { k, mac, a as a8, b as b8 } from "./q8";
//import { xP, yP, k as k9 } from "./q9";
//import { partBIIAns, vol } from "./q10";
//import { de, alphaVal, BAns, AAns, t } from "./q11";

it("2024 p2 ans", () => {
	expect(q1).toMatchSnapshot();
	expect(q2).toMatchSnapshot();
	//expect(q3).toMatchSnapshot();
	//expect(q4).toMatchSnapshot();
	//expect(q5).toMatchSnapshot();
	//expect(q6).toMatchSnapshot();
	//expect(q7).toMatchSnapshot();
	//expect(q8).toMatchSnapshot();
	//expect(q9).toMatchSnapshot();
	//expect(q10).toMatchSnapshot();
	//expect(q11).toMatchSnapshot();
});

it("2024 p2 q1", () => {
	expect(a.valueOf()).toBe(-1);
	expect(b.valueOf()).toBe(-4);
	expect(ansB.toString()).toBe("2 + 6\\mathrm{i}");
});

it("2024 p2 q2", () => {
	expect(A.toString()).toBe("23.43");
	expect(maxOrMin).toBe("maximum");
});

it("2024 p2 q3", () => {
	//expect(a3.valueOf()).toBe(-1);
});

it("2024 p2 q4", () => {
	//expect(ineqsA[0].toString()).toBe("- 2 < x \\leq - 1");
});

it("2024 p2 q5", () => {
	//expect(poly.toString()).toBe("27r^3 - 27r^2 + 4");
});

it("2024 p2 q6", () => {
	//expect(a6.toString()).toBe("4\\mathrm{e}");
});

it("2024 p2 q8", () => {
	//expect(k.valueOf()).toBe(2);
});

it("2024 p2 q9", () => {
	//expect(xP.toString()).toBe("9 + 2\\sqrt{3}");
});

it("2024 p2 q10", () => {
	//expect(a.valueOf()).toBe(1);
});

it("2024 p2 q11", () => {
	//expect(de.toString()).toBe("\\frac{{\\rm d}v}{{\\rm d}t} + \\alpha v = 9.8");
});
