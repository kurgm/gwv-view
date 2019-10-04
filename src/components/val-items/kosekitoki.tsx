import * as React from "react";

import Glyph from "../Glyph";
import ValidateResult from "../ValidateResult";

import {SimpleColumnHeader, SimpleColumnRow} from "../PagingTable";

type IValue = string[];

class KosekitokiComponent extends React.Component<{ result: { [type: string]: IValue[] } | null }, {}> {
	public static id = "kosekitoki";
	public static title = "kosekiとtoki-00";

	public render() {
		return (
			<ValidateResult
				description={
					<p>
						koseki-######のエイリアスになっていないtoki-00######を検出します。
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
			0: "エイリアスになっていません。",
			1: "koseki-xxxxxxのエイリアスになっていません。",
			2: "koseki-xxxxxxと異なるエイリアスです。",
		};
		return titleMap[type];
	}
	private getTableHeaderRow = (type: string) => {
		const columns = (() => {
			switch (type as "0" | "1" | "2") {
				case "0":
					return ["グリフ名"];
				case "1":
					return ["グリフ名", "実体"];
				case "2":
					return ["グリフ名", "実体", "koseki-xxxxxxの実体"];
			}
			return [];
		})();
		return (
			<SimpleColumnHeader columns={columns} />
		);
	}
	private getRowRenderer = (_type: string) => {
		return (props: { item: IValue }) => (
			<SimpleColumnRow columns={props.item.map((name, i) => (
				<Glyph name={name} key={i} />
			))} />
		);
	}
}

export default KosekitokiComponent;
