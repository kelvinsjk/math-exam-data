import { h2 } from "math-exam-data/h2";
import { expect, it } from "vitest";
import { a, b, c, soln as q1 } from "./q1";
import { angle, soln as q2 } from "./q2";
import { a as a3, b as b3, c as c3, soln as q3 } from "./q3";
import { ineqsA, ineqsB, soln as q4 } from "./q4";
import { aVal, kVal, poly, soln as q5, rVal } from "./q5";
import { a as a6, ansB, area, soln as q6 } from "./q6";
import { a as a8, b as b8, k, mac, soln as q8 } from "./q8";
import { k as k9, soln as q9, xP, yP } from "./q9";

const parameters = h2.y24.p1.q10;

import { aShow, partBIIAns, soln as q10, vol } from "./q10";
import { AAns, alphaVal, BAns, de, soln as q11, t } from "./q11";
import { distance, dots, length, notK, OF, soln as q12, theta } from "./q12";

it("2024 p1 ans", () => {
	expect(q1).toMatchSnapshot();
	expect(q2).toMatchSnapshot();
	expect(q3).toMatchSnapshot();
	expect(q4).toMatchSnapshot();
	expect(q5).toMatchSnapshot();
	expect(q6).toMatchSnapshot();
	//expect(q7).toMatchSnapshot();
	expect(q8).toMatchSnapshot();
	expect(q9).toMatchSnapshot();
	expect(q10).toMatchSnapshot();
	expect(q11).toMatchSnapshot();
	expect(q12).toMatchSnapshot();
});

it("2024 p1 q1", () => {
	expect(a.valueOf()).toBe(2);
	expect(b.valueOf()).toBe(-1);
	expect(c.valueOf()).toBe(-1);
});

it("2024 p1 q2", () => {
	expect(angle.valueOf()).toBe(90);
});

it("2024 p1 q3", () => {
	expect(a3.valueOf()).toBe(-1);
	expect(b3.valueOf()).toBe(-1);
	expect(c3.valueOf()).toBe(-15);
});

it("2024 p1 q4", () => {
	expect(ineqsA[0].toString()).toBe("- 2 < x \\leq - 1");
	expect(ineqsA[1].toString()).toBe("0 < x \\leq 6");
	expect(ineqsB[0].toString()).toBe("- 6 \\leq x < 0");
	expect(ineqsB[1].toString()).toBe("0 < x \\leq 6");
});

it("2024 p1 q5", () => {
	expect(poly.toString()).toBe("27r^3 - 27r^2 + 4");
	expect(rVal.toString()).toBe("- \\frac{1}{3}");
	expect(aVal.valueOf()).toBe(24);
	expect(kVal.valueOf()).toBe(4);
});

it("2024 p1 q6", () => {
	const { p, q, r } = ansB;
	expect(p.valueOf()).toBe(6);
	expect(q.valueOf()).toBe(-4);
	expect(r.valueOf()).toBe(1);
	expect(a6.toString()).toBe("4\\mathrm{e}");
	expect(area.toString()).toBe("5.4");
});

it("2024 p1 q8", () => {
	expect(k.valueOf()).toBe(2);
	expect(mac.toString()).toBe("1 - 2x^2 - 4x^3 + \\dotsb");
	expect(a8.valueOf()).toBe(1);
	expect(b8.valueOf()).toBe(4);
});

it("2024 p1 q9", () => {
	expect(xP.toString()).toBe("9 + 2\\sqrt{3}");
	expect(yP.toString()).toBe("3 + 6\\sqrt{3}");
	expect(k9.valueOf()).toBe(1);
});

it("2024 p1 q10", () => {
	expect(`\\int ${parameters.integrand} \\; {\\rm d}u`).toBe(aShow.toString());
	const { a, b, c } = partBIIAns;
	expect(a.valueOf()).toBe(1);
	expect(b.valueOf()).toBe(3);
	expect(c.valueOf()).toBe(1.6);
	expect(vol).toBe("11.04");
});

it("2024 p1 q11", () => {
	expect(de.toString()).toBe("\\frac{{\\rm d}v}{{\\rm d}t} + \\alpha v = 9.8");
	expect(alphaVal).toBe(2);
	expect(AAns.valueOf()).toBe(4.9);
	expect(BAns.valueOf()).toBe(-2);
	expect(t).toBe("409");
});

it("2024 p1 q12", () => {
	expect(OF.x.toString()).toBe("\\frac{53}{15}");
	expect(OF.y.toString()).toBe("\\frac{52}{15}");
	expect(OF.z.toString()).toBe("\\frac{1}{15}");
	expect(length.valueOf()).toBeCloseTo(4.95, 3);
	expect(notK.valueOf()).toBeCloseTo(6.4, 5);
	expect(theta).toBeCloseTo(72.7, 1);
	expect(distance.toString()).toBe("2.35");
	expect(dots[0].valueOf()).toBeCloseTo(-0.8, 5);
	expect(dots[1].valueOf()).toBeCloseTo(1.1, 5);
});
