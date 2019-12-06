import * as React from "react";

import Glyph from "../Glyph";
import KageLine from "../KageLine";
import ValidateResult from "../ValidateResult";

import {SimpleColumnHeader, SimpleColumnRow} from "../PagingTable";

type IValue = [string, KageLineData];

const id = "numexp";
const title = "数値の表現";

const NumexpComponent: React.FunctionComponent<{ result: { [type: string]: IValue[] } | null }> = (props) => {
	return (
		<ValidateResult
			description={
				<p>
						ゼロ埋めしてある数値や空行を検出します。
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
		0: "空行があります。",
		1: "不正な文字があります。",
		2: "10進数の整数として解釈できない値があります。",
		3: "標準的でない数値の表記をしている値があります。",
	};
	return titleMap[type];
};
const getTableHeaderRow = (_type: string) => {
	return (
		<SimpleColumnHeader columns={[
			"グリフ名",
			"データ",
		]} />
	);
};
const getRowRenderer = (_type: string) => {
	const RowRenderer = (props: { item: IValue }) => (
		<SimpleColumnRow columns={[
			<Glyph name={props.item[0]} />,
			<KageLine data={props.item[1]} />,
		]} />
	);
	return RowRenderer;
};

const validationItem = {id, title, Component: NumexpComponent};
export default validationItem;
