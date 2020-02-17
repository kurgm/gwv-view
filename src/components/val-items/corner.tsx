import * as React from "react";

import {Column} from "material-table";

import ValidateResult, {glyphColumnDef, kageLineColumnDef} from "../ValidateResult";

type IValue = [string, KageLineData, KageLineData]; // glyph name, tate, yoko

const id = "corner";
const title = "カド形状・接続";

const CornerComponent: React.FunctionComponent<{ result: { [type: string]: IValue[] } | null }> = (props) => {
	return (
		<ValidateResult
			description={
				<p>
						データ上のカド形状と実際の筆画の位置関係との不整合や、近接しているが接続していないカド・接続を検出します。
				</p>
			}
			getGroupTitle={getGroupTitle}
			getColumnDefs={getColumnDefs}
			result={props.result}
		/>
	);
};

const getGroupTitle = (typeStr: string) => {
	const cornerTypes = [
		"左上カド",
		"左下カド",
		"右上カド",
		"右下カド",
		"左下zh用旧カド",
		"擬似右下H/Tカド",
		"左下zh用新カド",
		"接続(横)",
		"開放",
		"接続(縦)",
		"右下H/Tカド",
	];
	const type = parseInt(typeStr, 16);
	const usedCornerType = cornerTypes[type & 0x0f];
	const guessedCornerType = cornerTypes[type >> 4];
	switch (type) {
		case 0x14:
		case 0x16:
		case 0x61:
			return `${usedCornerType}形状が使用されていますが、${guessedCornerType}形状を使用するべきかもしれません。`;
		case 0x19:
			return "左下カドに接続(縦)形状が使用されています。（左下zh用旧形状を使用するべきでしょう。）";
	}
	if (type % 0x11 === 0) {
		return `${usedCornerType}が離れています。`;
	}
	return `${guessedCornerType}に${usedCornerType}形状が使用されています。`;
};

const getColumnDefs = (_type: string): Column<IValue>[] => {
	return [
		{
			title: "グリフ名",
			...glyphColumnDef(0),
		},
		{
			title: "縦画",
			...kageLineColumnDef(1),
		},
		{
			title: "横画",
			...kageLineColumnDef(2),
		},
	];
};

const validationItem = {id, title, Component: CornerComponent};
export default validationItem;
