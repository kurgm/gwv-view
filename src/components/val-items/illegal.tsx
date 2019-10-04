import * as React from "react";

import Glyph from "../Glyph";
import KageLine from "../KageLine";
import ValidateResult from "../ValidateResult";

import {SimpleColumnHeader, SimpleColumnRow} from "../PagingTable";

type IValue = [string, string, KageLineData]; // glyph name, stroke type (?:?:?), line data

class IllegalComponent extends React.Component<{ result: { [type: string]: IValue[] } | null }, {}> {
	public static id = "illegal";
	public static title = "不正なデータ";

	public render() {
		return (
			<ValidateResult
				description={
					<p>
						「ありえない形状の組み合わせ」などを検出します。
					</p>
				}
				getGroupTitle={this.getGroupTitle}
				getTableHeaderRow={this.getTableHeaderRow}
				getRowRenderer={this.getRowRenderer}
				result={this.props.result}
			/>
		);
	}

	private getGroupTitle = (type: string) => {
		const titleMap: { [type: string]: string } = {
			0: "定義されていない筆画の種類です。",
			1: "列数が不足しています。",
			2: "列数が超過していて、0でない値です。",
			3: "列数が超過していて、0が入っています。",
			4: "不正な列数です。",
			5: "不正なデータです。",
			6: "ありえない形状の組み合わせです。",
			7: "エイリアスの書式が不正です。8列でなければなりません。",
			9: "部品位置が指定されているグリフです。",
			10: "横画に縦画用の接続形状が使用されています。",
			11: "縦画に接続(横)が使用されています。",
			30: "折れの前半が横になっています。",
			31: "折れの後半が縦になっています。",
			40: "乙線の前半が横になっています。",
			41: "乙線の後半が左向きです。",
		};
		return titleMap[type];
	}
	private getTableHeaderRow = (_type: string) => {
		return (
			<SimpleColumnHeader columns={["グリフ名", "データ"]} />
		);
	}
	private getRowRenderer = (_type: string) => {
		return (props: { item: IValue }) => (
			<SimpleColumnRow columns={[
				<Glyph name={props.item[0]} />,
				<KageLine data={props.item[2]} />,
			]} />
		);
	}
}

export default IllegalComponent;
