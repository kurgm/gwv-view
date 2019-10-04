import * as React from "react";

import Glyph from "../Glyph";
import ValidateResult from "../ValidateResult";

import {SimpleColumnHeader, SimpleColumnRow} from "../PagingTable";

type IValueIDS = [string, string]; // glyph name, parsed IDS structure
type IValueCDP = [string, string, string]; // glyph name, CDP glyph name, alternative UCS glyph name
type IValueNone = [string];
type IValue = IValueIDS | IValueCDP | IValueNone;

class NamingComponent extends React.Component<{ result: { [type: string]: IValue[] } | null }, {}> {
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

	private getGroupTitle = (type: string) => {
		const titleMap: { [type: string]: string } = {
			0: "規則に無いグリフ名です。",
			1: "不正なIDSです。",
			2: "許可されていないグリフ名です（欠番など）。",
			3: "IDS文字名にUCSで符号化されたCDP外字が含まれています。",
			4: "廃止予定の命名規則です。",
		};
		return titleMap[type];
	}
	private getTableHeaderRow = (type: string) => {
		return (
			<SimpleColumnHeader columns={
				type === "3"
					? ["グリフ名", "CDP外字", "UCS"]
					: ["グリフ名"]
			} />
		);
	}
	private getRowRenderer = (type: string) => {
		if (type === "3") {
			return (props: { item: IValueCDP }) => (
				<SimpleColumnRow columns={[
					<Glyph name={props.item[0]} />,
					<Glyph name={props.item[1]} />,
					<Glyph name={props.item[2]} />,
				]} />
			);
		}
		return (props: { item: IValueIDS | IValueNone }) => (
			<SimpleColumnRow columns={[
				<Glyph name={props.item[0]} />,
			]} />
		);
	}
}

export default NamingComponent;
