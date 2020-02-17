import * as React from "react";

import {Column} from "material-table";

import Glyph from "../Glyph";
import ValidateResult, {glyphColumnDef} from "../ValidateResult";

type IValueInvalidMJ = [string];
type IValueUnset = [string, null, string[]];
type IValueIncorrect = [string, string, string[]];
type IValue = IValueInvalidMJ | IValueUnset | IValueIncorrect;

const id = "mj";
const title = "MJ文字情報一覧表";

const MjComponent: React.FunctionComponent<{ result: { [type: string]: IValue[] } | null }> = (props) => {
	return (
		<ValidateResult
			description={
				<p>
					<a href="http://mojikiban.ipa.go.jp/1311.html">MJ文字情報一覧表</a>
						(Ver.005.02)と照合して、不適切と思われるエイリアス・関連字を検出します。MJ文字情報一覧表は
					<a href="http://www.ipa.go.jp/">IPA</a>
						の著作物であり、
					<a href="https://creativecommons.org/licenses/by-sa/2.1/jp/">クリエイティブ・コモンズ 表示 – 継承 2.1 日本</a>
						ライセンスのもとで提供しています。
				</p>
			}
			getGroupTitle={getGroupTitle}
			getColumnDefs={getColumnDefs}
			result={props.result}
		/>
	);
};

const getGroupTitle = (type: string) => {
	const titleMap: { [type: string]: string } = {
		0: "エイリアス先が間違っていると思います。",
		1: "関連字が間違っていると思います。",
		2: "関連字が設定されていません。",
		3: "対応するMJ文字図形名は欠番です。",
	};
	return titleMap[type];
};
const getColumnDefs = (type: string): Column<IValue>[] => {
	switch (type as "0" | "1" | "2" | "3") {
		case "0":
		case "1": {
			const columns: Column<IValueIncorrect>[] = [
				{
					title: "グリフ名",
					...glyphColumnDef(0),
				},
				{
					title: type === "0" ? "現在の実体" : "現在の関連字",
					...glyphColumnDef(1),
				},
				{
					title: "提案",
					field: "2",
					render(item) {
						return item[2].map((name, i) => [i === 0 ? "" : "または", <Glyph name={name} key={i} />]);
					},
				},
			];
			return columns as Column<IValue>[];
		}
		case "2": {
			const columns: Column<IValueUnset>[] = [
				{
					title: "グリフ名",
					...glyphColumnDef(0),
				},
				{
					title: "提案",
					field: "2",
					render(item) {
						return item[2].map((name, i) => [i === 0 ? "" : "または", <Glyph name={name} key={i} />]);
					},
				},
			];
			return columns as Column<IValue>[];
		}
		case "3": {
			const columns: Column<IValueInvalidMJ>[] = [
				{
					title: "グリフ名",
					...glyphColumnDef(0),
				},
			];
			return columns as Column<IValue>[];
		}
	}
	return [];
};

const validationItem = {id, title, Component: MjComponent};
export default validationItem;
