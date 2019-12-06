import * as React from "react";

import Glyph from "../Glyph";
import ValidateResult from "../ValidateResult";

import {SimpleColumnHeader, SimpleColumnRow} from "../PagingTable";

type IValue = [string, string]; // glyph name, buhin name

const id = "delquote";
const title = "削除された部品";

const DelquoteComponent: React.FunctionComponent<{ result: { [type: string]: IValue[] } | null }> = (props) => {
	return (
		<ValidateResult
			description={
				<p>
						最新版が削除されているグリフを引用しているグリフを検出します。
				</p>
			}
			getGroupTitle={getGroupTitle}
			getTableHeaderRow={getTableHeaderRow}
			getRowRenderer={getRowRenderer}
			result={props.result}
		/>
	);
};

const getGroupTitle = (_type: string) => {
	return "最新版が存在しない部品を引用しています。";
};
const getTableHeaderRow = (_type: string) => {
	return (
		<SimpleColumnHeader columns={[
			"グリフ名",
			"引用されている部品",
		]} />
	);
};
const getRowRenderer = (_type: string) => {
	const RowRenderer = (props: { item: IValue }) => (
		<SimpleColumnRow columns={[
			<Glyph name={props.item[0]} />,
			<Glyph name={props.item[1]} />,
		]} />
	);
	return RowRenderer;
};

const validationItem = {id, title, Component: DelquoteComponent};
export default validationItem;
