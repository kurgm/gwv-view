import * as React from "react";

import {Column} from "material-table";

import Glyph from "../Glyph";
import ValidateResult, {glyphColumnDef, kageLineColumnDef} from "../ValidateResult";

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
			getColumnDefs={getColumnDefs}
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
const getColumnDefs = (type: string): Column<IValue>[] => {
	switch (type) {
		case "1":
		case "2":
		case "10":
		case "12":
		case "22": {
			const columns: Column<IValueBuhin>[] = [
				{
					title: "グリフ名",
					...glyphColumnDef(0),
				},
				{
					title: "引用されているグリフ",
					...glyphColumnDef(1),
				},
			];
			return columns as Column<IValue>[];
		}
		case "6":
		case "15": {
			const columns: Column<IValueLineData>[] = [
				{
					title: "グリフ名",
					...glyphColumnDef(0),
				},
				{
					title: "最初の部品",
					sorting: false,
					render(item) {
						return <Glyph name={item[1][1].split(":")[7]} />;
					},
				},
			];
			return columns as Column<IValue>[];
		}
		default: {
			const columns: Column<IValueLineData>[] = [
				{
					title: "グリフ名",
					...glyphColumnDef(0),
				},
				{
					title: "最初に引用している行",
					...kageLineColumnDef(1),
				},
			];
			return columns as Column<IValue>[];
		}
	}
};

const validationItem = {id, title, Component: IdsComponent};
export default validationItem;
