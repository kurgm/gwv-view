import * as React from "react";

import { Glyph, /*KageLine,*/ ValidateResult } from "../ValidateResult";

import { SimpleColumnHeader, SimpleColumnRow } from "../PagingTable";

type IValue = [string/*, TODO */];

class DupComponent extends React.Component<{ result: { [type: string]: IValue[]; } | null; }, {}> {
	public static id = "dup";
	public static title = "重複";

	public render() {
		return (
			<ValidateResult
				description={
					<p>
						筆画・部品の重複を検出します。同じグリフが別の名前で登録されているものについては<a href="https://kurgm.github.io/gw_duplicates/">GlyphWiki の重複するグリフ</a>をご覧ください。
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

export default DupComponent;
