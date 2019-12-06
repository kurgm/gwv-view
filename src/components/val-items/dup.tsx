import * as React from "react";

import Glyph from "../Glyph";
import KageLine from "../KageLine";
import ValidateResult from "../ValidateResult";

import {SimpleColumnHeader, SimpleColumnRow} from "../PagingTable";

type IValueWithoutLength = [string, KageLineData, KageLineData];
type IValueWithLength = [string, KageLineData, KageLineData, number];
type IValue = IValueWithoutLength | IValueWithLength;

const id = "dup";
const title = "重複";

const DupComponent: React.FunctionComponent<{ result: { [type: string]: IValue[] } | null }> = (props) => {
	return (
		<ValidateResult
			description={
				<p>
						筆画・部品の重複を検出します。同じグリフが別の名前で登録されているものについては
					<a href="https://kurgm.github.io/gw_duplicates/">GlyphWiki の重複するグリフ</a>
						をご覧ください。
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
		10: "横画が重複しています。",
		11: "縦画が重複しています。",
		2: "曲線が重複しています。",
		3: "複曲線が重複しています。",
		9: "部品位置が重複しています。",
		99: "部品が重複しています。",
	};
	return titleMap[type];
};
const getTableHeaderRow = (type: string) => {
	const columns = ["グリフ名", "行1", "行2"];
	if (type === "10" || type === "11") {
		columns.push("重複");
	}
	return (
		<SimpleColumnHeader columns={columns} />
	);
};
const getRowRenderer = (type: string) => {
	if (type === "10" || type === "11") {
		const RowRenderer = (props: { item: IValueWithLength }) => (
			<SimpleColumnRow columns={[
				<Glyph name={props.item[0]} />,
				<KageLine data={props.item[1]} />,
				<KageLine data={props.item[2]} />,
				props.item[3],
			]} />
		);
		return RowRenderer;
	}
	const RowRenderer = (props: { item: IValueWithoutLength }) => (
		<SimpleColumnRow columns={[
			<Glyph name={props.item[0]} />,
			<KageLine data={props.item[1]} />,
			<KageLine data={props.item[2]} />,
		]} />
	);
	return RowRenderer;
};

const validationItem = {id, title, Component: DupComponent};
export default validationItem;
