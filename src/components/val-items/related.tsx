import * as React from "react";

import {Column} from "material-table";

import ValidateResult, {glyphColumnDef} from "../ValidateResult";

type IValue = string[];

const id = "related";
const title = "関連字";

const RelatedComponent: React.FunctionComponent<{ result: { [type: string]: IValue[] } | null }> = (props) => {
	return (
		<ValidateResult
			description={
				<p>
						グリフ名と関連字データの不一致を検出します。
				</p>
			}
			getGroupTitle={getGroupTitle}
			getColumnDefs={getColumnDefs}
			result={props.result}
		/>
	);
};

const getGroupTitle = (typeStr: string) => {
	const type = parseInt(typeStr, 10);
	const header = type >= 10 ? "実体の" : "";
	switch (type % 10 as 0 | 1 | 2) {
		case 0:
			return `${header}関連字が間違っています。`;
		case 1:
			return `${header}関連字が設定されていません。`;
		case 2:
			return "実体が存在しません。";
	}
	return "";
};
const getColumnDefs = (typeStr: string): Column<IValue>[] => {
	const type = parseInt(typeStr, 10);
	let columns: Column<IValue>[] = type >= 10
		? [
			{
				title: "グリフ名",
				...glyphColumnDef<IValue, number>(0),
			},
			{
				title: "実体",
				...glyphColumnDef<IValue, number>(1),
			},
		]
		: [
			{
				title: "グリフ名",
				...glyphColumnDef<IValue, number>(0),
			},
		];
	const offset = columns.length;
	switch (type % 10) {
		case 0:
			columns = columns.concat([
				{
					title: "現在の関連字",
					...glyphColumnDef(offset + 0),
				},
				{
					title: "正しい関連字",
					...glyphColumnDef(offset + 1),
				},
			]);
			break;
		case 1:
			columns = columns.concat([
				{
					title: "正しい関連字",
					...glyphColumnDef(offset + 0),
				},
			]);
			break;
		case 2:
			columns = columns.concat([
				{
					title: "存在しない実体",
					...glyphColumnDef(offset + 0),
				},
			]);
			break;
	}
	return columns;
};

const validationItem = {id, title, Component: RelatedComponent};
export default validationItem;
