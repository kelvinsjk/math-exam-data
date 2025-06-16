import type { Part, QuestionObject, Subpart } from "./types.js";

/**
 * Helper class for creating a question.
 * The actual Question-object is stored in the `question` property
 */
export class Question {
	question: QuestionObject = {};

	constructor(
		body: string | undefined = undefined,
		options: { marks?: number; newpage?: boolean; source?: string } = {},
	) {
		if (body) this.question.body = body;
		if (options.marks) this.question.marks = options.marks;
		if (options.newpage) this.question.newpage = options.newpage;
		if (options.source) this.question.source = options.source;
	}

	addBody(
		body: string,
		options: { marks?: number; newpage?: boolean; source?: string } = {},
	) {
		this.question.body += body;
		if (options.marks) this.question.marks = options.marks;
		if (options.newpage) this.question.newpage = options.newpage;
		if (options.source) this.question.source = options.source;
	}
	body = this.addBody;

	addPart(
		partBody: string | undefined = undefined,
		options: { marks?: number; newpage?: boolean; uplevel?: string } = {},
	) {
		if (this.question.parts === undefined) this.question.parts = [];
		const part: Part = {};
		this.question.parts.push(part);
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
		if (this.question.parts === undefined) this.question.parts = [];
		let part = this.question.parts[this.question.parts.length - 1];
		if (part === undefined) {
			part = {};
			this.question.parts.push(part);
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

	get marks(): number {
		let mark = this.question.marks ?? 0;
		for (const part of this.question.parts ?? []) {
			mark += part.marks ?? 0;
			for (const subpart of part.parts ?? []) {
				mark += subpart.marks ?? 0;
			}
		}
		return mark;
	}
}

/**
 * Helper class for creating questions.
 * Use the `questions` getter to get the actual Question-objects
 */
export class Questions {
	// questions stored as class instances
	_questions: Question[] = [];

	addQuestion(question?: Question | QuestionObject) {
		let qn: Question;
		if (question === undefined) {
			qn = new Question();
		} else if (question instanceof Question) {
			qn = question;
		} else {
			qn = new Question();
			qn.question = question;
		}
		this._questions.push(qn);
	}
	qn = this.addQuestion;

	addBody(
		body: string,
		options: { marks?: number; newpage?: boolean; source?: string } = {},
	) {
		if (this._questions.length === 0) this.addQuestion();
		this._questions[this._questions.length - 1].addBody(body, options);
	}
	body = this.addBody;

	addPart(
		partBody: string | undefined = undefined,
		options: { marks?: number; newpage?: boolean; uplevel?: string } = {},
	) {
		if (this._questions.length === 0) this.addQuestion();
		this._questions[this._questions.length - 1].addPart(partBody, options);
	}
	part = this.addPart;

	addSubpart(
		subpartBody: string | undefined = undefined,
		options: { marks?: number; newpage?: boolean; uplevel?: string } = {},
	) {
		if (this._questions.length === 0) this.addQuestion();
		this._questions[this._questions.length - 1].addSubpart(
			subpartBody,
			options,
		);
	}
	subpart = this.addSubpart;

	get marks(): number {
		return this._questions.reduce((a, b) => a + b.marks, 0);
	}

	get questions(): QuestionObject[] {
		return this._questions.map((q) => q.question);
	}
}
