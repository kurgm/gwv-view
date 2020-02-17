import * as React from "react";

import {Column} from "material-table";

import Glyph from "../Glyph";
import ValidateResult, {glyphColumnDef} from "../ValidateResult";

type IValue = string[];

const id = "mustrenew";
const title = "旧部品の更新";

const MustrenewComponent: React.FunctionComponent<{ result: { [type: string]: IValue[] } | null }> = (props) => {
	return (
		<ValidateResult
			description={
				<p>
						旧版を引用しているグリフを検出します。この項目専用のページもどうぞ。→
					<a href="https://ku6goma.appspot.com/gwv/mustrenew.html">GlyphWiki の Mustrenew みたいなやつ</a>
				</p>
			}
			getGroupTitle={getGroupTitle}
			getColumnDefs={getColumnDefs}
			result={props.result}
		/>
	);
};

const getGroupTitle = (type: string) => {
	return type === "@" ? "最新版が旧部品を引用している部品" : "最新版が旧部品を引用していない部品";
};
const getColumnDefs = (_type: string): Column<IValue>[] => {
	return [
		{
			title: "旧部品",
			...glyphColumnDef<IValue, number>(0),
		},
		{
			title: "最新版",
			sorting: false,
			render(item) {
				return <Glyph name={item[0].split("@")[0]} />;
			},
		},
		{
			title: "引用しているグリフ数",
			sorting: false,
			type: "numeric",
			render(item) {
				return item.length - 1;
			},
		},
		{
			title: "一括更新",
			sorting: false,
			render(item) {
				return (
					<a href={`https://glyphwiki.org/wiki/Special:Mustrenew?view=listup&target=${item[0].split("@")[0]}`}>
						一括更新
					</a>
				);
			},
		},
	];
};

const validationItem = {id, title, Component: MustrenewComponent};
export default validationItem;
