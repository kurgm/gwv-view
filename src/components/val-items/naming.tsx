import * as React from "react";

import { Glyph, /*KageLine,*/ ValidateResult } from "../ValidateResult";

import { SimpleColumnHeader, SimpleColumnRow } from "../PagingTable";

type IValue = [string/*, TODO */];

class NamingComponent extends React.Component<{ result: { [type: string]: IValue[]; } | null; }, {}> {
	public static id = "naming";
	public static title = "命名";

	public render() {
		return (
			<ValidateResult
				description={
					<p>
						命名ガイドライン違反、IDSのエラーを検出します。命名規則は「
						<a href="https://glyphwiki.org/wiki/GlyphWiki:%E3%82%B0%E3%83%AA%E3%83%95%E3%81%AE%E6%95%B4%E7%90%86">
							GlyphWiki:グリフの整理
						</a>
						」や「
						<a href="https://glyphwiki.org/wiki/GlyphWiki:%E3%82%B0%E3%83%AA%E3%83%95%E3%81%AE%E8%AA%AC%E6%98%8E">
							GlyphWiki:グリフの説明
						</a>
						」、「
						<a href="https://glyphwiki.org/wiki/Group:prefix">Group:prefix</a>
						」などに挙げられているものを元にしています。
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

export default NamingComponent;
