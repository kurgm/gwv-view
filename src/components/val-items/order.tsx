import * as React from "react";

import Glyph from "../Glyph";
import ValidateResult from "../ValidateResult";

import {SimpleColumnHeader, SimpleColumnRow} from "../PagingTable";

type IValue = [string, string]; // glyph name, buhin name

const id = "order";
const title = "部品の順序";

const OrderComponent: React.FunctionComponent<{ result: { [type: string]: IValue[] } | null }> = (props) => {
	return (
		<ValidateResult
			description={
				<p>
						-02, -04部品が最初に出現する/-01, -03部品が最後に出現するグリフを検出します。
				</p>
			}
			getGroupTitle={getGroupTitle}
			getTableHeaderRow={getTableHeaderRow}
			getRowRenderer={getRowRenderer}
			result={props.result}
		/>
	);
};

const getGroupTitle = (typeStr: string) => {
	const type = parseInt(typeStr, 10);
	const position = [null, "左", "右", "上", "下", "囲い結合の外", "囲い結合の中"][type % 10];
	return `${position}にくる部品が${type < 10 ? "最初" : "最後"}に引用されています。`;
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

const validationItem = {id, title, Component: OrderComponent};
export default validationItem;
