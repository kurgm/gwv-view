import * as React from "react";

import {Column} from "material-table";

import ValidateResult, {glyphColumnDef} from "../ValidateResult";

type IValueIDS = [string, string]; // glyph name, parsed IDS structure
type IValueCDP = [string, string, string]; // glyph name, CDP glyph name, alternative UCS glyph name
type IValueNone = [string];
type IValue = IValueIDS | IValueCDP | IValueNone;

const id = "naming";
const title = "命名";

const NamingComponent: React.FunctionComponent<{ result: { [type: string]: IValue[] } | null }> = (props) => {
	return (
		<ValidateResult
			description={
				<p>
						命名ガイドライン違反、IDSのエラーを検出します。命名規則は「
					<a href="https://glyphwiki.org/wiki/GlyphWiki:%E3%82%B0%E3%83%AA%E3%83%95%E3%81%AE%E6%95%B4%E7%90%86">
							GlyphWiki:グリフの整理
					</a>
						」や「
					<a href="https://glyphwiki.org/wiki/GlyphWiki:%E3%82%B0%E3%83%AA%E3%83%95%E3%81%AE%E8%AA%AC%E6%98%8E">
							GlyphWiki:グリフの説明
					</a>
						」、「
					<a href="https://glyphwiki.org/wiki/Group:prefix">Group:prefix</a>
						」などに挙げられているものを元にしています。
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
		0: "規則に無いグリフ名です。",
		1: "不正なIDSです。",
		2: "許可されていないグリフ名です（欠番など）。",
		3: "IDS文字名にUCSで符号化されたCDP外字が含まれています。",
		4: "廃止予定の命名規則です。",
	};
	return titleMap[type];
};
const getColumnDefs = (type: string): Column<IValue>[] => {
	if (type === "3") {
		const columns: Column<IValueCDP>[] = [
			{
				title: "グリフ名",
				...glyphColumnDef(0),
			},
			{
				title: "CDP外字",
				...glyphColumnDef(1),
			},
			{
				title: "UCS",
				...glyphColumnDef(2),
			},
		];
		return columns as Column<IValue>[];
	}
	const columns: Column<IValueIDS | IValueNone>[] = [
		{
			title: "グリフ名",
			...glyphColumnDef(0),
		},
	];
	return columns as Column<IValue>[];
};

const validationItem = {id, title, Component: NamingComponent};
export default validationItem;
