import * as React from "react";

import { Glyph, /*KageLine,*/ ValidateResult } from "../ValidateResult";

import { SimpleColumnHeader, SimpleColumnRow } from "../PagingTable";

type IValue = [string/*, TODO */];

class SkewComponent extends React.Component<{ result: { [type: string]: IValue[]; } | null; }, {}> {
	public static id = "skew";
	public static title = "歪んだ筆画";

	public render() {
		return (
			<ValidateResult
				description={
					<p>
						水平（垂直）に近いが水平（垂直）でない横画（縦画）、真っ直ぐでない縦払いを検出します。
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

export default SkewComponent;
