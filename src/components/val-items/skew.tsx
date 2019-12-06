import * as React from "react";

import Glyph from "../Glyph";
import KageLine from "../KageLine";
import ValidateResult from "../ValidateResult";

import {SimpleColumnHeader, SimpleColumnRow} from "../PagingTable";

type IValueWithoutAngle = [string, KageLineData]; // glyph name, line data
type IValueWithAngle = [string, KageLineData, number]; // glyph name, line data, skew angle
type IValue = IValueWithoutAngle | IValueWithAngle;

const id = "skew";
const title = "歪んだ筆画";

const SkewComponent: React.FunctionComponent<{ result: { [type: string]: IValue[] } | null }> = (props) => {
	return (
		<ValidateResult
			description={
				<p>
						水平（垂直）に近いが水平（垂直）でない横画（縦画）、真っ直ぐでない縦払いを検出します。
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
		10: "横画が歪んでいます。",
		11: "縦画が歪んでいます。",
		30: "折れの後半が歪んでいます。",
		31: "折れの前半が歪んでいます。",
		40: "乙線の後半が歪んでいます。",
		70: "縦払いの前半（直線部分）が横になっています。",
		71: "縦払いの直線部分と曲線部分の間で折れ曲がっています。",
		72: "縦払いの直線部分が歪んでいます。",
	};
	return titleMap[type];
};
const getTableHeaderRow = (type: string) => {
	return (
		<SimpleColumnHeader columns={
			type === "70"
				? ["グリフ名", "データ"]
				: ["グリフ名", "角度", "データ"]
		} />
	);
};
const getRowRenderer = (type: string) => {
	if (type === "70") {
		const RowRenderer = (props: { item: IValueWithoutAngle }) => (
			<SimpleColumnRow columns={[
				<Glyph name={props.item[0]} />,
				<KageLine data={props.item[1]} />,
			]} />
		);
		return RowRenderer;
	}
	const RowRenderer = (props: { item: IValueWithAngle }) => (
		<SimpleColumnRow columns={[
			<Glyph name={props.item[0]} />,
			`${props.item[2]}°`,
			<KageLine data={props.item[1]} />,
		]} />
	);
	return RowRenderer;
};

const validationItem = {id, title, Component: SkewComponent};
export default validationItem;
