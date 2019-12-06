import * as React from "react";

import Glyph from "../Glyph";
import ValidateResult from "../ValidateResult";

import {SimpleColumnHeader, SimpleColumnRow} from "../PagingTable";

type IValue = [string];

const id = "width";
const title = "全角・半角";

const WidthComponent: React.FunctionComponent<{ result: { [type: string]: IValue[] } | null }> = (props) => {
	return (
		<ValidateResult
			description={
				<p>
					<a href="https://glyphwiki.org/wiki/Group:HalfwidthGlyphs">グループ:HalfwidthGlyphs</a>
						のサブグループのいずれかに含まれているかどうかとグリフが半角かどうかが一致しないものを検出します。
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
	const titleMap: { [type: string]: string } = {
		0: "グループ:NonSpacingGlyphs-Halfwidthに含まれていますが全角です。",
		1: "グループ:HalfwidthGlyphs-*に含まれていますが全角です。",
		2: "半角ですがグループ:HalfwidthGlyphs-*に含まれていません。",
	};
	return titleMap[type];
};
const getTableHeaderRow = (_type: string) => {
	return (
		<SimpleColumnHeader columns={[
			"グリフ名",
		]} />
	);
};
const getRowRenderer = (_type: string) => {
	const RowRenderer = (props: { item: IValue }) => (
		<SimpleColumnRow columns={[
			<Glyph name={props.item[0]} />,
		]} />
	);
	return RowRenderer;
};

const validationItem = {id, title, Component: WidthComponent};
export default validationItem;
