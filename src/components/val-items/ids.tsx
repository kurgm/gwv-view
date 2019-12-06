import * as React from "react";

import Glyph from "../Glyph";
import KageLine from "../KageLine";
import ValidateResult from "../ValidateResult";

import {SimpleColumnHeader, SimpleColumnRow} from "../PagingTable";

type IValueBuhin = [string, string];
type IValueLineData = [string, KageLineData];
type IValue = IValueBuhin | IValueLineData;

const id = "ids";
const title = "IDSとの不一致";

const IdsComponent: React.FunctionComponent<{ result: { [type: string]: IValue[] } | null }> = (props) => {
	return (
		<ValidateResult
			description={
				<p>
						グリフ名は「左+右」のIDSであるが実体が「上+下」であるグリフ（またはその逆）や、部品の順序がIDSと異なっているグリフを検出します。
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
		1: "左右型のIDSですが、上下結合の部品を（最初に）引用しています。",
		2: "-02の部品が最初に引用されています。",
		3: "左右型のIDSの左の字が最初に引用されていません。",
		6: "左右型のIDSですが、最初の部品が横長に配置されているようです。",
		10: "上下型のIDSですが、左右結合の部品を（最初に）引用しています。",
		12: "下側にくる部品が最初に引用されています。",
		13: "上下型のIDSの上の字が最初に引用されていません。",
		15: "上下型のIDSですが、最初の部品が縦長に配置されているようです。",
		22: "囲い型のIDSですが、内側にくる部品が最初に引用されています。",
		23: "囲い型のIDSの外側の字が最初に引用されていません。",
		33: "重ね型のIDSの1番目の字が最初に引用されていません。",
	};
	return titleMap[type];
};
const getTableHeaderRow = (type: string) => {
	let columns;
	switch (type) {
		case "1":
		case "2":
		case "10":
		case "12":
		case "22":
			columns = ["グリフ名", "引用されているグリフ"];
			break;
		case "6":
		case "15":
			columns = ["グリフ名", "最初の部品"];
			break;
		default:
			columns = ["グリフ名", "最初に引用している行"];
	}
	return (
		<SimpleColumnHeader columns={columns} />
	);
};
const getRowRenderer = (type: string) => {
	switch (type) {
		case "1":
		case "2":
		case "10":
		case "12":
		case "22": {
			const RowRenderer = (props: { item: IValueBuhin }) => (
				<SimpleColumnRow columns={[
					<Glyph name={props.item[0]} />,
					<Glyph name={props.item[1]} />,
				]} />
			);
			return RowRenderer;
		}
		case "6":
		case "15": {
			const RowRenderer = (props: { item: IValueLineData }) => (
				<SimpleColumnRow columns={[
					<Glyph name={props.item[0]} />,
					<Glyph name={props.item[1][1].split(":")[7]} />,
				]} />
			);
			return RowRenderer;
		}
		default: {
			const RowRenderer = (props: { item: IValueLineData }) => (
				<SimpleColumnRow columns={[
					<Glyph name={props.item[0]} />,
					<KageLine data={props.item[1]} />,
				]} />
			);
			return RowRenderer;
		}
	}
};

const validationItem = {id, title, Component: IdsComponent};
export default validationItem;
