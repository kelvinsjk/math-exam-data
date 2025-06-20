import { Expression, type Polynomial } from "mathlify";
import { Interval } from "mathlify/intervals";

export const range = {
	quadratic: (poly: Polynomial, options?: { domain?: Interval }) => {
		// TODO: handle domain
		const [b, a] = poly.coeffs.slice(1);
		const x0 = new Expression(b).negative().divide([2, a]);
		const y0 = poly.subIn({ [poly.variable.toString()]: x0 });
		return a.valueOf() < 0
			? new Interval("leftClosed", y0)
			: new Interval("rightClosed", y0);
	},
};