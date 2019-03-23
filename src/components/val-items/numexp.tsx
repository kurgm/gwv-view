import * as React from "react";

import Glyph from "../Glyph";
import KageLine from "../KageLine";
import ValidateResult from "../ValidateResult";

import {SimpleColumnHeader, SimpleColumnRow} from "../PagingTable";

type IValue = [string, KageLineData];

class NumexpComponent extends React.Component<{ result: { [type: string]: IValue[] } | null }, {}> {
	public static id = "numexp";
	public static title = "数値の表現";

	public render() {
		return (
			<ValidateResult
				description={
					<p>
						ゼロ埋めしてある数値や空行を検出します。
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
			0: "空行があります。",
			1: "不正な文字があります。",
			2: "10進数の整数として解釈できない値があります。",
			3: "標準的でない数値の表記をしている値があります。",
		};
		return titleMap[type];
	}
	private getTableHeaderRow(_type: string) {
		return (
			<SimpleColumnHeader columns={[
				"グリフ名",
				"データ",
			]} />
		);
	}
	private getRowRenderer(_type: string) {
		return (props: { item: IValue }) => (
			<SimpleColumnRow columns={[
				<Glyph name={props.item[0]} />,
				<KageLine data={props.item[1]} />,
			]} />
		);
	}
}

export default NumexpComponent;
