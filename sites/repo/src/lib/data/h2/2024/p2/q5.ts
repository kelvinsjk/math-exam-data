import { noBreak, QED } from "$lib/utils/typesetting";
import { StackedQn } from "sveltexam/helpers";

export const soln = new StackedQn();
//const { x, y } = parameters;
import { x as m } from "mathlifier";

soln.addSubpart(
	m`
![finv-graph](/imgs/2024/solns/24p2q05a1.svg)
`,
	"Sketch.",
);
soln.addSubpart(
	m`
![finv-translated-graph](/imgs/2024/solns/24p2q05a2.svg)
`,
	"Sketch.",
);
// b
soln.addPart("", "");
soln.addSubpart(
	m`
![mod-fx-graph](/imgs/2024/solns/24p2q05b1.svg)
`,
	"Sketch.",
);
soln.addSubpart(
	m`
![f-mod-x-graph](/imgs/2024/solns/24p2q05b2.svg)
`,
	"Sketch.",
);
// c
soln.addPart("", "");
soln.addSubpart(
	m`![parametric-curve](/imgs/2024/solns/24p2q05c.svg)`,
	"Sketch.",
);
soln.addSubpart(
	m`$${{}} (0,3) \\; ${QED} \\quad \\left( \\frac{9}{2}, 0 \\right) \\; ${QED}`,
	m`${noBreak("(0,3).")}
${noBreak("\\left( \\frac{9}{2}, 0 \\right).")}`,
);
soln.addSubpart(
	m`Line of symmetry: $${"y=3"} \\; ${QED}`,
	m`${noBreak("y=3.")}`,
);
