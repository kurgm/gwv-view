import * as React from "react";

import Glyph from "../Glyph";
import KageLine from "../KageLine";
import ValidateResult from "../ValidateResult";

import {SimpleColumnHeader, SimpleColumnRow} from "../PagingTable";

type IValueWithoutLength = [string, KageLineData, KageLineData];
type IValueWithLength = [string, KageLineData, KageLineData, number];
type IValue = IValueWithoutLength | IValueWithLength;

class DupComponent extends React.Component<{ result: { [type: string]: IValue[] } | null }, {}> {
	public static id = "dup";
	public static title = "重複";

	public render() {
		return (
			<ValidateResult
				description={
					<p>
						筆画・部品の重複を検出します。同じグリフが別の名前で登録されているものについては
						<a href="https://kurgm.github.io/gw_duplicates/">GlyphWiki の重複するグリフ</a>
						をご覧ください。
					</p>
				}
				getGroupTitle={this.getGroupTitle}
				getTableHeaderRow={this.getTableHeaderRow}
				getRowRenderer={this.getRowRenderer}
				result={this.props.result}
			/>
		);
	}

	private getGroupTitle(type: string) {
		const titleMap: { [type: string]: string } = {
			10: "横画が重複しています。",
			11: "縦画が重複しています。",
			2: "曲線が重複しています。",
			3: "複曲線が重複しています。",
			9: "部品位置が重複しています。",
			99: "部品が重複しています。",
		};
		return titleMap[type];
	}
	private getTableHeaderRow(type: string) {
		const columns = ["グリフ名", "行1", "行2"];
		if (type === "10" || type === "11") {
			columns.push("重複");
		}
		return (
			<SimpleColumnHeader columns={columns} />
		);
	}
	private getRowRenderer(type: string) {
		if (type === "10" || type === "11") {
			return (props: { item: IValueWithLength }) => (
				<SimpleColumnRow columns={[
					<Glyph name={props.item[0]} />,
					<KageLine data={props.item[1]} />,
					<KageLine data={props.item[2]} />,
					props.item[3],
				]} />
			);
		}
		return (props: { item: IValueWithoutLength }) => (
			<SimpleColumnRow columns={[
				<Glyph name={props.item[0]} />,
				<KageLine data={props.item[1]} />,
				<KageLine data={props.item[2]} />,
			]} />
		);
	}
}

export default DupComponent;
