import * as React from "react";

import { Glyph, /*KageLine,*/ ValidateResult } from "../ValidateResult";

import { SimpleColumnHeader, SimpleColumnRow } from "../PagingTable";

type IValue = [string/*, TODO */];

class MjComponent extends React.Component<{ result: { [type: string]: IValue[]; } | null; }, {}> {
	public static id = "mj";
	public static title = "MJ文字情報一覧表";

	public render() {
		return (
			<ValidateResult
				description={
					<p>
						<a href="http://mojikiban.ipa.go.jp/1311.html">MJ文字情報一覧表</a>
						(Ver.005.01)と照合して、不適切と思われるエイリアス・関連字を検出します。MJ文字情報一覧表は
						<a href="http://www.ipa.go.jp/">IPA</a>
						の著作物であり、
						<a href="https://creativecommons.org/licenses/by-sa/2.1/jp/">クリエイティブ・コモンズ 表示 – 継承 2.1 日本</a>
						ライセンスのもとで提供しています。
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

export default MjComponent;
