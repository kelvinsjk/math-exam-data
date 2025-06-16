interface BaseQuestion {
	body?: string;
	marks?: number;
	newpage?: boolean;
}
export interface Subpart extends BaseQuestion {
	uplevel?: string;
}
export interface Part extends BaseQuestion {
	parts?: Subpart[];
	uplevel?: string;
}
export interface QuestionObject extends BaseQuestion {
	source?: string;
	parts?: Part[];
}
