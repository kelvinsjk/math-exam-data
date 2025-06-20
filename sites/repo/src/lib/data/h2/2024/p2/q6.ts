import { x } from "mathlifier";
import { StackedQn } from "sveltexam/helpers";
import { data } from "./data";

export const soln = new StackedQn();
const parameters = data.q6;
import { noBreak, QED } from "$lib/utils/typesetting";
import { ExpressionWorking } from "mathlify/working";
import { sumVerbatim, productVerbatim, quotient } from "mathlify";
import { NCr } from "mathlify/stats";
import { P } from "$lib/utils/typesetting/math";
const { members, replies } = parameters;

const verbatim = true;

// a
const total = members.reduce((a, b) => a + b, 0);
soln.addPart(
	x`The ${replies}
form a sample because not all
${noBreak(members[0], "+", members[1], "+", members[2], "=", total)}
members replied, so the ${replies}
is a subset of the population ${QED}
`,
	x`It comprise a sample as the ${replies}
members is a subset of the population.`,
);

// b
soln.addPart(
	x`Choosing a random sample means
all members have a equal chance of being
chosen so this leads to a sample that is free
from bias ${QED}`,
	x`Choosing a random sample means all members
have a equal chance of being chosen so this
leads to a sample that is free from bias.`,
);

// c
const num = productVerbatim(
	new NCr(members[1], 3),
	new NCr(members[0], 2),
	new NCr(members[2], 1),
);
const den = sumVerbatim(
	num,
	productVerbatim(
		new NCr(members[1], 3),
		new NCr(members[0], 1),
		new NCr(members[2], 2),
	),
	productVerbatim(
		new NCr(members[1], 4),
		new NCr(members[0], 1),
		new NCr(members[2], 1),
	),
);

const working = new ExpressionWorking(quotient(num, den, { verbatim }), {
	leadingEqual: true,
}).simplify();
export const p = working.expression;
soln.addPart(
	x`There are 3 cases to consider:

- 3 Adult members, 2 Youth members and 1 Senior member
- 3 Adult members, 1 Youth member and 2 Senior members
- 4 Adult members, 1 Youth member and 1 Senior member

Only in the first case the committee contains more Youth
members than Senior members

#${"align*"} &${P("\\text{required}")} \\\\ ${working} \\; ${QED}`,
	x`${p}.`,
);
