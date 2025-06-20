import { capitalizeFirstLetter, noBreak, QED } from "$lib/utils/typesetting";
import { inR, vec, vecAB } from "$lib/utils/typesetting/math";
import { angleWorking } from "$lib/utils/vectors/angle";
import { dotWorking } from "$lib/utils/vectors/dot";
import { simplifyVectorMagnitude } from "$lib/utils/vectors/magnitude";
import { minusWorking } from "$lib/utils/vectors/minus";
import { projectionWorking } from "$lib/utils/vectors/projection";
import { x as m } from "mathlifier";
import { Expression, sum } from "mathlify";
import { absTerm, simplifySurd } from "mathlify/fns";
import { sle } from "mathlify/numerical";
import { simplifyVector, Vector } from "mathlify/vectors";
import { EquationWorking, ExpressionWorking } from "mathlify/working";
import { StackedQn } from "sveltexam/helpers";
import { data } from "./data";

export const soln = new StackedQn();
const parameters = data.q12;
const { aircraft, z, radius, drone, k, pts } = parameters;

const hide = true;
const verbatim = true;

const T = new Vector(0, 0, z, { name: "T" });
const [OTString, OFString, OAString, ATString, AFString, TFString] = [
	"OT",
	"OF",
	"OA",
	"AT",
	"AF",
	"TF",
].map((name) => vecAB(name));
const A = aircraft.point;
const working1 = minusWorking(A, OAString, T, OTString, {
	leadingEqual: true,
	returnVector: true,
});
const AT = working1.result;
const working2 = projectionWorking(AT, ATString, aircraft.direction, vec("d"), {
	leadingEqual: true,
	floatWorkaround: true,
});
const AFFloat = working2.result;
const AF = AFFloat;
working2.expressions = [...working2.expressions.slice(0, -1), AF];
const working3 = new EquationWorking(AFString, sum(OFString, [-1, OAString]), {
	aligned: true,
});
working3
	.subIn({ [AFString]: AF, [OAString]: A }, { verbatim })
	.swapSides({ hide })
	.moveTerms(1);
EquationWorking.RegisterCustomSimplifier(simplifyVector);
working3.simplify();
EquationWorking.DeregisterCustomSimplifier();
const [coeff, factors] = working3.eqn.rhs._getProductTerms();
if (!(factors[0] instanceof Vector))
	throw new Error("factors[0] must be a Vector");
export const OF = factors[0].times(coeff);

// a
soln.part("", "");
// a i
soln.addSubpart(
	m`${OF.toCoordinatesString()}.`,
	m`Let ${{}} T ${T.toCoordinatesString()}
denote the position of the control tower, ${{}} A ${A.toCoordinatesString()}
denote a point on the path of the aircraft and $F$ denote
the point when the aircraft is at its closest point to
the air traffic controllers.

#${"align*"} ${ATString}  ${working1}

#${"align*"} ${AFString} ${working2}

#${"align*"} ${working3}

Coordinates of ${noBreak("\\displaystyle F =", OF.toCoordinatesString(), "\\;", QED)}
`,
);

// a ii
const working4 = minusWorking(OF, OFString, T, OTString, {
	floatWorkaround: true,
	leadingEqual: true,
});
const TF = working4.result;
const working5 = new EquationWorking(
	`\\left\\lvert ${TFString} \\right\\rvert`,
	absTerm(TF),
	{ aligned: true },
);
EquationWorking.RegisterCustomSimplifier(simplifyVectorMagnitude);
working5.simplify();
EquationWorking.DeregisterCustomSimplifier();
export const length = working5.eqn.rhs.valueOf();
const yesNo = length > radius ? ["No", "not", ">"] : ["Yes", "", "<"];
soln.addSubpart(
	m`@${yesNo[0]}.`,
	m`#${"align*"} ${TFString} ${working4}

	#${"align*"} ${working5} \\\\ &= ${length.toPrecision(5)} ${yesNo[2]} 4

Hence the air traffic controllers will @${yesNo[1]} see this aircraft.`,
);

