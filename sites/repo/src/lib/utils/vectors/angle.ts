import { greek, productVerbatim, sumVerbatim } from "mathlify";
import { absTerm, Cos, Sin } from "mathlify/fns";
import { Line, Plane, type Vector } from "mathlify/vectors";
import { EquationWorking } from "mathlify/working";
import { simplifyVectorMagnitude } from "./magnitude";

export function angleWorking(
	v1: Vector | Line | Plane,
	v2: Vector | Line | Plane,
	options?: ConstructorParameters<typeof EquationWorking>[2],
): EquationWorking & {
	angle: number;
} {
	const sineMode =
		(v1 instanceof Line && v2 instanceof Plane) ||
		(v1 instanceof Plane && v2 instanceof Line);
	const absMode =
		v1 instanceof Line ||
		v2 instanceof Line ||
		v1 instanceof Plane ||
		v2 instanceof Plane;
	const o1: Vector =
		v1 instanceof Line ? v1.direction : v1 instanceof Plane ? v1.normal : v1;
	const o2: Vector =
		v2 instanceof Line ? v2.direction : v2 instanceof Plane ? v2.normal : v2;
	const theta = greek("theta");
	const dotProduct = `${o1} \\cdot ${o2}`;
	const working: EquationWorking & { angle?: number } = new EquationWorking(
		absMode ? absTerm(dotProduct) : dotProduct,
		productVerbatim(
			absTerm(o1),
			absTerm(o2),
			sineMode ? new Sin(theta) : new Cos(theta),
		),
		options,
	);
	EquationWorking.RegisterCustomSimplifier(simplifyVectorMagnitude);
	working.simplify({ hide: true });
	const dot = sumVerbatim([1, o1.x, o2.x], [1, o1.y, o2.y], [1, o1.z, o2.z]);
	working.addCustomStep(absMode ? absTerm(dot) : dot, working.eqn.rhs);
	working
		.simplify({ hide: true })
		.swapSides({ hide: true })
		._makeSubjectFromProduct(theta);
	const angleRad = sineMode
		? Math.asin(working.eqn.rhs.valueOf())
		: Math.acos(working.eqn.rhs.valueOf());
	const angle = (angleRad / Math.PI) * 180;
	working.angle = angle;
	EquationWorking.DeregisterCustomSimplifier();
	working.addCustomStep(
		theta,
		`${Number.isInteger(angle) ? angle : angle.toFixed(1)}^\\circ`,
	);
	return working as EquationWorking & {
		angle: number;
	};
}
