import * as React from "react";

import Glyph from "../Glyph";
import ValidateResult from "../ValidateResult";

import { SimpleColumnHeader, SimpleColumnRow } from "../PagingTable";

type IValue = string[];

class RelatedComponent extends React.Component<{ result: { [type: string]: IValue[]; } | null; }, {}> {
	public static id = "related";
	public static title = "関連字";

	public render() {
		return (
			<ValidateResult
				description={
					<p>
						グリフ名と関連字データの不一致を検出します。
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
		const type = parseInt(typeStr, 10);
		const header = type >= 10 ? "実体の" : "";
		switch (type % 10 as 0 | 1 | 2) {
			case 0:
				return header + "関連字が間違っています。";
			case 1:
				return header + "関連字が設定されていません。";
			case 2:
				return "実体が存在しません。";
		}
	}
	private getTableHeaderRow(typeStr: string) {
		const type = parseInt(typeStr, 10);
		let columns = type >= 10 ? ["グリフ名", "実体"] : ["グリフ名"];
		switch (type % 10) {
			case 0:
				columns = columns.concat(["現在の関連字", "正しい関連字"]);
				break;
			case 1:
				columns = columns.concat(["正しい関連字"]);
				break;
			case 2:
				columns = columns.concat(["存在しない実体"]);
				break;
		}
		return (
			<SimpleColumnHeader columns={columns} />
		);
	}
	private getRowRenderer(_type: string) {
		return (props: { item: IValue; }) => (
			<SimpleColumnRow columns={props.item.map((name, i) => (
				<Glyph name={name} key={i} />
			))} />
		);
	}
}

export default RelatedComponent;
