import { parameters as p1q1 } from "./p1/data/q1.js";
import { parameters as p1q2 } from "./p1/data/q2.js";
import { parameters as p1q3 } from "./p1/data/q3.js";
import { parameters as p1q4 } from "./p1/data/q4.js";
import { parameters as p1q5 } from "./p1/data/q5.js";
import { parameters as p1q6 } from "./p1/data/q6.js";
import { parameters as p1q7 } from "./p1/data/q7.js";
import { parameters as p1q8 } from "./p1/data/q8.js";
import { parameters as p1q9 } from "./p1/data/q9.js";
import { parameters as p1q10 } from "./p1/data/q10.js";
import { parameters as p1q11 } from "./p1/data/q11.js";
import { parameters as p1q12 } from "./p1/data/q12.js";
import { parameters as p2q1 } from "./p2/data/q1.js";
import { parameters as p2q2 } from "./p2/data/q2.js";
import { parameters as p2q3 } from "./p2/data/q3.js";
import { parameters as p2q4 } from "./p2/data/q4.js";
import { parameters as p2q5 } from "./p2/data/q5.js";
import { parameters as p2q6 } from "./p2/data/q6.js";
import { parameters as p2q7 } from "./p2/data/q7.js";
import { parameters as p2q8 } from "./p2/data/q8.js";
import { parameters as p2q9 } from "./p2/data/q9.js";
import { parameters as p2q10 } from "./p2/data/q10.js";
import { parameters as p2q11 } from "./p2/data/q11.js";

const p2024p1 = {
	q1: { ...p1q1 },
	q2: { ...p1q2 },
	q3: { ...p1q3 },
	q4: { ...p1q4 },
	q5: { ...p1q5 },
	q6: { ...p1q6 },
	q7: { ...p1q7 },
	q8: { ...p1q8 },
	q9: { ...p1q9 },
	q10: { ...p1q10 },
	q11: { ...p1q11 },
	q12: { ...p1q12 },
} as const;
const p2024p2 = {
	q1: { ...p2q1 },
	q2: { ...p2q2 },
	q3: { ...p2q3 },
	q4: { ...p2q4 },
	q5: { ...p2q5 },
	q6: { ...p2q6 },
	q7: { ...p2q7 },
	q8: { ...p2q8 },
	q9: { ...p2q9 },
	q10: { ...p2q10 },
	q11: { ...p2q11 },
} as const;

export const p2024 = {
	p1: { ...p2024p1 },
	p2: { ...p2024p2 },
};
