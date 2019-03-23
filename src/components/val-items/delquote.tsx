import * as React from "react";

import Glyph from "../Glyph";
import ValidateResult from "../ValidateResult";

import {SimpleColumnHeader, SimpleColumnRow} from "../PagingTable";

type IValue = [string, string]; // glyph name, buhin name

class DelquoteComponent extends React.Component<{ result: { [type: string]: IValue[] } | null }, {}> {
	public static id = "delquote";
	public static title = "削除された部品";

	public render() {
		return (
			<ValidateResult
				description={
					<p>
						最新版が削除されているグリフを引用しているグリフを検出します。
					</p>
				}
				getGroupTitle={this.getGroupTitle}
				getTableHeaderRow={this.getTableHeaderRow}
				getRowRenderer={this.getRowRenderer}
				result={this.props.result}
			/>
		);
	}

	private getGroupTitle(_type: string) {
		return "最新版が存在しない部品を引用しています。";
	}
	private getTableHeaderRow(_type: string) {
		return (
			<SimpleColumnHeader columns={[
				"グリフ名",
				"引用されている部品",
			]} />
		);
	}
	private getRowRenderer(_type: string) {
		return (props: { item: IValue }) => (
			<SimpleColumnRow columns={[
				<Glyph name={props.item[0]} />,
				<Glyph name={props.item[1]} />,
			]} />
		);
	}
}

export default DelquoteComponent;
