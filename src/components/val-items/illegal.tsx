import * as React from "react";

import {Column} from "material-table";

import ValidateResult, {glyphColumnDef, kageLineColumnDef} from "../ValidateResult";

type IValue = [string, string, KageLineData]; // glyph name, stroke type (?:?:?), line data

const id = "illegal";
const title = "不正なデータ";

const IllegalComponent: React.FunctionComponent<{ result: { [type: string]: IValue[] } | null }> = (props) => {
	return (
		<ValidateResult
			description={
				<p>
						「ありえない形状の組み合わせ」などを検出します。
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
		0: "定義されていない筆画の種類です。",
		1: "列数が不足しています。",
		2: "列数が超過していて、0でない値です。",
		3: "列数が超過していて、0が入っています。",
		4: "不正な列数です。",
		5: "不正なデータです。",
		6: "ありえない形状の組み合わせです。",
		7: "エイリアスの書式が不正です。8列でなければなりません。",
		9: "部品位置が指定されているグリフです。",
		10: "横画に縦画用の接続形状が使用されています。",
		11: "縦画に接続(横)が使用されています。",
		30: "折れの前半が横になっています。",
		31: "折れの後半が縦になっています。",
		40: "乙線の前半が横になっています。",
		41: "乙線の後半が左向きです。",
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
			...kageLineColumnDef(2),
		},
	];
};

const validationItem = {id, title, Component: IllegalComponent};
export default validationItem;
