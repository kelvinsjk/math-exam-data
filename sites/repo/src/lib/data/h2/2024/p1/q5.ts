import { noBreak, QED } from "$lib/utils/typesetting";
import { x } from "mathlifier";
import {
	Expression,
	expressionToPolynomial,
	Polynomial,
	product,
	quotient,
	sum,
} from "mathlify";
import { cubicRoot } from "mathlify/numerical";
import { EquationWorking, solve } from "mathlify/working";
import { StackedQn } from "sveltexam/helpers";
import { data } from "./data";

export const soln = new StackedQn();
const parameters = data.q5;

const { sInf, n, uN, showPoly, multiple } = parameters;

const verbatim = true;
const hide = true;
const working1 = new EquationWorking("S_\\infty", sInf);
const sInfFormula = quotient("a", sum(1, [-1, "r"]));
working1
	.subIn({ "S_\\infty": sInfFormula }, { verbatim })
	.crossMultiply({ expand: true });
const a = working1.eqn.rhs;
const uNString = `u_${n}`;
const working2 = new EquationWorking(uNString, uN);
working2
	.subIn({ [uNString]: product("a", ["r", "^", n - 1]) })
	.crossMultiply({ expand: true });
const working3 = new EquationWorking(
	working2.eqn.lhs.subIn({ a }, { verbatim }),
	working2.eqn.rhs,
);
working3
	.expand()
	.divideByFactor(2)
	.swapSides({ hide })
	.makeRhsZero({ hide })
	.rearrange([2, 1, 0]);

export const poly = working3.eqn.lhs;
if (poly.toString() !== showPoly.toString())
	throw new Error("expected polynomials to be equal");

// a
soln.addPart(
	x`${noBreak(poly, "=0.")}`,
	x`#${"gather"} ${working1}

#${"gather"} ${working2}

Substituting $(3)$ into $(6)$,
#${"gather*"} ${working3} \\; ${QED}
`,
);

// b
const cubic = expressionToPolynomial(poly, "r");
const x1 = cubicRoot(cubic);
const { roots } = solve.quadratic(
	cubic.longDivide(Polynomial.fromRoot(x1, { variable: "r" })).quotient,
);
roots.push(new Expression(x1));
const uniqueRoots = roots.filter(
	(root, index) => roots.indexOf(root) === index,
);
export const rVal = uniqueRoots.filter((root) => root.is.negative())[0];
export const aVal = a.subIn({ r: rVal });
soln.addPart(
	x`${noBreak("r=", rVal, ",")}
${noBreak("a=", aVal, ".")}`,
	x`From GC,
$${{}} ${uniqueRoots.map((root) => `r=${root}`).join("\\; \\text{ or } \\;")}

Since $r < 0$, ${noBreak("r=", rVal, "\\;", QED)}

Substituting ${noBreak("r=", rVal)}
into $(3)$, ${noBreak("a=", aVal, "\\;", QED)}
`,
);

// c
const afterK = "\\sum_{r=k+1}^\\infty u_r";
const sK = "\\sum_{r=1}^k u_r";
const sInfString = "\\sum_{r=1}^\\infty u_r";
const working4 = new EquationWorking([multiple, afterK], sK);
working4
	.subIn({ [afterK]: sum(sInfString, [-1, sK]) })
	.expand()
	.moveTerms(1)
	.subIn({
		[sInfString]: sInfFormula,
		[sK]: quotient(["a", sum(1, [-1, ["r", "^", "k"]])], sum(1, [-1, "r"])),
	})
	.divide("a", { hide })
	.times(sum(1, [-1, "r"]))
	.expand()
	.swapSides({ hide })
	.isolate("k")
	._makeSubjectFromProduct("k")
	.subIn({ r: rVal });
const rKVal = working4.eqn.rhs;
export const kVal = Math.log(rKVal.valueOf()) / Math.log(rVal.abs().valueOf());
working4.addCustomStep(working4.eqn.lhs, [rVal, "^", kVal]);
working4.addCustomStep("k", kVal);
soln.addPart(
	x`${noBreak("k=", kVal, ".")}`,
	x`#${"gather*"} ${working4} \\; ${QED}`,
);
