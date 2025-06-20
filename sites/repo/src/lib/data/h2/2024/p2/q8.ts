import { x } from "mathlifier";
import { StackedQn } from "sveltexam/helpers";
import { data } from "./data";

export const soln = new StackedQn();
const parameters = data.q8;
import { noBreak, QED } from "$lib/utils/typesetting";
import {
	unbiasedEstimatesMeanWorking,
	unbiasedEstimatesVarianceWorking,
	ZTest,
} from "mathlify/stats";
const { mu, n, sumX, sumX2, n2, time } = parameters;

// a
soln.addPart(
	x`Lee should carry out a one-tailed  ${QED}
	test because he is interested to test whether the mean number of birds has *reduced*`,
	x`Lee should carry out a one-tailed test
because he is interested to test whether the mean number of birds has *reduced*.`,
);

// b
const xBarWorking = unbiasedEstimatesMeanWorking(sumX, n);
const s2Working = unbiasedEstimatesVarianceWorking(sumX, sumX2, n);
export const xBar = xBarWorking.expression;
export const s2 = s2Working.expression;
const hypo = new ZTest({
	mu,
	n,
	xBar,
	s2,
	h1: "<",
});
soln.addPart(
	x`@${hypo.definitions(`number of birds visiting the feeder in ${time} minutes each morning`, { omitRV: true })}

@${hypo.hypotheses()} ${QED}`,
	x`@${hypo.hypotheses()}.`,
);

// c
const p = hypo.p();
const { alphaRange, working } = hypo.find.alpha(true);
export const alpha = Math.ceil(alphaRange.rhs.valueOf());
soln.addPart(
	x`#${"align*"} ${xBarWorking} \\; ${QED}

#${"align*"} ${s2Working} \\; ${QED}
	
@${hypo.distribution()}

By GC,
$${{}} p\\text{-value} = ${p.toPrecision(5)}

Since $H_0$ is rejected,
#${"align*"} ${working}

Since $\\alpha$ is an integer,
$${{}} \\text{Minimum integer } \\alpha = ${alpha} \\; ${QED}`,
	x`${noBreak("\\overline{x}=", xBar)}.
\\
${noBreak("s^2=", s2)}.
\\
Minimum integer ${noBreak("\\alpha=", alpha, ".")}`,
);

// d
const text = hypo.conclusion(
	true,
	"the mean number of birds visiting the new bird feeder while he eats his breakfast has reduced",
);
soln.addPart(x`@${text} ${QED}`, x`@${text}.`);

// e
const eText = `It is insufficient as the distribution of the number of birds visiting his feeder
is not known to be normal. Hence, for Lee to carry out his hypothesis test, he needs to use
Central Limit Theorem to justify that the mean number of birds visiting his feeder is normally
distributed approximately. $${noBreak("n=", n2, "<30")}$
so this sample size is not sufficient`;
soln.addPart(x`@${eText} ${QED}`, x`@${eText}.`);
