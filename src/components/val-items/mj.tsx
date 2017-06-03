import * as React from "react";

import { Glyph, /*KageLine,*/ ValidateResult } from "../ValidateResult";

import { SimpleColumnHeader, SimpleColumnRow } from "../PagingTable";

type IValueInvalidMJ = [string];
type IValueUnset = [string, null, string[]];
type IValueIncorrect = [string, string, string[]];
type IValue = IValueInvalidMJ | IValueUnset | IValueIncorrect;

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

	private getGroupTitle(type: string) {
		return ({
			0: "エイリアス先が間違っていると思います。",
			1: "関連字が間違っていると思います。",
			2: "関連字が設定されていません。",
			3: "対応するMJ文字図形名は欠番です。",
		} as { [type: string]: string; })[type];
	}
	private getTableHeaderRow(type: string) {
		const columns = (() => {
			switch (type as "0" | "1" | "2" | "3") {
				case "0":
					return ["グリフ名", "現在の実体", "提案"];
				case "1":
					return ["グリフ名", "現在の関連字", "提案"];
				case "2":
					return ["グリフ名", "提案"];
				case "3":
					return ["グリフ名"];
			}
		})();
		return (
			<SimpleColumnHeader columns={columns} />
		);
	}
	private getRowRenderer(type: string) {
		switch (type as "0" | "1" | "2" | "3") {
			case "0":
			case "1":
				return (props: { item: IValueIncorrect; }) => (
					<SimpleColumnRow columns={[
						<Glyph name={props.item[0]} />,
						<Glyph name={props.item[1]} />,
						props.item[2].map((name, i) => [i === 0 ? "" : "または", <Glyph name={name} key={i} />]),
					]} />
				);
			case "2":
				return (props: { item: IValueUnset; }) => (
					<SimpleColumnRow columns={[
						<Glyph name={props.item[0]} />,
						props.item[2].map((name, i) => [i === 0 ? "" : "または", <Glyph name={name} key={i} />]),
					]} />
				);
			case "3":
				return (props: { item: IValueInvalidMJ; }) => (
					<SimpleColumnRow columns={[
						<Glyph name={props.item[0]} />,
					]} />
				);
		}
	}
}

export default MjComponent;
