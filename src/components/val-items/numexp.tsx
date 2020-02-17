import * as React from "react";

import {Column} from "material-table";

import ValidateResult, {glyphColumnDef, kageLineColumnDef} from "../ValidateResult";

type IValue = [string, KageLineData];

const id = "numexp";
const title = "数値の表現";

const NumexpComponent: React.FunctionComponent<{ result: { [type: string]: IValue[] } | null }> = (props) => {
	return (
		<ValidateResult
			description={
				<p>
						ゼロ埋めしてある数値や空行を検出します。
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
		0: "空行があります。",
		1: "不正な文字があります。",
		2: "10進数の整数として解釈できない値があります。",
		3: "標準的でない数値の表記をしている値があります。",
	};
	return titleMap[type];
};
const getColumnDefs = (_type: string): Column<IValue>[] => {
	return [
		{
			title: "グリフ名",
			...glyphColumnDef(0),
		},
		{
			title: "データ",
			...kageLineColumnDef(1),
		},
	];
};

const validationItem = {id, title, Component: NumexpComponent};
export default validationItem;
