interface BaseQn {
	body?: string;
	marks?: number;
	newpage?: boolean;
}
export interface Subpart extends BaseQn {
	uplevel?: string;
}
export interface Part extends BaseQn {
	parts?: Subpart[];
	uplevel?: string;
}
export interface QnObject extends BaseQn {
	source?: string;
	parts?: Part[];
}
