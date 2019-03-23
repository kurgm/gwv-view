import * as React from "react";

import Glyph from "../Glyph";
import ValidateResult from "../ValidateResult";

import {SimpleColumnHeader, SimpleColumnRow} from "../PagingTable";

type IValue = string[];

class MustrenewComponent extends React.Component<{ result: { [type: string]: IValue[] } | null }, {}> {
	public static id = "mustrenew";
	public static title = "旧部品の更新";

	public render() {
		return (
			<ValidateResult
				description={
					<p>
						旧版を引用しているグリフを検出します。この項目専用のページもどうぞ。→
						<a href="https://ku6goma.appspot.com/gwv/mustrenew.html">GlyphWiki の Mustrenew みたいなやつ</a>
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
		return type === "@" ? "最新版が旧部品を引用している部品" : "最新版が旧部品を引用していない部品";
	}
	private getTableHeaderRow(_type: string) {
		return (
			<SimpleColumnHeader columns={[
				"旧部品",
				"最新版",
				"引用しているグリフ数",
				"一括更新",
			]} />
		);
	}
	private getRowRenderer(_type: string) {
		return (props: { item: IValue }) => {
			const newestname = props.item[0].split("@")[0];
			return (
				<SimpleColumnRow columns={[
					<Glyph name={props.item[0]} />,
					<Glyph name={newestname} />,
					props.item.length - 1,
					<a href={`https://glyphwiki.org/wiki/Special:Mustrenew?view=listup&target=${newestname}`}>
						一括更新
					</a>,
				]} />
			);
		};
	}
}

export default MustrenewComponent;
