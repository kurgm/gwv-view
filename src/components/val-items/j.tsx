import * as React from "react";

import {Column} from "material-table";

import Glyph from "../Glyph";
import ValidateResult, {glyphColumnDef} from "../ValidateResult";

type IValueNone = [string];
type IValueSource = [string, string];
type IValueJVBuhin = [string, string, string];
type IValueJVJ = [string, "j" | "ja"];
type IValue = IValueNone | IValueSource | IValueJVBuhin | IValueJVJ;

const id = "j";
const title = "地域字形";

const JComponent: React.FunctionComponent<{ result: { [type: string]: IValue[] } | null }> = (props) => {
	return (
		<ValidateResult
			description={
				<p>
						地域ソースが存在しない地域指定グリフ、Jソースが存在する-jvのグリフ、Kソースが存在する-kvのグリフ、仮想J字形に使わない字形の部品が使われているuxxxx(-jv), irg2015-のグリフを検出します。
				</p>
			}
			getGroupTitle={getGroupTitle}
			getColumnDefs={getColumnDefs}
			result={props.result}
		/>
	);
};

const getGroupTitle = (typeStr: string) => {
	const type = Number(typeStr);
	if (type >= 30 && type <= 39) {
		const source = ["J", "K"][type - 30];
		return `${source}ソースが存在するのに、uxxxx-${source.toLowerCase()}vが作成されています。`;
	}
	const titleMap: { [type: string]: string } = {
		0: "uxxxx-j, ja, jv（の実体）とその無印グリフ（の実体）が異なっています。",
		1: "uxxxx-jvとuxxxx-j, jaが両方存在しています。",
		2: "uxxxx(-jv) / irg2015-##### のグリフに仮想J字形に使わない字形の部品が使用されています。",
		4: "指定された地域のソースは存在しません。",
		40: "指定された地域のソースは存在しません。",
		41: "指定された地域のソースは存在しません。（偏化変形）",
		5: "原規格分離漢字の取扱規則が適用される符号位置にはuxxxx-jvを作成できません。",
	};
	return titleMap[typeStr];
};
const getColumnDefs = (type: string): Column<IValue>[] => {
	switch (type as "0" | "1" | "2" | "4" | "40" | "41" | "5" | "30" | "31") {
		case "0":
		case "4":
		case "40":
		case "41":
		case "5": {
			const columns: Column<IValueNone>[] = [
				{
					title: "グリフ名",
					...glyphColumnDef(0),
				},
				{
					title: "無印グリフ",
					sorting: false,
					render(item) {
						return <Glyph name={item[0].split("-")[0]} />;
					}
				},
			];
			return columns as Column<IValue>[];
		}
		case "1": {
			const columns: Column<IValueJVJ>[] = [
				{
					title: "グリフ名",
					...glyphColumnDef(0),
				},
				{
					title: "jまたはja",
					sorting: false,
					render(item) {
						return <Glyph name={`${item[0]}-${item[1]}`} />;
					}
				},
			];
			return columns as Column<IValue>[];
		}
		case "2": {
			const columns: Column<IValueJVBuhin>[] = [
				{
					title: "グリフ名",
					...glyphColumnDef(0),
				},
				{
					title: "使わない部品",
					...glyphColumnDef(1),
				},
				{
					title: "使う部品",
					...glyphColumnDef(2),
				},
			];
			return columns as Column<IValue>[];
		}
		case "30":
		case "31": {
			const columns: Column<IValueSource>[] = [
				{
					title: "グリフ名",
					...glyphColumnDef(0),
				},
				{
					title: "無印グリフ",
					sorting: false,
					render(item) {
						return <Glyph name={item[0].split("-")[0]} />;
					}
				},
				{
					title: "ソース",
					field: "1",
				},
			];
			return columns as Column<IValue>[];
		}
	}
	return [];
};

const validationItem = {id, title, Component: JComponent};
export default validationItem;
