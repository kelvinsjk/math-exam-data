import type { Part, QnObject, Subpart } from "./types.js";
import { Qn } from "./qn.js";

/**
 * Helper class for creating a "question stack"
 * The actual Question-object is stored in the `question` property
 */
export class StackedQn {
	stack: Qn[];

	constructor(
		...args: (string|undefined|[string|undefined, { marks?: number; newpage?: boolean; source?: string }])[]
	) {
		this.stack = args.map((body) => Array.isArray(body) ? new Qn(body[0], body[1]) : new Qn(body));
	}

	addBody(
		...args: (string|string|[string, { marks?: number; newpage?: boolean; source?: string }])[]
	) {
		for (const [i, body] of args.entries()) {
			if (Array.isArray(body)) this.stack[i].addBody(body[0], body[1]); else this.stack[i].addBody(body);
		}
	}
	body = this.addBody;

	addPart(
		...args: (string|undefined|[string|undefined, { marks?: number; newpage?: boolean; uplevel?: string }])[]
	) {
		for (const [i, partBody] of args.entries()) {
			if (Array.isArray(partBody)) this.stack[i].addPart(partBody[0], partBody[1]); else this.stack[i].addPart(partBody);
		}
	}
	part = this.addPart;

	addSubpart(
		...args: (string|undefined|[string|undefined, { marks?: number; newpage?: boolean; uplevel?: string }])[]
	) {
		for (const [i, subpartBody] of args.entries()) {
			if (Array.isArray(subpartBody)) this.stack[i].addSubpart(subpartBody[0], subpartBody[1]); else this.stack[i].addSubpart(subpartBody);
		}
	}
	subpart = this.addSubpart;

	get marks(): number[] {
		return this.stack.map((qn) => qn.mark);
	}

	get data(): QnObject[] {
		return this.stack.map((qn) => qn.qn);
	}
}

/**
 * Helper class for creating questions.
 * Use the `questions` getter to get the actual Question-objects
 */
export class StackedQns {
	// questions stored as class instances
	stacks: StackedQn[] = [];

	addQn(stack?: StackedQn) {
		const qnStack = stack ?? new StackedQn();
		this.stacks.push(qnStack);
	}
	qn = this.addQn;

	addBody(
		...args: (string|[string, { marks?: number; newpage?: boolean; source?: string }])[]
	) {
		if (this.stacks.length === 0) this.addQn();
		for (const [i, body] of args.entries()) {
			this.stacks[i].addBody(body);
		}
	}
	body = this.addBody;

	addPart(
		...args: (string|undefined|[string|undefined, { marks?: number; newpage?: boolean; uplevel?: string }])[]
	) {
		if (this.stacks.length === 0) this.addQn();
		for (const [i, partBody] of args.entries()) {
			this.stacks[i].addPart(partBody);
		}
	}
	part = this.addPart;

	addSubpart(
		...args: (string|undefined|[string|undefined, { marks?: number; newpage?: boolean; uplevel?: string }])[]
	) {
		if (this.stacks.length === 0) this.addQn();
		for (const [i, subpartBody] of args.entries()) {
			this.stacks[i].addSubpart(subpartBody);
		}
	}
	subpart = this.addSubpart;

	get data(): QnObject[][] {
		return this.stacks.map((s) => s.data )
	}
}