// b
const working6 = new EquationWorking(aircraft.x, drone.x, { aligned: true });
working6.addCustomStep(aircraft.y, drone.y);
working6.addCustomStep(aircraft.z, drone.z);
const working7 = new EquationWorking(aircraft.x, drone.x, {
	hideFirstStep: true,
});
working7.moveTerms([[0], [1]]);
const working8 = new EquationWorking(aircraft.y, drone.y, {
	hideFirstStep: true,
});
working8.moveTerms([[0], [1]], { hide }).times(-1, { expand: true });
const [lambda, mu] = sle(
	[aircraft.parameter.toString(), drone.parameter.toString()],
	working7.eqn,
	working8.eqn,
);
const working9 = new EquationWorking(
	working6.eqn.lhs.subIn({ "\\lambda ": lambda }, { verbatim }),
	working6.eqn.rhs.subIn({ "\\mu ": mu }, { verbatim }),
	{
		aligned: true,
		sign: "!=",
	},
);
working9.swapSides({ hide }).isolate("k");
export const notK = working9.eqn.rhs;
soln.addPart(
	m`${noBreak("k", inR, "^+,")}
${noBreak("k \\neq ", notK, ".")}`,
	m`Let $l_1$ and $l_2$ represent the paths of the aircraft and drone respectively.

$${{}} l_2: ${drone}

We observe that $l_1$ and $l_2$ are not parallel since their direction vectors are
not scalar multiples of each other.

Now assuming that the paths intersect,
$${{}} ${aircraft.toVectorString()} = ${drone.toVectorString()}

#${"align"} ${working6}

From $(1)$,
#${"align"} ${working7}

From $(2)$,
#${"align"} ${working8}

Solving $(4)$ and $(5)$ with a GC,
$${{}} \\lambda = ${lambda}, \\; \\mu = ${mu}

Since the paths do not intersect, considering equation $(3)$,
#${"align*"} ${working9}

Hence the possible values of $k$ are: ${noBreak("k", inR, "^+,")}
${noBreak("k \\neq ", notK, "\\;", QED)}
`,
);

// c
const working10 = angleWorking(aircraft, drone);
export const theta = working10.angle;
soln.part(
	m`${noBreak("\\theta=", theta.toFixed(1), "^\\circ .")}`,
	m`Let $\\theta$ denote the acute angle between the paths of the aircraft and the drone

#${"gather*"} ${working10} \\; ${QED}`,
);

// d
soln.addPart("", "");
// d i
const [OBString, OCString, BCString] = ["OB", "OC", "BC"].map((s) => vecAB(s));
const working11 = minusWorking(pts[1], OCString, pts[0], OBString, {
	leadingEqual: true,
	returnVector: true,
});
// workaround for float
const BCFloat = working11.result;
const BC = new Vector(
	Math.round(BCFloat.x.valueOf() * 10) / 10,
	BCFloat.y,
	BCFloat.z,
);
working11.expressions = [...working11.expressions.slice(0, -1), BC];
const working12 = new ExpressionWorking(absTerm(BCString), {
	leadingEqual: true,
}).subIn({ [BCString]: BC });
ExpressionWorking.RegisterCustomSimplifier(simplifyVectorMagnitude);
ExpressionWorking.RegisterCustomSimplifier(simplifySurd);
working12.simplify();
ExpressionWorking.DeregisterCustomSimplifier();
ExpressionWorking.DeregisterCustomSimplifier();
working12.toPrecision(3);
export const distance = working12.expression;
soln.addSubpart(
	m`${distance} \\text{ km}.`,
	m`Let $B$ and $C$ denote the points ${pts[0].toCoordinatesString()}
and ${pts[1].toCoordinatesString()}
respectively

#${"align*"} ${BCString} ${working11}

#${"align*"} \\text{Distance} ${working12} \\text{ km} \\text{ (3 s.f.)} \\; ${QED}`,
);
// d ii
const dVec = vec("d");
const d1 = aircraft.direction;
const d2 = drone.direction.subIn({ k });
const working13 = dotWorking(BC, d1, { leadingEqual: true });
const float = working13.expression;
working13.expressions = [
	...working13.expressions.slice(0, -1),
	new Expression(Math.round(float.valueOf() * 10) / 10),
];
const working14 = dotWorking(BC, d2, { leadingEqual: true });
export const dots = [working13.expression, working14.expression];
const notString = dots.every((d) => d.valueOf() === 0) ? "" : "not";
soln.addSubpart(
	m`@${capitalizeFirstLetter(notString)} the shortest distance.`,
	m`Let ${dVec}_1
and ${dVec}_2
denote the direction vectors of the paths of the aircraft and the drone respectively

#${"align*"} & ${BCString} \\cdot ${dVec}_1 \\\\ ${working13} \\\\ &\\neq 0

#${"align*"} & ${BCString} \\cdot ${dVec}_2 \\\\ ${working14} \\\\ &\\neq 0

Hence $BC$ is not perpendicular to either $l_1$ or $l_2$, so the distance found in
(d)(i) is @${notString} the shortest distance between the two paths ${QED}
`,
);
