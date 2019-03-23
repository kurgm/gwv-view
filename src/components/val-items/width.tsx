import * as React from "react";

import Glyph from "../Glyph";
import ValidateResult from "../ValidateResult";

import {SimpleColumnHeader, SimpleColumnRow} from "../PagingTable";

type IValue = [string];

class WidthComponent extends React.Component<{ result: { [type: string]: IValue[] } | null }, {}> {
	public static id = "width";
	public static title = "全角・半角";

	public render() {
		return (
			<ValidateResult
				description={
					<p>
						<a href="https://glyphwiki.org/wiki/Group:HalfwidthGlyphs">グループ:HalfwidthGlyphs</a>
						のサブグループのいずれかに含まれているかどうかとグリフが半角かどうかが一致しないものを検出します。
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
		const titleMap: { [type: string]: string } = {
			0: "グループ:NonSpacingGlyphs-Halfwidthに含まれていますが全角です。",
			1: "グループ:HalfwidthGlyphs-*に含まれていますが全角です。",
			2: "半角ですがグループ:HalfwidthGlyphs-*に含まれていません。",
		};
		return titleMap[type];
	}
	private getTableHeaderRow(_type: string) {
		return (
			<SimpleColumnHeader columns={[
				"グリフ名",
			]} />
		);
	}
	private getRowRenderer(_type: string) {
		return (props: { item: IValue }) => (
			<SimpleColumnRow columns={[
				<Glyph name={props.item[0]} />,
			]} />
		);
	}
}

export default WidthComponent;
