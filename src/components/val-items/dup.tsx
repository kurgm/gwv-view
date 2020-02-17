import * as React from "react";

import {Column} from "material-table";

import ValidateResult, {glyphColumnDef, kageLineColumnDef} from "../ValidateResult";

type IValueWithoutLength = [string, KageLineData, KageLineData];
type IValueWithLength = [string, KageLineData, KageLineData, number];
type IValue = IValueWithoutLength | IValueWithLength;

const id = "dup";
const title = "重複";

const DupComponent: React.FunctionComponent<{ result: { [type: string]: IValue[] } | null }> = (props) => {
	return (
		<ValidateResult
			description={
				<p>
						筆画・部品の重複を検出します。同じグリフが別の名前で登録されているものについては
					<a href="https://kurgm.github.io/gw_duplicates/">GlyphWiki の重複するグリフ</a>
						をご覧ください。
				</p>
			}
			getGroupTitle={getGroupTitle}
			getColumnDefs={getColumnDefs}
			result={props.result}
		/>
	);
};

const getGroupTitle = (type: string) => {
	const titleMap: { [type: string]: string } = {
		10: "横画が重複しています。",
		11: "縦画が重複しています。",
		2: "曲線が重複しています。",
		3: "複曲線が重複しています。",
		9: "部品位置が重複しています。",
		99: "部品が重複しています。",
	};
	return titleMap[type];
};
const getColumnDefs = (type: string): Column<IValue>[] => {
	const columns: Column<IValue>[] = [
		{
			title: "グリフ名",
			...glyphColumnDef(0),
		},
		{
			title: "行1",
			...kageLineColumnDef(1),
		},
		{
			title: "行2",
			...kageLineColumnDef(2),
		},
	];
	if (type === "10" || type === "11") {
		columns.push({
			title: "重複",
			field: "3",
			type: "numeric",
		});
	}
	return columns;
};

const validationItem = {id, title, Component: DupComponent};
export default validationItem;
