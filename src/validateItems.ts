export interface NumberCell {
	type: "number";
	options?: Intl.NumberFormatOptions;
}

export type TabularCellType = "glyphname" | "glyphnames" | "kageline" | "quotedpart" | "text" | "number" | NumberCell | "ignore";

export interface TabularColumn {
	type: TabularCellType;
	label?: string;
}

export interface TabularRowEntry {
	type: "tabular";
	columns: TabularColumn[];
}

export interface HeadTailEntry {
	type: "headtail";
	headLabel: string;
	headType: TabularCellType;
	tailLabel: string;
	tailType: "glyphname";
}

export interface MustrenewEntry {
	type: "mustrenew";
}

export type ValidateItemEntryType = TabularRowEntry | HeadTailEntry | MustrenewEntry;

export interface ValidateItem {
	validatorName: string;
	errorCode: string;
	title: string;
	entryType: ValidateItemEntryType;
}

export const validateItems: ValidateItem[] = [
];

export interface ValidatorDesc {
	name: string;
	title: string;
}

export const validators: ValidatorDesc[] = [
];
