import * as React from "react";

import { Glyph, /*KageLine,*/ ValidateResult } from "../ValidateResult";

import { SimpleColumnHeader, SimpleColumnRow } from "../PagingTable";

type IValue = [string/*, TODO */];

class MustrenewComponent extends React.Component<{ result: { [type: string]: IValue[]; } | null; }, {}> {
	public static id = "mustrenew";
	public static title = "旧部品の更新";

	public render() {
		return (
			<ValidateResult
				description={
					<p>
						旧版を引用しているグリフを検出します。この項目専用のページもどうぞ。→<a href="mustrenew.html">GlyphWiki の Mustrenew みたいなやつ</a>
					</p>
				}
				getGroupTitle={this.getGroupTitle}
				getTableHeaderRow={this.getTableHeaderRow}
				getRowRenderer={this.getRowRenderer}
				result={this.props.result}
			/>
		);
	}

	private getGroupTitle(_type: string): string {
		// TODO: implement this
		throw new Error("Not implemented yet");
	}
	private getTableHeaderRow(_type: string) {
		return (
			<SimpleColumnHeader columns={[
				"グリフ名",
				// TODO
			]} />
		);
	}
	private getRowRenderer(_type: string) {
		return (props: { item: IValue; }) => (
			<SimpleColumnRow columns={[
				<Glyph name={props.item[0]} />,
				// TODO
			]} />
		);
	}
}

export default MustrenewComponent;
