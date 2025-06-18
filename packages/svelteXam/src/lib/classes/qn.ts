import type { Part, QnObject, Subpart } from "./types.js";

/**
 * Helper class for creating a question.
 * The actual Question-object is stored in the `question` property
 */
export class Qn {
	qn: QnObject = {};

	constructor(
		body: string | undefined = undefined,
		options: { marks?: number; newpage?: boolean; source?: string } = {},
	) {
		if (body) this.qn.body = body;
		if (options.marks) this.qn.marks = options.marks;
		if (options.newpage) this.qn.newpage = options.newpage;
		if (options.source) this.qn.source = options.source;
	}

	addBody(
		body: string,
		options: { marks?: number; newpage?: boolean; source?: string } = {},
	) {
		this.qn.body = body;
		if (options.marks) this.qn.marks = options.marks;
		if (options.newpage) this.qn.newpage = options.newpage;
		if (options.source) this.qn.source = options.source;
	}
	body = this.addBody;

	addPart(
		partBody: string | undefined = undefined,
		options: { marks?: number; newpage?: boolean; uplevel?: string } = {},
	) {
		if (this.qn.parts === undefined) this.qn.parts = [];
		const part: Part = {};
		this.qn.parts.push(part);
		if (partBody) part.body = partBody;
		if (options.marks) part.marks = options.marks;
		if (options.newpage) part.newpage = options.newpage;
		if (options.uplevel) part.uplevel = options.uplevel;
	}
	part = this.addPart;

	addSubpart(
		subpartBody: string | undefined = undefined,
		options: { marks?: number; newpage?: boolean; uplevel?: string } = {},
	) {
		if (this.qn.parts === undefined) this.qn.parts = [];
		let part = this.qn.parts[this.qn.parts.length - 1];
		if (part === undefined) {
			part = {};
			this.qn.parts.push(part);
		}
		const subpart: Subpart = {};
		if (part.parts === undefined) part.parts = [];
		part.parts.push(subpart);
		if (subpartBody) subpart.body = subpartBody;
		if (options.marks) subpart.marks = options.marks;
		if (options.newpage) subpart.newpage = options.newpage;
		if (options.uplevel) subpart.uplevel = options.uplevel;
	}
	subpart = this.addSubpart;

	get mark(): number {
		let m = this.qn.marks ?? 0;
		for (const part of this.qn.parts ?? []) {
			m += part.marks ?? 0;
			for (const subpart of part.parts ?? []) {
				m += subpart.marks ?? 0;
			}
		}
		return m;
	}
}

/**
 * Helper class for creating questions.
 * Use the `questions` getter to get the actual Question-objects
 */
export class Qns {
	// questions stored as class instances
	_qns: Qn[] = [];

	addQn(question?: Qn | QnObject) {
		let qn: Qn;
		if (question === undefined) {
			qn = new Qn();
		} else if (question instanceof Qn) {
			qn = question;
		} else {
			qn = new Qn();
			qn.qn = question;
		}
		this._qns.push(qn);
	}
	qn = this.addQn;

	addBody(
		body: string,
		options: { marks?: number; newpage?: boolean; source?: string } = {},
	) {
		if (this._qns.length === 0) this.addQn();
		this._qns[this._qns.length - 1].addBody(body, options);
	}
	body = this.addBody;

	addPart(
		partBody: string | undefined = undefined,
		options: { marks?: number; newpage?: boolean; uplevel?: string } = {},
	) {
		if (this._qns.length === 0) this.addQn();
		this._qns[this._qns.length - 1].addPart(partBody, options);
	}
	part = this.addPart;

	addSubpart(
		subpartBody: string | undefined = undefined,
		options: { marks?: number; newpage?: boolean; uplevel?: string } = {},
	) {
		if (this._qns.length === 0) this.addQn();
		this._qns[this._qns.length - 1].addSubpart(
			subpartBody,
			options,
		);
	}
	subpart = this.addSubpart;

	get marks(): number {
		return this._qns.reduce((a, b) => a + b.mark, 0);
	}

	get qns(): QnObject[] {
		return this._qns.map((q) => q.qn);
	}
}
