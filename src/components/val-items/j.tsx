import * as React from "react";

import Glyph from "../Glyph";
import ValidateResult from "../ValidateResult";

import { SimpleColumnHeader, SimpleColumnRow } from "../PagingTable";

type IValueNone = [string];
type IValueSource = [string, string];
type IValueJVBuhin = [string, string, string];
type IValueJVJ = [string, "j" | "ja"];
type IValue = IValueNone | IValueSource | IValueJVBuhin | IValueJVJ;

class JComponent extends React.Component<{ result: { [type: string]: IValue[]; } | null; }, {}> {
	public static id = "j";
	public static title = "地域字形";

	public render() {
		return (
			<ValidateResult
				description={
					<p>
						地域ソースが存在しない地域指定グリフ、Jソースが存在する-jvのグリフ、Kソースが存在する-kvのグリフ、仮想J字形に使わない字形の部品が使われているuxxxx(-jv), irg2015-のグリフを検出します。
					</p>
				}
				getGroupTitle={this.getGroupTitle}
				getTableHeaderRow={this.getTableHeaderRow}
				getRowRenderer={this.getRowRenderer}
				result={this.props.result}
			/>
		);
	}

	private getGroupTitle(typeStr: string) {
		const type = Number(typeStr);
		if (30 <= type && type <= 39) {
			const source = ["J", "K"][type - 30];
			return `${source}ソースが存在するのに、uxxxx-${source.toLowerCase()}vが作成されています。`;
		}
		return ({
			0: "uxxxx-j, ja, jv（の実体）とその無印グリフ（の実体）が異なっています。",
			1: "uxxxx-jvとuxxxx-j, jaが両方存在しています。",
			2: "uxxxx(-jv) / irg2015-##### のグリフに仮想J字形に使わない字形の部品が使用されています。",
			4: "指定された地域のソースは存在しません。",
			40: "指定された地域のソースは存在しません。",
			41: "指定された地域のソースは存在しません。（偏化変形）",
			5: "原規格分離漢字の取扱規則が適用される符号位置にはuxxxx-jvを作成できません。",
		} as { [type: string]: string; })[typeStr];
	}
	private getTableHeaderRow(type: string) {
		const columns = (() => {
			switch (type as "0" | "1" | "2" | "4" | "40" | "41" | "5" | "30" | "31") {
				case "0":
				case "4":
				case "40":
				case "41":
				case "5":
					return ["グリフ名", "無印グリフ"];
				case "1":
					return ["グリフ名", "jまたはja"];
				case "2":
					return ["グリフ名", "使わない部品", "使う部品"];
				case "30":
				case "31":
					return ["グリフ名", "無印グリフ", "ソース"];
			}
		})();
		return (
			<SimpleColumnHeader columns={columns} />
		);
	}
	private getRowRenderer(type: string) {
		switch (type as "0" | "1" | "2" | "4" | "40" | "41" | "5" | "30" | "31") {
			case "0":
			case "4":
			case "40":
			case "41":
			case "5":
				return (props: { item: IValueNone; }) => (
					<SimpleColumnRow columns={[
						<Glyph name={props.item[0]} />,
						<Glyph name={props.item[0].split("-")[0]} />,
					]} />
				);
			case "1":
				return (props: { item: IValueJVJ; }) => (
					<SimpleColumnRow columns={[
						<Glyph name={props.item[0]} />,
						<Glyph name={`${props.item[0]}-${props.item[1]}`} />,
					]} />
				);
			case "2":
				return (props: { item: IValueJVBuhin; }) => (
					<SimpleColumnRow columns={[
						<Glyph name={props.item[0]} />,
						<Glyph name={props.item[1]} />,
						<Glyph name={props.item[2]} />,
					]} />
				);
			case "30":
			case "31":
				return (props: { item: IValueSource; }) => (
					<SimpleColumnRow columns={[
						<Glyph name={props.item[0]} />,
						<Glyph name={props.item[0].split("-")[0]} />,
						props.item[1],
					]} />
				);
		}
	}
}

export default JComponent;
