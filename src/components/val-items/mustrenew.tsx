import * as React from "react";

import Glyph from "../Glyph";
import ValidateResult from "../ValidateResult";

import {SimpleColumnHeader, SimpleColumnRow} from "../PagingTable";

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
			getTableHeaderRow={getTableHeaderRow}
			getRowRenderer={getRowRenderer}
			result={props.result}
		/>
	);
};

const getGroupTitle = (type: string) => {
	return type === "@" ? "最新版が旧部品を引用している部品" : "最新版が旧部品を引用していない部品";
};
const getTableHeaderRow = (_type: string) => {
	return (
		<SimpleColumnHeader columns={[
			"旧部品",
			"最新版",
			"引用しているグリフ数",
			"一括更新",
		]} />
	);
};
const getRowRenderer = (_type: string) => {
	const RowRenderer = (props: { item: IValue }) => {
		const newestname = props.item[0].split("@")[0];
		return (
			<SimpleColumnRow columns={[
				<Glyph name={props.item[0]} />,
				<Glyph name={newestname} />,
				props.item.length - 1,
				<a href={`https://glyphwiki.org/wiki/Special:Mustrenew?view=listup&target=${newestname}`}>
						一括更新
				</a>,
			]} />
		);
	};
	return RowRenderer;
};

const validationItem = {id, title, Component: MustrenewComponent};
export default validationItem;
