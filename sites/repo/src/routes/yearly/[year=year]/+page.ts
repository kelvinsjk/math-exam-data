import { qns as qns24p1 } from "$lib/data/h2/2024/p1/index";
import type { StackedQn } from "sveltexam";
import type { Year } from "../../../params/year";
import type { PageLoad } from "./$types";

const qnsArr: Record<Year, Record<"p1" | "p2", StackedQn[]>> = {
	"07": { p1: [], p2: [] },
	"08": { p1: [], p2: [] },
	"09": { p1: [], p2: [] },
	"10": { p1: [], p2: [] },
	"11": { p1: [], p2: [] },
	"12": { p1: [], p2: [] },
	"13": { p1: [], p2: [] },
	"14": { p1: [], p2: [] },
	"15": { p1: [], p2: [] },
	"16": { p1: [], p2: [] },
	"17": { p1: [], p2: [] },
	"18": { p1: [], p2: [] },
	"19": { p1: [], p2: [] },
	"20": { p1: [], p2: [] },
	"21": { p1: [], p2: [] },
	"22": { p1: [], p2: [] },
	"23": { p1: [], p2: [] },
	"24": {
		p1: qns24p1,
		p2: [],
	},
};

export const load: PageLoad = ({ params }) => {
	qnsArr;
	params.year;
	params.year;
	return {
		qns: qnsArr[params.year],
	};
};
