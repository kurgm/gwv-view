import * as React from "react";

import {Column} from "material-table";

import ValidateResult, {glyphColumnDef, kageLineColumnDef} from "../ValidateResult";

type IValueWithoutAngle = [string, KageLineData]; // glyph name, line data
type IValueWithAngle = [string, KageLineData, number]; // glyph name, line data, skew angle
type IValue = IValueWithoutAngle | IValueWithAngle;

const id = "skew";
const title = "歪んだ筆画";

const SkewComponent: React.FunctionComponent<{ result: { [type: string]: IValue[] } | null }> = (props) => {
	return (
		<ValidateResult
			description={
				<p>
						水平（垂直）に近いが水平（垂直）でない横画（縦画）、真っ直ぐでない縦払いを検出します。
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
		10: "横画が歪んでいます。",
		11: "縦画が歪んでいます。",
		30: "折れの後半が歪んでいます。",
		31: "折れの前半が歪んでいます。",
		40: "乙線の後半が歪んでいます。",
		70: "縦払いの前半（直線部分）が横になっています。",
		71: "縦払いの直線部分と曲線部分の間で折れ曲がっています。",
		72: "縦払いの直線部分が歪んでいます。",
	};
	return titleMap[type];
};
const getColumnDefs = (type: string): Column<IValue>[] => {
	if (type === "70") {
		const columns: Column<IValueWithoutAngle>[] = [
			{
				title: "グリフ名",
				...glyphColumnDef(0),
			},
			{
				title: "データ",
				...kageLineColumnDef(1),
			},
		];
		return columns as Column<IValue>[];
	}
	const columns: Column<IValueWithAngle>[] = [
		{
			title: "グリフ名",
			...glyphColumnDef(0),
		},
		{
			title: "角度",
			field: "2",
			type: "numeric",
			render(item) { return `${item[2]}°`; },
		},
		{
			title: "データ",
			...kageLineColumnDef(1),
		},
	];
	return columns as Column<IValue>[];
};

const validationItem = {id, title, Component: SkewComponent};
export default validationItem;
