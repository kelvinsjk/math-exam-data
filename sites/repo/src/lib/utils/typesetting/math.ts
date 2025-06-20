import { Expression, greek, pi, quotient } from "mathlify";
import { sqrtTerm } from "mathlify/fns";

export const inR = "\\in \\mathbb{R}";

export function dxString(x = "x"): string {
	return `\\; {\\rm d} ${x}`;
}

export function dydxString(options?: { x?: string; y?: string }): string {
	const { x = "x", y = "y" } = options ?? {};
	return `\\frac{{\\rm d}${y}}{{\\rm d}${x}}`;
}
export function d2String(options?: { x?: string; y?: string }): string {
	const { x = "x", y = "y" } = options ?? {};
	return `\\frac{{\\rm d}^2${y}}{{\\rm d}${x}^2}`;
}

export function integrationString(
	fx: unknown,
	options?: { x?: string },
): string {
	return `\\displaystyle \\int ${fx} ${dxString(options?.x ?? "x")}`;
}
export function definiteIntegralString(
	fx: unknown,
	limits: [unknown, unknown] | Readonly<[unknown, unknown]>,
	options?: { x?: string },
): string {
	return `\\displaystyle \\int_{${limits[0]}}^{${limits[1]}} ${fx} ${dxString(options?.x ?? "x")}`;
}

export const xAxis = "x\\text{-axis}";
export const yAxis = "y\\text{-axis}";
export const zAxis = "z\\text{-axis}";
export const xYAxes =
	"x\\text{-} \\allowbreak \\text{ and } \\allowbreak y\\text{-axes}";
export const xCoordinate = "x\\text{-coordinate}";
export const xCoordinates = "x\\text{-coordinates}";
export const yCoordinate = "y\\text{-coordinate}";
export function coordinates(x: unknown, y: unknown, name?: string): string {
	return `${name ?? ""}\\left( ${x}, ${y} \\right)`;
}

export function vecAB(v: unknown): string {
	return `\\overrightarrow{${v}}`;
}
export function vec(v: unknown): string {
	return `\\mathbf{${v}}`;
}

export function cartesian(punctuation?: string): string {
	return `{ a + \\mathrm{i}b${punctuation ?? ""} }`;
}

export function normal(mean: unknown, variance: unknown): string {
	return `\\mathrm{N} \\left( ${mean}, ${variance} \\right)`;
}
export function binomial(n: unknown, p: unknown): string {
	return `\\mathrm{B} \\left( ${n}, ${p} \\right)`;
}
export function P(event: unknown): string {
	return `\\mathrm{P} \\left( ${event} \\right)`;
}
export function E(X: unknown): string {
	return `\\mathrm{E} \\left( ${X} \\right)`;
}
export function Var(X: unknown): string {
	return `\\mathrm{Var} \\left( ${X} \\right)`;
}
export const expForm = "r\\text{e}^{\\text{i}\\theta}";

export const sqrt3 = sqrtTerm(3);
export const half = quotient(1, 2);
export const quarter = quotient(1, 4);
export const quarterPi = new Expression([quarter, pi]);
export const lambda = greek("lambda");
export const mu = greek("mu");
export const theta = greek("theta");
