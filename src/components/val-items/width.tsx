import * as React from "react";

import { Glyph, /*KageLine,*/ ValidateResult } from "../ValidateResult";

import { SimpleColumnHeader, SimpleColumnRow } from "../PagingTable";

type IValue = [string/*, TODO */];

class WidthComponent extends React.Component<{ result: { [type: string]: IValue[]; } | null; }, {}> {
	public static id = "width";
	public static title = "全角・半角";

	public render() {
		return (
			<ValidateResult
				description={
					<p>
						<a href="https://glyphwiki.org/wiki/Group:HalfwidthGlyphs">グループ:HalfwidthGlyphs</a>
						に含まれているかどうかとグリフが半角かどうかが一致しないものを検出します。
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

export default WidthComponent;
